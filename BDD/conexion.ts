
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://NACHO:nacho@databasedesarrolloweb.oulcdob.mongodb.net/?retryWrites=true&w=majority";

const bcrypt = require('bcrypt');

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);

async function findUser(user, passwordCheck) {
    try {


        await client.connect();

        const db = client.db("Proyecto");

        const collection = db.collection("Usuarios");

        const userFind = await collection.findOne({ username: user });

        if (userFind) {

            if (await bcrypt.compare(passwordCheck, userFind.password/*.toString()*/)) {
                console.log("Coincidió.")
            }

            else {
                console.log("No coincide");
                console.log("Stored Password:", userFind.password);
            }
        }
    }
    catch (error) {
        console.log("Error al intentar iniciar sesión.", error);
    }
    finally {
        await client.close();
    }
}

async function addUser(user, password) {
    try {

        password = await bcrypt.hash(password, 10)

        await client.connect();

        const db = client.db("Proyecto");


        const collection = db.collection("Usuarios");

        await collection.insertOne({ username: user, password: password });


    } catch (error) {
        console.log("Error al agregar el usuario:", error);
    } finally {

        await client.close();
    }
}



run()
    .then(() => {

        // return addUser("NACHO", "PRUEBA");
        return findUser("NACHO", "PRUEBA");
    })
    .catch(console.dir);

module.exports = {
    findUser,
    addUser
};