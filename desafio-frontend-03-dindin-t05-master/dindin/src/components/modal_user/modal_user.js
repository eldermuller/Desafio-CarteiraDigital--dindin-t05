import './styles.css'
import closeBtn from '../../assets/close_btn.svg'
import { useState } from 'react'
import api from '../../services/api'

export default function UserModal({ setShowModalUser, user, setUser, token }) {
    const [form, setForm] = useState({
        name: user.nome,
        email: user.email,
        password: '',
        passwordConfirmation: ''
    })
    const [updatingUser, setUpdatingUser] = useState({
        name: user.nome,
        email: user.email,
        password: ''
    })
    const [dataWarning, setDataWarning] = useState('')

    function handleErrorMessage(msg) {
        setDataWarning(msg)

        setTimeout(() => {
            setDataWarning('')
        }, 3000)
        return
    }

    async function updateUser(res, req) {

        try {
            const response = await api.put('/usuario', {
                ...updatingUser
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response.data);
        } catch (error) {
            handleErrorMessage(error.response.data.message)
            return res.status(400).json(error.response.data.message)
        }
    }

    function handleSubmitEditUser(e) {
        e.preventDefault()

        if (form.password !== form.passwordConfirmation) {
            handleErrorMessage('Senhas não conferem');
            return;
        }

        setUser({
            ...user,
            nome: form.name,
            email: form.email
        })

        setUpdatingUser({
            name: user.nome,
            email: user.email,
            password: form.password
        })

        updateUser()
    }

    return (
        <div className='container-user'>
            <form
                className='user-form'
                onSubmit={handleSubmitEditUser}
            >
                <div className='form-header'>
                    <h1>Editar Perfil</h1>
                    <img
                        src={closeBtn}
                        className='close-btn'
                        onClick={() => setShowModalUser(false)}
                    />
                </div>
                {dataWarning &&
                    <div
                        className='data-warning-user-modal'
                    >
                        {dataWarning}
                    </div>
                }
                <div className='form-content'>
                    <label htmlFor='nome'>Nome</label>
                    <input
                        id='nome'
                        name='nome'
                        type='text'
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        type='text'
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <label htmlFor='senha'>Senha</label>
                    <input
                        id='senha'
                        name='senha'
                        type='password'
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <label htmlFor='confirmacao-de-senha'>Confirmação de Senha</label>
                    <input
                        id='confirmacao-de-senha'
                        name='confirmacao-de-senha'
                        type='password'
                        value={form.passwordConfirmation}
                        onChange={(e) => setForm({ ...form, passwordConfirmation: e.target.value })}
                    />
                </div>
                <div className='btn-div'>
                    <button
                        className='submit-btn'
                    >Confirmar</button>
                </div>
            </form>
        </div>
    )
}