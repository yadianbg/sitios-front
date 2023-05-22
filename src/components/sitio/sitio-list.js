import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from "@mui/material/Box";
import AlertDialog from "../confirm-dialog/confirm";
import {SitioService} from "../../service/sitio.service";
import SitioForm from "./sitio-form";

function SitioList(props) {
    // useSate es un hook que nos permite cambiar los estados de variables en específico
    const [data, setData] = useState([])
    const [test, setTest] = useState({id: '', nombre: '', direccion: '', capacidad: '', fechaApertura: '', 
                                      disponible: '', foto: '', tipo: '', provincia: ''})
    const [showForm, setShowForm] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    // useEffect es un hook que nos permite realizar una acción cuando el componente se inicio
    // es utilizado mayourmente para llamadas hacia APIS
    useEffect(() => {
        reloadData()
    }, [])

    const editFunction = (id) => {
        SitioService.retrieve(id).then((response) => {
            setTest({
                id: response.data.id,
                nombre: response.data.nombre,
                direccion: response.data.direccion,
                capacidad: response.data.capacidad,
                fechaApertura: response.data.fechaApertura,
                disponible: response.data.disponible,
                foto: response.data.foto,
                tipo: response.data.tipo,
                provincia: response.data.provincia,
            })
            setShowForm(true)
        })
    }

    const cleanEdit = () => {
        setTest({
            id: '',
            nombre: '',
            direccion: '',
            capacidad: '',
            fechaApertura: '',
            disponible: '',
            foto: '',
            tipo: '',
            provincia: '',
        })
    }

    const deleteFunction = (id) => {
        setDeleteId(id)
        setShowConfirm(true)
    }

    const deleteSelected = () => {
        SitioService.delete(deleteId).then(() => reloadData())
    }

    const seeFunction = (id) => {
        console.log('ID: ' + id)
    }

    const reloadData = () => {
        SitioService.get().then((response) => setData(response.data))
    }

    return (
        <>
            <Typography variant='h5' component={'h4'}>
                Sitios
            </Typography>
            {showForm
                && <SitioForm dialogState={showForm}
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
                cleanEdit()
                setShowForm(true)
            }}> Crear </Button>

            <Box sx={{'display': 'flex', 'flexDirection': 'row', 'gap': 5, 'flexWrap': 'wrap'}}>
                {data.map(dat => (
                    <Card sx={{maxWidth: 345}}>
                        <CardMedia
                            sx={{height: 200}}
                            image={dat.foto}
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {dat.nombre}
                            </Typography>
                            {dat.tipo}<br/>
                            {dat.disponible ? 'Disponible' : 'Cerrado'}
                        </CardContent>
                        <CardActions>
                            <Button size='small' onClick={() => seeFunction(dat.id)}>Ver</Button>
                            <Button size='small' onClick={() => editFunction(dat.id)}>Editar</Button>
                            <Button size='small' onClick={() => deleteFunction(dat.id)}>Eliminar</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </>
    )
}

export default SitioList;