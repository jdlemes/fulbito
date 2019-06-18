//definimos a punto (un plano o una clase de punto)
export function punto(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.dirx = 0;
  this.diry = 0;
  this.memoria = {};
}
punto.prototype.mover = function mover() {
  this.x += this.dirx;
  this.y += this.diry;
};
punto.prototype.cx = function cx() {
  return 24 + this.x * 25.0 - 12.5;
};
punto.prototype.cy = function cy() {
  return 24 + this.y * 25.0 - 12.5;
};
