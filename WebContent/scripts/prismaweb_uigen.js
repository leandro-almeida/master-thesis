function gerarControlesPainelDispersao(){
	var painelEixos = painelControleDispersao.getComponent('painel_eixos');
	var painelForma = painelControleDispersao.getComponent('painel_forma');
	var painelTamanho = painelControleDispersao.getComponent('painel_tamanho');
	var painelMarcacao = painelControleDispersao.getComponent('painel_marcacao');

	// eixos
	var cbX = new Ext.form.ComboBox({
		fieldLabel: 'Eixo X',
		name: 'cb_eixoX',
		mode: 'local',
		width: 200,
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		value: nomeColunaDispersaoEixoX,
		store: colunasDispersaoEixoX
	});
	var cbY = new Ext.form.ComboBox({
		fieldLabel: 'Eixo Y',
		name: 'cb_eixoY',
		mode: 'local',
		width: 200,
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		value: nomeColunaDispersaoEixoY,
		store: colunasDispersaoEixoY
	});
	var fEixo = new Ext.form.FormPanel({
		layout: 'form',
		border: false,
		labelWidth: 45,
		labelAlign: 'right',
		items:[cbX, cbY]
	});
	
	painelEixos.add(fEixo);
	painelEixos.doLayout();
	
	// forma
	var cbForma = new Ext.form.ComboBox({
		name: 'cb_Forma',
		mode: 'local',
		anchor: '100%',
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		value: nomeColunaDispersaoForma,
		store: colunasDispersaoForma
	});
	var fForma = new Ext.form.FormPanel({
		layout: 'anchor',
		anchor: '90%',
		border: false,
		items:[cbForma]
	});
	painelForma.add(fForma);
	painelForma.doLayout();
	
	// tamanho
	var cbTamanho = new Ext.form.ComboBox({
		name: 'cb_Tamanho',
		mode: 'local',
		anchor: '100%',
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		value: nomeColunaDispersaoTamanho,
		store: colunasDispersaoTamanho
	});
	var fTamanho = new Ext.form.FormPanel({
		layout: 'anchor',
		anchor: '90%',
		border: false,
		items:[cbTamanho]
	});
	painelTamanho.add(fTamanho);
	painelTamanho.doLayout();
	
	// marcacao
	var cbMarcacao = new Ext.form.ComboBox({
		name: 'cb_Marcacao',
		mode: 'local',
		anchor: '100%',
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		value: nomeColunaDispersaoMarcacao,
		store: colunasDispersaoMarcacao
	});
	var fMarcacao = new Ext.form.FormPanel({
		layout: 'anchor',
		anchor: '90%',
		border: false,
		items:[cbMarcacao]
	});
	painelMarcacao.add(fMarcacao);
	painelMarcacao.doLayout();
}

function gerarControlesPainelParalelas(){
	var painel = painelControleParalelas.getComponent('painel_eixos');
	
	var cbEixosDisponiveis = new Ext.form.ComboBox({
		name: 'cb_EixosDisponiveis',
		mode: 'local',
		anchor: '100% 100%',
		editable: false,
		forceSelection: true,
		triggerAction: 'all',
		store: paralelasEixosDisponiveis
	});
	var fEixosDisp = new Ext.form.FormPanel({
		layout: 'anchor',
		anchor: '90% 50%',
		border: true,
		items:[cbEixosDisponiveis]
	});
	painel.add(fEixosDisp);
	painel.doLayout();
}