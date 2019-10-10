var svgWidth = 900;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create the SVG variable that will contain the data
var svg = d3.select("#scatter")
            .append('div')
            .classed('chart', true)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

// create the chartGroup 
var g= svg.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

// define location of the data
var data = 'assets/data/data.csv'

// access the data and create a function that will loop through it
// note: loop through all the data so you can update the d3 bonus in the future
d3.csv(data).then(loopData, errorData);

// If error exist it will be only visible in console
function errorData(error) {
    throw err;
  }

// loop through the data and create the charts
function loopData(file) {

    //loop throught data file
    file.map(function(d) {
        d.obesity = +d.obesity;
        d.income = +d.income;
        d.smokes = +d.smokes;
        d.age = +d.age;
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
    })

    // crate variables for x and y values
    var xValue = d => d.obesity
    var yValue = d => d.income

    // create scales for graph
    const xScale = d3.scaleLinear()
                    .domain([0, d3.max(file, xValue)])
                    .range([0, width]);

    const yScale = d3.scaleLinear()
                    .domain([d3.max(file, yValue), 0])
                    .range([0, height]);

    // create the variables for the axis
    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    // add the axis to the group
    const yAxisGroup = g.append('g').call(yAxis);

    const xAxisGroup = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${height})`);

    // add labels for axis
    var xAxisLabel = 'Obesity Rate';
    var yAxisLAbel = 'Income';

    xAxisGroup.append('text')
              .attr("transform", `translate(${width/2}, ${0 + (margin.bottom/2)})`)
              .attr('class', 'aText active x')
              .text(xAxisLabel) ;
    
    yAxisGroup.append('text')
              .attr("transform", 'rotate(-90)')
              .attr('x', 0 - height/2)
              .attr('y', 0 - margin.bottom/2 - margin.right)
              .attr('class', 'aText active x')
              .text(yAxisLAbel);

    // add the circles to the scatter plot
    var circles = g.selectAll('circle').data(file).enter()
        
    
    circles.append('circle')
            .attr('cx', d => xScale(d.obesity))
            .attr('cy', d => yScale(d.income))
            .attr('r', '12')
            .attr('fill', '#788dc2')
            .attr('opacity', '.75');

    // add text to each circle
    circles.append('text')
            .attr('x', d => xScale(d.obesity))
            .attr('y', d => yScale(d.income))
            .style("font-size", "9px")
            .style('fill', '#fff')
            .style('text-anchor', 'middle')
            .text(d => (d.abbr));
    
}