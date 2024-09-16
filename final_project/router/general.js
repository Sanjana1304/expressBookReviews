const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
      res.send(JSON.stringify(books,null,4));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn],null,4));

});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author.toLowerCase();
    const results = [];

    // Loop through books and check for matching author
    for (let key in books) {
        if (books[key].author.toLowerCase() === author) {
            results.push(books[key]);
        }
    }

    if (results.length > 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "No books found for the specified author." });
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title.toLowerCase();
    const results = [];

    // Loop through books and check for matching title
    for (let key in books) {
        if (books[key].title.toLowerCase() === title) {
            results.push(books[key]);
        }
    }

    if (results.length > 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "No books found for the specified author." });
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.json(books[isbn].reviews);
});

module.exports.general = public_users;
