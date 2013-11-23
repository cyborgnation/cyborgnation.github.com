
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_Ellipse}","click",function(sym,e){var mySymbolObject=sym.getSymbol("Directory").play("Directory");sym.$("start_screen").hide();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'Directory'
(function(symbolName){})("Directory");
//Edge symbol end:'Directory'

//=========================================================

//Edge symbol: 'pulse_glow'
(function(symbolName){})("pulse_glow");
//Edge symbol end:'pulse_glow'
})(jQuery,AdobeEdge,"EDGE-120170250");