import { useState } from 'react';
import DashboardHeader from '../../components/dashboardHeader/DashboardHeader';
import './Dashboard.css'
import axios from 'axios'
import { useEffect } from 'react';

function Dashboard() {

    const [atividades, setAtividades] = useState([]);
    // const [estaConcluida, setEstaConcluida] = useState()
    
    //pega o token gerado pelo JWT no login (token expira em 1h)
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get("http://localhost:3001/atividades", {
           //meu que autoriza que o axios a funcionar, empresta a chave do token a ele
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setAtividades(res.data)
            // setEstaConcluida(res.data)
        })
        .catch(error => console.error("Erro ao pegar atividades", error))
    }, [token]);

    const handleRemove = async (id_atividade) => {
        try{
        await axios.delete("http://localhost:3001/atividades/"+id_atividade, {
             headers:{
                Authorization: `Bearer ${token}`
            }
        })

        

        setAtividades(prev =>
            prev.filter(item => item.id_atividade !== id_atividade)
        );
        } catch(error){
            console.log("o erro ta aqui? ", error)
        }
    }

    const handleConclude =  async (id_atividade, esta_concluida) => {    
        axios.put("http://localhost:3001/atividades/"+id_atividade, {esta_concluida}, {
             headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

    const atividadesAbertas = atividades.length;

    // const handleAtividadesAbertas = () => {
    //     axios.get('/atividades')
    // }
    // const handleAtividadesConcluidas = () => {
    //     axios.get('/atividades_concluidas')
    //     .then(res =>  console.log(res.data))
    //     .catch(error => console.log(error))
    // }

    const [valorSelecionado, setValorSelecionado] = useState()
    const handleSelecao = (e) => {
        const novoValor = e.target.value;
        setValorSelecionado(novoValor);
        console.log(novoValor)

    //         if(valorSelecionado === "atividades-abertas"){
    //             axios.get('http://localhost:3001/atividades')
    //             .then(res => console.log(res.data))
    //             .catch(error => console.log(error))
    //         } else if(valorSelecionado === "atividades-concluidas"){
    //             axios.get('http://localhost:3001/atividades_concluidas')
    //             .then(res => console.log(res))
    //             .catch(error => console.log(error))
            // }
    }

    return(
        <>
        <DashboardHeader />

        <section className='container-tasks'>
            <h2>{
                atividadesAbertas > 0 
                ? `${atividadesAbertas} atividade(s) em aberto!`
                : "Nenhuma atividade em aberto..."
            }</h2>
            <div className='div-select'>
                <select name="select-atividades" value={valorSelecionado} onChange={handleSelecao}>
                    <option value="atividades-abertas">Atividades em aberto</option>
                    <option value="atividades-concluidas" >Atividades concluidas</option>
                </select>
            </div>
    <div className='cards-flexbox'>
        {Array.isArray(atividades) && atividades.map((data, atividade) => {
            
            return(
                <div className='container-cards-atividades' key={atividade.id_atividade}>
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