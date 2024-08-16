import db from '@/lib/db'
import ordersModel from '@/model/ordersModel'

export default async function handler(req, res) {
    try {
      await db()
      const {order} = req.body
      const data = new ordersModel(order)
      await data.save()
      res.status(200).json({message:'orden enviada con exito'})
    } catch (error) {
      console.log(error)
    }
  }