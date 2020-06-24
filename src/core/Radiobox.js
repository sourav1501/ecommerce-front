import React,{useState,useCallback} from 'react'
 
 export default function Radiobox({prices,handleFilters}) {
     const [value,setValue]=useState(0)
     const handleChange=(e)=>{
         handleFilters(e.target.value)
         setValue( e.target.value)

     }
     return (
         <React.Fragment>
            {
                prices.map((p,i)=>(
                    <li key={i} className="list-unstyled">
                        <input onChange={handleChange} value={p._id}type="radio" name={p}className="mr-2 ml-4"/>
                        <label className="form-check-label">{p.name}</label>
                    </li>
                ))
            }
         </React.Fragment>
     )
 }
 