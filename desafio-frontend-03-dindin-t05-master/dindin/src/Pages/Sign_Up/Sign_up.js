import './styles.css';
import Header from '../../components/header';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';


export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [dataWarning, setDataWarning] = useState('')
    const navigate = useNavigate()

    async function handleSubmitSignUp(e) {
        e.preventDefault()

        if (!name || !email || !password || !passwordConfirmation) {
            setDataWarning('Todos os dados precisam ser preenchidos.')

            setTimeout(() => {
                setDataWarning('')
            }, 3000)
            return
        }

        if (password !== passwordConfirmation) {
            setDataWarning('A senha não confere.')

            setTimeout(() => {
                setDataWarning('')
            }, 3000)
            return
        }

        try {
            await api.post('/usuario', {
                name,
                email,
                password
            })

        } catch (error) {
            console.log(error);
        }

        navigate('/')
    }


    return (
        <div className='body-image'>
            <Header />
            <div className='container-sign-up'>
                {dataWarning &&
                    <div className='data-warning-div'>
                        {dataWarning}
                    </div>
                }
                <form
                    className='container-sign-up-form form-n-modal'
                    onSubmit={handleSubmitSignUp}
                >
                    <h3>Cadastre-se</h3>
                    <div className='input-label'>
                        <label htmlFor='name'>Nome</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-label'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-label'>
                        <label htmlFor='password'>Senha</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-label'>
                        <label htmlFor='password-confirmation'>Confirmação de senha</label>
                        <input
                            id='password-confirmation'
                            name='password-confirmation'
                            type='password'
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        ></input>
                    </div>
                    <button className='btn-cadastrar'>Cadastrar</button>
                    <Link to='/' className='link-to-sign-in'>Já tem cadastro? Clique aqui!</Link>
                </form>
            </div>
        </div>
    );
}