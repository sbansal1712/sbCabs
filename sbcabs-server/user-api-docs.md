# sbCabs Server

## API Documentation

### Register User

#### Endpoint
`POST /users/register`

#### Description
This endpoint registers a new user.

#### Request
- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response
- **Success** (Status Code: `201 Created`):
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error** (Status Code: `400 Bad Request`):
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email address",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

#### Validation
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.
- `fullname.firstname`: Must be at least 3 characters long.

#### Example
##### Request
```bash
curl -X POST http://localhost:3000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

##### Response
```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Login User

#### Endpoint
`POST /users/login`

#### Description
This endpoint logs in an existing user.

#### Request
- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response
- **Success** (Status Code: `200 OK`):
  ```json
  {
    "token": "jwt-token",
    "user": {
      "_id": "user-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error** (Status Code: `400 Bad Request`):
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email address",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 5 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
- **Error** (Status Code: `404 Not Found`):
  ```json
  {
    "message": "User not found"
  }
  ```
- **Error** (Status Code: `401 Unauthorized`):
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

#### Validation
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.

#### Example
##### Request
```bash
curl -X POST http://localhost:3000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

##### Response
```json
{
  "token": "jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Get User Profile

#### Endpoint
`GET /users/profile`

#### Description
This endpoint retrieves the profile of the authenticated user.

#### Request
- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: `Bearer <jwt-token>`

#### Response
- **Success** (Status Code: `200 OK`):
  ```json
  {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```
- **Error** (Status Code: `401 Unauthorized`):
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example
##### Request
```bash
curl -X GET http://localhost:3000/users/profile \
-H "Authorization: Bearer jwt-token"
```

##### Response
```json
{
  "_id": "user-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Update User Profile

#### Endpoint
`POST /users/profile`

#### Description
This endpoint updates the profile of the authenticated user.

#### Request
- **URL**: `/users/profile`
- **Method**: `POST`
- **Headers**: 
  - `Authorization`: `Bearer <jwt-token>`
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

#### Response
- **Success** (Status Code: `200 OK`):
  ```json
  {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```
- **Error** (Status Code: `401 Unauthorized`):
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example
##### Request
```bash
curl -X POST http://localhost:3000/users/profile \
-H "Authorization: Bearer jwt-token" \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}'
```

##### Response
```json
{
  "_id": "user-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Logout User

#### Endpoint
`GET /users/logout`

#### Description
This endpoint logs out the authenticated user.

#### Request
- **URL**: `/users/logout`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: `Bearer <jwt-token>`

#### Response
- **Success** (Status Code: `200 OK`):
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **Error** (Status Code: `401 Unauthorized`):
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Example
##### Request
```bash
curl -X GET http://localhost:3000/users/logout \
-H "Authorization: Bearer jwt-token"
```

##### Response
```json
{
  "message": "Logged out successfully"
}
```