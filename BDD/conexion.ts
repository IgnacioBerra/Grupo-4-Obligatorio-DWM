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
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

async function findUser(user:string, passwordCheck:string) {
    let coincidio = false;
    const db = client.db("Proyecto");
    const collection = db.collection("Usuarios");

    const userFind = await collection.findOne({ username: user });

    if (userFind) {
        if (await bcrypt.compare(passwordCheck, userFind.password)) {
            console.log("Coincidió.");
            coincidio = true;
        } else {
            console.log("No coincide");
            console.log("Stored Password:", userFind.password);
            coincidio = false;
        }
    }

    return coincidio;
}

async function addUser(user:string, password:string) {
    try {
        password = await bcrypt.hash(password, 10);
        const db = client.db("Proyecto");
        const collection = db.collection("Usuarios");
        await collection.insertOne({ username: user, password: password });
    } catch (error) {
        console.log("Error al agregar el usuario:", error);
    }
}

async function main() {
    await run();
}

main()
    .catch(console.dir);

module.exports = {
    findUser,
    addUser
};
