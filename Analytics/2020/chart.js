// set the dimensions and margins of the graph
var margin = {top: 20, right: 50, bottom: 30, left: 50},
    chwidth = 720 - margin.left - margin.right,
    chheight = 300 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y"),
    formatDate = d3.timeFormat("%d-%b"),
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

// set the ranges
var x = d3.scaleTime().range([0, chwidth]);
var y = d3.scaleLinear().range([chheight, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var chsvg = d3.select("#line-chart").append("svg")
    .attr("width", chwidth + margin.left + margin.right)
    .attr("height", chheight + margin.top + margin.bottom)
       // .attr("viewBox", `0 0 100 1000`)

  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Adding a separate group to 'layer' the objects
var lineSvg = chsvg.append("g");

var focus = chsvg.append("g") 
    .style("display", "none");

// Get the data
d3.csv("chart.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  lineSvg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  chsvg.append("g")
      .attr("transform", "translate(0," + chheight + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  chsvg.append("g")
      .call(d3.axisLeft(y));

  // append the x line
  focus.append("line")
      .attr("class", "x")
      .style("stroke", "tomato")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("y1", 0)
      .attr("y2", chheight);

  // append the y line
  focus.append("line")
      .attr("class", "y")
      .style("stroke", "tomato")
      .style("stroke-dasharray", "3,3")
      .style("opacity", 0.5)
      .attr("x1", chwidth)
      .attr("x2", chwidth);

  // append the circle at the intersection 
  focus.append("circle")
      .attr("class", "y")
      .style("fill", "tomato")
      .style("stroke", "tomato")
      .attr("r", 5);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");
  
  // append the rectangle to capture mouse
  chsvg.append("rect")
      .attr("width", chwidth)
      .attr("height", chheight)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.date > d1.date - x0 ? d1 : d0;

  focus.select("circle.y")
     .attr("transform",
           "translate(" + x(d.date) + "," +
                          y(d.close) + ")");

    focus.select("text.y1")
        .attr("transform",
              "translate(" + x(d.date) + "," +
                             y(d.close) + ")")
        .text(d.close);

    focus.select("text.y2")
        .attr("transform",
              "translate(" + x(d.date) + "," +
                             y(d.close) + ")")
        .text(d.close + " shipments");

    focus.select("text.y3")
        .attr("transform",
              "translate(" + x(d.date) + "," +
                             y(d.close) + ")")
        .text(formatDate(d.date));

    // focus.select("text.y4")
    //     .attr("transform",
    //           "translate(" + x(d.date) + "," +
    //                          y(d.close) + ")")
    //     .text(formatDate(d.date));

    focus.select(".x")
        .attr("transform",
              "translate(" + x(d.date) + "," +
                             y(d.close) + ")")
                   .attr("y2", chheight - y(d.close));

    focus.select(".y")
        .attr("transform",
              "translate(" + chwidth * -1 + "," +
                             y(d.close) + ")")
                   .attr("x2", chwidth + chwidth);
    
  }
  
});
