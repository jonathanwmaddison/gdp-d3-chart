

var margin = {top: 20, right: 30, bottom: 30, left: 80},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scaleTime()

var y = d3.scaleLinear()
    .range([height, 0], .1);

var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)
	.ticks(10);
var parseTime = d3.timeParse("%Y-%m-%d")
var chart = d3.select(".chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height",height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" +margin.left + ","+margin.top+")");

var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"

d3.json(url, function response (econData) { 
	var gdp = econData.data.map((data)=>data);
	console.log(gdp)
	y.domain([0, d3.max(gdp, function(d) { return d[1]; })]);
	x.range([d3.min(gdp, function(d) { return d[0]; }), d3.max(gdp,function(d){ return d[1]; })]);	
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	  .append("text")
		.attr("x", 6)
		.attr("dy", ".71")
		.style("text-anchor", "end")
		.text("time");
	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("GDP");

	var barWidth = width/gdp.length;

	var bar = chart.selectAll("g")
		.data(gdp)
	  .enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i*barWidth + ", 0)"; });

	bar.append('rect')
		.attr("y", function(d) { return y(d[1]);} )
		.attr("x", function(d) { return x(d[0]);})
		.attr("height", function(d) { return height - y(d[1]); })
		.attr("width", barWidth)
})


function type(d) {
	d.data[0] =  parseTime(d[0]);
	return d;
}
