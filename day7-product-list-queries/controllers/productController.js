const db = require("../config/db.js");
// const { param } = require("../routes/productRoutes.js");


exports.addProducts = async (req, res) => {
    BigInt.prototype.toJSON = function () { return this.toString() }

    const productDetail = req.body;
    if (!productDetail) return res.status(404).json({ message: "No Data to input" });

    try {

        const sql = 'Insert into products (p_name, category ,price, createdAt) VALUE (?, ?, ?, ?);'
        const result = await db.pool.query(sql, [productDetail.name, productDetail.category, productDetail.price, productDetail.createdAt]);

        console.log(result)
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
    }
}

exports.delete = async (req, res) => {
    try {
        const sql = 'truncate table products'
        const result = await db.pool.query(sql)
        res.json(result);
    } catch (err) {
        res.json({ message: err.message })
    }
}

exports.products = async (req, res) => {
    BigInt.prototype.toJSON = function () { return this.toString() }


    const data = req.query; //data has search, sortby, category, minP, maxP,
    let sql = 'Select * from products'
    let conditions = []
    const parameters = [];

    try {
        if (data.category) {
            conditions.push(`category = ?`)
            parameters.push(`${data.category}`)
        }

        if (data.search) {
            conditions.push(`p_name like ?`)
            parameters.push(`%${data.search}%`)
            console.log(`p_name like %${data.search}%`)
        }

        if (data.minP) {
            conditions.push(`price >= ?`)
            parameters.push(`${data.minP}`)
        }

        if (data.maxP) {
            conditions.push(`price <= ?`)
            parameters.push(`${data.maxP}`)
        }

        if (conditions.length > 0) {
            sql += ` where ${conditions.join(' AND ')}`
        }

        if (data.sortby) {
            const order = data.order === 'desc' ? 'desc' : 'asc';
            sql += ` order by ${data.sortby} ${order}`
        }

        const currPage = data.page >= 1 ? data.page : 1;
        const limit = data.limit ? data.limit : 10;
        const offset = (currPage - 1) * limit;

        sql += ` limit ? offset ?`
        parameters.push(limit, offset)

        const [{ count }] = await db.pool.query('Select count(*) as count from products')
        const totalPages = Math.ceil(Number(count) / limit);

        const result = await db.pool.query(sql, parameters);
        res.json(result, { pages: totalPages, currentPage: currPage });
        console.log(sql, parameters);

    } catch (err) {
        res.json({ message: `Error: ${err.message}` })
    }
}

// //show all products
// exports.getProd = async (req, res) => {
//     let page = req.query.page ? req.query.page : 1
//     try {
//         const prods = db.pool.query("Select COUNT(*) FROM Products")
//         const totalPages = await prods ? prods : 1

//         const sql = 'Select * from products LIMIT 10 OFFSET ?'
//         const result = await db.pool.query(sql, [(page - 1) * 10])

//         console.log(result)
//         res.json({ Total_Pages: totalPages, Current_page: page, result })

//     } catch (err) {
//         res.json({ message: `ERR${err.message}` })
//     }
// }

// //filter by category
// exports.filterByCateg = async (req, res) => {
//     const { category } = req.query

//     try {
//         const sql = `Select * from products where category = ?`
//         const result = await db.pool.query(sql, [category])

//         console.log(result)
//         res.json(result)

//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }

// // filter by price
// exports.filterByPrice = async (req, res) => {
//     const { minP, maxP } = req.query
//     try {
//         const sql = "Select * from products where price BETWEEN ? AND ?"
//         const result = await db.pool.query(sql, [minP, maxP])

//         console.log(result)
//         res.json({ minP: minP, maxP: maxP, result: result })
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }

// // filter by search
// exports.Search = async (req, res) => {
//     const { search } = req.query

//     try {
//         if (!search) {
//             const sql = "Select * from products"
//             const result = await db.pool.query(sql, [`%${search}%`])

//             console.log(result)
//             res.json(result)
//         } else {
//             const sql = "Select * from products where p_name LIKE ? "
//             const result = await db.pool.query(sql, [`%${search}%`])

//             console.log(result)
//             res.json(result)
//         }
//         console.log(result)
//         res.json(result)
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }

// //sort by price
// exports.SortByPrice = async (req, res) => {
//     const order = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

//     try {
//         const sql = `Select * from products ORDER BY price ${order}`
//         const result = await db.pool.query(sql)

//         res.json(result)
//         console.log(result, order)
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }

// //sort by time
// exports.SortByTime = async (req, res) => {
//     try {
//         const sql = 'select * from products order by createdAt DESC'
//         const result = await db.pool.query(sql)

//         res.json(result)
//         console.log(result)
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }

// exports.delAll = async (req, res) => {
//     try {
//         BigInt.prototype.toJSON = function () { return this.toString() }

//         const sql = 'Truncate table products'
//         const result = await db.pool.query(sql)
//         res.json(result)
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// }