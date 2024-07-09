import express from "express";
import http from "http";
import path from "path";
import dotenv from "dotenv";
import {Server} from "socket.io";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';


// Load environment variables from .env file
dotenv.config();


const app= express();
const PORT =  process.env.PORT || 3000;

const server= http.createServer(app); //creating the http server
const io = new Server(server);

app.use(express.static(path.resolve('./public'))); //static files

//socket.io
io.on("connection", (socket)=>{
    socket.on("user-message", (message)=>{
       io.emit('message', message);
    })
})

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(PORT, ()=>{
    console.log(`server has started on the port no: ${PORT}`)
});