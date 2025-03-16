import express from 'express';
import cors from 'cors'; // Import cors package
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js'; // Import event routes
import { initializeDatabase } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/events', eventRoutes); // Use event routes

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
