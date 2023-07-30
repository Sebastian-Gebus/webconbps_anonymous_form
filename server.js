'use strict';
const express = require("express");

const app = express();
const bodyparser = require("body-parser");
const { json } = require("body-parser");

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var bpsapi = require('./bpsapi.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

app.get('/', (req, res) => {

});

app.post('/api/addElement', (req, res) => {
    const User = req.body.User;
    const eMail = req.body.eMail;
    const PIN = req.body.PIN;

    bpsapi.getToken().then(function (authres) {
        bpsapi.createNewElement(authres.token, req.body).then(function (createElementResponse) {
            if (createElementResponse.errorGuid != undefined)
                res.status(401).send(createElementResponse.type);
            else {
                console.log("Element " + createElementResponse.data.instanceNumber + " saved.");
                res.status(200).send(createElementResponse.data);
            }
        });
    });
});

app.get('/api/getData', (req, res) => {
    bpsapi.getToken().then(function (authres) {
        bpsapi.getReportData(authres.token)
            .then(function (response) {
                res.status(200).json(response.rows);
            })
            .catch(function (error) {
                console.log(error);
                res.status(401).send(error.data);
            })
    }).catch(function (error) {
        console.log(error);
        res.status(500).send(error.data);
    });
});

app.listen(config.server.port, () => {
    console.log(`Running on port: ${config.server.port}`);
    console.log("Enviroment: " + env)
});