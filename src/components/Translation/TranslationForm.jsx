import { useForm } from "react-hook-form"

const TranslationForm = ({ onTranslate }) => {
    const {register, handleSubmit} = useForm()
    const onSubmit = ({translation}) => {onTranslate(translation)}

    return (
        <div className="grid grid-cols- gap-4 place-content-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 w-72">
                    <textarea {...register('translation')} placeholder="Hello!" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="translation" rows="3">
                        </textarea>
                </div>
                <button type="submit" className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg 
                    focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out my-2 mx-2">
                    Translate</button>
            </form>
        </div>
    )
} 
export default TranslationForm