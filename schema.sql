DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
  ("A Feast of Ice and Fire", "Books", 20.00, 10),
  ("The Travelling Cat Chronicles", "Books", 15.00, 10),
  ("Bundle of Advanced Coloring Books", "Books", 25.00, 5),
  ("Metallic Colored Pencils", "Miscellaneous", 15.00, 5),
  ("Neon Colored Pencils", "Miscellaneous", 15.00, 5),
  ("Star Wars: The Complete Saga Collection", "Video", 140.00, 5),
  ("X-Files: The Complete TV Series and Movie Collection", "Video", 175.00, 5),
  ("Breville Boss Easy to UseSuperblender", "Kitchenware", 120.00, 5),
  ("Kyocera 10" Fry Pan 10 inch", "Kitchenware", 50.00, 15),
  ("GreenPan Ceramic 8 and 10 Inch Frypan Set", "Kitchenware", 80.00, 7);

SELECT * FROM products;