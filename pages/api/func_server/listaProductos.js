import { listadotodosproductos } from './dbprisma/db_functions'

export default async function listar(req, res) {

  if (req.method === "GET") {

    const listaproductos = await listadotodosproductos();

    console.log("listaProductos.js", listaproductos)

    if (listaproductos.length === 0) {
      res.status(220);
    } else res.status(200).json({ listaproductos });
  }
}
