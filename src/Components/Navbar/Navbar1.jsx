import React from 'react'
import logo from '../../assets/logo.png'
import { Search, ShoppingCart, Triangle, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import CollectionDropdown from '../Dropdown/CollectionDropdown'
import ProfileDrop from './ProfileDrop'


const Navbar1 = () => {
    return (
        <div>
            <div className="fixed z-[100]  w-full">
                <div className="container mx-auto  px-3  bg-white">
                    <div className="flex justify-between">
                        <div className="flex gap-3 ">
                        <NavLink to='/'><img src={logo} className='h-16' alt="Logo" /></NavLink>
                            
                            <div className="group relative flex flex-col justify-end ">
                                <h1 className='text-sm pb-1 font-semibold cursor-pointer tracking-wider uppercase'>
                                <NavLink to='/category/all_collection'>Collections</NavLink></h1>
                                <div className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="10" viewBox="0 0 26 13" fill="none">
                                        <path d="M13 0L25.1244 12.75H0.875645L13 0Z" fill="black" />
                                    </svg>
                                </div>
                                <div className="hidden fixed left-0 right-0 w-full group-hover:flex top-16">
                                    <CollectionDropdown />
                                </div>


                            </div>
                            <div className="flex relative py-3 w-96">
                                <input placeholder='Punjabi Salwar...' type="text" className='bg-gray-500 bg-opacity-25 focus:outline-none px-3 pl-10 w-full rounded-full' />
                                <div className="absolute py-2 px-2">
                                    <Search />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className=" gap-2 text-[13.5px] text-center tracking-wider flex font-[500] uppercase">
                            <NavLink to='/about'>About</NavLink>
                            <NavLink to='/contact'>Contact</NavLink>
                            </div>
                        <div className="h-[60%] w-0.5 bg-black">

</div>

                            <div className="flex relative items-end border-black border px-3 py-1 rounded-full">
                                <User size={32} />
                                <h1 className='text-lg'>Your Profile</h1>
                                <div className="absolute top-14">
                                    <ProfileDrop/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar1