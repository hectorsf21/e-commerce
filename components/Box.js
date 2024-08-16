import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Box({ title, imagenProduct, category, price, productAdd, handleAddCar, product_id }) {

  return (
    <>

      <div className=' bg-white flex flex-col items-center justify-between h-full rounded-md relative'>
        {/* IMAGE */}
        <div className='pt-6 pb-6 w-full mx-auto text-center'>
          <Image className='mx-auto' src={imagenProduct?.secure_url} width={imagenProduct.width > imagenProduct.height ? '240' : '135'} height={imagenProduct.width > imagenProduct.height ? '240' : '218'} alt='imagen box' />
        </div>
        {/* DESCRIPTION */}
        <div className='w-full bg-gray-100 pt-3'>
          <p className='w-11/12 mx-auto font-semibold text-black text-sm'>{title}</p>
          <div className='flex w-11/12 m-auto items-center justify-between my-4'>
            <div className='text-violet-900'>
              <p className='fontLato font-bold'>{price}$</p>
            </div>
            <div className=''>
              <button onClick={(element) => handleAddCar(productAdd)} className='bg-indigo-600 px-4 py-1 rounded-sm flex items-center gap-2 text-white'><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              </div>Add Cart</button>
            </div>
          </div>


          <div className='w-11/12 m-auto mb-4'>
            <Link href={'/viewMore/' + product_id}>
              <button className='w-full px-2 py-2 border border-gray-400 rounded-sm text-black text-sm font-semibold hover:text-white hover:bg-black'>View More</button>
            </Link>
            
          </div>
        </div>
      </div>

    </>
  )
}
