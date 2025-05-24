# 📸 Unsplash Favorites API

A backend application that allows users to search for images using the Unsplash API, save images as favorites, view their collection, and remove favorites. The favorites module is protected by JWT authentication.

---

## 🚀 Tech Stack

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* JWT (Authentication)
* Axios (HTTP client)
* Unsplash API

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/brunoggomide/unsplash-api.git
cd unsplash-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
MONGODB_URI=your_mongodb_config
JWT_SECRET=your_jwt_secret
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

> You can use MongoDB locally (via Docker) or connect to a MongoDB Atlas cluster.

### 4. Run the project

```bash
npm start
```

---

## 🧪 Testing

Automated tests will be added soon using Jest and Supertest.

---

## 🔐 Authentication

This API uses JWT-based authentication. After logging in, pass the token in the header:

```
Authorization: Bearer {your_token}
```

---

## 📛 API Endpoints

### 📋 Auth

#### ✉️ POST `/auth/register`

Registers a new user.

**Body:**

```json
{
  "email": "bruno@example.com",
  "password": "123456"
}
```

#### 🔐 POST `/auth/login`

Logs in and returns a JWT token.

**Body:**

```json
{
  "email": "bruno@example.com",
  "password": "123456"
}
```

**Response:**

```json
{ "token": "..." }
```

---

### 🔍 Image Search

#### 🔍 GET `/search?query={term}&page=1&perPage=10`

Searches for images on Unsplash.

**Example:**

```
GET /search?query=cat&page=1&perPage=5
```

**Response:**

```json
[
  {
    "id": "abc123",
    "width": 3000,
    "height": 2000,
    "description": "A cat photo",
    "urls": {
      "raw": "...",
      "full": "...",
      "regular": "...",
      "small": "...",
      "thumb": "..."
    }
  }
]
```

---

### ⭐ Favorites (requires JWT)

#### ➕ POST `/favorites`

Adds an image to the user's favorites.

**Headers:**

```
Authorization: Bearer {token}
```

**Body:**

```json
{
  "imageId": "abc123",
  "description": "cute cat",
  "urls": {
    "raw": "...",
    "full": "...",
    "regular": "...",
    "small": "...",
    "thumb": "..."
  }
}
```

---

#### 🔎 GET `/favorites`

Returns all favorites of the authenticated user.

**Headers:**

```
Authorization: Bearer {token}
```

---

#### ❌ DELETE `/favorites/:id`

Removes a favorite image by its ID.

**Headers:**

```
Authorization: Bearer {token}
```

---

## 🐳 Docker

Docker support will be added soon.

---

## 👨‍💼 Author

Bruno Gomide
