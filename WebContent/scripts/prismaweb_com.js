var ip = "localhost";
var porta = "8080";
var app = "/PRISMA_PIBIC_WEB_v1/";
var baseDados = "carros85";
var serverUrl = "http://" + ip + ":"+ porta + app;

var xmldoc_metadados; // colunas e valores
var xmldoc_configDispersao; // colunas de config do dispersao
var xmldoc_configParalelas; // colunas de config do paralelas

var colunas = new Array(); // todas as colunas da base

var colunasDispersaoForma = new Array(); // nomes das colunas disponiveis para forma
var colunasDispersaoEixoX = new Array(); // nomes das colunas disponiveis para eixo x
var colunasDispersaoEixoY = new Array(); // nomes das colunas disponiveis para eixo y
var colunasDispersaoTamanho = new Array(); // nomes das colunas disponiveis para tamanho
var colunasDispersaoMarcacao = new Array(); // nomes das colunas disponiveis para marcação
var nomeColunaDispersaoForma; // nome da coluna configurada
var nomeColunaDispersaoEixoX;
var nomeColunaDispersaoEixoY;
var nomeColunaDispersaoTamanho;
var nomeColunaDispersaoMarcacao;

var paralelasEixosDisponiveis;
var paralelasEixosInseridos;

/*
 * Inicia uma sessão e obtem o XML de meta-dados.
 */
function carregarAplicacao(){
	// inicia sessao
	jQuery.ajax({
		type: "GET", 
		url: serverUrl+"SessionStarter", 
		data: "dataset="+baseDados, 
		dataType: "xml",// tipo da resposta esperada
		error: function(t){
			myMask.hide();	
			new Ext.Window({
				title: 'Erro ao conectar...',
				html: 'Não foi possível contactar o servidor. Por favor entre em contato com a administração.',
				width: 300,
				height: 100
			}).show();
		},
		success: function(xml){
			carregaMetaDados(xml);
		}
	});
}

/*
 * Le o XML de meta-dados e armazena os objetos de colunas.
 */
function carregaMetaDados(xml){
	xmldoc_metadados = xml; // backup do doc xml
	xml = $(xml); // objeto jquery
	colunas = new Array(); // limpa array de colunas
	
	xml.find("coluna").each(function(){
		var tipo = $(this).attr("tipo");
		var col = {
			'nome': $(this).attr("nome"),
			'tipo': tipo,
			'valores': new Array()
		};
		
		if(tipo.toUpperCase() == "STRING"){
			$(this).find("valor").each(function(){
				col.valores.push( $(this).text() );
			});
		}else if(tipo.toUpperCase() == "DOUBLE" || tipo.toUpperCase() == "INTEGER"){
			col.valores.push( $(this).find("min").eq(0).text() );
			col.valores.push( $(this).find("max").eq(0).text() );
		}
		
		colunas.push(col);
	});
	
	carregaConfiguracaoPadrao();
}

/*
 * Solicita ao servidor o xml de configuração padrão inicial e armazena no modelo
 */
function carregaConfiguracaoPadrao(){
	jQuery.ajax({
		type: "GET", 
		url: serverUrl+"ConfigurationReporter", 
		data: "tecnica=dispersao", 
		dataType: "xml",// tipo da resposta esperada
		error: function(t){
			myMask.hide();	
			alert("Não foi possível contactar o servidor. Entre em contato com a administração.");
		},
		success: function(xml){
			xmldoc_configDispersao = xml;
			xml = $(xml);
			
			colunasDispersaoForma = new Array();
			xml.find('forma').eq(0).find('coluna').each(function(){
				colunasDispersaoForma.push($(this).attr("nome"));
				if($(this).attr("selecionada") == "true")
					nomeColunaDispersaoForma = $(this).attr("nome");
			});
			
			colunasDispersaoTamanho = new Array();
			xml.find('tamanho').eq(0).find('coluna').each(function(){
				colunasDispersaoTamanho.push($(this).attr("nome"));
				if($(this).attr("selecionada") == "true")
					nomeColunaDispersaoTamanho = $(this).attr("nome");
			});
			
			colunasDispersaoMarcacao = new Array();
			xml.find('marcacao').eq(0).find('coluna').each(function(){
				colunasDispersaoMarcacao.push($(this).attr("nome"));
				if($(this).attr("selecionada") == "true")
					nomeColunaDispersaoMarcacao = $(this).attr("nome");
			});
			
			colunasDispersaoEixoX = new Array();
			xml.find('eixoX').eq(0).find('coluna').each(function(){
				colunasDispersaoEixoX.push($(this).attr("nome"));
				if($(this).attr("selecionada") == "true")
					nomeColunaDispersaoEixoX = $(this).attr("nome");
			});
			
			colunasDispersaoEixoY = new Array();
			xml.find('eixoY').eq(0).find('coluna').each(function(){
				colunasDispersaoEixoY.push($(this).attr("nome"));
				if($(this).attr("selecionada") == "true")
					nomeColunaDispersaoEixoY = $(this).attr("nome");
			});
		}
	});
	
	jQuery.ajax({
		type: "GET", 
		url: serverUrl+"ConfigurationReporter", 
		data: "tecnica=paralelas", 
		dataType: "xml",// tipo da resposta esperada
		error: function(t){
			myMask.hide();	
			alert("Não foi possível contactar o servidor. Entre em contato com a administração.");
		},
		success: function(xml){
			xmldoc_configParalelas = xml;
			xml = $(xml);
			
			paralelasEixosDisponiveis = new Array();
			xml.find('eixosDisponiveis').eq(0).find('eixo').each(function(){
				paralelasEixosDisponiveis.push($(this).attr("nome"));
			});
			
			paralelasEixosInseridos = new Array();
			xml.find('eixosInseridos').eq(0).find('eixo').each(function(){
				paralelasEixosInseridos.push($(this).attr("nome"));
			});
			
			gerarInterface();
		}
	});
}

/*
 * Constroi a interface dinamica (comboboxes, checkboxes, cores).
 */
function gerarInterface(){
	gerarControlesPainelDispersao();
	gerarControlesPainelParalelas();
	
	atualizar();
}

/*
 * Obtem imagens do servidor para a aba ativa.
 */
function atualizar(){
	if(xmldoc_metadados == 'undefined' && colunas.length == 0){
		alert("saiu atualizar");
		return;
	}
	
	// verificar a aba ativa...
	getImg(serverUrl+"ImageDeliverer", "dispersao", "allviews_ScatterDiv");
	
	myMask.hide();
}

function getImg(url, tec, div){
	url += "?imagem="+tec+"-";

	var el = $("#"+div);
	var w = el.width()-15;
	var h = el.height()-15;
	url += w +"-"+ h;

	//alert(url);
//	console.log(url);
//	console.log(el.css("width"));
//	console.log(el.css("height"));
	
	var img = new Image();
	img.src = url;
	el.html(img);
}