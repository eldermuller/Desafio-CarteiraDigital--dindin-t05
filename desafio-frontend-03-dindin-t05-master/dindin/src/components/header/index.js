import './styles.css'
import logo from '../../assets/logo.svg'


export default function Header() {
    return (
        <header>
            <img src={logo} />
            <h2>Dindin</h2>
        </header>
    )
}
