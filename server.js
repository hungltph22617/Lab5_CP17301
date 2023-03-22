const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        let fileName = file.originalname;
        let arr = fileName.split(',');
        let newfile = arr[0] + '_' + Date.now() + '.' + arr[1];
        cb(null, newfile);

    }
})
const maxSize = 1 * 1024 * 1024;
var upload = multer({ storage: storage, limits: { fileSize: maxSize } });
var up = upload.single('myFile');
app.post('/uploadfile', function (req, res) {
    up(req, res, function (err) {
        {
            if (err instanceof multer.MulterError) {
                return res.send(' kích thước file lớn hơn 1mb');
            } else {
                return res.send('thành công');
            }

        }
    })
})
//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})
// kickthuoc
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Upload.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});