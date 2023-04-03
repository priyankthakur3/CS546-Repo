// This file should set up the express server as shown in the lecture code
import express from "express";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import exphbs from "express-handlebars";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + "/public");

const app = express();
const port = 3010;

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    partialsDir: [path.join(__dirname, "views/pages")],
  })
);
app.set("view engine", "handlebars");
configRoutes(app);

app.listen(port, () => {
  console.log("We've now got a server!");
  console.log(`Your routes will be running on http://localhost:${port}`);
});
