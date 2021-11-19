// DEPENDENCIES
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
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
          "Add Role",
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
        case "Add Role":
          addRole();
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
      console.log(
        "============================== EMPLOYEES =============================="
      );
      console.log("\n");
      console.table(res);
      prompt();
    }
  );
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the Employee you would like to add ? ",
        name: "id",
      },
      {
        type: "input",
        message:
          "What is the first name of the employee you would like to add ? ",
        name: "first_name",
      },
      {
        type: "input",
        message:
          "What is the last name of the employee you would like to add ? ",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the role id of the employee you would like to add ? ",
        name: "role_id",
      },
      {
        type: "input",
        message:
          "What is the manager id of the employee you would like to add ? ",
        name: "manager_id",
      },
    ])
    .then(function (res) {
      dbConnection.query(
        `INSERT INTO employee SET ?`,
        {
          id: res.id,
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: res.id,
          manager_id: res.manager_id,
        },
        function (err) {
          if (err) throw err;
          prompt();
        }
      );
    });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name would you like to update? ",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name would you like to update? ",
        name: "last_name",
      },
      {
        type: "input",
        message: `What role do you wish to give the employee ? `,
        name: "title",
      },
    ])
    .then(function (res) {
      dbConnection.query(
        `UPDATE employee SET ? WHERE id = role_id`,
        {
          first_name: res.first_name,
          last_name: res.last_name,
          title: res.title,
        },
        function (err) {
          if (err) throw err;
          prompt();
        }
      );
    });
}

function viewRoles() {
  dbConnection.query(`SELECT * FROM role;`, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.log(
      "============================== ROLES =============================="
    );
    console.log("\n");
    console.table(res);
    prompt();
  });
}

function viewDepartments() {
  dbConnection.query(`SELECT * FROM department;`, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.log(
      "============================== DEPARTMENTS =============================="
    );
    console.log("\n");
    console.table(res);
    prompt();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the role you would like to add ? ",
        name: "id",
      },
      {
        type: "input",
        message: "What is the name of the role you would like to add ? ",
        name: "title",
      },
      {
        type: "input",
        message:
          "What is the salary of the department you would like to add ? ",
        name: "salary",
      },
      {
        type: "input",
        message:
          "What is the department ID of the department you would like to add ? ",
        name: "department_id",
      },
    ])
    .then(function (res) {
      dbConnection.query(
        `INSERT INTO role SET ?`,
        {
          id: res.id,
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        function (err) {
          if (err) throw err;
          prompt();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the ID of the department you would like to add ? ",
        name: "id",
      },
      {
        type: "input",
        message: "What is the name of the department you would like to add ? ",
        name: "name",
      },
    ])
    .then(function (res) {
      dbConnection.query(
        `INSERT INTO department SET ?`,
        {
          id: res.id,
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          prompt();
        }
      );
    });
}

function quit() {
  console.log("Exiting Server...!");
  process.exit();
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
