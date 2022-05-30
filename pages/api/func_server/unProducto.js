import { unproducto } from "./func_server/dbprisma/db_functions";

export default async function modifUser(req, res) {
  if (req.method === "POST") {
    const { id_producto } = req.body;

    const producto = unproducto(id_producto);

    if (producto.length != 0) {
      res.status(200).json({ producto });
    } else res.status(220);
  }
}
