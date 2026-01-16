import { Link } from 'react-router-dom'
import './AddTask.css'
import { useState } from 'react';
import axios from 'axios'
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddTask() {
    const [titulo, setTitulo] = useState();
    const [descricao, setDescricao] = useState();
    const [prazo, setPrazo] = useState();

    const token = localStorage.getItem("token")

    function handleSubmit() {
    
        if(!titulo) {
            alert("coloque um titulo na atividade!")
        }else{
            axios.post('http://localhost:3001/atividades', {titulo, descricao, prazo}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => console.log(res.data))
            .catch(error => console.log("Erro POST forms atividade", error))
            alert("Atividade criada com sucesso, volte para o dashboard para conferir o quadro atualizado!")
        }
    }

    return(
        <>
        <section className="container-addTask">
            <div className='inner-addTask'>
                <h3>Preencha para adicionar a atividade...</h3>
                <form className='addTask-form' onSubmit={handleSubmit}>
                    <div>
                        <label>Titulo</label>
                        <input type="text" onChange={e => setTitulo(e.target.value)} id='titulo'/>
                    </div>
                    <div>
                        <label>Descrição</label>
                        <textarea onChange={e => setDescricao(e.target.value)} id='descricao'/>
                    </div>
                    <div>
                        <label>Prazo</label>
                        <input type="text" placeholder='Ex: 01/01/2026' onChange={e => setPrazo(e.target.value)} id='prazo'/>
                    </div>
                    <div>
                        <button type='submit' className='addTask-button button-padrao'>Criar atividade</button>
                    </div>
                </form>
            </div>
        </section>
        
        <div className="div-goBack">
            <FontAwesomeIcon icon={faAngleLeft} />
            <Link className="goBack-button" to='/dashboard'>Voltar</Link>
        </div>
        </>
    )
}

export default AddTask