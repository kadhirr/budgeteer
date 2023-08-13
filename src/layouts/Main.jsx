import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helper'

import wave from '../assets/wave.svg'
import Navbar from '../components/Navbar';
export function mainLoader() {
    const username = fetchData('username');
    return { username }
}

const Main = () => {
    const { username } = useLoaderData();
    return (
        <div className='layout'>
            <Navbar userName={username}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main