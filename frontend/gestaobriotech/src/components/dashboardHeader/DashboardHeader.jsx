import './DashboardHeader.css'
import simboloBriotech from '../../assets/simbolo-briotech.png'
import { Link } from 'react-router-dom'

function DashboardHeader() {
    return(
        <>
        <section className='container-header'>
            <div className='inner-header'>
                <div className='div-img-logo2'>
                    <img src={simboloBriotech} alt="" />
                    <h3>Gestão <span>Briotech</span></h3>
                </div>
                <div className='div-button-add'>   
                    <Link className='add-button' to='/add_task'>Adicionar tarefa</Link>
                </div>
            </div>
        </section>
        </>
    )
}

export default DashboardHeader