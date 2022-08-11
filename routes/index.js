var express = require('express');

var router = express.Router();

const mongoose = require('mongoose')
const {Schema} = mongoose;
const uri = "mongodb+srv://DaoTuan:08072002@cluster0.azbwdip.mongodb.net/lab78?retryWrites=true&w=majority";
mongoose.connect(uri).catch(err => console.log('abc ' + err));

const imagesUploads = new Schema({
  picture: 'string'
});
const ImagesLab = mongoose.model('images_lab78', imagesUploads);

/* GET home page. */
router.get('/', function (req, res, next) {
  ImagesLab.find({}, function (error, result) {
    res.render('index', {data: result})
  })
});
//add
router.post('/add', async function (req, res, next) {
  // lấy ra các tham số
  var picture = req.body.picture;
  const PT = new ImagesLab({
    picture: picture
  })
  await PT.save();
  // lấy lại danh sách và hiển thị trên trang index
  ImagesLab.find({}, function (error, result) {
    res.render('index', {data: result})
  })
});

//Delete
router.get('/deleteIMG', async function (req, res, next) {

  await ImagesLab.deleteOne({_id: req.query.id})

  res.redirect('/');
});
//dang JSON
router.get('/getJSON', function (req, res) {

  const ListImageAPI = mongoose.model('images_lab78', imagesUploads);

  ListImageAPI.find({}, function (error, result) {
    res.send(result);
  })
})
module.exports = router;
