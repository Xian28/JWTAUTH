require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

const server = express();

server.use(cookieParser());

server.use(
    cors({
        origin: '*'
    })
)

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});