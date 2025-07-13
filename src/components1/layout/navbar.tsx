export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a 
          className="navbar-brand" 
          href="#"
        >
          Poké Router
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link active" 
                href="#team"
              >
                Team
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link active" 
                href="#pokemon-fights"
              >
                Pokemon Fights
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link active" 
                href="#calculator"
              >
                Calculator
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};