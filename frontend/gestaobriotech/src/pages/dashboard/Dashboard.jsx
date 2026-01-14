import { useState } from 'react';
import DashboardHeader from '../../components/dashboardHeader/DashboardHeader';
import './Dashboard.css'
import axios from 'axios'
import { useEffect } from 'react';

function Dashboard() {

    const [atividades, setAtividades] = useState([]);
    // const [estaConcluida, setEstaConcluida] = useState()

    useEffect(() => {
        axios.get("http://localhost:3001/atividades")
        .then(res => {
            setAtividades(res.data)
            // setEstaConcluida(res.data)
        })
        .catch(error => console.log("Erro ao pegar atividades", error))
    
    }, [])

    const handleRemove = async (id_atividade) => {
        try{
        await axios.delete("http://localhost:3001/atividades/"+id_atividade)

        setAtividades(prev =>
            prev.filter(item => item.id_atividade !== id_atividade)
        );
        } catch(error){
            console.log("o erro ta aqui? ", error)
        }
    }

    const handleConclude =  async (id_atividade, esta_concluida) => {    
        axios.put("http://localhost:3001/atividades/"+id_atividade, {esta_concluida})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

    const atividadesAbertas = atividades.length;

    return(
        <>
        <DashboardHeader />

        <section className='container-tasks'>
            <h2>{
                atividadesAbertas > 0 
                ? `${atividadesAbertas} atividade(s) em aberto!`
                : "Nenhuma atividade em aberto..."
            }</h2>
    <div className='cards-flexbox'>
        {atividades.map((data, index) => {
            return(
                <div className='container-cards-atividades' key={index}>
                    <div className='card-atividades'>
                        <div className='card-infos'>
                            <h3>{data.titulo}</h3>
                            <p className='descricao'><strong>Descrição:</strong> {data.descricao} </p>
                            <p><strong>Criada em:</strong> {data.criada_em}</p>
                            <p><strong>Prazo:</strong> {data.prazo}</p>
                            <p><strong>Criada por:</strong> {data.criada_por}</p>
                        </div>
                        <div>
                            {/*
                            ESTA FUNCIONANDO MAS VOU DEIXAR COMENTADO POR ENQUANTO 
                             <p> esta concluida? 
                                {data.esta_concluida === 1 
                                ? "Atividade concluida"
                                :  "Atividade a ser concluida..." 
                                }
                            </p> */}
                            
                        </div>
                        <div className='card-actions'>
                            <button className='remover button-padrao' onClick={() => handleRemove(data.id_atividade)}>Remover</button>
                            <button className='concluir button-padrao' onClick={() => handleConclude(data.id_atividade)}>Concluir</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>

        </section>
        </>
    )
}

export default Dashboard