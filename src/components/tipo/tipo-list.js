import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {tableHeaderValues} from "../../config/table-values";
import {CustomTable} from "../table/custom-table";
import AlertDialog from "../confirm-dialog/confirm";
import {TipoService} from "../../service/tipo.service";
import TipoForm from "./tipo-form";

function TipoList(props) {
    // useSate es un hook que nos permite cambiar los estados de variables en específico
    const [data, setData] = useState([])
    const [test, setTest] = useState({id: '', nombre: ''})
    const [showForm, setShowForm] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const header = tableHeaderValues

    // useEffect es un hook que nos permite realizar una acción cuando el componente se inicio
    // es utilizado mayourmente para llamadas hacia APIS
    useEffect(() => {
        reloadData()
    }, [])

    const editFunction = (id) => {
        TipoService.retrieve(id).then((response) => {
            //console.log(response)
            setTest({
                id: response.data.id,
                nombre: response.data.nombre
            })
            setShowForm(true);
        })
    }

    const cleanEdit = () => {
        setTest({id: '', nombre: ''})
    }

    const deleteFunction = (id) => {
        setDeleteId(id)
        setShowConfirm(true)
    }

    const deleteSelected = () => {
        TipoService.delete(deleteId).then(() => reloadData())
    }

    const seeFunction = (id) => {
        console.log('ID: ' + id)
    }

    const reloadData = () => {
        TipoService.get().then((response) => setData(response.data))
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
            {showConfirm &&
                <AlertDialog
                    deleteAction={deleteSelected}
                    setConfirm={setShowConfirm}
                    confirm={showConfirm}
                />}
            <Button onClick={() => {
                cleanEdit();
                setShowForm(true);
            }}> Crear </Button>

            <CustomTable
                header={header}
                data={data}
                seeFunction={seeFunction}
                editFunction={editFunction}
                deleteFunction={deleteFunction}
            />
        </>
    );
}

export default TipoList;