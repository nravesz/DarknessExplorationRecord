# Darkness Exploration Record — API Documentation

Base URL: `http://localhost:3000`

---

## Authentication

Most endpoints are public. The **create ghost story** endpoint requires a valid JWT access token in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Access tokens expire after **15 minutes**. Obtain one via [POST /auth/login](#post-authlogin).

---

## Users

### POST /users
Register a new user.

**Request body**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| email | string | yes | |
| password | string | yes | |
| name | string | yes | |
| codename | string | yes | Must be unique |

**Example**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Agent Carpincho",
  "codename": "carpincho"
}
```

**Response** `201 Created`
```json
{
  "email": "user@example.com",
  "name": "Agent Carpincho",
  "codename": "carpincho"
}
```

---

## Auth

### POST /auth/login
Log in and receive tokens.

**Request body**
| Field | Type | Required |
|-------|------|----------|
| email | string | yes |
| password | string | yes |

**Example**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response** `201 Created`
```json
{
  "accessToken": "<jwt_access_token>",
  "email": "user@example.com",
  "codename": "carpincho"
}
```

The `refreshToken` is set automatically as an `HttpOnly` cookie (`Max-Age: 7 days`).

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Invalid credentials |

---

### POST /auth/logout
Log out and clear the refresh token cookie.

**Response** `200 OK`

No body. The `refreshToken` cookie is cleared.

---

## Ghost Stories

### GET /ghost-stories
Get all ghost stories.

**Response** `200 OK`
```json
[
  {
    "id": "Qterw-A-1",
    "name": "Black Cat",
    "class": "A",
    "summary": "...",
    "mediumToEnter": "...",
    "description": "...",
    "author": "<codename>"
  }
]
```

---

### GET /ghost-stories/:class/:storyId
Get a single ghost story by class and story ID.

**Path parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| class | string | Ghost class (`A`, `B`, `C`, `D`, `Twilight`) |
| storyId | number | Numeric story ID within the class |

**Example**
```
GET /ghost-stories/A/1
```

**Response** `200 OK`
```json
{
  "id": "Qterw-A-1",
  "name": "Black Cat",
  "class": "A",
  "summary": "...",
  "mediumToEnter": "...",
  "description": "...",
  "author": "<codename>"
}
```

---

### POST /ghost-stories
Create a new ghost story. **Requires authentication.**

**Headers**
```
Authorization: Bearer <accessToken>
```

**Request body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Name of the ghost story |
| class | string | yes | Ghost class: `A`, `B`, `C`, `D`, or `Twilight` |
| summary | string | no | Short summary |
| mediumToEnter | string | no | How to encounter the entity |
| description | string | no | Full description |

**Example**
```json
{
  "name": "Black Cat",
  "class": "A",
  "summary": "A ghost story about a strange entity in the shape of a black cat.",
  "mediumToEnter": "Found in the Mermaid Tomb.",
  "description": "..."
}
```

**Response** `201 Created`
```json
{
  "id": "Qterw-A-1",
  "name": "Black Cat",
  "class": "A",
  "summary": "A ghost story about a strange entity in the shape of a black cat.",
  "mediumToEnter": "Found in the Mermaid Tomb.",
  "description": "...",
  "author": "<codename>"
}
```

**Error responses**
| Status | Reason |
|--------|--------|
| 400 | Validation failed (missing required fields or invalid class) |
| 401 | Missing or invalid token |

---

## Ghost Classes

| Class | Description |
|-------|-------------|
| `A` | Class A |
| `B` | Class B |
| `C` | Class C |
| `D` | Class D |
| `Twilight` | Twilight class |

---

## Story ID format

Each ghost story is assigned an ID with the format:

```
Qterw-{class}-{storyId}
```

The `storyId` is an auto-incremented number **per class** (i.e., each class has its own counter starting at 1).
