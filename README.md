<h1 align="center" >
  <img src="media/hikorea-mascot.png" alt="HiKorea Mascot" width="200" />
  <br>
  Hi Korea Assistant
  <br>
</h1>
<h4 align="center">A revamp of the <img src="https://cdn-icons-png.flaticon.com/512/197/197582.png" width="15"/> <a href="https://www.hikorea.go.kr/Main.pt" target="_blank">Hi Korea Immigration Portal</a>.</h4>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#features">Features</a> •
  <a href="#how-to-run-the-project">How to run the project</a>
</p>

### Introduction

This project aims to revamp the user experience of [<img src="https://cdn-icons-png.flaticon.com/512/197/197582.png" width="13"/> Hi Korea immigration portal](https://www.hikorea.go.kr/Main.pt). This site provides services and information for foreigners living in Korea, such as visa applications, residency permits, and other immigration-related matters.

The goal is to provide an interactive flow where users are asked what they need, and then guided through relevant questions, avoiding long and static forms. As users progress, they fill in only the necessary information.

### Tech Stack

#### Backend

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NestJs](https://img.shields.io/badge/-NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white)

#### Frontend

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Features

- **Dynamic flows**: Users select what they need, and the system adjusts the questions in real-time.
- **Intuitive interface**: A clear, guided experience with validations at every step.
- **Process optimization**: More efficient forms that reduce user input time.

### How to run the project

```bash
# Clone the repository
git clone https://github.com/wuaho/hikorea-paperman.git

# Install dependencies
pnpm install

# Run in development mode
pnpm run dev

# (Should be available in http://localhost:5173/)
```
