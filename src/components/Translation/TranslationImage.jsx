const TranslationImage = ({name, image}) => {
    return (
        <div>
            <img src={image} alt={name} width="55"/>
        </div>
    )
}

export default TranslationImage