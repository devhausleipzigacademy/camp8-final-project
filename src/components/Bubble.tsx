import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { forceCollide, forceManyBody } from "d3-force";
import { GetServerSideProps } from "next";
import axios from "axios";

// Character length needs to be capped

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

export function Bubble({ data }: Props) {
  console.log(data);

  const d3Container = useRef(null);
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

  useEffect(() => {
    const count: any = (data: Data) => {
      return data.children.reduce((acc: any, curr: any) => {
        if (curr.children) {
          return acc + count(curr);
        } else {
          return acc + 1;
        }
      }, 0);
    };

    console.log(count(data));

    function getRandomColors() {
      var letters = "0123456789ABCDEF";
      var colors = [];
      for (var j = 0; j < count(data); j++) {
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
    // console.log(circleColor)

    // Define a color scale to assign a color to each top-level node
    const color = d3
      .scaleOrdinal()
      .domain(["Fish", "Meat", "Dairy"]) // add domain values for the top-level nodes
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

    // Set up the pack layout
    const pack = d3.pack().size([chartWidth, chartHeight]).padding(-5);

    // Generate the hierarchy data structure
    const root = d3.hierarchy(data).sum((d) => 1);

    // Compute the position and size of each circle
    const nodes = pack(root).descendants();

    let maxRadius = 0;
    nodes.forEach((node) => {
      if (node.r > maxRadius) {
        maxRadius = node.r;
      }
    });

    // Add the circles to the SVG element, assigning a color to each top-level node
    svg
      .selectAll("circle")
      .data(nodes.slice(data.children.length + 1)) // skip the first node to remove the outer circle - count(data) or data.item.length + 1
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

        var cx = this.getAttribute("cx");
        var cy = this.getAttribute("cy");

        // Find the text element using the circle's coordinates
        var textElement = d3.select("text[x='" + cx + "'][y='" + cy + "']");

        // Change the text color
        var textColor = textElement.style("fill");
        if (textElement.getAttribute("original-color") === "white") {
          var newTextColor = textColor === "white" ? "black" : "white";
          textElement.style("fill", newTextColor);
        }
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
      .attr("font-size", "10px")
      // .style('fill', (d) => {
      //   const bgColor = d3.rgb(color(d.parent.data.name));
      //   const luminance = (0.2126 * bgColor.r + 0.7152 * bgColor.g + 0.0722 * bgColor.b) / 255;
      //   return luminance > 0.5 ? 'black' : 'white';
      // })
      .text((d) => {
        if (d.data.name.length < 7) {
          console.log(d.data.name);
          return d.data.name;
        } else {
          return d.data.name.slice(0, 6) + "...";
        }
      })
      .attr("class", "bar-text");
  }, []);

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
      "http://localhost:3000/api/ListItems?inputList=d6e5005a-abdc-4478-b276-3c2f57e41ba8"
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
