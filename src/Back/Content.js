import React from 'react';
import { useParams } from 'react-router-dom';
import Detail from './Detail';
import Agenda from './Agenda';
import Kategori from './Kategori';
import Menu from './Menu';
import Users from './User';
import Order from './Order';

import User from './User';
import Booking from './Booking';
import Rescheduling from './rescheduling/Rescheduling';

import Client from './Client';
import CreateClient from './CreateClient';
import ShowClient from './ShowClient';

import Cosplay from './cosplay/Cosplay';
import ShowCosplay from './cosplay/ShowCosplay';
import CreateCosplay from './cosplay/CreateCosplay';

import Group from './group/Group';
import ShowGroup from './group/ShowGroup';
import CreateGroup from './group/CreateGroup';

import Komersial from './komersial/Komersial';
import ShowKomersial from './komersial/ShowKomersial';
import CreateKomersial from './komersial/CreateKomersial';

import Potrait from './potrait/Potrait';
import ShowPotrait from './potrait/ShowPotrait';
import CreatePotrait from './potrait/CreatePotrait';

import Studio from './studio/Studio';
import ShowStudio from './studio/ShowStudio';
import CreateStudio from './studio/CreateStudio';

import Wedding from './wedding/Wedding';
import ShowWedding from './wedding/ShowWedding';
import CreateWedding from './wedding/CreateWedding';

const Content = () => {
    const { isi } = useParams();

    let tampil;

    if (isi === 'kategori') {
        tampil = <Kategori />
    }
    if (isi === 'menu') {
        tampil = <Menu />
    }
    if (isi === 'agenda') {
        tampil = <Agenda />
    }

    if (isi === 'client') {
        tampil = <Client />
    }
    if (isi === 'users') {
        tampil = <Users />
    }   
    if (isi === 'createClient') {
        tampil = <CreateClient />
    }
    if (isi === 'showClient') {
        tampil = <ShowClient />
    }

    if (isi === 'booking') {
        tampil = <Booking />
    }

    if (isi === 'rescheduling') {
        tampil = <Rescheduling />
    }

    if (isi === 'cosplay') {
        tampil = <Cosplay />
    }
    if (isi === 'createCosplay') {
        tampil = <CreateCosplay />
    }
    if (isi === 'showCosplay') {
        tampil = <ShowCosplay />
    }

    if (isi === 'komersial') {
        tampil = <Komersial />
    }
    if (isi === 'createKomersial') {
        tampil = <CreateKomersial />
    }
    if (isi === 'showKomersial') {
        tampil = <ShowKomersial />
    }
    
    if (isi === 'potrait') {
        tampil = <Potrait />
    }
    if (isi === 'createPotrait') {
        tampil = <CreatePotrait />
    }
    if (isi === 'showPotrait') {
        tampil = <ShowPotrait />
    }

    if (isi === 'studio') {
        tampil = <Studio />
    }
    if (isi === 'createStudio') {
        tampil = <CreateStudio />
    }
    if (isi === 'showStudio') {
        tampil = <ShowStudio />
    }

    if (isi === 'wedding') {
        tampil = <Wedding />
    }
    if (isi === 'createWedding') {
        tampil = <CreateWedding />
    }
    if (isi === 'showWedding') {
        tampil = <ShowWedding />
    }

    if (isi === 'group') {
        tampil = <Group />
    }
    if (isi === 'showGroup') {
        tampil = <ShowGroup />
    }
    if (isi === 'createGroup') {
        tampil = <CreateGroup />
    }   
    
   
    if (isi === 'user') {
        tampil = <User />
    }

    return (
        <>
            {tampil}
        </>
    );
}

export default Content;
