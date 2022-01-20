import express from "express";
import fs from "fs";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.set("view engine", "pug");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

const getAnissiaData = async (week) =>
  await axios.get(`https://anissia.net/api/anime/schedule/${week}`);

/* (async () => {
  const datas = {};
  for (let i = 0; i < 9; i++) {
    const { data } = await getAnissiaData(i);
    await data.forEach((item) => {
      const { subject } = item;
      datas[subject] = { name: subject, check: false };
    });
  }
  await fs.writeFileSync(
    `${__dirname}/data/karyl_list.json`,
    JSON.stringify(datas)
  );
})(); */

app.get("/", async (req, res) => {
  const file_data = await fs.readFileSync(`${__dirname}/data/karyl_list.json`);
  const json = await JSON.parse(file_data);

  res.render("home", { list: json });
});

app.post("/change_state", async (req, res) => {
  const name = req.body.name;
  const file_data = await fs.readFileSync(`${__dirname}/data/karyl_list.json`);
  const json = await JSON.parse(file_data);
  json[name].check = !json[name].check;
  await fs.writeFileSync(
    `${__dirname}/data/karyl_list.json`,
    JSON.stringify(json)
  );
  res.send("error");
});

app.post("/new_item", async (req, res) => {
  try {
    const file_data = await fs.readFileSync(
      `${__dirname}/data/karyl_list.json`
    );
    const json = await JSON.parse(file_data);
    console.log(json);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen("3100", () => console.log("Server listen http://localhost:3100"));
