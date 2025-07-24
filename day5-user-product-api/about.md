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

3) edited config/db.js to configure Sequelize

4) defined models in user.js and product.js to define user and product and associated & initiated them in index.js 

|<pre>
1 - index.js <-- { models/user.js, models/product.js, config/db.js }

2 - product.js <-- { config/db.js }

3 - user.js <-- { config/db.js }
</pre>

5) edited authMiddleware.js to configure jwt

<pre>
1 - authMiddleware.js <-- { User from models/ }
</pre>

6) edited roleMiddleware.js to configure authorization for admin  

<pre>
1 - roleMiddleware.js <-- nothing
</pre>

7) Configure Controllers for registration of user, or login or product management
   1) authController to check if new user and verify login for old users
   2) userController to get or delete user data
   3) productController to create, get or delete product while checking its linkage with user

<pre>
1 - authController.js <-- { User from models/ }
2 - userController.js <-- { User from models/ }
3 - productController.js <-- { Product from models/ }
</pre>

8) Configure Routes to bypass GET, POST, PUT, DELETE methods over the user or product

<pre>
1 - authRoutes.js <-- { middleware/authMiddleware }
2 - userRoutes.js <-- { middlewares/authMiddleware, middlewares/roleMiddleware }
3 - productRoutes.js <-- { middleware/authMiddleware }
</pre>

9) Configure app.js to start the main app and associate throughout beckend

<pre>
authRoutes from routes, 
userRoutes from routes, 
productRoutes from routes
</pre>