import './styles.css'
import Header from '../../components/header'
import Transacao from '../../components/Transacao/transacao'
import Resumo from '../../components/Resumo/Resumo'
import filterIcon from '../../assets/filtrar_icon.svg'
import dateUpArrow from '../../assets/data_up_arrow.svg'
import { useEffect, useState } from 'react'
import { getItem } from '../../utils/storage'
import api from '../../services/api'
import ModalRegister from '../../components/modal_registro/modal_register'



export default function Main() {
    const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)
    const [transactionArray, setTransactionArray] = useState([])
    const [transactionData, setTransactionData] = useState([])
    const [user, setUser] = useState({ id: null, nome: '', email: '' })
    const [showModalRegister, setShowModalRegister] = useState(false)
    const [modalType, setModalType] = useState(null)
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

            console.log(response.data);
            setTransactionArray(response.data);
        } catch (error) {
            return res.status(400).json(error.response.data.message)
        }
    }

    function openModalRegister() {
        setShowModalRegister(true)
    }


    useEffect(() => {
        fillUserData()
        createTransactionArray()

        return () => {
        }
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
                                    transData={data}
                                    setTransactionData={setTransactionData}
                                    deleteBoxOpen={deleteBoxOpen}
                                    setDeleteBoxOpen={setDeleteBoxOpen}
                                    setModalType={setModalType}
                                    openModalRegister={openModalRegister}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='right-inner-container'>
                        <Resumo
                            transactionArray={transactionArray}
                            openModalRegister={openModalRegister}
                            setModalType={setModalType}
                        />
                    </div>
                </div>
            </div>
            {showModalRegister &&
                <ModalRegister
                    showModalRegister={showModalRegister}
                    setShowModalRegister={setShowModalRegister}
                    modalType={modalType}
                    transactionData={transactionData}
                />
            }
        </div>

    )
}
