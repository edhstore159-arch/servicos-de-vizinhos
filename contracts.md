# API Contracts - AlloVoisins Clone

## 1. API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (offreurs)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/demands` - Get user's demands
- `GET /api/users/:id/reviews` - Get user's reviews

### Demands
- `GET /api/demands` - Get all demands (with filters)
- `POST /api/demands` - Create new demand
- `GET /api/demands/:id` - Get demand by ID
- `PUT /api/demands/:id` - Update demand
- `DELETE /api/demands/:id` - Delete demand
- `POST /api/demands/:id/like` - Like a demand
- `POST /api/demands/:id/respond` - Respond to a demand

### Messages
- `GET /api/messages` - Get user's conversations
- `GET /api/messages/:conversationId` - Get messages in conversation
- `POST /api/messages` - Send new message

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/user/:userId` - Get reviews for user

### Categories
- `GET /api/categories` - Get all categories

## 2. Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String (URL),
  location: String,
  phone: String,
  isPremier: Boolean,
  rating: Number,
  reviewCount: Number,
  categories: [String],
  createdAt: Date
}
```

### Demand
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref User),
  title: String,
  description: String,
  category: String,
  budget: String,
  location: String,
  photos: [String],
  likes: Number,
  recommends: Number,
  isPro: Boolean,
  status: String (active/closed),
  createdAt: Date
}
```

### Message
```javascript
{
  _id: ObjectId,
  conversationId: String,
  fromUserId: ObjectId (ref User),
  toUserId: ObjectId (ref User),
  demandId: ObjectId (ref Demand) - optional,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Response (to Demand)
```javascript
{
  _id: ObjectId,
  demandId: ObjectId (ref Demand),
  userId: ObjectId (ref User),
  message: String,
  createdAt: Date
}
```

### Review
```javascript
{
  _id: ObjectId,
  fromUserId: ObjectId (ref User),
  toUserId: ObjectId (ref User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

## 3. Mock Data to Replace

### In mock/data.js:
- `mockUsers` → Will be fetched from `/api/users`
- `mockDemands` → Will be fetched from `/api/demands`
- `mockThematiques` → Will remain static (can be enhanced later)
- `mockCategories` → Will be fetched from `/api/categories`
- `mockMessages` → Will be fetched from `/api/messages`
- `getCurrentUser()` → Will be fetched from `/api/auth/me`

## 4. Frontend-Backend Integration Plan

### Phase 1: Authentication
1. Create AuthContext in frontend
2. Implement login/register pages
3. Store JWT token in localStorage
4. Add axios interceptor for authenticated requests

### Phase 2: Demands Feed
1. Replace mockDemands with API call in Home.jsx
2. Implement like/recommend/respond actions
3. Add real-time updates (optional)

### Phase 3: Create Demand
1. Connect Demande.jsx form to POST /api/demands
2. Handle photo upload (store in MongoDB or cloud storage)
3. Redirect to home after successful creation

### Phase 4: Messages
1. Fetch conversations from API
2. Implement real-time messaging (WebSocket optional)
3. Mark messages as read

### Phase 5: User Profile
1. Fetch user data from API
2. Update profile functionality
3. Display user's demands and reviews

### Phase 6: Offreurs
1. Fetch users with filters
2. Implement search and category filter
3. Contact functionality

## 5. File Upload Strategy

For photos:
- Store base64 in MongoDB (for MVP)
- Later: Use cloud storage (S3, Cloudinary)
- Max 5 photos per demand
- Compress images on frontend before upload

## 6. Authentication Flow

1. User registers → Create user in DB → Return JWT
2. User logs in → Validate credentials → Return JWT
3. Frontend stores JWT in localStorage
4. All API requests include Authorization header
5. Backend validates JWT on protected routes

## 7. Error Handling

- Use consistent error format:
```javascript
{
  error: true,
  message: "Error description",
  code: "ERROR_CODE"
}
```

## 8. Success Responses

- Consistent success format:
```javascript
{
  success: true,
  data: {...},
  message: "Optional success message"
}
```
