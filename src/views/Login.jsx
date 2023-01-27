import LoginForm from "../components/Login/LoginForm.jsx"

const Login = () => {
    return (
        <div class="text-center bg-gray-50 text-gray-800 py-20 px-6 h-screen">
            <div>
                <h1 class="text-5xl font-bold mt-0 mb-6">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login