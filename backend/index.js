import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))
app.use(express.json())

app.get("/api/test", (req, res) => {
    console.log("Test endpoint hit!");
    res.json({ message: "Backend is working!" });
});

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

// Check if user can review a product (KEEP THIS FIRST in route order)
app.get("/api/reviews/can-review", (req, res) => {
    const { userId, itemId } = req.query;

    const query = `
        SELECT DISTINCT o.order_id
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        JOIN Order_Items oi ON o.order_id = oi.order_id
        LEFT JOIN Reviews r ON (
            r.customer_id = c.customer_id AND 
            r.item_id = oi.item_id
        )
        WHERE c.user_id = ? 
        AND oi.item_id = ?
        AND r.review_id IS NULL
        LIMIT 1
    `;

    db.query(query, [userId, itemId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error checking review eligibility" });
        }

        res.json({
            canReview: results.length > 0,
            orderId: results.length > 0 ? results[0].order_id : null
        });
    });
});

// Get reviews for a specific product
app.get("/api/reviews/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const query = `
        SELECT r.review_id, r.rating, r.review_message, r.review_date, 
               a.username
        FROM Reviews r
        JOIN Customers c ON r.customer_id = c.customer_id
        JOIN Accounts a ON c.user_id = a.user_id
        WHERE r.item_id = ?
        ORDER BY r.review_date DESC
        LIMIT 10
    `;
    
    db.query(query, [itemId], (err, results) => {
        if (err) {
            console.error("Error getting reviews:", err);
            return res.status(500).json({ message: "Error getting reviews" });
        }
        res.json(results);
    });
});

// Get average rating and count for a product
app.get("/api/reviews/stats/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const query = `
        SELECT 
            AVG(rating) as average_rating,
            COUNT(*) as review_count
        FROM Reviews
        WHERE item_id = ?
    `;
    
    db.query(query, [itemId], (err, results) => {
        if (err) {
            console.error("Error getting review stats:", err);
            return res.status(500).json({ message: "Error getting review stats" });
        }
        res.json(results[0]);
    });
});

// Submit a new review
app.post("/api/reviews/submit", (req, res) => {
    const { userId, itemId, orderId, rating, message } = req.body;
    
    // First get customer_id
    db.query("SELECT customer_id FROM Customers WHERE user_id = ?", [userId], (err, results) => {
        if (err || results.length === 0) {
            console.error("Error getting customer_id:", err);
            return res.status(500).json({ message: "Error submitting review" });
        }
        
        const customerId = results[0].customer_id;
        const query = `
            INSERT INTO Reviews (
                customer_id, item_id, order_id, rating, 
                review_message, review_date
            ) VALUES (?, ?, ?, ?, ?, CURDATE())
        `;
        
        db.query(query, [customerId, itemId, orderId, rating, message], (err) => {
            if (err) {
                console.error("Error submitting review:", err);
                return res.status(500).json({ message: "Error submitting review" });
            }
            res.json({ message: "Review submitted successfully" });
        });
    });
});

app.listen(8800, () => {
    console.log("connected to backend!")
})