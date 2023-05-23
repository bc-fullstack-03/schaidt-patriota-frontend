import AuthForm from "../../components/AuthForm"

function Login(){
    return <AuthForm 
    authFormeTitle='Faça o login e começe a usar!'
    subimitFormButtonText='Entrar'
    linkTitle='Não possui conta? Crie uma agora!'
    submitFormButtonAction={() => {}}
    routeName='/singup'
    />
}

export default Login