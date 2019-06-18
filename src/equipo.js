export function equipo(equipoId, nombre, jugar) {
  this.equipoId = equipoId;
  this.nombre = nombre;
  this.jugar = jugar;
}

equipo.prototype.prueba = function prueba() {
  return 0;
};
