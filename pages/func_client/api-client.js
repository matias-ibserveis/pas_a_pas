import axios from "axios";

export const client = axios.create({
  baseURL: "/api/func_server",
});

export async function leerlistaproductos() {
  const lectura = await client.get(`/listaProductos`);

  const resultado = lectura.data[0]
    ? lectura.data
    : lectura.data.listaproductos;
  console.log("lectura.data", lectura.data);

  return resultado;
}

export async function filtraUnProducto(identificador) {
  const lectura = await client.post(`/unProducto`, {
    id_producto: identificador,
  });
  // falta si es vacia lectura
  console.log("lectura.data.producto", lectura.data.producto);
  return lectura.data.producto;
}
