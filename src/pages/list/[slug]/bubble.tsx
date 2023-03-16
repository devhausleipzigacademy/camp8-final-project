import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { forceCollide, forceManyBody } from "d3-force";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

// create types

type Items = {
  name: string;
  category?: string;
};
type Category = {
  name: string;
  children: Items[];
};
type Data = {
  children: Category[];
};
interface Props {
  data: Data;
  slug: string;
}

// create "Bubble" component. Props are defined at the bottom

const toggleButton = async (id: string, checked: boolean, slug: string) => {
  await axios.post(`http://localhost:3000/api/toggleButton`, {
    id: id,
    checked: checked,
    slug: slug,
  });
};

export default function Bubble({ data, slug }: Props) {
  const d3Container = useRef(null);
  useEffect(() => {
    console.log(data + "data");
    const circleColor = [
      "#FFC107",
      "#2196F3",
      "#8BC34A",
      "#9C27B0",
      "#607D8B",
      "#FF9800",
      "#795548",
      "#4CAF50",
      "#E91E63",
      "#FFEB3B",
      "#00BCD4",
      "#673AB7",
      "#03A9F4",
      "#9E9E9E",
      "#FF5722",
      "#8E24AA",
    ];
    //This maps category names to assined colours.
    const color = d3
      .scaleOrdinal()
      .domain([
        "snacks",
        "seafood",
        "soups-and-canned-goods",
        "personal-hygine",
        "other",
        "grains-and-pasta",
        "baking",
        "household",
        "meats",
        "pet-supplies",
        "beverages",
        "alcohol",
        "frozen",
        "dairy",
        "condiments",
        "fruits-and-vegetables",
      ])
      .range(circleColor);

    // Set up the SVG element and its dimensions
    const svg = d3.select(d3Container.current);
    const width = window.innerWidth;
    const height = (window.innerHeight * 3) / 4;
    svg.attr("width", width);
    svg.attr("height", height);
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Set up the pack layout.  This determed how grouped the circles are to eachother.  90 very tight together.  -90 very far apart.
    // Can maybe set this to depend on number of circles.  Also depends on collision force (see later)
    const pack = d3.pack().size([chartWidth, chartHeight]).padding(-5);

    // Generate the hierarchy data structure
    const root = d3.hierarchy(data).sum((d) => 1);

    // Compute the position and size of each circle
    const nodes = pack(root).descendants();

    // This function gets the maximum circle radius of all bottom level circles.
    // It was needed at some point during development.
    // Right now, it is not needed, but I would like to have it remain
    // for potential purposes

    let maxRadius = 0;
    nodes.forEach((node) => {
      if (node.r > maxRadius) {
        maxRadius = node.r;
      }
    });

    // Add the circles to the SVG element, assigning a color to each top-level node
    svg
      .selectAll("circle")
      .data(nodes.slice(data.children.length + 1)) // skip the first node to remove the top level circle
      .join("circle")
      .attr("r", (d) => {
        // If it's a leaf node, set the radius based on the text length
        if (!d.children && d.data.name.length < 7) {
          return d.data.name.length * 6;
        }
        if (!d.children && d.data.name.slice(0, 6).length) {
          return d.data.name.slice(0, 6).length * 6;
        }
      })
      .attr("fill", (d) => {
        //Grab parents name (Category) to generate colour
        return color(d.parent.data.name);
      })
      //Add details here to change styling
      .attr("stroke", "#453C57")
      .attr("stroke-width", 2)
      //Distortion to fill  Compelementary on Text SVG
      .attr("transform", "scale(1.2 1)")
      .on("click", function (d) {
        var currentColor = this.style.fill;
        toggleButton(d.target.__data__.data.id, currentColor === "white", slug);
        var nextColor =
          currentColor === "white"
            ? this.getAttribute("original-color")
            : "white";
        d3.select(this).style("fill", nextColor);
      });

    const heightScale = d3.scaleLinear().domain([300, 1000]).range([0, -0.01]);

    // Define a simulation with a collision force
    const simulation = d3
      .forceSimulation(nodes.slice(data.children.length + 1))
      .force("charge", d3.forceManyBody().strength(0.1)) // a positive value will cause elements to attract one another while a negative value causes elements to repel each other. The default value is -30
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.r + 1)
          //Strength at which circles will push away from eachother
          .strength(0.5)
      ) // add a collision force to prevent circles from overlapping
      .force("y", d3.forceY(height / 2).strength(heightScale(height)));

    // Add tick function to update circle and text positions
    simulation.on("tick", () => {
      svg
        .selectAll("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
      svg
        .selectAll("text")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y);
    });

    // Add the text labels to the SVG element
    svg
      .selectAll("text")
      .data(nodes.slice(1).filter((d) => d.depth > 1))
      .join("text")
      .attr("transform", "scale(1.2 1)")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text((d) => {
        if (d.data.name.length < 7) {
          return d.data.name;
        } else {
          return d.data.name.slice(0, 6) + "...";
        }
      })
      .attr("class", "bar-text");
  }, []);
  return (
    <div className="h-full w-full flex justify-center flex-col bg-grad-frame">
      <div>
        <svg ref={d3Container} width="100vw" height="100vh"></svg>
      </div>
    </div>
  );
}
interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as Params;
  const items: Items[] = await axios
    .get(`http://localhost:3000/api/ListItems?inputList=${slug}`)
    .then((res) => res.data);

  const returnValue: Data = {
    children: [],
  };
  const categories = items.map((x) => x.category);
  const filtered = categories.filter(
    (item, index) => categories.indexOf(item) === index
  );

  const children: Category[] = [];
  filtered.map((categoryName) => {
    const temp: Items[] = [];
    items.map((item) => {
      if (item.category === categoryName) {
        temp.push(item);
      }
    });
    children.push({
      name: categoryName!,
      children: temp,
    });
  });
  const data = {
    children: children,
  };
  return {
    props: {
      data,
      slug,
    },
  };
};
