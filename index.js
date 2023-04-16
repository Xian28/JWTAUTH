require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { fakeDb } = require('./fakeDb');
const { 
    createAccessToken, 
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
} = require('./token.js');

const server = express();

server.use(cookieParser());

server.use(
    cors({
        origin: '*'
    })
)

server.use(express.json());
server.use(express.urlencoded({ extended: true}));

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
        // console.log(err.message)
        res.send({
            error: `${err.message}`
        })
    }
})

server.post('/login', async (req ,res) => {
    const { email, password } = req.body;
    try{
        const user = fakeDb.find(user => user.email === email);
        if(!user) throw new Error('User does not exist');
        const hashedPassword = await hash(password, 10);
        const valid = await compare(password, user.password);
        if(!valid) throw new Error("Password not correct" + valid + ":" + password + ":" + user.password);
        const accesstoken =  createAccessToken(user.id);
        const refreshtoken =  createRefreshToken(user.id);
        user.refreshtoken = refreshtoken;
        console.log(fakeDb);
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken); 

    }
    catch(err){
        res.send({
            error: `${err.message}`,
        })
    }
})

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
