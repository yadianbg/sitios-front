import axios from "axios";
import {httpLink} from "../config/settings";

const clase = 'sitio/'

export class SitioService {
  static get(){
      return axios.get(httpLink + clase)
  }

  static retrieve(id){
      return axios.get(httpLink + clase + id)
  }

  static create(data) {
      const formData = new FormData()
      formData.append('nombre', data.nombre)
      formData.append('direccion', data.direccion)
      formData.append('capacidad', data.capacidad)
      formData.append('fechaApertura', data.fechaApertura)
      formData.append('disponible', data.disponible)
      formData.append('tipo', data.tipo)
      formData.append('provincia', data.provincia)
      if (data.foto)
          formData.append('foto', data.foto)
      else    
          formData.append('foto', '')
      return axios.post(httpLink + clase, formData, {
          headers: {
              "Content-Type": 'multipart/form-data'
          }
      })
  }

  static update(data) {
      const formData = new FormData()
      formData.append('nombre', data.nombre)
      formData.append('direccion', data.direccion)
      formData.append('capacidad', data.capacidad)
      formData.append('fechaApertura', data.fechaApertura)
      formData.append('disponible', data.disponible)
      formData.append('tipo', data.tipo)
      formData.append('provincia', data.provincia)
      if (data.foto)
          formData.append('foto', data.foto)
      return axios.put(httpLink + clase + data.id, formData, {
          headers: {
              "Content-Type": 'multipart/form-data'
          }
      })      
  }

  static delete(id){
      return axios.delete(httpLink + clase + id)
  }
}