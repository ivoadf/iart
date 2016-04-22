% 2.2

%estado inicial
estado_inicial(estado(3, 3, 1)).

%estado final
estado_final(estado(0, 0, 0)).

%transições entre estados

sucessor(Ea,Eseg,1):-
	sucessor(Ea,Eseg).
sucessor(estado(NM, NC, 1), NovoEstado) :-
	NM1 is NM - 1,
	NC1 is NC - 1,
	NovoEstado = estado(NM1, NC1, 0),
	legal(NovoEstado).
sucessor(estado(NM, NC, 1), NovoEstado) :-
	NM1 is NM - 1,
	NovoEstado = estado(NM1, NC, 0),
	legal(NovoEstado).
sucessor(estado(NM, NC, 1), NovoEstado) :-
	NC1 is NC - 1,
	NovoEstado = estado(NM, NC1, 0),
	legal(NovoEstado).
sucessor(estado(NM, NC, 1), NovoEstado) :-
	NM1 is NM - 2,
	NovoEstado = estado(NM1, NC, 0),
	legal(NovoEstado).
sucessor(estado(NM, NC, 1), NovoEstado) :-
	NC1 is NC - 2,
	NovoEstado = estado(NM, NC1, 0),
	legal(NovoEstado).
sucessor(estado(NM, NC, 0), NovoEstado) :-
	NM1 is NM + 1,
	NC1 is NC + 1,
	NovoEstado = estado(NM1, NC1, 1),
	legal(NovoEstado).
sucessor(estado(NM, NC, 0), NovoEstado) :-
	NM1 is NM + 1,
	NovoEstado = estado(NM1, NC, 1),
	legal(NovoEstado).
sucessor(estado(NM, NC, 0), NovoEstado) :-
	NC1 is NC + 1,
	NovoEstado = estado(NM, NC1, 1),
	legal(NovoEstado).
sucessor(estado(NM, NC, 0), NovoEstado) :-
	NM1 is NM + 2,
	NovoEstado = estado(NM1, NC, 1),
	legal(NovoEstado).
sucessor(estado(NM, NC, 0), NovoEstado) :-
	NC1 is NC + 2,
	NovoEstado = estado(NM, NC1, 1),
	legal(NovoEstado).

legal(estado(NM, NC, _)) :-
	NM >= 0,
	NC >= 0,
	NM =< 3,
	NC =< 3,
	(NM >= NC; NM = 0),
	NMdireita is 3-NM,
	NCdireita is 3-NC,
	(NMdireita >= NCdireita; NMdireita = 0).

%algoritmo em profundidade
pf:-
  estado_inicial(Ei),
  estado_final(Ef),
  pf(Ei,Ef,[Ei],L),write(L).

%past used to prevent loops in the states
pf(Ef,Ef,Past,Past).
pf(Ea,Ef,Past,L):-
  sucessor(Ea,Eseg),
  \+ member(Eseg,Past),
  pf(Eseg,Ef,[Eseg|Past],L).

%algoritmo em largura
pl:-
  estado_inicial(Ei),
  estado_final(Ef),
  pl([[Ei]],Ef,Sol),write(Sol).

%caso cheguemos ao estado final, que se encontra no primeiro no da arvore
pl([CamA|_],Ef,CamA):-
  CamA=[Ef|_].

pl([CamA|OCams],Ef,Sol):-
  CamA=[Ea|OEs],
  findall([Eseg|CamA],(sucessor(Ea,Eseg),\+member(Eseg,OEs)),NovosCams),
  append(OCams,NovosCams,NovaArv), %ordem importante, devem ser processados primeiro os nos da arvore que já se encontram na arvore, todos os appends devem ser para o fim
  %garante a ordem ao fazer append do nó expandido no final da árvore.
  pl(NovaArv,Ef,Sol).
% [ [...,...,...], [...,...,...] ]
%     e1, e2, e3    e1, e2, e3
%       Ramo           Ramo

%melhor primeiro, A*

% f=h+g
% g nr de travessias até ao momento
heuristica(Ea,H):- %custo=nr de travessias
	Ea=estado(Me,Ce,_),
	H is (Me+Ce)/2.%deve sub-estimar o custo de chegada á solucao, nunca sobre-estimar

%f está na cabeça da lista
%Ei/0 - estado com o custo associado
mp:-
	estado_inicial(Ei),
  estado_final(Ef),
	heuristica(Ei,Hi),
	mp([[Hi,[Ei/0]]],Ef,Sol),write(Sol).

mp([[CamA|_OCams]],Ef,Sol):-
	CamA=[_,[Ef/_|OEs]],Sol=[Ef,OEs].

mp([CamA|OCams],Ef,Sol):-
	CamA=[_Fa,[Ea/Ga|OEs]],
	findall([Fseg,Eseg/Fseg,Ea/Ga|OEs],
	(sucessor(Ea,Eseg,Custo),heuristica(Eseg,Hseg),\+member(Eseg,OEs),Gseg is Ga+Custo,Fseg is Gseg+Hseg),NovosCams),
	append(OCams,NovosCams,NovaArv),
	sort(NovaArv,NovaArvOrd),
	mp(NovaArvOrd,Ef,Sol).
