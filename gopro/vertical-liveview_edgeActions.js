
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.stop();});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'mode'
(function(symbolName){})("mode");
//Edge symbol end:'mode'

//=========================================================

//Edge symbol: 'Resolution'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",3000,function(sym,e){sym.playReverse();});
//Edge binding end
})("Resolution");
//Edge symbol end:'Resolution'

//=========================================================

//Edge symbol: 'Framerate'
(function(symbolName){})("Framerate");
//Edge symbol end:'Framerate'

//=========================================================

//Edge symbol: 'Fov'
(function(symbolName){})("Fov");
//Edge symbol end:'Fov'

//=========================================================

//Edge symbol: 'protune'
(function(symbolName){})("protune");
//Edge symbol end:'protune'

//=========================================================

//Edge symbol: 'settings'
(function(symbolName){})("settings");
//Edge symbol end:'settings'

//=========================================================

//Edge symbol: 'Symbol_1'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_Rectangle2}","click",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Resolution2}","click",function(sym,e){var mySymbolObject=sym.getSymbol("Resolution2").play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.stop();});
//Edge binding end
})("Symbol_1");
//Edge symbol end:'Symbol_1'
})(jQuery,AdobeEdge,"EDGE-264160235");