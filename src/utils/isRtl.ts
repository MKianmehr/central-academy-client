const rltLocales: string[] = ["fa"]

const isRtl = (locale: string) => {
    return rltLocales.some((rtlLocale) => {
        return rtlLocale === locale
    })
}

export default isRtl