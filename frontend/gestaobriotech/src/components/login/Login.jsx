import './Login.css'
import simboloBriotech from '../../../public/simbolo-briotech.png'
import simboloCatolica from '../../../public/simbolo-catolica.png'
import simboloUcbBiotec from '../../../public/simbolo-ucb-biotec.png'

function Login(){
    return(
        <>
        <section className="container-login">
            <div className="inner-login">
                <div className='div-img-briotech'>
                    <img src={simboloBriotech} alt="simbolo-briotech" className='img-briotech' />
                </div>    
                <div className='login-title'>
                    <p className=''>Gestão <span>Briotech</span></p>
                </div>
                <div>
                    <form action="" className='form-login'>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Senha</label>
                            <input type="text" />
                        </div>
                    </form>
                </div>
                <div className='div-login-button'>
                    <button className='button-padrao'>Entrar</button>
                </div>
            </div>

            <div className='div-img-biotec'>
                <img src={simboloUcbBiotec} alt="simbolo-ucb-biotec" />
            </div>
            <div className='div-img-catolica'>
                <img src={simboloCatolica} alt="simbolo-ucb" />
            </div>
        </section>
        </>
    )
}

export default Login