import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Nav = () => {
    const history = useHistory()

    function hapus() {
        sessionStorage.clear()
        history.push('/login')
    }

    return (
        <div>
            {/* ======= Header ======= */}
            <header id="header" className="header fixed-top d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-between">
                    <a href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt />
                        <span className="d-none d-lg-block">Photosano</span>
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn" />
                </div>            
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle " href="#">
                                <i className="bi bi-search" />
                            </a>
                        </li>                       
                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">                               
                                <span className="d-none d-md-block dropdown-toggle ps-2">Admin Sano</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">                                                                                             
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a onClick={hapus} className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right" />
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>

        // <div className="mt-2 mb-2">
        //     <nav className="navbar navbar-light bg-light justify-content-between">
        //         <Link to="/admin">
        //             <a className="navbar-brand">Dashboard Test</a>
        //         </Link>
        //         <li className="nav-item list-unstyled">{sessionStorage.getItem('email')}</li>
        //         <li className="nav-item list-unstyled">{sessionStorage.getItem('level')}</li>
        //         <button onClick={hapus} className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>

        //     </nav>

        // </div>
    );
}

export default Nav;
