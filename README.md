# Termo

This project is based on the original website <a href="https://term.ooo/">termo</a>. The game consist of guessing the word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.

<br>

<div align=center>
  <img style="width: 600px;" src="https://github.com/rods-duarte/projeto-termo-front/blob/main/src/assets/images/termo_demo.gif" />
</div>

<div align=center>
  <a href="https://github.com/rods-duarte/projeto-termo-front">front-end</a> | <a href="https://github.com/rods-duarte/projeto-termo-back">back-end</a>
</div>


# Features
<ul>
  <li> Signup and signin </li>
  <li> Login permanence with local storage</li>
  <li> New word available every day </li>
  <li> User statistic saved on server </li>
  <li> CSS animations </li>
</ul>

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
     <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Express.js-404D59?style=for-the-badge'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white'>
   </br>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
   <img style='margin: 5px;' src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>
</p>

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env` file using the `.env.example` file 
5. Run all migrations

```bash
npx prisma migrate dev
```

6. Run the back-end in a test environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section 
2. Configure the `.env.test` file using the `.env.example` file 
3. Run all migrations

```bash
npx prisma migrate dev
```

4. Run test:

```bash
npm run test
```
5. Run unit test:

```bash
npm run test:unit
```

6. Run integration test:

```bash
npm run test:integration
```
