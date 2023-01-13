import React from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();

    const history = useHistory()

    function login(data) {
        let token = 'salah'
        if (data.username === 'admin_sano' && data.password === '12345678') {
            token = 'ahdshfhsjfiajsofjsdhf'
        }

        sessionStorage.setItem('token', token)

        reset()

        if (getToken() === 'ahdshfhsjfiajsofjsdhf') {
            history.push('/admin')
            window.location.reload()
        }
    }

    if (sessionStorage.getItem('token') === 'ahdshfhsjfiajsofjsdhf') {
        history.push('/admin')
        window.location.reload()
    }

    const getToken = () => (sessionStorage.getItem('token'))

    return (
        <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div class="d-flex justify-content-center py-4">
                                <a href="index.html" class="logo d-flex align-items-center w-auto">
                                    <img src="assets/img/logo.png" alt="" />
                                    <span class="d-none d-lg-block">Photosano</span>
                                </a>
                            </div>

                            <div class="card mb-3">

                                <div class="card-body">

                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Login Akun Admin</h5>
                                        <p class="text-center small">Username & Password </p>
                                    </div>

                                    <form class="row g-3 needs-validation" onSubmit={handleSubmit(login)}>

                                        <div class="col-12">
                                            <label for="yourUsername" class="form-label">Username</label>
                                            <div class="input-group has-validation">
                                                {/* <span class="input-group-text" id="inputGroupPrepend">@</span> */}
                                                <input type="text" class="form-control" id="yourUsername" required name="username" {...register("username", { required: true })}/>
                                                <div class="invalid-feedback">Please enter your username.</div>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <label for="yourPassword" class="form-label">Password</label>
                                            <input type="password" class="form-control" id="yourPassword" required name="password" {...register("password", { required: true })}/>
                                            <div class="invalid-feedback">Please enter your password!</div>
                                        </div>

                                        <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                <label class="form-check-label" for="rememberMe">Remember me</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">Login</button>
                                        </div>
                                    </form>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

        </div>
        // <div>
        //     <section className="vh-100" style={{ backgroundColor: 'coral' }}>
        //         <div className="container py-5 h-100">
        //             <div className="row d-flex justify-content-center align-items-center h-100">
        //                 <div className="card text-bg-primary mb-3" style={{ maxWidth: '25rem' }}>
        //                     <div className="card-body" style={{ borderRadius: '5rem' }}>
        //                         <div classname="wrap">
        //                         <div className="row mt-5">
        //                             <div className="mx-auto col-12">
        //                                 <form onSubmit={handleSubmit(login)}>
        //                                     <div className="form-group">
        //                                         <label htmlFor="username">Username</label>
        //                                         <input type="text" className="form-control" name="username" {...register("username", { required: true })} />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label htmlFor="password">Password</label>
        //                                         <input type="password" className="form-control" name="password" {...register("password", { required: true })} />
        //                                     </div>
        //                                     <div className="pt-2 mb-6">
        //                                         <button type="submit" className="btn btn-primary">Login</button>
        //                                     </div>
        //                                 </form>
        //                             </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </div>
    );
}

export default Login;
