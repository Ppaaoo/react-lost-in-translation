import { addTranslation } from "../api/translation"
import TranslationForm from "../components/Translation/TranslationForm"
import withAuth from "../hoc/withAuth"
import { storageSave } from "../utils/storage"
import { useUser } from "../context/UserContext"
import { STORAGE_KEY_USER } from "../const/storageKey"
import { useState } from "react"

const Translate = () => {
    const {user, setUser} = useUser()
    const [translationArray, setTranslationArray] = useState([])

    const handleTranslateClicked = async (translation) => {
        setTranslationArray([...translationArray, {
            id: translationArray.length,
            value: translation.split('')
        }])

        console.log(`Not empty? ${translationArray}`)
        const [error, updatedUser] = await addTranslation(user, translation)

        if(error === null) {
            storageSave(STORAGE_KEY_USER, updatedUser)
            setUser(updatedUser)
        }
         console.log('Error', error)
         console.log('Result', updatedUser)
    }

    return (
        <div className="text-center bg-gray-50 text-gray-800 pt-8 px-6 h-screen">
            <h1 className="text-5xl font-bold mt-0 mb-6">Translate</h1>
            <div id="translation">
                <TranslationForm onTranslate={handleTranslateClicked}/>
            </div>
            <div>
                {(translationArray[0]?.value !== undefined) ? translationArray[0].value.map((currentChar, index) => <img key={index} src={`img/individual_signs/${currentChar}.png`} alt={currentChar}/>) : ""}
            </div>
        </div>
    )
}
export default withAuth(Translate)