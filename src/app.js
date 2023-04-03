const express= require('express');
const app= express();
const PORT= process.env.PORT || 3000
const alumnos = require('../datos/alumnos.json')

app.get('/alumnos',(req,res)=>{
    res.json( alumnos ).status(200);
});

app.get('/alumnos/:dni',(req,res)=>{
    const dni = req.params.dni
    const resultado = alumnos.find( alumno => alumno.dni == dni)
    
    if(resultado) {
        res.json(resultado).status(200)
    } else {
        res.json({mensaje: 'El alumno con el dni no fue encontrado'}).status(404)
    }
})

app.delete('/alumnos/:dni',(req,res)=>{
    const dni = req.params.dni
    const indice = alumnos.findIndex(alumno=>alumno.dni == dni)
    if(indice==-1){
        res.json({
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: "El aluno con dni ${dni} no fue encontrado"
        }).status(404)
    } else {
        const alumno= alumnos[indice]
        const resultado = alumnos.splice(indice, 1)
        res.json({resultado: "La operación de borrado pudo realziarse con éxito", alumno:alumno}).status(200)
    }
})
app.listen(PORT,()=>{console.log('App lista escuchando en el puerto ',PORT)} );