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
    const [id, setIdstudio] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const history = useHistory()
    const [isi] = Useget('/studio')


    async function simpan(data) {
        if (data.gambar_studio[0]) {
            const formData = new FormData()
            formData.append('gambar_studio', data.gambar_studio[0])
            const firstRespon = await axios.post("https://sihaq.com/photosano/studio/upload.php", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            let datastudio = {
                jenis_studio: data.jenis_studio,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_studio: firstRespon.data.nama
            }

            if (pilihan) {
                const res = await link.post('/studio', datastudio)
                setPesan(res.data.message)
                history.push('/admin/studio')
            } else {
                const res = await link.put(`/studio/${id}`, datastudio)
                setPesan(res.data.message)
                setPilihan(true);
            }
        } else {
            let datastudio = {
                judul_studio: data.jenis_studio,
                harga: data.harga,
                fasilitas: data.fasilitas,
                gambar_studio: gambar
            }

            const res = await link.put('/studio/' + id, datastudio)
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
                                <label htmlFor="jenis_studio" className="form-label">Jenis studio</label>
                                <input type="text" className="form-control" id="jenis_studio" placeholder="jenis_studio" {...register("jenis_studio", { required: true })} />
                                {errors.jenis_studio && <span>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar_studio" className="form-label">Gambar studio</label>
                                <input type="file" className="form-control" id="gambar_studio" placeholder="gambar_studio" {...register("gambar_studio", { required: true })} />
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
                                    pathname: "/admin/studio"
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
