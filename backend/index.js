const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL connection pool
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'database',
    database: process.env.POSTGRES_DB || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    port: process.env.POSTGRES_PORT || 5432,
});

// Initialize database with posts table and retry logic
async function initializeDatabase() {
    const maxRetries = 10;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
        try {
            await pool.query(`
                CREATE TABLE IF NOT EXISTS posts (
                    id UUID PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    content TEXT,
                    media TEXT[],
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("Database initialized successfully");
            return;
        } catch (error) {
            retryCount++;
            console.log(`Database connection attempt ${retryCount}/${maxRetries} failed:`, error.message);
            
            if (retryCount >= maxRetries) {
                console.error("Database initialization failed after all retries:", error);
                return;
            }
            
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// Call initialization function
initializeDatabase();

// Get all posts
app.get("/api/posts", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
    const { title, content, media } = req.body;
    const id = uuidv4();
    
    try {
        const newPost = await pool.query(
            'INSERT INTO posts (id, title, content, media, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, content, media || [], new Date()]
        );
        
        res.status(201).json({ 
            message: "Post created successfully", 
            post: newPost.rows[0]
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
});

// Update a post
app.put("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, media } = req.body;
    
    try {
        const result = await pool.query(
            'UPDATE posts SET title = $1, content = $2, media = $3 WHERE id = $4 RETURNING *',
            [title, content, media || [], id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.json({ 
            message: "Post updated successfully", 
            post: result.rows[0]
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Failed to update post" });
    }
});

// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.json({ message: `Post with id ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Failed to delete post" });
    }
});

// Delete all posts
app.delete("/api/posts", async (req, res) => {
    try {
        await pool.query('DELETE FROM posts');
        res.json({ message: "All posts deleted successfully" });
    } catch (error) {
        console.error("Error deleting all posts:", error);
        res.status(500).json({ message: "Failed to delete all posts" });
    }
});

// Handle application errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});