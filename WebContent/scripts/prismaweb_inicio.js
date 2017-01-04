var myMask;
Ext.onReady(function(){
	myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Carregando, aguarde..."});
	myMask.show();
	iniciaInterface(); // constroi a base da interface com Ext (viewport, abas, etc)
});