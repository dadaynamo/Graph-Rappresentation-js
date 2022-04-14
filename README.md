# Graph-Rappresentation-js
Rappresentation of a particular graph througth a JS class  with implementation of a particular methods for the maintenance of them

text of problems

Laboratorio 1
Compito (a casa) del 7 Aprile 2022
Descrizione generale
Questo compito, a differenza dei precedenti, vi chiede di realizzare un mini-progetto in più parti. La consegna potrà essere unica, e verranno considerate come validamente risolte tutte le parti completate. 
Questo compito va svolto interamente in TypeScript, avendo cura di specificare il più precisamente possibile i tipi corretti (in particolare, si raccomanda di considerare attentamente se sia il caso di usare il tipo any o simili). Ove non sia richiesto altrimenti, tutti i metodi e le proprietà sono intese essere pubbliche.
ATTENZIONE: il compilatore TypeScript può essere configurato per supportare o meno certe caratteristiche, e per essere più o meno stretto nel controllo dei tipi. Il compito è progettato per essere svolto su REPL con la configurazione di default dei progetti in TypeScript, contenuta nel file “tsconfig.json”. Assicuratevi di usare la stessa configurazione (per esempio, copiando questo file) se sviluppato il progetto in altri ambienti.
Prima parte
Si vuole realizzare una classe in TypeScript per rappresentare grafi. In particolare, l’implementazione deve soddisfare queste condizioni:
Ogni nodo è rappresentato da un oggetto della classe GNode. Gli oggetti GNode hanno una sola proprietà, di nome label, che può essere un numero o una stringa. Il costruttore avrà come argomento il valore di label.
Ogni arco è rappresentato da un oggetto della classe GEdge. Gli oggetti GEdge hanno due proprietà, from e to, che rappresentano il nodo di origine e il nodo di destinazione dell’arco (che è orientato). Il costruttore avrà come argomenti due nodi: in ordine, quello di origine e quello di destinazione.
Un grafo è rappresentato dalla classe Graph. Gli oggetti Graph hanno due proprietà, nodes (che contiene un array di nodi) e edges (che contiene un array di archi). Il costruttore ha due argomenti che sono, rispettivamente, l’array di nodi e l’array di archi che descrive il grafo.
Potete assumere che i valori passati dal chiamante siano corretti: ovvero, tutti gli archi faranno riferimento a nodi che fanno parte del grafo. 

Esempio
let	n1=new GNode(0), n2=new GNode("due"), n3=new GNode("tre")
let	e1=new GEdge(n1,n2), e2=new GEdge(n1,n3)
let	g=new Graph([n1,n2,n3],[e1,e2])
g.edges.length → 2
g.nodes[1]===n2 → true
g.nodes[0].label → 0
g.edges[0].from===n1 → true
Seconda parte
Si scriva una funzione TypeScript connected() che, ricevuto un grafo, restituisca true se il grafo è connesso, false in caso contrario. Attenzione: vogliamo verificare se il grafo è connesso, non fortemente connesso. Quindi, benché il grafo sia orientato, la proprietà di connessione non dipende dall’orientamento degli archi.

Nota: questa funzione potrebbe ragionevolmente essere implementata come un metodo della classe Graph. Tuttavia, l’esercizio chiede di implementarla come una funzione separata, esterna alla classe.

Esempio
let	n1=new GNode(1), n2=new GNode(2), n3=new GNode(3),
n4=new GNode(4)
let	e1=new GEdge(n1,n2), e2=new GEdge(n1,n3), e3=new GEdge(n3,n4)
let	g1=new Graph([n1,n2,n3,n4],[e1,e2,e3])
let	g2=new Graph([n1,n2,n3,n4],[e1,e3])
connected(g1) → true
connected(g2) → false
Terza parte
Vogliamo ora utilizzare la classe Grafo (con GNode e GEdge) per implementare un automa a stati finiti. In particolare, useremo i nodi per rappresentare gli stati, gli archi per rappresentare le transizioni, e dovremo anche indicare lo stato iniziale e gli stati finali dell’automa.
Si estendano quindi le classi già implementate come segue:
La classe State aggiunge alle caratteristiche di GNode una proprietà booleana final che vale true se lo stato è uno stato finale dell’automa, e false in caso contrario. Il costruttore avrà un argomento aggiuntivo (oltre alla label), opzionale, per default false, che sarà il valore di final dello State da costruire.
La classe Transition aggiunge alle caratteristiche di GEdge quanto segue:
le proprietà from e to dovranno essere istanze di State;
una proprietà evt che avrà come valore una funzione che, dato un evento e di un qualche tipo E, restituirà true se e è l’evento che fa “scattare” questa transizione;
una proprietà act, opzionale, che se presenta avrà come valore una funzione senza argomenti e senza risultati che verrà invocata nel momento in cui l’automa prende questa transizione; per default act non è definita;
il costruttore di Transition avrà come argomenti, in ordine: lo stato di origine, lo stato di destinazione, la funzione che controlla l’evento per decidere se prendere la transizione, la funzione che implementa l’azione da eseguire quando si prende la transizione. 
La classe Automata aggiunge alle caratteristiche di Graph quanto segue:
vengono definite due nuove proprietà che consentono di accedere con nomi e tipi più appropriati ai nodi=stati e agli archi=transizioni. In particolare, la proprietà states è un sinonimo (meglio tipato) di nodes, e transitions è un sinonimo (meglio tipato) di edges;
una proprietà initial che indica lo stato iniziale dell’automa (potete assumere che il valore di initial sia contenuto in states);
una proprietà state che indica lo stato corrente dell’automa (quando l’automa viene costruito, il suo state coincide con initial);
un metodo init() che imposta lo stato corrente allo stato iniziale;
un metodo done() che dice se lo stato corrente è uno stato finale o meno;
un metodo step(e) che, preso come argomento un valore e di un qualche tipo E (lo stesso usato nella costruzione delle transizioni) verifica se c’è una transizione uscente dallo stato corrente che può scattare con l’evento e. Il controllo viene fatto nell’ordine in cui le transizioni sono elencate in transitions. Se viene trovata una transizione che può scattare, allora viene presa, si esegue la relativa azione in act se definita, e lo stato di destinazione diventa il nuovo stato corrente; in questo caso, il metodo step() restituisce true. Se dallo stato corrente non c’è nessuna transizione uscente che può scattare con e, lo stato corrente rimane immutato e il metodo step() restituisce false.

Esempi
let si=new State(“iniziale”),
    s1=new State(1),
    s2=new State(2),
    sf=new State("finale",true)
let t1=new Transition(si,s1,n=>n%2==0),
    t2=new Transition(si,s2,n=>n%2==1),
    t3=new Transition(s1,sf,n=>n<0,()=>{console.log("e")}),
    t4=new Transition(s2,sf,n=>n<0,()=>{console.log("o")}),
    t5=new Transition(s1,s2,n=>true),
    t6=new Transition(s2,s1,n=>true)
let a= /* 	costruisce un oggetto Automata con
stati=[si,s1,s2,sf]
transizioni=[t1,t2,t3,t4,t5,t6]
stato iniziale=si */

a.state → si
a.states.length → 4
a.step(7); a.state → s2
a.step(7); a.state → s1
a.step(-4) → stampa su console “e”
a.done() → true
a.state.label → "finale"
a.transitions → [t1,t2,t3,t4,t5,t6]
a.edges → [t1,t2,t3,t4,t5,t6]
Quarta parte
Possiamo usare la classe Automata definita nella terza parte per implementare un parser per il riconoscimento di stringhe che appartengono a un linguaggio.
Si scriva la classe Parser che aggiunge ad Automata le seguenti caratteristiche:
gli eventi che regolano il comportamento dell’automa saranno stringhe;
un metodo accept(s) che, data una stringa s, esegue ripetutamente l’automa, chiamando init() e step() come necessario, finché non si può determinare se la stringa appartiene al linguaggio definito dall’automa o meno.
Nel nostro caso, stabiliamo che una stringa viene considerata riconosciuta se, dando all’automa come input i singoli caratteri della stringa, in ordine, l’automa può consumare tutti i caratteri della stringa e si trova in uno stato finale dopo aver consumato l’ultimo carattere. Per convenzione, se durante il processo non c’è nessuna transizione valida, o se si arriva in uno stato finale quando la stringa non è ancora terminata, si considera che la stringa non sia riconosciuta.

Esempio
let s1=new State(0),
    s2=new State("A"),
    s3=new State("AB"),
    s4=new State("AB(C|D)",true),
    s5=new State("Z",true)
let ta=new Transition(s1,s2,c=>c=="A"),
    tb=new Transition(s2,s3,c=>c=="B"),
    tc=new Transition(s3,s4,c=>c=="C"||c=="D"),
    tz=new Transition(s1,s5,c=>c=="Z")

var p=new Parser([s1,s2,s3,s4,s5],[ta,tb,tc,tz],s1)

p.accept("ABC") → true
p.accept("ACD") → false
p.accept("Z") → true
p.accept("ABCD") → false



Modalità di consegna e di valutazione
Le modalità di consegna verranno comunicate separatamente (sono in corso modifiche al sistema di supporto ai compiti ed esercitazioni per supportare la peculiare struttura di questo compito).
Verrà valutata sia la correttezza del codice sviluppato, sia l’accuratezza nella definizione dei tipi.
