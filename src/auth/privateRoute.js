import React,{Component} from 'react'
import { isAuthenticated} from './index'
import {Route,Redirect} from 'react-router-dom'
export default function PrivateRoute({component:Component,...rest}) {
    return (
        <Route
            {...rest}
            render={props=>
            isAuthenticated()?(
                <Component {...props}/>

            ):(
                <Redirect 
                to={{
                    pathname:"/signin",
                    state:{from :props.location}
                }}/>
            )
}
        />
    )
}
