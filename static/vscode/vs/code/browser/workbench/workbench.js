/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/(function(){var w=["require","exports","vs/css!vs/github1s/notification","vs/github1s/notification","vs/github1s/util","vs/css!vs/code/browser/workbench/workbench","vs/code/browser/workbench/workbench","vs/workbench/workbench.web.api","vs/base/common/uri","vs/base/common/event","vs/base/common/uuid","vs/base/common/cancellation","vs/base/common/buffer","vs/base/common/lifecycle","vs/base/parts/request/browser/request","vs/platform/windows/common/windows","vs/base/common/resources","vs/base/browser/browser","vs/nls!vs/code/browser/workbench/workbench","vs/base/common/network","vs/platform/product/common/product","vs/platform/log/common/log"],U=function(g){for(var r=[],l=0,i=g.length;l<i;l++)r[l]=w[g[l]];return r};define(w[2],U([5]),{}),define(w[3],U([0,1,2]),function(g,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderNotification=void 0;const l="GITHUB1S_NOTIFICATION",i="20210212",O=`${[{title:"ATTENTION: This page is NOT officially provided by GitHub.",content:"GitHub1s is an open source project, which is not officially provided by GitHub.",link:"https://github.com/conwnet/github1s"}].map(c=>`
		<div class="notification-main">
			<div class="notification-title">${c.title}</div>
			<div class="notification-content">
				${c.content}
				${c.link?`<a class="notification-link" href="${c.link}" target="_blank">See more</a>`:""}
			</div>
		</div>`)}
<div class="notification-footer">
	<button class="notification-confirm-button">OK</button>
	<div class="notification-show-me-again">
		<input type="checkbox" checked>Don't show me again</div>
	</div>
</div>
`,S=()=>{if(!(!window.localStorage||window.localStorage.getItem(l)===i)){const c=document.createElement("div");c.classList.add("github1s-notification"),c.innerHTML=O,document.body.appendChild(c),c.querySelector(".notification-confirm-button").onclick=()=>{!!c.querySelector(".notification-show-me-again input").checked&&window.localStorage.setItem(l,i),document.body.removeChild(c)}}};r.renderNotification=S}),define(w[4],U([0,1]),function(g,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.replaceBrowserUrl=r.getBrowserUrl=void 0;const l=()=>window.location.href;r.getBrowserUrl=l;const i=b=>{window.history.replaceState&&window.history.replaceState(null,"",b)};r.replaceBrowserUrl=i}),define(w[6],U([0,1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,4,3]),function(g,r,l,i,b,O,S,c,N,$,u,k,q,R,M,C,D,T,Q){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const H=()=>[{id:"github1s.vscode.get-browser-url",handler:T.getBrowserUrl},{id:"github1s.vscode.replace-browser-url",handler:T.replaceBrowserUrl}];function A(E,t){let e;if(t){let o=0;t.forEach((n,f)=>{e||(e=""),e+=`${o++==0?"":"&"}${f}=${encodeURIComponent(n)}`})}return i.URI.parse(window.location.href).with({path:E,query:e})}class p{constructor(){let t;const e=document.getElementById("vscode-workbench-auth-session"),o=e?e.getAttribute("data-settings"):void 0;if(o)try{t=JSON.parse(o)}catch(n){}t&&(this.setPassword(`${C.default.urlProtocol}.login`,"account",JSON.stringify(t)),this.authService=`${C.default.urlProtocol}-${t.providerId}.login`,this.setPassword(this.authService,"account",JSON.stringify(t.scopes.map(n=>({id:t.id,scopes:n,accessToken:t.accessToken})))))}get credentials(){if(!this._credentials){try{const t=window.localStorage.getItem(p.CREDENTIALS_OPENED_KEY);t&&(this._credentials=JSON.parse(t))}catch(t){}Array.isArray(this._credentials)||(this._credentials=[])}return this._credentials}save(){window.localStorage.setItem(p.CREDENTIALS_OPENED_KEY,JSON.stringify(this.credentials))}async getPassword(t,e){return this.doGetPassword(t,e)}async doGetPassword(t,e){for(const o of this.credentials)if(o.service===t&&(typeof e!="string"||e===o.account))return o.password;return null}async setPassword(t,e,o){this.doDeletePassword(t,e),this.credentials.push({service:t,account:e,password:o}),this.save();try{if(o&&t===this.authService){const n=JSON.parse(o);Array.isArray(n)&&n.length===0&&await this.logout(t)}}catch(n){console.log(n)}}async deletePassword(t,e){const o=await this.doDeletePassword(t,e);if(o&&t===this.authService)try{await this.logout(t)}catch(n){console.log(n)}return o}async doDeletePassword(t,e){let o=!1;return this._credentials=this.credentials.filter(n=>n.service===t&&n.account===e?(o=!0,!1):!0),o&&this.save(),o}async findPassword(t){return this.doGetPassword(t)}async findCredentials(t){return this.credentials.filter(e=>e.service===t).map(({account:e,password:o})=>({account:e,password:o}))}async logout(t){const e=new Map;e.set("logout",String(!0)),e.set("service",t),await(0,$.request)({url:A("/auth/logout",e).toString(!0)},S.CancellationToken.None)}}p.CREDENTIALS_OPENED_KEY="credentials.provider";class s extends N.Disposable{constructor(){super(...arguments);this._onCallback=this._register(new b.Emitter),this.onCallback=this._onCallback.event}create(t){const e=new Map,o=(0,O.generateUuid)();e.set(s.QUERY_KEYS.REQUEST_ID,o);const{scheme:n,authority:f,path:h,query:I,fragment:v}=t||{scheme:void 0,authority:void 0,path:void 0,query:void 0,fragment:void 0};return n&&e.set(s.QUERY_KEYS.SCHEME,n),f&&e.set(s.QUERY_KEYS.AUTHORITY,f),h&&e.set(s.QUERY_KEYS.PATH,h),I&&e.set(s.QUERY_KEYS.QUERY,I),v&&e.set(s.QUERY_KEYS.FRAGMENT,v),this.periodicFetchCallback(o,Date.now()),A("/callback",e)}async periodicFetchCallback(t,e){const o=new Map;o.set(s.QUERY_KEYS.REQUEST_ID,t);const n=await(0,$.request)({url:A("/fetch-callback",o).toString(!0)},S.CancellationToken.None),f=await(0,c.streamToBuffer)(n.stream);if(f.byteLength>0){try{this._onCallback.fire(i.URI.revive(JSON.parse(f.toString())))}catch(h){console.error(h)}return}Date.now()-e<s.FETCH_TIMEOUT&&setTimeout(()=>this.periodicFetchCallback(t,e),s.FETCH_INTERVAL)}}s.FETCH_INTERVAL=500,s.FETCH_TIMEOUT=5*60*1e3,s.QUERY_KEYS={REQUEST_ID:"vscode-requestId",SCHEME:"vscode-scheme",AUTHORITY:"vscode-authority",PATH:"vscode-path",QUERY:"vscode-query",FRAGMENT:"vscode-fragment"};class a{constructor(t,e){this.workspace=t,this.payload=e,this.trusted=!0}async open(t,e){if(!((e==null?void 0:e.reuse)&&!e.payload&&this.isSame(this.workspace,t))){const o=this.createTargetUrl(t,e);o&&((e==null?void 0:e.reuse)?window.location.href=o:q.isStandalone?window.open(o,"_blank","toolbar=no"):window.open(o))}}createTargetUrl(t,e){let o;return t?(0,u.isFolderToOpen)(t)?o=`${document.location.origin}${document.location.pathname}?${a.QUERY_PARAM_FOLDER}=${encodeURIComponent(t.folderUri.toString())}`:(0,u.isWorkspaceToOpen)(t)&&(o=`${document.location.origin}${document.location.pathname}?${a.QUERY_PARAM_WORKSPACE}=${encodeURIComponent(t.workspaceUri.toString())}`):o=`${document.location.origin}${document.location.pathname}?${a.QUERY_PARAM_EMPTY_WINDOW}=true`,(e==null?void 0:e.payload)&&(o+=`&${a.QUERY_PARAM_PAYLOAD}=${encodeURIComponent(JSON.stringify(e.payload))}`),o}isSame(t,e){return!t||!e?t===e:(0,u.isFolderToOpen)(t)&&(0,u.isFolderToOpen)(e)?(0,k.isEqual)(t.folderUri,e.folderUri):(0,u.isWorkspaceToOpen)(t)&&(0,u.isWorkspaceToOpen)(e)?(0,k.isEqual)(t.workspaceUri,e.workspaceUri):!1}hasRemote(){if(this.workspace){if((0,u.isFolderToOpen)(this.workspace))return this.workspace.folderUri.scheme===M.Schemas.vscodeRemote;if((0,u.isWorkspaceToOpen)(this.workspace))return this.workspace.workspaceUri.scheme===M.Schemas.vscodeRemote}return!0}}a.QUERY_PARAM_EMPTY_WINDOW="ew",a.QUERY_PARAM_FOLDER="folder",a.QUERY_PARAM_WORKSPACE="workspace",a.QUERY_PARAM_PAYLOAD="payload";class F{constructor(t){this.onDidChange=b.Event.None;let e,o;if(t){let n;(0,u.isFolderToOpen)(t)?n=t.folderUri:(0,u.isWorkspaceToOpen)(t)&&(n=t.workspaceUri),(n==null?void 0:n.scheme)==="github1s"&&([e="conwnet",o="github1s"]=i.URI.parse((0,T.getBrowserUrl)()).path.split("/").filter(Boolean))}o&&e?(this.label=(0,R.localize)(0,null,e,o),this.tooltip=(0,R.localize)(1,null,e,o)):(this.label=(0,R.localize)(2,null),this.tooltip=(0,R.localize)(3,null))}}(function(){const E=document.getElementById("vscode-workbench-web-configuration"),t=E?E.getAttribute("data-settings"):void 0;if(!E||!t)throw new Error("Missing web configuration element");const e=JSON.parse(t);Array.isArray(e.staticExtensions)&&e.staticExtensions.forEach(d=>{d.extensionLocation=i.URI.revive(d.extensionLocation)});let o=!1,n,f=Object.create(null),h;new URL(document.location.href).searchParams.forEach((d,m)=>{switch(m){case a.QUERY_PARAM_FOLDER:n={folderUri:i.URI.parse(d)},o=!0;break;case a.QUERY_PARAM_WORKSPACE:n={workspaceUri:i.URI.parse(d)},o=!0;break;case a.QUERY_PARAM_EMPTY_WINDOW:n=void 0,o=!0;break;case a.QUERY_PARAM_PAYLOAD:try{f=JSON.parse(d)}catch(_){console.error(_)}break;case"logLevel":h=d;break}}),o||(e.folderUri?n={folderUri:i.URI.revive(e.folderUri)}:e.workspaceUri?n={workspaceUri:i.URI.revive(e.workspaceUri)}:n=void 0);const v=new a(n,f);let P;v.hasRemote()||(P=new F(n));const K=d=>{let m=`quality=${d}`;new URL(document.location.href).searchParams.forEach((Y,y)=>{y!=="quality"&&(m+=`&${y}=${Y}`)}),window.location.href=`${window.location.origin}?${m}`},L=e.settingsSyncOptions?{enabled:e.settingsSyncOptions.enabled,enablementHandler:d=>{let m=`settingsSync=${d?"true":"false"}`;new URL(document.location.href).searchParams.forEach((Y,y)=>{y!=="settingsSync"&&(m+=`&${y}=${Y}`)}),window.location.href=`${window.location.origin}?${m}`}}:void 0;(0,l.create)(document.body,Object.assign(Object.assign({},e),{commands:H(),logLevel:h?(0,D.parseLogLevel)(h):void 0,settingsSyncOptions:L,windowIndicator:P,productQualityChangeHandler:K,workspaceProvider:v,urlCallbackProvider:new s,credentialsProvider:new p})),setTimeout(()=>(0,Q.renderNotification)(),1e3)})()})}).call(this);

//# sourceMappingURL=workbench.js.map
