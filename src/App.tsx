import React from 'react'
import MainWindow from './MainWindow'
import './App.css'
import { AuthProvider } from './auth/AuthContext'

function App() {
    return (
        <AuthProvider>
            <MainWindow />
        </AuthProvider>
    )
}

export default App
