import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const sideBarElements = ['Home', 'Dashboard', 'Text Summarizer', 'Text to image'];
  const [activezElement, setActiveElement] = useState(null);


  return (
    <div className="d-flex flex-column flex-shrink-0 p-3" style={{ width: "280px", height: "100vh", backgroundColor: 'black' }}> <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> <svg className="bi pe-none me-2" width="40" height="32" aria-hidden="true"><use xlink:href="#bootstrap"></use></svg> <span className="fs-4">Sidebar</span> </Link> <hr /> <ul className="nav nav-pills flex-column mb-auto">
      {
        sideBarElements.map((ele, i) => <li className='nav-item' onClick={() => setActiveElement(i)} key={i}>
          <Link to="/" className={`nav-link ${activezElement === i ? 'active' : ''}`} aria-current="page"> <svg className="bi pe-none me-2" width="16" height="16" aria-hidden="true"><use xlink:href="#home"></use></svg>
            {ele}
          </Link> </li>)
      }
    </ul> <hr /> <div className="dropdown" /> <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"> <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> <strong>mdo</strong> </Link> <ul className="dropdown-menu dropdown-menu-dark text-small shadow"> <li><Link className="dropdown-item" href="#">New project...</Link></li> <li><Link className="dropdown-item" href="#">Settings</Link></li> <li><Link className="dropdown-item" href="#">Profile</Link></li> <li><hr className="dropdown-divider" /></li> <li><Link className="dropdown-item" href="#">Sign out</Link></li> </ul> </div>
  )
}
