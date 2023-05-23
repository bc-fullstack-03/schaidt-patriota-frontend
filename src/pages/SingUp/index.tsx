import { useNavigate } from "react-router-dom"
import AuthForm, {Auth} from "../../components/AuthForm"
import api from "../../services/api"

function SingUp(){
    const navigate = useNavigate()
    async function handleRegister(auth: Auth) {
        try {
            await api.post('/security/register', auth)
            navigate("/")
        } catch (err) {
            alert("Erro na criação de usuário!")
        }
    }


    return <AuthForm 
    authFormeTitle='Faça o cadastro e começe a usar'
    subimitFormButtonText='Cadastrar'
    linkTitle='Tem uma conta? Faça o login!'
    submitFormButtonAction={handleRegister}
    routeName='/'
    />
}

export default SingUp