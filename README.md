# WTWR (What to Wear?) — Back End

The back-end server for the WTWR web application. It uses a RESTful API for managing user profiles and clothing items based on weather conditions.

## Project Description

The back-end server provides the following functionality:

- Returns a list of all users
- Returns a single user by ID
- Creates a new user with a name and avata
- Clothing item creation, retrieval, deletion
- Liking and unliking clothing items
- Input validation using Mongoose
- Handles errors (400, 404, 500) with consistent JSON responses
- MongoDB database integration

## Technologies and Techniques Used

- Node.js — JavaScript runtime for the server
- Express.js — Web framework for building the API
- MongoDB — NoSQL database for storing user and item data
- Mongoose — ODM for defining models and interacting with MongoDB
- ESLint — Code linter with Airbnb's base config
- Prettier — Code formatter for easier to read code
- Validator.js — Validate avatar and image URLs
- nodemon — Auto-reload the server during development
- Custom error handling — Centralized, structured responses for all error types
