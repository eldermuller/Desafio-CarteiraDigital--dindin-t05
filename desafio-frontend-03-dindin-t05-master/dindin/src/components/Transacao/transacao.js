import './styles.css'
import editIcon from '../../assets/edit_icon.svg'
import deleteIcon from '../../assets/delete_icon.svg'
import { useState } from 'react'


export default function Transacao({ transactionData, deleteBoxOpen, setDeleteBoxOpen }) {

    const [localDeleteBox, setLocalDeleteBox] = useState(deleteBoxOpen)

    function handleDeleteConfirmation() {
        if (deleteBoxOpen) return;
        setDeleteBoxOpen(true);
        setLocalDeleteBox(true);
    }

    function handleDeleteCancel() {
        setDeleteBoxOpen(false)
        setLocalDeleteBox(false)
    }

    const tipoTransacao = () => {
        if (transactionData.tipo === 'entrada') {
            return true
        }
        if (transactionData.tipo === 'saida') {
            return false
        }
    }

    const valorFormatado = () => {
        const valor = (transactionData.valor / 100).toFixed(2)
        return valor.replace('.', ',')
    }


    return (
        <div>
            <div className='transaction-row'>
                <span
                    className='info-data info'
                >{transactionData.data}</span>
                <span
                    className='info-dia info'
                >{transactionData.diaDaSemana}</span>
                <span
                    className='info-descricao info'
                >{transactionData.descricao}</span>
                <span
                    className='info-categoria info'
                >{transactionData.categoria}</span>
                <span
                    className='info-valor info'
                    style={tipoTransacao() ? { color: 'rgb(123, 97, 255)' } : { color: 'rgb(250, 140, 16)' }}
                >{valorFormatado()}</span>
                <img
                    src={editIcon}
                    alt='edit'
                    className='edit-icon'
                />
                <img
                    src={deleteIcon}
                    alt='delete'
                    className='delete-icon'
                    onClick={handleDeleteConfirmation}
                    id='click-event'
                />
                {localDeleteBox &&
                    <div>
                        <div className='delete-confirmation'>
                            <span className='delete-question'>Apagar item?</span>
                            <div className='delete-confirmation-btns'>
                                <button
                                    className='sim-delete'
                                    onClick={handleDeleteCancel}
                                >
                                    Sim</button>
                                <button
                                    className='nao-delete'
                                    onClick={handleDeleteCancel}
                                >
                                    Não</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className='horizontal-line'></div>
        </div >
    )
}