import { useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import AuthForm, { Auth } from "../../components/AuthForm"
import api from "../../services/api"

interface UserToken {
    profile: string
    user: string
}

function Login(){
    const navigate = useNavigate()
    async function handleLogin(auth: Auth) {
        try {
            const { data } = await api.post('/security/login', auth)
            const decodedToken = jwtDecode(data.accessToken) as UserToken
            localStorage.setItem("profile", decodedToken.profile)
            localStorage.setItem("user", decodedToken.user)
            localStorage.setItem("accessToken", data.accessToken)
            navigate("/home")
        } catch (err) {
            alert("Erro na criação de usuário!")
        }
    }

    return <AuthForm 
    authFormeTitle='Faça o login e começe a usar!'
    subimitFormButtonText='Entrar'
    linkTitle='Não possui conta? Crie uma agora!'
    submitFormButtonAction={handleLogin}
    routeName='/singup'
    />
}

export default Login