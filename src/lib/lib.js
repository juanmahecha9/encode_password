/*
@Juanmahecha9
@Params: funciones genericas
*/

const functions_ = {};

//Caracteres especiales aleatorios
functions_.caracteres_aleatorios = (x) => {
  const caracteres = [
    "≤",
    "!",
    "·",
    "$",
    "%",
    "&",
    "/",
    "(",
    ")",
    "=",
    "?",
    "¿",
    "<",
    ">",
    "|",
    "#",
    "¢",
    "∞",
    "¬",
    "÷",
    "≠",
    "œ",
    "œ",
    "€",
    "®",
    "†",
    "¥",
    "π",
    "å",
    "∫",
    "ƒ",
    "µ",
    "∑",
    "√",
    ";",
    "∂",
    "~",
    "{",
    "}",
    ".",
  ];

  const randomNumbers = [];
  const NUMBERS_LENGTH = caracteres.length;

  // agregando aleatorios a randomNumbers
  while (randomNumbers.length < x) {
    const randomIndex = getRandom();
    if (!checkNotRepeat(caracteres[randomIndex], randomNumbers))
      randomNumbers.push(caracteres[randomIndex]);
  }

  // obteniendo aleatorios en rango
  function getRandom() {
    return Math.floor(Math.random() * NUMBERS_LENGTH);
  }

  // checkeando por no repetidos
  function checkNotRepeat(current, validNumbers) {
    return validNumbers.includes(current);
  }

  return randomNumbers;
};

// dividir cadena de texto por caracteres especiales
functions_.dividir = (x) => {
  const caracteres = [
    "≤",
    "!",
    "·",
    "$",
    "%",
    "&",
    "/",
    "(",
    ")",
    "=",
    "?",
    "¿",
    "<",
    ">",
    "|",
    "#",
    "¢",
    "∞",
    "¬",
    "÷",
    "≠",
    "œ",
    "œ",
    "€",
    "®",
    "†",
    "¥",
    "π",
    "å",
    "∫",
    "ƒ",
    "µ",
    "∑",
    "√",
    ";",
    "∂",
    "~",
    "{",
    "}",
    ".",
  ];

  let data = x.split(":");
  data = data[0];
  for (const i in x) {
    for (const j in caracteres) {
      //console.info(x[i], caracteres[j]);
      if (x[i] === caracteres[j]) {
        data = data.replace(caracteres[j], " ");
      } else {
        data = data;
      }
    }
  }

  return data;
};

module.exports = functions_;
