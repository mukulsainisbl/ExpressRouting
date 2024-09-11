const express = require("express");
const fs = require("fs");
const todoRoute = express.Router();

// GET all todos
todoRoute.get("/all", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json({ todos: data.todos });
});

// POST a new todo
todoRoute.post("/add", (req, res) => {
  let newData = req.body;
  req.body.id = Math.floor(Math.random() * 1000); // Assign a random ID to the new todo
  let dbdata = fs.readFileSync("db.json", "utf-8");
  let parsedData = JSON.parse(dbdata);

  parsedData.todos.push(newData); // Add new todo to the todos array

  fs.writeFileSync("db.json", JSON.stringify(parsedData)); // Save the updated data to the file
  res.send("Todo added");
});

// PUT to update a todo by ID
todoRoute.put("/update/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let flag = false;

  let updatedTodos = data.todos.map((ele) => { // Fixed typo: data.users -> data.todos
    if (ele.id == req.params.id) {
      flag = true;
      return { ...ele, ...req.body }; // Merge new data with existing todo
    } else {
      return ele;
    }
  });

  if (!flag) {
    res.send("Todo not found"); // Return "Todo not found" if no match was found
  } else {
    data.todos = updatedTodos; // Update the todos array with the new changes
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.send("Todo updated");
  }
});

// DELETE a todo by ID
todoRoute.delete("/delete/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let flag = false;

  let filteredTodos = data.todos.filter((el) => {
    if (el.id != req.params.id) {
      return true; // Keep the todo if ID doesn't match
    } else {
      flag = true; // Set the flag to true if a matching todo is found
      return false; // Remove the todo if ID matches
    }
  });

  if (!flag) {
    res.send("Todo not found");
  } else {
    data.todos = filteredTodos; // Update the data with the filtered todos
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.send("Todo deleted");
  }
});

module.exports = todoRoute;
