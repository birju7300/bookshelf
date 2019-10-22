import React from 'react'
import Sidenavigation from 'react-simple-sidenav'
import SidenavItems from './sidenav_items'

export default function Sidenav(props) {
    return (
        <Sidenavigation
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background:'#242424',
                maxWidth:'220px'
            }}
        >
        <SidenavItems/>
        </Sidenavigation>
    )
}
