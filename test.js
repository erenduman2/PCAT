//SCHEMA --> ŞABLON

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// veritabanına bağlanma
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema oluşturma
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

//model oluşturma
// çalıştığında photos adında collection oluşur
const Photo = mongoose.model('Photo', PhotoSchema);

//CREATE photo
// Photo.create({
//   title: 'title 1',
//   description: 'description 1',
// });

//READ photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// UPDATE photo
id = '631f4445f8743ba3acd5f2a5';
// parametre olarak => id, değişmek-istenen-bilgi, <>, callback
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'title 111 update',
//     description: 'desc 111 updated',
//   },
//   {
//     new: true, // log'lanacak datanın yeni data olması için yazılır
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// delete photo
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('silindi');
});
