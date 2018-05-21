var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var exec = require('child_process').exec;


var PATH_BASE = 'C:\\baseproject\\base\\';
var PATH_BASE_BIGTICK = 'C:\\baseproject\\base\\list_bigtick.tex';
var PATH_BASE_ANSWERS = 'C:\\baseproject\\base\\list_ans.tex';
var PATH_BASE_EXAM = 'C:\\baseproject\\base\\list_exam.tex';
var CMD_START_BAT = 'C:\\baseproject\\base\\1.bat';
var PATH_PDFS = 'C:\\baseproject\\xtex\\pdfs\\';


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/static', express.static('static'))
app.use('/pdfs', express.static('pdfs'))


app.get('/', function (req, res) {
  fs.readFile('static/index.html', function (err, data) {
    if (err) throw err;
    res.status(200)
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(data)
  });
});


app.post('/generate-pdf', function (req, res) {
  var body = req.body;
  var ids = body.ids || [];

  var filename = new Date().getTime() + '';
  var tasksFilename = PATH_BASE + filename + '.tex';
  var answersFilename = PATH_BASE + filename + '_ans.tex';
  var examFilename = PATH_BASE + filename + '_exam.tex';
  var tasksPDFFilename = 'c:\\baseproject\\base\\' + filename + '.pdf';
  var answersPDFFilename = 'c:\\baseproject\\base\\' + filename + '_ans.pdf';
  var examPDFFilename = 'c:\\baseproject\\base\\' + filename + '_exam.pdf';

  var cmd4 = [
    'cd ' + PATH_BASE,
    'expand -n' + ids.join(',') + ' -v' + body.variants,
    'copy ' + PATH_BASE_BIGTICK + ' ' + tasksFilename,
    'copy ' + PATH_BASE_ANSWERS + ' ' + answersFilename,
    'copy ' + PATH_BASE_EXAM + ' ' + examFilename,
    'pdflatex ' + tasksFilename,
    'pdflatex ' + answersFilename,
    'pdflatex ' + examFilename,
    'copy ' + tasksPDFFilename + ' ' + PATH_PDFS,
    'copy ' + answersPDFFilename + ' ' + PATH_PDFS,
    'copy ' + examPDFFilename + ' ' + PATH_PDFS,
    '',
    
  ].join('\n');

  
  fs.writeFile(CMD_START_BAT, cmd4, function (err) {
    if (err) {
      console.log('ERROR!', err);
      res.status(500).send('Error: cannot generate batch script');
      return;
    }


    
    exec(CMD_START_BAT, function (err, stdout, stderr){
      if (err) {
        console.log('ERROR!', err);
        res.status(500).send('Error: cannot execute batch script');
        return;
      }


      res.status(200).send({
        tasksPDFFilename: '/pdfs/' + filename + '.pdf',
        answersPDFFilename: '/pdfs/' + filename + '_ans.pdf',
        examPDFFilename: '/pdfs/' + filename + '_exam.pdf',
      })


    });



  })



})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
