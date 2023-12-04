import { useState } from "react"

const Navigation = () => {
    const [showLogin, setShowLogin] = useState(false)

    const showWindow = () => {
        setShowLogin(!showLogin)
    }

    return (
      <div>
        <nav className = "nav">
            <a href = "/" className ="Logo"> LOGO </a>
            <ul>
                <li>
                    <a href = "/buchsuchen"> Buchsuchen </a>
                    <a href = "/buchanlegen"> Buchanlegen </a>
                    <a onClick = {showWindow}>Login</a>
                </li>
            </ul>
        </nav>
     </div>
    )
}

export default Navigation