import csvtojson from 'csvtojson';
import mongodb from 'mongodb';
import fs from 'fs';


const fileName = 'files/Módulo 1_Matrícula_2024.1A.csv';

var url = "mongodb://localhost:27017/inteli";
var dbConn;
mongodb.MongoClient.connect(url).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log('DB Connection Error: ${err.message}');
});

var arrayToInsert = [];
csvtojson({
	delimiter: ";",
    trim: true,
    ignoreEmpty: true,
    // headers: ["Cad_Dados_Nome_Compl", "curso_emec", "CURSO ATUAL", "Bolsa_Tipo_Liberado", "Matricula 2024.1", "RA", "E-mail Inteli", "Módulo 1","Turma", "Grupo Novo    2024.1A", "Ateliê", "Horário", "Ingresso"],
    // colParser: {
    //     "NomeCompleto": "string",
    //     "CursoEmec": "string",
    //     "CursoAtual": "string",
    //     "BolsaTipoLiberado": "string",
    //     "Matricula20241": "string",
    //     "RA": "string",
    //     "EmailInteli": "string",
    //     "InteliMódulo1": "string",
    //     "GrupoNovo": "string"
    // }
})
    .fromFile(fileName)
    .on('csv',(csvRow)=>{ // this func will be called 3 times
        console.log(csvRow) // => [1,2,3] , [4,5,6]  , [7,8,9]
    })
    .then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
            nomeCompleto: source[i]["Cad_Dados_Nome_Compl"],
            codigoCursoEmec: source[i]["curso_emec"],
            cursoAtual: source[i]["CURSO ATUAL"],
            tipoBolsa: source[i]["Bolsa_Tipo_Liberado"],
            matricula2024_1: source[i]["Matricula 2024.1"],
            ra: source[i]["RA"],
            emailInteli: source[i]["E-mail Inteli"],
            modulo1: source[i]["Inteli	Módulo 1"],
            //turma: source[i][8],
            grupoNovo: source[i]["Grupo Novo"],
         };
         console.log(oneRow);
         arrayToInsert.push(oneRow);
     }
     //inserting into the table “employees”
    //  var collectionName = 'alocacoes';
    //  var collection = dbConn.collection(collectionName);

     console.log(arrayToInsert);
    //  collection.insertMany(arrayToInsert, (err, result) => {
    //      if (err) console.log(err);
    //      if(result){
    //          console.log('Import CSV into database successfully.');
    //      }
    //  });
});
