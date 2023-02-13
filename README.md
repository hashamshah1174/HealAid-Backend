# Heal Aid: Health Record Sharing System and Online Consultancy Using Blockchain
## This is a Node.js and TypeScript project that uses MongoDB to create a health record sharing system and online consultancy service. The project is built on the blockchain technology to ensure secure and transparent data sharing.

### Features
- Secure and transparent health record sharing
- Online consultancy service with certified doctors
- Ability to store and access health records from anywhere
- Easy-to-use interface for patients and healthcare professionals

### Prerequisites
- Node.js
- TypeScript
- MongoDB

### Installation
- Clone the repository <https://github.com/your-username/Heal-Aid.git>
- Install the dependencies

  ```
  cd Heal-Aid
  npm install
  ```
- use below .env file

  ```
    APP_MODE=dev
    APP_PORT=1337
    APP_HOST=127.0.0.1
    JWT_SECRET_KEY=YOUR-KEY
    JWT_REFRESH_SECRET_KEY=YOUR-KEY
    JWT_SECRET_EXPIRE_IN=1h
    JWT_REFRSH_SECRET_EXPIRE_IN=30d

    MANGO_ATLAS_PWD=YOUR-KEY
    MANGO_ATLAS_USER=YOUR-KEY
    MANGO_ATLAS_CLUSTER=YOUR-KEY 
    MANGO_ATLAS_DB=YOUR-KEY
    MANGO_UNIQUE_NAME=YOUR-KEY
  ```
- Start the development server
  
  ```
  npm run start:dev
  ```
- Open your postman and hit this http://127.0.0.1:1337/api/v1{{endpoints}} to access the application  
  
