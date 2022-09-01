"use strict"
let matriz = new Array();

let containerMatriz = document.querySelector(".matriz-container");
let fragment = document.createDocumentFragment();
const filas = 3;
const columnas = 9;
let cantNegados = 4;

//FUNCION QUE GENERA NUMERO ALEATORIO EN UN RANGO
const generarNumeroAleatorio = (min, max) => {
  let num = Math.random() * ((max + 1) - min);
  return Math.trunc(num + min);
};
//FUNCION QUE COLOCA VALORES VACÍOS SIGUIENDO LA LÓGICA DE LA CONSIGNA
const negarValores = (matrizAnegar) => {
  for (let fila = 0; fila < 3; fila++) {
    for (let negadosRandom = 0; negadosRandom < cantNegados; negadosRandom++) {
      if (fila === 0 || fila === 2) {
        if (fila === 2) {
          matrizAnegar[0].map((valorFila0, index) => {
            if (valorFila0 !== null && matrizAnegar[1][index] !== null) {
              matrizAnegar[fila][index] = null;
              cantNegados = 3;
            }
          })
        }
        let columna = generarNumeroAleatorio(0, 8);
        if (matrizAnegar[fila][columna] != null) matrizAnegar[fila][columna] = null;
        else {
          while (matrizAnegar[fila][columna] === null)
            columna = generarNumeroAleatorio(0, 8);
          matrizAnegar[fila][columna] = null;
        }
      }
    }
    if (fila == 1) {
      let negados = 0;
      matrizAnegar[0].map((valor, index) => {
        if (valor !== null && negados < 4) {
          matrizAnegar[1][index] = null;
          negados++;
        }
      });
    }
  }
}
//FUNCIÓN QUE GENERA LA MATRIZ DE 3X9 CON VALIDACIONES EN FC DE LA COLUMNA
const generarMatriz = () => {
  for (let i = 0; i < filas; i++) {
    matriz[i] = new Array();
    for (let j = 0; j < columnas; j++) {
      if (j === 0) {
        matriz[i][j] = generarNumeroAleatorio(1, 9);
        if (i > 0) {
          for (let s = i - 1; s >= 0; s--) {
            if (matriz[i][j] === matriz[s][j]) {
              console.log("se repiten valores en columna 0");
              while (matriz[i][j] === matriz[s][j])
                matriz[i][j] = generarNumeroAleatorio(1, 9);
            }
          }
        }
      } else if (j < 8) {
        matriz[i][j] = generarNumeroAleatorio((j * 10), ((j * 10) + 9));
        if (i > 0) {
          for (let s = i - 1; s >= 0; s--) {
            if (matriz[i][j] === matriz[s][j]) {
              console.log("se repiten valores en columnas del medio");
              while (matriz[i][j] === matriz[s][j])
                matriz[i][j] = generarNumeroAleatorio((j * 10), ((j * 10) + 9));
            }
          }
        }
      } else {
        matriz[i][j] = generarNumeroAleatorio((j * 10), ((j * 10) + 10));
        if (i > 0) {
          for (let s = i - 1; s >= 0; s--) {
            if (matriz[i][j] === matriz[s][j]) {
              console.log("se repiten valores en columna 8");
              while (matriz[i][j] === matriz[s][j])
                matriz[i][j] = generarNumeroAleatorio((j * 10), ((j * 10) + 10));
            }
          }
        }
      }
    }
  }
};
//FUNCION QUE RENDERIZA LA MATRIZ EN EL DOM
const renderizarMatriz = (matrizArenderizar) => {
  let fila = 0;

  matrizArenderizar.map((elemento,) => {
    let divFila = document.createElement('DIV');
    divFila.classList.add(`fila`, `nro-${fila}`);

    for (let i = 0; i < elemento.length; i++) {
      let divElemento = document.createElement('DIV');
      divElemento.classList.add(`elemento`, `coord-${fila}${i}`);
      if (i == 0 && matrizArenderizar[fila][i] !== null) {
        divElemento.innerHTML = `0${matrizArenderizar[fila][i]}`;
      } else {
        divElemento.innerHTML = matrizArenderizar[fila][i];
      }

      divElemento.textContent === '' && divElemento.classList.add("vacio");
      divFila.appendChild(divElemento);
    }
    fragment.appendChild(divFila);
    fila++;
  });
  containerMatriz.appendChild(fragment);
}

//INVOCACIÓN DE LAS FUNCIONES ANTERIORES
generarMatriz();
negarValores(matriz);
renderizarMatriz(matriz);