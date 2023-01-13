import React, { useState, useEffect } from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../Hook/useGet';
import Content from './Content';
import { Link, useRouteMatch,  useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [id, setIdclient] = useState('');
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
            name: "Jenis Group",
            selector: "jenis_group",
            sortable: true
        },
        {
            name: "Fasilitas",
            selector: "fasilitas",
            sortable: true
        },
        {
            name: "Harga",
            selector: "harga",
            sortable: true
        },
        {
            name: "Aksi",
            selector: "aksi",
            sortable: false,
            cell: d => (
                <div>
                    <button onClick={() => hapus(d.aksi)} className="btn btn-danger"><i className='bi bi-trash-fill'></i></button>
                    <button onClick={() => showData(d.aksi)} className="btn btn-warning"><i className='bi bi-x-circle'></i></button>
                </div>)
        },
    ]
    const [isi] = Useget('/group')
    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [isi])
    function setIsiTabel() {
        let nomor = 1
        const dataGroup = isi.map((val, index) => ({
            no: nomor++,
            jenis_group: val.jenis_group,
            fasilitas: val.fasilitas,
            harga: val.harga,
            bukti_tf: val.bukti_transfer,
            aksi: val.id_group,
        }))
        setData(dataGroup)
    }       

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/group/' + id);
            setPesan(res.data.pesan);
        }
    }

   
    async function showData(id_cosplay) {       
        history.push({
            pathname: '/admin/showCosplay',
            state: { id: id_cosplay }                       
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
                    <Link className="btn btn-success" to={{
                        pathname: "/admin/createClient"                       
                    }} replace><i className="fa fa-arrow-left" /> Create</Link>
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
