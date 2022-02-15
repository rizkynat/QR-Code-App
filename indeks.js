//menginport package yang kita butuhkan
const express = require('express');
const app = express();
const bp = require("body-parser");
const qr = require('qrcode');


app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: false}));//mengkonvert karakter
app.use(bp.json());

//routing sederhana pada indeks.js
//membuat listener pada root (/), dan menampilkan halaman indeks.ej
app.get('/',(req,res)=>{
    res.render("indeks");
});

//menambahkan post request listener untuk menconvert text/url ke QR code
app.post('/scan',(req,res)=>{
    const url = req.body.url;

    if(url.length ===0) res.send("Url tidak boleh kosong");


    qr.toDataURL(url,(err,src)=>{
        if(err) res.send("Url tidak valid");

        //mengembalikan QR code dari resposn yang dikirmkan dan mengatur nya menjadi sumber webpage
        res.render('scan',{src});
    });
})

///menkonfigurasikan port yang didengar 
const port = 5000;
app.listen(port, ()=>console.log("server berjalan pada port "+port));