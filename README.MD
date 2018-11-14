# Linx challenge

## Part-1

A simple API with a Product endpoint that receives POST requests to create and update products but rejects repetitive payloads within specific time (double sends).

### Requirements:

* Docker
* Node 8+
* Run: `$ cd part-1; npm install`

### Usage:

* Run: `$ npm start`
* Send POST requests to: `http://localhost:3000/products`

### Test:

* Run: `$ npm test`

---

## Part-2

A basic module that reads a gziped dump file of Products' JSON and prints the output.

### Requirements:

* Node 8+
* Run: `$ cd part-2`

### Usage:

* Run: `$ npm start <input dump file path>`

### Test:

* Run: `$ npm test`
