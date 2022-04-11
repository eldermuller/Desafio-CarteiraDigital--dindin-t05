import './styles.css'
import logo from '../../assets/logo.svg'
import userIcon from '../../assets/user_icon.svg'
import unlogBtn from '../../assets/unlog_btn.svg'


export default function Header({ token }) {
    return (
        <header>
            <div className='header-logo'>
                <img src={logo} alt='logo' />
                <h2>Dindin</h2>
            </div>
            {token &&
                <div className='header-usuario'>
                    <img src={userIcon} alt='User Icon' />
                    <span>Nome do Usuário</span>
                    <img src={unlogBtn} alt='Exit' />
                </div>
            }
        </header>
    )
}
