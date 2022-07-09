
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


  
  export async function updateproducto(data) {
    const {id, ref, name, description, price, price2, pricetext, enlace,
           userEmail, photo, photo2, photo3, photo4} = data
    const modificar = await prisma.product.update({
    where:{   
        id:id,
      },    
     data:{
          id, ref, name, description, price, price2, pricetext, enlace, userEmail, photo, photo2, photo3, photo4
        }
    })
    //console.log("modif en prisma", modif)
    return(modificar)
  }

  export async function deleteproducto(identificador) {
    console.log("unproducto", identificador)
    const producto = await prisma.product.delete({
          where:{
            id:identificador
          }
    })
      return producto
  }


  export async function listado_n_productos(numero) {
    // QUERY RAW
    // https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access
    // https://www.cybertec-postgresql.com/en/postgresql-limit-vs-fetch-first-rows-with-ties/
  
    //`SELECT * FROM "public"."Product" LIMIT ${numero}`
    const result = await prisma.$queryRaw`SELECT * FROM "public"."Product" FETCH FIRST ${numero} ROWS ONLY `
    return result
  }






