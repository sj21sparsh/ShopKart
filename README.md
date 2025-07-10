# ShopKart - Full Stack E-commerce Website

Website Link : https://shopkartoutfits.netlify.app/

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js) and deployed on Render and Netlify.

## Project Structure

```
ShopKart/
├── Backend/         → Node.js + Express + MongoDB + REST API
├── Frontend/        → React + Vite + Redux Toolkit
└── README.md
```

## Prerequisites

- Node.js (v18+)
- MongoDB Atlas
- Render
- Netlify
- Git CLI

## 1. Backend Setup

### Navigate to Backend folder

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Create .env file

```env
PORT=3000
MONGO_URI=<your-mongodb-atlas-uri>
```

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopkart?retryWrites=true&w=majority
```

### Seed Product Data (Optional)

If you have seed.js and products.js:

```bash
node seed.js
```

This removes existing products and inserts new ones.

### Run the Backend server

```bash
npm run dev
```

Runs on: http://localhost:3000

## 2. Frontend Setup

### Navigate to Frontend folder

```bash
cd ../frontend
```

### Install dependencies

```bash
npm install
```

### Configure API Base URL

In `src/api/axiosInstance.js`:

```js
const axiosInstance = axios.create({
  baseURL: "https://shopkart-yup9.onrender.com/api", // Or your localhost
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Run the Frontend dev server

```bash
npm run dev
```

Runs on: http://localhost:5173

## 3. Deployment

### Backend on Render

1. Go to https://render.com
2. Click "New Web Service"
3. Connect your GitHub repo → Select ShopKart/Backend
4. Set:
   - Build Command: `npm install`
   - Start Command: `node index.js`
5. Add Environment Variables (from .env)
6. Deploy → Get your Backend URL

### Frontend on Netlify

1. Go to https://netlify.com
2. Click "Add new site" → Import from Git
3. Choose ShopKart/Frontend folder
4. Set:
   - Base Directory: `Frontend`
   - Build Command: `npm run build`
   - Publish Directory: `Frontend/dist`
5. Click "Deploy Site"

## Your Website is live.

## API Routes

---

### Product Routes (`/api/products`)

| Method | Endpoint                             | Description                               |
|--------|--------------------------------------|-------------------------------------------|
| GET    | `/api/products`                      | Get all products                          |
| GET    | `/api/products/:id`                  | Get product by ID                         |
| GET    | `/api/products/category/:category`   | Get products by category                  |
| GET    | `/api/products/featured`             | Get featured products                     |
| GET    | `/api/products/latest`               | Get latest products                       |
| GET    | `/api/products/related/:id`          | Get related products (by product ID)      |

---

### Cart Routes (`/api/cart`)

| Method | Endpoint            | Description                              |
|--------|---------------------|------------------------------------------|
| GET    | `/api/cart`         | Get cart                                 |
| POST   | `/api/cart/item`    | Add item to cart                         |
| PUT    | `/api/cart/item`    | Update item in cart                      |
| DELETE | `/api/cart/item`    | Remove item from cart                    |
| DELETE | `/api/cart`         | Clear entire cart                        |

Use query parameters `?userId=...` or `?guestId=...` in all cart routes.

---

### Order Routes (`/api/orders`)

| Method | Endpoint                    | Description                             |
|--------|-----------------------------|-----------------------------------------|
| POST   | `/api/orders/placeOrder`    | Place a new order                       |
| GET    | `/api/orders/getOrders`     | Get all orders                          |

 Use query parameters `?userId=...` or `?guestId=...` in both order routes.

---


## Tips

- Store guestId in localStorage
- Ensure image links are valid and optimized
- Use asyncThunk and Redux Toolkit for clean state management
- Keep .env secrets safe

## License

MIT

## Author

Sparsh Jain – https://github.com/sj21sparsh

