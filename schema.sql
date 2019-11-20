SELECT DATABASE();
SHOW DATABASES;

DROP DATABASE IF EXISTS auth_test_db;
CREATE DATABASE auth_test_db;
USE auth_test_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR (255),
    lName VARCHAR (255),
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

INSERT INTO `auth_test_db`.`users` (`fName`, `lName`, `email`, `password`) VALUES ('Mark', 'Faulkner', 'markfaulk350@gmail.com', 'password');