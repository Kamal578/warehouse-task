### Task Description: Warehouse Management System Demo App

#### Overview:
You are tasked with developing a warehouse management system demo application that allows users to manage products within a warehouse. The application should provide basic CRUD (Create, Read, Update, Delete) operations for products stored in a PostgreSQL database. Additionally, the application should integrate logging for improved observability and Prometheus metrics for monitoring performance.

#### Requirements:
1. **Backend Development**:
   - Choose any backend framework (e.g., Flask, Django, Express.js) to develop the application.
   - Implement CRUD operations for managing products stored in a PostgreSQL database.
   - Expose RESTful API endpoints for the following operations:
     - `GET /products`: Retrieve all products.
     - `GET /products/<id>`: Retrieve a specific product.
     - `POST /products`: Create a new product.
     - `PUT /products/<id>`: Update an existing product.
     - `DELETE /products/<id>`: Delete a product.

2. **Database Design**:
   - Design a PostgreSQL database schema to store product information.
   - Include a Product model with fields such as product ID, name, description, quantity, and price.

3. **Logging**:
   - Integrate logging to capture relevant information such as API requests, database queries, and errors.
   - Log messages should be output to stdout/stderr or log files.

4. **Prometheus Metrics**:
   - Instrument your application code to expose custom Prometheus metrics.
   - Define metrics relevant to your application, such as request latency and error counts.
   - Expose a `/metrics` endpoint to serve Prometheus metrics.
   - Ensure Prometheus metrics are scraped and collected for monitoring purposes.

5. **Deployment**:
   - Dockerize your application for containerization.
   - Deploy the application in a Kubernetes (K8s) cluster.
   - Configure the PostgreSQL database connection and ensure proper communication between the application and the database.
   - Implement any necessary Kubernetes manifests (e.g., Deployment, Service) for deployment.

#### Notes:
- You have the freedom to choose the backend framework, logging library, and Prometheus client library that best suits your preferences and expertise.
- Be mindful of best practices, performance considerations, and security measures while developing the application.
- Reach out for assistance or clarification if needed.
