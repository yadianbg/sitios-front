export class ProvinciaService {
  static tableTestValues = [{
      id: '1',
      codigo: '01',
      nombre: 'Cienfuegos',
  }, {
      id: '2',
      codigo: '02',
      nombre: 'Matanzas',
  }, {
      id: '3',
      codigo: '03',
      nombre: 'Villa Clara',
  }]

  static get(){
      return ProvinciaService.tableTestValues;
  }

  static create(data) {
      ProvinciaService.tableTestValues.push(data)
  }
  static update(data) {
      ProvinciaService.tableTestValues = ProvinciaService.tableTestValues.map(dat => {
          if(dat.id == data.id){
              dat.codigo = data.codigo
              dat.nombre = data.nombre
          }
          return dat
      })
  }
  static delete(id) {
      ProvinciaService.tableTestValues = ProvinciaService.tableTestValues.filter(dat => dat.id !== id)
  }
}