const express = require("express");
const server = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const connection = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = 'lovelyDreams';
server.use(cors());
server.use(express.json());

async function iniciarDB() {
    try {
        await connection.connect();
        console.log('conexión establecida con exito');
    } catch (e) {
        console.log(e);
    }
}

iniciarDB();


server.use(express.static(path.resolve("./build")));
server.get("/", (req, res) => {
  res.sendFile(path.resolve("./build/index.html"));
});

server.get("/homepage", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
  });

server.get("/login", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
    });

server.get("/logup", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
    });

server.get("/adminpage", (req, res) => {
    res.sendFile(path.resolve("./build/index.html"));
    });



// #region products

server.get('/products', async (req, res) => {
    try {
        let token = req.headers["autorization"];
        jwt.verify(token, "essecretomiamor")

        const db = connection.db(dbName);
        const collection = db.collection('products');

        const result = await collection.find({}).toArray();
        res.send(JSON.stringify(result));
    } catch (e) {
        res.status(401).send("No autenticado");
        console.log(e);
    }
});

server.get('/libraryProducts', async (req, res) => {
    try {
        let token = req.headers["autorization"];
        jwt.verify(token, "essecretomiamor", async (error, decoded) => {
            if (error) {
                res.status(401).send("No autorizado");
            } else {
                if (decoded.rol === "administrador") {
                    const db = connection.db(dbName);
                    const collection = db.collection('products');

                    const result = await collection.find({}).toArray();

                    let response = {};
                    result.forEach(product => response[product.name] = product );

                    res.send(JSON.stringify(response));
                } else {
                    res.status(401).send("No autorizado");
                }
            }
        });
    } catch (e) {
        res.status(401).send("No autenticado");
        console.log(e);
    }
});

async function actualizarDisponibilidad(prodcutName, quantity) {
    try {
        const db = connection.db(dbName);
        const collection = db.collection('products');

        const result = await collection.findOne({name: prodcutName});

        await collection.updateOne({name: prodcutName},
                                   { $set: { available: result.available-quantity } });
    } catch (e) {
        console.log(e);
    }
}

// #endregion

// #region shopping

server.post('/shopping', async (req, res) => {
    try {
        const groupProduct = groupBy(req.body.products, "name");

        for (const key in groupProduct) {
            const group = groupProduct[key];
            await actualizarDisponibilidad(group[0].name, group.length);
        }

        const db = connection.db(dbName);
        const collection = db.collection('shopping');

        const result = await collection.insertOne(req.body);
        res.send("guardado exitoso");
    } catch (e) {
        console.log(e);
    }
});

function groupBy(arr, key) {
    return arr.reduce((result, item) => {
        const groupKey = item[key];
        if(!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}

// #endregion

// #region users

server.post('/users', async (req, res) => {
    try {
        const {emailData, passwordData} = req.body;

        const db = connection.db(dbName);
        const collection = db.collection('users');

        const validatedLogin = await collection.findOne({email: emailData, password: passwordData});

        if (validatedLogin) {
            let token = jwt.sign(validatedLogin, "essecretomiamor", { expiresIn: "2 days"});
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (e) {
        console.log(e);
    }
});

server.post('/users/logup', async (req, res) => {
    try {
        const {name, lastname, email, password, confirmPassword, address} = req.body;

        const db = connection.db(dbName);
        const collection = db.collection('users');

        const existingUser = await collection.findOne({ email : email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        req.body.rol = "usuario";
        const result = await collection.insertOne(req.body);
        console.log(result)
        if (result) {
            return res.status(200).json({ message: 'Usuario registrado exitosamente.' });
        } else {
            return res.status(500).json({ message: 'Error al registrar el usuario.' });
        }
    } catch (e) {
        console.log(e);
    }
});

// #endregion

server.listen(3000, () => {
    console.log("Server on port 3000");
});
