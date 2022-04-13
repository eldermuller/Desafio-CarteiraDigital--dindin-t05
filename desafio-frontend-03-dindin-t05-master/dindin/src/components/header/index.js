import './styles.css'
import logo from '../../assets/logo.svg'
import userIcon from '../../assets/user_icon.svg'
import unlogBtn from '../../assets/unlog_btn.svg'
import { clearStorage } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'


export default function Header({ token, userName }) {
    const navigate = useNavigate()

    function LogOff() {
        clearStorage()
        navigate('/')
        return
    }

    return (
        <header>
            <div className='header-logo'>
                <img src={logo} alt='logo' />
                <h2>Dindin</h2>
            </div>
            {token &&
                <div className='header-usuario'>
                    <img src={userIcon} alt='User Icon' />
                    <span>{userName}</span>
                    <img
                        src={unlogBtn}
                        alt='Exit'
                        className='log-off-btn'
                        onClick={LogOff}
                    />
                </div>
            }
        </header>
    )
}
