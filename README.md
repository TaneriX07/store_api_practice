## Task Manager
A simple mock store API created with NodeJS and Express to show how you can filter using mongoDB

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

### Usage
Call the API (return everything in the DB)
   ```
      https://localhost/3000/products
   ```

Call the API with filter
   ```
      https://localhost/3000/products?name=table
      https://localhost/3000/products?sort=-price
      https://localhost/3000/products?fields=name,rating,featured
      https://localhost/3000/products?page=2
      https://localhost/3000/products?limit=15
      https://localhost/3000/products?limit=15&page=2
      https://localhost/3000/products?numericFilter=price>=30
   ```