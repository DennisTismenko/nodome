const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 3000;
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

const server = http.createServer(app);

// Debug
app.use((req, res, next) => {
    console.log(`(${req.method}) ${req.url}: ${JSON.stringify(req.body)}`);
    next();
});

const heuristicRouter = require('./router/heuristic-router');
app.use('/api/heuristics', heuristicRouter);

server.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('HTTP server on http://localhost:%s', PORT);
    }
});

