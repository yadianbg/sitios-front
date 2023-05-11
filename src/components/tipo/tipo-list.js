import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {tableHeaderValues} from "../../config/table-values";
import {CustomTable} from "../table/custom-table";
import {TipoService} from "../../service/tipo.service";
import TipoForm from "./tipo-form";

function TipoList(props) {
    // useSate es un hook que nos permite cambiar los estados de variables en específico
    const [data, setData] = useState([])
    const [test, setTest] = useState({id: '', nombre: ''})
    const [showForm, setShowForm] = useState(false)

    const header = tableHeaderValues
    // useEffect es un hook que nos permite realizar una acción cuando el componente se inicio
    // es utilizado mayourmente para llamadas hacia APIS

    useEffect(() => {
        reloadData()
    }, [])

    const editFunction = (id) => {
        const value = TipoService.tableTestValues.filter(dat => dat.id == id)[0]
        setTest({
            id: value.id,
            nombre: value.nombre
        })
        setShowForm(true);
    }

    const cleanEdit = () => {
        setTest({id: '', nombre: ''})
    }

    const deleteFunction = (id) => {
        TipoService.delete(id)
        reloadData()
    }

    const seeFunction = (id) => {
        console.log('ID: ', id)
    }

    const reloadData = () => {
        setData(TipoService.get())
    }


    return (
        <>
            <Typography variant="h5" component={'h4'}>
                Tipos de Sitio
            </Typography>
            {showForm
                && <TipoForm dialogState={showForm}
                             setDialogState={setShowForm}
                             data={test}
                             clean={cleanEdit}
                             reloadData={reloadData}/>}
            <Button onClick={() => {
                cleanEdit();
                setShowForm(true);
            }}> Crear </Button>

            <CustomTable
                data={TipoService.get()}
                header={header}
                editFunction={editFunction}
                deleteFunction={deleteFunction}
                seeFunction={seeFunction}
            />
        </>
    );
}

export default TipoList;