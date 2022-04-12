import './styles.css'
import Header from '../../components/header'
import Transacao from '../../components/Transacao/transacao'
import Resumo from '../../components/Resumo/Resumo'
import filterIcon from '../../assets/filtrar_icon.svg'
import dateUpArrow from '../../assets/data_up_arrow.svg'
import fakedata from '../../utils/fakedata'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'



export default function Main() {
    const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)
    const [user, setUser] = useState({ id: null, nome: '', email: '' })
    const token = getItem('token')

    async function fetchUserData(res, req) {
        try {
            const response = await api.get('/usuario',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setUser({ ...response.data })
        } catch (error) {
            res.status(400).json(error.response.data.message)
        }
    }

    async function fillUserTransactions(res, req) {
        try {
            const response = await api.get('/transacao', user) //o que fazer aqui? Lá ele recebe user desestruturado do body

            console.log(response.data);
        } catch (error) {
            res.status(400).json(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchUserData()
        fillUserTransactions()
    }, [])

    console.log(user);
    return (
        <div className='body-clean'>
            <Header
                token={token}
                name={user.nome}
            />
            <div className='container-main'>
                <button className='filter-btn' >
                    <img src={filterIcon} alt='icon' />
                    Filtrar
                </button>
                <div className='inner-container'>
                    <div className='left-inner-container'>
                        <div className='transaction-label'>
                            <div className='label-data'>
                                <span className='date label'>
                                    Data
                                    <img src={dateUpArrow} alt='arrow up' />
                                </span>
                            </div>
                            <div className='label-dia label'>
                                <span className='dia'>Dia da semana</span>
                            </div>
                            <div className='label-descricao label'>
                                <span className='descricao'>Descrição</span>
                            </div>
                            <div className='label-categoria label'>
                                <span className='categoria'>Categoria</span>
                            </div>
                            <div className='label-valor label'>
                                <span className='valor'>Valor</span>
                            </div>
                        </div>
                        <div>
                            {fakedata.map((data) => (
                                <Transacao
                                    key={data.id}
                                    transactionData={data}
                                    deleteBoxOpen={deleteBoxOpen}
                                    setDeleteBoxOpen={setDeleteBoxOpen}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='right-inner-container'>
                        <Resumo
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
