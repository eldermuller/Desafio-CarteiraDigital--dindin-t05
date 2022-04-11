import './styles.css';
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../../utils/storage';



function SignIn() {
    const navigate = useNavigate()
    const [usuarioInfo, setUsuarioInfo] = useState({
        id: null,
        name: '',
        email: ''
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dataWarning, setDataWarning] = useState('')

    useEffect(() => {
        const token = getItem('token')
        if (token) { navigate('/main') }
    })

    function handleToSignUp() {
        navigate('/signup')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!email || !password) {
            setDataWarning('Favor preencher todos os campos');

            setTimeout(() => {
                setDataWarning('')
            }, 3000)
            return
        }

        try {
            const response = await api.post('/login', {
                email,
                password
            });

            //setUsuarioInfo precisa ser realizado na página Main. Preciso mandar o response.data.info pra ele
            //Posso mandar pelo localStorage, ou posso usar uma funcção como prop de alguma forma

            const token = response.data.token
            setItem('token', token)

        } catch (error) {
            setDataWarning(error.response.data)
            return console.log(error.response.status);
        }

        navigate('/main')
    }

    return (
        <div className='body-image'>
            <Header />
            <div className='container-sign-in'>
                <div className='left-container'>
                    <h1>Controle suas <span>finanças</span>, sem planilha chata</h1>
                    <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
                    <button
                        className='btn-to-sign-up'
                        onClick={handleToSignUp}
                    >Cadastre-se</button>
                </div>
                <div className='right-container'>
                    {dataWarning &&
                        <div className='data-warning-sign-in'>
                            {dataWarning}
                        </div>
                    }
                    <form
                        className='right-container-form form-n-modal'
                        onSubmit={handleSubmit}
                    >
                        <h3>Login</h3>
                        <div className='input-label'>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                id='email'
                                name='email'
                                type='text'
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
                        <button className='btn-entrar'>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
