import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Usage:
function App() {
    return (
        <div>
            <Welcome name="Alice" />
            <Welcome name="Bob" />
            <Welcome name="Charlie" />
        </div>
    );
}

export default App
