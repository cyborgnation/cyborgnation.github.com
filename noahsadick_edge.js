/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
   fonts['source-sans-pro, sans-serif']='<script src=\"http://use.edgefonts.net/source-sans-pro:n4,n9,n7,i7,i4,n3,i3,n6,i6,i9,n2,i2:all.js\"></script>';


var resources = [
];
var symbols = {
"stage": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'start_screen',
            type:'group',
            rect:['270','175px','483','418','auto','auto'],
            c:[
            {
               id:'hello_big2',
               type:'image',
               rect:['72px','0px','340px','118px','auto','auto'],
               fill:["rgba(0,0,0,0)",im+"hello_big.png",'0px','0px']
            },
            {
               id:'Text3',
               type:'text',
               rect:['0px','167px','483px','67px','auto','auto'],
               text:"Who are you here to see?",
               align:"left",
               font:['source-sans-pro, sans-serif',48,"rgba(0,174,239,1.00)","200","none","normal"]
            },
            {
               id:'Ellipse',
               type:'ellipse',
               rect:['192px','317px','101px','101px','auto','auto'],
               cursor:['pointer'],
               borderRadius:["50%","50%","50%","50%"],
               fill:["rgba(0,174,239,1.00)"],
               stroke:[0,"rgba(0,0,0,1)","none"]
            },
            {
               id:'Text4',
               type:'text',
               rect:['187px','265px','110px','33px','auto','auto'],
               text:"tap to start<br>",
               align:"left",
               font:['source-sans-pro, sans-serif',24,"rgba(0,174,239,1)","200","none","normal"]
            }]
         },
         {
            id:'Directory',
            type:'rect',
            rect:['96','573','auto','auto','auto','auto']
         }],
         symbolInstances: [
         {
            id:'Directory',
            symbolName:'Directory'
         }
         ]
      },
   states: {
      "Base State": {
         "${_start_screen}": [
            ["style", "top", '175px']
         ],
         "${_Ellipse}": [
            ["style", "top", '317px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '192px'],
            ["color", "background-color", 'rgba(0,174,239,1.00)']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(243,243,243,1.00)'],
            ["style", "width", '1024px'],
            ["style", "height", '768px'],
            ["style", "overflow", 'hidden']
         ],
         "${_Text3}": [
            ["style", "top", '167px'],
            ["style", "width", '483px'],
            ["style", "font-family", 'source-sans-pro, sans-serif'],
            ["color", "color", 'rgba(0,174,239,1.00)'],
            ["style", "font-weight", '200'],
            ["style", "left", '0px'],
            ["style", "font-size", '48px']
         ],
         "${_hello_big2}": [
            ["style", "left", '72px'],
            ["style", "top", '0px']
         ],
         "${_Text4}": [
            ["style", "top", '265px'],
            ["style", "height", '33px'],
            ["style", "font-size", '24px'],
            ["style", "left", '187px'],
            ["style", "width", '110px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: true,
         timeline: [
            { id: "eid119", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_Directory}', [] ], ""], position: 0 }         ]
      }
   }
},
"Directory": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      id: 'GROUP_Menu_Bar',
      type: 'group',
      rect: ['-95','-572','1024','88','auto','auto'],
      c: [
      {
         rect: ['0px','0px','1024px','88px','auto','auto'],
         id: 'Rectangle',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1)']
      },
      {
         id: 'hello_logo2',
         type: 'image',
         rect: ['40px','29px','83px','29px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/hello_logo.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Andy_Dwyer_',
      type: 'group',
      rect: ['-66px','-455px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRect',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         id: 'andydwyer2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/andydwyer.png','0px','0px']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6',
         text: 'Andy Dwyer',
         align: 'left',
         type: 'text'
      }]
   },
   {
      id: 'GROUP_April_Ludgate',
      type: 'group',
      rect: ['-66px','-235px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy5',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy2',
         text: 'April Ludgate<br>',
         align: 'left',
         type: 'text'
      },
      {
         id: 'aprilludgate2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/aprilludgate.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Ben_Wyatt',
      type: 'group',
      rect: ['437px','95px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy10',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy12',
         text: 'Ben Wyatt',
         align: 'left',
         type: 'text'
      },
      {
         id: 'Benwyatt2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/Benwyatt.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Chris_Traeger',
      type: 'group',
      rect: ['-66px','95px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy11',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy6',
         text: 'Chris Traeger<br>',
         align: 'left',
         type: 'text'
      },
      {
         id: 'christraeger2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/christraeger.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Donna_Meagle',
      type: 'group',
      rect: ['437px','-235px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy4',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy9',
         text: 'Donna Meagle',
         align: 'left',
         type: 'text'
      },
      {
         id: 'donnameagle2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/donnameagle.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Jean_Ralphio',
      type: 'group',
      rect: ['437px','-125px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy6',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy10',
         text: 'Jean Ralphio',
         align: 'left',
         type: 'text'
      },
      {
         id: 'jeanralphio2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/jeanralphio.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Jerry_Gergich',
      type: 'group',
      rect: ['437px','-455px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy7',
         text: 'Jerry Gergich',
         align: 'left',
         type: 'text'
      },
      {
         id: 'jgergich2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/jgergich.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Leslie_Knope',
      type: 'group',
      rect: ['437px','-345px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy2',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy8',
         text: 'Leslie Knope',
         align: 'left',
         type: 'text'
      },
      {
         id: 'leslieknope2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/leslieknope.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Lil_Sebastian',
      type: 'group',
      rect: ['-66px','-15px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy9',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy5',
         text: 'Li\'l Sebastian',
         align: 'left',
         type: 'text'
      },
      {
         id: 'lilsebastian2',
         type: 'image',
         rect: ['20px','19px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/lilsebastian.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Ron_Swanson',
      type: 'group',
      rect: ['437px','-15px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy8',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['110px','31px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy11',
         text: 'Ron Swanson',
         align: 'left',
         type: 'text'
      },
      {
         id: 'ronswanson2',
         type: 'image',
         rect: ['20px','22px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/ronswanson.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Tom_Haverford',
      type: 'group',
      rect: ['-66px','-345px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         id: 'RoundRectCopy3',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy',
         text: 'Tom Haverford',
         align: 'left',
         type: 'text'
      },
      {
         id: 'tomhaverford2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/tomhaverford.png','0px','0px']
      }]
   },
   {
      id: 'GROUP_Ann_Perkins',
      type: 'group',
      rect: ['-66px','-125px','460','100','auto','auto'],
      c: [
      {
         rect: ['0px','0px','460px','100px','auto','auto'],
         borderRadius: ['10px','10px','10px','10px'],
         boxShadow: ['',3,3,3,0,'rgba(0,0,0,0.65)'],
         id: 'RoundRectCopy7',
         stroke: [0,'rgb(0, 0, 0)','none'],
         type: 'rect',
         fill: ['rgba(255,255,255,1.00)']
      },
      {
         rect: ['106px','29px','330px','41px','auto','auto'],
         font: ['source-sans-pro, sans-serif',32,'rgba(51,51,51,1.00)','300','none','normal'],
         id: 'Text6Copy3',
         text: 'Ann Perkins',
         align: 'left',
         type: 'text'
      },
      {
         boxShadow: ['',0,0,3,1,'rgba(0,174,239,1.00)'],
         rect: ['0px','0px','60px','60px','auto','auto'],
         borderRadius: ['50%','50%','50%','50%'],
         type: 'ellipse',
         id: 'Ellipse2',
         stroke: [0,'rgb(0, 0, 0)','none'],
         display: 'none',
         fill: ['rgba(255,255,255,1)']
      },
      {
         id: 'annperkins2',
         type: 'image',
         rect: ['20px','20px','60px','60px','auto','auto'],
         fill: ['rgba(0,0,0,0)','images/annperkins.png','0px','0px']
      }]
   },
   {
      rect: ['355px','-121px','140px','60px','auto','auto'],
      font: ['source-sans-pro, sans-serif',32,'rgba(0,174,239,1.00)','100','none','normal'],
      id: 'Text9',
      text: 'Contacting...',
      align: 'left',
      type: 'text'
   },
   {
      rect: ['260px','-106px','330px','80px','auto','auto'],
      font: ['source-sans-pro, sans-serif',28,'rgba(51,51,51,1.00)','100','none','normal'],
      align: 'left',
      id: 'Text12',
      text: 'Hey Chris, I\'m eating a waffle. Just come on back.',
      clip: ['rect(0px 330pxpx 80pxpx 0px)'],
      type: 'text'
   },
   {
      rect: ['239px','-120px','auto','auto','auto','auto'],
      font: ['source-sans-pro, sans-serif',48,'rgba(0,174,255,1.00)','400','none','normal'],
      align: 'left',
      id: 'Text13',
      text: '“',
      clip: ['rect(0px 20pxpx 67pxpx 0px)'],
      type: 'text'
   },
   {
      rect: ['482px','-77px','auto','auto','auto','auto'],
      font: ['source-sans-pro, sans-serif',48,'rgba(0,174,255,1.00)','400','none','normal'],
      align: 'left',
      id: 'Text13Copy',
      text: '”',
      clip: ['rect(0px 20pxpx 67pxpx 0px)'],
      type: 'text'
   },
   {
      id: 'thumb2',
      type: 'image',
      rect: ['946px','-8px','132px','132px','auto','auto'],
      fill: ['rgba(0,0,0,0)','images/thumb.png','0px','0px']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_GROUP_Donna_Meagle}": [
            ["style", "top", '439px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_GROUP_Ron_Swanson}": [
            ["style", "top", '659px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_RoundRectCopy3}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text6Copy3}": [
            ["style", "top", '29px'],
            ["style", "width", '153px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ],
         "${_RoundRectCopy8}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text13Copy}": [
            ["style", "top", '-77px'],
            ["style", "clip", [0,334,67,334], {valueTemplate:'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'} ],
            ["style", "opacity", '1'],
            ["style", "font-weight", '400'],
            ["color", "color", 'rgba(0,174,255,1.00)'],
            ["style", "font-family", 'source-sans-pro, sans-serif'],
            ["style", "left", '81px'],
            ["style", "font-size", '48px']
         ],
         "${_GROUP_Jean_Ralphio}": [
            ["style", "top", '549px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_ronswanson2}": [
            ["style", "top", '22px'],
            ["style", "left", '20px']
         ],
         "${_Text12}": [
            ["style", "top", '-106px'],
            ["style", "clip", [0,334,67,324], {valueTemplate:'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'} ],
            ["style", "height", '80px'],
            ["style", "font-size", '28px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "opacity", '1'],
            ["style", "left", '-141px'],
            ["style", "width", '330px']
         ],
         "${_Ellipse2}": [
            ["style", "top", '65px'],
            ["subproperty", "boxShadow.offsetV", '0px'],
            ["subproperty", "boxShadow.color", 'rgba(0,174,239,1)'],
            ["style", "left", '117px'],
            ["style", "display", 'none'],
            ["subproperty", "boxShadow.spread", '2px'],
            ["subproperty", "boxShadow.offsetH", '0px'],
            ["subproperty", "boxShadow.blur", '15px']
         ],
         "${_Text9}": [
            ["style", "top", '-195px'],
            ["style", "font-weight", '100'],
            ["color", "color", 'rgba(0,174,239,1.00)'],
            ["style", "opacity", '0'],
            ["style", "left", '343px'],
            ["style", "width", '178px']
         ],
         "${_tomhaverford2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_lilsebastian2}": [
            ["style", "left", '20px'],
            ["style", "top", '19px']
         ],
         "${_Text6Copy11}": [
            ["style", "top", '31px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_andydwyer2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_RoundRectCopy9}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text6Copy}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ],
         "${_thumb2}": [
            ["style", "top", '-8px'],
            ["transform", "scaleY", '1'],
            ["style", "display", 'block'],
            ["motion", "location", '1040.4769287109px 103.00003433227px'],
            ["style", "opacity", '1'],
            ["style", "left", '946px'],
            ["transform", "scaleX", '1']
         ],
         "${_Text6Copy6}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ],
         "${_GROUP_Ann_Perkins}": [
            ["style", "left", '-65px'],
            ["style", "top", '549px']
         ],
         "${_RoundRectCopy6}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_annperkins2}": [
            ["style", "top", '20px'],
            ["style", "left", '20px']
         ],
         "${_RoundRectCopy5}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_RoundRectCopy}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text6Copy12}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_GROUP_Andy_Dwyer_}": [
            ["style", "top", '219px'],
            ["style", "opacity", '1'],
            ["style", "left", '-65px']
         ],
         "${_Benwyatt2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_GROUP_April_Ludgate}": [
            ["style", "top", '439px'],
            ["style", "opacity", '1'],
            ["style", "left", '-65px']
         ],
         "${_aprilludgate2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_Text6Copy8}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_jgergich2}": [
            ["style", "top", '20px'],
            ["style", "left", '20px']
         ],
         "${_GROUP_Jerry_Gergich}": [
            ["style", "top", '219px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_GROUP_Leslie_Knope}": [
            ["style", "top", '329px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_Text6Copy9}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_GROUP_Lil_Sebastian}": [
            ["style", "top", '659px'],
            ["style", "opacity", '1'],
            ["style", "left", '-65px']
         ],
         "${_leslieknope2}": [
            ["style", "top", '20px'],
            ["style", "left", '20px']
         ],
         "${_hello_logo2}": [
            ["style", "left", '40px'],
            ["style", "top", '29px']
         ],
         "${_GROUP_Chris_Traeger}": [
            ["style", "top", '769px'],
            ["style", "opacity", '1'],
            ["style", "left", '-65px']
         ],
         "${symbolSelector}": [
            ["style", "height", '67px'],
            ["style", "width", '302px']
         ],
         "${_RoundRectCopy10}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Rectangle}": [
            ["style", "left", '0px'],
            ["style", "top", '0px']
         ],
         "${_RoundRect}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_donnameagle2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_Text6Copy10}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_Text6}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ],
         "${_RoundRectCopy7}": [
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["subproperty", "boxShadow.blur", '5px'],
            ["transform", "scaleX", '1'],
            ["style", "left", '0px'],
            ["style", "width", '460px'],
            ["style", "top", '0px'],
            ["transform", "scaleY", '1'],
            ["subproperty", "boxShadow.spread", '1px'],
            ["style", "height", '100px'],
            ["subproperty", "boxShadow.offsetV", '0px'],
            ["subproperty", "boxShadow.offsetH", '0px'],
            ["subproperty", "boxShadow.color", 'rgba(0,174,255,0.00)']
         ],
         "${_GROUP_Tom_Haverford}": [
            ["style", "top", '329px'],
            ["style", "opacity", '1'],
            ["style", "left", '-65px']
         ],
         "${_jeanralphio2}": [
            ["style", "top", '20px'],
            ["style", "left", '20px']
         ],
         "${_GROUP_Ben_Wyatt}": [
            ["style", "top", '769px'],
            ["style", "opacity", '1'],
            ["style", "left", '438px']
         ],
         "${_Text6Copy5}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ],
         "${_Text13}": [
            ["style", "top", '-120px'],
            ["style", "clip", [0,334,67,334], {valueTemplate:'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'} ],
            ["style", "opacity", '1'],
            ["style", "font-weight", '400'],
            ["color", "color", 'rgba(0,174,255,1.00)'],
            ["style", "font-family", 'source-sans-pro, sans-serif'],
            ["style", "left", '-162px'],
            ["style", "font-size", '48px']
         ],
         "${_christraeger2}": [
            ["style", "left", '20px'],
            ["style", "top", '20px']
         ],
         "${_RoundRectCopy11}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text6Copy7}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '110px'],
            ["style", "font-size", '32px']
         ],
         "${_RoundRectCopy2}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_GROUP_Menu_Bar}": [
            ["style", "left", '-95px'],
            ["style", "top", '-662px']
         ],
         "${_RoundRectCopy4}": [
            ["style", "top", '0px'],
            ["style", "height", '100px'],
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "left", '0px'],
            ["style", "width", '460px']
         ],
         "${_Text6Copy2}": [
            ["style", "top", '29px'],
            ["style", "height", '41px'],
            ["color", "color", 'rgba(51,51,51,1.00)'],
            ["style", "font-weight", '300'],
            ["style", "left", '106px'],
            ["style", "font-size", '32px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 9000,
         autoPlay: true,
         timeline: [
            { id: "eid249", tween: [ "style", "${_Text9}", "width", '178px', { fromValue: '178px'}], position: 3476, duration: 0, easing: "easeInOutBack" },
            { id: "eid466", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.blur", '29px', { fromValue: '5px'}], position: 2573, duration: 325, easing: "easeInOutQuad" },
            { id: "eid300", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 3431, duration: 500, easing: "easeInOutSine" },
            { id: "eid301", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 3931, duration: 500, easing: "easeInOutSine" },
            { id: "eid302", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 4431, duration: 500, easing: "easeInOutSine" },
            { id: "eid303", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 4931, duration: 500, easing: "easeInOutSine" },
            { id: "eid304", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 5431, duration: 500, easing: "easeInOutSine" },
            { id: "eid305", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 5931, duration: 500, easing: "easeInOutSine" },
            { id: "eid306", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 6431, duration: 500, easing: "easeInOutSine" },
            { id: "eid307", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 6931, duration: 500, easing: "easeInOutSine" },
            { id: "eid308", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 7431, duration: 500, easing: "easeInOutSine" },
            { id: "eid195", tween: [ "style", "${_GROUP_Ron_Swanson}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid196", tween: [ "style", "${_GROUP_Andy_Dwyer_}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid344", tween: [ "style", "${_Text13}", "left", '239px', { fromValue: '-162px'}], position: 8405, duration: 595, easing: "easeInOutCirc" },
            { id: "eid198", tween: [ "style", "${_GROUP_April_Ludgate}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid84", tween: [ "style", "${_GROUP_Donna_Meagle}", "left", '437px', { fromValue: '438px'}], position: 103, duration: 500, easing: "easeInOutBack" },
            { id: "eid90", tween: [ "style", "${_GROUP_Chris_Traeger}", "left", '-66px', { fromValue: '-65px'}], position: 250, duration: 500, easing: "easeInOutBack" },
            { id: "eid138", tween: [ "transform", "${_RoundRectCopy7}", "scaleX", '0.96', { fromValue: '1'}], position: 2389, duration: 185, easing: "easeInOutQuad" },
            { id: "eid162", tween: [ "transform", "${_RoundRectCopy7}", "scaleX", '1', { fromValue: '0.96'}], position: 2573, duration: 177, easing: "easeInOutQuad" },
            { id: "eid251", tween: [ "style", "${_Text9}", "top", '-195px', { fromValue: '-195px'}], position: 3476, duration: 0, easing: "easeInOutBack" },
            { id: "eid336", tween: [ "style", "${_Text9}", "top", '-290px', { fromValue: '-195px'}], position: 8250, duration: 250, easing: "easeInOutCirc" },
            { id: "eid78", tween: [ "style", "${_GROUP_Lil_Sebastian}", "left", '-66px', { fromValue: '-65px'}], position: 200, duration: 500, easing: "easeInOutBack" },
            { id: "eid345", tween: [ "style", "${_Text13Copy}", "left", '482px', { fromValue: '81px'}], position: 8405, duration: 595, easing: "easeInOutCirc" },
            { id: "eid200", tween: [ "style", "${_GROUP_Chris_Traeger}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid143", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.spread", '1px', { fromValue: '1px'}], position: 2389, duration: 0, easing: "easeInOutBack" },
            { id: "eid463", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.spread", '9px', { fromValue: '1px'}], position: 2750, duration: 148, easing: "easeInOutQuad" },
            { id: "eid76", tween: [ "style", "${_GROUP_Jean_Ralphio}", "left", '437px', { fromValue: '438px'}], position: 152, duration: 500, easing: "easeInOutBack" },
            { id: "eid470", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.spread", '2px', { fromValue: '2px'}], position: 3431, duration: 0, easing: "easeInOutQuad" },
            { id: "eid220", tween: [ "style", "${_annperkins2}", "left", '117px', { fromValue: '20px'}], position: 3200, duration: 181, easing: "easeInOutQuad" },
            { id: "eid322", tween: [ "style", "${_annperkins2}", "left", '10px', { fromValue: '117px'}], position: 8250, duration: 500, easing: "easeInOutQuad" },
            { id: "eid194", tween: [ "style", "${_GROUP_Tom_Haverford}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid88", tween: [ "style", "${_GROUP_Ron_Swanson}", "left", '437px', { fromValue: '438px'}], position: 200, duration: 500, easing: "easeInOutBack" },
            { id: "eid82", tween: [ "style", "${_GROUP_April_Ludgate}", "left", '-66px', { fromValue: '-65px'}], position: 103, duration: 500, easing: "easeInOutBack" },
            { id: "eid136", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.offsetV", '0px', { fromValue: '0px'}], position: 2389, duration: 0, easing: "easeInOutBack" },
            { id: "eid85", tween: [ "style", "${_GROUP_Donna_Meagle}", "top", '-235px', { fromValue: '439px'}], position: 103, duration: 500, easing: "easeInOutBack" },
            { id: "eid404", tween: [ "style", "${_Text13}", "clip", [0,20,67,0], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,36.83736801147461,67,17.90981101989746]}], position: 8782, duration: 122, easing: "easeOutCirc" },
            { id: "eid405", tween: [ "style", "${_Text13}", "clip", [0,20,67,0], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,20,67,0]}], position: 9000, duration: 0, easing: "easeOutCirc" },
            { id: "eid314", tween: [ "style", "${_Ellipse2}", "display", 'block', { fromValue: 'none'}], position: 3431, duration: 0, easing: "easeInOutSine" },
            { id: "eid329", tween: [ "style", "${_Ellipse2}", "display", 'none', { fromValue: 'block'}], position: 8088, duration: 0, easing: "easeInOutSine" },
            { id: "eid89", tween: [ "style", "${_GROUP_Ron_Swanson}", "top", '-15px', { fromValue: '659px'}], position: 200, duration: 500, easing: "easeInOutBack" },
            { id: "eid96", tween: [ "style", "${_GROUP_Jerry_Gergich}", "left", '437px', { fromValue: '438px'}], position: 0, duration: 500, easing: "easeInOutBack" },
            { id: "eid343", tween: [ "style", "${_Text12}", "left", '260px', { fromValue: '-141px'}], position: 8405, duration: 595, easing: "easeInOutCirc" },
            { id: "eid202", tween: [ "style", "${_GROUP_Leslie_Knope}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid403", tween: [ "style", "${_Text13Copy}", "clip", [0,20,67,0], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,37.906005859375,67,19.0465145111084]}], position: 8660, duration: 96, easing: "easeOutCirc" },
            { id: "eid87", tween: [ "style", "${_GROUP_Leslie_Knope}", "top", '-345px', { fromValue: '329px'}], position: 50, duration: 500, easing: "easeInOutBack" },
            { id: "eid442", tween: [ "style", "${_thumb2}", "opacity", '0', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutQuad" },
            { id: "eid430", tween: [ "transform", "${_thumb2}", "scaleX", '0.8', { fromValue: '1'}], position: 2389, duration: 184, easing: "easeInOutQuad" },
            { id: "eid432", tween: [ "transform", "${_thumb2}", "scaleX", '1', { fromValue: '0.8'}], position: 2573, duration: 177, easing: "easeInOutQuad" },
            { id: "eid204", tween: [ "style", "${_GROUP_Jean_Ralphio}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid97", tween: [ "style", "${_GROUP_Jerry_Gergich}", "top", '-455px', { fromValue: '219px'}], position: 0, duration: 500, easing: "easeInOutBack" },
            { id: "eid201", tween: [ "style", "${_GROUP_Jerry_Gergich}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid75", tween: [ "style", "${_GROUP_Tom_Haverford}", "top", '-345px', { fromValue: '329px'}], position: 50, duration: 500, easing: "easeInOutBack" },
            { id: "eid80", tween: [ "style", "${_GROUP_Andy_Dwyer_}", "left", '-66px', { fromValue: '-65px'}], position: 0, duration: 500, easing: "easeInOutBack" },
            { id: "eid236", tween: [ "style", "${_Text6Copy3}", "top", '74px', { fromValue: '29px'}], position: 3200, duration: 181, easing: "easeInOutQuad" },
            { id: "eid325", tween: [ "style", "${_Text6Copy3}", "top", '19px', { fromValue: '74px'}], position: 8250, duration: 500, easing: "easeInOutCirc" },
            { id: "eid141", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.color", 'rgba(0,174,255,1.00)', { fromValue: 'rgba(0,174,255,0.00)'}], position: 2389, duration: 185, easing: "easeInOutQuad" },
            { id: "eid165", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.color", 'rgba(0,0,0,0.00)', { fromValue: 'rgb(0,174,255)'}], position: 2573, duration: 177, easing: "easeInOutQuad" },
            { id: "eid451", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.color", 'rgba(0,0,0,0.36)', { fromValue: 'rgba(0,0,0,0)'}], position: 2750, duration: 148, easing: "easeInOutQuad" },
            { id: "eid211", tween: [ "style", "${_RoundRectCopy7}", "height", '180px', { fromValue: '100px'}], position: 3200, duration: 181, easing: "easeInOutQuad" },
            { id: "eid339", tween: [ "style", "${_RoundRectCopy7}", "height", '217px', { fromValue: '180px'}], position: 8250, duration: 427, easing: "easeInOutCirc" },
            { id: "eid93", tween: [ "style", "${_GROUP_Ben_Wyatt}", "top", '95px', { fromValue: '769px'}], position: 250, duration: 500, easing: "easeInOutBack" },
            { id: "eid74", tween: [ "style", "${_GROUP_Tom_Haverford}", "left", '-66px', { fromValue: '-65px'}], position: 50, duration: 500, easing: "easeInOutBack" },
            { id: "eid219", tween: [ "style", "${_Text6Copy3}", "left", '203px', { fromValue: '106px'}], position: 3200, duration: 181, easing: "easeInOutQuad" },
            { id: "eid324", tween: [ "style", "${_Text6Copy3}", "left", '96px', { fromValue: '203px'}], position: 8250, duration: 500, easing: "easeInOutCirc" },
            { id: "eid235", tween: [ "style", "${_annperkins2}", "top", '65px', { fromValue: '20px'}], position: 3200, duration: 181, easing: "easeInOutQuad" },
            { id: "eid323", tween: [ "style", "${_annperkins2}", "top", '10px', { fromValue: '65px'}], position: 8250, duration: 500, easing: "easeInOutQuad" },
            { id: "eid199", tween: [ "style", "${_GROUP_Lil_Sebastian}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid438", tween: [ "style", "${_thumb2}", "display", 'none', { fromValue: 'block'}], position: 2969, duration: 0, easing: "easeInOutQuad" },
            { id: "eid223", tween: [ "style", "${_Text9}", "opacity", '1', { fromValue: '0'}], position: 3326, duration: 150, easing: "easeInOutCirc" },
            { id: "eid328", tween: [ "style", "${_Text9}", "opacity", '0', { fromValue: '1'}], position: 8250, duration: 191, easing: "easeInOutCirc" },
            { id: "eid250", tween: [ "style", "${_Text9}", "left", '343px', { fromValue: '343px'}], position: 3476, duration: 0, easing: "easeInOutBack" },
            { id: "eid337", tween: [ "style", "${_Text9}", "left", '357px', { fromValue: '343px'}], position: 8250, duration: 250, easing: "easeInOutCirc" },
            { id: "eid81", tween: [ "style", "${_GROUP_Andy_Dwyer_}", "top", '-455px', { fromValue: '219px'}], position: 0, duration: 500, easing: "easeInOutBack" },
            { id: "eid91", tween: [ "style", "${_GROUP_Chris_Traeger}", "top", '95px', { fromValue: '769px'}], position: 250, duration: 500, easing: "easeInOutBack" },
            { id: "eid139", tween: [ "transform", "${_RoundRectCopy7}", "scaleY", '0.96', { fromValue: '1'}], position: 2389, duration: 185, easing: "easeInOutQuad" },
            { id: "eid163", tween: [ "transform", "${_RoundRectCopy7}", "scaleY", '1', { fromValue: '0.96'}], position: 2573, duration: 177, easing: "easeInOutQuad" },
            { id: "eid203", tween: [ "style", "${_GROUP_Donna_Meagle}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid79", tween: [ "style", "${_GROUP_Lil_Sebastian}", "top", '-15px', { fromValue: '659px'}], position: 200, duration: 500, easing: "easeInOutBack" },
            { id: "eid197", tween: [ "style", "${_GROUP_Ben_Wyatt}", "opacity", '0.49221801757812', { fromValue: '1'}], position: 2750, duration: 196, easing: "easeInOutBack" },
            { id: "eid137", tween: [ "subproperty", "${_RoundRectCopy7}", "boxShadow.offsetH", '0px', { fromValue: '0px'}], position: 2389, duration: 0, easing: "easeInOutBack" },
            { id: "eid431", tween: [ "transform", "${_thumb2}", "scaleY", '0.8', { fromValue: '1'}], position: 2389, duration: 184, easing: "easeInOutQuad" },
            { id: "eid433", tween: [ "transform", "${_thumb2}", "scaleY", '1', { fromValue: '0.8'}], position: 2573, duration: 177, easing: "easeInOutQuad" },
            { id: "eid120", tween: [ "style", "${_GROUP_Menu_Bar}", "left", '-95px', { fromValue: '-95px'}], position: 325, duration: 0, easing: "easeInOutBack" },
            { id: "eid471", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.blur", '15px', { fromValue: '15px'}], position: 3431, duration: 0, easing: "easeInOutQuad" },
            { id: "eid83", tween: [ "style", "${_GROUP_April_Ludgate}", "top", '-235px', { fromValue: '439px'}], position: 103, duration: 500, easing: "easeInOutBack" },
            { id: "eid95", tween: [ "style", "${_GROUP_Ann_Perkins}", "top", '-125px', { fromValue: '549px'}], position: 152, duration: 500, easing: "easeInOutQuad" },
            { id: "eid208", tween: [ "style", "${_GROUP_Ann_Perkins}", "top", '-205px', { fromValue: '-125px'}], position: 2750, duration: 531, easing: "easeInOutQuad" },
            { id: "eid400", tween: [ "style", "${_Text12}", "clip", [0,333.98516845703,67.048194885254,316], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,334,67,324]}], position: 8508, duration: 28, easing: "easeInCirc" },
            { id: "eid409", tween: [ "style", "${_Text12}", "clip", [0,333.80813598633,67.623558044434,297], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,333.98516845703,67.048194885254,316]}], position: 8536, duration: 45, easing: "easeOutCirc" },
            { id: "eid408", tween: [ "style", "${_Text12}", "clip", [0,332.76550292969,71.01212310791,291], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,333.80813598633,67.623558044434,297]}], position: 8581, duration: 11, easing: "easeOutCirc" },
            { id: "eid410", tween: [ "style", "${_Text12}", "clip", [0,331.87191772461,73.916320800781,277], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,332.76550292969,71.01212310791,291]}], position: 8592, duration: 24, easing: "easeOutCirc" },
            { id: "eid411", tween: [ "style", "${_Text12}", "clip", [0,331.4892578125,75.159927368164,258], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.87191772461,73.916320800781,277]}], position: 8616, duration: 24, easing: "easeOutCirc" },
            { id: "eid412", tween: [ "style", "${_Text12}", "clip", [0,331.32406616211,75.696769714355,216], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.4892578125,75.159927368164,258]}], position: 8640, duration: 37, easing: "easeOutCirc" },
            { id: "eid414", tween: [ "style", "${_Text12}", "clip", [0,331.32406616211,75.696769714355,184], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.3240661621094,75.69676971435547,216]}], position: 8677, duration: 17, easing: "easeOutCirc" },
            { id: "eid416", tween: [ "style", "${_Text12}", "clip", [0,331.32406616211,75.696769714355,82], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.3240661621094,75.69676971435547,184]}], position: 8694, duration: 20, easing: "easeOutCirc" },
            { id: "eid417", tween: [ "style", "${_Text12}", "clip", [0,331.32406616211,75.696769714355,28], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.3240661621094,75.69676971435547,82]}], position: 8714, duration: 36, easing: "easeOutCirc" },
            { id: "eid418", tween: [ "style", "${_Text12}", "clip", [0,331.32406616211,75.696769714355,0], { valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)', fromValue: [0,331.3240661621094,75.69676971435547,28]}], position: 8750, duration: 32, easing: "easeOutCirc" },
            { id: "eid94", tween: [ "style", "${_GROUP_Ann_Perkins}", "left", '-66px', { fromValue: '-65px'}], position: 152, duration: 500, easing: "easeInOutQuad" },
            { id: "eid207", tween: [ "style", "${_GROUP_Ann_Perkins}", "left", '195px', { fromValue: '-66px'}], position: 2750, duration: 531, easing: "easeInOutQuad" },
            { id: "eid424", tween: [ "motion", "${_thumb2}", [[1040.48,103,0,0],[880.71,-158.37,-7.17,-7.56,-156.95,-165.64],[511.44,-320.08,-627.3,-182.2,-521.86,-151.58],[47.13,-385,0,0]]], position: 875, duration: 570, easing: "easeInOutQuad" },
            { id: "eid436", tween: [ "motion", "${_thumb2}", [[47.13,-385,0,0],[30.15,-279,-6.33,297.43,-2.98,140.13],[40,-50,0,0]]], position: 1588, duration: 538, easing: "easeInOutQuad" },
            { id: "eid437", tween: [ "motion", "${_thumb2}", [[40,-50,0,0],[12.69,-52.89,-36.96,-6.9,-35.27,-6.59],[-8.18,-59,0,0]]], position: 2126, duration: 204, easing: "easeInOutQuad" },
            { id: "eid92", tween: [ "style", "${_GROUP_Ben_Wyatt}", "left", '437px', { fromValue: '438px'}], position: 250, duration: 500, easing: "easeInOutBack" },
            { id: "eid77", tween: [ "style", "${_GROUP_Jean_Ralphio}", "top", '-125px', { fromValue: '549px'}], position: 152, duration: 500, easing: "easeInOutBack" },
            { id: "eid122", tween: [ "style", "${_GROUP_Menu_Bar}", "top", '-572px', { fromValue: '-662px'}], position: 0, duration: 325, easing: "easeInOutSine" },
            { id: "eid86", tween: [ "style", "${_GROUP_Leslie_Knope}", "left", '437px', { fromValue: '438px'}], position: 50, duration: 500, easing: "easeInOutBack" }         ]
      }
   }
},
"pulse_glow": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
   dom: [
   {
      rect: ['0px','0px','60px','60px','auto','auto'],
      borderRadius: ['50%','50%','50%','50%'],
      boxShadow: ['',0,0,3,1,'rgba(0,174,239,1.00)'],
      id: 'Ellipse2',
      stroke: [0,'rgb(0, 0, 0)','none'],
      type: 'ellipse',
      fill: ['rgba(255,255,255,1)']
   }],
   symbolInstances: [
   ]
   },
   states: {
      "Base State": {
         "${_Ellipse2}": [
            ["style", "top", '0px'],
            ["subproperty", "boxShadow.blur", '3px'],
            ["subproperty", "boxShadow.spread", '1px'],
            ["subproperty", "boxShadow.color", 'rgba(0,174,239,1.00)'],
            ["subproperty", "boxShadow.offsetV", '0px'],
            ["subproperty", "boxShadow.offsetH", '0px'],
            ["style", "left", '0px']
         ],
         "${symbolSelector}": [
            ["style", "height", '60px'],
            ["style", "width", '60px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 4500,
         autoPlay: false,
         timeline: [
            { id: "eid285", tween: [ "style", "${_Ellipse2}", "left", '0px', { fromValue: '0px'}], position: 500, duration: 0, easing: "easeInOutBack" },
            { id: "eid281", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 0, duration: 500, easing: "easeInOutSine" },
            { id: "eid283", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 500, duration: 500, easing: "easeInOutSine" },
            { id: "eid286", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 1000, duration: 500, easing: "easeInOutSine" },
            { id: "eid287", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 1500, duration: 500, easing: "easeInOutSine" },
            { id: "eid288", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 2000, duration: 500, easing: "easeInOutSine" },
            { id: "eid289", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 2500, duration: 500, easing: "easeInOutSine" },
            { id: "eid292", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 3000, duration: 500, easing: "easeInOutSine" },
            { id: "eid293", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,1.00)', { fromValue: 'rgba(0,174,239,0)'}], position: 3500, duration: 500, easing: "easeInOutSine" },
            { id: "eid294", tween: [ "subproperty", "${_Ellipse2}", "boxShadow.color", 'rgba(0,174,239,0.00)', { fromValue: 'rgba(0,174,239,1)'}], position: 4000, duration: 500, easing: "easeInOutSine" }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-120170250");
