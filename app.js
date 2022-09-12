const express = require('express');
const path = require('path');

const app = express();

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

// app.use(myLogger);

app.get('/', (req, res) => {
  // res.send('selasdam');
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log('sunucu basladı');
});
