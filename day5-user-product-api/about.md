# Project : REST Api (_Representational State Transfer_) with JWT authentication

A `REST API` is and **Application Programming Interface** that conforms to the design principles of the REST architectural styles, a style used to connect distributed hypermedia systems.

## Tools/Frameworks/libraries Required:
- Node.js
- Express.js
- MariaDB
- Sequelize
- jwt (json web token) for authentication
- bcrypt (for hashing passwords)














## Steps :

1. Terminal (all commands to be used throughout project):
<pre>
npm init -y
npm i express sequelize mariadb dotenv bcrypt jsonwebtoken
nodemon app.js
</pre>

2. Create folder structure:
<pre>
user-product-api/
├── node_modules/...
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── index.js
│   ├── user.js
│   └── product.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── productRoutes.js
├── config/
│   └── db.js
├── .env
├── app.js
</pre>

3) Create Database (named it `restapi`, **user: root**, **password: Appcino@123**)
   1. Table 1: user (`u_id`, u_name, email, password, role)
   2. Table 2: product (`p_id`, p_name, description, price, **`u_id`**)
