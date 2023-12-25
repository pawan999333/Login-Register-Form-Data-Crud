const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connection = require("./config/db");

dotenv.config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.redirect("/create.html");
});

app.get("/delete-data", (req, res) => {
  const deleteQuery = "delete from youtube_table where id=?";

  connection.query(deleteQuery, [req.query.id], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/data");
    }
  });
});

app.get("/update-data", (req, res) => {
  connection.query(
    "select * from youtube_table where id=?",
    [req.query.id],
    (err, eachRow) => {
      if (err) {
        console.log(err);
      } else {
        result = JSON.parse(JSON.stringify(eachRow[0]));
        console.log(result);
        res.render("edit.ejs", result);
      }
    }
  );
});

app.get("/data", (req, res) => {
  connection.query("Select * from youtube_table", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render("read.ejs", { rows });
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  try {
    connection.query(
      "INSERT into youtube_table (name,email) values(?,?)",
      [name, email],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/data");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//update
app.post("/final-update", (req, res) => {
  const id = req.body.hidden_id;
  const name = req.body.name;
  const email = req.body.email;
  const updateQuery = "update youtube_table set name=?, email=? where id=?";
  try {
    connection.query(updateQuery, [name, email, id], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(id);
        res.redirect("/data");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;

  console.log(`Server is running at port ${process.env.PORT}`);
});
