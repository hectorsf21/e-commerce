import { React, useEffect } from 'react'
import Image from 'next/image'
import { useTask } from '@/context/TaskContext'
export default function MsgAddCar() {
    const { car, msgCar, setMsgCar, addCar, previewAdd, setPreviewAdd } = useTask()
    // FUNCIONES
    const handleCancel = () => {
        setMsgCar(false)
        setPreviewAdd()
    }
    const handleCanProduct = (e) => {
        const val = e.target.value
        setPreviewAdd({ ...previewAdd, product_cantidad: val })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setMsgCar(false)
        addCar(previewAdd)
        //console.log(previewAdd)
    }


    return (
        <>
            {previewAdd &&
                <div className={`bg-black bg-opacity-50 fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center ${msgCar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                    <div className={`min-w-[350px] bg-white rounded shadow p-6 transition-all duration-800 ${msgCar ? 'transform -translate-y-[1px]' : 'transform -translate-y-[500px]'}`}>

                        <form onSubmit={handleSubmit}>
                            <div className='text-center'>
                                <Image className='m-auto' src={previewAdd.product_photo[0].secure_url} width={'150'} height={'150'} alt='foto preview product' />
                                <p className='my-10'>{previewAdd.product_name}</p>
                                <p className='mt-10 mb-5'>cantidad max ({previewAdd.product_stock})</p>
                                <input className='text-center w-1/2 border mb-10 outline-none' onChange={handleCanProduct} type='number' min={1} defaultValue={1} max={previewAdd.product_stock} required />
                            </div>


                            <div className="flex justify-end">
                                <button className="px-4 py-2 mr-2 text-white bg-indigo-600 rounded hover:bg-red-600" >confirm</button>
                                <button className="px-4 py-2 text-white bg-black rounded hover:bg-gray-600" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>

                    </div>

                </div>
            }
        </>
    )
}
