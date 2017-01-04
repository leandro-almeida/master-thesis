// range slider
// http://www.jaredgisin.com/software/Ext.ux.SlideZone/ext2/examples_h.html
Ext.onReady(function(){

	$.ajax({
		type: "POST",
        contentType: "text/xml",
        processData: false,
        url: "http://localhost:8080/PRISMA_PIBIC_WEB_v1/SessionStarter",
        data: entidade,
        success: function(t){
            // verifica tipo da resposta. Se nao for xml, retornou errado!
            if (requisicaoAtual.getResponseHeader("content-type").toLowerCase().indexOf("text/xml") == -1)
                falhaRequisicao(null);
            else
                sucessoRequisicao(t);
        },
        error: function(t){
            falhaRequisicao(t);
        }
    });
	// cria RangeSlider exemplo (jquery)
	$('#slider_abstencao').slider({
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
	$("#slider-label_compareceram").html('5.729 - 6.838.431');
	
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
			{contentEl:'allviewsTabPanel', title: 'All Views'},
			{contentEl:'scatterplotViewTabPanel', title: 'Scatterplot'},
			{contentEl:'treemapViewTabPanel', title: 'Treemap'},
			{contentEl:'parallelViewTabPanel', title: 'Parallel Coordinates'},
			{contentEl:'chartViewTabPanel', title: 'Chart'}
		]
	});
	
	// accordion panel para config. do Scatterplot
	var scatterplotConfigPanel = new Ext.Panel({
		title: 'Scatterplot', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'X Axis', contentEl: 'panel_scatter_XAxis'},
			{title: 'Y Axis', contentEl: 'panel_scatter_YAxis'},
			{title: 'Shape', contentEl: 'panel_scatter_Shape'},
			{title: 'Size', contentEl: 'panel_scatter_Size'}
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
			{title: 'Size', contentEl: 'panel_treemap_Size'},
			{title: 'Label', contentEl: 'panel_treemap_Label'},
			{title: 'Hierarchy (Groups)', contentEl: 'panel_treemap_Groups'}
		]
	});
	// accordion panel para config. do Paralelas
	var parallelConfigPanel = new Ext.Panel({
		title: 'Parallel Coordinates', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Insert or Remove Axis', contentEl: 'panel_parallel_axis'}
		]
	});
	// accordion panel para config. do Chart
	var chartConfigPanel = new Ext.Panel({
		title: 'Charts', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Insert or Remove Charts', contentEl: 'panel_charts_config'},
			{title: '(1) Dial Chart', contentEl: 'panel_charts_1'},
			{title: '(2) Pie Chart', contentEl: 'panel_charts_2'}
			/*{title: '(3) Dial Chart', contentEl: 'panel_charts_3'},
			{title: '(4) Dial Chart', contentEl: 'panel_charts_4'},
			{title: '(5) Dial Chart', contentEl: 'panel_charts_5'}*/
		]
	});
	
	// Sub TabPanel da aba Views (tecnicas + chart)
	var controlViewsTabsPanel = new Ext.TabPanel({
		id: 'controlViewsTabsPanel',
		title: 'Views',
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
		title: 'Colors', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px'},
		items:[
			{title: 'Configure Color',contentEl: 'colorsTabPanel'}
		]
	});
	// accordion panel para config. dos filtros
	var filtersConfigPanel = new Ext.Panel({
		title: 'Filters', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Insert or Remove Filters',contentEl: 'panel_config_filters'},
			{title: 'Compareceram',contentEl: 'panel_filter_compareceram'},
			{title: 'Abstenção',contentEl: 'panel_filter_abstencao'},
			{title: 'Aptos_Totalizados',contentEl: 'panel_filter_aptos_totalizados'},
			{title: 'Cargo',contentEl: 'panel_filter_cargo'},
			{title: 'REGIÃO',contentEl: 'panel_filter_regiao'}
		]
	});
	// accordion panel para config. dos detalhes
	var detailsConfigPanel = new Ext.Panel({
		title: 'Details', // titulo da aba
		layout: 'accordion',
		layoutConfig: {
			titleCollapse: true,
			fill: false,
			animate: true,
			activeOnTop: false
		},
		defaults: {bodyStyle: 'padding:15px', collapsed:true},
		items:[
			{title: 'Configure details-on-demand',contentEl: 'panel_config_details'}
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
		html: 'Ready. Visualizing 27825 of 27825 items.'
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
	}
});