import Header from "@/components/Header"
import {useEffect, React} from "react"
import Main from "@/components/Main"
import Footer from "@/components/Footer"
import productModel from "@/model/productModel"
import db from '@/lib/db'
import { useTask } from "@/context/TaskContext"
import Login from "@/components/Login"

// SERVER
export async function getServerSideProps(){
  try {
    await db()
    const resp = await productModel.find({})
    const products = resp.map((e)=>{
      const product = e.toObject()
      product._id = e._id.toString()
      return product
    })
    return { props: { products } };
  } catch (error) {
    return { props: { products:[] } };
  }
  
}
// SERVER CLOSE



export default function Home({products}) {
  const {setproductos} = useTask()
  useEffect(() => {
    setproductos(products)
  }, [products])
  // console.log(products)
  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
      {/* <Login/> */}
    </>
  )
}
