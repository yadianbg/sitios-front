export class TipoService {
  static tableTestValues = [{
      id: '1',
      nombre: 'Hotel',
  }, {
      id: '2',
      nombre: 'Playa',
  }, {
      id: '3',
      nombre: 'Restaurante',
  }]

  static get(){
      return TipoService.tableTestValues;
  }

  static create(data) {
    TipoService.tableTestValues.push(data)
  }
  static update(data) {
      TipoService.tableTestValues = TipoService.tableTestValues.map(dat => {
          if(dat.id == data.id){
              dat.nombre = data.nombre
          }
          return dat
      })
  }
  static delete(id) {
      TipoService.tableTestValues = TipoService.tableTestValues.filter(dat => dat.id !== id)
  }
}