# 🌾 MD Agro Connect — Complete Team Knowledge & Codebase Guide
> **Internal Project Handbook & Technical Defense (Viva) Manual**  
> *Target Audience: All Team Members (Developers, Presenters, Evaluators)*

---

## 📑 Table of Contents
1. [Project Overview & Problem Statement](#1-project-overview--problem-statement)
2. [High-Level Architecture & Tech Stack](#2-high-level-architecture--tech-stack)
3. [Deep-Dive: JWT Authentication System](#3-deep-dive-jwt-authentication-system)
4. [Codebase Map & Directory Structure](#4-codebase-map--directory-structure)
5. [End-to-End Data Flow Walkthroughs](#5-end-to-end-data-flow-walkthroughs)
6. [Complete REST API Reference](#6-complete-rest-api-reference)
7. [Database Schema & Resilience Strategy](#7-database-schema--resilience-strategy)
8. [Setup, Execution & Testing Guide](#8-setup-execution--testing-guide)
9. [Comprehensive Viva / Project Defense Q&A (20 Questions & Answers)](#9-comprehensive-viva--project-defense-qa)

---

## 1. Project Overview & Problem Statement

### 🎯 The Real-World Challenge
Farming communities in rural Maharashtra and India face significant hurdles:
- **Counterfeit / Spurious Agri-Inputs**: Farmers unknowingly purchase adulterated seeds or expired chemicals from unverified retailers.
- **Lack of Real-Time Crop Advisory**: Plant diseases and pest infestations spread rapidly before agricultural extension officers can visit physical fields.
- **Language & Tech Barriers**: Most enterprise e-commerce portals are in English, complex, and unoptimized for 3G/4G connectivity on mid-range Android devices.
- **Fragmented Supply Chain & Delayed Fulfillment**: Lack of transparent inventory and order tracking creates mistrust.

### 💡 Our Solution: MD Agro Connect
**MD Agro Connect** is an omnichannel agri-commerce and advisory web platform that bridges certified agri-dealers directly with farmers:
- **Verified Product Catalog**: 100% genuine hybrid seeds, bio-fertilizers, systemic insecticides, and spraying equipment.
- **Bilingual Accessibility**: Instant one-click toggle between **मराठी (Marathi)** and **English**.
- **AI Crop Doctor & Pest Advisor**: Contextual disease diagnostic chatbot with voice assistance.
- **Dynamic Rural Payments**: Instant UPI QR Code generation (PhonePe, Google Pay, Paytm) plus Cash on Delivery (COD).
- **Stateless Enterprise Security**: Full **JSON Web Token (JWT)** security safeguarding farmer records and administrative operations.

---

## 2. High-Level Architecture & Tech Stack

MD Agro Connect adopts a decoupled **Client-Server REST Architecture**:

```mermaid
graph TD
    subgraph Frontend ["Client Tier (Browser)"]
        UI["Modern Vanilla JS & CSS UI<br>(index.html, products.html, admin.html)"]
        Storage["Browser localStorage<br>(md_farmer_token, md_admin_token)"]
        Chatbot["AI Agro Assistant & Voice Module"]
    end

    subgraph Gateway ["HTTP & Network Layer"]
        HTTP["HTTP REST Calls (JSON)<br>Header: Authorization: Bearer <token>"]
    end

    subgraph Backend ["Server Tier (Node.js & Express)"]
        Router["Express Routers<br>(auth.js, products.js, orders.js, admin.js)"]
        AuthMid["JWT Auth Middleware<br>(verifyToken, verifyAdmin, optionalToken)"]
    end

    subgraph Persistence ["Data Tier"]
        DB["MySQL Relational DB<br>(users, products, orders, reviews)"]
        Fallback["In-Memory Failover Store<br>(Auto-activates if MySQL is offline)"]
    end

    UI --> Storage
    UI --> HTTP
    HTTP --> AuthMid
    AuthMid --> Router
    Router --> DB
    DB -.->|Fallback if offline| Fallback
```

### 🛠️ Technology Stack Breakdown

| Layer | Technology | Rationale & Advantage |
| :--- | :--- | :--- |
| **Frontend UI** | HTML5, Modern CSS3 | Custom design system, glassmorphism, responsive CSS Grid/Flexbox, light/dark mode without bloated frameworks. |
| **Frontend Logic** | Vanilla JavaScript (ES6+) | Instant load speeds, zero bundle compilation delays, native DOM manipulation, lightweight rural performance. |
| **Backend Runtime** | Node.js (v18+) | Asynchronous, event-driven I/O ideal for handling multiple concurrent farmer requests. |
| **API Framework** | Express.js | Modular middleware architecture, clean REST routing, flexible JSON request handling. |
| **Security / Auth** | `jsonwebtoken` (JWT) | RFC 7519 cryptographic token signing with HMAC-SHA256. Stateless, tamper-proof, scalable. |
| **Database** | MySQL (Pool Connection) | ACID-compliant relational storage for user profiles, inventory stock, and order logs. |
| **High-Availability Fallback** | In-Memory Data Store | Built-in failover ensuring the application never crashes during live demonstrations if MySQL service is halted. |

---

## 3. Deep-Dive: JWT Authentication System

### 🔍 What is a JSON Web Token?
A **JSON Web Token (JWT)** is an open industry standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) used to securely transmit verifiable claims between two parties.

A JWT consists of **three parts** separated by periods (`.`):
$$\text{JWT} = \text{Header} \ .\ \text{Payload} \ .\ \text{Signature}$$

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInBob25lIjoiOTgyMjE0NTY3MCIsInJvbGUiOiJmYXJtZXIiLCJpYXQiOjE3MzgxMzg0MDAsImV4cCI6MTczODc0MzIwMH0.d98a2F6f7d0c918a...
  [--------- 1. HEADER ---------] . [------------------ 2. PAYLOAD ------------------] . [-------------- 3. SIGNATURE --------------]
```

1. **Header**: Contains the token type (`JWT`) and hashing algorithm (`HS256` = HMAC using SHA-256).
2. **Payload (Claims)**: Contains the identity data:
   ```json
   {
     "id": 17,
     "phone": "9822145670",
     "name": "Ramesh Patil",
     "role": "farmer",
     "iat": 1738138400,
     "exp": 1738743200
   }
   ```
3. **Signature**: Cryptographic hash calculated using the secret key:
   $$\text{Signature} = \text{HMACSHA256}(\text{base64UrlEncode}(\text{header}) + "." + \text{base64UrlEncode}(\text{payload}),\ \text{JWT\_SECRET})$$

### ⚖️ Why JWT is Superior to Legacy Cookie-Based Sessions
| Feature | Legacy Server Sessions | JWT (MD Agro Connect) |
| :--- | :--- | :--- |
| **Server State** | Stateful (requires server memory/Redis session store). | **Stateless** (all information is inside the token). |
| **Scalability** | Hard to scale across multiple servers without shared session store. | **Zero server memory overhead**; any server with the secret key can verify. |
| **CSRF Vulnerability**| Highly vulnerable if cookies lack `SameSite=Strict`. | **Immune to CSRF** because token is passed in `Authorization` header. |
| **Mobile & Cross-Origin**| Cookies struggle across domains and mobile apps. | **Universal format** supported by web, iOS, Android, and IoT. |
| **Tamper Resistance**| Server must look up database to verify session. | **Cryptographically self-verifying**; tampering invalidates the signature instantly. |

### 🛡️ Code Tour: [backend/middleware/auth.js](file:///c:/Users/prati/OneDrive/Desktop/MD%20Agro/backend/middleware/auth.js)
The core authentication engine resides in [backend/middleware/auth.js](file:///c:/Users/prati/OneDrive/Desktop/MD%20Agro/backend/middleware/auth.js):

- `generateToken(payload, role)`: Signs a token using `process.env.JWT_SECRET` with configurable expiry (7 days for farmers, 24 hours for administrators).
- `extractToken(req)`: Extracts the token from either the `Authorization: Bearer <token>` header or `?token=` query parameter.
- `verifyToken(req, res, next)`: Validates the token for standard users. If valid, attaches `req.user` to the request pipeline; returns `401 Unauthorized` if invalid/expired.
- `verifyAdmin(req, res, next)`: Validates the token and enforces that `decoded.role === 'admin'`. Returns `403 Forbidden` if a regular farmer token attempts admin access.
- `optionalToken(req, res, next)`: Checks for a token if supplied without rejecting guest visitors (used for flexible checkout).

### 💻 Client-Side Token Storage & Injection
- **Farmers**: Stored in `localStorage.setItem('md_farmer_token', token)` & `md_farmer_user`. Attached to orders via `fetch('/api/orders', { headers: { 'Authorization': 'Bearer ' + token } })`.
- **Administrators**: Stored in `localStorage.setItem('md_admin_token', token)`. All calls in [admin.js](file:///c:/Users/prati/OneDrive/Desktop/MD%20Agro/admin.js) route through `adminFetch(url, options)`, which automatically injects the token and handles automatic session expiration redirects on 401s.

---

## 4. Codebase Map & Directory Structure

```
c:\Users\prati\OneDrive\Desktop\MD Agro\
├── 📄 index.html                # Main storefront homepage with hero, features, categories, AI assistant
├── 📄 products.html             # Product catalog with category filters, price sorting, search & cart
├── 📄 services.html             # Agricultural services (Soil testing, Drone spraying, Equipment hire)
├── 📄 advisor.html              # AI Crop Doctor, Weather widgets, Mandi Bhav market rates
├── 📄 admin.html                # Administrative back-office management portal
├── 📄 app.js                    # Client-side core engine (Cart, Checkout, Auth modals, Stepper, i18n)
├── 📄 admin.js                  # Back-office client logic (adminFetch, CRUD tables, KPIs)
├── 📄 styles.css                # Global design system, glassmorphism, responsive grid, theme variables
├── 📄 serve-frontend.js         # Dedicated static file web server (Port 8080)
├── 📄 CUSTOMER_DEMO_AND_FEEDBACK.md # Customer demo walkthrough, feedback log & improvements matrix
├── 📄 TEAM_KNOWLEDGE_GUIDE.md   # [This Guide] Technical manual & viva defense handbook
├── 📁 frontend/                 # Mirror distribution folder containing storefront assets
│
└── 📁 backend/                  # RESTful API Server (Node.js & Express - Port 3001)
    ├── 📄 package.json          # Node dependencies (express, jsonwebtoken, mysql2, cors, dotenv)
    ├── 📄 server.js             # Express application initialization, CORS config, route bindings
    ├── 📄 .env                  # Environment secrets (PORT, DB credentials, JWT_SECRET)
    ├── 📄 .env.example          # Template environment file for deployment
    ├── 📄 test_jwt_auth.js      # Unit test suite verifying JWT signing and middleware logic
    ├── 📄 test_jwt_endpoints.js # End-to-end HTTP integration test suite for live API endpoints
    │
    ├── 📁 config/
    │   └── 📄 db.js             # MySQL connection pool & failover in-memory store logic
    │
    ├── 📁 middleware/
    │   └── 📄 auth.js           # JWT verification, admin role checking, token generation
    │
    └── 📁 routes/
        ├── 📄 auth.js           # Farmer / User registration, login, profile (/me), order history
        ├── 📄 admin.js          # Admin authentication, dashboard metrics, user account management
        ├── 📄 products.js       # Product catalog retrieval (public) and inventory editing (admin-only)
        └── 📄 orders.js         # Order creation (farmer), order listing and status changes (admin-only)
```

---

## 5. End-to-End Data Flow Walkthroughs

### 🔄 Scenario A: Farmer Registration & Login
```mermaid
sequenceDiagram
    autonumber
    actor Farmer as 👨‍🌾 Farmer
    participant UI as 🖥️ Storefront (app.js)
    participant AuthAPI as ⚙️ Express /api/auth
    participant AuthMW as 🛡️ auth.js Middleware
    participant DB as 🗄️ MySQL Database

    Farmer->>UI: Enters Phone & Password
    UI->>AuthAPI: POST /api/auth/login { phone, password }
    AuthAPI->>DB: Query user by phone & verify password
    DB-->>AuthAPI: User record found
    AuthAPI->>AuthMW: generateToken({ id, phone, role: 'farmer' })
    AuthMW-->>AuthAPI: Signed JWT string
    AuthAPI-->>UI: 200 OK { token, user }
    UI->>UI: Save token to localStorage ('md_farmer_token')
    UI->>UI: Update header with User Badge & "🔐 JWT Authenticated"
```

---

### 🔄 Scenario B: Placing an Order with Authenticated Session
```mermaid
sequenceDiagram
    autonumber
    actor Farmer as 👨‍🌾 Farmer
    participant UI as 🖥️ Storefront (app.js)
    participant OrdersAPI as ⚙️ Express /api/orders
    participant AuthMW as 🛡️ optionalToken Middleware
    participant DB as 🗄️ MySQL Database

    Farmer->>UI: Clicks "Proceed to Checkout"
    UI->>UI: Reads 'md_farmer_token' from localStorage
    UI->>OrdersAPI: POST /api/orders<br>Header: Authorization: Bearer <token><br>Body: { items, paymentMethod, address }
    OrdersAPI->>AuthMW: optionalToken() parses header
    AuthMW-->>OrdersAPI: req.user = { id: 17, role: 'farmer' }
    OrdersAPI->>DB: INSERT into orders with user_id = 17
    DB-->>OrdersAPI: Order #MD-1082 created
    OrdersAPI-->>UI: 201 Created { success: true, orderId: "MD-1082" }
    UI->>UI: Display Dynamic UPI QR / COD Confirmation & 4-Step Stepper
```

---

### 🔄 Scenario C: Administrator Updating Order Status
```mermaid
sequenceDiagram
    autonumber
    actor Admin as 👨‍💼 Administrator
    participant AdminUI as 🖥️ Admin Portal (admin.js)
    participant OrdersAPI as ⚙️ Express /api/orders
    participant AuthMW as 🛡️ verifyAdmin Middleware
    participant DB as 🗄️ MySQL Database

    Admin->>AdminUI: Changes Order #MD-1082 status to "Dispatched"
    AdminUI->>OrdersAPI: PATCH /api/orders/MD-1082/status<br>Header: Authorization: Bearer <admin_token><br>Body: { status: 'Dispatched' }
    OrdersAPI->>AuthMW: verifyAdmin(req, res, next)
    alt Token Missing or Invalid
        AuthMW-->>AdminUI: 401 Unauthorized
    else Role is 'farmer' (Not Admin)
        AuthMW-->>AdminUI: 403 Forbidden ("Admin access required")
    else Role is 'admin' & Token Valid
        AuthMW-->>OrdersAPI: Access Granted (next())
        OrdersAPI->>DB: UPDATE orders SET status = 'Dispatched'
        DB-->>OrdersAPI: Query OK
        OrdersAPI-->>AdminUI: 200 OK { message: "Status updated" }
        AdminUI->>AdminUI: Show success toast & refresh table
    end
```

---

## 6. Complete REST API Reference

All backend endpoints are prefixed with `/api`.

### 🔐 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new farmer account; returns user profile and signed JWT. |
| `POST` | `/api/auth/login` | Public | Authenticates farmer by phone/password; returns signed JWT. |
| `GET` | `/api/auth/me` | 🔒 `verifyToken` | Returns currently logged-in user profile decoded from Bearer token. |
| `GET` | `/api/auth/verify` | 🔒 `verifyToken` | Verifies token validity and remaining lifetime. |
| `GET` | `/api/auth/my-orders`| 🔒 `optionalToken` | Returns order history for current user (matched via user ID or phone). |

### 🛠️ 2. Admin Routes (`/api/admin`)
| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/admin/login` | Public | Authenticates admin (`mdagro` / `mdagro6074`); returns 24h admin JWT. |
| `GET` | `/api/admin/verify` | 🔒 `verifyAdmin` | Verifies admin token authenticity. |
| `GET` | `/api/admin/overview` | 🔒 `verifyAdmin` | Returns aggregated metrics: total revenue, active orders, stock counts. |
| `GET` | `/api/admin/users` | 🔒 `verifyAdmin` | Lists all registered farmers and platform users. |
| `POST` | `/api/admin/users` | 🔒 `verifyAdmin` | Manually creates a user from the admin dashboard. |
| `PATCH`| `/api/admin/users/:id/status`| 🔒 `verifyAdmin` | Toggles user status between active and suspended. |
| `DELETE`| `/api/admin/users/:id` | 🔒 `verifyAdmin` | Deletes user record permanently. |

### 📦 3. Products Routes (`/api/products`)
| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | Retrieves all products, supporting category filter and search query. |
| `GET` | `/api/products/:id` | Public | Retrieves specific product details by ID. |
| `POST` | `/api/products` | 🔒 `verifyAdmin` | Adds a new agricultural product to the catalog. |
| `PUT` | `/api/products/:id` | 🔒 `verifyAdmin` | Modifies existing product title, price, or description. |
| `PATCH`| `/api/products/:id/stock`| 🔒 `verifyAdmin` | Modifies product inventory count and in-stock toggle. |
| `DELETE`| `/api/products/:id` | 🔒 `verifyAdmin` | Removes a product from the catalog. |

### 🛒 4. Orders Routes (`/api/orders`)
| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders` | 🔒 `optionalToken` | Creates new order. If Bearer token present, binds to `userId`. |
| `GET` | `/api/orders` | 🔒 `verifyAdmin` | Lists all customer orders for the store manager. |
| `GET` | `/api/orders/:id` | Public / Token | Retrieves specific order details and tracking status. |
| `PATCH`| `/api/orders/:id/status`| 🔒 `verifyAdmin` | Updates fulfillment status (`Placed` ➔ `Confirmed` ➔ `Dispatched` ➔ `Delivered`). |
| `DELETE`| `/api/orders/:id` | 🔒 `verifyAdmin` | Cancels or purges an order record. |

---

## 7. Database Schema & Resilience Strategy

### 🗄️ Database Tables (`md_agro_db`)
1. **`users`**:
   - `id` (INT PK AI), `name` (VARCHAR), `phone` (VARCHAR UNIQUE), `email` (VARCHAR), `password` (VARCHAR), `role` (ENUM: 'farmer', 'admin'), `created_at` (DATETIME).
2. **`products`**:
   - `id` (INT PK AI), `name` (VARCHAR), `category` (VARCHAR), `price` (DECIMAL), `rating` (DECIMAL), `stock` (INT), `in_stock` (BOOLEAN), `image_url` (VARCHAR), `description` (TEXT).
3. **`orders`**:
   - `id` (VARCHAR PK), `user_id` (INT FK NULLABLE), `customer_name` (VARCHAR), `phone` (VARCHAR), `address` (TEXT), `total_amount` (DECIMAL), `payment_method` (VARCHAR), `status` (VARCHAR), `items_json` (JSON), `created_at` (DATETIME).

### 🛡️ Dual-Mode Resilience & Firebase Cloud Firestore Integration
The project supports a flexible multi-database architecture:
1. **Primary Relational Store (MySQL)**: ACID-compliant local database managed via connection pooling in `backend/db.js`.
2. **Failover In-Memory Store**: Auto-activates if MySQL is offline (`backend/memoryStore.js`) ensuring 100% demo uptime.
3. **Cloud Firestore (Firebase)**: Enterprise document database for real-time mobile sync, cloud backup, and customer feedback.

#### 🔥 Cloud Firestore Collections Schema:
- **`products` collection**:
  - `id` (Document ID, e.g., `'seed-01'`)
  - `name`, `category`, `price`, `unit`, `rating`, `reviews`, `description`, `image`, `tags` (array), `in_stock`, `stockCount`, `updatedAt`
- **`users` collection**:
  - `phone` (Document ID, e.g., `'9822145670'`)
  - `name`, `email`, `location`, `role`, `is_active`, `created_at`
- **`orders` collection**:
  - `orderId` (Document ID)
  - `userId`, `customer_name`, `phone`, `address`, `items`, `total_amount`, `status`, `paymentMethod`, `timestamp`
- **`feedback` collection**:
  - Auto-generated Document ID
  - `name`, `userId`, `rating` (1-5), `comments`, `category`, `persona`, `submittedAt`

#### 🚀 How to Activate Live Firebase in MD Agro Connect:
1. Download `serviceAccountKey.json` from the Firebase Console (*Project Settings ➔ Service accounts ➔ Generate new private key*).
2. Place `serviceAccountKey.json` directly into the `backend/` folder.
   *(Alternatively, set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` in [backend/.env](file:///c:/Users/prati/OneDrive/Desktop/MD%20Agro/backend/.env)).*
3. Run `node backend/sync-to-firestore.js` to automatically push all products and demo users into Firestore!
4. Query `http://localhost:3001/api/firebase/status` to verify live connection state.

---

## 8. Setup, Execution & Testing Guide

### 🚀 Running the Project
Open two terminal windows:

**Terminal 1 — Backend API Server (Port 3001)**:
```powershell
cd "c:\Users\prati\OneDrive\Desktop\MD Agro\backend"
node server.js
```

**Terminal 2 — Frontend Web Server (Port 8080)**:
```powershell
cd "c:\Users\prati\OneDrive\Desktop\MD Agro"
node serve-frontend.js
```

### 🧪 Executing Automated Test Suites
Our codebase includes comprehensive automated tests for JWT verification:

```powershell
# Run JWT unit tests (Token generation, verification, tamper-proofing, role checks)
node backend/test_jwt_auth.js

# Run live endpoint tests (HTTP requests against express server)
node backend/test_jwt_endpoints.js
```

### 🔑 Demo Accounts & Credentials
- **Admin Portal**: [http://localhost:8080/admin.html](http://localhost:8080/admin.html)  
  *Username*: `mdagro` | *Password*: `mdagro6074`
- **Farmer Account**:  
  *Phone*: `9822145670` | *Password*: `farmer123`
- **Demo & Feedback Hub**: Click the floating **🎯 Demo & Feedback Hub** button in the bottom-left corner of any page.

---

## 9. Comprehensive Viva / Project Defense Q&A

Use these 20 curated questions and model answers to ace your project presentation or oral examination!

### Q1: What is the main objective of MD Agro Connect?
**Model Answer**:  
*"MD Agro Connect is an omnichannel agricultural platform built for Indian farmers. It eliminates middlemen and fake agricultural inputs by providing certified seeds and fertilizers, an AI-powered Crop Doctor for real-time pest diagnosis in regional languages, and a transparent order fulfillment tracker, all secured with modern JSON Web Token authentication."*

---

### Q2: What architecture does this application follow?
**Model Answer**:  
*"It follows a decoupled Client-Server RESTful architecture. The frontend is built with high-performance Vanilla JavaScript and CSS3 to ensure low bandwidth consumption for rural users. The backend is an asynchronous Node.js Express API that interacts with a MySQL database and utilizes stateless JWT authentication."*

---

### Q3: What is a JSON Web Token (JWT) and what are its components?
**Model Answer**:  
*"JWT is an open standard (RFC 7519) for securely transmitting information as a compact JSON object. It consists of three parts separated by dots:  
1. **Header**: Contains the algorithm (`HS256`) and token type (`JWT`).  
2. **Payload**: Contains the claims or identity data (user ID, phone, role, expiration timestamp).  
3. **Signature**: Formed by hashing the base64-encoded header and payload with a secret key using HMAC-SHA256."*

---

### Q4: Why did your team choose JWT instead of traditional session cookies?
**Model Answer**:  
*"Traditional sessions are stateful—the server must store session records in memory or a database, which introduces storage bottlenecks and complicates horizontal scaling. JWT is completely stateless; the server simply verifies the cryptographic signature without looking up a session table. Furthermore, JWTs are resilient against Cross-Site Request Forgery (CSRF) and work seamlessly across cross-origin requests and mobile apps."*

---

### Q5: What happens if an attacker modifies the payload of a JWT?
**Model Answer**:  
*"If an attacker tampers with any payload field (for example, attempting to change `"role": "farmer"` to `"role": "admin"`), the cryptographic signature will no longer match the recalculated hash of the altered payload. Our `jwt.verify()` middleware detects this mismatch and immediately returns a `401 Unauthorized` with a `JsonWebTokenError: invalid signature`."*

---

### Q6: Where is the JWT stored on the client side, and how is it sent to the backend?
**Model Answer**:  
*"The token is stored in the browser's `localStorage` (`md_farmer_token` for farmers and `md_admin_token` for admins). When making protected API calls, our frontend retrieves this token and passes it in the standard HTTP request header:  
`Authorization: Bearer <token>`."*

---

### Q7: How does your system differentiate between a regular Farmer and an Admin?
**Model Answer**:  
*"Role-Based Access Control (RBAC) is encoded directly into the JWT payload claim (`role: 'farmer'` or `role: 'admin'`). Our backend features a dedicated middleware, `verifyAdmin`, which first verifies the token validity and then checks if `req.user.role === 'admin'`. If a farmer token is sent to an admin route like `PATCH /api/orders/:id/status`, the server responds with a `403 Forbidden`."*

---

### Q8: What is the lifespan of tokens in your application, and what happens when they expire?
**Model Answer**:  
*"Farmer tokens expire after 7 days (`JWT_EXPIRES_IN=7d`), while administrative tokens expire after 24 hours (`JWT_ADMIN_EXPIRES_IN=24h`). When an expired token is sent, `verifyToken` catches the `TokenExpiredError` and returns `401 Unauthorized`. In our frontend, `adminFetch()` intercepts this 401 response, automatically prompts the administrator that their session has expired, clears `localStorage`, and redirects them to the login screen."*

---

### Q9: Can an unauthorized user create a product or change an order status?
**Model Answer**:  
*"No. All mutating endpoints such as `POST /api/products`, `PUT /api/products/:id`, `PATCH /api/products/:id/stock`, `PATCH /api/orders/:id/status`, and `DELETE /api/orders/:id` are protected by the `verifyAdmin` middleware. Any request lacking a valid admin token is rejected."*

---

### Q10: How does the AI Crop Doctor work on the client side?
**Model Answer**:  
*"The AI Crop Doctor in `app.js` is a smart conversational diagnostic assistant. It parses input keywords (such as cotton, bollworm, fungal rot, fertilizer) in English or Marathi, identifies the probable crop pest or nutrient deficiency, and returns immediate actionable recommendations including recommended fungicides, application dosages, and prevention steps. It also features speech synthesis for voice output."*

---

### Q11: How do you handle regional languages for farmers who don't know English?
**Model Answer**:  
*"We implemented a bilingual dictionary system within `app.js`. When the user clicks the language switcher, the interface dynamically replaces all UI labels, navigation buttons, category names, and placeholder strings with verified Marathi equivalents (मराठी), enabling seamless vernacular accessibility."*

---

### Q12: How does the payment system work without high merchant fees?
**Model Answer**:  
*"For rural transactions, we implemented Dynamic UPI QR Code Generation using standard NPCI UPI Intent URLs (`upi://pay?pa=...&am=...&pn=...`). When an order is placed, a custom QR code is rendered on screen. The farmer scans it with PhonePe, Google Pay, or Paytm and enters their UPI PIN. We also provide a Cash on Delivery (COD) option for farmers without digital banking."*

---

### Q13: What happens if the MySQL database goes offline during a presentation?
**Model Answer**:  
*"We built a Dual-Mode Resilience mechanism in `backend/config/db.js`. If the MySQL connection pool fails to connect, the server logs a warning and automatically falls back to an in-memory mock store populated with realistic catalog items and user accounts. This ensures that demonstrations, tests, and presentations will never crash due to a stopped database service."*

---

### Q14: Why did you use Vanilla JavaScript instead of React or Angular?
**Model Answer**:  
*"Rural users often experience spotty 3G/4G connectivity on low-memory smartphones. Heavy Single Page Application frameworks introduce large JavaScript bundle sizes (often several megabytes) that take seconds to parse and execute. Vanilla JavaScript executes instantly without compilation overhead, maximizes browser compatibility, and delivers sub-second load times."*

---

### Q15: How did you implement customer feedback in this development cycle?
**Model Answer**:  
*"We conducted a structured customer demo with farmers and store administrators, collecting feedback via our built-in Demo & Feedback Hub. Customers requested:  
1. Clearer visual tracking for order delivery.  
2. An interactive in-app feedback modal.  
3. A transparent security inspector to see their authenticated session.  
In response, we implemented a 4-step visual order stepper (`Placed ➔ Confirmed ➔ Dispatched ➔ Delivered`), an in-modal feedback submission system, and the JWT Security Inspector widget."*

---

### Q16: How do you prevent SQL Injection attacks in your backend?
**Model Answer**:  
*"In `backend/config/db.js` and all route controllers, we use parameterized prepared statements provided by `mysql2` (using `?` placeholders) rather than string concatenation. This ensures that user inputs are treated strictly as data literals and can never alter SQL query syntax."*

---

### Q17: What is the purpose of the `optionalToken` middleware?
**Model Answer**:  
*"On e-commerce storefronts, guest farmers should be allowed to place orders without forcing them through a tedious registration process first. The `optionalToken` middleware checks if an `Authorization` header is present. If it is valid, it links the order to that user's profile ID; if no token is present, it allows the order to proceed as a guest transaction without throwing an authentication error."*

---

### Q18: What tests have been implemented to guarantee JWT reliability?
**Model Answer**:  
*"We developed two automated test suites:  
1. `backend/test_jwt_auth.js`: Executes 9 unit tests verifying token signing, extraction, payload claims, expiration handling, and signature tampering prevention.  
2. `backend/test_jwt_endpoints.js`: Executes 8 end-to-end HTTP integration tests against live Express endpoints, verifying that protected routes return 401/403 for unauthorized calls and 200/201 for valid tokens. Both test suites pass 100%."*

---

### Q19: How are environment variables and sensitive keys managed?
**Model Answer**:  
*"We utilize `dotenv` to load sensitive parameters from a local `.env` file, which is excluded from public source control via `.gitignore`. We also supply a sanitized `.env.example` template containing documentation for required variables (`PORT`, `DB_HOST`, `DB_USER`, `JWT_SECRET`, `JWT_EXPIRES_IN`)."*

---

### Q20: What are the future technical enhancements planned for MD Agro Connect?
**Model Answer**:  
*"Our roadmap includes:  
1. **SMS Gateway Integration**: Sending automated Marathi SMS updates for dispatch notifications via Twilio or Fast2SMS.  
2. **JWT Refresh Token Rotation**: Implementing short-lived access tokens (15 mins) paired with HttpOnly refresh tokens for enhanced enterprise session defense.  
3. **PWA (Progressive Web App) Service Worker**: Enabling offline browsing of seed and fertilizer catalogs when farmers are working in remote fields without cellular reception."*

---

## 🎯 Quick Reference Summary for Presentations
- **Project**: MD Agro Connect
- **Key Technical Highlight**: Complete Stateless JSON Web Token (JWT) HMAC-SHA256 Authentication with Role-Based Access Control
- **Backend Port**: `3001`
- **Frontend Port**: `8080`
- **Admin Login**: `mdagro` / `mdagro6074`
- **Farmer Login**: `9822145670` / `farmer123`
- **Live Demo Widget**: Click **🎯 Demo & Feedback Hub** on any page
