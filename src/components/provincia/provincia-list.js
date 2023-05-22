import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {tableHeaderValues} from "../../config/table-values2";
import {CustomTable} from "../table/custom-table";
import AlertDialog from "../confirm-dialog/confirm";
import {ProvinciaService} from "../../service/provincia.service";
import ProvinciaForm from "./provincia-form";

function ProvinciaList(props) {
    // useSate es un hook que nos permite cambiar los estados de variables en específico
    const [data, setData] = useState([])
    const [test, setTest] = useState({id: '', codigo: '', nombre: ''})
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
        ProvinciaService.retrieve(id).then((response) => {
            //console.log(response)
            setTest({
                id: response.data.id,
                codigo: response.data.codigo,
                nombre: response.data.nombre
            })
            setShowForm(true);
        })
    }

    const cleanEdit = () => {
        setTest({id: '', codigo: '', nombre: ''})
    }

    const deleteFunction = (id) => {
        setDeleteId(id)
        setShowConfirm(true)
    }

    const deleteSelected = () => {
        ProvinciaService.delete(deleteId).then(() => reloadData())
    }

    const seeFunction = (id) => {
        console.log('ID: ' + id)
    }

    const reloadData = () => {
        ProvinciaService.get().then((response) => setData(response.data))
    }

    return (
        <>
            <Typography variant="h5" component={'h4'}>
                Provincias
            </Typography>
            {showForm
                && <ProvinciaForm dialogState={showForm}
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

export default ProvinciaList;