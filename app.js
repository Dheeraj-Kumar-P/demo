import express from 'express';
import userRoutes from './routes/users.js';
import { initializeDatabase } from './database.js';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  try {
    // Initialize the database
    initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the application with an error code
  }
});
