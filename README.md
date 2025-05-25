# 📸 Unsplash Favorites API

A backend API that allows users to:

* Search images from Unsplash
* Create an account and authenticate with JWT
* Save favorite images
* Retrieve and delete favorites

Built with Node.js, Express, TypeScript, MongoDB, Mongoose, and Docker.

---

## ✨ Technologies

* **Node.js** + **Express**
* **TypeScript**
* **MongoDB** with **Mongoose**
* **JWT** Authentication
* **Axios** for external requests
* **Jest** for testing
* **Docker** for containerization

---

## 📂 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/brunoggomide/normas_test.git
cd normas_test
```

### 2. Create environment files

Create the following environment files in the project root:

#### `.env.docker`

```env
# MongoDB connection (Docker)
MONGODB_URI=mongodb://admin:admin123@mongo:27017/db_norma?authSource=admin

# JWT secret used for signing tokens
JWT_SECRET=your_jwt_secret

# Unsplash API access key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Internal port used by the application
PORT=3000
```

#### `.env.test`

```env
# MongoDB connection (Test)
MONGODB_URI=mongodb://admin:admin123@mongo:27017/test?authSource=admin

JWT_SECRET=your_jwt_secret
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

---

## 🛠️ Run with Docker

### Start the app (and MongoDB)

```bash
docker-compose up --build
```

> This command builds the image and starts both the MongoDB and application containers.

### Start only the app (after built)

```bash
docker-compose up app
```

### Run tests

```bash
docker-compose run --rm tests
```

---

## 📊 API Endpoints

### 📅 Auth

#### ✉️ POST `/auth/signup`

Create a new user.

**Body:**

```json
{
  "email": "bruno@example.com",
  "password": "123456"
}
```

#### 🔐 POST `/auth/login`

Authenticate and receive a JWT token.

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

### 🔍 Search

#### GET `/search?query={term}&page={number}&perPage={number}`

Search for images via the Unsplash API.

**Example:**

```
GET /search?query=dog&page=2&perPage=5
```

**Response:**

```json
[
  {
    "id": "abc123",
    "widht": 3024,
    "height": 4032,
    "description": "A dog image",
    "urls": { ... }
  }
]
```

### ⭐ Favorites (requires JWT)

**Header required for all routes below:**

```
Authorization: Bearer {token}
```

#### ➕ POST `/favorites`

Add an image to your favorites.

**Body:**

```json
{
  "imageId": "K0z5kQv0Rls",
  "description": "a cat sitting on top of a wooden fence",
  "urls": {
    "raw": "...",
    "full": "...",
    "regular": "...",
    "small": "...",
    "thumb": "..."
  }
}
```

#### 🔍 GET `/favorites`

Returns all favorites for the authenticated user.

#### ❌ DELETE `/favorites/:id`

Removes a favorite image by its ID.

---

## 🔧 Testing

Tests are written using Jest and run inside Docker.

Run tests:

```bash
docker-compose run --rm tests
```

> Tests will use the `.env.test` configuration and connect to the Mongo test database.
