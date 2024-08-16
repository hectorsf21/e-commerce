const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {

    //     try {
    //         const { totalPrice } = req.body
    //         console.log(totalPrice)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
        try {
          const { totalPrice } = req.body

          const monto = totalPrice
          // Create Checkout Sessions from body params.
          const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'usd', // La moneda en la que está el precio (ejemplo: dólares estadounidenses)
                  unit_amount: parseInt(monto) * 100, // El monto en centavos (multiplicar por 100 para convertirlo a centavos)
                  product_data: {
                    name: 'Nombre del Producto', // Nombre del producto o servicio
                    description: 'Descripción del Producto', // Descripción opcional del producto
                    // Otras opciones de product_data disponibles, consulta la documentación de Stripe para más detalles
                  },
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          });
          res.status(200).json({ url: session.url });
        } catch (err) {
          res.status(err.statusCode || 500).json(err.message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}