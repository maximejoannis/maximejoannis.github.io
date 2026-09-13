"use strict";
(function(){const style=document.createElement("style");style.textContent=".api-state.cached{border-color:rgba(245,158,11,.42);color:#fcd38d}.history-message.cached{color:#f5c66f}";document.head.append(style)})();
(function(){
  const CACHE_NAME="qualityops-github-v1",META_PREFIX="qualityops-github-meta:";let snapshotPromise;
  function readMeta(url){try{return JSON.parse(localStorage.getItem(META_PREFIX+url))}catch{return null}}
  function writeMeta(url,updatedAt){try{localStorage.setItem(META_PREFIX+url,JSON.stringify({updatedAt}))}catch{}}
  async function readSnapshot(){if(!snapshotPromise)snapshotPromise=fetch("./data/github-snapshot.json",{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject()).catch(()=>({generatedAt:null,entries:{}}));return snapshotPromise}
  async function parseResponse(response,type){return type==="text"?response.text():response.json()}
  async function readBrowserCache(url,type){if(!("caches" in window))return null;const response=await caches.open(CACHE_NAME).then(cache=>cache.match(url));if(!response)return null;return{data:await parseResponse(response,type),updatedAt:readMeta(url)?.updatedAt||null,source:"browser-cache"}}
  async function request(url,type){
    try{const response=await fetch(url,{cache:"no-store",headers:{Accept:type==="json"?"application/vnd.github+json":"text/plain"}});if(!response.ok)throw new Error(`GitHub ${response.status}`);const updatedAt=new Date().toISOString();if("caches" in window){const cache=await caches.open(CACHE_NAME);await cache.put(url,response.clone());writeMeta(url,updatedAt)}return{data:await parseResponse(response,type),updatedAt,source:"live"}}
    catch(liveError){const[browser,snapshot]=await Promise.all([readBrowserCache(url,type),readSnapshot()]),stored=snapshot.entries?.[url],staticEntry=stored?{data:stored.data,updatedAt:stored.updatedAt||snapshot.generatedAt,source:"static-snapshot"}:null,fallback=!browser?staticEntry:!staticEntry?browser:new Date(browser.updatedAt||0)>=new Date(staticEntry.updatedAt||0)?browser:staticEntry;if(!fallback)throw liveError;return fallback}
  }
  function sourceLabel(result,prefix="Dernières données connues"){if(result.source==="live")return"Données GitHub actualisées";const date=result.updatedAt?new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium",timeStyle:"short"}).format(new Date(result.updatedAt)):"date inconnue";return`${prefix} · ${date}`}
  window.githubDataCache={getJSON:url=>request(url,"json"),getText:url=>request(url,"text"),json:async url=>(await request(url,"json")).data,text:async url=>(await request(url,"text")).data,sourceLabel};
})();
