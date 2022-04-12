import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import { useEffect, useState } from 'react'
import downArrowSelect from '../../assets/down_arrow.svg'
import api from '../../services/api'
import { getItem } from '../../utils/storage'

export default function AddRegister({ showAddRegister, setShowAddRegister }) {
    const [entryType, setEntryType] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const token = getItem('token')
    const [showCategoryList, setShowCategoryList] = useState(false)
    const [form, setForm] = useState({
        tipo: 'entrada',
        valor: '',
        categoria: '',
        data: '',
        descricao: ''
    })

    function fetchCategoryList() {
        const fakeArray = ['alimentação', 'contas', 'lazer', 'fakeArray']

        setCategoryList([...fakeArray])
    }

    function openCategoryList() {
        fetchCategoryList()
        setShowCategoryList(!showCategoryList)
        console.log('aguardando pra baixar a endpoint mais tarde');
    }

    function entryTypeEntrada() {
        setEntryType(true)
        setForm({ ...form, tipo: 'entrada' })
        console.log(form.tipo);
        console.log('OLHA O BUGUEEEE');
    }

    function entryTypeSaida() {
        setEntryType(false)
        setForm({ ...form, tipo: 'saida' })
        console.log(form.tipo);
        console.log('OLHA O BUGUEEEE');
    }

    function handleValue(e) {

        setForm({ ...form, valor: e })
    }

    function handleFormatValue(e) {
        if (!e) { return }

        const rawValue = (((parseInt(e, 10)) / 100).toFixed(2)).toString()
        setForm({ ...form, valor: rawValue.replace('.', ',') })
    }

    function handleSelectCategory(cat) {
        setForm({ ...form, categoria: cat })
        setShowCategoryList(false)
    }

    function handleDate(e) {

        if (form.data.length >= 6) {
            return setForm({ ...form, data: e.slice(1) })
        }

        setForm({ ...form, data: e })
    }

    function handleDateFormat(e) {
        if (!e) { return }

        const newDateString = `${e.slice(0, 2)}/${e.slice(2, 4)}/${e.slice(4)}`

        setForm({ ...form, data: newDateString })
    }

    return (
        <>
            {showAddRegister &&
                <div className='container-add-register'>
                    <form className='add-register-form'>
                        <div className='form-header'>
                            <h1>Adicionar Registro</h1>
                            <img
                                src={closeBtn}
                                className='close-btn'
                                onClick={() => setShowAddRegister(false)}
                            />
                        </div>
                        <div className='btn-form-div'>
                            <button
                                type='button'
                                className='entrada-btn'
                                onClick={() => entryTypeEntrada()}
                                style={entryType
                                    ? { backgroundColor: 'rgb(58, 159, 241)' }
                                    : { backgroundColor: 'rgb(185, 185, 185)' }}
                            >
                                Entrada</button>
                            <button
                                type='button'
                                className='saida-btn'
                                onClick={() => entryTypeSaida()}
                                style={entryType
                                    ? { backgroundColor: 'rgb(185, 185, 185)' }
                                    : { backgroundColor: 'rgb(255, 87, 107)' }}
                            >
                                Saída</button>
                        </div>
                        <div className='form-content'>
                            <label htmlFor='valor'>Valor</label>
                            <input
                                id='valor'
                                name='valor'
                                type='text'
                                value={form.valor}
                                onChange={(e) => handleValue(e.target.value)}
                                onBlur={(e) => handleFormatValue(e.target.value)}
                            />
                            <div className='category-select-box'>
                                <label htmlFor='categoria'>Categoria</label>
                                <div
                                    id='categoria'
                                    name='categoria'
                                    className='select-box'
                                >
                                    {form.categoria}
                                </div>

                                <img
                                    src={downArrowSelect}
                                    onClick={openCategoryList}
                                    className='down-arrow-select'
                                />
                                {showCategoryList &&
                                    <ul
                                        className='category-list'
                                    >
                                        {categoryList.map((category) => (
                                            <li
                                                onClick={(e) => handleSelectCategory(e.target.textContent)}
                                                className='li-category'
                                            >{category}</li>
                                        ))}

                                    </ul>
                                }
                            </div>
                            <label htmlFor='data'>Data</label>
                            <input
                                id='data'
                                name='data'
                                type='text'
                                value={form.data}
                                onChange={(e) => handleDate(e.target.value)}
                                onBlur={(e) => handleDateFormat(e.target.value)}
                            />
                            <label htmlFor='descricao'>Descrição</label>
                            <textarea
                                id='descricao'
                                name='descricao'
                                type='text'
                                value={form.descricao}
                                className='descricao-area'
                                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                            />
                        </div>
                        <div className='btn-div'>
                            <button
                                className='submit-btn'
                            >Confirmar</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}