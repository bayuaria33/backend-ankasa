<h1 align="center">backend-ankasa</h1>

Backend API for Ankasa App
Ankasa App is a web-based application that displays tickets for multiple airlines. It comes with various features, such as ticket reservation, flight schedules viewing, as well as booking and payment processing. Developed using Next Js, Ankasa App is a convenient platform for managing flight-related tasks.

## Authors

- [@bayuaria33](https://github.com/bayuaria33)

## Built with

- NodeJS
- ExpressJS
- PostgreSQL

## Packages used

- "argon2": "^0.30.3"
- "cloudinary": "^1.34.0"
- "cors": "^2.8.5"
- "dotenv": "^16.0.3"
- "express": "^4.18.2"
- "helmet": "^6.0.1"
- "jsonwebtoken": "^9.0.0"
- "multer": "^1.4.5-lts.1"
- "nodemailer": "^6.9.1"
- "pg": "^8.9.0"
- "uuid": "^9.0.0"
- "xss-clean": "^0.1.1"

## Features

- User registration with email verification
- CRUD Tickets, Bookings, Airlines
- Sort, Filter, Search
- Private routes

## .env example

```
DB_USER=
DB_PASS=
DB_PORT=
DB_HOST=
DB_NAME=

JWT_ACCESS_KEY=

EMAIL_NAME=
EMAIL_PASSWORD=

BASE_URL=
PORT=

PHOTO_NAME=
PHOTO_KEY=
PHOTO_SECRET=
```

frontend= https://github.com/bayuaria33/frontend-ankasa-next

## API Reference

<details>
<summary>Show API Reference</summary>

## Register user

```http
  POST /users/register/customer
```

Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `fullname` | **Required**. name |
| `password` | **Required**. password |


## Login user

```http
  POST /users/login
```

Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |

## Verify Users OTP

```http
  POST /users/confirm
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `OTP` | **Required**. OTP |

## Update user

```http
  POST /users/update
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `fullname` | **Required**. fullname |
| `email` | **Required**. email |
| `phone` | **Required**. phone |
| `city` | **Required**. city |
| `country` | **Required**. country |
| `postalcode` | **Required**. postalcode |

## Update Airline

```http
  PUT /airlines/:id
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `airline_name` | **Required**. airline_name |
| `photo` | **Required**. photo |


## Insert Airline

```http
  POST /airlines
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `airline_name` | **Required**. airline_name |
| `photo` | **Required**. photo |


## Get All Airline

```http
  GET /airlines
```

## Get Airline by Id
```http
  GET /airlines/:id
```

## Insert Bookings
```http
  POST /bookings/
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `tickets_id` | **Required**. tickets_id |
| `users_id` | **Required**. users_id |
| `passengers` | **Required**. passengers |
| `title` | **Required**. title |
| `payment_status` | **Required**. payment_status |
| `insured` | **Required**. insured |

## Get Bookings by User
```http
  GET /bookings
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

## Get Bookings by Id
```http
  GET /bookings/:id
```

## Update Payment Status
```http
  PUT /bookings/update-payment
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `id` | **Required**. id |
| `payment_status` | **Required**. payment_status |

## Get All Tickets
```http
  GET /tickets/all
```

## Get Filtered Tickets
```http
  GET /tickets/filter
```
Req Query Form:
| Key | Value |
| :-------- |:------------------------- |
| `search` | **Required**. search |
| `t1` | **Required**. t1 |
| `t2` | **Required**. t2 |
| `p1` | **Required**. p1 |
| `p2` | **Required**. p2 |
| `sort` | **Required**. sort |
| `transit` | **Required**. transit |
| `airline_id` | **Required**. airline_id |

## Insert Ticket
```http
  POST /tickets
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `airlines_id` | **Required**. airlines_id |
| `departure_city` | **Required**. departure_city |
| `departure_country` | **Required**. departure_country |
| `arrival_city` | **Required**. arrival_city |
| `arrival_country` | **Required**. arrival_country |
| `departure_date` | **Required**. departure_date |
| `arrival_date` | **Required**. arrival_date |
| `transit` | **Required**. transit |
| `facilities` | **Required**. facilities |
| `price` | **Required**. price |
| `flight_class` | **Required**. flight_class |
| `gate` | **Required**. gate |
| `terminal` | **Required**. terminal |

## Update Ticket
```http
  PUT /tickets/:id
```
Req Body Form:
| Key | Value |
| :-------- |:------------------------- |
| `airlines_id` | **Required**. airlines_id |
| `departure_city` | **Required**. departure_city |
| `departure_country` | **Required**. departure_country |
| `arrival_city` | **Required**. arrival_city |
| `arrival_country` | **Required**. arrival_country |
| `departure_date` | **Required**. departure_date |
| `arrival_date` | **Required**. arrival_date |
| `transit` | **Required**. transit |
| `facilities` | **Required**. facilities |
| `price` | **Required**. price |
| `flight_class` | **Required**. flight_class |
| `gate` | **Required**. gate |
| `terminal` | **Required**. terminal |
