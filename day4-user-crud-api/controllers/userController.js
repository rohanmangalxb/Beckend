const db = require('../models/userModel')
const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


exports.getAll = async (req, res) => {

    try {
        const sql = "Select * from users";
        const result = await db.pool.query(sql);

        res.send(result)
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

exports.userById = async (req, res) => {
    const id = Number(req.params.id)

    try {
        const sql = "Select * from users where user_id = ?"
        const result = await db.pool.query(sql, id)

        if (!result) return res.status(404).json({ message: 'User not found' });

        res.json(result)
    } catch (err) {
        res.status(404).json({ message: "User not found!" });
    }
}

exports.createUser = async (req, res) => {
    const user = req.body;

    if (!user.name) return res.status(400).json({ message: "Name is required" })
    if (!user.email) return res.status(400).json({ message: "Email is required" }); else
        if (!email_regex.test(user.email)) res.status(400).json({ message: "Incorrect email format" });
    if (!user.age) return res.status(400).json({ message: "Age is required" })

    try {
        BigInt.prototype.toJSON = function () { return this.toString() }
        const sql = "Insert into users(name, email, age) Value (?, ?, ?)";
        const result = await db.pool.query(sql, [user.name, user.email, user.age]);

        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.update = async (req, res) => {
    const user = req.body;
    const id = Number(req.params.id);

    try {
        BigInt.prototype.toJSON = function () {
            return Number(this);
        };
        const sql = "Update users set name = ?, email = ?, age = ? where user_id = ?";
        const result = await db.pool.query(sql, [user.name, user.email, user.age, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.del = async (req, res) => {
    const id = Numebr(req.params.id);

    try {
        const sql = "Delete from users where user_id = ?"
        const result = await db.pool.query(sql, [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.delAll = async (req, res) => {
    try {
        BigInt.prototype.toJSON = function () {
            return Number(this);
        };
        const sql = "Delete from users"
        const result = await db.pool.query(sql)

        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
