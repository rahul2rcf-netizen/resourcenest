const R=[
["Web development","MDN Web Docs","The reference for HTML, CSS, and JavaScript.","https://developer.mozilla.org/"],
["Web development","freeCodeCamp","Free, project-based courses from basics to full stack.","https://www.freecodecamp.org/"],
["Web development","The Odin Project","A full web development curriculum you follow for free.","https://www.theodinproject.com/"],
["Web development","React documentation","Learn React with the official guide and examples.","https://react.dev/"],
["Programming","CS50 from Harvard","An introduction to computer science and programming.","https://cs50.harvard.edu/x/"],
["Programming","Spring Guides","Short, hands-on guides for building with Spring Boot.","https://spring.io/guides"],
["Programming","Java tutorials by Oracle","Official lessons covering the Java language.","https://docs.oracle.com/javase/tutorial/"],
["Programming","LeetCode","Practice data-structure and algorithm problems.","https://leetcode.com/"],
["AI tools","Hugging Face Learn","Courses on machine learning, NLP, and working with models.","https://huggingface.co/learn"],
["AI tools","Kaggle Learn","Short practical lessons on Python, pandas, and ML.","https://www.kaggle.com/learn"],
["AI tools","Google Machine Learning Crash Course","A fast, practical intro to machine learning.","https://developers.google.com/machine-learning/crash-course"],
["Roadmaps","roadmap.sh","Visual roadmaps for frontend, backend, DevOps, and more.","https://roadmap.sh/"],
["Career","GitHub Docs","Learn Git and GitHub to publish and share your projects.","https://docs.github.com/"],
["Career","Resume guidance on Harvard's career site","Clear advice on structure and wording for resumes.","https://ocs.fas.harvard.edu/resumes-cover-letters"],
["Career","Pramp and interview practice","Search for peer mock-interview platforms to practice live.","https://www.pramp.com/"]
];
const cats=["All",...new Set(R.map(r=>r[0]))];
let cat="All";
const $=s=>document.querySelector(s);
const esc=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function card(r){return `<a class="card" href="${r[3]}" target="_blank" rel="noopener noreferrer"><span class="tag">${esc(r[0])}</span><h3>${esc(r[1])}</h3><p>${esc(r[2])}</p><span class="go">Open resource</span></a>`}
function render(){
  const q=$("#q").value.trim().toLowerCase();
  const list=R.filter(r=>(cat==="All"||r[0]===cat)&&(!q||(r[1]+r[2]+r[0]).toLowerCase().includes(q)));
  $("#grid").innerHTML=list.length?list.map(card).join(""):`<div class="empty" style="grid-column:1/-1">No resources match “${esc(q)}”. Try a shorter word or choose All.</div>`;
  $("#count").textContent=`${list.length} resource${list.length===1?"":"s"} shown`;
}
$("#cats").innerHTML=cats.map(c=>`<button type="button" class="chip" aria-pressed="${c==="All"}" data-c="${c}">${c}</button>`).join("");
$("#cats").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.c;document.querySelectorAll("#cats .chip").forEach(x=>x.setAttribute("aria-pressed",x===b));render()});
$("#q").addEventListener("input",render);render();
$("#docgrid").innerHTML=R.filter(r=>["MDN Web Docs","React documentation","Spring Guides","Java tutorials by Oracle","GitHub Docs","Hugging Face Learn"].includes(r[1])).map(card).join("");

const goals={
"Learn web development":["Start with MDN's HTML and CSS basics","Then follow the Web development roadmap below.","https://developer.mozilla.org/en-US/docs/Learn_web_development"],
"Get into AI":["Try Kaggle Learn's Python course first","Then move to the AI and ML roadmap below.","https://www.kaggle.com/learn"],
"Prepare for interviews":["Practice a few problems on LeetCode each week","Read the Career prep checklist on this page.","https://leetcode.com/"],
"Build my resume":["Use the resume checklist below","Add a link to your projects on GitHub.","#career"]};
$("#goals").innerHTML=Object.keys(goals).map(g=>`<button type="button" class="chip" aria-pressed="false" data-g="${g}">${g}</button>`).join("");
$("#goals").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
  document.querySelectorAll("#goals .chip").forEach(x=>x.setAttribute("aria-pressed",x===b));
  const g=goals[b.dataset.g];$("#goal-result").innerHTML=`<strong>${esc(g[0])}</strong><p style="margin:0;font-size:14px">${esc(g[1])} <a href="${g[2]}"${g[2][0]==="#"?"":' target="_blank" rel="noopener noreferrer"'}>Open the link</a></p>`});

const maps={
"Web development":[["Learn HTML and CSS","Build a few static pages and make them responsive."],["Learn JavaScript","Cover the language, the DOM, and fetching data."],["Learn React","Components, state, and routing."],["Learn a backend","Build REST APIs with Node or Spring Boot."],["Ship a full stack project","Add a database, deploy it, and write a README."]],
"Java full stack":[["Core Java","Collections, OOP, and exceptions."],["SQL and databases","Joins, indexes, and designing tables."],["Spring Boot and Hibernate","Build REST APIs backed by a database."],["React front end","Connect a UI to your API."],["Deploy and document","Host the project and explain your design choices."]],
"AI and ML":[["Python basics","Syntax, functions, and working with files."],["Data with pandas","Clean and explore real datasets."],["Machine learning basics","Train and evaluate simple models."],["Work with pretrained models","Use a model hub and an API in a small app."],["Build and share a project","Publish a demo and explain what it does."]]};
let cur=Object.keys(maps)[0];
const store={get(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
$("#tabs").innerHTML=Object.keys(maps).map(m=>`<button type="button" role="tab" class="chip" aria-selected="${m===cur}" data-m="${m}">${m}</button>`).join("");
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cur=b.dataset.m;document.querySelectorAll("#tabs .chip").forEach(x=>x.setAttribute("aria-selected",x===b));steps()});
function steps(){
  const done=store.get("rn:"+cur);
  $("#steps").innerHTML=maps[cur].map((s,i)=>`<li class="${done.includes(i)?"done":""}"><label><input type="checkbox" data-i="${i}" ${done.includes(i)?"checked":""}><span><span class="t">${esc(s[0])}</span><span class="d">${esc(s[1])}</span></span></label></li>`).join("");
  const p=Math.round(done.length/maps[cur].length*100);
  $("#pbar b").style.width=p+"%";$("#pbar").setAttribute("aria-valuenow",p);
  $("#ptext").textContent=`${done.length} of ${maps[cur].length} steps complete`;
}
$("#steps").addEventListener("change",e=>{const i=+e.target.dataset.i;let d=store.get("rn:"+cur);d=e.target.checked?[...new Set([...d,i])]:d.filter(x=>x!==i);store.set("rn:"+cur,d);steps()});
steps();

const status=[["Resource browser with search and filters","built"],["Beginner-to-advanced roadmaps with progress tracking","built"],["Career prep checklists","built"],["User accounts and saved resources","plan"],["Community-submitted resources","plan"],["AI assistant that recommends a learning path","plan"],["Working newsletter signup","plan"]];
$("#statuslist").innerHTML=status.map(s=>`<div class="row-s"><span>${s[0]}</span><span class="stat ${s[1]}">${s[1]==="built"?"Built":"Planned"}</span></div>`).join("");

$("#news").addEventListener("submit",e=>{e.preventDefault();const v=$("#em").value.trim(),er=$("#em-err");
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){er.style.color="#fca5a5";er.textContent="Enter a valid email address, for example name@example.com.";$("#em").focus();return}
  er.style.color="#93c5fd";er.textContent="Thanks. This demo form does not store emails yet.";$("#em").value=""});

