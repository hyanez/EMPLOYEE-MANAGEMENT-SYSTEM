// DEPENDENCIES
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { listenerCount } = require("process");
require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbConnection = mysql.createConnection(
  {
    database: "employee_db",
    host: "localhost",
    user: "root",
    password: "password2015",
  },
  console.log(`Connected to the employee_db database.`)
);

init();

function init() {
  console.log("Connection initialized");
  prompt();
}

function prompt() {
  inquirer
    .promopt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "choice",
      },
    ])
    .then(function (answer) {
      switch (answer.choice) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}

function viewEmployees() {}

function addEmployee() {}

function updateRole() {}

function viewRoles() {}

function viewDepartments() {}

function addDepartment() {}

function quit() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
