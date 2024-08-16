import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className='flex flex-col text-slate-400 font-semibold bg-black h-[200px] py-4 px-10'>
            <nav className='flex gap-8 items-center h-full justify-end'>
                <Link href={'/'}>Home</Link>
                <Link href={'/products'}>Products</Link>
                <Link href={'/categories'}>Categories</Link>
                <Link href={'/account'}>Account</Link>
                <Link href={'/cart'}>Cart(0)</Link>
            </nav>
            <div className='flex justify-center h-full items-end'> 
                <p>Powered by e-commerce. ©2023 e-commerce Venezuela</p>
            </div>
        </div>
    )
}
