//variabile
//array nodi nodes
//array archi edges

//tipo formato da sole stringhe e numeri
type StNu = string | number;
//definizione tipo oggetto nodo e oggetto arco
type N = GNode;
type E = GEdge;
type Dictionary = { [key: StNu]: StNu[] }
/*
//definizione tipo array nodi e array archi
type arrN=[N];
type arrE=[E];
*/

//class nodo
class GNode {
  //parametri
  label: StNu;

  constructor(label: StNu) {
    this.label = label;
  }
}

//class arco
class GEdge {
  from: N;
  to: N;

  constructor(from: N, to: N) {
    this.from = from;
    this.to = to;
  }

}

//class grafo
class Graph {
  nodes: GNode[];
  edges: GEdge[];

  constructor(nodes: GNode[], edges: GEdge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

}





//fase 2
//capire se un grafo è connesso



/*controlla se un valore l 
stringa o number è in un array arr*/
function nEx(arr: StNu[], l: StNu): boolean {
  var b: boolean = false;
  for (var i of arr) {
    if (i == l)
      b = true;
  }
  return b;
}

//genera lista di adiacenza di un grafo
function genListAd(G: Graph): Dictionary {
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

  var lAd: Dictionary = {};

  //inserimento chiavi che sono i nodi
  for (var i of G.nodes) {
    lAd[i.label] = [];
  }
  //console.log(lAd);
  /*inserimento nodi di uscita di ogni 
    singolo nodo*/
  for (var a of G.edges) {
    lAd[a.from.label].push(a.to.label);
  }
  //console.log("Lista di adiacenza grafo");
  //console.log(lAd);
  //restituzione lista adiacenza
  return lAd;
}

//ritorna true o false se è connesso o meno il grafo
function connected(G: Graph): boolean {

  let lAd = genListAd(G);
  //console.log(lAd);
  //inizializzo sorgente
  let s: StNu = G.nodes[0].label;
  //console.log("Sorgente: "+s);
  let Bi: StNu[] = [];
  let Gr: StNu[] = [];
  let Ne: StNu[] = [];
  let Q: StNu[] = [];

  //riempio array bianco senza la sorgente
  for (let i of G.nodes) {
    if (i.label != s) {
      Bi.push(i.label);
    }
  }
  //console.log("Array bianco "+Bi);

  //setto sorgente a grigio
  Gr.push(s);
  //console.log("array grigio "+Gr);

  //inizializzo la ipotetica coda bfs
  Q.push(s);


  while (Q.length != 0) {

    let u = Q[0];
    /*console.log("elemento che si esaminerà       nel ciclo: "+u);*/
    Q.shift();
    //console.log(Q);

    for (let v of lAd[u]) {
      //console.log("v"+v+"  bianco: "+Bi);
      /*nodo mai scoperto 
        ancora bianco*/
      if (nEx(Bi, v) == true) {
        //tolgo dai bianchi
        let indv = Bi.indexOf(v);
        Bi.splice(indv, 1);
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
  if (Ne.length == G.nodes.length) return true;
  else return false;

}




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
  final: boolean;
  constructor(label: StNu, final: boolean = false) {
    super(label);
    this.final = final;
  }
}

type evtT = (<E>(e: E) => boolean);
type actT = (() => void) | undefined;

class Transition<E> extends GEdge {
  from: State;
  to: State;
  evt: evtT;
  act: actT;

  constructor(from: State, to: State, evt: evtT, act?: actT) {
    super(from, to);
    this.from = from;
    this.to = to;
    this.evt = evt;
    this.act = act;
  }

}


interface IAutomata<E> {
  states: State[];
  transitions: Transition<E>[];
  initial: State;
  state: State;
  init(): void;
  done(): boolean;
  step(e: E): boolean;

}


class Automata<E> extends Graph implements IAutomata<E>{
  states: State[];
  transitions: Transition<E>[];
  initial: State;
  state: State;

  constructor(states: State[], transitions: Transition<E>[], initial: State) {

    super(states, transitions);
    this.transitions = transitions;
    this.states = states;
    this.initial = initial;
    //punto b
    this.state = this.initial;
    /*//punto 
    this.state=this.state;*/
  }

  init() {
    this.state = this.initial;
  }
  done() {
    if (this.state.final == true)
      return true;
    else
      return false;

  }
  step<E>(e: E) {
    for (var i in this.transitions) {

      if (this.state == this.transitions[i].from && this.transitions[i].evt(e) === true) {
        if (this.transitions[i].act != undefined) {
          this.transitions[i].act?.();
        }
        this.state = this.transitions[i].to;
        return true;
      }
    }
    return false;
  }

}


//test 3

let si = new State("iniziale");
let s1 = new State(1);
let s2 = new State(2);
let sf = new State("finale", true);
let t1 = new Transition(si, s1, (n: any) => n % 2 == 0);
let t2 = new Transition(si, s2, (n: any) => n % 2 == 1);
let t3 = new Transition(s1, sf, (n: any) => n < 0, () => { console.log("e") });
let t4 = new Transition(s2, sf, (n: any) => n < 0, () => { console.log("o") });
let t5 = new Transition(s1, s2, n => true);
let t6 = new Transition(s2, s1, n => true);

let a = new Automata([si, s1, s2, sf], [t1, t2, t3, t4, t5, t6], si);


class Parser<E> extends Automata<E>{
  a: string[];

  constructor(states: State[], transitions: Transition<E>[], initial: State) {
    super(states, transitions, initial);
    this.a = [];

  }
  accept(s: string) {

 
      //splitto la stringa
      this.a = s.split('');
      //init automa
      this.init();
    
      for (let i = 0; i < this.a.length; i++) {
        //return this.a[i];
        var ex = this.step(this.a[i]);
        //se una transizione non va a buon fine returno false
        if (ex == false) {
          return false;
        }
        //nella transizione intermedia se sono finale allora returno false
        if (i < this.a.length-1 && this.state.final == true) {
          return false;
        }
      }
      return this.done();

    
  }
}
