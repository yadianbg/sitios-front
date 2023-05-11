import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {tableHeaderValues} from "../../config/table-values2";
import {CustomTable} from "../table/custom-table";
import {ProvinciaService} from "../../service/provincia.service";
import ProvinciaForm from "./provincia-form";

function ProvinciaList(props) {
    // useSate es un hook que nos permite cambiar los estados de variables en específico
    const [data, setData] = useState([])
    const [test, setTest] = useState({id: '', codigo: '', nombre: ''})
    const [showForm, setShowForm] = useState(false)

    const header = tableHeaderValues
    // useEffect es un hook que nos permite realizar una acción cuando el componente se inicio
    // es utilizado mayourmente para llamadas hacia APIS

    useEffect(() => {
        reloadData()
    }, [])

    const editFunction = (id) => {
        const value = ProvinciaService.tableTestValues.filter(dat => dat.id == id)[0]
        setTest({
            id: value.id,
            codigo: value.codigo,
            nombre: value.nombre
        })
        setShowForm(true);
    }

    const cleanEdit = () => {
        setTest({id: '', codigo: '', nombre: ''})
    }

    const deleteFunction = (id) => {
        ProvinciaService.delete(id)
        reloadData()
    }

    const seeFunction = (id) => {
        console.log('ID: ', id)
    }

    const reloadData = () => {
        setData(ProvinciaService.get())
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
            <Button onClick={() => {
                cleanEdit();
                setShowForm(true);
            }}> Crear </Button>

            <CustomTable
                data={ProvinciaService.get()}
                header={header}
                editFunction={editFunction}
                deleteFunction={deleteFunction}
                seeFunction={seeFunction}
            />
        </>
    );
}

export default ProvinciaList;