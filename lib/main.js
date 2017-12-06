const margin = {top: 20, right: 100, bottom: 50, left: 50}; 
const width = 900 - margin.left - margin.right; 
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const parseDate = d3.time.format("%d-%b-%y").parse; 
const bisectDate = d3.bisector( d =>(d.date)).left;
const formatValue = d3.format(",.2f");
const formatCurrency = d => ("$" + formatValue(d));

// Set the Ranges 
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

// Define the axis 
const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(30).tickFormat(d3.time.format("%b-%y"));
const yAxis = d3.svg.axis().scale(y).orient("left");

// Define the line 
const line = d3.svg.line()
  .x( (d) => (x(d.date)))
  .y( (d) => (y(d.price))); 

d3.tsv("../docs/BTC_USD_short.csv", (error, data) => {
  if (error) throw error;

  data.forEach( (d) => {
    d.date = parseDate(d.Date);
    d.price = +d.Price;
  });

  data.sort( (a, b) => (a.date - b.date));

  // Scale the ranges of the data 
  x.domain([data[0].date, data[data.length - 1].date]);
  y.domain(d3.extent(data, (d) =>(d.price)));

  // x axis 
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 10)
      .attr("dy", ".4em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start")

  // y axis 
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  // add value of the line 
  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  const focus = svg.append("g")
    .attr("class", "focus")
    .style("display", "none");

  focus.append("circle")
    .attr("r", 4.5);
  
  focus.append("line")    
    .attr("x1", 0)  
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -1000)
    .attr("stroke-width", 2)
    .attr("stroke", "black");

  focus.append("text")
    .attr("y", -100)
    .attr("x", 9)
    .attr("dy", ".5em");

  svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", () => {focus.style("display", null); })
    .on("mouseout", () => { focus.style("display", "none"); })
    .on("mousemove", mousemove);

    // const displayText = ${formatCurrency(d.price)} + ${d.date}; 
    
  function mousemove() {
    const x0 = x.invert(d3.mouse(this)[0]);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];
    const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.price) + ")");
    focus.select("text").text(formatCurrency(d.price)+d.date);
  }

  // from Micah Stubb's bl.ocks.org 
  const vertical = d3.select(".body")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "19")
    .style("width", "1px")
    .style("height", "380px")
    .style("top", "10px")
    .style("bottom", "30px")
    .style("left", "0px")
    .style("background", "#000");

  d3.select(".body")
    .on("mousemove", function(){  
      const mousex = d3.mouse(this);
      mousex = mousex[0] + 5;
      vertical.style("left", mousex + "px" ); 
    }) 
    .on("mouseover", function(){  
      const mousex = d3.mouse(this);
      mousex = mousex[0] + 5;
      vertical.style("left", mousex + "px"); 
    }); 
});