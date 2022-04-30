## Task Manager
A simple mock store API created with NodeJS and Express to show how you can filter using NodeJS

### Get Started
1. Create a .env file in the root
2. .env file should contain your mongoDB connection string in this format:
   ```
   MONGO_URI = <Your connection string>
   ```
3. Install all dependecies
   ```
   npm install
   ```
4. Populate the database by running the populate.js
   ```
   node populate
   ```
5. Run the app (nodemon)
    ```
    npm start
    ```
6. Visit the site at your browser at port 3000 by default or assign a value to PORT in your env
   ```
   https://localhost/3000
   ```