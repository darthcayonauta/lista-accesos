import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import {Button,ModalBody,Modal,ModalHeader,ModalFooter} from 'reactstrap';
import {useState,useEffect} from 'react';


function ApiRest()
{
    const url = "http://asistencia-socma.ddns.net/api/";

    //hooks - Estados
    const [data,setData] = useState([]);
    //seleccionar framework
    const [framework,setFrameworkSeleccionado] = useState({
        id:'',
        fecha:'',
        ip:'',
        apaterno:'',
        nombres:''
    });

    //hooks para modales, será un true o un false
    const [abrirCerrarModal, setAbrirCerrarModal] = useState(false);

    const peticionGet = async ()=>{
        //no cachaba que el axios era una promesa o que se comportaba como tal ...
        await axios.get(url).then(response =>{
            setData(response.data);
        } ).catch(error => console.log(error));
    }

    //selecciono una fila( o sea un framwwork )
    const seleccionarFramework = ( framework  )=>{
        setFrameworkSeleccionado(framework);
        
        setAbrirCerrarModal(true);
    }


    //ok, creo la peticion get, pero, donde la uso? fácil! en UseEffect, al igual que la apiFetch

    useEffect(()=>{
        peticionGet();
    });


    return(<div>
        <p>
            Hay un total de <strong>{data.length}</strong> accesos en el sistema
        </p>
        <table className="table table-striped table-dark table-hover table-responsive">
            <thead>
                <tr>
                    <th>Orden/Id</th>
                    <th>Fecha</th>
                    <th>IP</th>
                    <th>User</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
             { data.map( framework=>{
                    return <tr key={ framework.id}>
                                <td>{framework.id}</td>
                                <td>{framework.fecha}</td>
                                <td>{framework.ip}</td>
                                <td>{framework.apaterno}  {framework.nombres}</td>
                                <td>
                                    <button className="btn btn-sm btn-secondary"
                                            onClick={ ()=>seleccionarFramework(framework) } >
                                        Detalle
                                    </button>
                                </td>
                            </tr>

             }) }   
            </tbody>
        </table>
        
        <Modal isOpen={abrirCerrarModal}>
            <ModalHeader>Detalle</ModalHeader>
            <ModalBody>
            <div className="row">
                    <div className="col-sm-2">
                        <label>
                            <strong>Fecha</strong>
                        </label>
                    </div>
                    <div className="col-sm-4">
                        { framework.fecha }
                    </div>
               
                    <div className="col-sm-2">
                        <label>
                            <strong>ip</strong>
                        </label>
                    </div>
                    <div className="col-sm-4">
                        { framework.ip }
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>
                            <strong>User</strong>
                        </label>
                    </div>
                    <div className="col-sm-8">
                        {framework.nombres} {framework.apaterno}
                    </div>
                </div>    
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-secondary" onClick={()=>setAbrirCerrarModal(false)}>Cancelar</button>
            </ModalFooter>
        </Modal>
    </div>)
}

export default ApiRest;