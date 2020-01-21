const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4')
const bodyParser = require ('body-parser');
const cons = require('consolidate');
const multer= require('multer');
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.engine('html', cons.swig);
app.set('view engine','html');
app.set('views', './views');

app.use(upload.array());
app.use(express.static('public'));


let casas = {
    1: {
      id: '1',
      puerta: 'Roble',
      ventana: 'Egipciano',
    },
    2: {
        id: '2',
        puerta: 'Sauce',
        ventana: 'Romano',
    },
    3: {
        id: '3',
        puerta: 'Dalmata Verde',
        ventana: 'Griegocano',
    },
  };

  app.get('/post', (req, res) => {
     res.render('formulario');
     console.log('GET')
  });

  app.get('/put', (req, res) => {
    res.render('formulario2');
    console.log('GET')

 });

 app.get('/delete', (req, res) => {
  res.render('formulario3');
  console.log('GET')

});

  app.get('/casas', (req, res) => {
    return res.send(Object.values(casas))
    console.log('GET')

  });
  app.get('/casas/:casaId', (req, res) => {
    return res.send(casas[req.params.casaId]);
    console.log('GET')

  });
app.post('/casas', (req, res) => {
    const id = uuidv4();
    const casa = {
      id,
      puerta: req.body.puerta,
      ventana: req.body.ventana,
    };
    casas[id] = casa;
    console.log('post')

    return res.send(casa);

  });

  app.put('/casas', (req, res) => {
    id= req.body.id
    console.log(casas[id])
    if(casas[id]== undefined){
        return res.send( "No existe dicho libro");
    }
    casas[id]["puerta"] =  req.body.puerta;
    casas[id]["ventana"] =  req.body.ventana;
    console.log('put')

        return res.send(Object.values(casas));
  });
  app.delete('/casas', (req, res) => {
    id= req.body.id
    console.log('DELETE')
    console.log(casas[id])
    if(casas[id]== undefined){
        return res.send( "No existe dicho libro");
    }
    delete casas.id
    console.log('DELETE')

        return res.send(Object.values(casas));
  });



  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  }); 