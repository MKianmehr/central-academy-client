const text = (textObject: { fa: string; en: string }, isEnglish: boolean) => {
    return isEnglish ? textObject.en : textObject.fa
}

export default text