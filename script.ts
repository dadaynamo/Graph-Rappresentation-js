//variabile
//array nodi nodes
//array archi edges

//tipo formato da sole stringhe e numeri
type StNu= string | number;
//definizione tipo oggetto nodo e oggetto arco
type N=GNode;
type E=GEdge;
type Dictionary = {[key: StNu]: StNu[]}
/*
//definizione tipo array nodi e array archi
type arrN=[N];
type arrE=[E];
*/

//class nodo
class GNode{
  //parametri
  label:StNu;
    
    constructor(label:StNu){
      this.label=label;
    }
}

//class arco
class GEdge{
  from:N;
  to:N;

  constructor(from:N,to:N){
    this.from=from;
    this.to=to;
  }
  
}

//class grafo
class Graph{
  nodes:GNode[];
  edges:GEdge[];
  
  constructor(nodes:GNode[], edges:GEdge[]){
  this.nodes=nodes;
  this.edges=edges;
  }

}


//test fase 1
/*
  console.log("***********************************************");
  
  console.log("Test fase 1\n");
  let	n1=new GNode(0);
  console.log(n1);
  let n2=new GNode("due");
  console.log(n2);
  let n3=new GNode("tre");
  console.log(n3);
  let	e1=new GEdge(n1,n2);
  console.log(e1);
  let e2=new GEdge(n1,n3);
  console.log(e2);
  let	g=new Graph([n1,n2,n3],[e1,e2]);
  console.log(g);
  console.log(g.edges.length);
  console.log(g.nodes[1]===n2);
  console.log(g.nodes[0].label);
  console.log(g.edges[0].from===n1);
  console.log("Fase 1 finita");
  
  console.log("***********************************************");
*/


//fase 2
//capire se un grafo è connesso

/*
//stampa valore del nodo inizio di un arco
console.log(e1.from.label);
//stampa valore del nodo arrivo di un arco
console.log(e1.to.label);
//stampa numero nodi di un grafo
console.log(g.nodes.length);
*/

/* 1 tentativo
function connected(G:Graph){
  var arr: StNu[]=[];
  for(var i of G.edges){

    if(nEx(arr,i.from.label)==false)
    arr.push(i.from.label);
    if(nEx(arr,i.to.label)==false)
    arr.push(i.to.label);
  }
  if(arr.length==G.edges.length)return true;
  else return false;
}
function nEx(arr:StNu[],l:StNu){
  var b:boolean=false;
  for(var i of arr){
    if(i==l)  
      b=true;
  }
  return b;
}  
*/

/*controlla se un valore l 
stringa o number è in un array arr*/
function nEx(arr:StNu[],l:StNu){
  var b:boolean=false;
  for(var i of arr){
    if(i==l)  
      b=true;
  }
  return b;
} 

//genera lista di adiacenza di un grafo
function genListAd(G:Graph){
  /*
  lista adiacenza
  1 | 2,3
  2 | /
  3 | 4
  4 | /
  
  implementazione con strutture dati
  lAd={1:[2,3],2:[],3:[4],4:[]}
  */
  /*
  proprietà di un grafo, nodo e arco
  g.edges -> array archi
  g.nodes -> array nodi
  nodo.label -> label di un nodo specifico
  arco.from  -> nodo iniziale 
  arco.to    -> nodo finale
  */
  
  var lAd:Dictionary={};  
    
  //inserimento chiavi che sono i nodi
  for(var i of G.nodes){
    lAd[i.label]=[];
  }
    //console.log(lAd);
  /*inserimento nodi di uscita di ogni 
    singolo nodo*/
  for(var a of G.edges){
    lAd[a.from.label].push(a.to.label);
  }
  //console.log("Lista di adiacenza grafo");
  //console.log(lAd);
  //restituzione lista adiacenza
  return lAd;
}

//ritorna true o false se è connesso o meno il grafo
function connected(G:Graph){

let lAd=genListAd(G);  
//console.log(lAd);
//inizializzo sorgente
let s:StNu=G.nodes[0].label;
//console.log("Sorgente: "+s);
let Bi:StNu[]=[];
let Gr:StNu[]=[];
let Ne:StNu[]=[];
let Q:StNu[]=[];
  
//riempio array bianco senza la sorgente
  for(let i of G.nodes){
    if(i.label!=s){
    Bi.push(i.label);  
    }
  }
  //console.log("Array bianco "+Bi);

  //setto sorgente a grigio
  Gr.push(s);
  //console.log("array grigio "+Gr);

  //inizializzo la ipotetica coda bfs
  Q.push(s);

  
  while(Q.length!=0){
    
    let u=Q[0];
    /*console.log("elemento che si esaminerà       nel ciclo: "+u);*/
    Q.shift();
    //console.log(Q);
    
    for(let v of lAd[u]){
      //console.log("v"+v+"  bianco: "+Bi);
      /*nodo mai scoperto 
        ancora bianco*/
      if(nEx(Bi,v)==true){
        //tolgo dai bianchi
        let indv=Bi.indexOf(v);
        Bi.splice(indv,1);
        //aggiungo nei grigi
        Gr.push(v);
        //aggiunta in coda BFS
        Q.push(v);
      }
    }
    Ne.push(u);
    
  }
  /*
  console.log("lista neri");
  console.log(Ne);
  */
  if(Ne.length==G.nodes.length) return true;
  else return false;

}

/*
//test fase 2
  let	n1=new GNode(1);
  let n2=new GNode(2);
  let n3=new GNode(3);
  let n4=new GNode(4);
  let	e1=new GEdge(n1,n2);
  let e2=new GEdge(n1,n3);
  let e3=new GEdge(n3,n4);
  let	g1=new Graph([n1,n2,n3,n4],[e1,e2,e3])
  let	g2=new Graph([n1,n2,n3,n4],[e1,e3])
  console.log(connected(g1));
  console.log(connected(g2));
*/



//terza parte
/*
i nodi saranno gli stati
archi saranno le transizioni
si indicheranno lo stato iniziale e gli stati finali

State estende GNode
proprietà:
final: boolean
construttore (label,final=false){

}

*/
class State extends GNode {
  final:boolean;
  constructor(label:StNu,final:boolean=false){
    super(label);
    this.final=final;
  }
}

class Transition extends GEdge{
from:State;
to:State;
evt:boolean;
act:void;
  
  constructor(from:State,to:State,evt:boolean,act?:void){
  super(from,to);
  this.from=from;
  this.to=to;
  this.evt=evt;
  this.act=act;
}
  
}





