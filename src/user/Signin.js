import React, { useState } from 'react'
import Layout from '../core/Layout'
import {Link,Redirect} from  'react-router-dom'
import {signin,authenticate, isAuthenticated} from '../auth/index'
const Signin = () => {
    const [values, setValues] = useState({
     
        email: 'sharmaaa@gmail.com',
        password: '123456',
        error: '',
        loading:false,
        redirectToReferrrer:false
    })

    const handleChange = name => (e) => {
        setValues({
            ...values,
            error: false,
            [name]: e.target.value
        })
    }
    const { email, password, error, redirectToReferrrer ,loading} = values

     const {user}=isAuthenticated()
    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:false,loading:true})
        signin({  email, password })
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values, error: data.error, loading: false
                    })
                } else {
                   authenticate(data,()=>(
                       setValues({
                    ...values,
                  redirectToReferrrer:true
                })
                   ))
            }
            })
    }
    const signUpForm = () => (
        <form>
           
            <div className='form-group'>
                <label className="text-muted"> Email</label>
                <input type="email" onChange={handleChange("email")} className="form-control" value={email}></input>
            </div>
            <div className='form-group'>
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange("password")} className="form-control" value={password}></input>
            </div>
            <button onClick={clickSubmit} className='btn btn-primary'>Submit</button>
        </form>
    )
    const showError = () => (
        <div className='alert alert-danger' style={{ display: error ? '' : "none" }}>
            {error}
        </div>
    )
    const showLoading = () => (
         loading&& (<div className="alert alert-info"><h2>loading...</h2></div>)
    )

    const redirectUser=()=>{
        if(redirectToReferrrer){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>

            }else{
                return <Redirect to="/user/dashboard"/>

            }
        }
    }
    return (
        <Layout title="Signin" desciption="Node " className="container col-md-8 offset-md-2" >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>

    )
}
export default Signin