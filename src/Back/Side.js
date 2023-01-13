import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const Side = () => {
    const { url } = useRouteMatch();

    return (
        <div>
            <aside id="sidebar" class="sidebar">

                <ul class="sidebar-nav" id="sidebar-nav">
                    <li class="nav-item">
                        <Link to={`${url}/booking`}>
                            <a class="nav-link">
                                <i class="bi bi-grid"></i>
                                <span>Booking</span>
                            </a>
                        </Link>
                    </li>{/* End Dashboard Nav -*/}                    

                    <li class="nav-item">
                        <Link to={`${url}/users`}>
                            <a class="nav-link">
                                <i class="bi bi-person"></i>
                                <span>User</span>
                            </a>
                        </Link>
                    </li>{/* End Dashboard Nav -*/}

                    <li class="nav-item">
                        <Link to={`${url}/client`}>
                            <a class="nav-link">
                                <i class="bi bi-person-video2"></i>
                                <span>Client</span>
                            </a>
                        </Link>
                    </li>

                    {/* <li class="nav-item">
                        <Link to={`${url}/agenda`}>
                            <a class="nav-link">
                                <i class="bi bi-menu-button-wide"></i>
                                <span>Agenda</span>
                            </a>
                        </Link>
                    </li>End Dashboard Nav - */}
                    
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                            <i class="bi bi-layout-text-window-reverse"></i><span>Pricelist</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to={`${url}/cosplay`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Cosplay</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${url}/group`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Group</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${url}/komersial`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Komersial</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${url}/potrait`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Potrait</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${url}/studio`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Studio</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`${url}/wedding`}>
                                    <a href="#">
                                        <i class="bi bi-circle"></i><span>Foto Wedding</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>{/* End Tables Nav -*/}                   

                </ul>

            </aside>{/* End Sidebar-*/}
            </div>
        // <div>
        //     <div className="card" style={{ width: '18rem' }}>
        //         <div className="card-header">
        //             Menu Aplikasi
        //         </div>
        //         <ul className="list-group list-group-flush">
        //             <Link to={`${url}/kategori`}>
        //                 {
        //                     (sessionStorage.getItem('level') === 'admin') ? <li className="list-group-item">Kategori</li> : ""
        //                 }
        //             </Link>
        //             <Link to={`${url}/menu`}>
        //                 {
        //                     (sessionStorage.getItem('level') === 'admin') ? <li className="list-group-item">Menu</li> : ""
        //                 }
        //             </Link>
        //             <Link to={`${url}/booking`}>

        //                 <li className="list-group-item">Booking</li>

        //             </Link>
        //             <Link to={`${url}/client`}>

        //                 <li className="list-group-item">Client</li>

        //             </Link>
        //             <Link to={`${url}/agenda`}>

        //                 <li className="list-group-item">Agenda</li>

        //             </Link>


        //                 <div className="dropdown">
        //                     <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        //                         PriceList
        //                     </button>
        //                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        //                     <Link to={`${url}/cosplay`}><li><a className="dropdown-item" href="#">Foto Cosplay</a></li></Link>
        //                     <Link to={`${url}/group`}><li><a className="dropdown-item" href="#">Foto Group</a></li></Link>
        //                     <Link to={`${url}/komersial`}><li><a className="dropdown-item" href="#">Foto Komersial</a></li></Link>
        //                     <Link to={`${url}/potrait`}><li><a className="dropdown-item" href="#">Foto Potrait</a></li></Link>
        //                     <Link to={`${url}/studio`}><li><a className="dropdown-item" href="#">Foto Studio</a></li></Link>
        //                     <Link to={`${url}/wedding`}><li><a className="dropdown-item" href="#">Foto Wedding</a></li></Link>                                                              
        //                     </ul>
        //                 </div>

        //             <Link to={`${url}/order`}>
        //                 {
        //                     ((sessionStorage.getItem('level') === 'admin') || (sessionStorage.getItem('level') === 'kasir')) ? <li className="list-group-item">Order</li> : ""
        //                 }
        //             </Link>
        //             <Link to={`${url}/detail`}>
        //                 {
        //                     ((sessionStorage.getItem('level') === 'admin') || (sessionStorage.getItem('level') === 'kasir') || (sessionStorage.getItem('level') === 'koki')) ? <li className="list-group-item">Order Detail</li> : ""
        //                 }
        //             </Link>
        //             <Link to={`${url}/user`}>
        //                 {
        //                     (sessionStorage.getItem('level') === 'admin') ? <li className="list-group-item">User Admin</li> : ""
        //                 }
        //             </Link>
        //         </ul>
        //     </div>
        // </div>
    );
}

export default Side;
