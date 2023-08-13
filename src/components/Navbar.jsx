import React from 'react'
import logomark from '../assets/logomark.svg'
import { Form, NavLink } from 'react-router-dom'
import {TrashIcon} from '@heroicons/react/24/solid'

const Navbar = ({ userName }) => {
    return (
        <nav>
            <NavLink to="/" aria-label="Go to Home">
                <img src={logomark} alt="" height={30} />
                <span>Budgeteer</span>
            </NavLink>
            {
                userName && (
                    <Form
                        method="post"
                        action="/logout">
                            <button type="submit" className='btn btn--warning'><TrashIcon width={20}/><span>Delete User</span></button>
                    </Form>
                )
            }
        </nav>
    )
}

export default Navbar