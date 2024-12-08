CREATE TABLE Accounts (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(15) UNIQUE,
    email VARCHAR(50) UNIQUE,
    password_field VARCHAR(20),
    date_created DATE,
    is_admin BOOL DEFAULT FALSE
);



CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    phone_number VARCHAR(15),
    address VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES Accounts(user_id)
);

CREATE TABLE Items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(5, 2),
    design_name VARCHAR(100) NOT NULL,
     base_color VARCHAR(50) DEFAULT NULL;
    item_type ENUM('canvas-painting', 't-shirt', 'phone-case', 'sweatshirt') NOT NULL,
    inventory_count INT DEFAULT 0
);

CREATE TABLE Designs (
    design_id INT PRIMARY KEY AUTO_INCREMENT,
    design_name VARCHAR(100) NOT NULL,
    design_image_url VARCHAR(255) NOT NULL,
    applicable_types SET('t-shirt', 'phone-case', 'canvas-painting', 'sweatshirt')
);

CREATE TABLE Canvas_Paintings (
    item_id INT PRIMARY KEY,
    canvas_material VARCHAR(100) NOT NULL,
    width DECIMAL(4, 2) NOT NULL,
    height DECIMAL(4, 2) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE T_Shirts (
    item_id INT PRIMARY KEY,
    size ENUM('S', 'M', 'L', 'XL', 'XXL') NOT NULL,
    color VARCHAR(50) NOT NULL,
    fabric_type VARCHAR(100) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE Sweatshirts ( 
item_id INT PRIMARY KEY, 
size ENUM('S', 'M', 'L', 'XL', 'XXL') NOT NULL,
color VARCHAR(50) NOT NULL, 
fabric_type VARCHAR(100) NOT NULL, 
FOREIGN KEY (item_id) REFERENCES Items(item_id) 
);

CREATE TABLE Phone_Cases (
    item_id INT PRIMARY KEY,
    phone_model VARCHAR(100) NOT NULL,
    case_material VARCHAR(100) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);



CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'cash') NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
    order_id INT,
    item_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, item_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

CREATE TABLE Reviews (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    item_id INT NOT NULL,
    order_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_message VARCHAR(250),
    review_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id),
    FOREIGN KEY (order_id, item_id) REFERENCES Order_Items(order_id, item_id)
);

INSERT INTO ITEMS (item_name, price, design_name, item_type, inventory_count, base_color)
VALUES ('White T-Shirt', '29.99', 'Base T-Shirt', 't-shirt', 100, 'white'),
('Black T-Shirt', '29.99', 'Base T-Shirt', 't-shirt', 100,'black');


INSERT INTO Items (item_name, price, design_name, item_type, base_color, inventory_count) VALUES
('Canvas Landscape 24x18', 34.99, 'Canvas Landscape', 'canvas-painting', 'white', 100),
('Canvas Landscape 36x24', 49.99, 'Canvas Landscape', 'canvas-painting', 'white', 100);



INSERT INTO Items (item_name, price, design_name, item_type, base_color, inventory_count) VALUES
('Phone Case iPhone 15', 24.99, 'Phone Case', 'phone-case', 'clear', 100),
('Phone Case iPhone 14', 24.99, 'Phone Case', 'phone-case', 'clear', 100);

INSERT INTO Items (item_name, price, design_name, item_type, base_color, inventory_count) VALUES
('Cotton Sweatshirt', 39.99, 'Sweatshirt', 'sweatshirt', 'black', 100),
('Cotton Sweatshirt', 39.99, 'Sweatshirt', 'sweatshirt', 'grey', 100);