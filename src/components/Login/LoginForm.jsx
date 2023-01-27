import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/user'
import { storageSave } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
import { STORAGE_KEY_USER } from '../../const/storageKey'
import { useUser } from '../../context/UserContext'

const usernameConfig = {
    required: true,
    minLength: 3,
}

const LoginForm = () => {
    //Hooks
    const {register, handleSubmit, formState: { errors }} = useForm()
    const {user, setUser} = useUser()
    const navigate = useNavigate()

    //Local state
    const [ loading, setLoading ] = useState(false)
    const [ apiError, setApiError ] = useState(null) //If something went wrong while logging in

    //Side effects
    useEffect(() => {
        if(user !== null) {
            navigate('profile')
        }
    }, [user, navigate])

    //Event handlers
    const onSubmit = async ({username}) => {
        setLoading(true)
        const [error, user] = await loginUser(username)
        if(error !== null) {
            setApiError(error)
        }
        if(user !== null) {
            storageSave(STORAGE_KEY_USER, user) //if successfully logged in, store user in local storage
            setUser(user)
        }
        setLoading(false)
    }

    //Render functions
    const errorMessage = (() => {
        if(!errors.username) {
            return null
        }
        if(errors.username.type === 'required') {
            return <span>Username is required</span>
        }
        if(errors.username.type === 'minLength') {
            return <span>Username is too short (min. 3 characters)</span>
        }
    })()

    return (
        <>
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                    <label htmlFor='username' class="form-label inline-block my-2.5 text-gray-700">
                        Username</label>
                    <input type="text" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid 
                    border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='John Doe'{...register("username", usernameConfig)} />
                </div>
            </div>
            { errorMessage }
            <div class="flex space-x-2 justify-center">
                <button type="submit" disabled={loading} data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md 
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Continue</button>
            </div>
            {loading && 
                <div class="flex justify-center items-center">
                    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span class="visually-hidden"></span>
                    </div>
                </div>}
            {apiError && <p>{apiError}</p>}
        </form>
        </>
    )
}

export default LoginForm