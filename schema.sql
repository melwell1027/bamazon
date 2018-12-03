DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(255) NULL,
department_name VARCHAR(255) NULL,
price DECIMAL(10, 2) NULL,
stock_quantity INTEGER
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4", "Electronics", 299.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX 360", "Electronics", 399.99,  50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "Electronics", 999, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nespresso", "Kitchen", 149.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soda Stream", "Kitchen", 64.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot", "Kitchen", 79.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nike Zoom Fly Flyknit", "Shoes", 159.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vans Old Skool Pro", "Shoes", 64.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bullboxer Kelden Cap Toe Boot", "Shoes", 109.99, 70);