/* Rendu universel synchrone : aucun fetch ni dépendance à un chemin JSON. */
(function(){'use strict';
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){const d=window.ALIMENTS_DATA;if(!d)return;const food=document.querySelector('#grid');if(food){const q=(document.querySelector('#q')||document.querySelector('#search'))?.value.toLowerCase()||'';const a=d.aliments.filter(x=>x.nom.toLowerCase().includes(q));food.innerHTML=a.map(x=>`<article class="card"><h3>${esc(x.nom)}</h3><p>${esc(x.categorie)} · IG ${x.ig}</p><p>${esc(x.detail)}</p></article>`).join('');const n=document.querySelector('#count');if(n)n.textContent=`${a.length} aliments`;}
const rules=document.querySelector('#rules');if(rules)rules.innerHTML=d.regles_dor.map((x,i)=>`<article class="rule"><strong>${i+1}.</strong> ${esc(x)}</article>`).join('');
[['#mix',d.melanges_crus.concat(d.melanges_cuits,d.repas_combines)],['#melanges',d.melanges_crus.concat(d.melanges_cuits,d.repas_combines)]].forEach(([sel,items])=>{const el=document.querySelector(sel);if(el)el.innerHTML=items.map(x=>`<article class="card"><h3>${esc(x.titre)}</h3><p>${esc(x.details)}</p></article>`).join('');});
const note=document.querySelector('#note');if(note)note.textContent=d.note;}
document.addEventListener('DOMContentLoaded',()=>{render();['q','search'].forEach(id=>document.querySelector('#'+id)?.addEventListener('input',render));});
})();