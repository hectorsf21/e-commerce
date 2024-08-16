import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import logoGoogle from '@/images/google.png'

export default function Login() {
    // VARIABLES
    const [loader, setLoader] = useState(false)
    // FUNCIONES
    const handleSubmit = ()=>{

    }
    const handleChange = () =>{

    }
  return (
    <>   
    <div className='flex justify-center'>
        {/* FORMULARIO */}
                <div className='flex justify-center items-center bg-gray-100 shadow-2xl py-8 px-12 w-1/2'>
                    <div  className='bg-white w-11/12 p-4' >

                    <h3 className='text-2xl text-center font-semibold text-gray-500 mb-4 mt-2'>Sign in</h3>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label><br />
                        <input onChange={handleChange} className='appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline' type='text' name='email' /><br />
                        <label>Password</label><br />
                        <input onChange={handleChange} className='appearance-none border rounded w-full py-2 px-3 text-gray-700 my-3 leading-tight focus:outline-none focus:shadow-outline' type='password' name='password' />
                        <div className='w-full'>
                            <button className='hover:bg-blue-900 w-full cursor-pointer border border-gray-200 text-white bg-slate-950 text-center py-2 mt-4 rounded-md'>Sign in</button>
                        </div>
                    </form>

                    <p className='text-center my-4'>OR</p>
                    <div onClick={() => setLoader(true)} className={`${loader ? 'hidden' : 'null'} border border-gray-300 rounded-md text-center w-full`}>
                        <button onClick={() => signIn('google')} className='flex w-full gap-2 justify-center items-center bg-white py-2 rounded-lg'><Image src={logoGoogle} width={30} height={30} alt='logo de google' />Login with Google</button>
                    </div>
                    <div className={`loader-spinner text-center mx-auto w-full ${loader ? 'null' : 'hidden'}`}></div>
                    </div>
                </div>
        {/* IMAGEN */}
        <div className='fondoimagen w-1/2 min-h-screen'>
            {/* esta es la imagen */}
            {/* <Image className='fondoImagen min-h-screen' src={fondo}/> */}
        </div>
    </div>
    </>
  )
}
