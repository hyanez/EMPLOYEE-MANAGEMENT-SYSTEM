INSERT INTO department (id, name)
VALUES 
(1, 'Finance'),
(2, 'IT'),
(3, 'Marketing'),
(4, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, 'Cheif Financial Officer', 85000, 1),
(2, 'HR administrator', 80000, 1),
(3, 'HR Specialist', 75000, 1),
(4, 'Software Engineer', 95000, 2),
(5, 'IT Representative', 80000, 2),
(6, 'Cheif Marketing Officer', 90000, 3),
(7, 'Digitial Marketing Manager', 87000, 3),
(8, 'HR administrator', 80000, 4),
(9, 'HR Specialist', 75000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Hugo', 'Yanez', 1, NULL),
(2, 'Kimberly', 'Moriano', 2, 1),
(3, 'Maria', 'Guzman', 3, NULL),
(4, 'Kevin', 'Zapata', 4, 3),
(5, 'Alex', 'Acaro', 5, NULL),
(6, 'Natalie', 'Lopez', 6, 5),
(7, 'Evelyn', 'Lua', 7, NULL),
(8, 'Martha', 'Barajas', 8, 7);