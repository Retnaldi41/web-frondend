import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios'
import "react-data-table-component-extensions/dist/index.css";

const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [gambar, setGambar] = useState('');
    const [id, setIdwedding] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const history = useHistory()
    const [isi] = Useget('/wedding')


    async function simpan(data) {
        if (data.gambar_wedding[0]) {
            const formData = new FormData()
            formData.append('gambar_wedding', data.gambar_wedding[0])
            const firstRespon = await axios.post("https://sihaq.com/photosano/wedding/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let datawedding = {
                jenis_wedding: data.jenis_wedding,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_wedding: firstRespon.data.nama
            }

            if (pilihan) {
                const res = await link.post('/wedding', datawedding)
                setPesan(res.data.message)
                history.push('/admin/wedding')
            } else {
                const res = await link.put(`/wedding/${id}`, datawedding)
                setPesan(res.data.message)
                setPilihan(true);
            }
        } else {
            let datawedding = {
                judul_wedding: data.jenis_wedding,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_wedding: gambar
            }

            const res = await link.put('/wedding/' + id, datawedding)
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
                                <label htmlFor="jenis_wedding" className="form-label">Jenis Wedding</label>
                                <input type="text" className="form-control" id="jenis_wedding" placeholder="jenis_wedding" {...register("jenis_wedding", { required: true })} />
                                {errors.jenis_wedding && <span>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar_wedding" className="form-label">Gambar Wedding</label>
                                <input type="file" className="form-control" id="gambar_wedding" placeholder="gambar_wedding" {...register("gambar_wedding", { required: true })} />
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
                                    pathname: "/admin/wedding"
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
