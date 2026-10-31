const PLANS={basic:{n:"Basic",p:59,rw:1,arc:[1,3,1],cust:0,feat:["Main Outline Wish (DHM)","1 revised wish","5 chapters, ARC 1-3-1","3×3 matrix","Editable PDF for manual outlining","SAY Series: 2 e-books (SAY Point Theory, SAY What You Mean)","1 mini-course"]},
standard:{n:"Standard",p:79,rw:2,arc:[2,3,2],cust:0,feat:["Main Outline Wish (DHM)","2 revised wishes","7 chapters, ARC 2-3-2","3×3 matrix","Editable PDF for manual outlining","SAY Series: 3 e-books (Just SAY It, SAY What You Mean, SAY Point Theory)","2 mini-courses","Upgrade within 10 minutes, pay the difference"]},
founding:{n:"Founding Member",p:199,rw:3,arc:[3,4,2],cust:1,feat:["Main Outline Wish (DHM)","3 revised wishes","9 chapters, ARC 3-4-2 (customizable)","4×3 matrix","Editable PDF","Full SAY Series: 6 e-books","Grand Masterclass","Lifetime discount on the SAYBOOK App","Up to 3 feature suggestions","Only 50 founders"]}};
const CH=["Awareness","Resolution","Call to Action"],L=["A","R","C"],SL={S:"Story",Y:"Yielded Evidence",A:"Advice"};
const $=s=>document.querySelector(s),esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let ST={ps:[]},S=null,view="list",tab="map",pend="standard",intent=0,timer=null,mem=null,draft={},errs={};
const KEY="saybook-store-v2",OLD="saybook-dhm-v1",uid=()=>Math.random().toString(36).slice(2,8)+Date.now().toString(36);
const wishes=()=>[{t:S.wish,at:S.wishAt},...S.revs];
function loadStore(){try{const v=localStorage.getItem(KEY);if(v)return JSON.parse(v);const o=localStorage.getItem(OLD);if(o){const p=JSON.parse(o),n=Date.now();return{ps:[Object.assign(p,{id:uid(),created:n,updated:n,wishAt:n,act:0,revs:(p.revs||[]).map(t=>({t,at:n}))})]}}}catch(e){}return mem||{ps:[]}}
function write(){try{localStorage.setItem(KEY,JSON.stringify(ST));return true}catch(e){return false}}
function setSt(t){const e=$("#st");if(e)e.textContent=t}
function save(){mem=ST;if(S)S.updated=Date.now();setSt("Saving…");clearTimeout(timer);timer=setTimeout(flush,350)}
function flush(){if(timer==null)return;clearTimeout(timer);timer=null;setSt(write()?"Saved":"Not saved: browser storage is unavailable. Download your PDF to keep a copy.")}
addEventListener("beforeunload",e=>{if(timer!=null){e.preventDefault();e.returnValue=""}});
function ask(msg,fn){$("#dmsg").textContent=msg;const d=$("#dlg");$("#dyes").onclick=()=>{d.close();fn()};$("#dno").onclick=()=>d.close();d.showModal()}
/* home */
$("#plans").innerHTML=Object.entries(PLANS).map(([k,p])=>`<div class="box plan ${k=="founding"?"f":""}"><h3>${p.n}</h3><div class="price">$${p.p}</div><ul>${p.feat.map(f=>`<li>${esc(f)}</li>`).join("")}</ul><a class="btn ${k=="founding"?"":"alt"}" href="#app" data-plan="${k}" style="text-align:center">Try the ${p.n} map</a></div>`).join("");
document.addEventListener("click",e=>{const a=e.target.closest("[data-plan]");if(a){pend=a.dataset.plan;intent=1}});
(function(){let s="",x=n=>(70+Math.sin(n)*60).toFixed(1);const N=9,ys=i=>30+i*42;let a="M",b="M";
for(let i=0;i<=80;i++){const y=20+i*4.5,t=i/80*Math.PI*4;a+=(i?"L":"")+(220+Math.sin(t)*90).toFixed(1)+" "+y;b+=(i?"L":"")+(220-Math.sin(t)*90).toFixed(1)+" "+y}
s+=`<path d="${a}" fill="none" stroke="#9CC3EE" stroke-width="5" stroke-linecap="round"/><path d="${b}" fill="none" stroke="#E3B04B" stroke-width="5" stroke-linecap="round"/>`;
for(let i=0;i<N;i++){const y=ys(i),t=((y-20)/4.5/80)*Math.PI*4,dx=Math.sin(t)*90;s+=`<line x1="${220-dx}" x2="${220+dx}" y1="${y}" y2="${y}" stroke="#F2F5FB" stroke-opacity=".5" stroke-width="2"/>`}
s+=`<text x="10" y="392" fill="#9CC3EE" font-size="14" font-family="sans-serif">Grand Narrative</text><text x="430" y="392" text-anchor="end" fill="#E3B04B" font-size="14" font-family="sans-serif">Grand Advice</text>`;
$("#helix").innerHTML=s})();
/* walkthrough slides: content drawn from the client’s methodology document */
(function(){const D=[
["Plan the frame, then pour the concrete","<p>A book built grain by grain is impractical. Plan it as a system instead: a <b>Book Net</b> of three <b>Chords</b> and hollow <b>SAY Modules</b>. The writing comes last, when you fill the frame.</p><p class=\"mut\">Structural design and content execution are kept apart.</p>"],
["One map, two strands","<p><b>Grand Narrative</b> holds the Story of Thesis for each chapter. <b>Grand Advice</b> holds the Main Advice Statements. The <b>Development</b> column between them sets the SAY syntax, such as SYA + ASA + YAA.</p><p class=\"mut\">For every verdict you deliver, a matching instruction.</p>"],
["Each chord solves a different problem","<ul><li><b>Awareness:</b> the contextual problem. The sentence proves why the urgency is real.</li><li><b>Resolution:</b> the methodological problem. The sentence proves the new method works.</li><li><b>Call to Action:</b> the operational problem. The advice shows how to change behavior.</li></ul>"],
["Read the chain of main sentences","<blockquote>If you continue as you are, you are becoming a “historical artifact.”</blockquote><blockquote>Your hard work is being negated by inefficient systems.</blockquote><blockquote>Unless you change your fundamental approach to collaboration, you will be replaced by those who do.</blockquote><p class=\"mut\">Example Awareness chord from the SAYBOOK methodology. Read together, the sentences should form one argument.</p>"],
["From main sentence to micro-sentence","<p>A main sentence is supported by sub-sentences, and each sub-sentence by the micro-sentences of its SAY points. Anyone writing a point knows what the story must illustrate, what the evidence must prove and what the advice must fix.</p><p><a class=\"btn\" href=\"#app\">Build your Double Helix Map</a></p>"]];
let n=0;const sl=document.getElementById("sl"),dots=document.getElementById("sdots");
function show(i){n=(i+D.length)%D.length;sl.innerHTML="<h3>"+D[n][0]+"</h3>"+D[n][1]+"<p class=\"mut\">Slide "+(n+1)+" of "+D.length+"</p>";dots.innerHTML=D.map((_,k)=>`<button aria-label="Go to slide ${k+1}" ${k==n?'aria-current="true"':""}></button>`).join("");[...dots.children].forEach((b,k)=>b.onclick=()=>show(k))}
document.getElementById("sprev").onclick=()=>show(n-1);document.getElementById("snext").onclick=()=>show(n+1);
document.getElementById("deck").addEventListener("keydown",e=>{if(e.key=="ArrowRight")show(n+1);if(e.key=="ArrowLeft")show(n-1)});show(0)})();
/* model */
const blankSyn=()=>[["S","Y","A"],["A","S","A"],["Y","A","A"]],TOT=p=>p.arc.reduce((a,b)=>a+b);
const fmt=t=>new Date(t).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
const lines=s=>(s||"").split("\n").map(x=>x.trim()).filter(Boolean),blank=s=>!s||!s.trim();
const synKey=c=>c.syn.map(x=>x.join("")).join("+"),synTxt=c=>c.syn.map(x=>x.join("")).join(" + ");
const cst=i=>{const c=S.ch[i],t=!blank(c.main),a=lines(c.adv).length>0;return t&&a?"ok":t?"noadv":a?"noth":"empty"};
const FL={ok:"✓ complete",noadv:"⚠ needs advice",noth:"⚠ needs verdict",empty:"○ empty"};
function validate(f){const e={};if(blank(f.title))e.title="Enter a book title.";else if(f.title.length>140)e.title="Keep the title under 140 characters.";if(blank(f.wish))e.wish="Enter your Main Outline Wish.";if(!PLANS[f.plan])e.plan="Choose a plan.";return e}
function newProject(f){const n=Date.now(),pl=PLANS[f.plan];S={id:uid(),created:n,updated:n,plan:f.plan,title:f.title.trim(),wish:f.wish.trim(),wishAt:n,revs:[],act:0,aud:f.aud.trim(),theme:f.theme.trim(),desc:f.desc.trim(),arc:[...pl.arc],ch:[]};
for(let i=0;i<TOT(pl);i++)S.ch.push({t:"",main:"",syn:i==0?blankSyn():[["S","Y","A"]],adv:"",subs:[]});ST.ps.push(S);save();flush()}
function audit(){const f=[],ch=S.ch,pl=PLANS[S.plan];
if(ch.length!=TOT(pl))f.push(["error",0,`This project has ${ch.length} chapters, but the ${pl.n} plan includes ${TOT(pl)}.`,"Chapter counts follow the plan. Recreate the project if this data was damaged."]);
S.arc.forEach((n,c)=>{if(n<1)f.push(["error",0,`${CH[c]} has no chapters.`,"Every chord needs at least one chapter to complete the ARC."])});
if(!pl.cust&&S.arc.some((n,c)=>n!=pl.arc[c]))f.push(["error",0,`ARC ${S.arc.join("-")} does not match the ${pl.n} plan (${pl.arc.join("-")}).`,"Only the Founding Member plan can customize its ARC."]);
if(blank(wishes()[S.act].t))f.push(["error",0,"The foundation wish is empty.","Write it on the Wishes tab."]);
ch.forEach((c,i)=>{const n=i+1,st=cst(i);
if(blank(c.t))f.push(["warning",n,`Chapter ${n} has no title.`,"Give each chapter a working title."]);
if(st=="noadv")f.push(["error",n,`Chapter ${n} has a Story of Thesis but no Main Advice Statement.`,"Add advice so the helix isn’t unzipped."]);
if(blank(c.main))f.push(["error",n,st=="noth"?`Chapter ${n} has advice but no Story of Thesis sentence.`:`The SOT chain has a gap at chapter ${n}: no main sentence.`,"Write the chapter’s main sentence (its verdict)."]);
c.subs.forEach(s=>{const sn=s.t||"untitled";if(blank(s.s))f.push(["warning",n,`Chapter ${n}, “${sn}” has no sub-sentence.`,"Sub-sentences link the main sentence to the micro-sentences."]);
s.pts.forEach((p,j)=>{if(blank(p.m))f.push(["warning",n,`Chapter ${n}, “${sn}”, point ${j+1}: no micro-sentence.`,"Add the one-line sentence this point must prove."]);
p.syn.forEach((k,q)=>{if(blank(p.c[q]))f.push(["warning",n,`Chapter ${n}, “${sn}”, point ${j+1}: ${SL[k]} (part ${q+1}) is empty.`,"A short note is enough; full writing comes later."])})})})});
if(ch.length>1&&new Set(ch.map(synKey)).size==1)f.push(["warning",0,"Every chapter uses the same SAY syntax.","Vary the syntax between chapters, for example SYA, ASA, YAA."]);
else for(let i=2;i<ch.length;i++)if(synKey(ch[i])==synKey(ch[i-1])&&synKey(ch[i])==synKey(ch[i-2])){f.push(["info",i+1,`Chapters ${i-1}–${i+1} repeat the same syntax.`,"Consider varying the SAY strings."]);break}
return f}
function counts(){let th=0,ad=0;S.ch.forEach(c=>{if(!blank(c.main))th++;if(lines(c.adv).length)ad++});return{th,ad,n:S.ch.length,au:audit().length}}
const prog=c=>`${c.th} of ${c.n} chapter verdicts written · ${c.ad} of ${c.n} chapters with advice · ${c.au} audit item${c.au==1?"":"s"}`;
/* views */
function render(){const b=$("#appbody");if(view=="list"&&!ST.ps.length)view="new";
b.innerHTML=view=="list"?vList():view=="new"?vNew():vWork();if(view=="new")wireNew()}
function vList(){const ps=[...ST.ps].sort((a,b)=>b.updated-a.updated);
return `<div class="bar"><h1 style="font-size:2rem;margin:0">My book projects</h1><button class="btn" data-act="newp" style="margin-left:auto">New project</button></div>
<p class="mut">Projects are stored in this browser only. Clearing your browser data removes them, so download a PDF of anything you want to keep. Accounts and cloud saving aren’t connected yet.</p>
<div class="cols">${ps.map(p=>{S=p;const c=counts(),pl=PLANS[p.plan];return `<div class="box"><h3>${esc(p.title)}</h3><p class="mut" style="margin:0 0 8px">${pl.n} · ARC ${p.arc.join("-")} · ${p.ch.length} chapters<br>Updated ${fmt(p.updated)}</p><p style="margin:0 0 12px">${c.th}/${c.n} verdicts · ${c.ad}/${c.n} with advice<br>${c.au?`<b>${c.au} audit item${c.au==1?"":"s"} to review</b>`:"No structural gaps found"}</p><div style="display:flex;gap:8px"><button class="btn sm" data-act="open" data-id="${p.id}">Open</button><button class="btn alt sm" data-act="del" data-id="${p.id}">Delete</button></div></div>`}).join("")}</div>`}
function vNew(){const d=Object.assign({plan:pend,title:"",wish:"",desc:"",aud:"",theme:""},draft),er=k=>errs[k]?`<div class="err" id="e-${k}">${errs[k]}</div>`:"",iv=k=>errs[k]?`aria-invalid="true" aria-describedby="e-${k}"`:"";
return `<h1 style="font-size:2rem">Start a book project</h1><p class="mut">Checkout isn’t connected yet. The plan you pick sets the chapter, ARC and revised-wish limits for this demo project.</p>
<form class="form" id="setup" novalidate><div><label class="l" for="f-title">Book title *</label><input type="text" id="f-title" value="${esc(d.title)}" ${iv("title")}>${er("title")}</div>
<div><label class="l" for="f-wish">Main Outline Wish *</label><textarea id="f-wish" ${iv("wish")} placeholder="What should this book achieve for the reader?">${esc(d.wish)}</textarea>${er("wish")}</div>
<div><label class="l" for="f-desc">Short description</label><textarea id="f-desc" style="min-height:60px">${esc(d.desc)}</textarea></div>
<div class="row"><div><label class="l" for="f-aud">Intended audience</label><input type="text" id="f-aud" value="${esc(d.aud)}"></div><div><label class="l" for="f-theme">Primary subject or theme</label><input type="text" id="f-theme" value="${esc(d.theme)}"></div></div>
<div><label class="l" for="f-plan">Plan *</label><select id="f-plan" ${iv("plan")}>${Object.entries(PLANS).map(([k,p])=>`<option value="${k}" ${k==d.plan?"selected":""}>${p.n} ($${p.p}): ARC ${p.arc.join("-")}, ${TOT(p)} chapters, ${p.rw} revised wish${p.rw>1?"es":""}</option>`).join("")}</select>${er("plan")}</div>
<div style="display:flex;gap:10px"><button class="btn">Create project and open the map</button>${ST.ps.length?`<button type="button" class="btn alt" data-act="back">Cancel</button>`:""}</div></form>`}
function wireNew(){$("#setup").onsubmit=e=>{e.preventDefault();draft={title:$("#f-title").value,wish:$("#f-wish").value,desc:$("#f-desc").value,aud:$("#f-aud").value,theme:$("#f-theme").value,plan:$("#f-plan").value};errs=validate(draft);
if(Object.keys(errs).length){render();const f=document.querySelector('[aria-invalid="true"]');if(f)f.focus();return}
errs={};newProject(draft);draft={};view="work";tab="map";render();scrollTo(0,0)}}
function vWork(){const pl=PLANS[S.plan],mx=Math.max(...S.arc),c=counts();
return `<div class="bar"><button class="btn alt sm" data-act="back">← My projects</button><div><b style="font-size:1.3rem">${esc(S.title)}</b><div class="mut" style="font-size:.85rem">${pl.n} plan · ARC ${S.arc.join("-")} · ${S.ch.length} chapters · ${mx}×3 matrix · saved in this browser only</div></div><span class="status" id="st" role="status">Saved</span></div>
<div class="box" style="margin-bottom:14px"><span class="mut">Foundation wish (${S.act?"revised wish "+S.act:"Main Outline Wish"}):</span> <span class="ser" id="fw">${esc(wishes()[S.act].t)}</span></div>
<div class="tabs" role="tablist">${[["map","Map"],["wish","Wishes"],["chain","SOT chain"],["audit","SAY Audit"],["export","Export"]].map(([k,n])=>`<button role="tab" aria-selected="${tab==k}" data-tab="${k}">${n}${k=="audit"?` (<span id="auN">${c.au}</span>)`:""}</button>`).join("")}</div>
<div class="tab" id="t-${tab}">${({map:vMap,wish:vWish,chain:vChain,audit:vAudit,export:vExport})[tab]()}</div>`}
function rail(){let h=`<nav class="rail" aria-label="Chapters">`,i=0;for(let c=0;c<3;c++){h+=`<div class="rc"><span class="badge ${L[c]}">${L[c]}</span><b>${CH[c]}</b></div>`;for(let k=0;k<S.arc[c];k++,i++){const s=cst(i);h+=`<button class="ri ${s}" id="r${i}" data-go="${i}"><span class="n">${i+1}</span><span class="t">${esc(S.ch[i].t||"Untitled")}</span><span class="f">${FL[s]}</span></button>`}}return h+"</nav>"}
function vMap(){const pl=PLANS[S.plan],c=counts();let h=`<p class="prog" id="prog">${prog(c)}</p><div class="layout">${rail()}<div>`;
if(pl.cust){const t=TOT(pl);h+=`<div class="box" style="margin-bottom:8px"><b>Customize your ARC</b> <span class="mut">(total stays ${t} chapters, at least 1 per chord)</span><div class="row" style="margin-top:8px">${[0,1].map(c=>`<div><label class="l" for="arc${c}">${CH[c]} chapters</label><select id="arc${c}" data-arc="${c}">${Array.from({length:t-2},(_,i)=>i+1).map(v=>`<option ${v==S.arc[c]?"selected":""}>${v}</option>`).join("")}</select></div>`).join("")}<div><label class="l">Call to Action chapters</label><div style="padding:8px">${S.arc[2]}</div></div></div></div>`}
let i=0;for(let c=0;c<3;c++){h+=`<div class="chord"><span class="badge ${L[c]}">${L[c]}</span><h2>Chord ${c+1}: ${CH[c]}</h2></div>`;for(let k=0;k<S.arc[c];k++,i++)h+=chap(i,c)}return h+"</div></div>"}
function chap(i,c){const x=S.ch[i],s=cst(i);return `<article class="ch" id="c${i}"><header><span class="badge ${L[c]}">${i+1}</span><input type="text" aria-label="Chapter ${i+1} title" placeholder="Chapter ${i+1} title" data-p="ch.${i}.t" value="${esc(x.t)}"></header>
<div class="grid3"><div class="n"><label class="l n" for="m${i}">Grand Narrative: Story of Thesis (main sentence)</label><textarea id="m${i}" data-p="ch.${i}.main" placeholder="The verdict this chapter delivers">${esc(x.main)}</textarea><div class="wn" id="wt${i}" ${s=="noth"?"":"hidden"}>This chapter has advice but no verdict yet.</div></div>
<div><label class="l">Development: SAY syntax</label>${x.syn.map((sy,j)=>`<div class="syn">${sy.map((k,q)=>`<select aria-label="Chapter ${i+1}, string ${j+1}, part ${q+1}" data-syn="${i}.${j}.${q}">${["S","Y","A"].map(o=>`<option ${o==k?"selected":""}>${o}</option>`).join("")}</select>`).join("")}${x.syn.length>1?`<button class="btn alt sm" data-act="rmsyn" data-i="${i}" data-j="${j}" aria-label="Remove string ${j+1}">×</button>`:""}${j<x.syn.length-1?'<span class="plus">+</span>':""}</div>`).join("")}
<div style="display:flex;gap:4px;flex-wrap:wrap">${["SYA","ASA","YAA"].map(p=>`<button class="btn alt sm" data-act="addsyn" data-i="${i}" data-v="${p}" ${x.syn.length>=4?"disabled":""}>+ ${p}</button>`).join("")}</div><div class="mut" style="font-size:.8rem;margin-top:6px">${synTxt(x)}. Outline notes only: the full 200–300 word writing comes later.</div></div>
<div class="a"><label class="l a" for="a${i}">Grand Advice: main advice statements (one per line)</label><textarea id="a${i}" data-p="ch.${i}.adv" placeholder="The command or capability that goes with the verdict">${esc(x.adv)}</textarea><div class="wn" id="wn${i}" ${s=="noadv"?"":"hidden"}><b>Incomplete advice.</b> This chapter has a verdict but no Main Advice Statement.</div></div></div>
<details><summary>Subheadings and SAY points (${x.subs.length} subheadings)</summary>${x.subs.map((sb,j)=>`<div class="sub"><div class="row"><div><label class="l n">Subheading</label><input type="text" data-p="ch.${i}.subs.${j}.t" value="${esc(sb.t)}"></div><button class="btn alt sm" data-act="rmsub" data-i="${i}" data-j="${j}">Remove</button></div>
<label class="l n" style="margin-top:8px">Sub-sentence</label><input type="text" data-p="ch.${i}.subs.${j}.s" value="${esc(sb.s)}">
${sb.pts.map((p,q)=>`<div class="pt"><div class="row"><div><label class="l a">SAY point ${q+1} (${p.syn.join("")}): micro-sentence</label><input type="text" data-p="ch.${i}.subs.${j}.pts.${q}.m" value="${esc(p.m)}"></div><button class="btn alt sm" data-act="rmpt" data-i="${i}" data-j="${j}" data-q="${q}">Remove</button></div>
<div class="slots">${p.syn.map((k,z)=>`<div><label class="l">${SL[k]}</label><input type="text" data-p="ch.${i}.subs.${j}.pts.${q}.c.${z}" value="${esc(p.c[z])}" placeholder="Short note"></div>`).join("")}</div></div>`).join("")}
<button class="btn alt sm" data-act="addpt" data-i="${i}" data-j="${j}">Add SAY point</button></div>`).join("")}
<button class="btn alt sm" data-act="addsub" data-i="${i}" style="margin-top:8px">Add subheading</button></details></article>`}
function upd(i){const s=cst(i),r=$("#r"+i);if(r){r.className="ri "+s;r.querySelector(".f").textContent=FL[s];r.querySelector(".t").textContent=S.ch[i].t||"Untitled"}
const a=$("#wn"+i),t=$("#wt"+i);if(a)a.hidden=s!="noadv";if(t)t.hidden=s!="noth";const c=counts();if($("#prog"))$("#prog").textContent=prog(c);if($("#auN"))$("#auN").textContent=c.au}
function vWish(){const pl=PLANS[S.plan],w=wishes(),used=S.revs.length;
return `<p class="mut">The Main Outline Wish is the foundation of your book. Revised wishes record how your intent changed; choose which one the map is built on. SAYBOOK does not generate outlines from the wish: you build the map yourself.</p>`+w.map((x,i)=>`<div class="box wish${i==S.act?" act":""}" style="margin-bottom:12px"><div class="row" style="align-items:center"><b>${i?"Revised wish "+i:"Main Outline Wish"}</b><label style="text-align:right;flex:0 0 auto"><input type="radio" name="act" data-actw="${i}" ${i==S.act?"checked":""}> Use as foundation</label></div><textarea style="margin-top:8px;min-height:70px" aria-label="${i?"Revised wish "+i:"Main Outline Wish"}" data-p="${i?"revs."+(i-1)+".t":"wish"}">${esc(x.t)}</textarea><div class="mut" style="font-size:.8rem">Written ${fmt(x.at)}</div></div>`).join("")+
`<button class="btn" data-act="addrev" ${used>=pl.rw?"disabled":""}>Add revised wish (${used} of ${pl.rw} used)</button>${used>=pl.rw?`<p class="mut" style="margin-top:10px">You have used every revised wish included in the ${pl.n} plan.</p>`:`<p class="mut" style="margin-top:10px">A new revision starts as a copy of your current foundation wish.</p>`}`}
function vChain(){let h=`<p class="mut">The main sentences, in order. If they read as one argument, the chain holds. Judging that is up to you.</p><div class="chain">`;
for(let c=0,i=0;c<3;c++){h+=`<h3><span class="badge ${L[c]}">${L[c]}</span> ${CH[c]}</h3>`;let t=[];for(let k=0;k<S.arc[c];k++,i++){const m=S.ch[i].main.trim();t.push(m?esc(m):`<span class="miss">[Chapter ${i+1}: missing]</span>`)}h+=`<p>${t.join(" ")}</p>`}
return h+`</div><h3>Sub-sentences and micro-sentences</h3><div class="chain">${S.ch.map((c,i)=>c.subs.length?`<p><b>Chapter ${i+1}.</b> ${c.subs.map(s=>esc(s.s)+" "+s.pts.map(p=>esc(p.m)).join(" ")).join(" ")}</p>`:"").join("")||'<p class="mut">Add subheadings and SAY points on the Map tab to see them here.</p>'}</div>`}
function vAudit(){const f=audit();return `<p class="mut">These checks look at structure only: empty fields, plan limits and repeated syntax. They can’t tell you whether an argument is sound.</p>`+(f.length?f.map(x=>`<div class="find"><span class="pill ${x[0]}">${x[0]}</span><div><b>${esc(x[2])}</b><div class="mut">${esc(x[3])}</div></div>${x[1]?`<button class="btn alt sm" style="margin-left:auto" data-act="goto" data-i="${x[1]-1}">Fix in chapter</button>`:""}</div>`).join(""):'<div class="box">No structural gaps found.</div>')+`<h3 style="margin-top:24px">Check by hand</h3><ul><li>Do the main sentences read as one continuous argument?</li><li>Does each chord’s content belong to its ARC stage?</li></ul>`}
function vExport(){const mx=Math.max(...S.arc),w=wishes();let h=`<div class="bar noprint"><button class="btn" data-act="pdf">Download PDF</button><button class="btn alt" data-act="print">Print</button><span class="mut" id="xmsg" role="status">The PDF is a static, print-ready document of your saved map (not a fillable form).</span></div><div class="pd"><h2 style="font-size:1.6rem">${esc(S.title)}</h2>${S.aud||S.theme?`<p>${S.aud?"Audience: "+esc(S.aud)+". ":""}${S.theme?"Theme: "+esc(S.theme)+".":""}</p>`:""}${w.map((x,k)=>`<p><b>${k?"Revised wish "+k:"Main Outline Wish"}${k==S.act?" (foundation)":""}:</b> ${esc(x.t)}</p>`).join("")}<p>${PLANS[S.plan].n} plan · ARC ${S.arc.join("-")} · ${mx}×3 matrix</p>
<h2>Matrix</h2><table class="mx"><tr>${CH.map((n,c)=>`<th>${L[c]}: ${n}</th>`).join("")}</tr>`;
const st=[0,S.arc[0],S.arc[0]+S.arc[1]];for(let r=0;r<mx;r++)h+="<tr>"+[0,1,2].map(c=>r<S.arc[c]?`<td><b>Ch. ${st[c]+r+1}</b> ${esc(S.ch[st[c]+r].t)}</td>`:"<td></td>").join("")+"</tr>";h+="</table>";
let i=0;for(let c=0;c<3;c++){h+=`<h2>Chord ${c+1} (${L[c]}): ${CH[c]}</h2><table><tr><th style="width:26%">Story of Thesis</th><th style="width:16%">Syntax</th><th>Main Advice Statements</th></tr>`;
for(let k=0;k<S.arc[c];k++,i++){const x=S.ch[i];h+=`<tr><td><b>Ch. ${i+1}: ${esc(x.t)}</b><br>${esc(x.main)}</td><td>${synTxt(x)}</td><td>${lines(x.adv).map(a=>"• "+esc(a)).join("<br>")}</td></tr>`}h+="</table>"}
h+="<h2>SAY outline</h2>"+S.ch.map((x,i)=>x.subs.length?`<h3 style="margin-top:12px">Chapter ${i+1}: ${esc(x.t)}</h3>`+x.subs.map(s=>`<p><b>${esc(s.t)}</b> ${esc(s.s)}</p><ul>${s.pts.map(p=>`<li>${esc(p.m)} <i>(${p.syn.join("")})</i>: ${p.syn.map((k,z)=>p.c[z]?SL[k]+": "+esc(p.c[z]):"").filter(Boolean).join("; ")}</li>`).join("")}</ul>`).join(""):"").join("");return h+"</div>"}
/* PDF: minimal writer (Helvetica, WinAnsi) so the export needs no library */
function buildPdf(){const W=595,H=842,M=54,pages=[],pl=PLANS[S.plan];let cur,y;const np=()=>{cur=[];pages.push(cur);y=H-M},
X={"’":146,"‘":145,"“":147,"”":148,"•":149,"–":150,"—":151,"…":133},
enc=s=>[...String(s)].map(ch=>{const c=ch.charCodeAt(0);return X[ch]?String.fromCharCode(X[ch]):(c>=32&&c<127)||(c>=160&&c<256)?ch:c==10||c==9?" ":"?"}).join("").replace(/[\\()]/g,m=>"\\"+m);
function wrap(s,w,sz,b){const max=Math.max(8,Math.floor(w/(sz*(b?.58:.54)))),out=[];for(const para of String(s).split("\n")){let line="";for(let word of para.split(/\s+/).filter(Boolean)){while(word.length>max){if(line){out.push(line);line=""}out.push(word.slice(0,max));word=word.slice(max)}if(line&&(line+" "+word).length>max){out.push(line);line=word}else line=line?line+" "+word:word}out.push(line)}return out}
function T(s,o={}){const sz=o.sz||10,f=o.f||1,ind=o.ind||0;for(const ln of wrap(s,W-2*M-ind,sz,f==2)){if(y-sz<M)np();cur.push(`BT /F${f} ${sz} Tf ${M+ind} ${y-sz} Td (${enc(ln)}) Tj ET`);y-=sz*1.4}y-=o.gap??4}
const start=c=>S.arc.slice(0,c).reduce((a,b)=>a+b,0),mx=Math.max(...S.arc);
np();T(S.title,{f:2,sz:20,gap:6});if(S.aud||S.theme)T((S.aud?"Audience: "+S.aud+". ":"")+(S.theme?"Theme: "+S.theme+".":""),{sz:9,gap:4});
T(`${pl.n} plan - ARC ${S.arc.join("-")} - ${S.ch.length} chapters - ${mx}x3 matrix`,{sz:9,gap:8});
wishes().forEach((x,k)=>{T((k?"Revised wish "+k:"Main Outline Wish")+(k==S.act?" (foundation)":""),{f:2,sz:11,gap:1});T(x.t,{ind:8,gap:7})});
if(y<M+(mx+2)*26+30)np();T("Double Helix Map matrix",{f:2,sz:13,gap:6});
{const cw=(W-2*M)/3,rh=26,top=y;for(let r=0;r<=mx;r++)for(let c=0;c<3;c++){const x=M+c*cw,yy=top-(r+1)*rh;cur.push(`${x} ${yy} ${cw} ${rh} re S`);let s=r==0?`${L[c]}: ${CH[c]}`:r<=S.arc[c]?`${start(c)+r}. ${S.ch[start(c)+r-1].t||"Untitled"}`:"";const mc=Math.floor((cw-8)/(8*.56));if(s.length>mc)s=s.slice(0,mc-1)+"…";if(s)cur.push(`BT /F${r?1:2} 8 Tf ${x+4} ${yy+9} Td (${enc(s)}) Tj ET`)}y=top-(mx+1)*rh-16}
for(let c=0;c<3;c++){if(y<M+110)np();T(`Chord ${c+1} - ${L[c]}: ${CH[c]}`,{f:2,sz:13,gap:6});
for(let k=0;k<S.arc[c];k++){const i=start(c)+k,x=S.ch[i];if(y<M+90)np();T(`Chapter ${i+1}: ${x.t||"Untitled"}`,{f:2,sz:11,gap:2});
T("GRAND NARRATIVE - Story of Thesis",{f:3,sz:8.5,gap:1});T(x.main||"(not written yet)",{ind:8,gap:3});
T("DEVELOPMENT - SAY syntax: "+synTxt(x),{f:3,sz:8.5,gap:1});
x.subs.forEach(sb=>{T(`${sb.t||"Untitled subheading"}${sb.s?": "+sb.s:""}`,{f:2,sz:9.5,ind:8,gap:1});sb.pts.forEach((p,q)=>{T(`${q+1}. ${p.m||"(no micro-sentence)"} [${p.syn.join("")}]`,{sz:9,ind:16,gap:0});p.syn.forEach((kk,z)=>{if(!blank(p.c[z]))T(`${SL[kk]}: ${p.c[z]}`,{sz:8.5,ind:26,gap:0})});y-=3})});
T("GRAND ADVICE - Main Advice Statements",{f:3,sz:8.5,gap:1});const ad=lines(x.adv);if(ad.length)ad.forEach(a=>T("• "+a,{ind:8,gap:1}));else T("(none yet)",{ind:8,gap:1});y-=8}}
pages.forEach((p,i)=>p.push(`BT /F1 8 Tf ${W/2-30} 28 Td (Page ${i+1} of ${pages.length}) Tj ET`));
const o=["<</Type/Catalog/Pages 2 0 R>>",`<</Type/Pages/Count ${pages.length}/Kids[${pages.map((_,i)=>`${6+i*2} 0 R`).join(" ")}]>>`,...["Helvetica","Helvetica-Bold","Helvetica-Oblique"].map(f=>`<</Type/Font/Subtype/Type1/BaseFont/${f}/Encoding/WinAnsiEncoding>>`)];
pages.forEach((p,i)=>{const s=p.join("\n");o.push(`<</Type/Page/Parent 2 0 R/MediaBox[0 0 ${W} ${H}]/Resources<</Font<</F1 3 0 R/F2 4 0 R/F3 5 0 R>>>>/Contents ${7+i*2} 0 R>>`,`<</Length ${s.length}>>\nstream\n${s}\nendstream`)});
let out="%PDF-1.4\n";const offs=[];o.forEach((x,i)=>{offs.push(out.length);out+=`${i+1} 0 obj\n${x}\nendobj\n`});const xr=out.length;
out+=`xref\n0 ${o.length+1}\n0000000000 65535 f \n`+offs.map(v=>String(v).padStart(10,"0")+" 00000 n \n").join("")+`trailer\n<</Size ${o.length+1}/Root 1 0 R>>\nstartxref\n${xr}\n%%EOF`;
return new Blob([Uint8Array.from(out,c=>c.charCodeAt(0))],{type:"application/pdf"})}
async function dl(){const say=t=>{const m=$("#xmsg");if(m)m.textContent=t};let b;try{b=buildPdf()}catch(e){say("Couldn’t build the PDF: "+e.message);return}window.__pdf=b;
const name=(S.title.replace(/[^\w\- ]+/g,"").trim().slice(0,60)||"SAYBOOK")+" - Double Helix Map.pdf";
try{const d=window.claude&&claude.use?await claude.use("downloads"):null;
if(d){await d.save({filename:name,data:b});say("PDF ready.");return}
const u=URL.createObjectURL(b),a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);say("PDF downloaded.")}
catch(e){say(e&&e.code=="declined"?"Download cancelled.":"Couldn’t save the PDF. Use Print and choose Save as PDF.")}}
/* events */
function setP(path,v){const k=path.split(".");let o=S;for(let i=0;i<k.length-1;i++)o=o[k[i]];o[k[k.length-1]]=v}
function go(i){tab="map";if(!$("#c"+i))render();const el=$("#c"+i);el.scrollIntoView();el.querySelector("input").focus()}
$("#app").addEventListener("input",e=>{const p=e.target.dataset.p;if(!p)return;setP(p,e.target.value);const m=p.match(/^ch\.(\d+)\./);if(m)upd(+m[1]);else{const f=$("#fw");if(f)f.textContent=wishes()[S.act].t}save()});
$("#app").addEventListener("change",e=>{const t=e.target;
if(t.dataset.syn){const[i,j,q]=t.dataset.syn.split(".").map(Number);S.ch[i].syn[j][q]=t.value;save();render()}
if(t.dataset.actw!==undefined){S.act=+t.dataset.actw;save();render()}
if(t.dataset.arc!==undefined){const a=S.arc.slice(),c=+t.dataset.arc,tot=TOT(PLANS[S.plan]);a[c]=+t.value;a[2]=tot-a[0]-a[1];if(a[2]<1){t.value=S.arc[c];return}S.arc=a;save();render()}});
$("#app").addEventListener("click",e=>{const t=e.target.closest("button");if(!t)return;
if(t.dataset.tab){tab=t.dataset.tab;render();return}
if(t.dataset.go!==undefined){go(+t.dataset.go);return}
const a=t.dataset.act,i=+t.dataset.i,j=+t.dataset.j,q=+t.dataset.q;if(!a)return;
const keep=()=>{const y=scrollY;save();render();scrollTo(0,y)},opn=()=>{const d=document.querySelectorAll(".ch")[i];if(d)d.querySelector("details").open=true};
if(a=="back"){flush();view="list";render()}
else if(a=="newp"){view="new";draft={};errs={};render()}
else if(a=="open"){S=ST.ps.find(p=>p.id==t.dataset.id);view="work";tab="map";render();scrollTo(0,0)}
else if(a=="del"){const p=ST.ps.find(p=>p.id==t.dataset.id);ask(`Delete “${p.title}”? This cannot be undone.`,()=>{ST.ps=ST.ps.filter(x=>x!=p);save();flush();render()})}
else if(a=="addrev"){if(S.revs.length>=PLANS[S.plan].rw)return;S.revs.push({t:wishes()[S.act].t,at:Date.now()});S.act=S.revs.length;keep()}
else if(a=="addsyn"){S.ch[i].syn.push([...t.dataset.v]);keep()}
else if(a=="rmsyn"){S.ch[i].syn.splice(j,1);keep()}
else if(a=="addsub"){S.ch[i].subs.push({t:"",s:"",pts:[]});keep();opn()}
else if(a=="rmsub")ask("Remove this subheading and all its SAY points?",()=>{S.ch[i].subs.splice(j,1);keep();opn()});
else if(a=="addpt"){const c=S.ch[i],s=c.subs[j];s.pts.push({m:"",syn:[...c.syn[s.pts.length%c.syn.length]],c:["","",""]});keep();opn()}
else if(a=="rmpt")ask("Remove this SAY point?",()=>{S.ch[i].subs[j].pts.splice(q,1);keep();opn()});
else if(a=="goto")go(i);
else if(a=="pdf")dl();
else if(a=="print"){try{print()}catch(x){const m=$("#xmsg");if(m)m.textContent="Printing isn’t available in this view."}}});
function route(){flush();const app=location.hash=="#app";$("#home").style.display=app?"none":"block";$("#app").style.display=app?"block":"none";
if(app){ST=loadStore();S=null;view=intent||!ST.ps.length?"new":"list";intent=0;draft={plan:pend};errs={};render();scrollTo(0,0)}
else if(location.hash&&location.hash!="#home"){const el=document.getElementById(location.hash.slice(1));if(el)el.scrollIntoView()}else scrollTo(0,0)}
addEventListener("hashchange",route);route();
