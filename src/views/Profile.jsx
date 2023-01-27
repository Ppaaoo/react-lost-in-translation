import { useEffect } from "react"
import { userById } from "../api/user"
import ProfileActions from "../components/Profile/ProfileActions"
import ProfileHeader from "../components/Profile/ProfileHeader"
import ProfileTranslateHistory from "../components/Profile/ProfileTranslateHistory"
import { STORAGE_KEY_USER } from "../const/storageKey"
import { useUser } from "../context/UserContext"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"

const Profile = () => {

    const {user, setUser} = useUser()

    useEffect(() => {
        const findUser = async () => {
            const [error, latestUser] = await userById(user.id)
            if(error === null) {
                storageSave(STORAGE_KEY_USER, latestUser)
                setUser(latestUser)
            }
        }
        findUser()
    }, [setUser, user.id])

    return (
        <div class="text-center bg-gray-50 text-gray-800 pt-8 px-6 h-screen">
            <div>
                <h1 class="text-5xl font-bold mt-0 mb-6">Profile</h1>
                <ProfileHeader username={user.username} />
                <ProfileActions />
                <ProfileTranslateHistory translations={user.translations} />
            </div>
        </div>
    )
}

export default withAuth(Profile)