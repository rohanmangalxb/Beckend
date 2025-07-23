const db = require('../models/user')

exports.adminUser = async (req, res) => {
    try {
        const sql = "Select * from user";
        const result = await db.pool.query(sql);

        res.send(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.getAll = async (req, res) => {

    try {
        const sql = "Select * from user";
        const result = await db.pool.query(sql);

        res.send(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.userById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const sql = "Select * from user where user_id = ?"
        const result = await db.pool.query(sql, id)

        if (!result) return res.status(404).json({ message: 'User not found' });

        res.json(result)
    } catch (err) {
        res.status(404).json({ message: "User not found!" });
    }
}