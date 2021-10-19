import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ScatterPlot from './ScatterPlot';
import Dropdown from './Dropdown';
import db from './tech_assesment_frontend_data.json';

function App() {
  
  //Taking input of the user from the dropdown menu for both the axes
  const [dataX, setDataX] = useState('');  
  const [dataY, setDataY] = useState(''); 
  //Getting data regarding the rectangular selection by the user from ScatterPlot
  const [displayValueData, setDisplayValueData] = useState([]);
  
  //storing data to an array
  const data = [];        
  for(var s in db){
      data.push(db[s]);
  }

  //Retrieving "CDR3 Nucleotides" from json file to an array
  const CNArray = [];
  for (var s in data){
    var d = data[s].tags;
    var d1 = JSON.parse(d);
    var d2 = d1.airr["CDR3 Nucleotides"]
    CNArray.push(d2);        
  }

  //to display only details of first 10 sequences in the selected region
  const displayArray = []; 
  for(var i=0; i<displayValueData.length; i++){
    if(i<10){
      displayArray.push(displayValueData[i]);
    }
  }  

  //updating states
  const sendDataX = (dropDownData) => {
    setDataX(dropDownData);
  } 
  
  const sendDataY = (dropDownData) => {
    setDataY(dropDownData);
  } 

  const sendDisplayValues = (plotdata) => {
    setDisplayValueData(plotdata);
  }
     
  return (
    <div className="App">      
      <h1>SPA for Scatter Plot</h1>
      
      
      <div className="Drop">
        <Dropdown title="X-axis" sendData={sendDataX} />
        <Dropdown title="Y-axis" sendData={sendDataY} />
      </div>
      <div className="Window">
        <div className="Plot">      
          <ScatterPlot x={dataX} y={dataY} sendDisplayValues={sendDisplayValues}/>    
        </div>
        <div className="Output"> 
          {displayValueData.length > 10 &&
              <p style={{color:"blue"}}>You have selected {displayValueData.length} sequences. Displaying id and CDR3 Nucleotides of only the first 10 sequences</p>
          }   
          {displayArray.map(item => {
            return(
              <div className="Text">
                <p style={{color:"red"}}>id:</p>
                <p>{data[item].id}</p>
                <p style={{color:"red"}}>CDR3 Nucleotides:</p>
                <p>{CNArray[item]}</p>            
              </div>
            );
          })} 
          
        </div> 
       </div>
      
    </div>
  );
}

export default App;
