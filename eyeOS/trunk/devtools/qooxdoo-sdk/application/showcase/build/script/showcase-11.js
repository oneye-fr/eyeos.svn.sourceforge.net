qx.$$packageData['9506b3a80828']={"locales":{},"resources":{"qx/static/blank.gif":[1,1,"gif","qx"]},"translations":{}};

qx.Part.$$notifyLoad("9506b3a80828", function() {
(function(){var o="failed",n="sending",m="completed",k="receiving",j="aborted",h="timeout",g="qx.event.type.Event",f="Connection dropped",d="qx.io.remote.Response",c="=",bp="configured",bo="&",bn="Unknown status code. ",bm="qx.io.remote.transport.XmlHttp",bl="qx.io.remote.transport.Abstract",bk="Request-URL too large",bj="MSHTML-specific HTTP status code",bi="Not available",bh="Precondition failed",bg="Server error",v="Moved temporarily",w="qx.io.remote.Exchange",t="Possibly due to a cross-domain request?",u="Bad gateway",r="Gone",s="See other",p="Partial content",q="Server timeout",B="qx.io.remote.transport.Script",C="HTTP version not supported",L="Unauthorized",I="Possibly due to application URL using 'file:' protocol?",T="Multiple choices",O="Payment required",bc="Not implemented",Y="Proxy authentication required",E="Length required",bf="_applyState",be="changeState",bd="Not modified",D="qx.io.remote.Request",G="Connection closed by server",H="Moved permanently",K="_applyImplementation",M="",P="Method not allowed",V="Forbidden",bb="Use proxy",x="Ok",y="Conflict",F="Not found",S="Not acceptable",R="Request time-out",Q="Bad request",X="No content",W="file:",N="qx.io.remote.transport.Iframe",U="Request entity too large",a="Unknown status code",ba="Unsupported media type",z="Gateway time-out",A="created",J="Out of resources",b="undefined";
qx.Class.define(w,{extend:qx.core.Object,construct:function(bq){qx.core.Object.call(this);
this.setRequest(bq);
bq.setTransport(this);
},events:{"sending":g,"receiving":g,"completed":d,"aborted":g,"failed":d,"timeout":d},statics:{typesOrder:[bm,N,B],typesReady:false,typesAvailable:{},typesSupported:{},registerType:function(br,bs){qx.io.remote.Exchange.typesAvailable[bs]=br;
},initTypes:function(){if(qx.io.remote.Exchange.typesReady){return;
}
for(var bu in qx.io.remote.Exchange.typesAvailable){var bt=qx.io.remote.Exchange.typesAvailable[bu];

if(bt.isSupported()){qx.io.remote.Exchange.typesSupported[bu]=bt;
}}qx.io.remote.Exchange.typesReady=true;

if(qx.lang.Object.isEmpty(qx.io.remote.Exchange.typesSupported)){throw new Error("No supported transport types were found!");
}},canHandle:function(bv,bw,bx){if(!qx.lang.Array.contains(bv.handles.responseTypes,bx)){return false;
}
for(var by in bw){if(!bv.handles[by]){return false;
}}return true;
},_nativeMap:{0:A,1:bp,2:n,3:k,4:m},wasSuccessful:function(bz,bA,bB){if(bB){switch(bz){case null:case 0:return true;
case -1:return bA<4;
default:return typeof bz===b;
}}else{switch(bz){case -1:{};
return bA<4;
case 200:case 304:return true;
case 201:case 202:case 203:case 204:case 205:return true;
case 206:{};
return bA!==4;
case 300:case 301:case 302:case 303:case 305:case 400:case 401:case 402:case 403:case 404:case 405:case 406:case 407:case 408:case 409:case 410:case 411:case 412:case 413:case 414:case 415:case 500:case 501:case 502:case 503:case 504:case 505:{};
return false;
case 12002:case 12007:case 12029:case 12030:case 12031:case 12152:case 13030:{};
return false;
default:if(bz>206&&bz<300){return true;
}qx.log.Logger.debug(this,"Unknown status code: "+bz+" ("+bA+")");
return false;
}}},statusCodeToString:function(bC){switch(bC){case -1:return bi;
case 0:var bD=window.location.href;
if(qx.lang.String.startsWith(bD.toLowerCase(),W)){return (bn+I);
}else{return (bn+t);
}break;
case 200:return x;
case 304:return bd;
case 206:return p;
case 204:return X;
case 300:return T;
case 301:return H;
case 302:return v;
case 303:return s;
case 305:return bb;
case 400:return Q;
case 401:return L;
case 402:return O;
case 403:return V;
case 404:return F;
case 405:return P;
case 406:return S;
case 407:return Y;
case 408:return R;
case 409:return y;
case 410:return r;
case 411:return E;
case 412:return bh;
case 413:return U;
case 414:return bk;
case 415:return ba;
case 500:return bg;
case 501:return bc;
case 502:return u;
case 503:return J;
case 504:return z;
case 505:return C;
case 12002:return q;
case 12029:return f;
case 12030:return f;
case 12031:return f;
case 12152:return G;
case 13030:return bj;
default:return a;
}}},properties:{request:{check:D,nullable:true},implementation:{check:bl,nullable:true,apply:K},state:{check:[bp,n,k,m,j,h,o],init:bp,event:be,apply:bf}},members:{send:function(){var bH=this.getRequest();

if(!bH){return this.error("Please attach a request object first");
}qx.io.remote.Exchange.initTypes();
var bF=qx.io.remote.Exchange.typesOrder;
var bE=qx.io.remote.Exchange.typesSupported;
var bJ=bH.getResponseType();
var bK={};

if(bH.getAsynchronous()){bK.asynchronous=true;
}else{bK.synchronous=true;
}
if(bH.getCrossDomain()){bK.crossDomain=true;
}
if(bH.getFileUpload()){bK.fileUpload=true;
}for(var bI in bH.getFormFields()){bK.programaticFormFields=true;
break;
}var bL,bG;

for(var i=0,l=bF.length;i<l;i++){bL=bE[bF[i]];

if(bL){if(!qx.io.remote.Exchange.canHandle(bL,bK,bJ)){continue;
}
try{{};
bG=new bL;
this.setImplementation(bG);
bG.setUseBasicHttpAuth(bH.getUseBasicHttpAuth());
bG.send();
return true;
}catch(bM){this.error("Request handler throws error");
this.error(bM);
return;
}}}this.error("There is no transport implementation available to handle this request: "+bH);
},abort:function(){var bN=this.getImplementation();

if(bN){{};
bN.abort();
}else{{};
this.setState(j);
}},timeout:function(){var bQ=this.getImplementation();

if(bQ){var bP=M;

for(var bO in bQ.getParameters()){bP+=bo+bO+c+bQ.getParameters()[bO];
}this.warn("Timeout: implementation "+bQ.toHashCode()+", "+bQ.getUrl()+" ["+bQ.getMethod()+"], "+bP);
bQ.timeout();
}else{this.warn("Timeout: forcing state to timeout");
this.setState(h);
}this.__rx();
},__rx:function(){var bR=this.getRequest();

if(bR){bR.setTimeout(0);
}},_onsending:function(e){this.setState(n);
},_onreceiving:function(e){this.setState(k);
},_oncompleted:function(e){this.setState(m);
},_onabort:function(e){this.setState(j);
},_onfailed:function(e){this.setState(o);
},_ontimeout:function(e){this.setState(h);
},_applyImplementation:function(bS,bT){if(bT){bT.removeListener(n,this._onsending,this);
bT.removeListener(k,this._onreceiving,this);
bT.removeListener(m,this._oncompleted,this);
bT.removeListener(j,this._onabort,this);
bT.removeListener(h,this._ontimeout,this);
bT.removeListener(o,this._onfailed,this);
}
if(bS){var bV=this.getRequest();
bS.setUrl(bV.getUrl());
bS.setMethod(bV.getMethod());
bS.setAsynchronous(bV.getAsynchronous());
bS.setUsername(bV.getUsername());
bS.setPassword(bV.getPassword());
bS.setParameters(bV.getParameters(false));
bS.setFormFields(bV.getFormFields());
bS.setRequestHeaders(bV.getRequestHeaders());
if(bS instanceof qx.io.remote.transport.XmlHttp){bS.setParseJson(bV.getParseJson());
}var bY=bV.getData();

if(bY===null){var ca=bV.getParameters(true);
var bX=[];

for(var bU in ca){var bW=ca[bU];

if(bW instanceof Array){for(var i=0;i<bW.length;i++){bX.push(encodeURIComponent(bU)+c+encodeURIComponent(bW[i]));
}}else{bX.push(encodeURIComponent(bU)+c+encodeURIComponent(bW));
}}
if(bX.length>0){bS.setData(bX.join(bo));
}}else{bS.setData(bY);
}bS.setResponseType(bV.getResponseType());
bS.addListener(n,this._onsending,this);
bS.addListener(k,this._onreceiving,this);
bS.addListener(m,this._oncompleted,this);
bS.addListener(j,this._onabort,this);
bS.addListener(h,this._ontimeout,this);
bS.addListener(o,this._onfailed,this);
}},_applyState:function(cb,cc){{};

switch(cb){case n:this.fireEvent(n);
break;
case k:this.fireEvent(k);
break;
case m:case j:case h:case o:var ce=this.getImplementation();

if(!ce){break;
}this.__rx();

if(this.hasListener(cb)){var cf=qx.event.Registration.createEvent(cb,qx.io.remote.Response);

if(cb==m){var cd=ce.getResponseContent();
cf.setContent(cd);
if(cd===null){{};
cb=o;
}}else if(cb==o){cf.setContent(ce.getResponseContent());
}cf.setStatusCode(ce.getStatusCode());
cf.setResponseHeaders(ce.getResponseHeaders());
this.dispatchEvent(cf);
}this.setImplementation(null);
ce.dispose();
break;
}}},settings:{"qx.ioRemoteDebug":false,"qx.ioRemoteDebugData":false},destruct:function(){var cg=this.getImplementation();

if(cg){this.setImplementation(null);
cg.dispose();
}this.setRequest(null);
}});
})();
(function(){var q="qx.event.type.Event",p="String",o="failed",n="timeout",m="created",l="aborted",k="sending",j="configured",i="receiving",h="completed",c="Object",g="Boolean",f="abstract",b="_applyState",a="GET",e="changeState",d="qx.io.remote.transport.Abstract";
qx.Class.define(d,{type:f,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.setRequestHeaders({});
this.setParameters({});
this.setFormFields({});
},events:{"created":q,"configured":q,"sending":q,"receiving":q,"completed":q,"aborted":q,"failed":q,"timeout":q},properties:{url:{check:p,nullable:true},method:{check:p,nullable:true,init:a},asynchronous:{check:g,nullable:true,init:true},data:{check:p,nullable:true},username:{check:p,nullable:true},password:{check:p,nullable:true},state:{check:[m,j,k,i,h,l,n,o],init:m,event:e,apply:b},requestHeaders:{check:c,nullable:true},parameters:{check:c,nullable:true},formFields:{check:c,nullable:true},responseType:{check:p,nullable:true},useBasicHttpAuth:{check:g,nullable:true}},members:{send:function(){throw new Error("send is abstract");
},abort:function(){{};
this.setState(l);
},timeout:function(){{};
this.setState(n);
},failed:function(){{};
this.setState(o);
},setRequestHeader:function(r,s){throw new Error("setRequestHeader is abstract");
},getResponseHeader:function(t){throw new Error("getResponseHeader is abstract");
},getResponseHeaders:function(){throw new Error("getResponseHeaders is abstract");
},getStatusCode:function(){throw new Error("getStatusCode is abstract");
},getStatusText:function(){throw new Error("getStatusText is abstract");
},getResponseText:function(){throw new Error("getResponseText is abstract");
},getResponseXml:function(){throw new Error("getResponseXml is abstract");
},getFetchedLength:function(){throw new Error("getFetchedLength is abstract");
},_applyState:function(u,v){{};

switch(u){case m:this.fireEvent(m);
break;
case j:this.fireEvent(j);
break;
case k:this.fireEvent(k);
break;
case i:this.fireEvent(i);
break;
case h:this.fireEvent(h);
break;
case l:this.fireEvent(l);
break;
case o:this.fireEvent(o);
break;
case n:this.fireEvent(n);
break;
}return true;
}},destruct:function(){this.setRequestHeaders(null);
this.setParameters(null);
this.setFormFields(null);
}});
})();
(function(){var b=".",a="qx.bom.client.Transport";
qx.Class.define(a,{statics:{getMaxConcurrentRequestCount:function(){var h;
var c=qx.bom.client.Engine;
var g=c.FULLVERSION.split(b);
var e=0;
var d=0;
var f=0;
if(g[0]){e=g[0];
}if(g[1]){d=g[1];
}if(g[2]){f=g[2];
}if(window.maxConnectionsPerServer){h=window.maxConnectionsPerServer;
}else if(c.OPERA){h=8;
}else if(c.WEBKIT){h=4;
}else if(c.GECKO&&((e>1)||((e==1)&&(d>9))||((e==1)&&(d==9)&&(f>=1)))){h=6;
}else{h=2;
}return h;
}}});
})();
(function(){var t="configured",s="completed",r="changeState",q="changeModel",p="qx.data.store.Json",o="GET",n="_marshaler",m="sending",l="application/json",k="changeUrl",d="__nX",j="failed",g="loaded",c="timeout",b="queued",f="String",e="aborted",h="_applyUrl",a="receiving",i="qx.event.type.Data";
qx.Class.define(p,{extend:qx.core.Object,construct:function(u,v){qx.core.Object.call(this);
this._marshaler=new qx.data.marshal.Json(v);
this._delegate=v;

if(u!=null){this.setUrl(u);
}},events:{"loaded":i},properties:{model:{nullable:true,event:q},state:{check:[t,b,m,a,s,e,c,j],init:t,event:r},url:{check:f,apply:h,event:k,nullable:true}},members:{__nX:null,_delegate:null,_applyUrl:function(w,x){if(w!=null){this._createRequest(w);
}},_createRequest:function(y){this.__nX=new qx.io.remote.Request(y,o,l);
this.__nX.addListener(s,this.__nY,this);
var z=this._delegate;

if(z&&qx.lang.Type.isFunction(z.configureRequest)){this._delegate.configureRequest(this.__nX);
}this.__nX.addListener(r,function(A){this.setState(A.getData());
},this);
this.__nX.send();
},__nY:function(B){var D=B.getContent();
var C=this._delegate;

if(C&&qx.lang.Type.isFunction(C.manipulateData)){D=this._delegate.manipulateData(D);
}this._marshaler.toClass(D,true);
var E=this.getModel();
this.setModel(this._marshaler.toModel(D));
if(E&&E.dispose){E.dispose();
}this.fireDataEvent(g,this.getModel());
},reload:function(){var F=this.getUrl();

if(F!=null){this._createRequest(F);
}}},destruct:function(){this._disposeObjects(n,d);
this._delegate=null;
}});
})();
(function(){var i="?",h="&",g="loaded",f='qx.data.store.Jsonp[',e='].callback',d="failed",c="=",b="qx.data.store.Jsonp",a="String";
qx.Class.define(b,{extend:qx.data.store.Json,construct:function(j,k,l){if(l!=undefined){this.setCallbackParam(l);
}qx.data.store.Json.call(this,j,k);
},properties:{callbackParam:{check:a,nullable:false}},members:{__oc:null,_createRequest:function(m){if(this.__oc){this.__oc.dispose();
}this.__oc=new qx.io.ScriptLoader();
var o=this._delegate;

if(o&&qx.lang.Type.isFunction(o.configureRequest)){this._delegate.configureRequest(this.__oc);
}var n=m.indexOf(i)==-1?i:h;
m+=n+this.getCallbackParam()+c;
var p=parseInt(this.toHashCode(),10);
qx.data.store.Jsonp[p]=this;
m+=f+p+e;
this.__oc.load(m,function(q){delete this[p];
},this);
},callback:function(r){if(this.isDisposed()){return;
}this.__od(r);
},__od:function(s){if(s==undefined){this.setState(d);
return;
}var t=this._delegate;

if(t&&qx.lang.Type.isFunction(t.manipulateData)){s=this._delegate.manipulateData(s);
}this._marshaler.toClass(s);
this.setModel(this._marshaler.toModel(s));
this.fireDataEvent(g,this.getModel());
}},destruct:function(){if(this.__oc){this.__oc.dispose();
}this.__oc=null;
}});
})();
(function(){var l="=",k="",j="&",h="application/xml",g="application/json",f="text/html",d="qx.client",c="textarea",b="_data_",a="load",G="text/plain",F="text/javascript",E="completed",D="readystatechange",C="?",B="qx.io.remote.transport.Iframe",A="none",z="display",y="gecko",x="frame_",s="aborted",t="pre",q="javascript:void(0)",r="sending",o="form",p="failed",m="mshtml",n="form_",u="opera",v="timeout",w="qx/static/blank.gif";
qx.Class.define(B,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var H=(new Date).valueOf();
var I=x+H;
var J=n+H;
var K;

if(qx.core.Variant.isSet(d,m)){K=q;
}this.__oh=qx.bom.Iframe.create({id:I,name:I,src:K});
qx.bom.element.Style.set(this.__oh,z,A);
this.__oi=qx.bom.Element.create(o,{id:J,name:J,target:I});
qx.bom.element.Style.set(this.__oi,z,A);
qx.dom.Element.insertEnd(this.__oi,qx.dom.Node.getBodyElement(document));
this.__oj=qx.bom.Element.create(c,{id:b,name:b});
qx.dom.Element.insertEnd(this.__oj,this.__oi);
qx.dom.Element.insertEnd(this.__oh,qx.dom.Node.getBodyElement(document));
qx.event.Registration.addListener(this.__oh,a,this._onload,this);
this.__ok=qx.lang.Function.listener(this._onreadystatechange,this);
qx.bom.Event.addNativeListener(this.__oh,D,this.__ok);
},statics:{handles:{synchronous:false,asynchronous:true,crossDomain:false,fileUpload:true,programaticFormFields:true,responseTypes:[G,F,g,h,f]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4}},members:{__oj:null,__ol:0,__oi:null,__oh:null,__ok:null,send:function(){var M=this.getMethod();
var O=this.getUrl();
var S=this.getParameters(false);
var R=[];

for(var N in S){var P=S[N];

if(P instanceof Array){for(var i=0;i<P.length;i++){R.push(encodeURIComponent(N)+l+encodeURIComponent(P[i]));
}}else{R.push(encodeURIComponent(N)+l+encodeURIComponent(P));
}}
if(R.length>0){O+=(O.indexOf(C)>=0?j:C)+R.join(j);
}if(this.getData()===null){var S=this.getParameters(true);
var R=[];

for(var N in S){var P=S[N];

if(P instanceof Array){for(var i=0;i<P.length;i++){R.push(encodeURIComponent(N)+l+encodeURIComponent(P[i]));
}}else{R.push(encodeURIComponent(N)+l+encodeURIComponent(P));
}}
if(R.length>0){this.setData(R.join(j));
}}var L=this.getFormFields();

for(var N in L){var Q=document.createElement(c);
Q.name=N;
Q.appendChild(document.createTextNode(L[N]));
this.__oi.appendChild(Q);
}this.__oi.action=O;
this.__oi.method=M;
this.__oj.appendChild(document.createTextNode(this.getData()));
this.__oi.submit();
this.setState(r);
},_onload:qx.event.GlobalError.observeMethod(function(e){if(qx.bom.client.Engine.NAME==u&&this.getIframeHtmlContent()==k){return;
}
if(this.__oi.src){return;
}this._switchReadyState(qx.io.remote.transport.Iframe._numericMap.complete);
}),_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){this._switchReadyState(qx.io.remote.transport.Iframe._numericMap[this.__oh.readyState]);
}),_switchReadyState:function(T){switch(this.getState()){case E:case s:case p:case v:this.warn("Ignore Ready State Change");
return;
}while(this.__ol<T){this.setState(qx.io.remote.Exchange._nativeMap[++this.__ol]);
}},setRequestHeader:function(U,V){},getResponseHeader:function(W){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return k;
},getIframeWindow:function(){return qx.bom.Iframe.getWindow(this.__oh);
},getIframeDocument:function(){return qx.bom.Iframe.getDocument(this.__oh);
},getIframeBody:function(){return qx.bom.Iframe.getBody(this.__oh);
},getIframeTextContent:function(){var X=this.getIframeBody();

if(!X){return null;
}
if(!X.firstChild){return k;
}if(X.firstChild.tagName&&X.firstChild.tagName.toLowerCase()==t){return X.firstChild.innerHTML;
}else{return X.innerHTML;
}},getIframeHtmlContent:function(){var Y=this.getIframeBody();
return Y?Y.innerHTML:null;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==E){{};
return null;
}{};
var ba=this.getIframeTextContent();

switch(this.getResponseType()){case G:{};
return ba;
break;
case f:ba=this.getIframeHtmlContent();
{};
return ba;
break;
case g:ba=this.getIframeHtmlContent();
{};

try{return ba&&ba.length>0?qx.util.Json.parse(ba,false):null;
}catch(bb){return this.error("Could not execute json: ("+ba+")",bb);
}case F:ba=this.getIframeHtmlContent();
{};

try{return ba&&ba.length>0?window.eval(ba):null;
}catch(bc){return this.error("Could not execute javascript: ("+ba+")",bc);
}case h:ba=this.getIframeDocument();
{};
return ba;
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Iframe,B);
},destruct:function(){if(this.__oh){qx.event.Registration.removeListener(this.__oh,a,this._onload,this);
qx.bom.Event.removeNativeListener(this.__oh,D,this.__ok);
if(qx.core.Variant.isSet(d,y)){this.__oh.src=qx.util.ResourceManager.getInstance().toUri(w);
}qx.dom.Element.remove(this.__oh);
}
if(this.__oi){qx.dom.Element.remove(this.__oi);
}this.__oh=this.__oi=this.__oj=null;
}});
})();
(function(){var n=",",m="",k="string",j="null",h='"',g=':',f="qx.jsonDebugging",e='-',d='\\u00',c="__qL",N="new Date(Date.UTC(",M='\\\\',L='\\f',K='\\"',J='Z',I="))",H="__qB",G="__qD",F="}",E='(',u='.',v="{",s='\\r',t=":",q='\\t',r="]",o="[",p="__qE",w="qx.jsonEncodeUndefined",x='T',z='\\b',y="__qC",B="qx.util.Json",A=')',D='\\n',C="__qM";
qx.Class.define(B,{statics:{__qz:null,BEAUTIFYING_INDENT:"  ",BEAUTIFYING_LINE_END:"\n",CONVERT_DATES:null,__qA:{"function":H,"boolean":y,"number":G,"string":p,"object":c,"undefined":C},__qB:function(O,P){return String(O);
},__qC:function(Q,R){return String(Q);
},__qD:function(S,T){return isFinite(S)?String(S):j;
},__qE:function(U,V){var W;

if(/["\\\x00-\x1f]/.test(U)){W=U.replace(/([\x00-\x1f\\"])/g,qx.util.Json.__qG);
}else{W=U;
}return h+W+h;
},__qF:{'\b':z,'\t':q,'\n':D,'\f':L,'\r':s,'"':K,'\\':M},__qG:function(a,b){var X=qx.util.Json.__qF[b];

if(X){return X;
}X=b.charCodeAt();
return d+Math.floor(X/16).toString(16)+(X%16).toString(16);
},__qH:function(Y,ba){var bc=[],bf=true,be,bb;
var bd=qx.util.Json.__qO;
bc.push(o);

if(bd){qx.util.Json.__qI+=qx.util.Json.BEAUTIFYING_INDENT;
bc.push(qx.util.Json.__qI);
}
for(var i=0,l=Y.length;i<l;i++){bb=Y[i];
be=this.__qA[typeof bb];

if(be){bb=this[be](bb,i+m);

if(typeof bb==k){if(!bf){bc.push(n);

if(bd){bc.push(qx.util.Json.__qI);
}}bc.push(bb);
bf=false;
}}}
if(bd){qx.util.Json.__qI=qx.util.Json.__qI.substring(0,qx.util.Json.__qI.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bc.push(qx.util.Json.__qI);
}bc.push(r);
return bc.join(m);
},__qJ:function(bg,bh){if(!qx.util.Json.CONVERT_DATES){if(bg.toJSON&&!qx.bom.client.Engine.OPERA){return bg.toJSON();
}var bi=qx.util.format.NumberFormat.getInstance();
bi.setMinimumIntegerDigits(2);
var bk=bg.getUTCFullYear()+e+bi.format(bg.getUTCMonth()+1)+e+bi.format(bg.getUTCDate())+x+bi.format(bg.getUTCHours())+g+bi.format(bg.getUTCMinutes())+g+bi.format(bg.getUTCSeconds())+u;
bi.setMinimumIntegerDigits(3);
return bk+bi.format(bg.getUTCMilliseconds())+J;
}else{var bj=bg.getUTCFullYear()+n+bg.getUTCMonth()+n+bg.getUTCDate()+n+bg.getUTCHours()+n+bg.getUTCMinutes()+n+bg.getUTCSeconds()+n+bg.getUTCMilliseconds();
return N+bj+I;
}},__qK:function(bl,bm){var bp=[],br=true,bo,bn;
var bq=qx.util.Json.__qO;
bp.push(v);

if(bq){qx.util.Json.__qI+=qx.util.Json.BEAUTIFYING_INDENT;
bp.push(qx.util.Json.__qI);
}
for(var bm in bl){bn=bl[bm];
bo=this.__qA[typeof bn];

if(bo){bn=this[bo](bn,bm);

if(typeof bn==k){if(!br){bp.push(n);

if(bq){bp.push(qx.util.Json.__qI);
}}bp.push(this.__qE(bm),t,bn);
br=false;
}}}
if(bq){qx.util.Json.__qI=qx.util.Json.__qI.substring(0,qx.util.Json.__qI.length-qx.util.Json.BEAUTIFYING_INDENT.length);
bp.push(qx.util.Json.__qI);
}bp.push(F);
return bp.join(m);
},__qL:function(bs,bt){if(bs){if(qx.lang.Type.isFunction(bs.toJSON)&&bs.toJSON!==this.__qz){return this.__qN(bs.toJSON(bt),bt);
}else if(qx.lang.Type.isDate(bs)){return this.__qJ(bs,bt);
}else if(qx.lang.Type.isArray(bs)){return this.__qH(bs,bt);
}else if(qx.lang.Type.isObject(bs)){return this.__qK(bs,bt);
}return m;
}return j;
},__qM:function(bu,bv){if(qx.core.Setting.get(w)){return j;
}},__qN:function(bw,bx){return this[this.__qA[typeof bw]](bw,bx);
},stringify:function(by,bz){this.__qO=bz;
this.__qI=this.BEAUTIFYING_LINE_END;
var bA=this.__qN(by,m);

if(typeof bA!=k){bA=null;
}if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON request: "+bA);
}return bA;
},parse:function(bB,bC){if(bC===undefined){bC=true;
}
if(qx.core.Setting.get(f)){qx.log.Logger.debug(this,"JSON response: "+bB);
}
if(bC){if(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(bB.replace(/"(\\.|[^"\\])*"/g,m))){throw new Error("Could not parse JSON string!");
}}
try{var bD=(bB&&bB.length>0)?eval(E+bB+A):null;
return bD;
}catch(bE){throw new Error("Could not evaluate JSON string: "+bE.message);
}}},settings:{"qx.jsonEncodeUndefined":true,"qx.jsonDebugging":false},defer:function(bF){bF.__qz=Date.prototype.toJSON;
}});
})();
(function(){var c="Integer",b="Object",a="qx.io.remote.Response";
qx.Class.define(a,{extend:qx.event.type.Event,properties:{state:{check:c,nullable:true},statusCode:{check:c,nullable:true},content:{nullable:true},responseHeaders:{check:b,nullable:true}},members:{clone:function(d){var e=qx.event.type.Event.prototype.clone.call(this,d);
e.setType(this.getType());
e.setState(this.getState());
e.setStatusCode(this.getStatusCode());
e.setContent(this.getContent());
e.setResponseHeaders(this.getResponseHeaders());
return e;
},getResponseHeader:function(f){var g=this.getResponseHeaders();

if(g){return g[f]||null;
}return null;
}}});
})();
(function(){var s="Integer",r="aborted",q="_onaborted",p="_on",o="_applyEnabled",n="Boolean",m="sending",l="__pc",k="interval",j="__pe",c="failed",h="qx.io.remote.RequestQueue",g="timeout",b="completed",a="queued",f="receiving",d="singleton";
qx.Class.define(h,{type:d,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__pb=[];
this.__pc=[];
this.__pd=0;
this.__pe=new qx.event.Timer(500);
this.__pe.addListener(k,this._oninterval,this);
},properties:{enabled:{init:true,check:n,apply:o},maxTotalRequests:{check:s,nullable:true},maxConcurrentRequests:{check:s,init:qx.bom.client.Transport.getMaxConcurrentRequestCount()},defaultTimeout:{check:s,init:5000}},members:{__pb:null,__pc:null,__pd:null,__pe:null,getRequestQueue:function(){return this.__pb;
},getActiveQueue:function(){return this.__pc;
},_debug:function(){var t;
{};
},_check:function(){this._debug();
if(this.__pc.length==0&&this.__pb.length==0){this.__pe.stop();
}if(!this.getEnabled()){return;
}if(this.__pb.length==0||(this.__pb[0].isAsynchronous()&&this.__pc.length>=this.getMaxConcurrentRequests())){return;
}if(this.getMaxTotalRequests()!=null&&this.__pd>=this.getMaxTotalRequests()){return;
}var u=this.__pb.shift();
var v=new qx.io.remote.Exchange(u);
this.__pd++;
this.__pc.push(v);
this._debug();
v.addListener(m,this._onsending,this);
v.addListener(f,this._onreceiving,this);
v.addListener(b,this._oncompleted,this);
v.addListener(r,this._oncompleted,this);
v.addListener(g,this._oncompleted,this);
v.addListener(c,this._oncompleted,this);
v._start=(new Date).valueOf();
v.send();
if(this.__pb.length>0){this._check();
}},_remove:function(w){qx.lang.Array.remove(this.__pc,w);
w.dispose();
this._check();
},__pf:0,_onsending:function(e){{};
e.getTarget().getRequest()._onsending(e);
},_onreceiving:function(e){e.getTarget().getRequest()._onreceiving(e);
},_oncompleted:function(e){{};
var y=e.getTarget().getRequest();
var x=p+e.getType();
try{if(y[x]){y[x](e);
}}catch(z){this.error("Request "+y+" handler "+x+" threw an error: ",z);
try{if(y[q]){var event=qx.event.Registration.createEvent(r,qx.event.type.Event);
y[q](event);
}}catch(A){}}finally{this._remove(e.getTarget());
}},_oninterval:function(e){var H=this.__pc;

if(H.length==0){this.__pe.stop();
return;
}var C=(new Date).valueOf();
var F;
var D;
var G=this.getDefaultTimeout();
var E;
var B;

for(var i=H.length-1;i>=0;i--){F=H[i];
D=F.getRequest();

if(D.isAsynchronous()){E=D.getTimeout();
if(E==0){continue;
}
if(E==null){E=G;
}B=C-F._start;

if(B>E){this.warn("Timeout: transport "+F.toHashCode());
this.warn(B+"ms > "+E+"ms");
F.timeout();
}}}},_applyEnabled:function(I,J){if(I){this._check();
}this.__pe.setEnabled(I);
},add:function(K){K.setState(a);

if(K.isAsynchronous()){this.__pb.push(K);
}else{this.__pb.unshift(K);
}this._check();

if(this.getEnabled()){this.__pe.start();
}},abort:function(L){var M=L.getTransport();

if(M){M.abort();
}else if(qx.lang.Array.contains(this.__pb,L)){qx.lang.Array.remove(this.__pb,L);
}}},destruct:function(){this._disposeArray(l);
this._disposeObjects(j);
this.__pb=null;
}});
})();
(function(){var r="&",q="=",p="?",o="application/json",n="completed",m="text/plain",l="text/javascript",k="qx.io.remote.transport.Script",j="",h="_ScriptTransport_data",c="script",g="timeout",f="_ScriptTransport_",b="_ScriptTransport_id",a="aborted",e="utf-8",d="failed";
qx.Class.define(k,{extend:qx.io.remote.transport.Abstract,construct:function(){qx.io.remote.transport.Abstract.call(this);
var s=++qx.io.remote.transport.Script.__pg;

if(s>=2000000000){qx.io.remote.transport.Script.__pg=s=1;
}this.__ph=null;
this.__pg=s;
},statics:{__pg:0,_instanceRegistry:{},ScriptTransport_PREFIX:f,ScriptTransport_ID_PARAM:b,ScriptTransport_DATA_PARAM:h,handles:{synchronous:false,asynchronous:true,crossDomain:true,fileUpload:false,programaticFormFields:false,responseTypes:[m,l,o]},isSupported:function(){return true;
},_numericMap:{"uninitialized":1,"loading":2,"loaded":2,"interactive":3,"complete":4},_requestFinished:qx.event.GlobalError.observeMethod(function(t,content){var u=qx.io.remote.transport.Script._instanceRegistry[t];

if(u==null){{};
}else{u._responseContent=content;
u._switchReadyState(qx.io.remote.transport.Script._numericMap.complete);
}})},members:{__pi:0,__ph:null,__pg:null,send:function(){var x=this.getUrl();
x+=(x.indexOf(p)>=0?r:p)+qx.io.remote.transport.Script.ScriptTransport_ID_PARAM+q+this.__pg;
var A=this.getParameters();
var z=[];

for(var w in A){if(w.indexOf(qx.io.remote.transport.Script.ScriptTransport_PREFIX)==0){this.error("Illegal parameter name. The following prefix is used internally by qooxdoo): "+qx.io.remote.transport.Script.ScriptTransport_PREFIX);
}var y=A[w];

if(y instanceof Array){for(var i=0;i<y.length;i++){z.push(encodeURIComponent(w)+q+encodeURIComponent(y[i]));
}}else{z.push(encodeURIComponent(w)+q+encodeURIComponent(y));
}}
if(z.length>0){x+=r+z.join(r);
}var v=this.getData();

if(v!=null){x+=r+qx.io.remote.transport.Script.ScriptTransport_DATA_PARAM+q+encodeURIComponent(v);
}qx.io.remote.transport.Script._instanceRegistry[this.__pg]=this;
this.__ph=document.createElement(c);
this.__ph.charset=e;
this.__ph.src=x;
{};
document.body.appendChild(this.__ph);
},_switchReadyState:function(B){switch(this.getState()){case n:case a:case d:case g:this.warn("Ignore Ready State Change");
return;
}while(this.__pi<B){this.setState(qx.io.remote.Exchange._nativeMap[++this.__pi]);
}},setRequestHeader:function(C,D){},getResponseHeader:function(E){return null;
},getResponseHeaders:function(){return {};
},getStatusCode:function(){return 200;
},getStatusText:function(){return j;
},getFetchedLength:function(){return 0;
},getResponseContent:function(){if(this.getState()!==n){{};
return null;
}{};

switch(this.getResponseType()){case m:case o:case l:{};
var F=this._responseContent;
return (F===0?0:(F||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.Script,k);
},destruct:function(){if(this.__ph){delete qx.io.remote.transport.Script._instanceRegistry[this.__pg];
document.body.removeChild(this.__ph);
}this.__ph=this._responseContent=null;
}});
})();
(function(){var k="value",j=" ",h="icon",g="model",f="text",e="qx.client",d="source",c="mshtml",b="user.profile_image_url",a="showcase/databinding/twitter_logo_outline.png",K="Enter",J="one",I="http",H="keydown",G="http://twitter.com/statuses/user_timeline/1and1.json",F="<a href='",E="execute",D="1and1",C="callback",B="selection[0]",r="username",s="showcase.page.databinding.Content",p="Location: ",q="Details",n="user.name",o="Name: ",l="target='_blank'",m="</a>",t="Posted with: ",u="' target='_blank'>",w="Show",v="user.location",y=".json",x="http://twitter.com/statuses/user_timeline/",A="Avatar: ",z="Message: ";
qx.Class.define(s,{extend:showcase.AbstractContent,construct:function(L){showcase.AbstractContent.call(this,L);
this.setView(this._createView());
},members:{_createView:function(){var ba=new qx.ui.container.Composite(new qx.ui.layout.Canvas());
var V=new qx.ui.basic.Image(a);
ba.add(V,{left:10,top:15});
var Q=new qx.ui.form.List();
ba.add(Q,{left:10,top:135,bottom:5});
Q.set({selectionMode:J,width:300,maxHeight:400});
var T=new qx.data.controller.List(null,Q);
T.setDelegate(this);
T.setLabelPath(f);
if(!qx.core.Variant.isSet(e,c)){T.setIconPath(b);
}var O=G;
var Y=new qx.data.store.Jsonp(O,null,C);
Y.bind(g,T,g);
var R=new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
R.set({width:300});
R.add(new qx.ui.core.Spacer(),{flex:1});
var M=new qx.ui.form.TextField(D);
M.setPlaceholder(r);
R.add(M);
var U=new qx.ui.form.Button(w);
R.add(U);
U.addListener(E,function(){var bb=x+M.getValue()+y;

if(Y.getUrl()==bb){Y.reload();
}else{Y.setUrl(bb);
}},this);
M.addListener(H,function(bc){if(bc.getKeyIdentifier()==K){U.execute();
}},this);
ba.add(R,{left:10,top:105});
var P=new qx.ui.groupbox.GroupBox(q);
ba.add(P,{left:320,top:116,bottom:5});
P.setWidth(270);
P.setHeight(220);
P.setAllowGrowY(false);
P.setLayout(new qx.ui.layout.Grid(5,5));
P.add(new qx.ui.basic.Label(o),{row:0,column:0});
P.add(new qx.ui.basic.Label(p),{row:1,column:0});
P.add(new qx.ui.basic.Label(z),{row:2,column:0});
P.add(new qx.ui.basic.Label(t),{row:3,column:0});
var name=new qx.ui.basic.Label();
P.add(name,{row:0,column:1});
var location=new qx.ui.basic.Label();
P.add(location,{row:1,column:1});
var W=new qx.ui.basic.Label();
W.setRich(true);
W.setWidth(150);
W.setSelectable(true);
P.add(W,{row:2,column:1});
var X=new qx.ui.basic.Label();
X.setRich(true);
P.add(X,{row:3,column:1});
var N=new qx.data.controller.Object();
N.addTarget(name,k,n);
N.addTarget(location,k,v);
N.addTarget(W,k,f,false,{converter:function(bd){var be=bd.split(j);

for(var i=be.length-1;i>=0;i--){if(be[i].indexOf(I)==0){be[i]=F+be[i]+u+be[i]+m;
}}return be.join(j);
}});
N.addTarget(X,k,d,false,{converter:function(bf){bf=bf.split(j);
bf.splice(1,0,l);
return bf.join(j);
}});

if(!qx.core.Variant.isSet(e,c)){P.add(new qx.ui.basic.Label(A),{row:4,column:0});
var S=new qx.ui.basic.Image();
P.add(S,{row:4,column:1});
N.addTarget(S,d,b);
}T.bind(B,N,g);
return ba;
},configureItem:function(bg){bg.setRich(true);
bg.getChildControl(h).setWidth(48);
bg.getChildControl(h).setHeight(48);
bg.getChildControl(h).setScale(true);
}}});
})();
(function(){var m="failed",k="completed",j="=",h="aborted",g="",f="sending",d="&",c="configured",b="timeout",a="application/xml",J="qx.io.remote.transport.XmlHttp",I="application/json",H="text/html",G="qx.client",F="receiving",E="text/plain",D="text/javascript",C="?",B="created",A="Boolean",u='Referer',v='Basic ',r="\n</pre>",t="string",p='Authorization',q="<pre>Could not execute json: \n",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=':',w="parseerror",x="file:",z="webkit",y="object";
qx.Class.define(J,{extend:qx.io.remote.transport.Abstract,statics:{handles:{synchronous:true,asynchronous:true,crossDomain:false,fileUpload:false,programaticFormFields:false,responseTypes:[E,D,I,a,H]},requestObjects:[],requestObjectCount:0,createRequestObject:qx.core.Variant.select(G,{"default":function(){return new XMLHttpRequest;
},"mshtml":function(){if(window.ActiveXObject&&qx.xml.Document.XMLHTTP){return new ActiveXObject(qx.xml.Document.XMLHTTP);
}
if(window.XMLHttpRequest){return new XMLHttpRequest;
}}}),isSupported:function(){return !!this.createRequestObject();
}},properties:{parseJson:{check:A,init:true}},members:{__nh:false,__ni:0,__nj:null,getRequest:function(){if(this.__nj===null){this.__nj=qx.io.remote.transport.XmlHttp.createRequestObject();
this.__nj.onreadystatechange=qx.lang.Function.bind(this._onreadystatechange,this);
}return this.__nj;
},send:function(){this.__ni=0;
var O=this.getRequest();
var K=this.getMethod();
var R=this.getAsynchronous();
var Q=this.getUrl();
var M=(window.location.protocol===x&&!(/^http(s){0,1}\:/.test(Q)));
this.__nh=M;
var U=this.getParameters(false);
var S=[];

for(var L in U){var P=U[L];

if(P instanceof Array){for(var i=0;i<P.length;i++){S.push(encodeURIComponent(L)+j+encodeURIComponent(P[i]));
}}else{S.push(encodeURIComponent(L)+j+encodeURIComponent(P));
}}
if(S.length>0){Q+=(Q.indexOf(C)>=0?d:C)+S.join(d);
}if(this.getData()===null){var U=this.getParameters(true);
var S=[];

for(var L in U){var P=U[L];

if(P instanceof Array){for(var i=0;i<P.length;i++){S.push(encodeURIComponent(L)+j+encodeURIComponent(P[i]));
}}else{S.push(encodeURIComponent(L)+j+encodeURIComponent(P));
}}
if(S.length>0){this.setData(S.join(d));
}}var T=function(V){var bb=n;
var bf=g;
var Y,X,W;
var bc,bd,be,ba;
var i=0;

do{Y=V.charCodeAt(i++);
X=V.charCodeAt(i++);
W=V.charCodeAt(i++);
bc=Y>>2;
bd=((Y&3)<<4)|(X>>4);
be=((X&15)<<2)|(W>>6);
ba=W&63;

if(isNaN(X)){be=ba=64;
}else if(isNaN(W)){ba=64;
}bf+=bb.charAt(bc)+bb.charAt(bd)+bb.charAt(be)+bb.charAt(ba);
}while(i<V.length);
return bf;
};
try{if(this.getUsername()){if(this.getUseBasicHttpAuth()){O.open(K,Q,R);
O.setRequestHeader(p,v+T(this.getUsername()+o+this.getPassword()));
}else{O.open(K,Q,R,this.getUsername(),this.getPassword());
}}else{O.open(K,Q,R);
}}catch(bg){this.error("Failed with exception: "+bg);
this.failed();
return;
}if(!qx.core.Variant.isSet(G,z)){O.setRequestHeader(u,window.location.href);
}var N=this.getRequestHeaders();

for(var L in N){O.setRequestHeader(L,N[L]);
}try{{};
O.send(this.getData());
}catch(bh){if(M){this.failedLocally();
}else{this.error("Failed to send data: "+bh,"send");
this.failed();
}return;
}if(!R){this._onreadystatechange();
}},failedLocally:function(){if(this.getState()===m){return;
}this.warn("Could not load from file: "+this.getUrl());
this.failed();
},_onreadystatechange:qx.event.GlobalError.observeMethod(function(e){switch(this.getState()){case k:case h:case m:case b:{};
return;
}var bi=this.getReadyState();

if(bi==4){if(!qx.io.remote.Exchange.wasSuccessful(this.getStatusCode(),bi,this.__nh)){if(this.getState()===c){this.setState(f);
}this.failed();
return;
}}while(this.__ni<bi){this.setState(qx.io.remote.Exchange._nativeMap[++this.__ni]);
}}),getReadyState:function(){var bj=null;

try{bj=this.getRequest().readyState;
}catch(bk){}return bj;
},setRequestHeader:function(bl,bm){this.getRequestHeaders()[bl]=bm;
},getResponseHeader:function(bn){var bo=null;

try{bo=this.getRequest().getResponseHeader(bn)||null;
}catch(bp){}return bo;
},getStringResponseHeaders:function(){var br=null;

try{var bq=this.getRequest().getAllResponseHeaders();

if(bq){br=bq;
}}catch(bs){}return br;
},getResponseHeaders:function(){var bv=this.getStringResponseHeaders();
var bw={};

if(bv){var bt=bv.split(/[\r\n]+/g);

for(var i=0,l=bt.length;i<l;i++){var bu=bt[i].match(/^([^:]+)\s*:\s*(.+)$/i);

if(bu){bw[bu[1]]=bu[2];
}}}return bw;
},getStatusCode:function(){var bx=-1;

try{bx=this.getRequest().status;
}catch(by){}return bx;
},getStatusText:function(){var bz=g;

try{bz=this.getRequest().statusText;
}catch(bA){}return bz;
},getResponseText:function(){var bB=null;

try{bB=this.getRequest().responseText;
}catch(bC){bB=null;
}return bB;
},getResponseXml:function(){var bF=null;
var bD=this.getStatusCode();
var bE=this.getReadyState();

if(qx.io.remote.Exchange.wasSuccessful(bD,bE,this.__nh)){try{bF=this.getRequest().responseXML;
}catch(bG){}}if(typeof bF==y&&bF!=null){if(!bF.documentElement){var s=String(this.getRequest().responseText).replace(/<\?xml[^\?]*\?>/,g);
bF.loadXML(s);
}if(!bF.documentElement){throw new Error("Missing Document Element!");
}
if(bF.documentElement.tagName==w){throw new Error("XML-File is not well-formed!");
}}else{throw new Error("Response was not a valid xml document ["+this.getRequest().responseText+"]");
}return bF;
},getFetchedLength:function(){var bH=this.getResponseText();
return typeof bH==t?bH.length:0;
},getResponseContent:function(){var bI=this.getState();

if(bI!==k&&bI!=m){{};
return null;
}{};
var bK=this.getResponseText();

if(bI==m){{};
return bK;
}
switch(this.getResponseType()){case E:case H:{};
return bK;
case I:{};

try{if(bK&&bK.length>0){var bJ;

if(this.getParseJson()){bJ=qx.util.Json.parse(bK,false);
bJ=(bJ===0?0:(bJ||null));
}else{bJ=bK;
}return bJ;
}else{return null;
}}catch(bL){this.error("Could not execute json: ["+bK+"]",bL);
return q+bK+r;
}case D:{};

try{if(bK&&bK.length>0){var bJ=window.eval(bK);
return (bJ===0?0:(bJ||null));
}else{return null;
}}catch(bM){this.error("Could not execute javascript: ["+bK+"]",bM);
return null;
}case a:bK=this.getResponseXml();
{};
return (bK===0?0:(bK||null));
default:this.warn("No valid responseType specified ("+this.getResponseType()+")!");
return null;
}},_applyState:function(bN,bO){{};

switch(bN){case B:this.fireEvent(B);
break;
case c:this.fireEvent(c);
break;
case f:this.fireEvent(f);
break;
case F:this.fireEvent(F);
break;
case k:this.fireEvent(k);
break;
case m:this.fireEvent(m);
break;
case h:this.getRequest().abort();
this.fireEvent(h);
break;
case b:this.getRequest().abort();
this.fireEvent(b);
break;
}}},defer:function(){qx.io.remote.Exchange.registerType(qx.io.remote.transport.XmlHttp,J);
},destruct:function(){var bP=this.getRequest();

if(bP){bP.onreadystatechange=qx.lang.Function.empty;
switch(bP.readyState){case 1:case 2:case 3:bP.abort();
}}this.__nj=null;
}});
})();
(function(){var k="Boolean",j="qx.event.type.Event",i="queued",h="String",g="sending",f="receiving",d="aborted",c="failed",b="nocache",a="completed",P="qx.io.remote.Response",O="POST",N="configured",M="timeout",L="GET",K="Pragma",J="no-url-params-on-post",I="PUT",H="no-cache",G="Cache-Control",r="Content-Type",s="text/plain",p="application/xml",q="application/json",n="text/html",o="application/x-www-form-urlencoded",l="qx.io.remote.Exchange",m="Integer",t="X-Qooxdoo-Response-Type",u="HEAD",y="qx.io.remote.Request",x="_applyResponseType",A="_applyState",z="text/javascript",C="changeState",B="_applyProhibitCaching",w="",F="_applyMethod",E="DELETE",D="boolean";
qx.Class.define(y,{extend:qx.core.Object,construct:function(Q,R,S){qx.core.Object.call(this);
this.__sp={};
this.__sq={};
this.__sr={};
this.__ss={};

if(Q!==undefined){this.setUrl(Q);
}
if(R!==undefined){this.setMethod(R);
}
if(S!==undefined){this.setResponseType(S);
}this.setProhibitCaching(true);
this.__st=++qx.io.remote.Request.__st;
},events:{"created":j,"configured":j,"sending":j,"receiving":j,"completed":P,"aborted":j,"failed":P,"timeout":P},statics:{__st:0,methodAllowsRequestBody:function(T){return (T==O)||(T==I);
}},properties:{url:{check:h,init:w},method:{check:[L,O,I,u,E],apply:F,init:L},asynchronous:{check:k,init:true},data:{check:h,nullable:true},username:{check:h,nullable:true},password:{check:h,nullable:true},state:{check:[N,i,g,f,a,d,M,c],init:N,apply:A,event:C},responseType:{check:[s,z,q,p,n],init:s,apply:x},timeout:{check:m,nullable:true},prohibitCaching:{check:function(v){return typeof v==D||v===J;
},init:true,apply:B},crossDomain:{check:k,init:false},fileUpload:{check:k,init:false},transport:{check:l,nullable:true},useBasicHttpAuth:{check:k,init:false},parseJson:{check:k,init:true}},members:{__sp:null,__sq:null,__sr:null,__ss:null,__st:null,send:function(){qx.io.remote.RequestQueue.getInstance().add(this);
},abort:function(){qx.io.remote.RequestQueue.getInstance().abort(this);
},reset:function(){switch(this.getState()){case g:case f:this.error("Aborting already sent request!");
case i:this.abort();
break;
}},isConfigured:function(){return this.getState()===N;
},isQueued:function(){return this.getState()===i;
},isSending:function(){return this.getState()===g;
},isReceiving:function(){return this.getState()===f;
},isCompleted:function(){return this.getState()===a;
},isAborted:function(){return this.getState()===d;
},isTimeout:function(){return this.getState()===M;
},isFailed:function(){return this.getState()===c;
},__su:qx.event.GlobalError.observeMethod(function(e){var U=e.clone();
U.setTarget(this);
this.dispatchEvent(U);
}),_onqueued:function(e){this.setState(i);
this.__su(e);
},_onsending:function(e){this.setState(g);
this.__su(e);
},_onreceiving:function(e){this.setState(f);
this.__su(e);
},_oncompleted:function(e){this.setState(a);
this.__su(e);
this.dispose();
},_onaborted:function(e){this.setState(d);
this.__su(e);
this.dispose();
},_ontimeout:function(e){this.setState(M);
this.__su(e);
this.dispose();
},_onfailed:function(e){this.setState(c);
this.__su(e);
this.dispose();
},_applyState:function(V,W){{};
},_applyProhibitCaching:function(X,Y){if(!X){this.removeParameter(b);
this.removeRequestHeader(K);
this.removeRequestHeader(G);
return;
}if(X!==J||this.getMethod()!=O){this.setParameter(b,new Date().valueOf());
}else{this.removeParameter(b);
}this.setRequestHeader(K,H);
this.setRequestHeader(G,H);
},_applyMethod:function(ba,bb){if(qx.io.remote.Request.methodAllowsRequestBody(ba)){this.setRequestHeader(r,o);
}else{this.removeRequestHeader(r);
}var bc=this.getProhibitCaching();
this._applyProhibitCaching(bc,bc);
},_applyResponseType:function(bd,be){this.setRequestHeader(t,bd);
},setRequestHeader:function(bf,bg){this.__sp[bf]=bg;
},removeRequestHeader:function(bh){delete this.__sp[bh];
},getRequestHeader:function(bi){return this.__sp[bi]||null;
},getRequestHeaders:function(){return this.__sp;
},setParameter:function(bj,bk,bl){if(bl){this.__sr[bj]=bk;
}else{this.__sq[bj]=bk;
}},removeParameter:function(bm,bn){if(bn){delete this.__sr[bm];
}else{delete this.__sq[bm];
}},getParameter:function(bo,bp){if(bp){return this.__sr[bo]||null;
}else{return this.__sq[bo]||null;
}},getParameters:function(bq){return (bq?this.__sr:this.__sq);
},setFormField:function(br,bs){this.__ss[br]=bs;
},removeFormField:function(bt){delete this.__ss[bt];
},getFormField:function(bu){return this.__ss[bu]||null;
},getFormFields:function(){return this.__ss;
},getSequenceNumber:function(){return this.__st;
}},destruct:function(){this.setTransport(null);
this.__sp=this.__sq=this.__sr=this.__ss=null;
}});
})();
(function(){var h="[",g="changeModel",f="qx.core.Object",e="qx.data.controller.Object",d="get",c="reset",b="_applyModel",a="last";
qx.Class.define(e,{extend:qx.core.Object,construct:function(j){qx.core.Object.call(this);
this.__HI={};
this.__HJ=[];

if(j!=null){this.setModel(j);
}},properties:{model:{check:f,event:g,apply:b,nullable:true,dereference:true}},members:{__HJ:null,__HI:null,_applyModel:function(k,l){for(var i=0;i<this.__HJ.length;i++){var t=this.__HJ[i][0];
var q=this.__HJ[i][1];
var o=this.__HJ[i][2];
var r=this.__HJ[i][3];
var s=this.__HJ[i][4];
var n=this.__HJ[i][5];
if(l!=undefined){this.__HL(t,q,o,l);
}if(k!=undefined){this.__HK(t,q,o,r,s,n);
}else{if(t.isDisposed()||qx.core.ObjectRegistry.inShutDown){continue;
}if(q.indexOf(h)==-1){t[c+qx.lang.String.firstUp(q)]();
}else{var open=q.indexOf(h);
var m=parseInt(q.substring(open+1,q.length-1),10);
q=q.substring(0,open);
var p=t[d+qx.lang.String.firstUp(q)]();

if(m==a){m=p.length;
}
if(p){p.setItem(m,null);
}}}}},addTarget:function(u,v,w,x,y,z){this.__HJ.push([u,v,w,x,y,z]);
this.__HK(u,v,w,x,y,z);
},__HK:function(A,B,C,D,E,F){if(this.getModel()==null){return;
}var G=this.getModel().bind(C,A,B,E);
var H=null;

if(D){H=A.bind(B,this.getModel(),C,F);
}var I=A.toHashCode();

if(this.__HI[I]==undefined){this.__HI[I]=[];
}this.__HI[I].push([G,H,B,C,E,F]);
},removeTarget:function(J,K,L){this.__HL(J,K,L,this.getModel());
for(var i=0;i<this.__HJ.length;i++){if(this.__HJ[i][0]==J&&this.__HJ[i][1]==K&&this.__HJ[i][2]==L){this.__HJ.splice(i,1);
}}},__HL:function(M,N,O,P){if(!(M instanceof qx.core.Object)){return ;
}var Q=this.__HI[M.toHashCode()];
if(Q==undefined||Q.length==0){return;
}for(var i=0;i<Q.length;i++){if(Q[i][2]==N&&Q[i][3]==O){var R=Q[i][0];
P.removeBinding(R);
if(Q[i][1]!=null){M.removeBinding(Q[i][1]);
}Q.splice(i,1);
return;
}}}},destruct:function(){if(this.getModel()!=null&&!this.getModel().isDisposed()){this.setModel(null);
}}});
})();

});