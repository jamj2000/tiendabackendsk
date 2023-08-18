import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";

export async function load() {
    const cliente = new MongoClient(DB_URI);

    let documentos = [];
    let serialized = {};
    try {
        const database = cliente.db("tienda");
        const users = database.collection("articulos");

        const query = { precio: { $gt: 0}}; // establecemos condición
        const options = {
            sort: { nombre: 1 }, // ordenamos por nombre
            projection: { _id: 1, nombre: 1, precio: 1 }, // recuperamos solo algunos atributos
        };
        const cursor = users.find(query, options);
         documentos = await cursor.toArray();
        // console.log(documentos);
         serialized = documentos.map((item) => JSON.parse(JSON.stringify(item,(key,value) => key === '_id'? value.toString(value) : value)));
        // for await (const doc of cursor) {
        //     console.log(doc);
        // }
    } catch (error) {
        console.log(error.message ?? "Error connecting to the DB")
    } 
    // finally {
    //     await cliente.close();
    // }
    return {serialized};
}