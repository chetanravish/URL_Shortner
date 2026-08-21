# 🔗 URL Shortener

A full-stack URL Shortener built with React, Node.js, Express, MongoDB Atlas, Docker, and AWS ECS.

## Live Demo

**URL:** http://url-shortener-alb-1306131148.ap-northeast-1.elb.amazonaws.com

---

## Features

- Create short URLs instantly
- User registration & login (JWT Authentication)
- Custom short links
- Personal dashboard
- Copy shortened URL
- Delete URLs
- Responsive design
- Dockerized frontend & backend
- Deployed on AWS ECS with Application Load Balancer

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Query
- Vite

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### DevOps
- Docker
- Amazon ECR
- Amazon ECS (Fargate)
- Application Load Balancer

---

## Architecture

User → ALB → ECS Frontend / ECS Backend → MongoDB Atlas

---

## Screenshots

### Homepage

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/686c765a-e810-451a-88e6-848d2ae667a6" />


### User Dashboard

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/cc132e2b-20c2-46c7-956c-d2aea2126a00" />

---

## Run Locally

### Backend

```bash
cd Backend
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## Author

**Chetan Ravish**

LinkedIn: www.linkedin.com/in/chetan-ravish
