import { clearTranslationHistory } from "../../api/translation"
import { STORAGE_KEY_USER } from "../../const/storageKey"
import { useUser } from "../../context/UserContext"
import { storageDelete, storageSave} from "../../utils/storage"

const ProfileActions = () => {

    const {user, setUser} = useUser()

    const handleLogoutClick = () => {
        if(window.confirm('Are you sure?')) {
            storageDelete(STORAGE_KEY_USER)
            setUser(null)
        }
    }

    const handleClearHistoryClick = async () => {
        if(!window.confirm('Are you sure? \nThis cannot be undone')) {
            return
        }
        const [clearError] = await clearTranslationHistory(user.id)

        if(clearError !== null) {
            
            return
        }
        const updatedUser = {
            ...user,
            translations: []
        }
        storageSave(STORAGE_KEY_USER, updatedUser)
        setUser(updatedUser)
    }
    return (
        <div>
            <button onClick={handleClearHistoryClick} type="button" class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg 
                focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out my-2 mx-2">
                    Clear translation history</button>
            <button onClick={handleLogoutClick} data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md 
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out my-2 mx-2">
                    Logout</button>
        </div>

    )
}
export default ProfileActions