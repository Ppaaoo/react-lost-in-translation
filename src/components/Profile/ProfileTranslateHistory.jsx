import ProfileTranslateHistoryItem from "./ProfileTranslateHistoryItem"

const ProfileTranslateHistory = ({ translations }) => {

    const translationList = translations.map(
        (translation, index) => <ProfileTranslateHistoryItem key={index + '-' + translation} translation={translation}/>)

    return (
        <div>
            <div class="grid grid-cols-1 place-content-center">
                <h3 class="text-lg font-bold mt-8">Your translation history:</h3>
                <div>
                    {translationList.length === 0 && <p>Your translation history is empty</p>}
                    {translationList}
                </div>
            </div>
        </div>
    )
}
export default ProfileTranslateHistory