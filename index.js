var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");


app.use(bodyParser.json()); // รับ bodyParser เป็น json  มาใช้
app.use(bodyParser.urlencoded({ extended: false }));

// font เรียกใช้อะไรได้บ้าง


app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
    );
    next();
  });


//กำหนด port
var port = process.env.PORT || 3000;

//เชื่อม myadmin
var con = mysql.createConnection({
    host: "h1.host.filess.io",
    user: "jaiyenyen_withinband",
    password: "5d6a704cfec0c8a96bec9ba4e1ded20254eba7e3",
    database: "jaiyenyen_withinband",
});


// แปลงเป็น json แล้ว return 
app.get("/", function (req, res) {
    res.json({
        status: "success",
    });
});


//req font ส่ง back , res back ส่งกลับไปให้ font
app.get("/customer", function (req, res) {
    var sql = "SELECT * FROM `customer`";
    con.query(sql, function (err, row) {
      if (err) throw err;
      res.json({
        status: "success",
        data: row,
      });
    });
  });

// id 
app.get("/customer/:UID", function (req, res) {
    var sql = "SELECT * FROM `customer` WHERE `UID`=" + req.params.UID;//ดึงถานข้อมูลSELECT*
    con.query(sql, function (err, row) {
        if (err) throw err;
        res.json({
            status: "success",
            data: row[0],
        });
    });
})
//เพิ่มข้มูลจาก ID
app.post("/customer/", function (req, res) {
    var sql = "INSERT INTO `customer`(`Fullname`, `P_number`) VALUES (?,?)";
    con.query(sql, [req.body.Fullname, req.body.P_number], function (err) {
        if (err) throw err;
        res.json({
            status: "success",
            data: "Add data success",
        });
    });
});

//-----------------------------แก้ไขข้อมูล จาก UID
app.put("/customer/:UID", function (req, res) {
    var sql =
        "UPDATE `customer` SET `Fullname`=?,`P_number`=? WHERE `UID`=" +
        req.params.UID;
    con.query(sql, [req.body.Fullname, req.body.P_number], function (err) {
        if (err) throw err;
        res.json({
            status: "success",
            data: "Update data success",
        });
    });
});

//------------------------------------------------------ลบค่าจาก ID
app.delete("/customer/:UID", function (req, res) {
    var sql = "DELETE FROM `customer` WHERE `UID`=" + req.params.UID;
    con.query(sql, function (err) {
      if (err) throw err;
      res.json({
        status: "success",
        data: "Delete data success",
      });
    });
  });



//อ่าน port แล้ว log
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});