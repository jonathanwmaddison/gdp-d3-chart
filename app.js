
var margin = {top: 20, right: 30, bottom: 30, left: 80},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var xScale = d3.scaleTime()
    .range([0, width])
var yScale = d3.scaleLinear()
    .range([height, 0]);
var xAxis = d3.axisBottom(xScale)
    .ticks(10);
var yAxis = d3.axisLeft(yScale)
	.ticks(10);

var parseTime = d3.timeParse("%Y-%m-%d")
//select svg and add width and height to it
var chart = d3.select(".chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height",height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" +margin.left + ","+margin.top+")");

var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"

d3.json(url, function response (econData) { 
	var gdp = econData.data.map((data)=>data);
	var gdp = gdp.map((month)=>[parseTime(month[0]), month[1]])
    console.log(gdp)
    var xMin = d3.min(gdp, function(d) { return d[0]; })
    var xMax = d3.max(gdp, function(d) { return d[0]; })
	yScale.domain([0, d3.max(gdp, function(d) { return d[1]; })]);
    xScale.domain(d3.extent(gdp, function(d) { return d[0]; }));
    
    //add axis
    chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
      .select(".domain")
        .remove();
	chart.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,0)")
		.call(yAxis)
	
    var barWidth = width/gdp.length;

	var bar = chart.selectAll("g")
		.data(gdp)
	  .enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + barWidth + ", 0)"; });
    // map data to chart
	bar.append('rect')
		.attr("y", function(d) { return yScale(d[1]);} )
		.attr("x", function(d) { return xScale(d[0]);})
		.attr("height", function(d) { return height - yScale(d[1]); })
		.attr("width", barWidth)
})

