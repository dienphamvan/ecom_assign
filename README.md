# E-Commerce API Assessment

## Background

An e-commerce platform needs a system where store managers can manage their product inventory and handle customer orders. Store managers and products are identified by unique IDs.

## Your Task

Your task is to:

1. Develop a set of API endpoints, listed under _User Stories_ below, for store managers to perform inventory and order management functions.
   - Your code must be hosted on Github, or any other similar service, in a publicly-accessible repository.
   - You may assume that login and access control have already been handled.
2. _(Optional)_ Deploy your API to any publicly accessible hosting environment.

When you have completed your assignment, please submit a link to your code repository.

## Requirements/Expectations

1. Your code repository should contain a `README.md` that includes the following:
   - Link(s) to the hosted API (if applicable)
   - Instructions for running local instance of your API server
   - Database schema design
2. Please use Python for the backend code.
3. Please use PostgreSQL as the database.
4. Please include unit tests with minimum 70% coverage.
5. If you are selected for a technical interview, you should be prepared to:
   - Walk through your code to interviewers
   - Explain your database schema design
   - Implement additional features or modifications

## Important!

- We will assess your submission holistically, including factors such as:
  - Code organization and architecture
  - Error handling and input validation
  - API documentation quality
  - Performance considerations
- Your API will be subjected to automated testing, so **please follow the specifications exactly**.
  - You must provide a Swagger/OpenAPI documentation for your endpoints.

## User Stories

### 1. As a store manager, I want to add or update products in my inventory.

A manager can add multiple products at once. Each product must have a name, price, and quantity.

- Endpoint: `POST /api/inventory/products`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 201
- Request body example:

```
{
  "manager_id": "mgr_123",
  "products": [
    {
      "name": "Premium Coffee Beans",
      "price": 15.99,
      "quantity": 100
    },
    {
      "name": "Ceramic Coffee Mug",
      "price": 12.99,
      "quantity": 50
    }
  ]
}
```

### 2. As a store manager, I want to retrieve products based on their status.

- Endpoint: `GET /api/inventory/products`
- Success response status: HTTP 200
- Request example 1: `GET /api/inventory/products?status=in_stock&manager_id=mgr_123`
- Success response body 1:

```
{
  "products": [
    {
      "id": "prod_001",
      "name": "Premium Coffee Beans",
      "price": 15.99,
      "quantity": 100
    },
    {
      "id": "prod_002",
      "name": "Ceramic Coffee Mug",
      "price": 12.99,
      "quantity": 50
    }
  ]
}
```

### 3. As a store manager, I want to mark products as discontinued.

- Endpoint: `POST /api/inventory/discontinue`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 204
- Request body example:

```
{
  "manager_id": "mgr_123",
  "product_id": "prod_001"
}
```

### 4. As a store manager, I want to process customer orders and update inventory.

An order consists of:

- the customer information
- the list of products being ordered
- the quantity of each product

The order can be processed if:

- ALL products are in stock
- AND the requested quantity is available
- AND none of the products are discontinued

- Endpoint: `POST /api/orders/process`
- Headers: `Content-Type: application/json`
- Success response status: HTTP 200
- Request body example:

```
{
  "manager_id": "mgr_123",
  "customer": {
    "id": "cust_456",
    "email": "customer@example.com"
  },
  "products": [
    {
      "product_id": "prod_001",
      "quantity": 2
    },
    {
      "product_id": "prod_002",
      "quantity": 1
    }
  ]
}
```

- Success response body:

```
{
  "order_id": "ord_789",
  "status": "processed",
  "total_amount": 44.97
}
```

## Error Responses

For all API endpoints, error responses should:

- Use appropriate HTTP status codes (400 for bad requests, 404 for not found, etc.)
- Include a JSON response body with error details:

```
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Detailed error message",
    "details": {
      "field": "Additional context about the error"
    }
  }
}
```

## Additional Requirements

1. Implement rate limiting (100 requests per hour per manager_id)
2. Add request logging for audit purposes
3. Implement basic caching for product queries
