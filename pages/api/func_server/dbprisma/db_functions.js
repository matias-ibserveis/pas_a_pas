import prisma from "../../../../lib/prisma";

export async function listadotodosproductos() {
  const lecturaproductos = await prisma.product.findMany({
    take: 8,
    orderBy: {
      name: "desc",
    },
  });
  return lecturaproductos;
}

export async function unproducto(id_producto) {
  const producto = await prisma.product.findUnique({
    where: {
      id: id_producto,
    },
  });
  //console.log("unproducto en prisma", producto)
  return producto;
}



export async function nuevoproducto(data) {
  const {
    ref,
    name,
    description,
    status,
    categoria,
    price,
    price2,
    pricetext,
    enlace,
    photo,
    photo2,
    photo3,
    photo4,
    userEmail,
  } = data;

  const nuevo = await prisma.product.create({
    data: {
      ref,
      name,
      description,
      status,
      categoria,
      price,
      price2,
      pricetext,
      enlace,
      photo,
      photo2,
      photo3,
      photo4,
      userEmail,
    },
  });
  //console.log("nuevo en prisma", nuevo)
  return nuevo;
}
