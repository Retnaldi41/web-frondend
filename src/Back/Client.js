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
            name: "Nama",
            selector: "nama",
            sortable: true
        },
        {
            name: "Alamat",
            selector: "alamat",
            sortable: true
        },
        {
            name: "Jenis Foto",
            selector: "jenis_foto",
            sortable: true
        },
        {
            name: "Tanggal",
            selector: "tgl",
            sortable: true
        },
        {
            name: "Link File",
            selector: "link",
            sortable: true
        },
        {
            name: "Total Biaya",
            selector: "ttl_biaya",
            sortable: true
        },
        {
            name: "Aksi",
            selector: "aksi",
            sortable: false,
            cell: d => (
                <div>                    
                    <button onClick={() => showData(d.aksi)} className="btn btn-warning btn-sm col-xs-2"><i className='bi bi-arrow-bar-up'></i></button>
                </div>)
        },
    ]
    const [isi] = Useget('/client')
    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [isi])
    function setIsiTabel() {
        let nomor = 1
        const dataClient = isi.map((val, index) => ({
            no: nomor++,
            nama: val.nama_client,
            alamat: val.tempat_client,
            jenis_foto: val.jenis_foto,
            tgl: val.tanggal,
            link: val.link_file,            
            ttl_biaya: val.total_biaya,
            aksi: val.id_client,
        }))
        setData(dataClient)
    }          
   
    async function showData(id_client) {       
        history.push({
            pathname: '/admin/showClient',
            state: { id: id_client }                       
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
                    <Link to={{
                        pathname: "/admin/createClient"                       
                    }} replace><button className="btn btn-success btn-sm col-xs-2"><i className='bi bi-plus-circle'></i><i className="fa fa-arrow-left" />  Tambah Data</button></Link>
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
