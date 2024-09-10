# Full-Stack-Basic-App

This project includes a backend developed with TypeORM and Node.js and a frontend developed with Redux and React. Authentication is handled using JWT (JSON Web Token), and MySQL is used for the database. The frontend performs JWT checks using Axios.

## Table of Contents

- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Authors](#authors)
- [License](#license)

## Getting Started

Follow these steps to set up and run both the backend and frontend.

### Backend Setup

1. **Requirements:**
   - Node.js (v14 or later)
   - MySQL

2. **Install Project Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Database Configuration:**
   - Create a `backend/.env` file and add your MySQL connection details:
     ```
     DB_HOST=localhost
     DB_USER=username
     DB_PASSWORD=password
     DB_NAME=database_name
     ```

4. **Run Database Migrations:**
   ```bash
   npm run typeorm migration:run
   ```

5. **Start the Application:**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Requirements:**
   - Node.js (v14 or later)

2. **Install Project Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `frontend/.env` file and specify your API endpoint:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

4. **Start the Application:**
   ```bash
   npm start
   ```

## Usage

- **Backend API:**
  - The application uses JWT-based authentication and has endpoints starting with `/api`.
  - For more information on the API, refer to the `backend/src/routes` folder.

- **Frontend Application:**
  - The frontend uses Redux for state management and Axios for API requests.
  - User login and registration are managed with JWT tokens.
  - The application can be found in the `src/components` and `src/redux` folders.

## Authors

- [Muhammed Taha Caglar]

## License

This project is licensed under the [MIT License](LICENSE).
