import axios from "axios";
import {httpLink} from "../config/settings";

const clase = 'tipo/'

export class TipoService {
  static get(){
      return axios.get(httpLink + clase)
  }

  static retrieve(id){
      return axios.get(httpLink + clase + id)
  }

  static create(data) {
      const formData = new FormData();
      formData.append('nombre', data.nombre)
      return axios.post(httpLink + clase, formData)
  }

  static update(data) {
      const formData = new FormData();
      //formData.append('id', data.id)
      formData.append('nombre', data.nombre)
      return axios.put(httpLink + clase + data.id, formData)
  }

  static delete(id){
      return axios.delete(httpLink + clase + id)
  }
}