
import prisma from '../../../lib/prisma'


 export async function nuevoproducto(data) {
    
    const {ref, name, description, status, categoria, 
           price, price2, pricetext, enlace,
           photo, photo2, photo3, photo4, userEmail} = data

    const nuevo = await prisma.product.create({
        data:{
          ref, name, description, status, categoria, 
          price, price2, pricetext, enlace,
          photo, photo2, photo3, photo4, userEmail
        }
    })
    console.log("nuevo en prisma", nuevo)
  }


  export async function listadotodosproductos() {
    const lecturaproductos = await prisma.product.findMany({
      take:8,
      orderBy:{
        name: "desc"
      }
    })
    return lecturaproductos
  }


