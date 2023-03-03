# TODO APP

## 1. Used techniques

### a. Backend app

- Node.js
- Express.js
- Jsonwebtoken
- Hash algorithm with bcrypt.js

### b. Database

- Postgresql
- Docker

## 2. Local deployment

### a. Software requirements

- Git
- Docker
- Node.js
- NPM
- Postman or similar apps to test backend

### b. Deployment steps

- Clone from git

```
git clone https://github.com/thuantieu/todo-app.git

cd ./todo-app

npm install
```

- Database build with docker compose

    Make sure docker use linux containers

```
docker-compose up -d
```

- Running backend app

```
npm start
```

    or

```
npm run dev
```

- Automatic test

```
npm run test
```

## 3. Api test

Using Postman to send request

### Sign up an user

- Link

```
http://localhost:3000/api/v1/signup
```

- Method POST
- Request body

```js
// the example of body value
{
  "email": "user1@test.com",
  "password": "123456"
}
```

### Sign in an user

- Link

```
http://localhost:3000/api/v1/signin
```

- Method POST
- Request body

```js
// the example of body value
{
  "email": "user1@test.com",
  "password": "123456"
}
```

- Result expectation

```js
// the example of signin response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyMjkwOWE4LTU5NmItNWYzMS05MDJjLTQ2NGRmOTRjNTFjOSIsImlhdCI6MTY3Nzg1NDI3MCwiZXhwIjoxNjc3ODU3ODcwfQ._O81wFb4zk2onu-XN2eQKI4LQOR2VOVr7BgTAqivaBE"
}
```

### Sign in an user

- Link

```
http://localhost:3000/api/v1/changepassword
```

- Method PUT
- Request body

```js
// the example of body value
{
  "email": "user1@test.com",
  "password": "new password"
}
```

### Create a note
- Link

```
http://localhost:3000/api/v1/todos
```

- Method POST
- Headers

```
{
    Authorization: Bearer Token_KEY
}
```
- Request body

```js
// the example of body value
{ 
    "name": "note title", 
    "description": "description" 
}
```
### Get all notes with status
- Link
```
http://localhost:3000/api/v1/todos?status=[status]
```
- Method GET
### Update a note
- Link
```
http://localhost:3000/api/v1/todos/:id
```

- Method PUT
- Headers

```
{
    Authorization: Bearer Token_KEY
}
```
- Request body

```js
// the example of body value
{ 
    "name": "note title", 
    "description": "description",
    "status": "OnGoing"
}
```
### Update a note
- Link
```
http://localhost:3000/api/v1/todos/:id
```

- Method DELETE
- Headers

```
{
    Authorization: Bearer Token_KEY
}
```
