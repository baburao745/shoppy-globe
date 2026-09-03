# ShoppyGlobe E-Commerce Application

ShoppyGlobe is a full-stack e-commerce application built using React, Node.js, Express.js, and MongoDB.

## Features

- Product listing
- Product details
- Product search
- Category filtering
- Shopping cart
- Add, update and remove cart items
- User registration
- User login
- JWT authentication
- Protected cart APIs
- Password hashing using bcrypt
- MongoDB database
- Checkout page
- Currency conversion
- Product ratings and discounts
- Product stock and availability information
- Error handling and validation

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- dotenv

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT token |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get a product by ID |

### Cart

| Method | Endpoint | Description |
|---|---|---|
| POST | `/cart` | Add product to cart |
| PUT | `/cart/:id` | Update cart quantity |
| DELETE | `/cart/:id` | Remove cart item |

Cart APIs require JWT authentication.

## Product Data

Each product contains information such as:

- Name
- Price
- Description
- Stock
- Image
- Category
- Brand
- Rating
- Discount percentage
- Availability status
- Minimum order quantity
- SKU

## Authentication

The application uses JWT-based authentication.

After successful login, the server returns a JWT token. Protected cart requests use the token in the request header:

```text
Authorization: Bearer <jwt_token>
git repo link(https://github.com/baburao745/shoppy-globe.git)