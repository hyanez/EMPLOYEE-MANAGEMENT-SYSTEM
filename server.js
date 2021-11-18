// DEPENDENCIES
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    database: "employee_db",
    host: "localhost",
    user: "root",
    password: "password2015",
  },
  console.log(`Connected to the employee_db database.`)
);
