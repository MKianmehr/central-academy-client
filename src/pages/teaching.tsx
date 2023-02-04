import React from 'react'
import Teaching from '../components/pages/Teaching'
import SwipeableTempDrawer from '../components/commons/SwipeableTempDrawer'
import NavBar from '../components/commons/Navbar'

const teaching = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <Teaching />
        </>
    )
}

export default teaching