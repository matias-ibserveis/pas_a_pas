import axios from "axios";

export const client = axios.create({
  baseURL: "/api/func_server",
});

export async function leerlistaproductos() {


  const lectura = await client.get(`/listaProductos`);

  const resultado = lectura.data[0] ? lectura.data : lectura.data.listaproductos;
  console.log("lectura.data", lectura.data)

  return resultado;
}



export async function leerunProducto(idproducto) {
  const lectura = await client.post(`/unProducto`, { id_producto: idproducto });
  const resultado = lectura.data[0] ? lectura.data : lectura.data.mensajes;
  console.log("resultado", resultado)
  return resultado;
}