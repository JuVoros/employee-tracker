USE employees_db;

INSERT INTO department (name)
VALUES ("Department Manager"),
       ("Human Resources"),
       ("Cook"),
       ("Cashier"),
       ("Crew Member");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 300000, 1),
       ("COO", 250000, 1),
       ("CFO", 250000, 1),
       ("CTO", 250000, 1),
       ("HR", 150000, 2),
       ("Mcnugget Specialist", 100000, 2),
       ("Big Mac Manager", 200000, 3),
       ("Burger Engineer", 150000, 3),
       ("Burger Engineer II", 120000, 3),
       ("Burger Engineer I", 100000, 3),
       ("Mcnugget Manager", 120000, 4),
       ("Accountant", 80000, 4),
       ("Senior Mcflurry Manager", 200000, 5),
       ("Mcflurry Manager", 150000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ronald", "Mcdonald", 1, NULL),
      ("Grimace", "Purple", 2, 1),
      ("Hamburglar", "No Ham", 3, 1),
      ("Mayor Mcheese", "Cheesy", 4, 1),
      ("Fry Kids", "Fries", 5, 2),
      ("Gooblins", "Goober", 6, 5),
      ("Mike", "idk", 7, 4),
      ("Uncle Grimacey", "Yuh", 8, 7),
      ("Biride", "Early bird", 9, 7),
      ("Papas", "Pizzeria", 10, 7),
      ("Mommas", "Macaroni", 11, 3),
      ("Anakin", "Skywalker", 12, 11),
      ("Luke", "Skywalker", 13, 2),
      ("Appa", "Yip Yip", 14, 2);