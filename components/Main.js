import React, { useState, useEffect } from 'react'
import Box from '@/components/Box'
import { useTask } from '@/context/TaskContext'
import MsgAddCar from './MsgAddCar'
export default function Main() {
    const {productos, setMsgCar, setPreviewAdd} = useTask()
    
    //console.log(cantProduct)
    const handleAddCar = (e)=>{
        setMsgCar(true)
        e = {...e, product_cantidad:1 }
        setPreviewAdd(e)
      }
    return (
        <>
        {/* MESSAGE CAR ADD OPEN */}
        <MsgAddCar/>
        {/* MESSAGE CAR ADD CLOSE */}
        {/* xl:grid-cols-[repeat(auto-fill,450px)] xl:gap-4*/}
        {/* content grid max-w-1800 mx-auto grid-cols-[repeat(auto-fill,250px)] md:grid-cols-[repeat(auto-fill,250px)] lg:grid-cols-[repeat(auto-fill,320px)] xl:grid-cols-[repeat(auto-fill,550)] gap-y-8   justify-around */}
            <div className='px-4 md:px-6 py-10 bg-gray-200'>
            {productos.length > 0 ?
                <div className='w-full m-auto content grid sm:grid-cols-[repeat(3,1fr)]  sm:gap-[32px] 2xl:grid-cols-[repeat(4,1fr)] 2xl:gap-4'>
                     { productos.map((e)=>{
                        return(
                            <Box
                            key={e._id}
                            title={e.product_name}
                            imagenProduct={e.product_photo[0]}
                            category={e.product_category}
                            price={e.product_price}
                            productAdd={e}
                            handleAddCar={handleAddCar}
                            product_id={e._id}
                            />
                        )
                    })}
                </div>
                :<div className='py-[250px]'><h1 className="text-center text-2xl">No hay productos en estos momentos...</h1></div>}
            </div>
        </>
    )
}
