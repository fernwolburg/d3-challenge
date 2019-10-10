var svgWidth = 900;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 80, left: 900 };

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
var chartGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// define location of the data
var data = '/Users/fernandawolburg/coolfolder/d3-challenge/D3_data_journalism/assets/data/data.csv'

// access the data and create a function that will loop through it
// note: loop through all the data so you can update the d3 bonus in the future
d3.csv('assets/data/data.csv').then(function(loopData) {
    loopData.forEach(function(d) {
        d.obesity = +d.obesity
        d.income = +d.income;
        d.smokes = +d.smokes;
        d.age = +d.age;
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
    })
});

// create scale function
const xScale = d3.scalelinear()
                .domain([0, max((data, d => d.obesity))])
                .range([0, width]);

console.log(xScale.domain());