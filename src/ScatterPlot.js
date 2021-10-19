//the scatter plot component using d3
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import db from './tech_assesment_frontend_data.json';

const ScatterPlot = (props) => {
    let igxDataArray = [];
    const d3Plot = useRef()    
    const update = useRef(false);


    useEffect(()=>{

        //redraw the plot fully when an update happens
        if(update.current){
            d3.selectAll('g').remove()
        } else{
            update.current = true;
        }        
       
        //storing data to an array
        const data = [];        
        for(var s in db){
            data.push(db[s]);
        }

        //Retrieving "igx-profile" from json file to an array
        for (var s in data){
            var d = data[s].tags;
            var d1 = JSON.parse(d);
            var d2 = d1["igx-profile"]
            igxDataArray.push(d2);        
        }
       
        //starting with the plot
        const margin = {top:20, right:30, bottom:50, left:50}
        const width =  1200 - margin.left - margin.right;
        const height = 550 - margin.top - margin.bottom; 
            
        //Add svg object to the app
        const svg = d3.select(d3Plot.current)
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .style('background-color','#f0f0f0')
                        .append('g')                    
                            .attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');
    
        //Add X-axis
        var x = d3.scaleLinear()
            .domain(d3.extent(igxDataArray, d => d[props.x]))
            .range([0,width])
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x))

        //Add Y-axis
        var y = d3.scaleLinear()
            .domain(d3.extent(igxDataArray, d => d[props.y]))
            .range([height,0])
        svg.append('g')
            .call(d3.axisLeft(y))

        //Add X axis label
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + margin.left)
            .attr("y", height + margin.top + 20)
            .text(props.x);

        //Add Y axis label
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height/2 + 20)
            .text(props.y)
            
        //Add the dots on the graph
        const myPlot = svg.append('g')
                                .selectAll('circle')
                                .data(igxDataArray)
                                .enter()
                                .append('circle')
                                    .attr("cx", (d) => x(d[props.x]))
                                    .attr("cy", (d) => y(d[props.y]))
                                    .attr("r", 3)
                                    .style("fill", "#69b3a2")
                                    .style("stroke","black")
                    
        //Adding rectangular selection using d3 brush
        const brush = d3.brush()
                            .extent([[0, 0], [width, height]])
                            .on('end', ({selection}) => {
                                let value = [];
                                if (selection) {
                                    const [[x0, y0], [x1, y1]] = selection;
                                    value = myPlot                                                
                                                .filter(d => x0 <= x(d[props.x]) && x(d[props.x]) < x1 && y0 <= y(d[props.y]) && y(d[props.y]) < y1)                                               
                                                .data();
                                }
                                //array carrying the indices of the points in the rectangular selection
                                let valArray = [];
                                for(var i=0; i<igxDataArray.length; i++){
                                    let str = JSON.stringify(igxDataArray[i]);
                                    for(var j=0; j<value.length; j++){
                                        let str1 = JSON.stringify(value[j]);
                                        if(str1===str){
                                            valArray.push(i);
                                        }
                                    }
                                }
                                //sending it to the App.js
                                props.sendDisplayValues(valArray);
                            })                                           
                                      

        svg.append('g')
            .attr('class', 'brush')
            .call(brush);
            
        
       
        


    },[props.x,props.y]);

    

    return(
        <div>
            <svg ref={d3Plot}></svg>
        </div>
    );
}

export default ScatterPlot;
