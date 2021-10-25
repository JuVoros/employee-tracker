const inquirer = require("inquirer");
const mysql = require("mysql2");
const figlet = require("figlet");
const cTable = require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  port: 3002,
  user: "root",
  password: "password",
  database: "employees_db",
});

const viewAllDepartments = () => {
  db.query(`SELECT * FROM departement;`, (err, results) => {
    if (err) throw err;
    console.log("List of departements inn the company.");
    console.table(results);
    questions();
  });
};

const viewAllRoles = () => {
  db.query(
    `SELECT role.id, title, department.name AS department, salary
        FROM role
        JOIN department ON role.department_id = department.id
        ORDER BY role.id ASC;`,
    (err, data) => {
      if (err) throw err;
      console.log("List of all the emplloyee roles in the company");
      console.table(data);
      questions();
    }
  );
};

const viewAllEmployees = () => {
  db.query(
    `SELECT e.id, e.first_name, e.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(employee.first_name,'',employee.last_name) as manager
    FROM employee e
    JOIN role on role_id = role.id   
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee ON e.manager_id = employee.id;`,
    (err, data) => {
      if (err) throw err;
      console.log("Here is a list of all the employees.");
      console.table(data);
      questions();
    }
  );
};

const addEmployee = () => {
  db.query(`SELECT * FROM role;`, (err, data) => {
    if (err) throw err;
    const roleTable = data.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    db.query(`SELECT * FROM employee;`, (err, data) => {
      if (err) throw err;
      const employeeTable = data.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });
      employeeTable.unshift({ name: "None", value: null });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the first name of the employee?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the last name of the employee?",
            name: "lastName",
          },
          {
            type: "list",
            message: "What is the role of the employee?",
            name: "chooseRole",
            choices: roleTable,
          },
          {
            type: "list",
            message: "Who is the manager of the employee?",
            name: "chooseManager",
            choices: employeeTable,
          },
        ])
        .then((answer) => {
          const firstName = answer.firstName;
          const lastName = answer.lastName;
          const employeeRole = answer.chooseRole;
          const employeeManager = answer.chooseManager;
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${firstName}","${lastName}", "${employeeRole}", "${employeeManager}");`,
            (err) => {
              if (err) throw err;
              console.log("A new employee has been added to employee_db.");
            }
          );
          questiosn();
        });
    });
  });
};
const addRole = () => {
  db.query(`SELECT * FROM department;`, (err, data) => {
    if (err) throw err;
    const departmentTable = data.map((element) => {
      return {
        name: element.name,
        value: element.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the role's name?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "roleSalary",
          validate: (roleSalaryInput) => {
            if (isNaN(roleSalaryInput)) {
              return "Enter a number";
            } else {
              return true;
            }
          },
        },
        {
          type: "list",
          message: "What department does the role go to?",
          name: "roleDept",
          choices: departmentTable,
        },
      ])
      .then((answer) => {
        const title = answer.roleName;
        const salary = answer.roleSalary;
        const department = answer.roleDept;
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department}");`,
          (err) => {
            if (err) throw err;
            console.log("A new role has been added to employee_db.");
          }
        );
        questions();
      });
  });
};
const updateEmployeeRole = () => {
  db.query(`SElECT * FROM role;`, (err, data) => {
    if (err) throw err;
    const roleTable = dtaa.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    db.query(`SELECT * FROM employee`, (err, data) => {
      if (err) throw err;
      const roleTable = data.map((role) => {
        return {
          name: role.id,
          value: role.id,
        };
      });
      db.query(`SELECR * FROM employee`, (err, data) => {
        if (err) throw err;
        const employeeTable = data.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        inquirer
          .prompt([
            {
              type: "list",
              message: "Which role do you want to update?",
              name: "updateWhat",
              choices: employeeTable,
            },
            {
              type: "list",
              message: "Which role do you want to assign to the employee?",
              name: "updateRole",
              choices: roleTable,
            },
          ])
          .then((answer) => {
            const roleID = answer.updateRole;
            const employeeID = answer.updateWhat;
            db.query(
              `UPDATE employee
                            SET role_id = ${roleID}
                            WHERE id = ${employeeID};`,
              (err) => {
                if (err) throw err;
                console.log("The role for employees has been updated.");
              }
            );
            questions();
          });
      });
    });
  });
};
