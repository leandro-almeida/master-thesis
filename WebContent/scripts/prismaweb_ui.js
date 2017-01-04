// range slider
// http://www.jaredgisin.com/software/Ext.ux.SlideZone/ext2/examples_h.html
var abasVisoes;
var abasControle;
var abaControleVisoes;

var painelControleFiltros;
var painelControleCores;
var painelControleDetalhes;
var painelControleDispersao;
var painelControleTreemap;
var painelControleParalelas;
var painelControleGraficos;

var progressBar;
var statusBar;
var viewport;

function iniciaInterface(){
	if(constroiAbasVisoes())
		if(constroiAbasControles())
			if(constroiViewport())
				carregarAplicacao();
}

function constroiAbasVisoes(){
	// tab panel das visões
	abasVisoes = new Ext.TabPanel({
		region: 'center',
		margins: '0 5 5 0',
		activeTab: 0,
		enableTabScroll: true,
		deferredRender: false,
		items:[
			{contentEl:'allviewsTabPanel', title: 'Todas'},
			{contentEl:'scatterplotViewTabPanel', title: 'Dispersão'},
			{contentEl:'treemapViewTabPanel', title: 'Treemap'},
			{contentEl:'parallelViewTabPanel', title: 'Coordenadas Paralelas'},
			{contentEl:'chartViewTabPanel', title: 'Gráfico'}
		]
	});
	
	return true;
}

function constroiAbasControles(){
	constroiAbaControleVisoes();
	constroiPainelControleFiltros();
	constroiPainelControleCores();
	constroiPainelControleDetalhes();
	
	// Main TabPanel de Controle
	abasControle = new Ext.TabPanel({
		region: 'center',
		margins: '0 0 5 0',
		width: 300,
		activeTab: 0,
		enableTabScroll: true,
		deferredRender: false,
		defaults: {autoScroll:true},
		items:[
			abaControleVisoes,
			painelControleFiltros,
			painelControleCores,
			painelControleDetalhes
		]
	});
	
	return true;
}

function constroiViewport(){
	// constroi progress bar
	progressBar = new Ext.ProgressBar({
		region: 'east',
		width: 300,
		value: 1,
		text: '100,00%'
	});
	// constroi status bar
	statusBar = new Ext.Panel({
		margins: '0 5 0 0',
		region: 'center',
		html: 'Pronto. Visualizando 27825 de 27825 itens.'
	});
	// status + pbar
	var painelSul = new Ext.Panel({
		region: 'south',
		layout: 'border',
		height: 22,
		items:[statusBar, progressBar]
	});
	
	// painel do botao aplicar modif.
	var botao = new Ext.Button({
		text: 'APLICAR MODIFICAÇÕES'
	});
	var painelApply = new Ext.Panel({
		region: 'south',
		border: false,
		buttonAlign: 'center',
		buttons:[botao]
	});
	
	// painel da direita: abas de controle + painel com botao de aplicar modificacoes
	var painelDir = new Ext.Panel({
		region: 'east',
		layout: 'border',
		width: 300,
//		border: false,
		items:[abasControle, painelApply]
	});
	
	// viewport
	viewport = new Ext.Viewport({
		layout: 'border',
		renderTo: Ext.getBody(),
		items:[ abasVisoes, painelDir, painelSul ]
	});
	
	viewport.on('resize', calculaBoxVisoes);
	Ext.EventManager.onWindowResize(calculaBoxVisoes);
	calculaBoxVisoes();
	
	return true;
}

function constroiAbaControleVisoes(){
	constroiPainelControleDispersao();
	constroiPainelControleTreemap();
	constroiPainelControleParalelas();
	constroiPainelControleGraficos();
	
	// Sub TabPanel da aba Views (tecnicas + chart)
	abaControleVisoes = new Ext.TabPanel({
		title: 'Visões',
		width: 300,
		activeTab: 0,
		animScroll: true,
		enableTabScroll: true,
		deferredRender: false,
		defaults: {autoScroll:true},
		items:[
			painelControleDispersao,
			painelControleTreemap,
			painelControleParalelas,
			painelControleGraficos
		]
	});
}

function constroiPainelControleFiltros(){
	// accordion panel para config. dos filtros
	painelControleFiltros = new Ext.Panel({
		title: 'Filtros', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Inserir ou Remover Filtros', itemId: 'painel_filtros'}
		]
	});
}

function constroiPainelControleCores(){
	// accordion panel para config. da cor
	painelControleCores = new Ext.Panel({
		title: 'Cores', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Configurar Cores', itemId: 'painel_cores'}
		]
	});
}

function constroiPainelControleDetalhes(){
	// accordion panel para config. dos detalhes
	painelControleDetalhes = new Ext.Panel({
		title: 'Detalhes', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Configurar Detalhes', itemId: 'painel_detalhes'}
		]
	});
}

function constroiPainelControleDispersao(){
	// accordion panel para config. do Scatterplot
	painelControleDispersao = new Ext.Panel({
		title: 'Dispersão', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: false,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Eixos', itemId: 'painel_eixos'},
			{title: 'Forma', itemId: 'painel_forma'},
			{title: 'Tamanho', itemId: 'painel_tamanho'},
			{title: 'Marcação', itemId: 'painel_marcacao'}
		]
	});
}

function constroiPainelControleTreemap(){
	// accordion panel para config. do Treemap
	painelControleTreemap = new Ext.Panel({
		title: 'Treemap', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Tamanho', itemId: 'painel_tamanho'},
			{title: 'Rótulo', itemId: 'painel_rotulo'},
			{title: 'Hierarquia (Grupos)', itemId: 'painel_grupos'}
		]
	});
}

function constroiPainelControleParalelas(){
	// accordion panel para config. do Paralelas
	painelControleParalelas = new Ext.Panel({
		title: 'Coordenadas Paralelas', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: true,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Inserir ou Remover Eixos', itemId: 'painel_eixos'}
		]
	});
}

function constroiPainelControleGraficos(){
	// accordion panel para config. do Chart
	painelControleGraficos = new Ext.Panel({
		title: 'Gráficos', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Inserir ou Remover Gráficos', itemId: 'painel_graficos'}
		]
	});
}

function calculaBoxVisoes(el){
	// calcula tamanho dos containers
	var borda = 12;
	var aba = abasVisoes.getActiveTab();
	var size = aba.getSize();
	var largura = (size.width - borda - 6) / 2;
	var altura = (size.height - borda - 6) / 2;

	$('#allviews_ScatterDiv').width(largura);
	$('#allviews_ScatterDiv').height(altura);
	$('#allviews_TreemapDiv').width(largura);
	$('#allviews_TreemapDiv').height(altura);
	$('#allviews_ParallelDiv').width(largura);
	$('#allviews_ParallelDiv').height(altura);
	$('#allviews_ChartDiv').width(largura);
	$('#allviews_ChartDiv').height(altura);
	
	$('#oneview_ScatterDiv').width(size.width - borda);
	$('#oneview_ScatterDiv').height(size.height - borda);
	$('#oneview_TreemapDiv').width(size.width - borda);
	$('#oneview_TreemapDiv').height(size.height - borda);
	$('#oneview_ParallelDiv').width(size.width - borda);
	$('#oneview_ParallelDiv').height(size.height - borda);
	$('#oneview_ChartDiv').width(size.width - borda);
	$('#oneview_ChartDiv').height(size.height - borda);
	
	viewport.doLayout();
	//atualizar();
}