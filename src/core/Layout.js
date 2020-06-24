import React from 'react'
import Menu from './Menu'
import "../styles.css"
export default function Layout({title="Title",desciption="Description",className,children}) {
    return (
       <React.Fragment>
           <Menu/>
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{desciption}</p>
        </div>
    <div className={className}>{children}</div>
        </React.Fragment>
    )
}
