var axios = require('axios');
var parser = require('xml2js').parseString;
var fs = require('fs');
function Deputado(id,tag,nome,partido){
	this.id = id;
	this.tag = tag;
	this.nome = nome;
	this.partido = partido;
}

var deputados = [];

function get_r(url, filename){
axios.get("https://dadosabertos.almg.gov.br/ws/deputados/em_exercicio")
.then(function(resp){
    fs.writeFile("deputados.xml", resp.data, function(err){
		if(err)
		throw new Error("Error in write deputado.xml");
	});
    parser(resp.data, (err,result)=>{
        result.listaDeputado.deputado.forEach(function(dep){
		deputados.push(new Deputado(
			dep.id[0],dep.tagLocalizacao[0],dep.nome[0],
			dep.partido[0]));
		});
    });
})
.catch(function(err){
    console.log(err);
});
}

get_r("https://dadosabertos.almg.gov.br/ws/deputados/em_exercicio","deputado.xml");
