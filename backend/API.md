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

### POST /auth/refresh
Obtain a new access token using the refresh token cookie.

**Cookies**
The `refreshToken` HttpOnly cookie must be present (set automatically on login).

**Response** `200 OK`
```json
{
  "accessToken": "<new_jwt_access_token>"
}
```

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Missing or invalid refresh token |

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

### GET /ghost-stories/my
Get all ghost stories created by the authenticated user. **Requires authentication.**

**Headers**
```
Authorization: Bearer <accessToken>
```

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

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Missing or invalid token |

---

### PATCH /ghost-stories/:class/:storyId
Update a ghost story. **Requires authentication. Only the author can edit.**

**Headers**
```
Authorization: Bearer <accessToken>
```

**Path parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| class | string | Ghost class (`A`, `B`, `C`, `D`, `Twilight`) |
| storyId | number | Numeric story ID within the class |

**Request body** (all fields optional)
| Field | Type | Description |
|-------|------|-------------|
| name | string | Name of the ghost story |
| summary | string | Short summary |
| mediumToEnter | string | How to encounter the entity |
| description | string | Full description |

**Response** `200 OK`
```json
{
  "id": "Qterw-A-1",
  "name": "Updated Name",
  "class": "A",
  "summary": "...",
  "mediumToEnter": "...",
  "description": "...",
  "author": "<codename>"
}
```

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Missing or invalid token |
| 403 | Authenticated user is not the author |
| 404 | Ghost story not found |

---

### DELETE /ghost-stories/:class/:storyId
Delete a ghost story and all its associated records. **Requires authentication. Only the author can delete.**

**Headers**
```
Authorization: Bearer <accessToken>
```

**Path parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| class | string | Ghost class (`A`, `B`, `C`, `D`, `Twilight`) |
| storyId | number | Numeric story ID within the class |

**Response** `204 No Content`

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Missing or invalid token |
| 403 | Authenticated user is not the author |
| 404 | Ghost story not found |

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

## Records

### GET /records
Get all records. **Public.**

**Response** `200 OK`
```json
[
  {
    "id": "<record_id>",
    "ghostStory": {
      "id": "Qterw-A-1",
      "name": "Black Cat",
      "class": "A"
    },
    "user": "<codename>",
    "notes": "...",
    "encounteredAt": "2026-04-10T00:00:00.000Z"
  }
]
```

---

### GET /records/my
Get all records created by the authenticated user. **Requires authentication.**

**Headers**
```
Authorization: Bearer <accessToken>
```

**Response** `200 OK`
```json
[
  {
    "id": "<record_id>",
    "ghostStory": {
      "id": "Qterw-A-1",
      "name": "Black Cat",
      "class": "A"
    },
    "user": "<codename>",
    "notes": "...",
    "encounteredAt": "2026-04-10T00:00:00.000Z"
  }
]
```

**Error responses**
| Status | Reason |
|--------|--------|
| 401 | Missing or invalid token |

---

### GET /records/:class/:storyId
Get all records for a specific ghost story by class and story ID. **Public.**

**Path parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| class | string | Ghost class (`A`, `B`, `C`, `D`, `Twilight`) |
| storyId | number | Numeric story ID within the class |

**Example**
```
GET /records/A/1
```

**Response** `200 OK`
```json
[
  {
    "id": "<record_id>",
    "ghostStory": {
      "id": "Qterw-A-1",
      "name": "Black Cat",
      "class": "A"
    },
    "user": "<codename>",
    "notes": "...",
    "encounteredAt": "2026-04-10T00:00:00.000Z"
  }
]
```

**Error responses**
| Status | Reason |
|--------|--------|
| 404 | Ghost story not found |

---

### POST /records
Log a new record for a ghost story. **Requires authentication.**

**Headers**
```
Authorization: Bearer <accessToken>
```

**Request body**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| class | string | yes | Ghost class: `A`, `B`, `C`, `D`, or `Twilight` |
| storyId | number | yes | Numeric story ID within the class |
| notes | string | no | Personal notes about the encounter |

**Example**
```json
{
  "class": "A",
  "storyId": 1,
  "notes": "Encountered near the old bridge at midnight."
}
```

**Response** `201 Created`
```json
{
  "id": "<record_id>",
  "ghostStory": {
    "id": "Qterw-A-1",
    "name": "Black Cat",
    "class": "A"
  },
  "user": "<codename>",
  "notes": "Encountered near the old bridge at midnight.",
  "encounteredAt": "2026-04-10T00:00:00.000Z"
}
```

**Error responses**
| Status | Reason |
|--------|--------|
| 400 | Validation failed |
| 401 | Missing or invalid token |
| 404 | Ghost story not found |

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
