import { Square } from "./Square";
import { useState } from "react";
export default function app() {

  const [array,setArray] = useState([["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""]]);
  const [SValue, setSv] = useState("");
  const [Start, setStart] = useState({colum : null , row : null});
  const [goal, setGoal] = useState({colum : null , row : null});
  const [solid, setSolid] = useState([]);
  

  const valueset = (r,c)=> {
    if(SValue === '') return

    const newarray = [...array];

    if(SValue === "Start"){
      for(let i=0; i<newarray.length; i++){
        for(let j=0; j<newarray[i].length;j++){
          if(newarray[i][j]==="Start"){
            newarray[i][j]= "";
          }
        }
      }
      newarray[r][c] = SValue;
      setStart({row : r, colum : c})
      setSv("");
    }

    if(SValue === "Goal"){
      for(let i=0; i<newarray.length; i++){
        for(let j=0; j<newarray[i].length;j++){
          if(newarray[i][j]==="Goal"){
            newarray[i][j]= "";
          }
        }
      }
      newarray[r][c] = SValue;
      setGoal({row : r, colum : c});
      setSv("");
    }

    if(SValue === "Solid"){
      newarray[r][c] = SValue;
      setSolid(s=>[...s, r+''+c]);
    }
    
    setArray(newarray);
    
  }

  function showresult(){
    if(Start.colum===null|| goal.colum ===null){
      return 
    }
    const newarray = [...array];
    for(let i=0; i<newarray.length; i++){
      for(let j=0; j<newarray[i].length;j++){
        if(newarray[i][j]==="Start" || newarray[i][j]==="Goal" || newarray[i][j]==="Solid"){
        }else{
           newarray[i][j] = `G:${Math.round(Math.sqrt(Math.pow((Start.row -i),2)+Math.pow((Start.colum -j),2))*10)} 
                            `
           
        }
      }
      setArray(newarray);
    }
  }
  const setValue =(evt)=>{
    if(evt.target.textContent==='Solid'){
      setSv('solid');
      } else if(evt.target.textContent==='Goal'){
        setSv('Goal');
        }else{
          setSv('Start');
    }
    
  }



  return(
    <><div className='map'>
      {array.map((row, indexr)=>{
        return row.map((colum, indexc)=>{
          return(
          <Square key={`${indexr}${indexc}`}children={colum} row={indexr} column={indexc} change={()=>valueset(indexr,indexc)}></Square>
          )
        })
      })}
    </div>
    <section>
      <button onClick={showresult}>show</button>
      <div onClick={setValue} className="square">Start</div>
      <div onClick={setValue} className="square">Goal</div>
      <div onClick={setValue} className="square">Solid</div>
    </section>
    
    </>
  )
}