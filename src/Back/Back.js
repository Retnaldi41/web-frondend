import React from 'react';
import Footer from './Footer';
import Main from './Main';
import Nav from './Nav';
import Side from './Side';
import { Redirect } from 'react-router-dom';

const Back = () => {
    if (sessionStorage.getItem('token') !== 'ahdshfhsjfiajsofjsdhf') {
        return <Redirect to='/login' />
    }

    return (
        <body>           
                    <div className="row">
                        <div>
                            <Nav />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <Side />
                        </div>
                        <div>
                            <Main />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <Footer />
                        </div>
                    </div>                
            

        </body>
    );
}

export default Back;
