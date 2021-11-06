import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as config from "./configuration/config.json";
const app = express();
import router from "../src/routes/routes";

app.set("port", process.env.PORT || config.app.port);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({origin: config.app.cors}))

// activacion de los cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  /* Voy a tener acceso, control, seguimiento y origen de todos los datos que van a ingresar a la API */
  res.header("Access-Control-Allow-Headers", config.access.cookies);
  /* Acceso a todos los metadatos- cookies */
  res.header("Access-Control-Allow-Methods", config.access.method);
  /* Acceso a todos los metodos http- metodos de peticio */
  res.header("Allow", config.access.method);
  /* Confirmacion estricta de los metodos a utilizar */
  next();
});

app.use(router);

app.listen(app.get("port"), () => {
  console.log("development by yuem/CLI");
  console.log("created by juanmahecha9");
  console.log("server running at http://localhost:" + app.get("port"));
});
