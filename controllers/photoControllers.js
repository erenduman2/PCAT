const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

exports.getAllPhotos = async (req, res) => {
  // res.send('selam');
  // res.sendFile(path.resolve(__dirname, 'temp/index.html')); --> statik file gönderme

  // link kısmına girilen ?page=2.. gibi değişken değerlerini alır
  const page = req.query.page || 1;
  const photoPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();
  console.log(totalPhotos);
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photoPerPage) // işlem miktarı kadar eleman skip edilir(3. sayfada 2*2 kadar eleman önceki sayfalara ait olduğu için skip edilmeli)
    .limit(photoPerPage); // her sayfada maks 2 tane foto gösterilmeli

  res.render('index', {
    photos: photos, // photos şeklinde de gönderilebilir
    current: page,
    pages: Math.ceil(totalPhotos / photoPerPage), // total page sayısı
  });

  // const photos = await Photo.find({}).sort('-dateCreated');
  // // views içinde bulunan index'i render eder
  // res.render('index', {
  //   photos,
  // });
};

exports.getPhoto = async (req, res) => {
  // console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  // .image -> html dosyasında verilen name
  let uploadImage = req.files.image; // express-fileupload ile alındı
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;

  // mv -> görseli taşır, 1. param - taşınacak yol, 2. param sonrasındaki işlem
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
  // res.redirect(`${req.params.id}`)
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedPhotoDir = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedPhotoDir);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
