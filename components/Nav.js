import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTask } from '@/context/TaskContext'
export default function Nav({ isFixed, setIsFixed }) {
    const { car } = useTask()
    const [active, setActive] = useState(false)
    return (
        <>
            {/* DESK */}
            <div className='hidden navMobile:block'>
                <div className={`w-full h-24 z-50 font-semibold bg-gradient-to-r from-indigo-500 to-white centra flex items-center justify-between shadow text-stone-700 ${isFixed ? 'fixed' : ''}`}>
                    <Link className='text-white flex gap-3' href={'/'}><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    </div>Ecommerce</Link>
                    <nav className='flex gap-8'>
                        <Link href={'/'}>Home</Link>
                        <Link href={'/products'}>Products</Link>
                        <Link href={'/categories'}>Categories</Link>
                        <Link href={'/account'}>Account</Link>
                        <Link className='flex items-center' href={'/car'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg> ({car.length})</Link>
                    </nav>
                </div>
            </div>
            {/* MOBILE */}
            <div className='block navMobile:hidden'>
                <div className={`w-full h-24 z-50 font-semibold bg-gradient-to-r from-indigo-500 to-white centra flex items-center justify-between shadow text-stone-700 ${isFixed ? 'fixed' : ''}`}>
                    <Link className='text-white flex gap-3' href={'/'}><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>
                    </div>Ecommerce</Link>
                    <div onClick={() => setActive(!active)} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>


                </div>
                <div className={` ${active ? 'opacity-100' : 'fixed opacity-0'} transition-all duration-300`}>
                    <nav className='text-center'>
                        <ul>
                            <li className='navLi border'><Link href={'/'}>Home</Link></li>
                            <li className='navLi border-b'><Link href={'/products'}>Products</Link></li>
                            <li className='navLi border-b'><Link href={'/categories'}>Categories</Link></li>
                            <li className='navLi border-b'><Link href={'/account'}>Account</Link></li>
                            <li className='navLi border-b'>
                                <div className='flex w-full justify-center items-center'>
                                <Link  href={'/car'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-center m-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </Link>
                                ({car.length})
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
