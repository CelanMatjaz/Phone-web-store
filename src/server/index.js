require('dotenv').config();

import express from 'express';
import fs from 'fs';
import graphqlHTTP from 'express-graphql';
import schema from './database/schema/schema';

//React, ReactRouter, Redux imports
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

//Main component import
import  App from '../client/App';

import { getUser } from './routes/middleware';

import User from './database/Models/User';

const app = express();
app.use(express.static('public'));
app.use(express.static('images'));

app.get('/users', (req, res) => {
    //User.deleteMany({}, () => {
        User.find({}, (err, arr) => res.json(arr));
    //})
})

app.use('/graphql', getUser);
app.use('/graphql', graphqlHTTP(req => ({
    schema,
    graphiql: true
})));

const files = fs.readdirSync('./public');

const PORT = process.env.PORT || 2000;

app.listen(PORT);

app.get('/*', (req, res) => {
    const markup = renderToString(
            <Router location={req.url} context={{}}>
                <App/>
            </Router>   
    );

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Phone store</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <script src="${files[0]}" defer></script>
            <link type="text/css" href="${files[1]}" rel="stylesheet"/>
        </head>
        <body>
            <div id="root">${markup}</div>
        </body>
        </html>
    `);
});