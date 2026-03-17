# API Reasoning and Validation

## Endpoint

**POST** `/orders`

**Example Request Body:**
```json
{
  "userId": 25,
  "items": [
    {
      "productId": 5,
      "quantity": 2
    }
  ]
}
```

---

## 1. Validation

Before creating an order, two layers of validation should be performed:

### Data Validation
This checks that all fields submitted from the client are in a valid format:

- Is `userId` present and in a valid data format (e.g. a positive integer)?
- Is `userId` null or empty?
- Is `items` an array?
- Is the `items` array empty?
- Is `productId` present and in a valid data format?
- Is `productId` null or empty?
- Is `quantity` a number?
- Is `quantity` greater than 0?

### Business Logic Validation
This checks that the submitted values are valid against real data and policies in the system:

- **userId** — Does this user actually exist in the system database?
- **userId** — Is the user permitted to place orders (e.g. not suspended or inactive)?
- **productId** — Does this product actually exist in the system database?
- **quantity** — Is the requested quantity less than or equal to the available stock in the system database?

---

## 2. Possible Errors

The following errors could occur when processing this request:

1. **Invalid User** — The `userId` does not match any existing user in the database
2. **Invalid Product** — The `productId` does not match any existing product in the database
3. **User Not Permitted** — The user exists but is suspended or inactive and cannot place orders
4. **Invalid Quantity** — The `quantity` is zero, negative, or exceeds available stock
5. **Bad Request (Format)** — The request body is malformed, contains wrong data types, or is not valid JSON
6. **Missing Required Fields** — Required fields such as `userId` or `items` are null, empty, or not provided
7. **Internal Server Error** — An unexpected failure on the server side such as a database crash or timeout

---

## 3. HTTP Response Codes

These are standard predefined HTTP response conventions:

| Scenario | Status Code | Reason |
|---|---|---|
| Successful order creation | `201 Created` | A new resource (the order) was successfully created on the server |
| Invalid request body | `400 Bad Request` | The request was malformed or contained invalid data types |
| Product not found | `404 Not Found` | The resource being accessed does not exist |
| Server error | `500 Internal Server Error` | Something went wrong on the server side unexpectedly |

### Reasoning
- `201` is used instead of `200` because a new order resource is being **created**, not just retrieved or updated
- `400` covers format and data validation failures on the client side
- `404` is returned when a specific resource (user or product) cannot be found
- `500` is reserved for unexpected server-side failures outside the control of the request
