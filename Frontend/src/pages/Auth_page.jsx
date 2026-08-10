import { useState } from "react";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";

const AuthPage = () => {
    const [login, setLogin] = useState(true);

    return (
        <div >
            {login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}
        </div>
    );
};
export default AuthPage;