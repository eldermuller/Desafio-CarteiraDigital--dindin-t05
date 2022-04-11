import './styles.css'

export default function Resumo() {
    return (
        <div className='resumo'>
            <div className='resumo-card'>
                <strong>Resumo</strong>
                <div className='entrada-div'>
                    <span className='entrada-span'>Entradas</span>
                    <span className='entrada-value-span'>R$ 200,00</span>
                </div>
                <div className='saida-div'>
                    <span className='saida-span'>Saídas</span>
                    <span className='saida-value-span'>R$ 70,50</span>
                </div>
                <div className='short-horizontal-line'></div>
                <div className='saldo-div'>
                    <span className='saldo-span'>Saldo</span>
                    <span className='saldo-value-span'>R$ 129,50</span>
                </div>
            </div>
            <button className='resumo-btn'>Adicionar Registro</button>
        </div>
    )
}