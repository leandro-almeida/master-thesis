Ext.onReady(function(){
	iniciaInterface();
//	var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Carregando, aguarde..."});
//	myMask.show();
	
	// cria RangeSlider exemplo (jquery)
	/*$('#slider_abstencao').slider({
		orientation: 'horizontal',
		range: true,
		min: 1,
		max: 1114713,
		values: [1, 1114713],
		slide: function(event, ui) {
			$("#slider-label_abstencao").html(ui.values[0] + ' - ' + ui.values[1]);
		}
	});
	$("#slider-label_abstencao").html( $("#slider_abstencao").slider("values", 0) + ' - ' + $("#slider_abstencao").slider("values", 1));
	
	$('#slider_compareceram').slider({
		orientation: 'horizontal',
		range: true,
		min: 2,
		max: 6838431,
		values: [3319383 , 6838431],
		slide: function(event, ui) {
			$("#slider-label_compareceram").html(ui.values[0] + ' - ' + ui.values[1]);
		}
	});
	$("#slider-label_compareceram").html('5.729 - 6.838.431');*/
	
	// tab panel das visões
	var viewsTabsPanel = new Ext.TabPanel({
		id: 'abasVisoes',
		region: 'center',
		margins: '0 5 5 0',
		activeTab: 0,
		enableTabScroll: true,
		deferredRender: false,
		/*defaults: {autoScroll:true},*/
		items:[
			{contentEl:'allviewsTabPanel', title: 'Todas'},
			{contentEl:'scatterplotViewTabPanel', title: 'Dispersão'},
			{contentEl:'treemapViewTabPanel', title: 'Treemap'},
			{contentEl:'parallelViewTabPanel', title: 'Coordenadas Paralelas'},
			{contentEl:'chartViewTabPanel', title: 'Gráfico'}
		]
	});
	
	// accordion panel para config. do Scatterplot
	var scatterplotConfigPanel = new Ext.Panel({
		title: 'Dispersão', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Eixo X', contentEl: 'panel_scatter_XAxis'},
			{title: 'Eixo Y', contentEl: 'panel_scatter_YAxis'},
			{title: 'Forma', contentEl: 'panel_scatter_Shape'},
			{title: 'Tamanho', contentEl: 'panel_scatter_Size'}
		]
	});
	// accordion panel para config. do Treemap
	var treemapConfigPanel = new Ext.Panel({
		title: 'Treemap', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Tamanho', contentEl: 'panel_treemap_Size'},
			{title: 'Rótulo', contentEl: 'panel_treemap_Label'},
			{title: 'Hierarquia (Grupos)', contentEl: 'panel_treemap_Groups'}
		]
	});
	// accordion panel para config. do Paralelas
	var parallelConfigPanel = new Ext.Panel({
		title: 'Coordenadas Paralelas', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Inserir ou Remover Eixos', contentEl: 'panel_parallel_axis'}
		]
	});
	// accordion panel para config. do Chart
	var chartConfigPanel = new Ext.Panel({
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
			{title: 'Inserir ou Remover Gráficos', contentEl: 'panel_charts_config'},
			{title: '(1) Medidor', contentEl: 'panel_charts_1'},
			{title: '(2) Medidor', contentEl: 'panel_charts_2'},
			{title: '(3) Medidor', contentEl: 'panel_charts_3'},
			{title: '(4) Medidor', contentEl: 'panel_charts_4'},
			{title: '(5) Medidor', contentEl: 'panel_charts_5'}
		]
	});
	
	// Sub TabPanel da aba Views (tecnicas + chart)
	var controlViewsTabsPanel = new Ext.TabPanel({
		id: 'controlViewsTabsPanel',
		title: 'Visões',
		width: 300,
		activeTab: 0,
		animScroll: true,
		enableTabScroll: true,
		deferredRender: false,
		defaults: {autoScroll:true},
		items:[
			scatterplotConfigPanel,
			treemapConfigPanel,
			parallelConfigPanel,
			chartConfigPanel
		]
	});
	
	// accordion panel para config. da cor
	var colorsConfigPanel = new Ext.Panel({
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
			{title: 'Configurar Cores',contentEl: 'colorsTabPanel'}
		]
	});
	// accordion panel para config. dos filtros
	var filtersConfigPanel = new Ext.Panel({
		title: 'Filtros', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Inserir ou Remover Filtros',contentEl: 'panel_config_filters'},
			{title: 'Compareceram',contentEl: 'panel_filter_compareceram'},
			{title: 'Abstenção',contentEl: 'panel_filter_abstencao'},
			{title: 'Aptos_Totalizados',contentEl: 'panel_filter_aptos_totalizados'},
			{title: 'Cargo',contentEl: 'panel_filter_cargo'},
			{title: 'REGIÃO',contentEl: 'panel_filter_regiao'}
		]
	});
	// accordion panel para config. dos detalhes
	var detailsConfigPanel = new Ext.Panel({
		title: 'Detalhes', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Configurar Detalhes',contentEl: 'panel_config_details'}
		]
	});
	// Main TabPanel de Controle
	var controlTabsPanel = new Ext.TabPanel({
		id: 'painelControle',
		region: 'east',
		margins: '0 0 5 0',
		width: 300,
		activeTab: 0,
		enableTabScroll: true,
		deferredRender: false,
		defaults: {autoScroll:true},
		items:[
			controlViewsTabsPanel,
			filtersConfigPanel,
			colorsConfigPanel,
			detailsConfigPanel
		]
	});
	
	// progress bar
	var pbar = new Ext.ProgressBar({
		region: 'east',
		width: 300,
		value: 1,
		text: '100,00%'
	});
	// status bar
	var status = new Ext.Panel({
		id: 'status',
		margins: '0 5 0 0',
		region: 'center',
		html: 'Pronto. Visualizando 27825 de 27825 itens.'
	});
	var painelSul = new Ext.Panel({
		region: 'south',
		layout: 'border',
		height: 22,
		items:[status, pbar]
	});
	
	// viewport aqui é tipo um frame, q se ajusta ao corpo da pagina...
	var viewport = new Ext.Viewport({
		layout: 'border',
		renderTo: Ext.getBody(),
		items:[ viewsTabsPanel, controlTabsPanel, painelSul ]
	});
	viewport.on('resize', calculaBoxVisoes);
	Ext.EventManager.onWindowResize(calculaBoxVisoes);
	calculaBoxVisoes();
	
	function calculaBoxVisoes(el){
		// calcula tamanho dos containers das 4 visoes
		var borda = 15;
		var size = viewsTabsPanel.getActiveTab().getSize();
		var largura = (size.width - borda) / 2;
		var altura = (size.height - borda) / 2;

		//alert("Width: "+ largura +"\n Height: "+ altura);
		
		Ext.get('allviews_ScatterDiv').setSize(largura, altura);
		Ext.get('allviews_TreemapDiv').setSize(largura, altura);
		Ext.get('allviews_ParallelDiv').setSize(largura, altura);
		Ext.get('allviews_ChartDiv').setSize(largura, altura);
		
		viewport.doLayout();
	}
//	myMask.hide();
});