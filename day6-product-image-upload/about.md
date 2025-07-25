# Task:

Implement an API for uploading product image using multer only if user is admin with POST and Serve uploaded image files publicly with GET

## Learning Source: `https://www.youtube.com/watch?v=GgnlQ1a0_uA`

## Steps:

1. installed all required tools/libraries
<pre>
npm init -y
npm i express sequelize dotenv jsonwebtoken bcrypt
npm i multer
</pre>

2. Folder Structure:

<pre>
day-product-image-upload/
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
├── package.json
</pre>

3. Configured db.js and models to define database and tables.







## Multer:
To be used:
- `destination`
- `filename`
- `filter for jpeg and png or jpg`
- `limit - 1mb`
- `.single("...")`