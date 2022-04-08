const connection = require('../connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        res.status(400).json({ message: "O campo nome é obrigatório" });
    };

    if (!email) {
        res.status(400).json({ message: "O campo email é obrigatório" });
    };

    if (!password) {
        res.status(400).json({ message: "O campo senha é obrigatório" });
    };

    try {
        const queryEmailConsult = 'select * from usuarios where email = $1';
        const { rowCount: numberUsers } = await connection.query(queryEmailConsult, [email]);

        if (numberUsers > 0) {
            return res.status(400).json({ message: "Já existe usuário cadastrado com o e-mail informado." });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
        const registeredUser = await connection.query(query, [name, email, encryptedPassword]);

        if (registeredUser.rowCount === 0) {
            return res.status(400).json({ message: "Não foi possível cadastrar o usuário." });
        }

        const userRegister = await connection.query('select * from usuarios where email = $1', [email]);

        const { senha, ...user } = userRegister.rows[0];

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser
};