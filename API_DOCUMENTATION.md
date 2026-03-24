# Institute Website - API Documentation

> Complete backend API reference for mobile (Android/iOS) and frontend developers.
>
> **Version:** 1.0.0
> **Last Updated:** 2026-03-24

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Authentication](#2-authentication)
3. [API Endpoints](#3-api-endpoints)
   - [Auth](#31-auth)
   - [Courses](#32-courses)
   - [Notes](#33-notes)
   - [Tests](#34-tests)
   - [Live Classes](#35-live-classes)
   - [Contact](#36-contact)
   - [Enrollments](#37-enrollments)
   - [Banners](#38-banners)
   - [Dashboard](#39-dashboard)
4. [Data Models](#4-data-models)
5. [Error Codes & Handling](#5-error-codes--handling)
6. [Mobile Development Guide](#6-mobile-development-guide)
7. [Admin API Reference](#7-admin-api-reference)
8. [Database Schema](#8-database-schema)
9. [Deployment Guide](#9-deployment-guide)

---

## 1. Project Overview

### Tech Stack

| Component       | Technology                      |
|-----------------|---------------------------------|
| Language        | Java 21                         |
| Framework       | Spring Boot 3.4                 |
| Database        | PostgreSQL (primary), H2 (dev)  |
| Authentication  | JWT (Bearer Token)              |
| ORM             | Hibernate / Spring Data JPA     |
| Build Tool      | Maven                           |
| Password Hashing | BCrypt                         |

### Base URL

| Environment | URL                              |
|-------------|----------------------------------|
| Local Dev   | `http://localhost:8080/api`      |
| Production  | Configured via environment vars  |

### Universal Response Wrapper

Every API response is wrapped in a standard envelope:

```json
{
  "success": true,
  "message": "Human-readable status message",
  "data": <T>
}
```

- `success` (boolean) -- `true` for 2xx responses, `false` for errors.
- `message` (string) -- Descriptive message about the operation result.
- `data` (T | null) -- The response payload. `null` when there is no data to return.

### Content Type

All requests and responses use `application/json` unless otherwise noted.

### File Upload Limits

- Max file size: 10 MB
- Max request size: 10 MB

---

## 2. Authentication

### Mechanism

The API uses **JWT Bearer tokens** for authentication. Tokens are passed in the `Authorization` HTTP header.

```
Authorization: Bearer <jwt_token>
```

### Token Details

| Property       | Value                                    |
|----------------|------------------------------------------|
| Type           | Bearer                                   |
| Algorithm      | HMAC-SHA (HS256+)                        |
| Expiry         | 24 hours (86,400,000 ms)                 |
| Refresh Expiry | 7 days (604,800,000 ms) -- reserved      |
| Subject Claim  | User's email address                     |
| Custom Claims  | `role` (STUDENT, TEACHER, or ADMIN)      |

### Token Lifecycle

1. **Obtain a token** by calling `POST /api/auth/signup` or `POST /api/auth/login`.
2. **Include the token** in all subsequent requests that require authentication.
3. **Token expires** after 24 hours. The client must re-authenticate (login again) to obtain a new token.
4. There is currently no refresh-token endpoint. The `refresh-expiration-ms` property is reserved for future use.

### How to Store Tokens on Mobile

- **Android:** Use `EncryptedSharedPreferences` or Android Keystore. Never store tokens in plain SharedPreferences.
- **iOS:** Use the iOS Keychain via `SecItemAdd` / `SecItemCopyMatching`. Never store tokens in UserDefaults.

### Public vs. Protected Endpoints

The following endpoints are publicly accessible (no token required):

| Method | Path                  |
|--------|-----------------------|
| POST   | `/api/auth/**`        |
| GET    | `/api/courses`        |
| GET    | `/api/courses/{id}`   |
| GET    | `/api/notes`          |
| GET    | `/api/notes/{id}`     |
| GET    | `/api/tests`          |
| GET    | `/api/tests/{id}`     |
| GET    | `/api/tests/{id}/**`  |
| GET    | `/api/live`           |
| GET    | `/api/live/{id}`      |
| POST   | `/api/contact`        |
| GET    | `/api/banners`        |

All other endpoints require a valid JWT token.

---

## 3. API Endpoints

---

### 3.1 Auth

#### POST `/api/auth/signup`

Register a new user account. New users are assigned the `STUDENT` role by default.

**Auth Required:** No

**Request Body:**

| Field      | Type   | Required | Validation                          |
|------------|--------|----------|-------------------------------------|
| `fullName` | string | Yes      | Must not be blank                   |
| `email`    | string | Yes      | Must not be blank, valid email      |
| `password` | string | Yes      | Must not be blank, min 6 characters |
| `phone`    | string | No       | --                                  |

```json
{
  "fullName": "Rishabh Kumar",
  "email": "rishabh@example.com",
  "password": "secure123",
  "phone": "+919876543210"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "fullName": "Rishabh Kumar",
    "email": "rishabh@example.com",
    "role": "STUDENT"
  }
}
```

**Error Responses:**

| Status | Condition                        | Message                                |
|--------|----------------------------------|----------------------------------------|
| 400    | Email already registered         | `"Email address is already registered"` |
| 400    | Validation failure               | `"Validation failed"` + field errors   |

**Mobile Notes:**
- Store the returned `token` securely immediately after signup.
- The `role` field can be used to conditionally show/hide admin UI.

---

#### POST `/api/auth/login`

Authenticate an existing user and receive a JWT token.

**Auth Required:** No

**Request Body:**

| Field      | Type   | Required | Validation                     |
|------------|--------|----------|--------------------------------|
| `email`    | string | Yes      | Must not be blank, valid email |
| `password` | string | Yes      | Must not be blank              |

```json
{
  "email": "rishabh@example.com",
  "password": "secure123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "fullName": "Rishabh Kumar",
    "email": "rishabh@example.com",
    "role": "STUDENT"
  }
}
```

**Error Responses:**

| Status | Condition              | Message                         |
|--------|------------------------|---------------------------------|
| 400    | Wrong email/password   | `"Invalid email or password"`   |
| 400    | Validation failure     | `"Validation failed"`           |

---

#### POST `/api/auth/forgot-password`

Request a password reset. Currently logs the request server-side (email integration pending).

**Auth Required:** No

**Request Body:**

| Field   | Type   | Required | Validation                     |
|---------|--------|----------|--------------------------------|
| `email` | string | Yes      | Must not be blank, valid email |

```json
{
  "email": "rishabh@example.com"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password reset link sent to your email",
  "data": "rishabh@example.com"
}
```

**Error Responses:**

| Status | Condition           | Message                                       |
|--------|---------------------|-----------------------------------------------|
| 400    | Email not found     | `"No account found with this email address"`  |

**Mobile Notes:**
- Show a success message to the user regardless (for security, do not reveal whether the email exists to untrusted contexts). However, this endpoint currently returns a 400 if the email is not found -- consider handling gracefully on the client side.

---

### 3.2 Courses

#### GET `/api/courses`

Fetch all published courses. Supports optional filtering by category or search query.

**Auth Required:** No

**Query Parameters:**

| Parameter  | Type   | Required | Description                                           |
|------------|--------|----------|-------------------------------------------------------|
| `category` | string | No       | Filter by exact category name                         |
| `query`    | string | No       | Search in title and category (case-insensitive)       |

If neither parameter is provided, returns all published courses. If `category` is provided, it takes precedence over `query`.

**Success Response (200):**

```json
{
  "success": true,
  "message": "Courses fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Complete Physics for JEE",
      "description": "Comprehensive physics course...",
      "category": "JEE",
      "instructorName": "Dr. Sharma",
      "rating": 4.5,
      "price": 2999.0,
      "originalPrice": 4999.0,
      "thumbnail": "https://example.com/physics.jpg",
      "tag": "Bestseller",
      "duration": "6 months",
      "level": "Advanced",
      "language": "Hindi",
      "totalStudents": 1250,
      "syllabus": "Module 1: Mechanics\nModule 2: Thermodynamics...",
      "features": "Live doubt sessions, Weekly tests...",
      "createdAt": "2026-01-15T10:30:00"
    }
  ]
}
```

---

#### GET `/api/courses/{id}`

Fetch a single course by ID.

**Auth Required:** No

**Path Parameters:**

| Parameter | Type | Description     |
|-----------|------|-----------------|
| `id`      | Long | The course ID   |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Course fetched successfully",
  "data": {
    "id": 1,
    "title": "Complete Physics for JEE",
    "description": "...",
    "category": "JEE",
    "instructorName": "Dr. Sharma",
    "rating": 4.5,
    "price": 2999.0,
    "originalPrice": 4999.0,
    "thumbnail": "https://example.com/physics.jpg",
    "tag": "Bestseller",
    "duration": "6 months",
    "level": "Advanced",
    "language": "Hindi",
    "totalStudents": 1250,
    "syllabus": "...",
    "features": "...",
    "createdAt": "2026-01-15T10:30:00"
  }
}
```

**Error Responses:**

| Status | Condition       | Message                               |
|--------|-----------------|---------------------------------------|
| 404    | ID not found    | `"Course not found with id: {id}"`    |

---

#### POST `/api/courses`

Create a new course. The authenticated user becomes the instructor.

**Auth Required:** Yes (ADMIN/TEACHER)

**Request Body:**

| Field           | Type    | Required | Validation         |
|-----------------|---------|----------|--------------------|
| `title`         | string  | Yes      | Must not be blank  |
| `description`   | string  | No       | --                 |
| `category`      | string  | No       | --                 |
| `price`         | Double  | No       | --                 |
| `originalPrice` | Double  | No       | --                 |
| `thumbnail`     | string  | No       | URL to image       |
| `tag`           | string  | No       | e.g. "Bestseller"  |
| `duration`      | string  | No       | e.g. "6 months"    |
| `level`         | string  | No       | e.g. "Beginner"    |
| `language`      | string  | No       | e.g. "Hindi"       |
| `syllabus`      | string  | No       | Text/HTML content  |
| `features`      | string  | No       | Text/HTML content  |
| `published`     | boolean | No       | Default: `false`   |

```json
{
  "title": "Complete Chemistry for NEET",
  "description": "Master chemistry for NEET with this course.",
  "category": "NEET",
  "price": 1999.0,
  "originalPrice": 3999.0,
  "thumbnail": "https://example.com/chemistry.jpg",
  "tag": "New",
  "duration": "4 months",
  "level": "Intermediate",
  "language": "English",
  "syllabus": "Organic Chemistry\nInorganic Chemistry\nPhysical Chemistry",
  "features": "100+ hours of video, Practice sets",
  "published": true
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Course created successfully",
  "data": { /* CourseResponse object */ }
}
```

---

#### PUT `/api/courses/{id}`

Update an existing course.

**Auth Required:** Yes (ADMIN/TEACHER)

**Path Parameters:**

| Parameter | Type | Description   |
|-----------|------|---------------|
| `id`      | Long | The course ID |

**Request Body:** Same as POST `/api/courses`.

**Success Response (200):**

```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": { /* CourseResponse object */ }
}
```

**Error Responses:**

| Status | Condition    | Message                              |
|--------|--------------|--------------------------------------|
| 404    | ID not found | `"Course not found with id: {id}"`   |

---

#### DELETE `/api/courses/{id}`

Delete a course.

**Auth Required:** Yes (ADMIN/TEACHER)

**Path Parameters:**

| Parameter | Type | Description   |
|-----------|------|---------------|
| `id`      | Long | The course ID |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": null
}
```

**Error Responses:**

| Status | Condition    | Message                              |
|--------|--------------|--------------------------------------|
| 404    | ID not found | `"Course not found with id: {id}"`   |

---

### 3.3 Notes

#### GET `/api/notes`

Fetch all notes. Optionally filter by subject.

**Auth Required:** No

**Query Parameters:**

| Parameter | Type   | Required | Description               |
|-----------|--------|----------|---------------------------|
| `subject` | string | No       | Filter by exact subject   |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Notes fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Mechanics Full Notes",
      "description": "Complete notes covering Newton's laws...",
      "subject": "Physics",
      "chapter": "Mechanics",
      "fileUrl": "https://example.com/files/mechanics.pdf",
      "thumbnailUrl": "https://example.com/thumbs/mechanics.jpg",
      "pages": 45,
      "downloads": 320,
      "course": { /* Course object or null */ },
      "createdAt": "2026-02-10T14:00:00"
    }
  ]
}
```

---

#### GET `/api/notes/{id}`

Fetch a single note by ID.

**Auth Required:** No

**Path Parameters:**

| Parameter | Type | Description   |
|-----------|------|---------------|
| `id`      | Long | The note ID   |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Note fetched successfully",
  "data": {
    "id": 1,
    "title": "Mechanics Full Notes",
    "description": "...",
    "subject": "Physics",
    "chapter": "Mechanics",
    "fileUrl": "https://example.com/files/mechanics.pdf",
    "thumbnailUrl": "https://example.com/thumbs/mechanics.jpg",
    "pages": 45,
    "downloads": 320,
    "course": null,
    "createdAt": "2026-02-10T14:00:00"
  }
}
```

**Error Responses:**

| Status | Condition    | Message                            |
|--------|--------------|------------------------------------|
| 404    | ID not found | `"Note not found with id: {id}"`   |

---

#### POST `/api/notes`

Create a new note.

**Auth Required:** Yes (ADMIN/TEACHER)

**Request Body:**

| Field          | Type    | Required | Description                    |
|----------------|---------|----------|--------------------------------|
| `title`        | string  | Yes      | Note title (not blank)         |
| `description`  | string  | No       | Short description              |
| `subject`      | string  | No       | Subject name                   |
| `chapter`      | string  | No       | Chapter name                   |
| `fileUrl`      | string  | No       | URL to the downloadable file   |
| `thumbnailUrl` | string  | No       | Thumbnail image URL            |
| `pages`        | int     | No       | Number of pages (default: 0)   |
| `downloads`    | int     | No       | Download count (default: 0)    |
| `course`       | object  | No       | Associated Course (by ID)      |

```json
{
  "title": "Organic Chemistry Notes",
  "description": "IUPAC naming, reactions, mechanisms",
  "subject": "Chemistry",
  "chapter": "Organic Chemistry",
  "fileUrl": "https://example.com/files/organic.pdf",
  "thumbnailUrl": "https://example.com/thumbs/organic.jpg",
  "pages": 60
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Note created successfully",
  "data": { /* Note object */ }
}
```

---

#### DELETE `/api/notes/{id}`

Delete a note.

**Auth Required:** Yes (ADMIN/TEACHER)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id`      | Long | The note ID |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": null
}
```

**Error Responses:**

| Status | Condition    | Message                            |
|--------|--------------|------------------------------------|
| 404    | ID not found | `"Note not found with id: {id}"`   |

---

### 3.4 Tests

#### GET `/api/tests`

Fetch all test series.

**Auth Required:** No

**Success Response (200):**

```json
{
  "success": true,
  "message": "Test series fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "JEE Mains Mock Test 1",
      "description": "Full-length JEE Mains simulation",
      "subject": "Physics",
      "totalQuestions": 30,
      "duration": 60,
      "maxMarks": 120,
      "price": 99.0,
      "free": false,
      "attempts": 3,
      "createdAt": "2026-01-20T09:00:00"
    }
  ]
}
```

---

#### GET `/api/tests/{id}`

Fetch a single test series by ID.

**Auth Required:** No

**Path Parameters:**

| Parameter | Type | Description        |
|-----------|------|--------------------|
| `id`      | Long | The test series ID |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Test series fetched successfully",
  "data": {
    "id": 1,
    "title": "JEE Mains Mock Test 1",
    "description": "...",
    "subject": "Physics",
    "totalQuestions": 30,
    "duration": 60,
    "maxMarks": 120,
    "price": 99.0,
    "free": false,
    "attempts": 3,
    "createdAt": "2026-01-20T09:00:00"
  }
}
```

**Error Responses:**

| Status | Condition    | Message                                    |
|--------|--------------|---------------------------------------------|
| 404    | ID not found | `"Test series not found with id: {id}"`     |

---

#### GET `/api/tests/{id}/questions`

Fetch all questions for a specific test series.

**Auth Required:** No

**Path Parameters:**

| Parameter | Type | Description        |
|-----------|------|--------------------|
| `id`      | Long | The test series ID |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Questions fetched successfully",
  "data": [
    {
      "id": 1,
      "testSeries": { "id": 1, "title": "..." },
      "questionText": "A ball is thrown vertically upward with velocity 20 m/s. What is the maximum height?",
      "optionA": "10 m",
      "optionB": "20 m",
      "optionC": "30 m",
      "optionD": "40 m",
      "correctOption": "B",
      "explanation": "Using v^2 = u^2 - 2gh, h = u^2/2g = 400/20 = 20m",
      "marks": 4,
      "negativeMarks": 1.0
    }
  ]
}
```

**Mobile Notes:**
- On the test-taking screen, hide the `correctOption` and `explanation` fields from the user. Only reveal them after submission or in review mode.
- The `correctOption` is a single character: `'A'`, `'B'`, `'C'`, or `'D'`.

---

#### POST `/api/tests/{id}/submit`

Submit answers for a test. The server calculates the score, applies negative marking, and saves the attempt.

**Auth Required:** Yes

**Path Parameters:**

| Parameter | Type | Description        |
|-----------|------|--------------------|
| `id`      | Long | The test series ID |

**Request Body:**

| Field     | Type                   | Required | Description                                 |
|-----------|------------------------|----------|---------------------------------------------|
| `answers` | Map<Long, Character>   | Yes      | Question ID to selected option ('A'-'D')    |

```json
{
  "answers": {
    "1": "B",
    "2": "A",
    "3": "C",
    "5": "D"
  }
}
```

Questions not included in the map are counted as unanswered (no penalty, no marks).

**Success Response (200):**

```json
{
  "success": true,
  "message": "Test submitted successfully",
  "data": {
    "attemptId": 42,
    "score": 15,
    "totalMarks": 120,
    "correct": 5,
    "wrong": 2,
    "unanswered": 23,
    "timeTaken": 0,
    "percentage": 12.5
  }
}
```

**Scoring Logic:**
- Correct answer: `+marks` (per question, default 1)
- Wrong answer: `-negativeMarks` (per question, default 0.0)
- Unanswered: no change
- `percentage = (score * 100.0) / totalMarks`

**Error Responses:**

| Status | Condition            | Message                                   |
|--------|----------------------|-------------------------------------------|
| 401    | No/invalid token     | Unauthorized                              |
| 404    | Test series not found| `"Test series not found with id: {id}"`   |

---

#### POST `/api/tests`

Create a new test series.

**Auth Required:** Yes (ADMIN/TEACHER)

**Request Body:**

| Field            | Type    | Required | Description                          |
|------------------|---------|----------|--------------------------------------|
| `title`          | string  | Yes      | Test series title (not blank)        |
| `description`    | string  | No       | Description                          |
| `subject`        | string  | No       | Subject name                         |
| `totalQuestions`  | int     | No       | Auto-updated when questions added    |
| `duration`       | int     | No       | Duration in minutes                  |
| `maxMarks`       | int     | No       | Maximum possible marks               |
| `price`          | Double  | No       | Price (null or 0 for free)           |
| `free`           | boolean | No       | Default: `false`                     |
| `attempts`       | int     | No       | Max allowed attempts (default: 1)    |

```json
{
  "title": "NEET Biology Test 3",
  "description": "Genetics and Evolution",
  "subject": "Biology",
  "duration": 45,
  "maxMarks": 180,
  "price": 49.0,
  "free": false,
  "attempts": 2
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Test series created successfully",
  "data": { /* TestSeries object */ }
}
```

---

#### POST `/api/tests/{id}/questions`

Add a question to an existing test series. Automatically increments the test's `totalQuestions` count.

**Auth Required:** Yes (ADMIN/TEACHER)

**Path Parameters:**

| Parameter | Type | Description        |
|-----------|------|--------------------|
| `id`      | Long | The test series ID |

**Request Body:**

| Field           | Type   | Required | Validation                         |
|-----------------|--------|----------|------------------------------------|
| `questionText`  | string | Yes      | Must not be blank                  |
| `optionA`       | string | Yes      | Must not be blank                  |
| `optionB`       | string | Yes      | Must not be blank                  |
| `optionC`       | string | Yes      | Must not be blank                  |
| `optionD`       | string | Yes      | Must not be blank                  |
| `correctOption` | char   | Yes      | One of: 'A', 'B', 'C', 'D'        |
| `explanation`   | string | No       | Explanation of the correct answer  |
| `marks`         | int    | No       | Marks for correct answer (default: 1) |
| `negativeMarks` | double | No       | Penalty for wrong answer (default: 0.0) |

```json
{
  "questionText": "Which organelle is known as the powerhouse of the cell?",
  "optionA": "Nucleus",
  "optionB": "Mitochondria",
  "optionC": "Ribosome",
  "optionD": "Golgi apparatus",
  "correctOption": "B",
  "explanation": "Mitochondria generate most of the cell's ATP through oxidative phosphorylation.",
  "marks": 4,
  "negativeMarks": 1.0
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Question added successfully",
  "data": { /* TestQuestion object */ }
}
```

**Error Responses:**

| Status | Condition             | Message                                   |
|--------|-----------------------|-------------------------------------------|
| 404    | Test series not found | `"Test series not found with id: {id}"`   |

---

### 3.5 Live Classes

#### GET `/api/live`

Fetch all live classes. Optionally filter to upcoming classes only.

**Auth Required:** No

**Query Parameters:**

| Parameter  | Type    | Required | Description                                     |
|------------|---------|----------|-------------------------------------------------|
| `upcoming` | boolean | No       | If `true`, returns only classes scheduled in the future, sorted by `scheduledAt` ascending |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Live classes fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "Doubt Clearing Session - Mechanics",
      "description": "Live Q&A on Newton's laws and friction",
      "instructor": {
        "id": 2,
        "fullName": "Dr. Sharma",
        "email": "sharma@institute.com",
        "role": "TEACHER"
      },
      "course": { "id": 1, "title": "Complete Physics for JEE" },
      "scheduledAt": "2026-03-25T18:00:00",
      "duration": 60,
      "streamUrl": "https://meet.example.com/abc123",
      "thumbnailUrl": "https://example.com/thumbs/live1.jpg",
      "status": "UPCOMING",
      "maxStudents": 500,
      "createdAt": "2026-03-20T10:00:00"
    }
  ]
}
```

**Status Enum Values:** `UPCOMING`, `LIVE`, `COMPLETED`

---

#### GET `/api/live/{id}`

Fetch a single live class by ID.

**Auth Required:** No

**Path Parameters:**

| Parameter | Type | Description         |
|-----------|------|---------------------|
| `id`      | Long | The live class ID   |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Live class fetched successfully",
  "data": { /* LiveClass object */ }
}
```

**Error Responses:**

| Status | Condition    | Message                                   |
|--------|--------------|-------------------------------------------|
| 404    | ID not found | `"Live class not found with id: {id}"`    |

---

#### POST `/api/live`

Create a new live class. The authenticated user is set as the instructor.

**Auth Required:** Yes (ADMIN/TEACHER)

**Request Body:**

| Field          | Type     | Required | Description                        |
|----------------|----------|----------|------------------------------------|
| `title`        | string   | Yes      | Class title (not blank)            |
| `description`  | string   | No       | Description                        |
| `course`       | object   | No       | Associated course `{ "id": 1 }`   |
| `scheduledAt`  | datetime | Yes      | ISO 8601 format                    |
| `duration`     | int      | No       | Duration in minutes                |
| `streamUrl`    | string   | No       | URL for the live stream            |
| `thumbnailUrl` | string   | No       | Thumbnail image URL                |
| `status`       | string   | No       | Default: `UPCOMING`                |
| `maxStudents`  | int      | No       | Maximum student capacity           |

```json
{
  "title": "Live Doubt Session - Organic Chemistry",
  "description": "Covering reaction mechanisms",
  "scheduledAt": "2026-04-01T17:00:00",
  "duration": 90,
  "streamUrl": "https://meet.example.com/chem-live",
  "maxStudents": 300
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Live class created successfully",
  "data": { /* LiveClass object */ }
}
```

---

#### PUT `/api/live/{id}/status`

Update the status of a live class (e.g., transition from UPCOMING to LIVE to COMPLETED).

**Auth Required:** Yes (ADMIN/TEACHER)

**Path Parameters:**

| Parameter | Type | Description       |
|-----------|------|-------------------|
| `id`      | Long | The live class ID |

**Query Parameters:**

| Parameter | Type   | Required | Description                             |
|-----------|--------|----------|-----------------------------------------|
| `status`  | string | Yes      | One of: `UPCOMING`, `LIVE`, `COMPLETED` |

**Example:** `PUT /api/live/1/status?status=LIVE`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Live class status updated successfully",
  "data": { /* LiveClass object with updated status */ }
}
```

**Error Responses:**

| Status | Condition          | Message                                         |
|--------|--------------------|-------------------------------------------------|
| 404    | ID not found       | `"Live class not found with id: {id}"`          |
| 400    | Invalid status     | `IllegalArgumentException` (invalid enum value) |

---

### 3.6 Contact

#### POST `/api/contact`

Submit a contact/inquiry message. Does not require authentication.

**Auth Required:** No

**Request Body:**

| Field     | Type   | Required | Validation                     |
|-----------|--------|----------|--------------------------------|
| `name`    | string | Yes      | Must not be blank              |
| `email`   | string | Yes      | Must not be blank, valid email |
| `phone`   | string | No       | --                             |
| `subject` | string | Yes      | Must not be blank              |
| `message` | string | Yes      | Must not be blank              |

```json
{
  "name": "Amit Verma",
  "email": "amit@example.com",
  "phone": "+919876543210",
  "subject": "Course Inquiry",
  "message": "I want to know more about the JEE preparation course."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 10,
    "name": "Amit Verma",
    "email": "amit@example.com",
    "phone": "+919876543210",
    "subject": "Course Inquiry",
    "message": "I want to know more about the JEE preparation course.",
    "read": false,
    "createdAt": "2026-03-24T12:00:00"
  }
}
```

---

#### GET `/api/contact`

Fetch all contact messages.

**Auth Required:** Yes (ADMIN)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Messages fetched successfully",
  "data": [ /* Array of ContactMessage objects */ ]
}
```

---

#### GET `/api/contact/unread`

Fetch all unread contact messages.

**Auth Required:** Yes (ADMIN)

**Success Response (200):**

```json
{
  "success": true,
  "message": "Unread messages fetched successfully",
  "data": [ /* Array of ContactMessage objects where read=false */ ]
}
```

---

#### PUT `/api/contact/{id}/read`

Mark a contact message as read.

**Auth Required:** Yes (ADMIN)

**Path Parameters:**

| Parameter | Type | Description          |
|-----------|------|----------------------|
| `id`      | Long | The message ID       |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Message marked as read",
  "data": null
}
```

---

### 3.7 Enrollments

#### POST `/api/enrollments`

Enroll the authenticated user in a course after payment.

**Auth Required:** Yes

**Query Parameters:**

| Parameter   | Type   | Required | Description                    |
|-------------|--------|----------|--------------------------------|
| `courseId`   | Long   | Yes      | ID of the course to enroll in  |
| `paymentId` | string | Yes      | Payment gateway transaction ID |
| `amount`    | Double | Yes      | Amount paid                    |

**Example:** `POST /api/enrollments?courseId=1&paymentId=pay_ABC123&amount=2999.0`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Enrolled successfully",
  "data": {
    "id": 5,
    "user": { "id": 1, "fullName": "Rishabh Kumar", "email": "rishabh@example.com" },
    "course": { "id": 1, "title": "Complete Physics for JEE" },
    "enrolledAt": "2026-03-24T15:30:00",
    "paymentId": "pay_ABC123",
    "amount": 2999.0,
    "status": "ACTIVE"
  }
}
```

**Error Responses:**

| Status | Condition          | Message                                        |
|--------|--------------------|-------------------------------------------------|
| 400    | Already enrolled   | `"You are already enrolled in this course"`     |
| 404    | Course not found   | `"Course not found with id: {id}"`              |
| 401    | No/invalid token   | Unauthorized                                    |

**Mobile Notes:**
- Integrate with a payment gateway (e.g., Razorpay, Stripe) first. After successful payment, call this endpoint with the returned `paymentId`.
- The server automatically increments the course's `totalStudents` count.

**Status Enum Values:** `ACTIVE`, `EXPIRED`, `CANCELLED`

---

#### GET `/api/enrollments`

Fetch all enrollments for the authenticated user.

**Auth Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "message": "Enrollments fetched successfully",
  "data": [
    {
      "id": 5,
      "user": { /* User object */ },
      "course": { /* Course object */ },
      "enrolledAt": "2026-03-24T15:30:00",
      "paymentId": "pay_ABC123",
      "amount": 2999.0,
      "status": "ACTIVE"
    }
  ]
}
```

---

#### GET `/api/enrollments/check`

Check whether the authenticated user is enrolled in a specific course.

**Auth Required:** Yes

**Query Parameters:**

| Parameter  | Type | Required | Description                     |
|------------|------|----------|---------------------------------|
| `courseId`  | Long | Yes      | ID of the course to check       |

**Example:** `GET /api/enrollments/check?courseId=1`

**Success Response (200):**

```json
{
  "success": true,
  "message": "Enrollment check completed",
  "data": true
}
```

The `data` field is `true` if enrolled, `false` if not.

**Mobile Notes:**
- Call this endpoint when loading a course detail screen to determine whether to show "Enroll Now" or "Continue Learning" buttons.

---

### 3.8 Banners

#### GET `/api/banners`

Fetch all active banners, ordered by `displayOrder` ascending.

**Auth Required:** No

**Success Response (200):**

```json
{
  "success": true,
  "message": "Banners fetched successfully",
  "data": [
    {
      "id": 1,
      "title": "New Batch Starting!",
      "subtitle": "JEE 2027 batch enrollments open now",
      "imageUrl": "https://example.com/banners/banner1.jpg",
      "linkUrl": "/courses/1",
      "active": true,
      "displayOrder": 0,
      "createdAt": "2026-03-01T08:00:00"
    }
  ]
}
```

**Mobile Notes:**
- Use this for home screen carousels/sliders.
- The `linkUrl` may be a relative path or full URL. Handle deep linking accordingly.
- Banners are pre-sorted by `displayOrder` -- display them in the order returned.

---

### 3.9 Dashboard

#### GET `/api/dashboard/stats`

Fetch aggregate statistics for the admin dashboard.

**Auth Required:** Yes (ADMIN) -- endpoint requires authentication per security config.

**Success Response (200):**

```json
{
  "success": true,
  "message": "Dashboard stats fetched successfully",
  "data": {
    "totalStudents": 1500,
    "totalCourses": 25,
    "totalTests": 40,
    "totalLiveClasses": 12
  }
}
```

**Field Types:**

| Field              | Type | Description                                |
|--------------------|------|--------------------------------------------|
| `totalStudents`    | long | Count of users with role `STUDENT`         |
| `totalCourses`     | long | Total number of courses                    |
| `totalTests`       | long | Total number of test series                |
| `totalLiveClasses` | long | Total number of live classes               |

---

## 4. Data Models

### User

| Field          | Type          | Nullable | Notes                          |
|----------------|---------------|----------|--------------------------------|
| `id`           | Long          | No       | Auto-generated (PK)            |
| `fullName`     | String        | No       |                                |
| `email`        | String        | No       | Unique                         |
| `password`     | String        | No       | BCrypt hashed (never returned) |
| `phone`        | String        | Yes      |                                |
| `role`         | Enum          | No       | `STUDENT`, `TEACHER`, `ADMIN`  |
| `profileImage` | String        | Yes      | URL to profile image           |
| `enabled`      | boolean       | No       | Default: `true`                |
| `createdAt`    | LocalDateTime | No       | Auto-set on creation           |
| `updatedAt`    | LocalDateTime | Yes      | Auto-set on update             |

### Course

| Field           | Type          | Nullable | Notes                           |
|-----------------|---------------|----------|---------------------------------|
| `id`            | Long          | No       | Auto-generated (PK)             |
| `title`         | String        | No       |                                 |
| `description`   | String (TEXT) | Yes      |                                 |
| `category`      | String        | Yes      |                                 |
| `instructor`    | User (FK)     | Yes      | ManyToOne -> `users.id`         |
| `rating`        | Double        | Yes      |                                 |
| `price`         | Double        | Yes      |                                 |
| `originalPrice` | Double        | Yes      |                                 |
| `thumbnail`     | String        | Yes      | Image URL                       |
| `tag`           | String        | Yes      | e.g., "Bestseller", "New"       |
| `duration`      | String        | Yes      | e.g., "6 months"                |
| `level`         | String        | Yes      | e.g., "Beginner", "Advanced"    |
| `language`      | String        | Yes      |                                 |
| `totalStudents` | int           | No       | Default: `0`                    |
| `syllabus`      | String (TEXT) | Yes      |                                 |
| `features`      | String (TEXT) | Yes      |                                 |
| `published`     | boolean       | No       | Default: `false`                |
| `createdAt`     | LocalDateTime | No       | Auto-set on creation            |
| `updatedAt`     | LocalDateTime | Yes      | Auto-set on update              |

### Note

| Field          | Type          | Nullable | Notes                      |
|----------------|---------------|----------|----------------------------|
| `id`           | Long          | No       | Auto-generated (PK)        |
| `title`        | String        | No       |                            |
| `description`  | String        | Yes      |                            |
| `subject`      | String        | Yes      |                            |
| `chapter`      | String        | Yes      |                            |
| `fileUrl`      | String        | Yes      | URL to downloadable file   |
| `thumbnailUrl` | String        | Yes      | Thumbnail image URL        |
| `pages`        | int           | No       | Default: `0`               |
| `downloads`    | int           | No       | Default: `0`               |
| `course`       | Course (FK)   | Yes      | ManyToOne -> `courses.id`  |
| `createdAt`    | LocalDateTime | No       | Auto-set on creation       |

### TestSeries

| Field            | Type          | Nullable | Notes                   |
|------------------|---------------|----------|-------------------------|
| `id`             | Long          | No       | Auto-generated (PK)     |
| `title`          | String        | No       |                         |
| `description`    | String        | Yes      |                         |
| `subject`        | String        | Yes      |                         |
| `totalQuestions`  | int           | No       | Default: `0`, auto-updated |
| `duration`       | int           | No       | In minutes              |
| `maxMarks`       | int           | No       |                         |
| `price`          | Double        | Yes      |                         |
| `free`           | boolean       | No       | Default: `false`        |
| `attempts`       | int           | No       | Default: `1`            |
| `createdAt`      | LocalDateTime | No       | Auto-set on creation    |

### TestQuestion

| Field           | Type           | Nullable | Notes                           |
|-----------------|----------------|----------|---------------------------------|
| `id`            | Long           | No       | Auto-generated (PK)             |
| `testSeries`    | TestSeries (FK)| No       | ManyToOne -> `test_series.id`   |
| `questionText`  | String (TEXT)  | No       |                                 |
| `optionA`       | String         | No       |                                 |
| `optionB`       | String         | No       |                                 |
| `optionC`       | String         | No       |                                 |
| `optionD`       | String         | No       |                                 |
| `correctOption` | char           | No       | 'A', 'B', 'C', or 'D'          |
| `explanation`   | String (TEXT)  | Yes      |                                 |
| `marks`         | int            | No       | Default: `1`                    |
| `negativeMarks` | double         | No       | Default: `0.0`                  |

### TestAttempt

| Field        | Type           | Nullable | Notes                          |
|--------------|----------------|----------|--------------------------------|
| `id`         | Long           | No       | Auto-generated (PK)            |
| `user`       | User (FK)      | No       | ManyToOne -> `users.id`        |
| `testSeries` | TestSeries (FK)| No       | ManyToOne -> `test_series.id`  |
| `score`      | int            | No       |                                |
| `totalMarks` | int            | No       |                                |
| `timeTaken`  | int            | No       | In seconds                     |
| `answers`    | String (TEXT)  | Yes      | Serialized answer map          |
| `attemptedAt`| LocalDateTime  | No       | Auto-set on creation           |

### LiveClass

| Field          | Type          | Nullable | Notes                                 |
|----------------|---------------|----------|---------------------------------------|
| `id`           | Long          | No       | Auto-generated (PK)                   |
| `title`        | String        | No       |                                       |
| `description`  | String        | Yes      |                                       |
| `instructor`   | User (FK)     | No       | ManyToOne -> `users.id`               |
| `course`       | Course (FK)   | Yes      | ManyToOne -> `courses.id`             |
| `scheduledAt`  | LocalDateTime | No       | When the class is scheduled           |
| `duration`     | int           | No       | In minutes                            |
| `streamUrl`    | String        | Yes      | URL for joining the stream            |
| `thumbnailUrl` | String        | Yes      |                                       |
| `status`       | Enum          | No       | `UPCOMING`, `LIVE`, `COMPLETED`       |
| `maxStudents`  | Integer       | Yes      | Max capacity (null = unlimited)       |
| `createdAt`    | LocalDateTime | No       | Auto-set on creation                  |

### Enrollment

| Field       | Type          | Nullable | Notes                                  |
|-------------|---------------|----------|----------------------------------------|
| `id`        | Long          | No       | Auto-generated (PK)                    |
| `user`      | User (FK)     | No       | ManyToOne -> `users.id`                |
| `course`    | Course (FK)   | No       | ManyToOne -> `courses.id`              |
| `enrolledAt`| LocalDateTime | No       | Auto-set on creation                   |
| `paymentId` | String        | Yes      | Payment gateway transaction ID         |
| `amount`    | Double        | Yes      | Amount paid                            |
| `status`    | Enum          | No       | `ACTIVE`, `EXPIRED`, `CANCELLED`       |

### ContactMessage

| Field       | Type          | Nullable | Notes                  |
|-------------|---------------|----------|------------------------|
| `id`        | Long          | No       | Auto-generated (PK)    |
| `name`      | String        | No       |                        |
| `email`     | String        | No       |                        |
| `phone`     | String        | Yes      |                        |
| `subject`   | String        | Yes      |                        |
| `message`   | String (TEXT) | No       |                        |
| `read`      | boolean       | No       | Default: `false`       |
| `createdAt` | LocalDateTime | No       | Auto-set on creation   |

### Banner

| Field          | Type          | Nullable | Notes                  |
|----------------|---------------|----------|------------------------|
| `id`           | Long          | No       | Auto-generated (PK)    |
| `title`        | String        | No       |                        |
| `subtitle`     | String        | Yes      |                        |
| `imageUrl`     | String        | Yes      | Banner image URL       |
| `linkUrl`      | String        | Yes      | Navigation target      |
| `active`       | boolean       | No       | Default: `true`        |
| `displayOrder` | int           | No       | Default: `0`           |
| `createdAt`    | LocalDateTime | No       | Auto-set on creation   |

---

## 5. Error Codes & Handling

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": ["field1: error message", "field2: error message"]
}
```

The `errors` array is populated only for validation errors (400). For other error types, it is an empty array `[]`.

### HTTP Status Codes

| Status | Type                    | When It Occurs                                                  |
|--------|-------------------------|-----------------------------------------------------------------|
| 200    | OK                      | Successful operation                                            |
| 400    | Bad Request             | Validation failure, duplicate email, already enrolled, etc.     |
| 401    | Unauthorized            | Missing, expired, or invalid JWT token                          |
| 403    | Forbidden               | Valid token but insufficient permissions (wrong role)           |
| 404    | Not Found               | Resource ID does not exist in the database                      |
| 500    | Internal Server Error   | Unexpected server-side error                                    |

### Common Error Scenarios

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "fullName: Full name is required",
    "email: Please provide a valid email address",
    "password: Password must be at least 6 characters"
  ]
}
```

**Resource Not Found (404):**
```json
{
  "success": false,
  "message": "Course not found with id: 999",
  "errors": []
}
```

**Unauthorized (401):**
The response body may vary depending on Spring Security's default behavior. The response may be an empty body with a 401 status code, or:
```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": []
}
```

**Internal Server Error (500):**
```json
{
  "success": false,
  "message": "An unexpected error occurred",
  "errors": []
}
```

### Mobile Error Handling Best Practices

1. Always check the `success` field first before processing `data`.
2. Display the `message` field to the user for user-friendly errors.
3. For validation errors (400), iterate through the `errors` array to highlight specific form fields.
4. On 401 responses, clear the stored token and redirect to the login screen.
5. On 500 responses, show a generic "Something went wrong, please try again" message.

---

## 6. Mobile Development Guide

### 6.1 API Client Setup

#### Android (Kotlin + Retrofit)

```kotlin
// build.gradle.kts (app)
dependencies {
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")
}

// ApiClient.kt
object ApiClient {
    private const val BASE_URL = "http://10.0.2.2:8080/api/" // Android emulator -> localhost

    private val authInterceptor = Interceptor { chain ->
        val token = TokenManager.getToken() // Your token storage
        val request = chain.request().newBuilder()
        if (token != null) {
            request.addHeader("Authorization", "Bearer $token")
        }
        chain.proceed(request.build())
    }

    private val client = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .addInterceptor(HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        })
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(client)
        .addConverterFactory(GsonConverterFactory.create())
        .build()
}

// ApiResponse.kt
data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T?
)

// AuthApi.kt
interface AuthApi {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<ApiResponse<AuthResponse>>

    @POST("auth/signup")
    suspend fun signup(@Body request: SignupRequest): Response<ApiResponse<AuthResponse>>
}
```

#### iOS (Swift + URLSession)

```swift
// APIClient.swift
class APIClient {
    static let shared = APIClient()
    let baseURL = "http://localhost:8080/api"

    func request<T: Decodable>(
        endpoint: String,
        method: String = "GET",
        body: Encodable? = nil,
        responseType: T.Type
    ) async throws -> APIResponse<T> {
        var urlRequest = URLRequest(url: URL(string: "\(baseURL)/\(endpoint)")!)
        urlRequest.httpMethod = method
        urlRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")

        if let token = KeychainHelper.getToken() {
            urlRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }

        if let body = body {
            urlRequest.httpBody = try JSONEncoder().encode(body)
        }

        let (data, _) = try await URLSession.shared.data(for: urlRequest)
        return try JSONDecoder().decode(APIResponse<T>.self, from: data)
    }
}

// APIResponse.swift
struct APIResponse<T: Decodable>: Decodable {
    let success: Bool
    let message: String
    let data: T?
}
```

#### iOS (Swift + Alamofire)

```swift
// Podfile or SPM: Alamofire ~> 5.8

import Alamofire

class APIClient {
    static let shared = APIClient()
    let baseURL = "http://localhost:8080/api"

    let session: Session = {
        let interceptor = AuthInterceptor()
        return Session(interceptor: interceptor)
    }()
}

class AuthInterceptor: RequestInterceptor {
    func adapt(_ urlRequest: URLRequest, for session: Session, completion: @escaping (Result<URLRequest, Error>) -> Void) {
        var request = urlRequest
        if let token = KeychainHelper.getToken() {
            request.headers.add(.authorization(bearerToken: token))
        }
        completion(.success(request))
    }
}
```

### 6.2 Token Storage Best Practices

#### Android

```kotlin
// Use EncryptedSharedPreferences (AndroidX Security)
// build.gradle: implementation("androidx.security:security-crypto:1.1.0-alpha06")

object TokenManager {
    private const val PREF_NAME = "secure_prefs"
    private const val KEY_TOKEN = "jwt_token"
    private const val KEY_USER_ROLE = "user_role"

    private fun getPrefs(context: Context): SharedPreferences {
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()

        return EncryptedSharedPreferences.create(
            context, PREF_NAME, masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    fun saveToken(context: Context, token: String, role: String) {
        getPrefs(context).edit()
            .putString(KEY_TOKEN, token)
            .putString(KEY_USER_ROLE, role)
            .apply()
    }

    fun getToken(context: Context): String? = getPrefs(context).getString(KEY_TOKEN, null)

    fun clearToken(context: Context) {
        getPrefs(context).edit().clear().apply()
    }
}
```

#### iOS

```swift
import Security

struct KeychainHelper {
    static func saveToken(_ token: String) {
        let data = token.data(using: .utf8)!
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "jwt_token",
            kSecValueData as String: data
        ]
        SecItemDelete(query as CFDictionary) // Remove old
        SecItemAdd(query as CFDictionary, nil)
    }

    static func getToken() -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "jwt_token",
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        guard status == errSecSuccess, let data = result as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }

    static func deleteToken() {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "jwt_token"
        ]
        SecItemDelete(query as CFDictionary)
    }
}
```

### 6.3 Push Notification Integration Points

The backend does not currently have push notification endpoints. Recommended integration points for future implementation:

| Event                    | Trigger                           | Notification Content               |
|--------------------------|-----------------------------------|------------------------------------|
| New live class scheduled | `POST /api/live`                  | "New live class: {title} on {date}"|
| Live class going live    | `PUT /api/live/{id}/status=LIVE`  | "{title} is live now! Join in."    |
| New course published     | `POST /api/courses` (published)   | "New course available: {title}"    |
| Test result available    | `POST /api/tests/{id}/submit`     | "Your score: {score}/{totalMarks}" |
| Enrollment confirmation  | `POST /api/enrollments`           | "You're enrolled in {course}!"     |

**Recommended approach:**
- Android: Firebase Cloud Messaging (FCM)
- iOS: Apple Push Notification service (APNs)
- Store device tokens on the backend (requires new endpoint)

### 6.4 Offline Mode Considerations

| Data Type      | Cache Strategy                                           |
|----------------|----------------------------------------------------------|
| Courses list   | Cache on first load, refresh on pull-to-refresh          |
| Course details | Cache individually, show stale data with refresh option  |
| Notes list     | Cache on first load                                      |
| Downloaded PDFs| Save to device storage, available fully offline           |
| Test series    | Cache list; questions must be fetched online              |
| Live classes   | Always fetch fresh (time-sensitive)                      |
| Banners        | Cache with short TTL (1 hour)                            |
| Enrollments    | Cache for quick UI checks, verify online for access      |

**Recommended libraries:**
- Android: Room database for structured caching
- iOS: Core Data or SwiftData for structured caching

### 6.5 Image Loading and Caching

Images are served as URLs in fields like `thumbnail`, `imageUrl`, `thumbnailUrl`, and `profileImage`.

**Android:**
```kotlin
// Use Coil or Glide
// Coil (recommended for Compose):
implementation("io.coil-kt:coil-compose:2.5.0")

AsyncImage(
    model = course.thumbnail,
    contentDescription = course.title,
    placeholder = painterResource(R.drawable.placeholder),
    error = painterResource(R.drawable.error)
)
```

**iOS:**
```swift
// Use Kingfisher or SDWebImage
// Kingfisher (SPM):
import Kingfisher

imageView.kf.setImage(
    with: URL(string: course.thumbnail ?? ""),
    placeholder: UIImage(named: "placeholder"),
    options: [.transition(.fade(0.3)), .cacheOriginalImage]
)
```

### 6.6 WebSocket for Live Chat (Future)

Not yet implemented. When added, the expected architecture would be:

- **Endpoint:** `ws://localhost:8080/ws/chat`
- **Protocol:** STOMP over WebSocket (Spring WebSocket standard)
- **Android:** Use `okhttp3.WebSocket` or `scarlet` library
- **iOS:** Use `URLSessionWebSocketTask` or `Starscream` library

---

## 7. Admin API Reference

### Role-Based Access

| Endpoint                      | Method | STUDENT | TEACHER | ADMIN |
|-------------------------------|--------|---------|---------|-------|
| `POST /api/auth/signup`       | POST   | Public  | Public  | Public|
| `POST /api/auth/login`        | POST   | Public  | Public  | Public|
| `POST /api/auth/forgot-password`| POST| Public  | Public  | Public|
| `GET /api/courses`            | GET    | Public  | Public  | Public|
| `GET /api/courses/{id}`       | GET    | Public  | Public  | Public|
| `POST /api/courses`           | POST   | No      | Yes     | Yes   |
| `PUT /api/courses/{id}`       | PUT    | No      | Yes     | Yes   |
| `DELETE /api/courses/{id}`    | DELETE | No      | Yes     | Yes   |
| `GET /api/notes`              | GET    | Public  | Public  | Public|
| `GET /api/notes/{id}`         | GET    | Public  | Public  | Public|
| `POST /api/notes`             | POST   | No      | Yes     | Yes   |
| `DELETE /api/notes/{id}`      | DELETE | No      | Yes     | Yes   |
| `GET /api/tests`              | GET    | Public  | Public  | Public|
| `GET /api/tests/{id}`         | GET    | Public  | Public  | Public|
| `GET /api/tests/{id}/questions`| GET   | Public  | Public  | Public|
| `POST /api/tests/{id}/submit` | POST  | Yes     | Yes     | Yes   |
| `POST /api/tests`             | POST   | No      | Yes     | Yes   |
| `POST /api/tests/{id}/questions`| POST | No      | Yes     | Yes   |
| `GET /api/live`               | GET    | Public  | Public  | Public|
| `GET /api/live/{id}`          | GET    | Public  | Public  | Public|
| `POST /api/live`              | POST   | No      | Yes     | Yes   |
| `PUT /api/live/{id}/status`   | PUT    | No      | Yes     | Yes   |
| `POST /api/contact`           | POST   | Public  | Public  | Public|
| `GET /api/contact`            | GET    | No      | No      | Yes   |
| `GET /api/contact/unread`     | GET    | No      | No      | Yes   |
| `PUT /api/contact/{id}/read`  | PUT    | No      | No      | Yes   |
| `POST /api/enrollments`       | POST   | Yes     | Yes     | Yes   |
| `GET /api/enrollments`        | GET    | Yes     | Yes     | Yes   |
| `GET /api/enrollments/check`  | GET    | Yes     | Yes     | Yes   |
| `GET /api/banners`            | GET    | Public  | Public  | Public|
| `GET /api/dashboard/stats`    | GET    | No      | No      | Yes   |

> **Note:** "Public" means no authentication required. "Yes" means the role can access the endpoint with a valid token. "No" means access is denied. The current security configuration uses `permitAll()` for public endpoints and `authenticated()` for all others. Fine-grained role checks (TEACHER vs ADMIN) are not enforced at the security filter level -- all authenticated users can currently access protected endpoints. Role-based restrictions should be added via `@PreAuthorize` annotations in production.

### Content Management Workflow

#### Creating a Course

1. Login as ADMIN/TEACHER -> receive JWT token
2. `POST /api/courses` with course details and `"published": false`
3. Review the course in the admin panel
4. `PUT /api/courses/{id}` with `"published": true` to make it visible to students

#### Creating a Test

1. `POST /api/tests` to create the test series shell
2. `POST /api/tests/{id}/questions` to add questions one by one
3. The `totalQuestions` field auto-updates with each question added

#### Managing Live Classes

1. `POST /api/live` to schedule a new class (status defaults to `UPCOMING`)
2. When class starts: `PUT /api/live/{id}/status?status=LIVE`
3. When class ends: `PUT /api/live/{id}/status?status=COMPLETED`

#### Managing Contact Messages

1. `GET /api/contact/unread` to see new inquiries
2. `PUT /api/contact/{id}/read` to mark as handled
3. `GET /api/contact` to see all messages (read and unread)

---

## 8. Database Schema

### ER Diagram (Text Format)

```
┌──────────────────┐      ┌──────────────────────┐
│      users       │      │       courses         │
├──────────────────┤      ├──────────────────────┤
│ id (PK)          │──┐   │ id (PK)              │
│ full_name        │  │   │ title                │
│ email (UNIQUE)   │  │   │ description          │
│ password         │  ├──>│ instructor_id (FK)   │
│ phone            │  │   │ category             │
│ role             │  │   │ rating               │
│ profile_image    │  │   │ price                │
│ enabled          │  │   │ original_price       │
│ created_at       │  │   │ thumbnail            │
│ updated_at       │  │   │ tag                  │
└──────────────────┘  │   │ duration             │
        │             │   │ level                │
        │             │   │ language             │
        │             │   │ total_students       │
        │             │   │ syllabus             │
        │             │   │ features             │
        │             │   │ published            │
        │             │   │ created_at           │
        │             │   │ updated_at           │
        │             │   └──────────────────────┘
        │             │            │
        │             │            │
        │    ┌────────┼────────────┤
        │    │        │            │
        ▼    ▼        │            ▼
┌──────────────────┐  │   ┌──────────────────┐
│   enrollments    │  │   │      notes       │
├──────────────────┤  │   ├──────────────────┤
│ id (PK)          │  │   │ id (PK)          │
│ user_id (FK)     │  │   │ title            │
│ course_id (FK)   │  │   │ description      │
│ enrolled_at      │  │   │ subject          │
│ payment_id       │  │   │ chapter          │
│ amount           │  │   │ file_url         │
│ status           │  │   │ thumbnail_url    │
└──────────────────┘  │   │ pages            │
                      │   │ downloads        │
                      │   │ course_id (FK)   │
        │             │   │ created_at       │
        │             │   └──────────────────┘
        │             │
        ▼             │            ┌──────────────────────┐
┌──────────────────┐  │            │    live_classes       │
│  test_attempts   │  │            ├──────────────────────┤
├──────────────────┤  │            │ id (PK)              │
│ id (PK)          │  │            │ title                │
│ user_id (FK)     │──┘            │ description          │
│ test_series_id   │──┐            │ instructor_id (FK)   │
│ score            │  │            │ course_id (FK)       │
│ total_marks      │  │            │ scheduled_at         │
│ time_taken       │  │            │ duration             │
│ answers          │  │            │ stream_url           │
│ attempted_at     │  │            │ thumbnail_url        │
└──────────────────┘  │            │ status               │
                      │            │ max_students         │
                      │            │ created_at           │
                      ▼            └──────────────────────┘
┌──────────────────┐
│   test_series    │
├──────────────────┤        ┌──────────────────────┐
│ id (PK)          │───┐    │   contact_messages   │
│ title            │   │    ├──────────────────────┤
│ description      │   │    │ id (PK)              │
│ subject          │   │    │ name                 │
│ total_questions  │   │    │ email                │
│ duration         │   │    │ phone                │
│ max_marks        │   │    │ subject              │
│ price            │   │    │ message              │
│ free             │   │    │ is_read              │
│ attempts         │   │    │ created_at           │
│ created_at       │   │    └──────────────────────┘
└──────────────────┘   │
                       │    ┌──────────────────────┐
                       │    │      banners         │
                       ▼    ├──────────────────────┤
┌──────────────────┐        │ id (PK)              │
│ test_questions   │        │ title                │
├──────────────────┤        │ subtitle             │
│ id (PK)          │        │ image_url            │
│ test_series_id   │        │ link_url             │
│ question_text    │        │ active               │
│ option_a         │        │ display_order        │
│ option_b         │        │ created_at           │
│ option_c         │        └──────────────────────┘
│ option_d         │
│ correct_option   │
│ explanation      │
│ marks            │
│ negative_marks   │
└──────────────────┘
```

### Table Relationships

| Relationship              | Type       | FK Column        | References         |
|---------------------------|------------|------------------|--------------------|
| Course -> User            | ManyToOne  | `instructor_id`  | `users.id`         |
| Note -> Course            | ManyToOne  | `course_id`      | `courses.id`       |
| LiveClass -> User         | ManyToOne  | `instructor_id`  | `users.id`         |
| LiveClass -> Course       | ManyToOne  | `course_id`      | `courses.id`       |
| Enrollment -> User        | ManyToOne  | `user_id`        | `users.id`         |
| Enrollment -> Course      | ManyToOne  | `course_id`      | `courses.id`       |
| TestQuestion -> TestSeries| ManyToOne  | `test_series_id` | `test_series.id`   |
| TestAttempt -> User       | ManyToOne  | `user_id`        | `users.id`         |
| TestAttempt -> TestSeries | ManyToOne  | `test_series_id` | `test_series.id`   |

### Notable Constraints & Indexes

- `users.email` -- UNIQUE constraint
- `contact_messages.is_read` -- column name override (`read` is a reserved word in some SQL dialects)
- All `@CreationTimestamp` columns are set `updatable = false`
- All FKs use `FetchType.LAZY` to prevent N+1 query issues

---

## 9. Deployment Guide

### 9.1 Environment Variables

| Variable            | Required  | Description                              | Example                                          |
|---------------------|-----------|------------------------------------------|--------------------------------------------------|
| `DATABASE_URL`      | Prod      | PostgreSQL JDBC URL                      | `jdbc:postgresql://db.example.com:5432/institute` |
| `DATABASE_USERNAME` | Prod      | Database username                        | `institute_user`                                 |
| `DATABASE_PASSWORD` | Prod      | Database password                        | `s3cur3P@ssw0rd`                                 |
| `JWT_SECRET`        | Prod      | JWT signing key (min 256 bits / 32 chars)| `YourProductionSecretKeyAtLeast32Characters!`     |
| `CORS_ORIGINS`      | Prod      | Comma-separated allowed origins          | `https://app.example.com,https://admin.example.com` |
| `SPRING_PROFILES_ACTIVE` | Prod | Active Spring profile                    | `prod`                                           |

### 9.2 Running Locally

**Prerequisites:**
- Java 21
- PostgreSQL 14+ (or use H2 profile)
- Maven

**With PostgreSQL:**
```bash
# Ensure PostgreSQL is running with database 'institute_db'
createdb institute_db

# Run the application
cd backend
./mvnw spring-boot:run
```

**With H2 (no PostgreSQL required):**
```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=h2
```

The H2 console is accessible at `http://localhost:8080/h2-console` when using the H2 profile.

### 9.3 Docker Setup

**Dockerfile (create in `/backend`):**
```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**docker-compose.yml (create in project root):**
```yaml
version: '3.8'
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: institute_db
      POSTGRES_USER: institute_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: prod
      DATABASE_URL: jdbc:postgresql://db:5432/institute_db
      DATABASE_USERNAME: institute_user
      DATABASE_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      CORS_ORIGINS: ${CORS_ORIGINS}
    depends_on:
      - db

volumes:
  pgdata:
```

**Build and run:**
```bash
cd backend
./mvnw clean package -DskipTests
cd ..
docker-compose up -d
```

### 9.4 Production Checklist

- [ ] **Security:** Change `JWT_SECRET` to a strong, unique key (min 32 characters). Never reuse the development secret.
- [ ] **Security:** Set `spring.jpa.hibernate.ddl-auto` to `validate` (already configured in `prod` profile). Never use `update` or `create-drop` in production.
- [ ] **Security:** Add `@PreAuthorize` annotations to restrict ADMIN/TEACHER-only endpoints by role (currently all authenticated users can access protected endpoints).
- [ ] **Security:** Enable HTTPS (TLS) via a reverse proxy (Nginx, Caddy) or cloud load balancer.
- [ ] **Security:** Set `spring.jpa.show-sql` to `false` in production (already configured).
- [ ] **Database:** Run database migrations with Flyway or Liquibase instead of Hibernate auto-DDL.
- [ ] **Database:** Set up automated backups for PostgreSQL.
- [ ] **CORS:** Restrict `CORS_ORIGINS` to only your production domains (mobile apps typically do not send CORS headers, so this mainly affects web frontends).
- [ ] **Monitoring:** Add health check endpoint (`/actuator/health` via Spring Boot Actuator).
- [ ] **Logging:** Configure structured logging (JSON) for production log aggregation.
- [ ] **Rate Limiting:** Add rate limiting to auth endpoints to prevent brute-force attacks.
- [ ] **Email:** Integrate an email service (SendGrid, SES) for the forgot-password flow (currently a TODO).
- [ ] **File Storage:** Use a cloud storage service (S3, GCS) for file uploads instead of direct URLs.
- [ ] **API Versioning:** Consider prefixing with `/api/v1/` for future backward compatibility.

---

## Appendix: Quick Reference

### All Endpoints at a Glance

| Method | Endpoint                        | Auth     | Description                      |
|--------|---------------------------------|----------|----------------------------------|
| POST   | `/api/auth/signup`              | No       | Register new user                |
| POST   | `/api/auth/login`               | No       | Login and get JWT                |
| POST   | `/api/auth/forgot-password`     | No       | Request password reset           |
| GET    | `/api/courses`                  | No       | List all published courses       |
| GET    | `/api/courses/{id}`             | No       | Get course details               |
| POST   | `/api/courses`                  | Yes      | Create a course                  |
| PUT    | `/api/courses/{id}`             | Yes      | Update a course                  |
| DELETE | `/api/courses/{id}`             | Yes      | Delete a course                  |
| GET    | `/api/notes`                    | No       | List all notes                   |
| GET    | `/api/notes/{id}`               | No       | Get note details                 |
| POST   | `/api/notes`                    | Yes      | Create a note                    |
| DELETE | `/api/notes/{id}`               | Yes      | Delete a note                    |
| GET    | `/api/tests`                    | No       | List all test series             |
| GET    | `/api/tests/{id}`               | No       | Get test series details          |
| GET    | `/api/tests/{id}/questions`     | No       | Get questions for a test         |
| POST   | `/api/tests/{id}/submit`        | Yes      | Submit test answers              |
| POST   | `/api/tests`                    | Yes      | Create a test series             |
| POST   | `/api/tests/{id}/questions`     | Yes      | Add question to test             |
| GET    | `/api/live`                     | No       | List live classes                |
| GET    | `/api/live/{id}`                | No       | Get live class details           |
| POST   | `/api/live`                     | Yes      | Schedule a live class            |
| PUT    | `/api/live/{id}/status`         | Yes      | Update live class status         |
| POST   | `/api/contact`                  | No       | Submit contact message           |
| GET    | `/api/contact`                  | Yes      | List all contact messages        |
| GET    | `/api/contact/unread`           | Yes      | List unread messages             |
| PUT    | `/api/contact/{id}/read`        | Yes      | Mark message as read             |
| POST   | `/api/enrollments`              | Yes      | Enroll in a course               |
| GET    | `/api/enrollments`              | Yes      | List user's enrollments          |
| GET    | `/api/enrollments/check`        | Yes      | Check enrollment status          |
| GET    | `/api/banners`                  | No       | List active banners              |
| GET    | `/api/dashboard/stats`          | Yes      | Get dashboard statistics         |
