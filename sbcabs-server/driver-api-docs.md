# sbCabs Driver API Documentation

## Register Driver

#### Endpoint
`POST /drivers/register`

#### Description
This endpoint registers a new driver.

#### Request
- **URL**: `/drivers/register`
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
    "password": "password123",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

#### Response
- **Success** (Status Code: `201 Created`):
  ```json
  {
    "token": "jwt-token",
    "driver": {
      "_id": "driver-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
      },
      {
        "msg": "Color must be at least 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be at least 1",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```

#### Validation
- `email`: Must be a valid email address.
- `password`: Must be at least 5 characters long.
- `fullname.firstname`: Must be at least 3 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be at least 1.
- `vehicle.vehicleType`: Must be one of `car`, `bike`, or `auto`.

#### Example
##### Request
```bash
curl -X POST http://localhost:3000/drivers/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

##### Response
```json
{
  "token": "jwt-token",
  "driver": {
    "_id": "driver-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Login Driver

#### Endpoint
`POST /drivers/login`

#### Description
This endpoint logs in an existing driver.

#### Request
- **URL**: `/drivers/login`
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
    "driver": {
      "_id": "driver-id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
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
    "message": "Driver not found"
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
curl -X POST http://localhost:3000/drivers/login \
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
  "driver": {
    "_id": "driver-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Get Driver Profile

#### Endpoint
`GET /drivers/profile`

#### Description
This endpoint retrieves the profile of the authenticated driver.

#### Request
- **URL**: `/drivers/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: `Bearer <jwt-token>`

#### Response
- **Success** (Status Code: `200 OK`):
  ```json
  {
    "_id": "driver-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
curl -X GET http://localhost:3000/drivers/profile \
-H "Authorization: Bearer jwt-token"
```

##### Response
```json
{
  "_id": "driver-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Update Driver Profile

#### Endpoint
`POST /drivers/profile`

#### Description
This endpoint updates the profile of the authenticated driver.

#### Request
- **URL**: `/drivers/profile`
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
    "_id": "driver-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
curl -X POST http://localhost:3000/drivers/profile \
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
  "_id": "driver-id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Logout Driver

#### Endpoint
`GET /drivers/logout`

#### Description
This endpoint logs out the authenticated driver.

#### Request
- **URL**: `/drivers/logout`
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
curl -X GET http://localhost:3000/drivers/logout \
-H "Authorization: Bearer jwt-token"
```

##### Response
```json
{
  "message": "Logged out successfully"
}
```
