const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const Photo = require('./models/Photo');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');

const app = express();

// veritabanına bağlanma
mongoose.connect('mongodb+srv://eren:zIL2Hc5ozU9a9JHv@cluster0.cguhiia.mongodb.net/pcat-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
})
.then(() => {
  console.log('DB Connected');
})
.catch((err) => {
  console.log(err);
});

// TEMPLATE ENGINE
// set'te önceden tanımlı config değişkenleri yazılır
// otomatik olarak views klasörünün içine bakar
app.set('view engine', 'ejs');

// kendi yazdığımız middleware
// request gönerildikten sonra respons gelmeden yapılacak işler (ikisi arasında)
// next() kullanılmazsa sayfa açılmaz(response'ye ulaşmaz)
const myLogger = (res, req, next) => {
  console.log('midd 1');
  next();
};

// MIDDLEWARES
// static dosyaların bulunduğu klasör yolunu gösterir
app.use(express.static('public'));
// form'da submit edildiğinde requesti alabilmek için
// req, res döngüsünü sonlandırmak için yardımcı
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// app.use(myLogger);

// KLASOR OLUSTURMA
const uploadDir = 'public/uploads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('sunucu basladı');
});
