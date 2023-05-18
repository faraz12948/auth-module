const express = require('express')
const app = express()

const { SERVER_PORT, NODE_ENV } = process.env
const API_PREFIX = '/api/v1'

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routers = require('./routers/APIV1')
app.use(API_PREFIX, routers)


if (NODE_ENV === 'test') {
    module.exports = app
} else {
    app.listen(SERVER_PORT, () => {
        console.log(`Example app listening on port ${SERVER_PORT}`)
    })
}



// set NODE_ENV=development && set SERVER_PORT=3050 && set POSTGRES_PORT=5432 && set POSTGRES_USER=faraz && set POSTGRES_PASSWORD=faraz12948fab && set POSTGRES_DB=ca-mgt && set ACCESS_TOKEN_SECRET=ffffff && npm run dev
