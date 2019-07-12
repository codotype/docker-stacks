require('dotenv').config();

const port = process.env.PORT || 3000

// // // //

const fs = require("fs")
const path = require("path")
const runtime = require('./runtime')
const express = require('express')
const server = require('@codotype/api/lib/server')

// // // //

// Configures API to run as a standalone Express app
const app = server({
  port,
  runtime,
  zipBuild: true,
  uploadZipToS3: false,
  generateBuildId: false
})

// Attempt to mount the /client dist directory
app.use("/", express.static("client"));

app.get("/api/download", (req, res) => {
  console.log('DOWNLOAD')
  console.log('DOWNLOAD')
  console.log(req.query)
  const zipPath = path.resolve(__dirname, 'zip', req.query.filename)
  console.log(zipPath)
  console.log(`./zip/${req.query.filename}`);
  const file = fs.readFileSync(
    `./zip/${req.query.filename}`,
    "binary"
  );
  // return res.pipe(file)
  res.setHeader('Content-Length', file.length);
  res.write(file, 'binary');
  res.end();
});

// Starts Express app
app.listen(port, () => {
  console.log(`Codotype app is running at http://localhost:${port}`)
})
