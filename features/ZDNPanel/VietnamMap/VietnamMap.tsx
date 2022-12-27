import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

import ErrorPanel from "../../../components/ErrorPanel/ErrorPanel";
import LoadingPanel from "../../../components/LoadingPanel/LoadingPanel";
import { useStatsServer } from "./useStatsServer";
import vietnamGeo from "./vietnamGeo.json";
// import d3-geo from "d3";

// function drawScatterplot(data:any) {
//   var margin = {
//     top: 20,
//     right: 10,
//     bottom: 80,
//     left: 40
//   };
//   var w = 270 - margin.left - margin.right;
//   var h = 270 - margin.top - margin.bottom;

//   var scatter = d3.select('.scatterplot-wrapper')
//     .append('svg')
//     .attr('width', w + margin.left + margin.right)
//     .attr('height', h + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

//   /// Population (x)
//   var xscale = d3.scale.linear()
//     .domain([d3.min(data, function(d:any) {
//         return d.properties.population;
//       }),
//       d3.max(data, function(d:any) {
//         return d.properties.population;
//       })
//     ])
//     .range([0, w]);

//   // Area (y)
//   var yscale = d3.scale.linear()
//     .domain([d3.min(data, function(d:any) {
//         return d.properties.area / 1000;
//       }),
//       d3.max(data, function(d:any) {
//         return d.properties.area / 1000;
//       })
//     ])
//     .range([h, 0]);

//   var rscale = d3.scale.sqrt()
//     .domain([d3.min(data, function(d:any) {
//         return d.properties.density;
//       }),
//       d3.max(data, function(d:any) {
//         return d.properties.density;
//       })
//     ])
//     .range([3, 15]);

//   // Define X axis
//   var xaxis = d3.svg.axis()
//     .scale(xscale)
//     .orient('bottom')
//     .tickSize(-h)
//     .tickFormat(d3.format('s'));

//   // Define Y axis
//   var yaxis = d3.svg.axis()
//     .scale(yscale)
//     .orient('left')
//     .ticks(6)
//     .tickSize(-w);

//   // Create X axis
//   scatter.append('g')
//     .attr('class', 'x-axis axis')
//     .attr('transform', 'translate(0,' + (h) + ')')
//     .call(xaxis);

//   // Create Y axis
//   scatter.append('g')
//     .attr('class', 'y-axis axis')
//     .attr('transform', 'translate(' + 0 + ',0)')
//     .call(yaxis);

//   // Add label to X axis
//   scatter.append('text')
//     .attr('class', 'x label')
//     .attr('text-anchor', 'middle')
//     .attr('x', w - w / 2)
//     .attr('y', h + margin.bottom / 2)
//     .text('Population');

//   // Add label to Y axis
//   scatter.append('text')
//     .attr('class', 'y label')
//     .attr('text-anchor', 'middle')
//     .attr('y', -margin.left + 5)
//     .attr('x', 0 - (h / 2))
//     .attr('dy', '1em')
//     .attr('transform', 'rotate(-90)')
//     .text('Area (1000 km2)');

//   var clr = d3.scale.category20();

//   var circles = scatter.selectAll('circle')
//     .data(data).enter()
//     .append('circle')
//     .attr('cx', function(d:any) {
//       return xscale(d.properties.population);
//     })
//     .attr('cy', function(d:any) {
//       return yscale(d.properties.area / 1000);
//     })
//     .attr('r', function(d:any) {
//       return rscale(d.properties.density);
//     })
//     .attr('class', function(d:any) {
//       return 'bubble state-' + d.properties.iso + ' ' +
//         quantiles(d.properties.density);
//     })
//     .on('mouseover', function(d:any) {
//       tooltip.transition().duration(300)
//         .style('opacity', 1);

//       tooltip.text(d.properties.name)
//         .style('left', d3.event.pageX + 'px')
//         .style('top', (d3.event.pageY - 50) + 'px');
//     }).on('mouseout', function(d:any) {
//       tooltip.transition().duration(300)
//         .style('opacity', 0);
//     });
// }

function loadTopoJson(data: any) {
  // @see http://www.gadm.org/
  // GADM is a spatial database of the location of the world's
  // administrative areas (or adminstrative boundaries) for use in GIS and similar software.
  // @see http://mapshaper.org/ for simplify
  // A tool for topologically aware shape simplification. Reads and
  // writes Shapefile, GeoJSON and TopoJSON formats.
  d3.json("https://raw.githubusercontent.com/gponster/d3tuts/master/vn-states.json", function (error: any, json: any) {
    if (error) {
      return console.warn(error);
    }

    // d3.select("#loading").classed("hidden", true);

    // While our data can be stored more efficiently in TopoJSON,
    // we must convert back to GeoJSON for display.
    var features = topojson.feature(json, json.objects.states).features;

    // Merge the ag. data and GeoJSON
    // Loop through once for each ag. data value
    for (var i = 0; i < data.length; i++) {
      // Grab state name
      var dataIso = data[i].iso;
      // Grab data value, and convert from string to float
      var density = parseFloat(data[i].density);
      var population = parseFloat(data[i].population);
      var area = parseFloat(data[i].area);

      //Find the corresponding state inside the GeoJSON
      for (var j = 0; j < features.length; j++) {
        var jsonIso = features[j].properties.iso;
        if (dataIso == jsonIso) {
          // Copy the data value into the JSON
          features[j].properties.density = density;
          features[j].properties.population = population;
          features[j].properties.area = area;

          // Stop looking through the JSON
          break;
        }
      }
    }

    // Set the domain of the values
    quantiles.domain(
      features.map(function (d: any) {
        return d.properties.density;
      }),
    );

    // var legend = d3.select(".bar-legend").append("svg").attr("width", 240).attr("height", 12);

    // legend
    //   .selectAll("rect")
    //   .data(
    //     d3.range(9).map(function (i) {
    //       return "q" + i + "-9";
    //     }),
    //   )
    //   .enter()
    //   .append("rect")
    //   .attr("width", 240 / 9)
    //   .attr("height", 12)
    //   .attr("x", function (d, i) {
    //     return (240 / 9) * i;
    //   })
    //   .attr("data-level", function (d, i) {
    //     return i;
    //   })
    //   .attr("class", function (d: any) {
    //     return "legend " + d;
    //   })
    //   .on("mouseover", function (type) {
    //     d3.selectAll(".legend").style("opacity", 0.3);
    //     d3.select(this).style("opacity", 1);

    //     var level = d3.select(this).attr("data-level");

    //     d3.selectAll(".feature")
    //       .style("opacity", 0.1)
    //       .filter(".q" + level + "-9")
    //       .style("opacity", 1);

    //     d3.selectAll(".bubble")
    //       .style("fill-opacity", 0.1)
    //       .filter(".q" + level + "-9")
    //       .style("fill-opacity", 0.75);

    //     d3.selectAll(".state-boundary").style("stroke-opacity", 0.3);
    //   })
    //   .on("mouseout", function (type) {
    //     d3.selectAll(".legend").style("opacity", 1);
    //     d3.selectAll(".feature").style("opacity", 1);
    //     d3.selectAll(".bubble").style("fill-opacity", 0.75);

    //     d3.selectAll(".state-boundary").style("stroke-opacity", 1);
    //   });

    drawMap(json, features);
    drawScatterplot(features);
  });
}

function drawScatterplot(data: any) {
  var margin = {
    top: 20,
    right: 10,
    bottom: 80,
    left: 40,
  };
  var w = 270 - margin.left - margin.right;
  var h = 270 - margin.top - margin.bottom;

  var scatter = d3
    .select(".scatterplot-wrapper")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  /// Population (x)
  var xscale = d3.scale
    .linear()
    .domain([
      d3.min(data, function (d: any) {
        return d.properties.population;
      }),
      d3.max(data, function (d: any) {
        return d.properties.population;
      }),
    ])
    .range([0, w]);

  // Area (y)
  var yscale = d3.scale
    .linear()
    .domain([
      d3.min(data, function (d: any) {
        return d.properties.area / 1000;
      }),
      d3.max(data, function (d: any) {
        return d.properties.area / 1000;
      }),
    ])
    .range([h, 0]);

  var rscale = d3.scale
    .sqrt()
    .domain([
      d3.min(data, function (d: any) {
        return d.properties.density;
      }),
      d3.max(data, function (d: any) {
        return d.properties.density;
      }),
    ])
    .range([3, 15]);

  // Define X axis
  var xaxis = d3.svg.axis().scale(xscale).orient("bottom").tickSize(-h).tickFormat(d3.format("s"));

  // Define Y axis
  var yaxis = d3.svg.axis().scale(yscale).orient("left").ticks(6).tickSize(-w);

  // Create X axis
  scatter
    .append("g")
    .attr("class", "x-axis axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xaxis);

  // Create Y axis
  scatter
    .append("g")
    .attr("class", "y-axis axis")
    .attr("transform", "translate(" + 0 + ",0)")
    .call(yaxis);

  // Add label to X axis
  scatter
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", w - w / 2)
    .attr("y", h + margin.bottom / 2)
    .text("Population");

  // Add label to Y axis
  scatter
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -margin.left + 5)
    .attr("x", 0 - h / 2)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .text("Area (1000 km2)");

  var clr = d3.scale.category20();

  var circles = scatter
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d: any) {
      return xscale(d.properties.population);
    })
    .attr("cy", function (d: any) {
      return yscale(d.properties.area / 1000);
    })
    .attr("r", function (d: any) {
      return rscale(d.properties.density);
    })
    .attr("class", function (d: any) {
      return "bubble state-" + d.properties.iso + " " + quantiles(d.properties.density);
    })
    .on("mouseover", function (d: any) {
      tooltip.transition().duration(300).style("opacity", 1);

      tooltip
        .text(d.properties.name)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 50 + "px");
    })
    .on("mouseout", function (d: any) {
      tooltip.transition().duration(300).style("opacity", 0);
    });
}

function drawMap(json, features) {
  //var center = d3.geo.centroid(json);
  var center = [106.34899620666437, 16.553160650957434];
  var scale = 2500;
  var offset = [width / 2, height / 2 - 50];

  // The projection function takes a location [longitude, latitude]
  // and returns a Cartesian coordinates [x,y] (in pixels).
  //
  // D3 has several built-in projections. Albers USA is a composite projection
  // that nicely tucks Alaska and Hawaii beneath the Southwest.
  //
  // Albers USA (albersUsa) is actually the default projection for d3.path.geo()
  // The default scale value is 1,000. Anything smaller will shrink the map;
  // anything larger will expand it.
  //
  // Add a scale() method with 800 to our projection in order to shrink things down a bit
  //var projection = d3.geo.albersUsa()
  //     .translate([w / 2, h / 2]).scale([800]);
  projection = d3.geo.mercator().translate(offset).scale([scale]).center(center);

  // We define our first path generator for translating that
  // mess of GeoJSON coordinates into even messier messes of SVG path codes.
  // Tell the path generator explicitly that it should reference our customized
  // projection when generating all those paths
  path = d3.geo.path().projection(projection);

  zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 13]).on("zoom", zoomed);

  // svg = d3.select("#map-canvas").append("svg").attr("width", width).attr("height", height).on("click", stopped, true);

  svg
    .append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on(
      "click",
      function () {
        zoomScale = 1;
        zoomTranslate = [0, 0];

        reset();
      },
      true,
    );

  g = svg.append("g");

  // Create g before call zoom

  //-----------------------------------------------------------------
  // For country boundary and state mesh/not data binding
  //-----------------------------------------------------------------
  var boundary = g.append("g").attr("class", "boundary");

  g.attr("class", "states")
    .selectAll("path") // select all the current path nodes
    .data(features) // bind these to the features array in json
    .enter()
    .append("g") // if not enough elements create a new group
    .attr("class", function (d: any) {
      return "state state-" + d.properties.iso;
    })
    .on("mouseover", function (d: any) {
      //---------------------------------------------------------
      // Tooltip
      //---------------------------------------------------------
      tooltip.transition().duration(300).style("opacity", 1);

      tooltip
        .text(d.properties.name)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 50 + "px");
      //---------------------------------------------------------

      //---------------------------------------------------------
      // Feature info
      //---------------------------------------------------------
      // $('#feature-info').find('tr:gt(0)').remove();

      var html =
        "<tr><td>" +
        d.properties.name +
        "</td>" +
        "<td>" +
        d.properties.population.toFixed(2) +
        "</td>" +
        "<td>" +
        d.properties.area.toFixed(2) +
        "</td>" +
        "<td>" +
        d.properties.density.toFixed(2) +
        "</td>" +
        "<td>" +
        d.properties.capital +
        "</td></tr>";
      // $('#feature-info tr:last').after(html);
      //---------------------------------------------------------

      //---------------------------------------------------------
      // Bubble
      //---------------------------------------------------------
      d3.selectAll(".bubble")
        .style("fill-opacity", 0.1)
        .filter(".state-" + d.properties.iso)
        .classed("highlight", true);
    })
    .on("mouseout", function (d: any) {
      tooltip.transition().duration(300).style("opacity", 0);

      // $('#feature-info').find('tr:gt(0)').remove();

      d3.selectAll(".bubble").style("fill-opacity", 0.75).classed("highlight", false);
    })
    .on("click", clicked)
    .append("path")
    .attr("class", function (d: any) {
      // Use the quantiled value for the class
      return "feature " + quantiles(d.properties.density);
    }) // add attribute class and fill with result from quantiles
    .attr("d", path);

  //-----------------------------------------------------------------
  // Now we can draw boundary, prevent lost data cause by merging and meshing
  //-----------------------------------------------------------------
  // Country boundary from merge all geometries
  boundary.append("path").attr("class", "country-boundary").datum(topojson.merge(json, json.objects.states.geometries)).attr("d", path);

  // State mesh
  boundary
    .append("path")
    .attr("class", "state-boundary")
    .datum(
      topojson.mesh(json, json.objects.states, function (a, b) {
        return a !== b;
      }),
    )
    .attr("d", path);
  //-----------------------------------------------------------------

  //-----------------------------------------------------------------
  // State names
  //-----------------------------------------------------------------
  g.append("g")
    .attr("class", "state-labels")
    .selectAll("text") // select all the current path nodes
    .data(features)
    .enter()
    .append("text") // if not enough elements create a text
    .attr("class", function (d: any) {
      // To make contract text
      var className = "state-label state-" + d.properties.iso;
      return className + " " + quantiles(d.properties.density);
    })
    .text(function (d: any) {
      // Name from bound data we already binded using .data(features)
      return d.properties.name;
    })
    // Using transform equivalent to x, y
    .attr("transform", function (d: any) {
      return "translate(" + path.centroid(d) + ")";
    })
    //.attr('x', function (d) {
    //    return path.centroid(d)[0];
    //})
    //.attr('y', function (d) {
    //    return path.centroid(d)[1];
    //})
    // The dy attribute indicates a shift along the y-axis on the position
    // of an element or its content. What exactly is shifted
    // depends on the element for which this attribute is set.
    .attr("dy", ".35em");

  drawCities();

  d3.select(self.frameElement).style("height", height + "px");
}

function drawCities() {
  // Cities group
  g.append("g").attr("class", "cities");

  d3.csv("vn-cities.csv", function (error, rows) {
    if (error) {
      return console.warn(error);
    }

    rows.forEach(function (row, i) {
      // Create new group and binding data
      var sg = g
        .selectAll(".cities")
        .append("g")
        .datum(row)
        .attr("class", function (d: any) {
          return "city city-" + d.code + " level-" + d.level;
        });

      // Append circle to group of city
      sg.append("circle")
        .attr("class", function (d: any) {
          return "city-place";
        })
        .attr("visibility", function (d: any) {
          return d.level < 3 ? "visible" : "hidden";
        })
        .attr("cx", function (d: any) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function (d: any) {
          return projection([d.lng, d.lat])[1];
        })
        .attr("r", 2)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("opacity", 0.85)
        // Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks"
        // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
        .on("mouseover", function (d: any) {
          //div.transition()
          //    .duration(200)
          //    .style('opacity', .9);
        })
        // fade out
        .on("mouseout", function (d: any) {
          //div.transition()
          //    .duration(500)
          //    .style('opacity', 0);
        });

      sg.append("text")
        .attr("class", function (d: any) {
          return "city-label";
        })
        .text(function (d: any) {
          return d.name;
        })
        .attr("visibility", function (d: any) {
          return d.level < 2 ? "visible" : "hidden";
        })
        .attr("x", function (d: any) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("y", function (d: any) {
          return projection([d.lng, d.lat])[1];
        })
        .attr("text-anchor", function (d: any) {
          return d.lng > 105.7 ? "start" : "end";
        })
        .attr("dx", function (d: any) {
          return (d.lng > 105.7 ? 1 : -1) * 0.7 + "em";
        })
        // The dy attribute indicates a shift along the y-axis on the position
        // of an element or its content. What exactly is shifted
        // depends on the element for which this attribute is set.
        .attr("dy", ".35em");
    });
  });
}

export default function VietnamMap() {
  // const { data, error, isLoading } = useStatsServer();
  const chartRef = useRef(null);
  const projection = d3.geoMercator();

  // useEffect(() => {
  //   d3.csv("https://raw.githubusercontent.com/gponster/d3tuts/master/vn-population-2011.csv", function (error, rows) {
  //     // if (error) {
  //     //   return console.warn(error);
  //     // }

  //     loadTopoJson(rows);
  //   });
  // });
  useEffect(() => {
    const svg = d3.select(chartRef.current).append("svg").attr("width", 500).attr("height", 500);

    svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 50).attr("fill", "blue");
  }, []);

  // const [width, setWidth] = useSate
  // projection.fitSize([600, 600], geojson);
  // const path = d3.geoPath().projection(projection);

  // d3.select(chartRef.current).selectAll("path")
  //   .data(geojson.features)
  //   .enter()
  //   .append("path")
  //   .attr("d", path)
  //   .attr("fill", "#ccc");

  // return <svg ref={chartRef}></svg>;
  return (
    <div
      ref={chartRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
  // <div id="VietnamMap" style={{ width: "100%", height: "100%" }}></div>;
}
