import * as priv from "../private/config.json";
import { caracteres_aleatorios, dividir } from "../lib/lib";

const indexCtrl = {};
const regex_password =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð!$%&/()=?¿*^|@#¢∞¬÷“”≠´+ç¡'‚[πø¥†®€æœå∫∂ƒ™¶§~{∑©√ßµ„…–,.'-1234567890]+$/;

let functions = new Map();

functions.set("index", (req, res) => {
  const URLactual = req.protocol + "://" + req.get("Host") + req.originalUrl;
  res.send("welcome " + URLactual);
});

functions.set("encode", async (req, res) => {
  //Codificar contraseña
  let answer;
  const data = req.body;

  if (data.password.length <= priv.password_length) {
    answer = "ERROR, to short password";
  } else if (data.password.length >= priv.password_length + 1) {
    let password = data.password;
    let password_split = password.split("");

    let data_X = [];
    for (const i in password_split) {
      data_X[i] = password_split[i];
      data_X[i] = Buffer.from(data_X[i])
        .toString("base64")
        .replace("==", caracteres_aleatorios(1));
    }

    let secret = [];
    let scret_key_split = priv.secretKey.split("");
    for (const j in scret_key_split) {
      secret[j] = scret_key_split[j];
      secret[j] = Buffer.from(secret[j])
        .toString("base64")
        .replace("==", caracteres_aleatorios(1));
    }

    answer = data_X.join("").concat(":").concat(secret.join(""));
  }
  console.info();

  res.send(answer);
});

functions.set("decode", async (req, res) => {
  //Decodificar contraseña
  const data = req.body;
  let password = data.encode;
  let data_res = dividir(password);
  data_res = data_res.split(" ");
  let decode_password = [];
  for (let i = 0; i < data_res.length - 1; i++) {
    decode_password[i] = Buffer.from(
      data_res[i].concat("=="),
      "base64"
    ).toString("ascii");
  }
  res.send(decode_password);
});

indexCtrl.index = functions.get("index");
indexCtrl.encode = functions.get("encode");
indexCtrl.decode = functions.get("decode");

module.exports = indexCtrl;
