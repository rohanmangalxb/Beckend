const db = require("../config/db.js");

// new Product
exports.addProd = async (req, res) => {
    const vals = req.body

    try {
        BigInt.prototype.toJSON = function () { return this.toString() }
        const sql = `Insert into products (p_name, category ,price, createdAt) VALUE (?,?, ?, ?);`
        const result = await db.pool.query(sql, [vals.name, vals.category, vals.price, vals.createdAt])

        console.log(result);
        res.json(result)

    } catch (err) {
        res.json({ message: err.message })
    }
}

//show all products
exports.getProd = async (req, res) => {
    let page = req.query.page ? req.query.page : 1
    try {
        const prods = db.pool.query("Select COUNT(*) FROM Products")
        const totalPages = await prods ? prods : 1

        const sql = 'Select * from products LIMIT 10 OFFSET ?'
        const result = await db.pool.query(sql, [(page - 1) * 10])

        console.log(result)
        res.json({ Total_Pages: totalPages, Current_page: page, result })

    } catch (err) {
        res.json({ message: `ERR${err.message}` })
    }
}

//filter by category
exports.filterByCateg = async (req, res) => {
    const { category } = req.query

    try {
        const sql = `Select * from products where category = ?`
        const result = await db.pool.query(sql, [category])

        console.log(result)
        res.json(result)

    } catch (err) {
        res.json({ message: err.message })
    }
}

// filter by price
exports.filterByPrice = async (req, res) => {
    const { minP, maxP } = req.query
    try {
        const sql = "Select * from products where price BETWEEN ? AND ?"
        const result = await db.pool.query(sql, [minP, maxP])

        console.log(result)
        res.json({ minP: minP, maxP: maxP, result: result })
    } catch (err) {
        res.json({ message: err.message })
    }
}

// filter by search
exports.Search = async (req, res) => {
    const { search } = req.query

    try {
        if (!search) {
            const sql = "Select * from products"
            const result = await db.pool.query(sql, [`%${search}%`])

            console.log(result)
            res.json(result)
        } else {
            const sql = "Select * from products where p_name LIKE ? "
            const result = await db.pool.query(sql, [`%${search}%`])

            console.log(result)
            res.json(result)
        }
        console.log(result)
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
    }
}

//sort by price
exports.SortByPrice = async (req, res) => {
    const order = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    try {
        const sql = `Select * from products ORDER BY price ${order}`
        const result = await db.pool.query(sql)

        res.json(result)
        console.log(result, order)
    } catch (err) {
        res.json({ message: err.message })
    }
}

//sort by time
exports.SortByTime = async (req, res) => {
    try {
        const sql = 'select * from products order by createdAt DESC'
        const result = await db.pool.query(sql)

        res.json(result)
        console.log(result)
    } catch (err) {
        res.json({ message: err.message })
    }
}

exports.delAll = async (req, res) => {
    try {
        BigInt.prototype.toJSON = function () { return this.toString() }

        const sql = 'Truncate table products'
        const result = await db.pool.query(sql)
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
    }
}