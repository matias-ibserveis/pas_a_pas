
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
    //console.log("nuevo en prisma", nuevo)
    return(nuevo)
  }

  
  export async function unproducto(identificador) {
    const producto = await prisma.product.findUnique({
          where:{
            id:identificador
          }
    })
    //console.log("unproducto en prisma", producto)
    return (producto)
  }


  export async function unusuario(correo) {
    const usuario = await prisma.user.findUnique({
          where:{
            email:correo
          }
    })
    return usuario
  }



  export async function listadotodosproductos() {
    const lecturaproductos = await prisma.product.findMany({
      take:8,
      orderBy:{
        createdAt: "desc"
      }
    })
    return lecturaproductos
  }


