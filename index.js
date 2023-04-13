require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { fakeDb } = require('./fakeDb');

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

server.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = fakeDb.find(user => user.email === email);
        if(user) throw new Error('User already exist');
        const hashedPassword = await hash(password, 10);
        fakeDb.push({
            id: fakeDb.length,
            email,
            password: hashedPassword
        });
        res.send({message: 'User Created'});
        console.log(fakeDb);
        console.log(hashedPassword);
    }   
    catch(err){
        console.log(err.message)
    }
})