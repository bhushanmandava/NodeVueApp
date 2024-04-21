const http = require("http");
const path = require("path");
const fs = require("fs");
const mongo_client = require('mongodb').MongoClient;
const mongoconnection_details = require('./db_connect/Mongodb_connection.js');
const mongo_client_connection = new mongo_client(mongoconnection_details.connectionurl);

const server = http.createServer((req, res) => {
    
    if (req.url === '/') {
        // Read index.html file from the dist folder
        fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    }
    else if (req.url === '/api') {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            "Content-Type": 'application/json'
        };
        (async (req, res) => {
            try {
                await mongo_client_connection.connect();
                const database = mongo_client_connection.db(mongoconnection_details.database);
                const collection = database.collection(mongoconnection_details.collection);
                if (req.method === 'GET') {
                    const docs = await collection.find({}).toArray();
                    const docs_json = JSON.stringify(docs, null, 2);
                    fs.writeFile('./dist/db.json', docs_json, () => {});
                    res.writeHead(200, headers);
                    res.end(docs_json);
                    console.log(docs_json);
                } else {
                    res.writeHead(405, {'Content-Type': 'text/plain'});
                    res.end('Method Not supported');
                }
            } catch (err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Server failed to handle the request');
            }
        })(req, res);
    } else {
        res.end("<h1>404 nothing is here</h1>");
    }
});

const PORT = 5959;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
