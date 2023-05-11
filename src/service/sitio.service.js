export class SitioService {
  static tableTestValues = [{
      id: '1',
      nombre: 'Palacio de Valle',
      capacidad: 100,
      tipo: 'Restaurate',
      provincia: 'Cienfuegos',
  }, {
    id: '2',
    nombre: 'Club Cienfuegos',
    capacidad: 300,
    tipo: 'Playa',
    provincia: 'Cienfuegos',
}, {
    id: '3',
    nombre: 'Hotel Jagua',
    capacidad: 1000,
    tipo: 'Hotel',
    provincia: 'Cienfuegos',
}]

  static get(){
      return SitioService.tableTestValues;
  }

  static create(data) {
      SitioService.tableTestValues.push(data)
  }
  static update(data) {
      SitioService.tableTestValues = SitioService.tableTestValues.map(dat => {
          if(dat.id == data.id){
              dat.name = data.name
          }
          return dat
      })
  }
  static delete(id) {
      SitioService.tableTestValues = SitioService.tableTestValues.filter(dat => dat.id !== id)
  }
}