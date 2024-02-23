import express from 'express';
import mongoose from "mongoose";
import productRouter from './routes/routesMongo/productsMongo.router.js';
import cartRouter from './routes/routesMongo/cartsMongo.router.js';
import { chatRouter, chatMM } from './routes/routesMongo/chatMongo.router.js';
import path from 'path';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express();
const port = 8080;


//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views') 
app.set('views engine', "handlebars")
app.use(express.static(__dirname + '/views'))
app.use(express.static(path.join(__dirname, "public")))

//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);

const httpServer = app.listen(port, () => console.log("Servidor conectado (Express)"))

//socket.io
const io = new Server(httpServer);

const users = {}

io.on("connection", (socket)=>{
    console.log("Se ah unido un nuevo usuario")
    socket.on("newUser", (username)=>{
        users[socket.id] = username
        io.emit("userConnected", username)
    })

    socket.on("chatMessage", async (data) => {
        const { username, message } = data;
        try {
            await chatMM.addChat(username, message);
            io.emit("message", { username, message });
        } catch (error) {
            console.error("Error, el mensaje no puede procesarse:", error);
        }
    });

    socket.on("disconnect", ()=>{
        const username = users[socket.id]
        delete users[socket.id]
        io.emit("userDisconnected", username)
    })
})



mongoose.connect("mongodb+srv://EArraygada:Nico1993@arraygada1.vpmhvb3.mongodb.net/?retryWrites=true&w=majority&appName=Arraygada1")
.then (() => {
    console.log ("Conectado a la DB correctamente")
})
.catch (error => {
    console.error ("No se pudo conectar", error)
})



