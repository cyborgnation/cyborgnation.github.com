
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_bg_image}","mouseenter",function(sym,e){var mySymbolObject=sym.getSymbol("fans2");});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Rectangle2}","mouseenter",function(sym,e){var mySymbolObject=sym.getSymbol("fans2").play();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_Rectangle2}","mouseleave",function(sym,e){var mySymbolObject=sym.getSymbol("fans2").playReverse();});
//Edge binding end
})("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'fans'
(function(symbolName){})("fans");
//Edge symbol end:'fans'

//=========================================================

//Edge symbol: 'text'
(function(symbolName){})("text");
//Edge symbol end:'text'
})(jQuery,AdobeEdge,"EDGE-27043402");