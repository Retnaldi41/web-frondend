import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios'
import "react-data-table-component-extensions/dist/index.css";

const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [gambar, setGambar] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const history = useHistory()
    const [isi] = Useget('/komersial')
    const location = useLocation();
    const id = location.state.id;

    useEffect(async () => {
        const res = await link.get('/komersial/' + id);
        // console.log(res)   
        setValue('jenis_komersial', res.data[0].jenis_komersial);
        setValue('fasilitas', res.data[0].fasilitas);
        setValue('harga', res.data[0].harga);
        setGambar(res.data[0].gambar_komersial)
    }, [id]);

    async function simpan(data) {
        if (data.gambar_komersial[0]) {
            const formData = new FormData()
            formData.append('gambar_komersial', data.gambar_komersial[0])
            const firstRespon = await axios.post("https://sihaq.com/photosano/komersial/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let datakomersial = {
                jenis_komersial: data.jenis_komersial,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_komersial: firstRespon.data.nama
            }

            if (pilihan) {
                let datakomersial = {
                    jenis_komersial: data.jenis_komersial,
                    harga: data.harga,
                    fasilitas: data.fasilitas,
                    gambar_komersial: gambar
                }

                const res = await link.put('/komersial/' + id, datakomersial)
                setPesan(res.data.message)
                setPilihan(true);
                history.push('/admin/komersial')

            } else {
                const res = await link.put(`/komersial/${id}`, datakomersial)
                setPesan(res.data.message)
                setPilihan(true);
            }
        } else {
            let datakomersial = {
                judul_komersial: data.jenis_komersial,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_komersial: gambar
            }

            const res = await link.put('/komersial/' + id, datakomersial)
            setPesan(res.data.message)
            setPilihan(true);
        }

        reset();
        setGambar('')
    }

    let no = 1;

    return (
        <main id="main" class="main">
            <div>
                <div className="row">
                    <h2>Data Kategori</h2>
                </div>
                <div className="row">
                    <p>{pesan}</p>
                </div>
                <div className="row">
                    <div className="col-4">
                        <form onSubmit={handleSubmit(simpan)}>
                            <div className="mb-3">
                                <label htmlFor="jenis_komersial" className="form-label">Jenis Komersial</label>
                                <input type="text" className="form-control" id="jenis_komersial" placeholder="jenis_komersial" {...register("jenis_komersial", { required: true })} />
                                {errors.jenis_komersial && <span>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar_komersial" className="form-label">Gambar Komersial</label>
                                <input type="file" className="form-control" id="gambar_komersial" placeholder="gambar_komersial" {...register("gambar_komersial", { required: true })} />
                            </div>
                            <div>
                                {
                                    gambar !== '' ? <img src={gambar} alt="" width="500" height="400" /> : ''
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fasilitas" className="form-label">Fasilitas</label>
                                <input type="text" className="form-control" id="fasilitas" placeholder="fasilitas" {...register("fasilitas", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="harga" className="form-label">Harga</label>
                                <input type="number" className="form-control" id="harga" placeholder="harga" {...register("harga", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" />
                                <Link className="btn btn-success" to={{
                                    pathname: "/admin/komersial"
                                }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Kategori;
