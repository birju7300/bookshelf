import React from 'react'

export default function User(props) {
    let user = props.user ? props.user.login : null
    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png"/>
            </div>
           {user ?
            <div className="nfo">
                <div><span>First Name:</span> {user.firstName}</div>
                <div><span>Last Name:</span> {user.lastName}</div>
                <div><span>Email:</span> {user.email}</div>
            </div> : null}
        </div>
    )
}
