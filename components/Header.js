import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import lapto from '@/images/lapto.png'
import BannerHeader from './BannerHeader'
import Nav from './Nav'

export default function Header() {
    const [isFixed, setIsFixed] = useState(false);
    // SCROLL FIXED
    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.pageYOffset;
          const isAtTop = scrollTop === 0;
          setIsFixed(!isAtTop);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    // SCROLL FIXED CLOSE
    return (
        <>
           
            <Nav
            isFixed={isFixed}
            setIsFixed={setIsFixed}
             />
            <BannerHeader>
                <div className='centra shadow'>
                    <div className='centra flex justify-around'>
                        <div className=''>
                            <h1 className='text-6xl mb-10'>Macbook 14Pro</h1>
                            <p className='max-w-md mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper vestibulum purus, in imperdiet nisl pretium vel. Aliquam interdum pharetra commodo. Vestibulum pulvinar,</p>
                            <div>
                                <button className='bg-indigo-600 px-4 py-2 rounded-sm flex gap-2 text-white'><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                </div>Add Cart</button>
                            </div>

                        </div>
                        <div className=''>
                            <Image className='' src={lapto} width={'450'} alt='imagen lapto' />
                        </div>
                    </div>
                </div>
            </BannerHeader>
        </>
    )
}
