const Navigation = () => {
    return (
      <div>
        <nav className = "nav">
            <a href = "/" className ="Logo"> LOGO </a>
            <ul>
                <li>
                    <a href = "/buchsuchen"> Buchsuchen </a>
                    <a href = "/buchanlegen"> Buchanlegen </a>
                    <a href = "/anmelden"> Login </a>
                </li>
            </ul>
        </nav>
     </div>
    )
}

export default Navigation