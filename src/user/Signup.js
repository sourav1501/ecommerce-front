import React, { useState } from 'react'
import Layout from '../core/Layout'
import {Link} from  'react-router-dom'
import {signup} from '../auth/index'
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const handleChange = name => (e) => {
        setValues({
            ...values,
            error: false,
            [name]: e.target.value
        })
    }
    const { name, email, password, success, error } = values

 
    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:false})
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({
                        ...values, error: data.error, success: false
                    })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success:true
                    })
                }
            })
    }
    const signUpForm = () => (
        <form>
            <div className='form-group'>
                <label className="text-muted"> Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")} value={name}></input>
            </div>
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
    const showSuccess = () => (
        <div className='alert alert-info' style={{ display: success ? '' : "none" }}>

            New account is created please <Link to="/signin">Signin</Link>
        </div>
    )
    return (
        <Layout title="Signup" desciption="Node " className="container col-md-8 offset-md-2" >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>

    )
}
export default Signup