import { createHeaders } from ".";

const APIURL = process.env.REACT_APP_API_URL

export const addTranslation = async (user, translation) => {
    try {
        if(translation !== '') {
            const response = await fetch(`${APIURL}/${user.id}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({translations: [...user.translations, translation]})
            })
            if(!response.ok) {
                throw new Error('Could not update translations')
            }
            const result = await response.json()
            return [null, result]
        } else {
            alert('You need to translate something')
            throw new Error('Nothing to translate')
        }
    } catch (error) {
        return [error.message, null]
    }
}

export const clearTranslationHistory = async (userId) => {
    try {
        const response = await fetch(`${APIURL}/${userId}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({translations: []})
        })
        if(!response.ok) {
            throw new Error('Could not delete orders')
        }
        const result = await response.json()
        return [null, result]
    } catch (error) {
        return [error.message, null]
    }
}