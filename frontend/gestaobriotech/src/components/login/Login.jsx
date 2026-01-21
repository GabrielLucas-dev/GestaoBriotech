import "./Login.css";
import simboloBriotech from "../../assets/simbolo-briotech.png";
import simboloCatolica from "../../assets/simbolo-catolica.png";
import simboloUcbBiotec from "../../assets/simbolo-ucb-biotec.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
//   const [sucesso, setSucesso] = useState(false);

  const navigate = useNavigate();

  // const [token, setToken] = useState()

  function handleSubmit(e) {
    e.preventDefault();

    //apenas manda a informação para o backend tratar diretamente com o banco de dados
      axios
        .post("http://localhost:3001/login", {email, senha})
        .then((res) => {
            console.log(res.data)

            localStorage.setItem("token", res.data.token)
                
            // TESTE
            // setToken("token", res.data.token)
            // console.log("ESTE É O FUCKING TOKEN: ", token)

            console.log("TOKEN SALVO:", localStorage.getItem('token'));
            // setSucesso(true);
            navigate('/dashboard')          
        })
        .catch((error) => {
            alert("Usuário ou senha incorretos!")
            console.error(error)
        });
  }

  return (
    <>
        <section className="container-login">
          <div className="inner-login">
            <div className="div-img-briotech">
              <img
                src={simboloBriotech}
                alt="simbolo-briotech"
                className="img-briotech"
              />
            </div>
            <div className="login-title">
              <p className="">
                Gestão <span>Briotech</span>
              </p>
            </div>
            <div>
              <form className="form-login" onSubmit={handleSubmit}>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Senha</label>
                  <input
                    type="password"
                    placeholder="Senha"
                    id="senha"
                    autoComplete="off"
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <div className="div-login-button">
                  <button className="button-padrao" type="submit">
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="div-img-biotec">
            <img src={simboloUcbBiotec} alt="simbolo-ucb-biotec" />
          </div>
          <div className="div-img-catolica">
            <img src={simboloCatolica} alt="simbolo-ucb" />
          </div>
        </section>
    </>
  );
}

export default Login;
