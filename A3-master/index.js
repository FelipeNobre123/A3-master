const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;



//CONFIGURAÇÃO DO HANDLEBARS
app.engine('hbs',hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine','hbs');
//.................................................


app.use(express.static('public'));


//rotas menu inicial
app.get('/',(req,res)=>{
    res.render('index',{NavActiveCad:true});
})
//
app.get('/cadastrar',(req,res)=>{
    res.render('cadastrar',{NavActiveUsers:true});
})

//
app.get('/cadastrar/login',(req,res)=>{
    res.render('login',{NavActiveCliente:true});
});

//
app.get('/cadastrar/login/cad-adm',(req,res)=>{
    res.render('cad-adm',{NavActiveAdm:true});
});

/*    rotas privadas

app.get('/cadastrar/login/cliente/cadadm',(req,res)=>{
    res.render('cad-adm',{NavActiveCadadm:true});
});
//

pp.get('/cadastrar/login/cliente/cadadm/adm',(req,res)=>{
    res.render('adm',{NavActiveAdm:true});
})

*/


//app.listen(PORT2,()=>{
  //  console.log('Servidor rodando em http://localhost:'+PORT2);
//})

//app.listen(PORT,()=>{
 //   console.log('Servidor rodando em http://localhost:'+PORT);
//})

app.listen(PORT,()=>{
    console.info('Servidor rodando em http://localhost:'+PORT);
})









 