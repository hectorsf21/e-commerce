import Footer from '@/components/Footer'
import { React, useEffect, useState } from 'react'
import { useTask } from '@/context/TaskContext'
import Image from 'next/image'
import Nav from '@/components/Nav'
import db from '@/lib/db'
import mPagoModel from '@/model/mPagoModel'
import mEnvioModel from '@/model/mEnvioModel'
import tarjeta from '@/model/tarjeta'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

// SERVER
export async function getServerSideProps() {
    try {
        await db()
        // TARJETA DE CREDITO
        const respBoolean = await tarjeta.find({});
        const tarjetas = respBoolean.map((tar) => tar.toObject());
        const serializedTarjetas = JSON.parse(JSON.stringify(tarjetas));
        // METODO DE ENVIO
        const res = await mEnvioModel.find({})
        // console.log(res)
        const envios = res.map((e) => {
            const envio = e.toObject()
            envio._id = e._id.toString()
            return envio
        })
        // METODO DE PAGO
        const resp = await mPagoModel.find({})
        // console.log(resp)
        const pagos = resp.map((e) => {
            const pago = e.toObject()
            pago._id = e._id.toString()
            return pago
        })
        return { props: { pagos, envios, respBoolean: serializedTarjetas } };
    } catch (error) {
        return { props: { pagos: [], envios: [], respBoolean: [] } };
    }

}
// SERVER CLOSE

export default function car({ pagos, envios, respBoolean }) {
    // console.log(pagos)
    // console.log(envios)
    console.log(respBoolean)

    const init = {
        client_name: '',
        client_email: '',
        client_mobile: '',
        banco_pago: '',
        tarjeta_pago: '',
        client_transaccion: '',
        empresa_envio: '',
        direccion_envio: '',
        ciudad_envio: '',
        persona_recibe: '',
        identificacion_recibe: '',
        telefono_recibe: '',
        monto_pago: '',
        car: []
    };
    
    const [order, setOrder] = useState(init)
    const { car, deleteCar } = useTask()
    const [isFixed, setIsFixed] = useState(false);
    const [activePago, setActivePago] = useState(false);
    const [banca, setBanca] = useState(false);
    const [credito, setCredito] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [active_credito, setActive_credito] = useState(respBoolean[0].tarjeta_credito)
    console.log(car)
    console.log(order)
    console.log(active_credito)

    // FUNCIONES
    const handleChange = (e)=>{
        const {name, value} = e.target
        setOrder({...order, [name]:value})
    }
    const handleBanca = ()=>{
        setBanca(!banca)
        setCredito(false)
    }
    const handleCredito = ()=>{
        setCredito(!credito)
        setBanca(false)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const resp = await axios.post('/api/orders', {order})
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmitCredit = async(e)=>{
        e.preventDefault()
        try {
            const resp = await axios.post('/api/orders', {order})
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
        try {
            const response = await axios.post('/api/checkout_session', {totalPrice})
            // console.log(response)
            const { url } = response.data; // Obtener la URL de redirección desde la respuesta JSON
            window.location.replace(url); // Redireccionar al proceso de pago
          } catch (error) {
            console.log(error)
          }
    }

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
    // TOTAL A PAGAR
    useEffect(() => {
        const totalpago = () => {
            const totalPrice = car.reduce((acc, item) => acc + parseFloat(item.product_price * item.product_cantidad), 0);
            setTotalPrice(totalPrice);
        };

        totalpago();
    }, [car]);

    useEffect(()=>{
        setOrder({...order, monto_pago:totalPrice})
    },[totalPrice])

    useEffect(()=>{
        setOrder({...order, car:car})
    },[car])


    // STRIPES
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      
      }, []);
    return (
        <>
            <Nav
                isFixed={isFixed}
                setIsFixed={setIsFixed}
            />
            <div className='border'>
                <div className='py-[50px]  flex gap-4 items-center justify-center'>
                    <p className='text-center text-xl'>TOTAL A PAGAR: {totalPrice}$</p>
                    <div>
                        <button onClick={(e) => setActivePago(!activePago)} className='bg-black text-white text-md px-4 py-2 rounded-md'>REALIZAR PAGO</button>
                    </div>
                </div>
                {/* BOTONES PARA PAGAR */}
                <div className={`flex mb-8 items-center justify-center gap-8 transition-all duration-500 ${activePago ? 'relative opacity-100 transform translate-y-[1px]' : 'absolute left-0 right-0 m-auto transform -translate-y-[100px] opacity-0 pointer-events-none'}`}>
                    <div>
                        <button onClick={handleBanca} className='bg-indigo-900 text-white py-2 px-4 rounded-md'>Transferencia Bancaria<br /> u otro Servicio</button>
                    </div>
                    <div className={`${active_credito ? 'null':'hidden'}`}>
                        <button onClick={handleCredito} className='bg-indigo-900 text-white px-4 py-2 rounded-md'>Tarjeta de Credito</button>
                    </div>
                </div>
                {/* TRANSFERENCIA BANCARIA */}
                <div className={`border w-9/12 m-auto p-8 ${banca ? 'null':'hidden'}`}>
                    <div>
                        <h1 className='text-blue-900 mb-4'>NUESTROS BANCOS O RECEPTORES DE PAGO</h1>
                        <div className='bg-blue-900 w-full h-[2px] mb-5'></div>
                    </div>
                    <div className='flex gap-4'>
                    {pagos && pagos.map((e) => {
                        return (
                            <div key={e._id} className='flex'>
                                <div className='border p-4'>
                                    <h1 className='text-blue-900'>BANCO:</h1>
                                    <p className='mb-4 mt-0 leading-3'>{e.name_banco}</p>
                                    {e.field_custom.map((f, index) => {
                                        return (
                                            <div key={index}>
                                                <h1 className='text-blue-900'>{f.name.toUpperCase()}:</h1>
                                                <p className='mb-4 mt-0 leading-3'>{f.description}</p>
                                            </div>
                                        )
                                    })}
                                <h1 className='text-blue-900'>MONTO A PAGAR:</h1>
                                <p className='mb-4 mt-0 leading-3'>{totalPrice}$</p>
                                </div>
                                
                            </div>

                        )
                    })}
                    </div>
                    <div>
                        <h1 className='text-blue-900 mb-4 mt-8'>NOTIFIQUE EL PAGO Y ESCOGA EL METODO DE ENVIO</h1>
                        <div className='bg-blue-900 w-full h-[2px] mb-5'></div>
                    </div>
                    <div className='w-8/12 m-auto mt-12 border py-8'>
                        <form onSubmit={handleSubmit}>
                            {/* NOMBRE Y APELLIDO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NOMBRE Y APELLIDO</label><br />
                                <input onChange={handleChange} className='border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_name' /><br />
                            </div>

                            {/* CORREO ELECTRONICO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CORREO ELECTRONICO</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_email' /><br />
                            </div>

                            {/* NUMERO TELEFONICO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NUMERO TELEFONICO</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_mobile' /><br />
                            </div>

                            {/* BANCO RECEPTOR */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>A CUAL DE NUESTROS BANCOS REALIZO EL PAGO</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='banco_pago' /><br />
                            </div>

                            {/* NUMERO DE LA TRANSACCION */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NUMERO DE LA TRANSACCION</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_transaccion' /><br />
                            </div>

                            {/* EMPRESA DE ENVIO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>EMPRESA DE ENVIO</label><br />
                                <select onChange={handleChange} className='border border-blue-400 outline-none mt-2 mb-4' name="empresa_envio">
                                    <option value=''>Seleccionar</option>
                                    {envios && envios.map((n) => {
                                        return (
                                            <option key={n._id} value={n.envio_name}>{n.envio_name.toUpperCase()}</option>
                                        )
                                    })}
                                </select><br />
                            </div>

                            {/* DIRECCION A ENVIAR
                             */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>DIRECCION A ENVIAR EL PAQUETE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='direccion_envio' /><br />
                            </div>

                            {/* CIUDAD */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CIUDAD A ENVIAR EL PAQUETE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='ciudad_envio' /><br />
                            </div>
                            {/* NOMBRE DE LA PERSONA QUE RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NOMBRE DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='persona_recibe' /><br />
                            </div>

                            {/* CEDULA O PASAPORTE DE LA PERSONA QUE RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CEDULA O PASAPORTE DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='identificacion_recibe' /><br />
                            </div>

                            {/* NUMERO TELEFONICO DE LA PERSONA RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NUMERO TELEFONICO DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='telefono_recibe' /><br />
                            </div>

                            <div className='w-1/2 mt-8 mx-auto'>
                                <button className='w-10/12 py-2 px-4 hover:bg-black bg-blue-900 text-white'>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* TARJETA DE CREDITO */}
                
                <div className={`border w-9/12 m-auto p-8 ${credito ? 'null':'hidden'}`}>
                    <div>
                        <h1 className='text-blue-900 mb-4 mt-8'>SUS DATOS Y METODO DE ENVIO</h1>
                        <div className='bg-blue-900 w-full h-[2px] mb-5'></div>
                    </div>
                    <div className='w-8/12 m-auto mt-12 border py-8'>
                        <form onSubmit={handleSubmitCredit}>
                            {/* NOMBRE Y APELLIDO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NOMBRE Y APELLIDO</label><br />
                                <input onChange={handleChange} className='border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_name' /><br />
                            </div>

                            {/* CORREO ELECTRONICO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CORREO ELECTRONICO</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_email' /><br />
                            </div>

                            {/* NUMERO TELEFONICO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NUMERO TELEFONICO</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='client_mobile' /><br />
                            </div>

                            {/* TARJETA A USAR */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>TARJETA A USAR</label><br />
                                <select onChange={handleChange} className='border border-blue-400 outline-none mt-2 mb-4' name='tarjeta_pago'>
                                    <option value=''>Seleccionar</option>
                                    <option value='VISA'>VISA</option>
                                    <option value='MasterdCard'>Masterd Card</option>
                                    <option value='AmericanExpress'>American Express</option>
                                </select>
                            </div>

                            {/* EMPRESA DE ENVIO */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>EMPRESA DE ENVIO</label><br />
                                <select onChange={handleChange} className='border border-blue-400 outline-none mt-2 mb-4' name="empresa_envio">
                                <option value=''>Seleccionar</option>
                                    {envios && envios.map((n) => {
                                        return (
                                            <option key={n._id} value={n.envio_name}>{n.envio_name.toUpperCase()}</option>
                                        )
                                    })}
                                </select><br />
                            </div>

                            {/* DIRECCION A ENVIAR
                             */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>DIRECCION A ENVIAR EL PAQUETE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='direccion_envio' /><br />
                            </div>

                            {/* CIUDAD */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CIUDAD A ENVIAR EL PAQUETE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='ciudad_envio' /><br />
                            </div>
                            {/* NOMBRE DE LA PERSONA QUE RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NOMBRE DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='persona_recibe' /><br />
                            </div>

                            {/* CEDULA O PASAPORTE DE LA PERSONA QUE RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>CEDULA O PASAPORTE DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='identificacion_recibe' /><br />
                            </div>

                            {/* NUMERO TELEFONICO DE LA PERSONA RECIBE */}
                            <div className='w-10/12 mx-auto'>
                                <label className='text-slate-700'>NUMERO TELEFONICO DE LA PERSONA QUE RECIBE</label><br />
                                <input onChange={handleChange} className=' border-b-2 border-blue-200 w-10/12 outline-none mb-4' type='text' name='telefono_recibe' /><br />
                            </div>

                            <div className='w-1/2 mt-8 mx-auto'>
                                <button className='w-10/12 py-2 px-4 hover:bg-black bg-blue-900 text-white'>Continuar con el pago</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div className={`py-20 mb-[80px] flex justify-center ${car.length > 0 ? 'h-auto' : 'h-screen'} `}>
                {car.length > 0 ?
                    <table className='basic' >
                        <thead>
                            <tr>
                                <td>FOTO</td>
                                <td>Nombre</td>
                                <td>Cantidad</td>
                                <td>Precio</td>
                                <td>Eliminar</td>
                            </tr>
                        </thead>
                        <tbody>
                            {car && car.map((e, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='text-center'><Image className='m-auto' src={e.product_photo[0].secure_url} width={e.product_photo[0].width > e.product_photo[0].height ? '150' :'90'} height={e.product_photo[0].width > e.product_photo[0].height ? '150' :'80'} alt='foto producto' /></td>
                                        <td>{e.product_name}</td>
                                        <td>{e.product_cantidad}</td>
                                        <td>{e.product_price}$</td>
                                        <td><button onClick={(element) => deleteCar(e._id)} className='px-2 py-2 bg-red-600 rounded-md text-white'>Delete</button></td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
                    : <p className='text-center text-2xl' >No hay productos en el car...</p>}
            </div>
            <footer>
                <Footer />
            </footer>

        </>
    )
}
