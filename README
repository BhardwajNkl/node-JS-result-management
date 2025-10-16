# Result Management System

A web application to manage and view student results with role-based access for teachers and students. Dockerized for easy setup and deployment.

---

## Application Overview

### User Types

- **Teacher** – Can *create*, *view*, *update*, and *delete* student results.  
  Each teacher can only manage the results they have created.
- **Student** – Can *view* results by providing roll number and date of birth.

> Students can check results of others if they know the roll number and date of birth — this is **intentional**, not a bug.

---

## Working & Assumptions

1. Two user roles: `STUDENT` and `TEACHER`.
2. Common login form for both roles.
3. Single registration form (user selects role while registering).
4. Teachers can only manage results created by them.
5. Students can view results only.
6. Authorization ensures a student cannot log in as a teacher.

---

## Running with Docker

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps to Run

```bash
# 1. Clone the repository
git clone https://github.com/BhardwajNkl/node-JS-result-management.git

# 2. Move into the project directory
cd node-JS-result-management

# 3. Create a .env file using .env.sample as reference

# 4. Build the Docker images
docker compose build

# 5. Start the application
docker compose up
# Access the app at http://localhost:3000

# 6. Stop the containers
docker compose down
# Use 'docker compose down -v' to remove volumes too.
```

## Tech Stack
Node.js • Express.js • EJS • MySQL • Sequelize • JWT • Docker • Docker Compose

## License
This project is licensed under the **Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)** License.  
You are free to share and use this code with proper attribution, but **you may not modify or distribute derivative works**.

For full license details, visit:  
[https://creativecommons.org/licenses/by-nd/4.0/](https://creativecommons.org/licenses/by-nd/4.0/)

