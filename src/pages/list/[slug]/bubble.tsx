import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { forceCollide, forceManyBody } from "d3-force";
import { GetServerSideProps } from "next";
import axios from "axios";

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
}

// create "Bubble" component. Props are defined at the bottom

export default function Bubble({ data }: Props) {
  const d3Container = useRef(null);

  // Move dummy data to a seperate file

  // const data: Data = {
  //   children: [
  //     {
  //       name: "Fish",
  //       children: [{ name: "Brot" }, { name: "Butter" }, { name: "Sahne" }],
  //     },
  //     {
  //       name: "Meat",
  //       children: [{ name: "Käse" }, { name: "Bier" }, { name: "Wasser" }],
  //     },
  //     {
  //       name: "Dairy",
  //       children: [
  //         { name: "Honig" },
  //         { name: "Tee" },
  //         { name: "Kaffeefilter" },
  //         { name: "Filter" },
  //         { name: "Eis" },
  //       ],
  //     },
  //     {
  //       name: "Starch",
  //       children: [
  //         { name: "Gemüse" },
  //         { name: "Kürbis" },
  //         { name: "Gurke" },
  //         { name: "Spinat" },
  //         { name: "Salat" },
  //       ],
  //     },
  //     {
  //       name: "Frozen",
  //       children: [
  //         { name: "Kuchen" },
  //         { name: "Mais" },
  //         { name: "Quark" },
  //         { name: "Lauch" },
  //         { name: "Möhren" },
  //       ],
  //     },
  //     {
  //       name: "Misc",
  //       children: [
  //         { name: "Reis" },
  //         { name: "Pfefferminz-Kaugummi" },
  //         { name: "Käse" },
  //         { name: "Batterien" },
  //         { name: "Möhren" },
  //       ],
  //     },
  //     {
  //       name: "Some more",
  //       children: [
  //         { name: "Reis" },
  //         { name: "Kaugummi" },
  //         { name: "Käse" },
  //         { name: "Batterien" },
  //         { name: "Möhren" },
  //       ],
  //     },
  //   ],
  // };

  // All D3 code is within the useeffect hook. The dependency array is empty right now.
  // The idea was, however, to have width and height included in this array
  // so that render is triggered as soon as display changes.
  // This didn't work so far.


    // Count how many bottom level entries are present in the data. This will be
    // the number of bottom level circles.

    // const count: any = (data: Data) => {
    //   return data.children.reduce((acc: any, curr: any) => {
    //     if (curr.children) {
    //       return acc + count(curr);
    //     } else {
    //       return acc + 1;
    //     }
    //   }, 0);
    // };

    // console.log(count(data) + " Count data");
    console.log(data + "data")

    // Take the number of bottom level circle and generate as many colors
    // with a luminance greater 0.48.
    // We should replace this function with an array of at least 15 distinct colors
    // for each category. We should include the option to generate more colors
    // if the user creates custom categories

    function getRandomColors() {
      var letters = "0123456789ABCDEF";
      var colors = [];
      for (var j = 0; j < data.children.length; j++) {
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        var r = parseInt(color.substr(1, 2), 16) / 255;
        var g = parseInt(color.substr(3, 2), 16) / 255;
        var b = parseInt(color.substr(5, 2), 16) / 255;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (luminance > 0.48) {
          colors.push(color);
        }
      }
      return colors;
    }
    const circleColor = getRandomColors();
    console.log(getRandomColors());

    // Define a color scale to assign a color to each top-level node.

    const color = d3
      .scaleOrdinal()
      .domain(["Fish", "Meat", "Dairy"]) // add names
      .range(circleColor);

    // Set up the SVG element and its dimensions
    const svg = d3.select(d3Container.current);
    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.attr("width", width);
    svg.attr("height", height);
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Set up the pack layout.
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
          return d.data.name.length * 4;
        }
        if (!d.children && d.data.name.slice(0, 6).length) {
          return d.data.name.slice(0, 6).length * 4;
        }
        // If it's a non-leaf node, set the radius to a fixed value
        return 30;
      })
      .attr("fill", (d) => {
        // Assign a color to each top-level node
        if (!d.depth) {
          return color(d.data.name);
        }
        // Otherwise, use the parent's color
        return color(d.parent.data.name);
      })
      .attr("stroke", "black")
      .attr("transform", "scale(1 1)")
      .on("click", function () {
        var currentColor = this.style.fill;
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
          .strength(0.001)
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
      .attr("transform", "scale(1 1)")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .text((d) => {
        console.log(d.data.name);
        if (d.data.name.length < 7) {
          return d.data.name;
        } else {
          return d.data.name.slice(0, 6) + "...";
        }
      })
      .attr("class", "bar-text")
      .style("font-size", "12px");
  );

  return (
    <div className="h-full w-full flex justify-center flex-col">
      <div>
        <button className="h-50 w-50 bg-blue">Expand</button>
      </div>
      <div>
        <svg ref={d3Container} width="100vw" height="100vh"></svg>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  console.log("HEllo");

  const items: Items[] = await axios
    .get(
      "http://localhost:3000/api/ListItems?inputList=685ed990-f348-4307-8801-34d24e44ab76"
    )
    .then((res) => res.data);
  console.log("Gekki");

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
    },
  };
};
