const connection = require('../connection');

const categoryList = async (req, res) => {

    const { user } = req;

    try {
        const categories = await connection.query(`select  categorias.id, categorias.descricao from transacoes
        left join usuarios on transacoes.usuario_id = usuarios.id 
        left join categorias on transacoes.categoria_id = categorias.id 
        where usuarios.id = $1
        group by categorias.id
        `, [user.id]);

        return res.status(200).json(categories.rows);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = categoryList;