export function jugar(miEquipo, contrarios, pelota, golesF, golesE, tp) {
  var distancia = function(a, b) {
    var disx = Math.abs(a.x - b.x);
    var disy = Math.abs(a.y - b.y);
    return disx + disy;
  };
  var pase = function(p1, p2) {
    var j1 = { x: p1.x, y: p1.y };
    var j2 = { x: p2.x, y: p2.y };
    var difx = j2.x - j1.x;
    var dify = j2.y - j1.y;
    var dirx = 0;
    var diry = 0;
    if (difx > 0) {
      //no vamos para atras
      if (dify === 0 || difx >= Math.abs(dify) * 2) {
        dirx = difx > 3 ? 3 : difx;
      } else if (difx >= Math.abs(dify) / 2) {
        var dif = difx > Math.abs(dify) ? Math.abs(dify) : difx; //me quedo con el menor
        dirx = dif > 2 ? 2 : dif;
        diry = dirx * (dify > 0 ? 1 : -1);
      } else {
        dirx = 0;
        diry = 0;
        if (dify > 0) diry = dify > 3 ? 3 : dify;
        else diry = dify < 3 ? -3 : dify;
      }
    } else if (difx === 0) {
      //falta desarrollar
      dirx = 0;
      diry = 0;
      if (dify > 0) diry = dify > 3 ? 3 : dify;
      else diry = dify < 3 ? -3 : dify;
    } else {
      //retrocedemos
      if (dify === 0) {
        dirx = difx < -3 ? -3 : difx;
      } else if (Math.abs(difx) >= Math.abs(dify) * 2)
        dirx = difx < -3 ? -3 : difx;
      else if (Math.abs(difx) >= Math.abs(dify) / 2) {
        dif = Math.abs(difx) > Math.abs(dify) ? Math.abs(dify) : Math.abs(difx); //me quedo con el menor
        dirx = (dif > 2 ? 2 : dif) * -1;
        diry = Math.abs(dirx) * (dify > 0 ? 1 : -1);
      } else {
        dirx = 0;
        diry = 0;
        if (dify > 0) diry = dify > 3 ? 3 : dify;
        else diry = dify < 3 ? -3 : dify;
      }
    }
    var pasos = 0;
    var falta = 0;
    var p = j1;
    var rdirx = dirx;
    var rdiry = diry;
    var peligro = 0;
    var op = { x: p.x, y: p.y };
    while (
      p.x > 0 &&
      p.x < 21 &&
      p.y > 0 &&
      p.y < 11 &&
      (rdirx <= 0 || p.x < j2.x) &&
      (rdirx >= 0 || p.x > j2.x) &&
      (rdiry <= 0 || p.y < j2.y) &&
      (rdiry >= 0 || p.y > j2.y)
    ) {
      if (p.x + rdirx < 1 || p.x + rdirx > 20) break;
      if (p.y + rdiry < 1 || p.y + rdiry > 10) break;
      op = { x: p.x, y: p.y };
      p.x += rdirx;
      p.y += rdiry;
      pasos++;
      //ver si por donde pasa la pelota hay contrarios cerca
      while (op.x !== p.x || op.y !== p.y) {
        if (rdirx > 0) op.x++;
        if (rdirx < 0) op.x--;
        if (rdiry > 0) op.y++;
        if (rdiry < 0) op.y--;
        for (var j = 0; j < contrarios.length; j++) {
          var distanciaContrario = distancia(contrarios[j], op);
          if (distanciaContrario - pasos < 1)
            //los contrarios se hacen de la pelota
            peligro += 2 * (Math.abs(distanciaContrario - pasos) + 1);
        }
      }
      if (Math.abs(rdirx) > 1) {
        if (rdirx > 0) rdirx--;
        else rdirx++;
      }
      if (Math.abs(rdiry) > 1) {
        if (rdiry > 0) rdiry--;
        else rdiry++;
      }
      falta = Math.abs(p2.x - p.x) + Math.abs(p2.y - p.y);
    }
    if (Math.abs(dirx) > 3 || Math.abs(diry) > 3) {
      console.log("abs de dirx o diry > 3");
    }
    return {
      distancia: pasos + (falta > pasos ? 20 : 0) + peligro,
      dirx: dirx,
      diry: diry,
      recibeEn: p
    };
  };
  var distanciaTiroArco = function(jug) {
    var result = [];
    var difx = 20 - jug.x;
    var peligro = 0;
    if (jug.y > 2 && jug.y < 9) {
      //tengo tiro recto al arco
      var pasos = 0;
      var x = jug.x;
      for (var i = 0; i < difx; i++) {
        pasos++;
        if (pasos === 1) i += 2;
        else if (pasos === 2) i += 1;
        while (x < jug.x + i) {
          x++;
          for (var j = 0; j < contrarios.length; j++) {
            var distanciaContrario = distancia(contrarios[j], {
              x: x,
              y: jug.y
            });
            if (distanciaContrario - pasos < 1)
              //los contrarios se hacen de la pelota
              peligro += 2 * (Math.abs(distanciaContrario - pasos) + 1);
          }
        }
      }
      result.push({ distancia: pasos + peligro, dirx: 3, diry: 0 });
    }

    pasos = 0;
    for (i = 0; i < difx; i++) {
      pasos++;
      if (pasos === 1) i += 1;

      for (var j = 0; j < contrarios.length; j++) {
        var distanciaContrario = distancia(contrarios[j], {
          x: jug.x + i,
          y: jug.y + i * (jug.y + difx < 9 && jug.y + difx > 2 ? 1 : -1)
        });
        if (distanciaContrario - pasos < 1)
          //los contrarios se hacen de la pelota
          peligro += 3 * (Math.abs(distanciaContrario - pasos) + 1);
      }
    }
    if (jug.y + difx < 9 && jug.y + difx > 2) {
      //tengo tiro pateando subindo x e y
      result.push({ distancia: pasos + peligro, dirx: 2, diry: 2 });
    }
    if (jug.y - difx < 9 && jug.y - difx > 2) {
      // tengo tiro pateando subiendo x y bajando y
      result.push({ distancia: pasos + peligro, dirx: 2, diry: -2 });
    } //no tengo tiro al arco :(
    return result;
  };
  /*
  var tp = [];
  if (pelota) tp = trayectoriaPelota(pelota);
  // no esta la pelota en juego, solo hay que devolver un arreglo con la posición x,y de cada jugador
  else {
    return [
      { x: 1, y: 5 },
      { x: 3, y: 3 },
      { x: 4, y: 7 },
      { x: 14, y: 3 },
      { x: 16, y: 7 }
    ];
  }*/
  if (!pelota)
    return [
      { x: 1, y: 5 },
      { x: 7, y: 3 },
      { x: 6, y: 7 },
      { x: 12, y: 7 },
      { x: 16, y: 3 }
    ];

  //ver que jugador nuestro esta mas cerca de la trayectoria de la pelota, le agregamos una propiedad
  // de distancia
  var compas = [];
  for (let i = 0; i < miEquipo.length; i++) {
    if (miEquipo[i].x === pelota.x && miEquipo[i].y === pelota.y) {
      //tengo la pelota
      //tenemos la pelota, hay que decidir para donde patear
      //ver a que compañero pasar la pelota o al arco
      for (var h = 0; h < miEquipo.length; h++) {
        if (h === Number(i)) continue;
        miEquipo[h].pase = pase(miEquipo[i], miEquipo[h]);
      }
      var miTiroAlArco = distanciaTiroArco(miEquipo[i]);
      compas = miEquipo.sort(function(a, b) {
        if (a.pase && b.pase) {
          //if (a.x > b.x) return -1;
          var xdif = (a.x - b.x) / 2.0;
          if (a.pase.distancia - xdif < b.pase.distancia) return -1;
          else return 1;
        } else {
          if (b.pase) return 1;
          else return -1;
        }
      });
      var compaIndex = 0,
        tiroIndex = 0;
      //me fijo de no darsela al mismo que me la dio
      if (
        compas[0].pase.dirx === pelota.oldDirx * -1 &&
        compas[0].pase.diry === pelota.oldDiry * -1
      ) {
        compaIndex = 1;
      }

      var miTiroFiltrado = miTiroAlArco.filter(function(item) {
        return (
          item.dirx !== pelota.oldDirx * -1 || item.diry !== pelota.oldDiry * -1
        );
      });

      var tiroCompa = distanciaTiroArco(compas[compaIndex].pase.recibeEn);
      var suTiroFiltrado = tiroCompa.filter(function(item) {
        return (
          item.dirx !== pelota.oldDirx * -1 || item.diry !== pelota.oldDiry * -1
        );
      });

      var pasar = false;
      var tirar = false;
      if (miTiroFiltrado.length > 0) {
        tirar = true;

        if (suTiroFiltrado.length > 0) {
          if (miTiroFiltrado[0].distancia > suTiroFiltrado[0].distancia) {
            pasar = true;
          }
        } else if (miTiroFiltrado[0].distancia > 20) {
          tirar = false;
          pasar = true;
        }
      } else {
        pasar = true;
      }
      if (pasar) {
        return {
          jugador: 0,
          dirx: compas[compaIndex].pase.dirx,
          diry: compas[compaIndex].pase.diry
        };
      } else if (tirar) {
        return {
          jugador: 0,
          dirx: miTiroFiltrado[0].dirx,
          diry: miTiroFiltrado[0].diry
        };
      } else {
        //que carajo hago??? La tiro afuera
        return {
          jugador: 0,
          dirx: 0,
          diry: pelota.y < 5 ? -1 : 1
        };
      }
    }
  }
  var noMover = -1;
  var dirx = 0,
    diry = 0;
  //ver si tengo que atajar la pelota que va al arco
  var atajar = tp.filter(function(ele) {
    return ele.x === 1 && ele.y > 2 && ele.y < 9; //arquero
  });

  if (atajar.length > 0) {
    //tengo que atajar pelota
    if (atajar[0].miEquipoCerca.length !== 0) {
      //puedo atajar
      if (atajar[0].miEquipoCerca[0].distancia === 0) {
        //no lo muevo porque esta bien
        noMover = atajar[0].miEquipoCerca[0].index;
      } else {
        diry = 0;
        dirx = 0;
        var difx = atajar[0].x - miEquipo[atajar[0].miEquipoCerca[0].index].x;
        var dify = atajar[0].y - miEquipo[atajar[0].miEquipoCerca[0].index].y;
        if (Math.abs(difx) > Math.abs(dify)) dirx = difx > 0 ? 1 : -1;
        else diry = dify > 0 ? 1 : -1;
        return {
          jugador: atajar[0].miEquipoCerca[0].index + 1,
          diry: diry,
          dirx: dirx
        };
      }
    } else {
      // ver si puedo cazar la pelota antes
      atajar = tp.filter(function(ele) {
        return ele.miEquipoCerca.length > 0;
      });
      atajar.sort(function(a, b) {
        return a.miEquipoCerca[0].distancia < b.miEquipoCerca[0].distancia + 1
          ? -1
          : 1;
      });
      if (atajar.length > 0) {
        if (atajar[0].miEquipoCerca[0].distancia === 0) {
          //no lo muevo porque esta bien
          noMover = atajar[0].miEquipoCerca[0].index;
        } else {
          dirx = 0;
          diry = 0;
          difx = atajar[0].x - miEquipo[atajar[0].miEquipoCerca[0].index].x;
          dify = atajar[0].y - miEquipo[atajar[0].miEquipoCerca[0].index].y;
          if (Math.abs(difx) > Math.abs(dify)) dirx = difx > 0 ? 1 : -1;
          else diry = dify > 0 ? 1 : -1;
          return {
            jugador: atajar[0].miEquipoCerca[0].index + 1,
            diry: diry,
            dirx: dirx
          };
        }
      }
    }
  }

  diry = 0;
  dirx = 0;

  if (tp.length > 0) {
    //si la pelota esta en movimiento
    //ordeno tp para dejar primero el tramo al cual me interesa llegar
    tp.sort(function(a, b) {
      if (a.miEquipoCerca.length === 0 && b.miEquipoCerca.length === 0)
        return -1; //me da lo mismo ninguno de los trayectos me son asecibles
      if (a.miEquipoCerca.length === 0) return 1; //el a no es accesible y el b si
      if (b.miEquipoCerca.length === 0) return -1; //el b no es accesible y el a si
      if (a.contrariosCerca.length === 0 && b.contrariosCerca.length === 0)
        return a.miEquipoCerca[0].distancia <= b.miEquipoCerca[0].distancia
          ? -1
          : 1;
      if (a.contrariosCerca.length === 0) return -1; // en b tengo contrarios cerca
      if (b.contrariosCerca.length === 0) return -1; // en a tengo contrarios cerca
      var disa =
        a.miEquipoCerca[0].distancia + (20 - a.contrariosCerca[0].distancia);
      var disb =
        b.miEquipoCerca[0].distancia + (20 - b.contrariosCerca[0].distancia);
      return disa < disb ? -1 : 1;
    });
    if (tp[0].miEquipoCerca.length > 0) {
      var mover = true;
      if (tp[0].contrariosCerca.length > 0) {
        if (
          tp[0].miEquipoCerca[0].distancia > tp[0].contrariosCerca[0].distancia
        )
          mover = false;
      }
      if (mover) {
        difx = tp[0].x - miEquipo[tp[0].miEquipoCerca[0].index].x;
        dify = tp[0].y - miEquipo[tp[0].miEquipoCerca[0].index].y;
        if (Math.abs(difx) >= Math.abs(dify)) dirx = difx > 0 ? 1 : -1;
        else diry = dify > 0 ? 1 : -1;
        if (tp[0].miEquipoCerca[0].distancia === 0) {
          //no lo muevo porque esta bien
          noMover = tp[0].miEquipoCerca[0].index;
        } else {
          return {
            jugador: tp[0].miEquipoCerca[0].index + 1,
            diry: diry,
            dirx: dirx
          };
        }
      }
    }
  }

  //no tengo que atajar nada, ni tampoco llego a la pelota
  //aprovecho a acomodar mis jugadores

  //reviso que esten en orden
  if (miEquipo[4].x <= miEquipo[3].x) {
    if (miEquipo[4].x < 17 && noMover !== 4)
      return { jugador: 5, diry: 0, dirx: 1 };
    else if (noMover !== 3) return { jugador: 4, diry: 0, dirx: -1 };
  }

  //controlo que los defensores esten detras de los volantes
  if (miEquipo[3].x <= miEquipo[2].x) {
    if (miEquipo[2].x > 7 && noMover !== 2)
      return { jugador: 3, diry: 0, dirx: -1 };
    else if (noMover !== 3) return { jugador: 4, diry: 0, dirx: 1 };
  }

  //controlo que los defensores esten detras de los volantes
  if (miEquipo[3].x <= miEquipo[1].x) {
    if (miEquipo[1].x > 7 && noMover !== 1)
      return { jugador: 2, diry: 0, dirx: -1 };
    else if (noMover !== 3) return { jugador: 4, diry: 0, dirx: 1 };
  }

  //bajo a defensores
  if (miEquipo[2].x > 7 && noMover !== 2)
    return { jugador: 3, diry: 0, dirx: -1 };
  if (miEquipo[1].x > 7 && noMover !== 1)
    return { jugador: 2, diry: 0, dirx: -1 };

  //separo a defensores del fondo
  if (miEquipo[2].x < 4 && noMover !== 2)
    return { jugador: 3, diry: 0, dirx: 1 };

  if (miEquipo[1].x < 4 && noMover !== 1)
    return { jugador: 2, diry: 0, dirx: 1 };

  //posiciono para que pueda patear derecho al arco al delantero
  if (miEquipo[4].y < 3 && noMover !== 4)
    return { jugador: 5, diry: 1, dirx: 0 };
  else if (miEquipo[4].y > 8 && noMover !== 4)
    return { jugador: 5, diry: -1, dirx: 0 };

  //posiciono  al delantero mas cerca del arco
  if (miEquipo[4].x < 16 && noMover !== 4)
    return { jugador: 5, diry: 0, dirx: 1 };

  //posiciono al volante en diagonal al delantero para darle pase
  difx = Math.abs(miEquipo[4].x - miEquipo[3].x);
  dify = Math.abs(miEquipo[4].y - miEquipo[3].y);
  if (difx > dify && noMover !== 2)
    return {
      jugador: 3,
      diry: miEquipo[4].y > miEquipo[3].y ? -1 : 1,
      dirx: 0
    };
  else if (difx < dify && noMover !== 2)
    return { jugador: 3, diry: 0, dirx: -1 };

  //acomodo a los defensores sobre eje de y
  if (miEquipo[2].y < 3 && noMover !== 2)
    return { jugador: 3, diry: 1, dirx: 0 };
  if (miEquipo[2].y > 3 && noMover !== 2)
    return { jugador: 3, diry: -1, dirx: 0 };

  if (miEquipo[1].y > 7 && noMover !== 1)
    return { jugador: 2, diry: -1, dirx: 0 };
  if (miEquipo[1].y < 7 && noMover !== 1)
    return { jugador: 2, diry: 1, dirx: 0 };

  // ver arquero
  if (miEquipo[0].y < 5 && noMover !== 0)
    return { jugador: 1, diry: 1, dirx: 0 };
  if (miEquipo[0].y > 6 && noMover !== 0)
    return { jugador: 1, diry: -1, dirx: 0 };

  if (miEquipo[0].x > 1 && noMover !== 0)
    return { jugador: 1, diry: 0, dirx: -1 };

  // sino no tengo a nadie para mover devuelvo sin movimiento al arquero
  return { jugador: 1, diry: 0, dirx: 0 };
}
