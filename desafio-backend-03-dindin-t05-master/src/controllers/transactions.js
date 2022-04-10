const connection = require('../connection');

const listTransactions = async (req, res) => {
    const { user } = req;

    try {
        const queryTransactionList = `select 
         tipo, valor, data, usuario_id, categoria_id 
        from transacoes
        left join categorias on categorias.id = transacoes.categoria_id
        where transacoes.usuario_id = $1`;
        const transactionList = await connection.query(queryTransactionList, [user.id]);

        return res.status(200).json(transactionList.rows);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const detailTransaction = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const queryResponseTransaction = `select 
        transacoes.id, 
        transacoes.tipo, 
        transacoes.descricao, 
        transacoes.valor, 
        transacoes.data, 
        transacoes.usuario_id, 
        transacoes.categoria_id, 
        categorias.descricao as categoria_nome 
        from transacoes 
        left join categorias 
        on transacoes.categoria_id = categorias.id 
        where transacoes.id = $1 AND usuario_id = $2`;

        const responseTransaction = await connection.query(queryResponseTransaction, [id, user.id]);

        if (responseTransaction.rowCount === 0) {
            res.status(404).json({ message: "Transação não encontrada" });
        }

        return res.status(200).json(responseTransaction.rows);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const registerTransaction = async (req, res) => {
    const { description, amount, date, idcategory, type } = req.body;
    const { user } = req;

    if (!description || !amount || !date || !idcategory || !type) {
        return res.status(400).json({ message: "Todos os campos obrigatórios devem ser informados." });
    };

    if (type !== "entrada" && type !== "saida") {
        return res.status(400).json({ message: "Defina o campo tipo como 'entrada' ou 'saida'." })
    };

    try {
        const checkCategory = await connection.query('select * from categorias where id = $1', [idcategory]);

        if (checkCategory.rowCount === 0) {
            return res.status(400).json({ message: "A categoria informada não existe." });
        }

        const queryTransactionRegister = `insert into transacoes 
        (descricao, valor, data, categoria_id, usuario_id, tipo) 
        values
        ($1, $2, $3, $4, $5, $6)`;
        const transactionRegister = await connection.query(queryTransactionRegister, [description, amount, date, idcategory, user.id, type,]);

        if (transactionRegister.rowCount === 0) {
            return res.status(400).json({ message: "Não foi possível registrar a transação." });
        }

        const allTransaction = await connection.query('select * from transacoes');

        const queryResponseTransaction = `select 
        transacoes.id, 
        transacoes.tipo, 
        transacoes.descricao, 
        transacoes.valor, 
        transacoes.data, 
        transacoes.usuario_id, 
        transacoes.categoria_id, 
        categorias.descricao as categoria_nome 
        from transacoes 
        left join categorias 
        on transacoes.categoria_id = categorias.id 
        where transacoes.id = $1`;

        const responseTransaction = await connection.query(queryResponseTransaction, [allTransaction.rowCount]);

        return res.status(201).json(responseTransaction.rows);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    listTransactions,
    detailTransaction,
    registerTransaction
}