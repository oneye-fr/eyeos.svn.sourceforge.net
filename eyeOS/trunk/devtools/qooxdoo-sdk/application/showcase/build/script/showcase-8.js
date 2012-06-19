qx.$$packageData['6ac6e69d830a']={"locales":{},"resources":{"qx/icon/Tango/22/actions/document-send.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-important.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-mark-junk.png":[22,22,"png","qx"],"qx/icon/Tango/22/actions/mail-message-new.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/internet-mail.png":[22,22,"png","qx"],"qx/icon/Tango/22/apps/office-chart.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/drive-harddisk.png":[22,22,"png","qx"],"qx/icon/Tango/22/devices/drive-optical.png":[22,22,"png","qx"],"qx/icon/Tango/22/mimetypes/media-image.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-remote.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/network-server.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/network-workgroup.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-desktop.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-home.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-trash-full.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/user-trash.png":[22,22,"png","qx"]},"translations":{}};

qx.Part.$$notifyLoad("6ac6e69d830a", function() {
(function(){var e="right",d="above",c="left",b="under",a="qx.ui.tree.SelectionManager";
qx.Class.define(a,{extend:qx.ui.core.selection.ScrollArea,members:{_getSelectableLocationY:function(f){var g=f.getBounds();

if(g){var top=this._getWidget().getItemTop(f);
return {top:top,bottom:top+g.height};
}},_isSelectable:function(h){return this._isItemSelectable(h)&&h instanceof qx.ui.tree.AbstractTreeItem;
},_getSelectableFromMouseEvent:function(event){return this._getWidget().getTreeItem(event.getTarget());
},getSelectables:function(j){var m=false;

if(!j){m=this._userInteraction;
this._userInteraction=true;
}var l=this._getWidget();
var n=[];

if(l.getRoot()!=null){var k=l.getRoot().getItems(true,!!j,l.getHideRoot());

for(var i=0;i<k.length;i++){if(this._isSelectable(k[i])){n.push(k[i]);
}}}this._userInteraction=m;
return n;
},_getSelectableRange:function(o,p){if(o===p){return [o];
}var q=this.getSelectables();
var r=q.indexOf(o);
var s=q.indexOf(p);

if(r<0||s<0){return [];
}
if(r<s){return q.slice(r,s+1);
}else{return q.slice(s,r+1);
}},_getFirstSelectable:function(){return this.getSelectables()[0]||null;
},_getLastSelectable:function(){var t=this.getSelectables();

if(t.length>0){return t[t.length-1];
}else{return null;
}},_getRelatedSelectable:function(u,v){var w=this._getWidget();
var x=null;

switch(v){case d:x=w.getPreviousNodeOf(u,false);
break;
case b:x=w.getNextNodeOf(u,false);
break;
case c:case e:break;
}
if(!x){return null;
}
if(this._isSelectable(x)){return x;
}else{return this._getRelatedSelectable(x,v);
}}}});
})();
(function(){var i="opened",h="click",g="changeOpen",f="Boolean",d="qx.ui.tree.FolderOpenButton",c="_applyOpen",b="mouseup",a="mousedown";
qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MExecutable,construct:function(){qx.ui.basic.Image.call(this);
this.initOpen();
this.addListener(h,this._onClick);
this.addListener(a,this._stopPropagation,this);
this.addListener(b,this._stopPropagation,this);
},properties:{open:{check:f,init:false,event:g,apply:c}},members:{_applyOpen:function(j,k){j?this.addState(i):this.removeState(i);
this.execute();
},_stopPropagation:function(e){e.stopPropagation();
},_onClick:function(e){this.toggleOpen();
e.stopPropagation();
}}});
})();
(function(){var l="dblclick",k="click",j="Boolean",h="excluded",g="visible",f="qx.event.type.Data",d="_applyOpenMode",c="Space",b="Left",a="Enter",z="changeOpenMode",y="_applyRootOpenClose",x="changeSelection",w="qx.ui.tree.Tree",v="tree",u="_applyHideRoot",t="changeRoot",s="_applyRoot",r="keypress",q="none",o="pane",p="Right",m="qx.ui.tree.AbstractTreeItem",n="__sv";
qx.Class.define(w,{extend:qx.ui.core.scroll.AbstractScrollArea,implement:[qx.ui.core.IMultiSelection,qx.ui.form.IModelSelection,qx.ui.form.IForm],include:[qx.ui.core.MMultiSelectionHandling,qx.ui.core.MContentPadding,qx.ui.form.MModelSelection,qx.ui.form.MForm],construct:function(){qx.ui.core.scroll.AbstractScrollArea.call(this);
this.__sv=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({allowShrinkY:false,allowGrowX:true});
this.getChildControl(o).add(this.__sv);
this.initOpenMode();
this.initRootOpenClose();
this.addListener(x,this._onChangeSelection,this);
this.addListener(r,this._onKeyPress,this);
},events:{addItem:f,removeItem:f},properties:{openMode:{check:[k,l,q],init:l,apply:d,event:z,themeable:true},root:{check:m,init:null,nullable:true,event:t,apply:s},hideRoot:{check:j,init:false,apply:u},rootOpenClose:{check:j,init:false,apply:y},appearance:{refine:true,init:v},focusable:{refine:true,init:true}},members:{__sv:null,SELECTION_MANAGER:qx.ui.tree.SelectionManager,getChildrenContainer:function(){return this.__sv;
},_applyRoot:function(A,B){var C=this.getChildrenContainer();

if(B){C.remove(B);

if(B.hasChildren()){C.remove(B.getChildrenContainer());
}}
if(A){C.add(A);

if(A.hasChildren()){C.add(A.getChildrenContainer());
}A.setVisibility(this.getHideRoot()?h:g);
A.recursiveAddToWidgetQueue();
}},_applyHideRoot:function(D,E){var F=this.getRoot();

if(!F){return;
}F.setVisibility(D?h:g);
F.recursiveAddToWidgetQueue();
},_applyRootOpenClose:function(G,H){var I=this.getRoot();

if(!I){return;
}I.recursiveAddToWidgetQueue();
},_getContentPaddingTarget:function(){return this.__sv;
},getNextNodeOf:function(J,K){if((K!==false||J.isOpen())&&J.hasChildren()){return J.getChildren()[0];
}
while(J){var parent=J.getParent();

if(!parent){return null;
}var M=parent.getChildren();
var L=M.indexOf(J);

if(L>-1&&L<M.length-1){return M[L+1];
}J=parent;
}return null;
},getPreviousNodeOf:function(N,O){var parent=N.getParent();

if(!parent){return null;
}
if(this.getHideRoot()){if(parent==this.getRoot()){if(parent.getChildren()[0]==N){return null;
}}}else{if(N==this.getRoot()){return null;
}}var R=parent.getChildren();
var P=R.indexOf(N);

if(P>0){var Q=R[P-1];

while((O!==false||Q.isOpen())&&Q.hasChildren()){var S=Q.getChildren();
Q=S[S.length-1];
}return Q;
}else{return parent;
}},getNextSiblingOf:function(T){if(T==this.getRoot()){return null;
}var parent=T.getParent();
var U=parent.getChildren();
var V=U.indexOf(T);

if(V<U.length-1){return U[V+1];
}return null;
},getPreviousSiblingOf:function(W){if(W==this.getRoot()){return null;
}var parent=W.getParent();
var X=parent.getChildren();
var Y=X.indexOf(W);

if(Y>0){return X[Y-1];
}return null;
},getItems:function(ba,bb){if(this.getRoot()!=null){return this.getRoot().getItems(ba,bb,this.getHideRoot());
}else{return [];
}},getChildren:function(){if(this.getRoot()!=null){return [this.getRoot()];
}else{return [];
}},getTreeItem:function(bc){while(bc){if(bc==this){return null;
}
if(bc instanceof qx.ui.tree.AbstractTreeItem){return bc;
}bc=bc.getLayoutParent();
}return null;
},_applyOpenMode:function(bd,be){if(be==k){this.removeListener(k,this._onOpen,this);
}else if(be==l){this.removeListener(l,this._onOpen,this);
}
if(bd==k){this.addListener(k,this._onOpen,this);
}else if(bd==l){this.addListener(l,this._onOpen,this);
}},_onOpen:function(e){var bf=this.getTreeItem(e.getTarget());

if(!bf||!bf.isOpenable()){return;
}bf.setOpen(!bf.isOpen());
e.stopPropagation();
},_onChangeSelection:function(e){var bh=e.getData();
for(var i=0;i<bh.length;i++){var bg=bh[i];
while(bg.getParent()!=null){bg=bg.getParent();
bg.setOpen(true);
}}},_onKeyPress:function(e){var bi=this._getLeadItem();

if(bi!==null){switch(e.getKeyIdentifier()){case b:if(bi.isOpenable()&&bi.isOpen()){bi.setOpen(false);
}break;
case p:if(bi.isOpenable()&&!bi.isOpen()){bi.setOpen(true);
}break;
case a:case c:if(bi.isOpenable()){bi.toggleOpen();
}break;
}}}},destruct:function(){this._disposeObjects(n);
}});
})();
(function(){var m="open",k="icon",j="auto",h="middle",g="String",f="label",d="changeOpen",c="excluded",b="visible",a="opened",H="always",G="qx.ui.tree.AbstractTreeItem",F="_applyIconOpened",E="Boolean",D="__px",C="Integer",B="_applyIndent",A="changeOpenSymbolMode",z="_applyOpenSymbolMode",y="__pu",t="__pt",u="resize",r="",s="removeItem",p="addItem",q="iconOpened",n="abstract",o="never",v="_applyIcon",w="_applyOpen",x="_applyLabel";
qx.Class.define(G,{extend:qx.ui.core.Widget,type:n,include:[qx.ui.form.MModelProperty],implement:[qx.ui.form.IModel],construct:function(){qx.ui.core.Widget.call(this);
this.__pt=[];
this._setLayout(new qx.ui.layout.HBox());
this._addWidgets();
this.initOpen();
},properties:{open:{check:E,init:false,event:d,apply:w},openSymbolMode:{check:[H,o,j],init:j,event:A,apply:z},indent:{check:C,init:19,apply:B,themeable:true},parent:{check:G,nullable:true},icon:{check:g,apply:v,nullable:true,themeable:true},iconOpened:{check:g,apply:F,nullable:true,themeable:true},label:{check:g,apply:x,init:r}},members:{__pt:null,__pu:null,__pv:null,__pw:null,__px:null,__py:null,_addWidgets:function(){throw new Error("Abstract method call.");
},_createChildControlImpl:function(I,J){var K;

switch(I){case f:K=new qx.ui.basic.Label().set({alignY:h,value:this.getLabel()});
break;
case k:K=new qx.ui.basic.Image().set({alignY:h,source:this.getIcon()});
break;
case m:K=new qx.ui.tree.FolderOpenButton().set({alignY:h});
K.addListener(d,this._onChangeOpen,this);
K.addListener(u,this._updateIndent,this);
break;
}return K||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,I);
},getTree:function(){var M=this;

while(M.getParent()){M=M.getParent();
}var L=M.getLayoutParent()?M.getLayoutParent().getLayoutParent():0;

if(L&&L instanceof qx.ui.core.scroll.ScrollPane){return L.getLayoutParent();
}return null;
},addWidget:function(N,O){this._add(N,O);
},addSpacer:function(){if(!this.__px){this.__px=new qx.ui.core.Spacer();
}else{this._remove(this.__px);
}this._add(this.__px);
},addOpenButton:function(){this._add(this.getChildControl(m));
},_onChangeOpen:function(e){if(this.isOpenable()){this.setOpen(e.getData());
}},addIcon:function(){var P=this.getChildControl(k);

if(this.__pw){this._remove(P);
}this._add(P);
this.__pw=true;
},addLabel:function(Q){var R=this.getChildControl(f);

if(this.__pv){this._remove(R);
}
if(Q){this.setLabel(Q);
}else{R.setValue(this.getLabel());
}this._add(R);
this.__pv=true;
},addState:function(S){qx.ui.core.Widget.prototype.addState.call(this,S);
var U=this._getChildren();

for(var i=0,l=U.length;i<l;i++){var T=U[i];

if(T.addState){U[i].addState(S);
}}},removeState:function(V){qx.ui.core.Widget.prototype.removeState.call(this,V);
var X=this._getChildren();

for(var i=0,l=X.length;i<l;i++){var W=X[i];

if(W.addState){X[i].removeState(V);
}}},_applyIcon:function(Y,ba){if(!this.__pA()){this.__pB(Y);
}else if(!this.isOpen()){this.__pB(Y);
}},_applyIconOpened:function(bb,bc){if(this.isOpen()){if(this.__pz()&&this.__pA()){this.__pB(bb);
}else if(!this.__pz()&&this.__pA()){this.__pB(bb);
}}},_applyLabel:function(bd,be){var bf=this.getChildControl(f,true);

if(bf){bf.setValue(bd);
}},_applyOpen:function(bg,bh){if(this.hasChildren()){this.getChildrenContainer().setVisibility(bg?b:c);
}var open=this.getChildControl(m,true);

if(open){open.setOpen(bg);
}var bi;
if(bg){bi=this.__pA()?this.getIconOpened():null;
}else{bi=this.getIcon();
}
if(bi){this.__pB(bi);
}bg?this.addState(a):this.removeState(a);
},__pz:function(){return qx.util.PropertyUtil.getUserValue(this,k);
},__pA:function(){return qx.util.PropertyUtil.getUserValue(this,q);
},__pB:function(bj){var bk=this.getChildControl(k,true);

if(bk){bk.setSource(bj);
}},isOpenable:function(){var bl=this.getOpenSymbolMode();
return (bl===H||bl===j&&this.hasChildren());
},_shouldShowOpenSymbol:function(){var open=this.getChildControl(m,true);

if(!open){return false;
}var bm=this.getTree();

if(!bm.getRootOpenClose()){if(bm.getHideRoot()){if(bm.getRoot()==this.getParent()){return false;
}}else{if(bm.getRoot()==this){return false;
}}}return this.isOpenable();
},_applyOpenSymbolMode:function(bn,bo){this._updateIndent();
},_updateIndent:function(){if(!this.getTree()){return;
}var bq=0;
var open=this.getChildControl(m,true);

if(open){if(this._shouldShowOpenSymbol()){open.show();
var bp=open.getBounds();

if(bp){bq=bp.width;
}else{return;
}}else{open.exclude();
}}
if(this.__px){this.__px.setWidth((this.getLevel()+1)*this.getIndent()-bq);
}},_applyIndent:function(br,bs){this._updateIndent();
},getLevel:function(){var bt=this.getTree();

if(!bt){return;
}var bu=this;
var bv=-1;

while(bu){bu=bu.getParent();
bv+=1;
}if(bt.getHideRoot()){bv-=1;
}
if(!bt.getRootOpenClose()){bv-=1;
}return bv;
},syncWidget:function(){this._updateIndent();
},getChildrenContainer:function(){if(!this.__pu){this.__pu=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({visibility:this.isOpen()?b:c});
}return this.__pu;
},hasChildrenContainer:function(){return this.__pu;
},getParentChildrenContainer:function(){if(this.getParent()){return this.getParent().getChildrenContainer();
}else if(this.getLayoutParent()){return this.getLayoutParent();
}else{return null;
}},getChildren:function(){return this.__pt;
},hasChildren:function(){return this.__pt?this.__pt.length>0:false;
},getItems:function(bw,bx,by){if(by!==false){var bz=[];
}else{var bz=[this];
}var bC=this.hasChildren()&&(bx!==false||this.isOpen());

if(bC){var bB=this.getChildren();

if(bw===false){bz=bz.concat(bB);
}else{for(var i=0,bA=bB.length;i<bA;i++){bz=bz.concat(bB[i].getItems(bw,bx,false));
}}}return bz;
},recursiveAddToWidgetQueue:function(){var bD=this.getItems(true,true,false);

for(var i=0,l=bD.length;i<l;i++){qx.ui.core.queue.Widget.add(bD[i]);
}},__pC:function(){if(this.getParentChildrenContainer()){this.getParentChildrenContainer()._addAfter(this.getChildrenContainer(),this);
}},add:function(bE){var bF=this.getChildrenContainer();
var bI=this.getTree();

for(var i=0,l=arguments.length;i<l;i++){var bJ=arguments[i];
var bH=bJ.getParent();

if(bH){bH.remove(bJ);
}bJ.setParent(this);
var bG=this.hasChildren();
bF.add(bJ);

if(bJ.hasChildren()){bF.add(bJ.getChildrenContainer());
}this.__pt.push(bJ);

if(!bG){this.__pC();
}
if(bI){bJ.recursiveAddToWidgetQueue();
bI.fireNonBubblingEvent(p,qx.event.type.Data,[bJ]);
}}
if(bI){qx.ui.core.queue.Widget.add(this);
}},addAt:function(bK,bL){{};

if(bL==this.__pt.length){this.add(bK);
return;
}var bP=bK.getParent();

if(bP){bP.remove(bK);
}var bN=this.getChildrenContainer();
bK.setParent(this);
var bO=this.hasChildren();
var bM=this.__pt[bL];
bN.addBefore(bK,bM);

if(bK.hasChildren()){bN.addAfter(bK.getChildrenContainer(),bK);
}qx.lang.Array.insertAt(this.__pt,bK,bL);

if(!bO){this.__pC();
}
if(this.getTree()){bK.recursiveAddToWidgetQueue();
qx.ui.core.queue.Widget.add(this);
}},addBefore:function(bQ,bR){{};
var bS=bQ.getParent();

if(bS){bS.remove(bQ);
}this.addAt(bQ,this.__pt.indexOf(bR));
},addAfter:function(bT,bU){{};
var bV=bT.getParent();

if(bV){bV.remove(bT);
}this.addAt(bT,this.__pt.indexOf(bU)+1);
},addAtBegin:function(bW){this.addAt(bW,0);
},remove:function(bX){for(var i=0,l=arguments.length;i<l;i++){var cc=arguments[i];

if(this.__pt.indexOf(cc)==-1){this.warn("Cannot remove treeitem '"+cc+"'. It is not a child of this tree item.");
return;
}var bY=this.getChildrenContainer();

if(cc.hasChildrenContainer()){var cb=cc.getChildrenContainer();

if(bY.getChildren().indexOf(cb)>=0){bY.remove(cb);
}}qx.lang.Array.remove(this.__pt,cc);
cc.setParent(null);
bY.remove(cc);
}var ca=this.getTree();

if(ca){ca.fireNonBubblingEvent(s,qx.event.type.Data,[cc]);
}qx.ui.core.queue.Widget.add(this);
},removeAt:function(cd){var ce=this.__pt[cd];

if(ce){this.remove(ce);
}},removeAll:function(){for(var i=this.__pt.length-1;i>=0;i--){this.remove(this.__pt[i]);
}}},destruct:function(){this._disposeArray(t);
this._disposeObjects(D,y);
}});
})();
(function(){var b="tree-folder",a="qx.ui.tree.TreeFolder";
qx.Class.define(a,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:b}},members:{_addWidgets:function(){this.addSpacer();
this.addOpenButton();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var b="qx.ui.tree.TreeFile",a="tree-file";
qx.Class.define(b,{extend:qx.ui.tree.AbstractTreeItem,construct:function(c){qx.ui.tree.AbstractTreeItem.call(this);

if(c){this.setLabel(c);
}},properties:{appearance:{refine:true,init:a}},members:{_addWidgets:function(){this.addSpacer();
this.addIcon();
this.addLabel();
}}});
})();
(function(){var k="Trash",j="icon/22/devices/drive-harddisk.png",h="middle",g="Windows (C:)",f="Simple View",e="Documents (D:)",d="icon/22/places/user-desktop.png",c="Inbox",b="Desktop",a="DVD (E:)",K="icon/22/actions/mail-mark-junk.png",J="rgb(228,228,228)",I="Network",H="Junk",G="Sent",F="Files",E="Important",D="multi",C="Home",B="icon/22/devices/drive-optical.png",r="icon/22/apps/internet-mail.png",s="icon/22/places/user-trash-full.png",p="Workspace",q="Junk #",n="icon/22/apps/office-chart.png",o="Data",l="May ",m="kb",t="icon/22/places/user-trash.png",u="icon/22/places/user-home.png",w="showcase.page.tree.Content",v="icon/22/places/network-server.png",y="icon/22/actions/document-send.png",x="icon/22/actions/mail-message-new.png",A=" 2005",z="icon/22/actions/mail-mark-important.png";
qx.Class.define(w,{extend:showcase.page.AbstractDesktopContent,construct:function(L){showcase.page.AbstractDesktopContent.call(this,L);
var M=this.__KK();
this.getView().add(M);
M.moveTo(260,20);
M.open();
},members:{_addWindowContent:function(N){N.set({caption:f,minWidth:200});
N.setLayout(new qx.ui.layout.Grow());
var Y=new qx.ui.tree.Tree().set({width:200,height:400,selectionMode:D,dragSelection:true,decorator:null,backgroundColor:J});
N.add(Y);
var be=new qx.ui.tree.TreeFolder(C).set({icon:u});
be.setOpen(true);
Y.setRoot(be);
var bc=new qx.ui.tree.TreeFolder(b).set({icon:d});
bc.setOpen(true);
be.add(bc);
var T=new qx.ui.tree.TreeFolder(F);
var R=new qx.ui.tree.TreeFolder(p);
var S=new qx.ui.tree.TreeFolder(I).set({icon:v});
var Q=new qx.ui.tree.TreeFolder(k).set({icon:t});
bc.add(T,R,S,Q);
var ba=new qx.ui.tree.TreeFile(g).set({icon:j});
var P=new qx.ui.tree.TreeFile(e).set({icon:j});
var O=new qx.ui.tree.TreeFile(a).set({icon:B});
R.add(ba,P,O);
var bd=new qx.ui.tree.TreeFolder(c).set({icon:r,open:true});
var U=new qx.ui.tree.TreeFolder(H).set({icon:K});
var X=new qx.ui.tree.TreeFolder(G).set({icon:y});
var W=new qx.ui.tree.TreeFolder(k).set({icon:s});

for(var i=0;i<30;i++){W.add(new qx.ui.tree.TreeFile(q+i).set({icon:x}));
}var bb=new qx.ui.tree.TreeFolder(o).set({icon:n});
var V=new qx.ui.tree.TreeFolder(E).set({icon:z});
bd.add(U,X,W,bb,V);
be.add(bd);
},__KK:function(){var bl=new qx.ui.window.Window().set({showClose:false,showMinimize:false,width:310,height:425,minWidth:200,caption:"Detailed View",layout:new qx.ui.layout.Grow(),contentPadding:0});
var bN=new qx.ui.tree.Tree().set({width:600,height:500,decorator:null,selectionMode:"multi",dragSelection:true,backgroundColor:"rgb(228,228,228)"});
bl.add(bN);
var bO=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Home","icon/22/places/user-home.png");
bO.setOpen(true);
bN.setRoot(bO);
var bG=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Desktop","icon/22/places/user-desktop.png");
bG.setOpen(true);
bO.add(bG);
var bj=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Files");
var bh=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Workspace");
var bi=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Network","icon/22/places/network-server.png");
var bg=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Trash","icon/22/places/user-trash-full.png");
bG.add(bj,bh,bi,bg);
var bM=this.configureTreeItem(new qx.ui.tree.TreeFile(),"Windows (C:)","icon/22/devices/drive-harddisk.png");
var bL=this.configureTreeItem(new qx.ui.tree.TreeFile(),"Documents (D:)","icon/22/devices/drive-harddisk.png");
bh.add(bM,bL);
var bH=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Inbox","icon/22/apps/internet-mail.png");
bH.setOpen(true);
var bk=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Junk","icon/22/actions/mail-mark-junk.png");
var bn=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Sent","icon/22/actions/document-send.png");
var bm=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Trash","icon/22/places/user-trash.png");
var bp=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Data","icon/22/apps/office-chart.png");
var bo=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Edit");
var bB=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Chat");
var bA=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Pustefix");
var bz=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"TINC");
var bK=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Announce");
var bJ=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Devel");
bz.add(bK,bJ);
bo.add(bB,bA,bz);
var br=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Lists");
var bw=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Relations");
var bx=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Company");
var by=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Questions");
var bs=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Internal");
var bt=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Products");
var bu=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Press");
var bv=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Development");
var bC=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Competition");
br.add(bw,bx,by,bs,bt,bu,bv,bC);
var bq=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Personal");
var bE=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Bugs");
var bI=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Family");
var bF=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Projects");
var bD=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Holiday");
bq.add(bE,bI,bF,bD);
var bf=this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Images");

for(var i=0;i<50;i++){bf.add(this.configureTreeItem(new qx.ui.tree.TreeFolder(),"Vacation"+(i+1),"icon/22/mimetypes/media-image.png"));
}bH.add(bk,bn,bm,bp,bo,br,bq,bf);
bO.add(bH);
return bl;
},configureTreeItem:function(bP,bQ,bR){bP.addSpacer();

if(bP instanceof qx.ui.tree.TreeFolder){bP.addOpenButton();
}bP.addIcon();

if(arguments.length>=3){bP.setIcon(bR);
}bP.addLabel(bQ);
bP.addWidget(new qx.ui.core.Spacer(),{flex:1});
var bS=new qx.ui.basic.Label(Math.round(Math.random()*99)+m);
bS.setWidth(30);
bS.setAlignY(h);
bS.setMargin([0,8]);
bP.addWidget(bS);
bS=new qx.ui.basic.Label(l+Math.round(Math.random()*30+1)+A);
bS.setWidth(80);
bS.setAlignY(h);
bP.addWidget(bS);
return bP;
}}});
})();

});