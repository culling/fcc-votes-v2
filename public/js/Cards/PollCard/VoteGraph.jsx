'use strict';

import React from 'react';
import {render} from 'react-dom';

import * as d3 from 'd3';

class VoteGraph extends React.Component{
    //http://zeroviscosity.com/d3-js-step-by-step/step-1-a-basic-pie-chart
    //https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0
    constructor(props){
        super(props);

    }

    componentWillMount(){
        console.log(this.props.poll);
    }

    componentDidMount(){
        

        let w = 400;
        let r = 100;
        let barPaddingWidth = 0;
        let yPadding = 30;
        let xPadding = 80;
        let h = (r *2)+ yPadding;

        let graphId = "#vote-graph-" + this.props.poll._id;
        console.log(graphId);

        var svg = d3.select(graphId)
            .append("svg")
            .attr("viewBox", "0 0 "+ (w+(xPadding *2) ) +" " + h)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .append("g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")
            
        this.svg = svg;
        //console.log(svg);
        this._makeGraph(svg);
        
    }

    componentWillUpdate(){
        this.svg.selectAll(".arc").remove();
        this.svg.selectAll('.legend').remove();
        this._makeGraph(this.svg);

    }

    _makeGraph(svg){
        var votesTotals =  d3.nest()
            .key(function(d) { return d.voteChoice; })
            .rollup(function(v) { return v.length; })
            .entries(this.props.poll.votes);
        

        let w = 350;
        let r = 100;
        let barPaddingWidth = 0;
        let yPadding = 30;
        let xPadding = 80;
        let h = (r *2)+ yPadding;

        var legendRectSize  = 18;
        var legendSpacing   = 4;   
        //console.log(this.props.poll);

        var color = d3.scaleOrdinal(d3.schemeCategory20c); 

    

        var pie = d3.pie()                              //this will create arc data for us given a list of values
            .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

        var arc = d3.arc()              //this will create <path> elements for us using arc data
            .innerRadius( (r/Math.PI) *2 )
            .outerRadius(r);

        var labelArc = d3.arc()
            .innerRadius(r - 40)
            .outerRadius(r - 40);

        var g = svg.selectAll(".arc")     //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie(votesTotals) )                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
            .enter()
            .append("g")
            .attr("class", "arc");
            
        g.append("path")
            .attr("d", arc)                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr("fill", function(d, i) { return color(i); } ); //set the color for each slice to be chosen from the color function defined above

       /*     
        g.append("text")
            .attr("transform", function(d) {
                //console.log(d.data.key);
                return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("class", "graph-text")
            .text(function(d) { 
                console.log(d.data.key);
                return d.data.key; });
        */

        var legend = svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * color.domain().length / 2;
            var horz = w * (1/3);
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
          });
        legend.append('rect')
          .attr('width', legendRectSize)
          .attr('height', legendRectSize)
          .style('fill', color)
          .style('stroke', color);
        legend.append('text')
          .attr('x', legendRectSize + legendSpacing)
          .attr('y', legendRectSize - legendSpacing)
          .text(function(d) { 
              //console.log( votesTotals[d].key )
              return votesTotals[d].key }); 




    }




    render(){
        return (
            <div>
                
                <div id={"vote-graph-" + this.props.poll._id} className="vote-graph">
                </div>

            </div>
        )
    }
}

export default VoteGraph; 