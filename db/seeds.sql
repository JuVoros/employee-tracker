USE employees_db;

-- departement types

INSERT INTO departement (name)
VALUES ("Executives"),
       ("Human Resources"),
       ("Engineering"),
       ("Accounting"),
       ("Program Management");



-- employee role types
INSERT INTO role (title,salary,departement_id)
VALUES ("CEO", 300000, 1),
       ("COO", 250000, 1),
       ("CFO", 250000, 1),
       ("CTO", 250000, 1),
       ("HR Manager", 150000, 2),
       ("HR Specialist", 100000, 2),
       ("Engineering Manager", 200000, 3),
       ("Lead Engineer", 150000, 3),
       ("Engineer II", 120000, 3),
       ("Engineer I", 100000, 3),
       ("Accounting Manager", 120000, 4),
       ("Accountant", 80000, 4),
       ("Senior Program Manager", 200000, 5),
       ("Program Manager", 150000, 5);


-- employees
INSERT INTO employee (first_name.last_name,role_id,manager_id)
VALUES ("Mike", "Mcdonald", 1, NULL),
      ("Sean", "Starbucks", 2, 1),
      ("Jeff", "Amazon", 3, 1),
      ("Bill", "Microsoft", 4, 1),
      ("Mary", "Christmas", 5, 2),
      ("Happy", "Beeday", 6, 5),
      ("Kevin", "Cola", 7, 4),
      ("Eric", "Lowes", 8, 7),
      ("Kelsey", "Subway", 9, 7),
      ("Paria", "Paris", 10, 7),
      ("Monee", "Lover", 11, 3),
      ("Cryptoe", "Hater", 12, 11),
      ("Kleen", "Lover", 13, 2),
      ("Doc", "Organizski", 14, 2);