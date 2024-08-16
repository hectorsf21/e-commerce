import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React, { useRef, useState } from 'react';
import db from '@/lib/db'
import productModel from '@/model/productModel'
import Image from 'next/image'
import MsgAddCar from '@/components/MsgAddCar'
import { useTask } from '@/context/TaskContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// SERVER

export const getServerSideProps = async ({ params }) => {
  try {
    await db()
    const response = await productModel.findById(params.id).lean()
    response._id = response._id.toString()
    return { props: { response } };
  } catch (err) {
    console.log(err)
    return { props: { response: [] } }
  }
}

// SERVER CLOSE

export default function viewMore({ response }) {
  const { msgCar, setMsgCar, setPreviewAdd } = useTask()
  const [indice, setIndice] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  // FUNCIONES

  const handleIndex = (index) => {
    setIndice(index);
  }
  const handleAddCar = (e) => {
    setMsgCar(true)
    e = { ...e, product_cantidad: 1 }
    setPreviewAdd(e)
  }
  const resultado = response.product_photo.map((x) => {
    return x.secure_url
  })
  console.log(resultado[0])
  return (
    <>
      {/* MESSAGE CAR ADD OPEN */}
      <MsgAddCar />
      {/* MESSAGE CAR ADD CLOSE */}
      <div>
        <Nav />
        <div className='w-full h-screen'>
          {response &&
            <div className='border hidden md:block md:max-w-[768px] lg:max-w-[1024px] 2xl:max-w-[1280px] m-auto mt-24 mb-32'>
              <div className='flex justify-between'>
                <div className='flex flex-col border min-w-[80px]'>
                  {/* CARROUSEL DE IMAGENES */}
                  {response.product_photo.map((photo, index) => (
                    <div onClick={(e) => handleIndex(index)} key={index} className='p-5 hover:border border-green-500 cursor-pointer'>
                      <Image src={photo.secure_url} width={42} height={42} alt='referencia' />
                    </div>
                  ))}
                </div>
                {/* IMAGEN GRANDE */}
                <div className='w-auto lg:min-w-[550px] flex items-center justify-center py-4 px-24'>
                  <Image src={response.product_photo[indice].secure_url} width={response.product_photo.width > response.product_photo.height ? '450' : '250'} height={'50'} alt='referencia' />
                </div>
                {/* DESCRIPCION */}
                <div className='border p-4 w-auto lg:min-w-[358px]'>
                  <p className='font-semibold fontMonse text-gray-700'>{response.product_name}</p>
                  <>
                    <p className='fontMonse text-gray-700 my-4'>DESCRIPCION:</p>
                    {Object.keys(response.propiedades).map(propiedad => (
                      <div key={propiedad}>
                        <p className='fontMonse text-gray-700'><strong>{propiedad}:</strong> {response.propiedades[propiedad]}</p>
                      </div>
                    ))}
                  </>
                  <p className='fontLato text-2xl text-gray-950 my-6'>{response.product_price}$</p>
                  <div>
                    <div className=''>
                      <button onClick={(e) => handleAddCar(response)} className='hover:bg-black bg-indigo-600 px-4 py-1 rounded-sm flex items-center gap-2 text-white'><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      </div>Add Cart</button>
                    </div>
                    <div className='w-full flex flex-col justify-end mt-5 text-center'>
                      <button onClick={(e) => handleAddCar(response)} className='fontInter w-full bg-green-600 hover:bg-black px-4 py-1 rounded-sm text-white text-md'>Comprar</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          }
          {/* MOBILE */}
          {response &&
            <div className='block md:hidden border'>
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {response.product_photo.map((photo, index) => (
                  <SwiperSlide key={`${photo}-${index}`}>
                    <Image src={photo.secure_url} width={response.product_photo.width > response.product_photo.height ? '450' : '250'} height={'50'} alt='referencia' />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* DESCRIPTION */}
              <div className='w-9/12 m-auto mb-12 border p-2'>
                {/* title */}
                <p className='font-semibold fontMonse text-gray-700'>{response.product_name}</p>
                {/* Description */}
                <p className='fontMonse text-gray-700 my-4'>DESCRIPCION:</p>
                {Object.keys(response.propiedades).map((propiedad, index) => (
                  <div key={`${propiedad}-${index}`}>
                    <p className='fontMonse text-gray-700'><strong>{propiedad}:</strong> {response.propiedades[propiedad]}</p>
                  </div>
                ))}
                <p className='fontLato text-2xl text-gray-950 my-6'>{response.product_price}$</p>
                <button onClick={(e) => handleAddCar(response)} className='hover:bg-black bg-indigo-600 px-4 py-1 rounded-sm flex items-center gap-2 text-white'><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                </div>Add Cart</button>
                <div className='w-1/2 m-auto flex flex-col justify-end mt-5 text-center'>
                  <button onClick={(e) => handleAddCar(response)} className='fontInter text-md w-full bg-green-600 hover:bg-black px-4 py-1 rounded-sm text-white'>Comprar</button>
                </div>

              </div>
            </div>
          }
        </div>
        <div  className='mt-12'>
          <Footer />
        </div>
      </div>
    </>
  )
}
