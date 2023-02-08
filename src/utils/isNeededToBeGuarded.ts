const protectedPages: string[] = []

const isNeededToBeGuarded = (route: string): boolean => {
    if (route.startsWith('/instructor')) return true
    if (route.startsWith('/course')) return true

    const isProtected = protectedPages.some((page) => {
        return page === route
    })
    if (isProtected) return true
    return false
}