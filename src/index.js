import { punto } from "./punto";
import { equipo } from "./equipo";
import * as robot1 from "./robot1";
import * as robot2 from "./robot2";
//import { jugar } from "./robot2";

var veces = 0;
var canvas = document.querySelector("#lienzo");
var ctx = canvas.getContext("2d");

var golesL = 0,
  golesV = 0;

var pts, locales, visitantes;

var local = new equipo(1, "Cancheros", robot1.jugar);
var visitante = new equipo(1, "Malevos", robot1.jugar);

var iniciaLizar = function() {
  pts = [new punto(10.5, 5.5, "yellow", false)];
  console.log(local.jugar);
  eval(local.jugar);
  locales = jugar(null, null, null, null, null);
  console.log(visitante.jugar);
  eval(visitante.jugar);
  visitantes = jugar(null, null, null, null, null);
  for (var i = 0; i < locales.length; i++) {
    pts.push(new punto(locales[i].x, locales[i].y, "blue", false));
  }
  for (i = 0; i < visitantes.length; i++) {
    pts.push(new punto(21 - visitantes[i].x, visitantes[i].y, "red", false));
  }
};

iniciaLizar();

function aleatorio(inferior, superior) {
  var numPosibilidades = superior - inferior;
  var aleat = Math.random() * numPosibilidades;
  aleat = Math.floor(aleat);
  return parseInt(inferior, 10) + aleat;
}

var dibujarCirculo = function(
  x,
  y,
  radio,
  desde,
  hasta,
  color,
  anchoBorde,
  colorBorde
) {
  ctx.beginPath();
  //ctx.arc(x,y, radio, desde, hasta );
  ctx.arc(x, y, radio, desde, hasta);

  //relleno
  if (color) {
    ctx.fillStyle = color;
    ctx.fill();
  }

  //borde
  if (anchoBorde) {
    ctx.strokeWidth = anchoBorde;
    ctx.strokeStyle = colorBorde;
    ctx.stroke();
  }
};

var dibujarLinea = function(x1, y1, x2, y2, color, ancho) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeWidth = ancho;
  ctx.strokeStyle = color;
  ctx.closePath();
  ctx.stroke();
};

var dibujarRectangulo = function(
  x1,
  y1,
  x2,
  y2,
  color,
  anchoBorde,
  colorBorde
) {
  if (color) {
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2, y2);
  }
  if (anchoBorde) {
    ctx.strokeWidth = anchoBorde;
    ctx.strokeStyle = colorBorde;
    ctx.strokeRect(x1, y1, x2, y2);
  }
};

var dibujarCancha = function() {
  dibujarRectangulo(0, 0, 549, 299, "black", 15, "black");
  dibujarRectangulo(24, 24, 500, 250, "green", 15, "white");

  //linea de mitad de cancha
  dibujarLinea(274, 24, 274, 274, "white", 35);

  //dibujar lineas verticales
  for (var i = 49; i < 524; i += 25) {
    dibujarLinea(i, 24, i, 274, "black", 5);
  }

  //dibujar lineas horizontales
  for (i = 49; i < 274; i += 25) {
    dibujarLinea(24, i, 524, i, "black", 5);
  }

  //Circulo central
  dibujarCirculo(274, 149, 50, 0, Math.PI * 2, "", 15, "white");
  //  Punto central
  dibujarCirculo(274, 149, 3, 0, Math.PI * 2, "white", 10, "white");
  /*
// Semicirculo Area Grande Este
  dibujarCirculo(425,124, 40, Math.PI * 0.5, Math.PI * 1.5, null, 20, "white" );  

//  <!--Area grande este -->
  dibujarRectangulo(425,50,71,149,null,15, "white");

//  <!--Area chica este -->
//  dibujarRectangulo(455,80,41,89,null,15, "white");

// Semicirculo Area Grande Este
  dibujarCirculo(74,124, 40, Math.PI * 1.5, Math.PI * 0.5, null, 20, "white" );  

  //  <!--Area grande oeste -->
  dibujarRectangulo(3,50,71,149,null,15, "white");

//  <!--Area chica oeste -->
//  dibujarRectangulo(3,80,41,89,null,15, "white");
*/
  //  Arco este
  dibujarRectangulo(525, 75, 24, 150, "red", 15, "black");

  //  Arco oeste
  dibujarRectangulo(0, 75, 24, 150, "blue", 15, "black");

  /*<rect width="1%" height="32%" x="99.5%" y="34%" stroke-width="1%" stroke="yellow" 
          fill="#044B94" fill-opacity="0.0"/>
  
  <!--Semicirculo Area Grande Oeste  -->
  <circle cx="14%" cy="50%" r="14%" stroke-width="0.3%" stroke="yellow" 
          fill="#044B94" fill-opacity="0.0" />

  <!--Area grande Oeste -->
  <rect width="22%" height="60%" x="0%" y="20%" stroke-width="0.3%" stroke="yellow" 
          fill="green" />
  <!--Area chica Oeste -->
  <rect width="12%" height="40%" x="0%" y="30%" stroke-width="0.3%" stroke="yellow" 
          fill="#044B94" fill-opacity="0.0"/>
  <!--Arco Oeste -->
  <rect width="1%" height="32%" x="-0.5%" y="34%" stroke-width="1%" stroke="yellow" 
          fill="#044B94" fill-opacity="0.0"/>*/
};

function dibujar() {
  dibujarCancha();

  //Circulo
  for (var i = 0; i < pts.length; i++)
    dibujarCirculo(
      pts[i].cx(),
      pts[i].cy(),
      i === 0 ? 11 : 8,
      0,
      Math.PI * 2,
      pts[i].color,
      i === 0 ? 11 : 8,
      "black"
    );
  /*ctx.beginPath();
    //ctx.arc(x,y, radio, desde, hasta );
    ctx.arc(px, py, 10, 0, 2 * Math.PI);
    
    //relleno
    ctx.fillStyle = "red";
    ctx.fill();
    //borde
    ctx.strokeWidth = 5;
    ctx.strokeStyle = "black";

    ctx.stroke();
    */
}

var frame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

function saca() {
  pts[0].x = aleatorio(6, 14);
  pts[0].y = aleatorio(1, 9);
  if (pts[0].y > 5) pts[0].diry = -1;
  else pts[0].diry = 1;
  if (pts[0].x > 10) pts[0].dirx = -1;
  else pts[0].dirx = 1;

  //pedir nueva pocision a los jugadores
  /*
  //pide pocision a los jugadores para procesar locales
  for (var i=1; i< 6;i++){ //ojo falta evitar que se solapen con otros jugadores
    //miEquipo, contrarios, yo, pelota, golesF, golesE
    var respuesta = jugar1(null,null,{nro:i, x:pts[i].x, y:pts[i].y, dirx:0, diry:0}, null, golesL, golesV);
    pts[i].x = respuesta.x;
    pts[i].y = respuesta.y;
    pts[i].dirx = 0;
    pts[i].diry = 0;
  }
  //pide pocision a los jugadores para procesar visitantes
  for (var i=6; i< 11;i++){ //ojo falta evitar que se solapen con otros jugadores
    var respuesta = jugar1(null,null,{nro:i, x:(51-pts[i].x), y:pts[i].y, dirx:0, diry:0}, null, golesL, golesV);
    pts[i].x = (51-respuesta.x);
    pts[i].y = respuesta.y;
    pts[i].dirx = 0;
    pts[i].diry = 0;
  }*/
}

function mover() {
  //analizamos  si algun jugador se choca con otro
  var resultado;
  for (var i = 1; i < 11; i++) {
    if (Math.abs(pts[i].dirx) + Math.abs(pts[i].diry) === 0) continue;

    for (var j = 1; j < 11; j++) {
      if (j === i) continue;
      if (
        pts[i].x + pts[i].dirx === pts[j].x + pts[j].dirx &&
        pts[i].y + pts[i].diry === pts[j].y + pts[j].diry
      ) {
        if (Math.abs(pts[i].dirx) + Math.abs(pts[i].diry) > 0) {
          pts[i].dirx = 0;
          pts[i].diry = 0;
        }
        if (Math.abs(pts[j].dirx) + Math.abs(pts[j].diry) > 0) {
          pts[j].dirx = 0;
          pts[j].diry = 0;
        }
        break;
      }
    }
  }

  //analizamos si quienes le pegan a la pelota

  var pegoPelota = false;
  var x = pts[0].x;
  var y = pts[0].y;
  var vdirx = pts[0].dirx;
  var vdiry = pts[0].diry;
  while (vdirx != 0 || vdiry != 0) {
    var p = new punto(x + vdirx, y + vdiry);

    for (j = 1; j < 11; j++) {
      if (p.x === pts[j].x + pts[j].dirx && p.y === pts[j].y + pts[j].diry) {
        pts[0].x = p.x;
        pts[0].y = p.y;
        pts[0].oldDirx = pts[0].dirx;
        pts[0].oldDiry = pts[0].diry;
        pts[0].diry = 0;
        pts[0].dirx = 0;
        pegoPelota = true;
        break;
      }
    }
    if (pegoPelota) break;

    if (vdirx > 0) vdirx--;
    if (vdiry > 0) vdiry--;
    if (vdirx < 0) vdirx++;
    if (vdiry < 0) vdiry++;
  }

  if (!pegoPelota) {
    pts[0].x += pts[0].dirx;
    pts[0].y += pts[0].diry;
    //le disminuye la veloxidad a la pelota, ver si hay que sacarlo para que haya mas goles
    switch (pts[0].dirx) {
      case -3:
      case -2:
        pts[0].dirx++;
        break;
      case 3:
      case 2:
        pts[0].dirx--;
        break;
      default:
        break;
    }
    switch (pts[0].diry) {
      case -3:
      case -2:
        pts[0].diry++;
        break;
      case 3:
      case 2:
        pts[0].diry--;
        break;
      default:
        break;
    }
  }
  if (pts[0].x < 1) {
    if (pts[0].y >= 3 && pts[0].y <= 8) {
      //gol visitante
      golesV++;
      resultado = "Gol Visitante!!";
    } else saca();
  }
  if (pts[0].x > 20) {
    if (pts[0].y >= 3 && pts[0].y <= 8) {
      //gol visitante
      golesL++;
      resultado = "Gol Local!!";
    } else saca();
  }
  if (pts[0].y < 1) {
    saca();
  }
  if (pts[0].y > 10) {
    saca();
  }
  for (i = 1; i < 11; i++) {
    //muevo al jugador
    pts[i].x += pts[i].dirx;
    pts[i].y += pts[i].diry;
    //le quito el movimiento
    pts[i].dirx = 0;
    pts[i].diry = 0;
  }
  return resultado;
}

function ValidaRespuesta(respuesta, equipo, pelota) {
  if (respuesta.jugador === 0) {
    // es la pelota
    var tieneLaPelota = false;
    for (let index = 0; index < equipo.length; index++) {
      const element = equipo[index];
      if (element.x === pelota.x && element.y === pelota.y) {
        tieneLaPelota = true;
        break;
      }
    }
    if (!tieneLaPelota) {
      respuesta.diry = pelota.dirx;
      respuesta.dirx = pelota.diry;
      return;
    }
    if (Math.abs(respuesta.dirx) !== Math.abs(respuesta.diry)) {
      if (Math.abs(respuesta.dirx) > Math.abs(respuesta.diry)) {
        respuesta.dirx =
          Math.abs(respuesta.dirx) > 3
            ? respuesta.dirx > 0
              ? 3
              : -3
            : respuesta.dirx;
        respuesta.diry = 0;
      } else {
        respuesta.diry =
          Math.abs(respuesta.diry) > 3
            ? respuesta.diry > 0
              ? 3
              : -3
            : respuesta.diry;
        respuesta.dirx = 0;
      }
    }
    while (Math.abs(respuesta.dirx) + Math.abs(respuesta.diry) > 4) {
      if (respuesta.diry > 0) respuesta.diry--;
      else respuesta.diry++;

      if (respuesta.dirx > 0) respuesta.dirx--;
      else respuesta.dirx++;
    }
  } //es un jugador
  else {
    if (Math.abs(respuesta.dirx) + Math.abs(respuesta.diry) > 0) {
      if (Math.abs(respuesta.dirx) > Math.abs(respuesta.diry)) {
        if (respuesta.dirx > 0) {
          respuesta.dirx = 1;
          respuesta.diry = 0;
        } else {
          respuesta.dirx = -1;
          respuesta.diry = 0;
        }
      } else {
        if (respuesta.diry > 0) {
          respuesta.diry = 1;
          respuesta.dirx = 0;
        } else {
          respuesta.diry = -1;
          respuesta.dirx = 0;
        }
      }
    }
  }

  return {
    jugador: respuesta.jugador,
    dirx: respuesta.dirx,
    diry: respuesta.diry
  };
}

function PedirMovimientos() {
  for (var i = 1; i < 11; i++) {
    pts[i].dirx = 0;
    pts[i].diry = 0;
  }

  //copiar los jugadores para procesar locales

  var locales = [],
    visitantes = [];
  for (i = 0; i < 11; i++) {
    if (i === 0) {
      locales.push({
        nro: i,
        x: pts[i].x,
        y: pts[i].y,
        oldDirx: pts[i].oldDirx,
        oldDiry: pts[i].oldDiry,
        dirx: pts[i].dirx,
        diry: pts[i].diry
      });
    } else {
      locales.push({
        nro: i,
        x: pts[i].x,
        y: pts[i].y,
        dirx: pts[i].dirx,
        diry: pts[i].diry
      });
    }
  }
  for (i = 0; i < 11; i++) {
    if (i === 0) {
      visitantes.push({
        nro: i,
        x: 21 - pts[i].x,
        y: pts[i].y,
        oldDirx: pts[i].oldDirx * -1,
        oldDiry: pts[i].oldDiry,
        dirx: pts[i].dirx * -1,
        diry: pts[i].diry
      });
    } else {
      visitantes.push({
        nro: i,
        x: 21 - pts[i].x,
        y: pts[i].y,
        dirx: pts[i].dirx * -1,
        diry: pts[i].diry
      });
    }
  }
  var distancia = function(a, b) {
    var disx = Math.abs(a.x - b.x);
    var disy = Math.abs(a.y - b.y);
    return disx + disy;
  };
  var trayectoriaPelota = function(miEquipo, contrarios, pto) {
    var result = [];
    if (pto.dirx === 0 && pto.diry === 0)
      return [{ x: pto.x, y: pto.y, miEquipoCerca: [], contrariosCerca: [] }];

    var p = {
      x: pto.x,
      y: pto.y,
      dirx: pto.dirx,
      diry: pto.diry
    };
    var hastaX = p.dirx > 0 ? 20 : p.dirx < 0 ? 1 : p.x;
    var hastaY = p.diry > 0 ? 10 : p.diry < 0 ? 1 : p.y;

    for (
      var i = 0, x = p.x, ox = p.x, y = p.y, oy = p.y;
      ((p.dirx >= 0 && x <= hastaX) || (p.dirx < 0 && x >= hastaX)) &&
      ((p.diry >= 0 && y <= hastaY) || (p.diry < 0 && y >= hastaY));
      i++, x += p.dirx, y += p.diry
    ) {
      if (i > 21) {
        break;
      }
      if (x !== p.x || y !== p.y) {
        if (Math.abs(p.dirx) === Math.abs(p.diry)) {
          //penpendicular
          while (Math.abs(x - ox) > 1) {
            if (p.dirx > 0) ox++;
            else ox--;
            if (p.diry > 0) oy++;
            else oy--;
            AgregarTramo(ox, oy, miEquipo, distancia, result, contrarios);
          }
        } //horizontal o vertical
        else {
          if (p.dirx !== 0) {
            //horizontal
            while (Math.abs(x - ox) > 1) {
              if (p.dirx > 0) ox++;
              else ox--;
              AgregarTramo(ox, oy, miEquipo, distancia, result, contrarios);
            }
          } //vertical
          else {
            while (Math.abs(y - oy) > 1) {
              if (p.diry > 0) oy++;
              else oy--;
              AgregarTramo(ox, oy, miEquipo, distancia, result, contrarios);
            }
          }
        }
        AgregarTramo(x, y, miEquipo, distancia, result, contrarios);
      } else continue;

      //desaselerar
      if (Math.abs(p.dirx) > 1) p.dirx += p.dirx > 0 ? 1 : -1;
      if (Math.abs(p.diry) > 1) p.diry += p.diry > 0 ? 1 : -1;

      ox = x;
      oy = y;
    }
    return result;
  };

  var tp = trayectoriaPelota(
    locales.filter(function(value, index, arr) {
      return index > 0 && index < 6;
    }),
    locales.filter(function(value, index, arr) {
      return index > 5;
    }),
    locales[0]
  );

  // para los locales  miEquipo, contrarios, yo, pelota, golesF, golesE
  console.log(local.jugar);
  eval(local.jugar);
  var respuesta = jugar(
    locales.filter(function(value, index, arr) {
      return index > 0 && index < 6;
    }),
    locales.filter(function(value, index, arr) {
      return index > 5;
    }),
    locales[0],
    golesL,
    golesV,
    tp
  );
  var respuestaL = ValidaRespuesta(
    respuesta,
    locales.filter(function(value, index, arr) {
      return index > 0 && index < 6;
    }),
    locales[0]
  );

  tp = trayectoriaPelota(
    visitantes.filter(function(value, index, arr) {
      return index > 5;
    }),
    visitantes.filter(function(value, index, arr) {
      return index > 0 && index < 6;
    }),
    visitantes[0]
  );
  console.log(visitante.jugar);
  eval(visitante.jugar);

  respuesta = jugar(
    visitantes.filter(function(value, index, arr) {
      return index > 5;
    }),
    visitantes.filter(function(value, index, arr) {
      return index > 0 && index < 6;
    }),
    visitantes[0],
    golesL,
    golesV,
    tp
  );

  var respuestaV = ValidaRespuesta(
    respuesta,
    visitantes.filter(function(value, index, arr) {
      return index > 5;
    }),
    visitantes[0]
  );
  if (respuestaV.jugador > 0) respuestaV.jugador += 5;
  if (respuestaV.jugador > 10) {
    console.log(respuestaV.jugador);
  }
  if (respuestaL.jugador > 10) {
    console.log(respuestaL.jugador);
  }
  respuestaV.dirx = respuestaV.dirx * -1;

  pts[respuestaL.jugador].dirx = respuestaL.dirx;
  pts[respuestaV.jugador].dirx = respuestaV.dirx;

  pts[respuestaL.jugador].diry = respuestaL.diry;
  pts[respuestaV.jugador].diry = respuestaV.diry;

  if (
    pts[respuestaL.jugador].dirx + pts[respuestaL.jugador].x < 1 ||
    pts[respuestaL.jugador].dirx + pts[respuestaL.jugador].x > 20
  ) {
    if (respuestaL.jugador !== 0) pts[respuestaL.jugador].dirx = 0;
  }
  if (
    pts[respuestaL.jugador].diry + pts[respuestaL.jugador].y < 1 ||
    pts[respuestaL.jugador].diry + pts[respuestaL.jugador].y > 10
  ) {
    if (respuestaL.jugador !== 0) pts[respuestaL.jugador].diry = 0;
  }
  if (
    pts[respuestaV.jugador].dirx + pts[respuestaV.jugador].x < 1 ||
    pts[respuestaV.jugador].dirx + pts[respuestaV.jugador].x > 20
  ) {
    if (respuestaV.jugador !== 0) pts[respuestaV.jugador].dirx = 0;
  }

  if (
    pts[respuestaV.jugador].diry + pts[respuestaV.jugador].y < 1 ||
    pts[respuestaV.jugador].diry + pts[respuestaV.jugador].y > 10
  ) {
    if (respuestaV.jugador !== 0) pts[respuestaV.jugador].diry = 0;
  }
}

function AgregarTramo(x, y, miEquipo, distancia, result, contrarios) {
  var cerca = [];
  var pos = { x: x, y: y };
  var masCerca, dist, min;
  //agregar compañeros cerca
  for (let index = 0; index < miEquipo.length; index++) {
    const element = miEquipo[index];
    dist = distancia(element, pos);
    if (dist <= result.length + 1)
      cerca.push({ index: index, distancia: dist });
  }
  if (cerca.length > 1) {
    cerca.sort(function(a, b) {
      return a.distancia < b.distancia ? -1 : 1;
    });
    min = cerca[0].distancia;
    masCerca = cerca.filter(function(value) {
      return value.distancia === min;
    });
  } else {
    masCerca = cerca;
  }
  pos.miEquipoCerca = masCerca;
  //agregar contrarios cerca
  for (let index = 0; index < contrarios.length; index++) {
    const element = contrarios[index];
    dist = distancia(element, pos);
    if (dist <= result.length + 1)
      cerca.push({ index: index, distancia: dist });
  }
  if (cerca.length > 1) {
    cerca.sort(function(a, b) {
      return a.distancia < b.distancia ? -1 : 1;
    });
    min = cerca[0].distancia;
    masCerca = cerca.filter(function(value) {
      return value.distancia === min;
    });
  } else {
    masCerca = cerca;
  }
  pos.contrariosCerca = masCerca;
  pos.index = result.length;
  result.push(pos);
}
var resultado;
function tiempo() {
  if (veces === 0) saca();
  veces++;
  if (resultado) {
    alert(resultado + "\n \n Locales: " + golesL + " - Visitantes: " + golesV);
    resultado = null;
    iniciaLizar();
    saca();
    dibujar();
  }
  if (veces / 60 >= 60 * 3) {
    // si pasa la cantidad de minutos termina el juego
    if (golesL > golesV) {
      alert("Gano el Local " + golesL + " a " + golesV);
      //return;
    } else if (golesL < golesV) {
      alert("Gano el Visitante " + golesV + " a " + golesL);
      //return;
    } else {
      alert("Empataron " + golesV + " a " + golesL);
      //return;
    }
    golesL = 0;
    golesV = 0;
    saca();
  }
  if (veces % 15 === 0) {
    PedirMovimientos();
    resultado = mover();

    ctx.clearRect(0, 0, 499, 249);
    dibujar();
  }
  frame(tiempo);
}

if (confirm("Jugar?")) {
  iniciaLizar();
  tiempo();
}
//dibujar();
