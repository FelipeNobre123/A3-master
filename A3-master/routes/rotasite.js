const express = require('express');
const router = express.touter();

//inicio/cadastro/login/cliente
//incio/login/administrador

router.get('/', (req,res)=>{
    res.send('inicio');
})

router.get('/cadastro', (req,res)=>{
    res.send('cadastro');
})

router.get('cadastro/login', (req,res)=>{
    res.send('login');
})

router.get('cadastro/login/cliente', (req,res)=>{
    res.send('inicio-cliente');
})

router.get('cadastro/login/cliente/adm', (req,res)=>{
    res.send('administrar clientes');
})




module.exports = router;