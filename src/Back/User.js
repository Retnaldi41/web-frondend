import React, { useState, useEffect } from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../Hook/useGet';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


const Kategori = () => {
    const [isi, setIsi] = useState([]);
    const [pesan, setPesan] = useState('');
    const [id, setIdwedding] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [data, setData] = useState([])
    const { url } = useRouteMatch();
    const history = useHistory()

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Id User",
            selector: "id_user",
            sortable: true
        },        
        {
            name: "Email",
            selector: "email",
            sortable: true
        },
        {
            name: "Password",
            selector: "password",
            sortable: true
        },
        {
            name: "Nama User",
            selector: "nama_user",
            sortable: true
        },
        {
            name: "Alamat User",
            selector: "alamat_user",
            sortable: true
        },
        {
            name: "Telepon User",
            selector: "telpon_user",
            sortable: true
        },
        {
            name: "Aksi",
            selector: "aksi",
            sortable: false,
            cell: d => (
                <div>
                    <button onClick={() => hapus(d.aksi)} className="btn btn-danger btn-sm col-xs-2" style={{ margin: "2px" }}><i className='bi bi-trash-fill'></i></button>                    
                </div>)
        },
    ]
    useEffect(() => {
        getData() // eslint-disable-next-line
    }, [pesan])
    async function getData() {
        const res = await link.get('/users')
        setIsi(res.data)
        setIsiTabel(res.data)
    }
    function setIsiTabel(isi) {
        let nomor = 1
        const datauser = isi.map((val, index) => ({
            no: nomor++,
            id_user: val.id_user,
            email: val.email,
            password: val.password,
            nama_user: val.nama_user,
            alamat_user: val.alamat_user,
            telpon_user: val.telpon_user,
            aksi: val.id_user,
        }))
        setData(datauser)
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/users/' + id);
            setPesan(res.data.pesan);
        }
    }


    async function showData(id_user) {
        history.push({
            pathname: '/admin/showWedding',
            state: { id: id_user }
        });
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
                    {/* <table className="table mt-4">
                    <thead>
                        <tr>
                        <th>No</th>
                            <th>Nama</th>
                            <th>Tempat</th>
                            <th>Jenis Foto</th>
                            <th>Tanggal</th>
                            <th>Total DP</th>
                            <th>Total Biaya</th>
                            <th>Hapus</th>
                            <th>Ubah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isi.map((val, index) => (
                                <tr key={index}>
                                    <td>{no++}</td>
                                    <td>{val.nama_client}</td>
                                    <td>{val.tempat_client}</td>
                                    <td>{val.jenis_foto}</td>
                                    <td>{val.tanggal}</td>
                                    <td>{val.total_dp}</td>
                                    <td>{val.total_biaya}</td>
                                    <td>
                                        <button onClick={() => hapus(val.id_client)} className="btn btn-danger">Hapus</button>
                                    </td>
                                    <td>
                                        <button onClick={() => showData(val.id_client)} className="btn btn-warning">Ubah</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> */}
                    <DataTableExtensions {...{ columns, data }}>
                        <DataTable
                            columns={columns}
                            data={data}
                            noHeader
                            defaultSortField="no"
                            pagination
                            highlightOnHover
                        />
                    </DataTableExtensions>
                </div>
            </div>
        </main>
    );
}

export default Kategori;
