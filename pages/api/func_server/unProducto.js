import { unproducto } from "./dbprisma/db_functions";

export default async function filtrar(req, res) {
  if (req.method === "POST") {
    const { id_producto } = req.body;
    const producto = await unproducto(id_producto);

    if (producto) {
      console.log("producto en func_server", producto);
      res.status(200).json({ producto });
    } else res.status(220);
  }
}
