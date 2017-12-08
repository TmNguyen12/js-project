// import { lab } from "../../../Library/Caches/typescript/2.6/node_modules/@types/d3";

const margin = {top: 20, right: 100, bottom: 50, left: 50}; 
const width = 1000 - margin.left - margin.right; 
const height = 600 - margin.top - margin.bottom;

const svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const parseDate = d3.time.format("%d-%b-%y").parse; 
const bisectDate = d3.bisector( d =>(d.date)).left;
const formatValue = d3.format(",.2f");
const formatTime = d3.time.format("%b %y");
const formatCurrency = d => ("$" + formatValue(d));

// Set the Ranges 
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]); // 0,0 is on the upper left corner of screen. 

// Define the axis 
const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(30).tickFormat(d3.time.format("%b-%y"));
const yAxis = d3.svg.axis().scale(y).orient("left");

// Define the line 
const line = d3.svg.line()
  .x( (d) => (x(d.date)))
  .y( (d) => (y(d.price))); 

d3.csv("../docs/URLs2.csv", (error, data) => {
  if (error) throw error;
  
  var seed = {}; 
  
  data.forEach( d => {
    let a = {
      url: d.URLs, 
      title: d.Title, 
      image: d.Image 
    }; 
    if (!(d.Key in seed)){
      seed[d.Key] = [];
      seed[d.Key].push(a); 
    } else {
      seed[d.Key].push(a);   
    }
  });
  console.log(seed);
  window.seed = seed; 
});



d3.csv("../docs/BTC_USD_SHORT3.csv",  (error, data) => {
  if (error) throw error;

  data.forEach( (d) => {
    d.date = parseDate(d.Date);
    d.price = +d.Price;
    d.scatter = +d.Scatter;
    d.hkey = d.HKey; 
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
  }; 

  const div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", d => (d.HKey ? 5 : 0 ))
      .attr("cx", d => ( x(d.date) ))
      .attr("cy", d =>  ( y(d.scatter) ))
      .on("mouseover", d => {
        div.transition()
          .duration(200)
          .style("opacity", 1);
        div.html(formatTime(d.date) + "<br/>" + d.scatter)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
        })
      .on("mouseout", d => {
        div.transition()
          .duration(500)
          .style("opacity", 0);
        })
      .on("click", d => {
        var art = document.getElementById("articles");         
        if (art.getElementsByTagName('li').length >= 1){
          while (art.firstChild){
            art.removeChild(art.firstChild);         
          }
        }
        window.seed[d.hkey].forEach( article => {
          let ul = document.getElementById("articles");         
          let li = document.createElement("li");
          li.setAttribute("class", "thumb-list"); 
          let a = document.createElement("a"); 
          a.setAttribute('href', article.url)
          let img = document.createElement("img");
          img.setAttribute('src', article.image);
          a.appendChild(img); 
          let h = document.createElement("h3");
          h.innerHTML = article.title; 

          let title = document.createElement("a"); 
          title.setAttribute('href', article.url); 
          title.appendChild(h); 
          li.appendChild(a); 
          li.appendChild(title); 
          ul.appendChild(li); 
        }); 
      }); 
  }); 

  // export default TimeChart; 