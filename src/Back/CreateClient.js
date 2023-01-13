import React, { useState, useEffect } from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../Hook/useGet';
import { Link, useRouteMatch,  useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [id, setIdclient] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const history = useHistory()
    const [isi] = Useget('/client')


    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/client', data);
            setPesan(res.data.pesan);
            history.push('/admin/client')
        } else {
            const res = await link.put('/client/' + id, data);
            setPesan(res.data.pesan);
            setPilihan(true);
        }

        reset();
    }

    async function showData(id) {
        const res = await link.get('/client/' + id);
        setValue('nama_client', res.data[0].nama_client);
        setValue('tempat_client', res.data[0].tempat_client);
        setValue('jenis_foto', res.data[0].jenis_foto);
        setValue('tanggal', res.data[0].tanggal);
        setValue('link_file', res.data[0].link_file);
        setValue('total_biaya', res.data[0].total_biaya);
        setIdclient(res.data[0].id_client);
        setPilihan(false);
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
                                <label htmlFor="nama_client" className="form-label">Nama Client</label>
                                <input type="text" className="form-control" id="nama_client" placeholder="nama_client" {...register("nama_client", { required: true })} />
                                {errors.nama_client && <span>This field is required</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tempat_client" className="form-label">Tempat Client</label>
                                <input type="text" className="form-control" id="tempat_client" placeholder="tempat_client" {...register("tempat_client", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jenis_foto" className="form-label">Jenis Foto</label>
                                <input type="text" className="form-control" id="jenis_foto" placeholder="jenis_foto" {...register("jenis_foto", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tanggal" className="form-label">Tanggal</label>
                                <input type="date" className="form-control" id="tanggal" placeholder="tanggal" {...register("tanggal", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="link_file" className="form-label">Link File</label>
                                <input type="text" className="form-control" id="link_file" placeholder="link_file" {...register("link_file", { required: true })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="total_biaya" className="form-label">Total Biaya</label>
                                <input type="text" className="form-control" id="total_biaya" placeholder="total_biaya" {...register("total_biaya", { required: true })} />
                            </div>
                            <input type="submit" className="btn btn-primary" />
                            <Link className="btn btn-success" to={{
                                pathname: "/admin/client"
                            }} replace><i className="fa fa-arrow-left" /> Kembali</Link>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Kategori;
