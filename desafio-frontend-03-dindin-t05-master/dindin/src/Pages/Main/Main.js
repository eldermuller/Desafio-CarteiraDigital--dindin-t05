import './styles.css'
import Header from '../../components/header'
import Transacao from '../../components/Transacao/transacao'
import Resumo from '../../components/Resumo/Resumo'
import { getItem } from '../../utils/storage'
import filterIcon from '../../assets/filtrar_icon.svg'
import dateUpArrow from '../../assets/data_up_arrow.svg'
import fakedata from '../../utils/fakedata'
import { useEffect, useState } from 'react'

export default function Main() {
    // const token = getItem('token')
    const [deleteBoxOpen, setDeleteBoxOpen] = useState(false)



    return (
        <div className='body-clean'>
            <Header
                token='token'
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
