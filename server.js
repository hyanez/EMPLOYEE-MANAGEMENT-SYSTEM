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
    .prompt([
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

function viewEmployees() {
  dbConnection.query(
    `SELECT employee.id, employee.first_name AS firstname, employee.last_name AS lastname, role.title AS position, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id`,
    function (err, res) {
      if (err) throw err;
      console.log("\n");
      console.table(res);
      prompt();
    }
  );
}

function addEmployee() {}

function updateRole() {}

function viewRoles() {}

function viewDepartments() {}

function addDepartment() {}

function quit() {}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
