import './styles.css'
import Header from '../../components/header'
import Transacao from '../../components/Transacao/transacao'
import Resumo from '../../components/Resumo/Resumo'
import filterIcon from '../../assets/filtrar_icon.svg'
import dateUpArrow from '../../assets/data_up_arrow.svg'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import AddRegister from '../../components/adicionar_registro/add_register'



export default function Main() {
    const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)
    const [transactionArray, setTransactionArray] = useState([])
    const [user, setUser] = useState({ id: null, nome: '', email: '' })
    const [showAddRegister, setShowAddRegister] = useState(false)
    const token = getItem('token')


    async function fillUserData(res, req) {
        try {
            const response = await api.get('/usuario',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return setUser({ ...response.data })
        } catch (error) {
            return res.status(400).json(error.response.data.message)
        }
    }


    async function createTransactionArray(req, res) {
        try {
            const response = await api.get('/transacao',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setTransactionArray(response.data);
        } catch (error) {
            return res.status(400).json(error.response.data.message)
        }
    }

    function openAddRegisterModal() {
        setShowAddRegister(true)
    }

    useEffect(() => {
        fillUserData()
        createTransactionArray()
        //ver com os professores sobre essa espécie de atraso
        console.log(transactionArray);
    }, [])


    return (
        <div className='body-clean'>
            <Header
                token={token}
                userName={user.nome}
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
                            {transactionArray.map((data) => (
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
                            transactionArray={transactionArray}
                            openAddRegisterModal={openAddRegisterModal}
                        />
                    </div>
                </div>
            </div>
            {showAddRegister &&
                <AddRegister
                    showAddRegister={showAddRegister}
                    setShowAddRegister={setShowAddRegister}
                />
            }
        </div>

    )
}
