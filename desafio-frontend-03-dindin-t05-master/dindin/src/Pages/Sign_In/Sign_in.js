import './styles.css';
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useState } from 'react';

function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleToSignUp() {
        navigate('/signup')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let missingData = 0

        if (!email) { missingData = 1 }
        if (!password) { missingData += 2 }
        if (missingData === 1) { return console.log('Favor preencher o email'); }
        if (missingData === 2) { return console.log('Favor preencher a senha'); }
        if (missingData === 3) { return console.log('Favor preencher o email e a senha'); }

        try {
            // const test = await api.get('/')
            // console.log(test.data);
            //código para testar a api assim que tiver
            // const response = await api.post('/', {
            //     email,
            //     password
            // })
            console.log('wait');

        } catch (error) {
            console.log(error.message);
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
                <form
                    className='right-container form-n-modal'
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
    );
}

export default SignIn;
