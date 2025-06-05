<div align="center">
  <h1>📝 Post Dashboard</h1>
  <p><strong>A modern full-stack web application for managing posts with a beautiful UI</strong></p>
  
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  
  <br>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/post-dashboard)](https://github.com/yourusername/post-dashboard)
</div>

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [🐳 Docker Setup](#-docker-setup)
- [📝 API Documentation](#-api-documentation)
- [🎨 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

## ✨ Features

### 🎯 Core Features
- **📝 CRUD Operations** - Create, Read, Update, Delete posts seamlessly
- **🖼️ Media Support** - Upload and display multiple images per post
- **⚡ Real-time Updates** - Instant UI updates after operations
- **🔍 Responsive Design** - Works perfectly on desktop and mobile devices
- **💫 Beautiful UI** - Modern, clean interface with smooth animations

### 🔧 Technical Features
- **🐳 Containerized** - Full Docker Compose setup for easy deployment
- **🔄 Database Persistence** - PostgreSQL with volume mounting
- **🏥 Health Checks** - Automatic service health monitoring
- **🔀 API Proxy** - Nginx reverse proxy for production-ready setup
- **🛡️ Error Handling** - Comprehensive error handling and user feedback

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Lightning fast build tool
- **CSS3** - Custom styling with modern CSS features
- **Nginx** - Production web server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Robust relational database
- **UUID** - Unique identifier generation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Alpine Linux** - Lightweight base images

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Backend       │    │   Database      │
│   (React+Vite)  │◄──►│   (Node.js)     │◄──►│   (PostgreSQL)  │
│   Port: 8080    │    │   Port: 3000    │    │   Port: 5432    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 │
                    ┌─────────────────┐
                    │                 │
                    │  Docker Network │
                    │ (my-custom-net) │
                    │                 │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/post-dashboard.git
cd post-dashboard
```

### 2. Start the Application
```bash
# Start all services
docker-compose up --build

# Or run in background
docker-compose up --build -d
```

### 3. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000/api/posts
- **Database**: localhost:5432

### 4. Stop the Application
```bash
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
```

## 🐳 Docker Setup

### Project Structure
```
post-dashboard/
├── 📁 backend/
│   ├── 🐳 Dockerfile
│   ├── 📝 index.js
│   ├── 📦 package.json
│   └── 🚫 .dockerignore
├── 📁 post-frontend/
│   ├── 🐳 Dockerfile
│   ├── ⚙️ nginx.conf
│   ├── 📁 src/
│   └── 🚫 .dockerignore
├── 🐳 docker-compose.yml
└── 📖 README.md
```

### Services Overview

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| Frontend | `node:22-alpine` + `nginx:alpine` | 8080 | React app served by Nginx |
| Backend | `node:22-alpine` | 3000 | Express.js REST API |
| Database | `postgres:16-alpine` | 5432 | PostgreSQL database |

### Environment Variables

```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=postgres
POSTGRES_HOST=database
POSTGRES_PORT=5432
```

## 📝 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 📋 Get All Posts
```http
GET /posts
```
**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Post Title",
    "content": "Post content...",
    "media": ["url1", "url2"],
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### ➕ Create Post
```http
POST /posts
Content-Type: application/json

{
  "title": "New Post",
  "content": "Post content",
  "media": ["image_url1", "image_url2"]
}
```

#### ✏️ Update Post
```http
PUT /posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "media": ["updated_url"]
}
```

#### 🗑️ Delete Post
```http
DELETE /posts/:id
```

#### 🗑️ Delete All Posts
```http
DELETE /posts
```

## 🎨 Screenshots

### 📱 Dashboard View
*Beautiful, responsive post management interface*

### ➕ Create Post
*Clean form design with real-time validation*

### ✏️ Edit Mode
*Intuitive editing experience*

## 🤝 Contributing

We love contributions! Here's how you can help:

### 🐛 Bug Reports
- Use the [issue tracker](https://github.com/yourusername/post-dashboard/issues)
- Describe the bug clearly
- Include steps to reproduce

### ✨ Feature Requests
- Check existing [issues](https://github.com/yourusername/post-dashboard/issues) first
- Describe the feature and its benefits
- Consider implementation details

### 🔧 Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -m 'Add feature'`
6. Push: `git push origin feature-name`
7. Open a Pull Request

### 📝 Development Setup
```bash
# Clone your fork
git clone https://github.com/yourusername/post-dashboard.git

# Create feature branch
git checkout -b feature-name

# Start development environment
docker-compose up --build

# Make changes and test
# ...

# Commit and push
git add .
git commit -m "Add new feature"
git push origin feature-name
```

## 🚀 Roadmap

- [ ] **User Authentication** - Login/logout functionality
- [ ] **File Upload** - Direct image upload support
- [ ] **Search & Filter** - Advanced post filtering
- [ ] **Dark Mode** - Theme switching
- [ ] **Export Data** - CSV/JSON export functionality
- [ ] **Pagination** - Handle large datasets efficiently
- [ ] **Rich Text Editor** - Markdown support
- [ ] **Real-time Updates** - WebSocket integration

## 📊 Performance

- ⚡ **Fast Build Times** - Vite for lightning-fast development
- 🐳 **Optimized Containers** - Multi-stage builds for smaller images
- 🗄️ **Database Optimization** - Indexed queries and connection pooling
- 🌐 **Production Ready** - Nginx reverse proxy and static file serving

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
lsof -i :8080
lsof -i :3000

# Change ports in docker-compose.yml if needed
```

#### Database Connection Failed
```bash
# Check if PostgreSQL is healthy
docker-compose ps

# View database logs
docker-compose logs database

# Reset database
docker-compose down -v
docker-compose up --build
```

#### Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up --build frontend
```

<!-- ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dhiraj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
``` -->

## 👤 Author

**Dhiraj**
- GitHub: [@dhiraj2060](https://github.com/Dhirajsharma2060)
- LinkedIn: [linkedin](https://www.linkedin.com/in/dhirajsharma2060/)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - For the amazing frontend framework
- [Express.js](https://expressjs.com/) - For the robust backend framework
- [PostgreSQL](https://postgresql.org/) - For the reliable database
- [Docker](https://docker.com/) - For containerization magic
- [Vite](https://vitejs.dev/) - For blazing fast builds

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Dhirajsharma2060">Dhiraj</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
