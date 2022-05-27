import React from "react";
import {useEffect,useState} from 'react';

function ApiFetch()
{
    const url = "http://asistencia-socma.ddns.net/api/";
    //hooks
    const [data,setData] = useState([]);
    
    //consume la api ...
    const myRequest = async ()=>{
        const res = await fetch(url );
        const resJSON = await res.json();
        setData(resJSON);
       // console.log( resJSON )
    }

    useEffect( ()=>{
        myRequest();
    },[]);

    //display
    
    return (<div>
        <h2>Lista de Accesos</h2>
        <hr/>
        <table className="table table-dark table-hover table-striped table-responsive table-sm">
            <thead>
                <tr>
                    <th>Orden/Id</th>
                    <th>Fecha</th>
                    <th>IP</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
            { 
            !data ? 'Laoding ....': 
            data.map( (datillo)=>{
                return <tr key={ datillo.id}>
                           <td>{datillo.id}</td>
                           <td>{datillo.fecha}</td>
                           <td>{datillo.ip}</td>
                           <td>{datillo.apaterno} {datillo.amaterno} {datillo.nombres}</td>
                        </tr>
               
           
           }) }
           </tbody>
        </table>
    </div>);

}

export default ApiFetch;