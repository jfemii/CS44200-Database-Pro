import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"databasesproject"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Sign up endpoint
app.post("/api/signup", (req, res) => {
    console.log('Received signup request:', req.body);

    const { username, email, password } = req.body;
    const date_created = new Date().toISOString().slice(0, 10);
    const is_admin = 0;

    const q = "INSERT INTO Accounts (username, email, password_field, date_created, is_admin) VALUES (?, ?, ?, ?, ?)";
    console.log('SQL Query:', q);
    console.log('Values:', [username, email, password, date_created, is_admin]);
    
    db.query(q, [username, email, password, date_created, is_admin], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Username or email already exists" });
            }
            return res.status(500).json({ message: "Error creating account: " + err.message });
        }
        return res.status(201).json({ message: "Account created successfully" });
    });
});

// Sign in endpoint
app.post("/api/signin", (req, res) => {
    const { email, password } = req.body;

    const q = "SELECT * FROM Accounts WHERE email = ? AND password_field = ?";
    
    db.query(q, [email, password], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error signing in" });
        }
        
        if (data.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        return res.json({ 
            message: "Signed in successfully",
            user: {
                user_id: data[0].user_id,
                username: data[0].username,
                email: data[0].email,
                password_field: data[0].password_field,
                is_admin: data[0].is_admin
            }
        });
    });
});

// Add this new endpoint to fetch user orders
app.get("/api/orders/:userId", (req, res) => {
    const userId = req.params.userId;

    const q = `
        SELECT 
            o.order_id,
            o.order_date,
            i.item_name,
            i.price,
            oi.quantity
        FROM Accounts a
        JOIN Customers c ON a.user_id = c.user_id
        JOIN Orders o ON c.customer_id = o.customer_id
        JOIN Order_Items oi ON o.order_id = oi.order_id
        JOIN Items i ON oi.item_id = i.item_id
        WHERE a.user_id = ?
        ORDER BY o.order_date DESC, o.order_id
    `;

    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching orders" });
        }

        // Group items by order
        const orders = data.reduce((acc, row) => {
            const orderId = row.order_id;
            
            if (!acc[orderId]) {
                acc[orderId] = {
                    orderId: orderId,
                    date: row.order_date,
                    items: [],
                    total: 0
                };
            }

            const itemTotal = row.price * row.quantity;
            acc[orderId].items.push({
                name: row.item_name,
                quantity: row.quantity,
                price: row.price,
                total: itemTotal
            });
            acc[orderId].total += itemTotal;

            return acc;
        }, {});

        return res.json(Object.values(orders));
    });
});

// Add order creation endpoint
app.post("/api/orders/create", (req, res) => {
    const { userId, customerInfo, items, totalAmount, isGuestCheckout } = req.body;

    // Function to create customer and process order
    const createCustomerAndOrder = () => {
        const createCustomerQuery = `
            INSERT INTO Customers (user_id, fname, lname, phone_number, address)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        db.query(createCustomerQuery, 
            [userId || null, customerInfo.firstName, customerInfo.lastName, customerInfo.phoneNumber, customerInfo.address],
            (err, result) => {
                if (err) {
                    console.error("Error creating customer:", err);
                    return res.status(500).json({ message: "Error creating order" });
                }
                const customerId = result.insertId;
                processOrder(customerId);
            }
        );
    };

    // If it's a guest checkout or no userId, create new customer
    if (isGuestCheckout || !userId) {
        createCustomerAndOrder();
    } else {
        // Check for existing customer if user is logged in
        const findCustomerQuery = "SELECT customer_id FROM Customers WHERE user_id = ?";
        db.query(findCustomerQuery, [userId], (err, customerResult) => {
            if (err) {
                console.error("Error finding customer:", err);
                return res.status(500).json({ message: "Error creating order" });
            }

            if (customerResult.length > 0) {
                processOrder(customerResult[0].customer_id);
            } else {
                createCustomerAndOrder();
            }
        });
    }

    function processOrder(customerId) {
        // Create the order
        const createOrderQuery = `
            INSERT INTO Orders (order_date, payment_method, customer_id)
            VALUES (CURDATE(), 'credit_card', ?)
        `;

        db.query(createOrderQuery, [customerId], (err, orderResult) => {
            if (err) {
                console.error("Error creating order:", err);
                return res.status(500).json({ message: "Error creating order" });
            }

            const orderId = orderResult.insertId;

            // Combine duplicate items and sum their quantities
            const consolidatedItems = items.reduce((acc, item) => {
                const existingItem = acc.find(i => i.item_id === item.item_id);
                if (existingItem) {
                    existingItem.quantity += (item.quantity || 1);
                } else {
                    acc.push({
                        item_id: item.item_id,
                        quantity: item.quantity || 1
                    });
                }
                return acc;
            }, []);

            // Insert order items
            const orderItemsQuery = `
                INSERT INTO Order_Items (order_id, item_id, quantity)
                VALUES ?
            `;

            const orderItemsValues = consolidatedItems.map(item => [
                orderId,
                item.item_id,
                item.quantity
            ]);

            db.query(orderItemsQuery, [orderItemsValues], (err) => {
                if (err) {
                    console.error("Error creating order items:", err);
                    return res.status(500).json({ message: "Error creating order items" });
                }

                res.status(200).json({
                    message: "Order created successfully",
                    orderId: orderId
                });
            });
        });
    }
});

app.listen(8800, () => {
    console.log("connected to backend!")
})