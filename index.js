const express = require('express');
const cors = require('cors');
//const https = require('https');
//const fs = require('fs');
//const options = {
//  key: fs.readFileSync('./localhost-key.pem'),
//  cert: fs.readFileSync('./localhost.pem'),
//};
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8888

// https://stackoverflow.blog/2021/10/06/best-practices-for-authentication-and-authorization-for-rest-apis/
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design

// TODO: caching using apicache, possibly in combination withh redis
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-name-collections-with-plural-nouns
// https://www.npmjs.com/package/apicache, https://redis.io/, https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
// const apicache = require('apicache')
// let cache = apicache.middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors({
  origin: ['https://rokussadee.github.io', 'https://dj-vercel-api.vercel.app', 'https://localhost:3000'], // Replace with your front-end domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, // Enable cookies and authentication headers
}))

const AuthRoutes = require('./routes/authRoutes.js');
app.use('/auth', cors(), AuthRoutes);

const SpotifyRoutes = require('./routes/spotifyRoutes.js');
app.use('/api', cors(), SpotifyRoutes);

const CrudRoutes = require('./routes/CRUD.js')
app.use('/crud', cors(), CrudRoutes)

const DiscogsRoutes = require('./routes/discogsRoutes.js');
app.use('/discogs', cors(), DiscogsRoutes);

//let httpsServer = https.createServer(options, app);

app.listen(port, () => {
  console.log(`app listening at https://localhost:${port}`)
})

const cleanup = (event) => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
  console.log('mongo client closing')
  process.exit(); // Exit with default success-code '0'.
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
