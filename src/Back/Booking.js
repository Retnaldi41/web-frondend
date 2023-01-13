import React, { useState, useEffect } from 'react';
import { link } from '../Axios/link';
import { useForm } from 'react-hook-form';
import Useget from '../Hook/useGet';
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";


const Kategori = () => {
    const [isi, setIsi] = useState([]);
    const [pesan, setPesan] = useState('');
    const [id, setIdbooking] = useState('');
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
            name: "Id User",
            selector: "id_user",
            sortable: true
        },
        {
            name: "Jenis Booking",
            selector: "jenis_booking",
            sortable: true
        },
        {
            name: "Tanggal Booking",
            selector: "tgl_booking",
            sortable: true
        },
        {
            name: "Bukti Transfer",
            selector: "bukti_tf",
            sortable: false,
            cell: b => <button><a href={b.bukti_tf} target='_blank' alt="">Lihat Transfer</a></button>
            // {/* <img src={b.bukti_tf} alt="" width='100' height='100' /> */}
        },
        {
            name: "Alasan Batal",
            selector: "alasan",
            sortable: false
        },
        {
            name: "Status",
            selector: "status",
            sortable: false,
            cell: c => (
                <div>
                    {(() => {
                        if (c.status == 1) {
                            return (<span class="badge bg-info">Menunggu Persetujuan</span>)
                        } else if (c.status == 2) {
                            return (<span class="badge bg-success">Booking Disetujui</span>)
                        } else if (c.status == 3) {
                            return (<span class="badge bg-danger">Pembookingan Dibatalkan</span>)
                        }
                        else if (c.status == 4) {
                            return (<span class="badge bg-info">Konfirmasi Pembayaran</span>)
                        }
                        else if (c.status == 5) {
                            return (<span class="badge bg-success">Pembayaran Terverifikasi</span>)
                        }
                        else if (c.status == 6) {
                            return (<span class="badge bg-danger">Pembayaran Ditolak</span>)
                        }
                        else if (c.status == 7) {
                            return (<span class="badge bg-info">Permintaan Rescheduling</span>)
                        }
                        else if (c.status == 8) {
                            return (<span class="badge bg-success">Rescheduling Terverifikasi</span>)
                        }
                        else if (c.status == 9) {
                            return (<span class="badge bg-danger">Rescheduling Ditolak</span>)
                        }
                        else if (c.status == 10) {
                            return (<span class="badge bg-info">Permintaan Pembatalan</span>)
                        }
                        else if (c.status == 11) {
                            return (<span class="badge bg-success">Pembatalan Terverifikasi</span>)
                        }
                        else if (c.status == 12) {
                            return (<span class="badge bg-danger">Pembatalan Ditolak</span>)
                        }
                        else if (c.status == 13) {
                            return (<span class="badge bg-danger">Pembookingan Dibatalkan</span>)
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
                    <button onClick={() => updateStatus(d.aksi_setuju.status == 1 || d.aksi_setuju.status == 3 ? 2 : d.aksi_setuju.status == 4 || d.aksi_setuju.status == 6 ? 5 : d.aksi_setuju.status == 7 || d.aksi_setuju.status == 9 ? 8 : 11, d.aksi_setuju.id_booking)} className="btn btn-success btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-check-circle"></i></button>
                    <button onClick={() => updateStatus(d.aksi_setuju.status == 1 || d.aksi_setuju.status == 2 ? 3 : d.aksi_setuju.status == 4 || d.aksi_setuju.status == 5 ? 6 : d.aksi_setuju.status == 7 || d.aksi_setuju.status == 8 ? 9 : 12, d.aksi_setuju.id_booking)} className="btn btn-danger btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-x-circle"></i></button>                
                </div>)
        },
        {
            name: "Hapus",
            selector: "hapus",
            sortable: false,
            cell: f =>
            <div class="btn-group" role="group" aria-label="Basic example"  >
                <button onClick={() => updateStatus(f.aksi_setuju.status == 13)} className="btn btn-danger btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-x-circle"></i></button>
            </div>
            // (<button onClick={() => hapus(f.hapus)} className="btn btn-danger btn-sm col-xs-2" style={{ margin: "1px" }}><i class="bi bi-trash-fill"></i></button>)
        },
    ]
    
    useEffect(() => {
        getData() // eslint-disable-next-line
    }, [isi])
    async function getData() {
        const res = await link.get('/booking')
        setIsi(res.data)
        setIsiTabel(res.data)
    }
    function setIsiTabel(isi) {
        let nomor = 1
        const dataBooking = isi.map((val, index) => ({
            no: nomor++,
            id_user: val.id_user,
            jenis_booking: val.jenis_booking,
            tgl_booking: val.tanggal_booking,
            bukti_tf: '' + val.bukti_transfer + '',
            alasan: val.alasan,
            status: val.status,
            aksi_setuju: val,
            hapus: val,

        }))
        setData(dataBooking)
    }
    async function simpan(data) {
        if (pilihan) {
            const res = await link.post('/booking', data);
            setPesan(res.data.pesan);
        } else {
            const res = await link.put('/booking/' + id, data);
            setPesan(res.data.pesan);
            setPilihan(true);
        }

        reset();
    }

    async function hapus(id) {
        if (window.confirm('yakin akan menghapus?')) {
            const res = await link.delete('/booking/' + id);
            setPesan(res.data.pesan);
        }
    }

    async function refresh() {
        const res = await link.get('/booking/');
        setPesan(res.data.pesan);
    }

    async function updateStatus(status, id) {
        if (window.confirm('yakin untuk mengubah status ?')) {
            let ubah = {
                status: status,
                id_booking: id,
            }
            const res = await link.put('/booking/status/', ubah);
            setPesan(res.data.pesan);
        }
    }

    async function showData(id) {
        const res = await link.get('/booking/' + id);
        setValue('id_user', res.data[0].id_user);
        setValue('jenis_booking', res.data[0].jenis_booking);
        setValue('id_item', res.data[0].id_item);
        setValue('tanggal_booking', res.data[0].tanggal_booking);
        setValue('bukti_transfer', res.data[0].bukti_transfer);
        setIdbooking(res.data[0].id_booking);
        setPilihan(false);
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
