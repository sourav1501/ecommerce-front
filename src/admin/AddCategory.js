import React,{useState} from 'react'
import Layout from '../core/Layout'
import {Link}  from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {CreateCategory} from './apiAdmin'
export default function AddCategory() {
    const[name,setName]=useState('')
    const[error,setError]=useState(false)
    const[success,setSuccess]=useState(false)
// destructure user and token from locastorage
const {user,token}=isAuthenticated()
const handleChange=(e)=>{
    setError('')
    setName(e.target.value)
}
const clickSubmit=(e)=>{
    e.preventDefault()
    setError('')
    setSuccess(false)
    //make request to api to create category
    CreateCategory(user._id,token,{name})
    .then(data=>{
           if(data.error){
               setError(true)
           }else{
               setError("")
               setSuccess(true)
           }
       })
}
   const newCategoryForm=()=>{

   return (
        <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
        </div>
        <button className="btn btn-outline-primary" onClick={clickSubmit}>Create Category</button>

        </form>
    )
}
const showSuccess=()=>{
    if(success){
        return <h3 className="text-success">Category is created</h3>
    }
}
const showError=()=>{
    if(error){
        return <h3 className="text-danger">{name} is should be unique</h3>
    }
}
const goBack=()=>{
    return <div className='mt-5'>
        <Link to="/admin/dashboard" className="text-warning" >Back to Dashboard</Link>
    </div>
}
return (
    <Layout title="Dashboard" desciption={`Gday ${user.name}!,ready to add a new category`} >
      <div className="row">
          <div className="col-md-8 offset-md-2">
              {showSuccess()}
              {showError()}
              {newCategoryForm()}  
              {goBack()}
              </div>
        
      </div>
       

    </Layout>
 )
}
