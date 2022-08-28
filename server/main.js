const express = require('express');
const cors = require('cors');
// const connectDB = require('./configs/db');

const playerRouter = require('./routers/playerRouter');

const app = express();
const port = 8000;

// connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/player', playerRouter);

app.listen(port);
console.log(`app is listening at http://localhost:${port}`);
console.log(`player API: http://localhost:${port}/api/player`);
