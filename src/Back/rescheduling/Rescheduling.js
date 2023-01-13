import React, { useState, useEffect } from 'react';
import { link } from '../../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../../Hook/useGet';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


const Kategori = () => {
    const [pesan, setPesan] = useState('');
    const [id, setIdrescheduling] = useState('');
    const [pilihan, setPilihan] = useState(true);
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [data, setData] = useState([])

    const columns = [
        {
            name: "No",
            selector: "no",
            sortable: true
        },
        {
            name: "Tanggal Booking",
            selector: "tgl_booking",
            sortable: true
        },      
        {
            name: "Tanggal Ganti",
            selector: "tgl_ganti",
            sortable: true
        },       
        {
            name: "Status",
            selector: "status",
            sortable: false,
            cell: c => (
                <div>
                    {(() => {
                        if (c.status == 2) {
                            return (<span class="badge bg-success">Setuju</span>)
                        } else if (c.status == 3) {
                            return (<span class="badge bg-danger">Tolak</span>)
                        }                       
                    })()}
                </div>
            )
        },
        {
            name: "Aksi Persetujuan",
            selector: "aksi_setuju",
            sortable: false,
            cell: d => (
                <div class="btn-group" role="group" aria-label="Basic example"  >
                    <button onClick={() => updateStatus(2, d.aksi_setuju)} className="btn btn-success btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-check-circle"></i></button>
                    <button onClick={() => updateStatus(3, d.aksi_setuju)} className="btn btn-danger btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-exclamation-octagon"></i></button>
                </div>)
        },        
        // {
        //     name: "Hapus",
        //     selector: "hapus",
        //     sortable: false,
        //     cell: f => (<button onClick={() => hapus(f)} className="btn btn-danger"><i class="bi bi-trash-fill"></i></button>)
        // },
    ]
    const [isi] = Useget('/rescheduling')
    useEffect(() => {
        setIsiTabel() // eslint-disable-next-line
    }, [isi])
    function setIsiTabel() {
        let nomor = 1
        const dataRescheduling = isi.map((val, index) => ({
            no: nomor++,            
            tgl_booking: val.tanggal_booking,
            tgl_ganti: val.tanggal_ganti,            
            status: val.status,            
            aksi_setuju: val.id_rescheduling,
        }))
        setData(dataRescheduling)
    }
    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/rescheduling', data);
            setPesan(res.data.pesan);
        } else {
            const res = await link.put('/rescheduling/' + id, data);
            setPesan(res.data.pesan);
            setPilihan(true);
        }

        reset();
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/rescheduling/' + id);
            setPesan(res.data.pesan);
        }
    }

    async function updateStatus(status, id) {
        if (window.confirm('yakin untuk mengubah status ?')) {
            let ubah = {
                status: status,
                id_rescheduling: id,
            }
            const res = await link.put('/rescheduling/status/', ubah);
            setPesan(res.data.pesan);
        }
    }
    

    let no = 1;

    return (
        <main id="main" class="main">
            <div>
                <div className="row">
                    <p>{pesan}</p>
                </div>
                <div className="row">
                </div>
                <div className="row">
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
