# uniKonet Backend

This is the backend API for the uniKonet project, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js installed
- MongoDB installed and running

## Setup

1.  Navigate to the `backend` directory.
2.  Install dependencies (once `package.json` is initialized):
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/uniKonet_db
    ```

## Running the Server

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## Folder Structure

-   `config/`: Database configuration and environment variables.
-   `controllers/`: Logic for handling API requests.
-   `middleware/`: Custom middleware (auth, error handling).
-   `models/`: Mongoose schemas.
-   `routes/`: API route definitions.
-   `utils/`: Helper functions.
