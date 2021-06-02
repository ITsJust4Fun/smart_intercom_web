import React from 'react'

let dispatch: React.Dispatch<React.SetStateAction<boolean>> = (value: React.SetStateAction<boolean>) => void {}
const AuthContext = React.createContext<[boolean , React.Dispatch<React.SetStateAction<boolean>>]>([false, dispatch])

function useAuth() {
    const context = React.useContext(AuthContext)

    if (!context) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }

    return context
}

function AuthProvider(props: any) {
    const [auth, setAuth] = React.useState(false)
    const value = React.useMemo(() => [auth, setAuth], [auth])
    return <AuthContext.Provider value={value} {...props} />
}

export { AuthProvider, useAuth }
