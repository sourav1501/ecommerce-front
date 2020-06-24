import React,{useState,useCallback} from 'react'

export default function Checkbox({categories,handleFilters}) {
    const [checked,setChecked]=useState([])
    const handleToggle=c=>()=>{
           const currentCategoryId=checked.indexOf(c)
           const newCheckedCategoryId=[...checked]

           if(currentCategoryId===-1){
               newCheckedCategoryId.push(c)
           }else{
               newCheckedCategoryId.splice(currentCategoryId,1)
           }
           console.log(newCheckedCategoryId)
           setChecked(newCheckedCategoryId)
           handleFilters(newCheckedCategoryId)
    }
    return (
        <div>
            {
                categories.map((c,i)=>(
                    <li key={i} className="list-unstyled">
                        <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id===-1)}type="checkbox" className="form-check-input"/>
                        <label className="form-check-label">{c.name}</label>
                    </li>
                ))
            }
        </div>
    )
}
