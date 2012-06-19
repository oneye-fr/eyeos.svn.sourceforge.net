qx.$$packageData['0f717aec848f']={"locales":{},"resources":{"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/media-audio.png":[16,16,"png","qx"],"qx/icon/Tango/16/status/dialog-warning.png":[16,16,"png","qx"]},"translations":{"C":{},"de":{"%1 of %2 rows":"%1 von %2 Zeilen","%1 rows":"%1 Zeilen","Reset column widths":"Spaltenbreite zurücksetzen","one of one row":"Eine von einer Zeile","one row":"Eine Zeile"},"de_AT":{},"de_DE":{},"en":{},"en_GB":{},"en_US":{},"es":{"%1 of %2 rows":"%1 de %2 filas","%1 rows":"%1 filas","Reset column widths":"Reestablecer anchos de columnas","one of one row":"una de una fila","one row":"una fila"},"es_ES":{},"es_MX":{},"ro":{"%1 of %2 rows":"%1 din %2 rânduri","%1 rows":"%1 rânduri","Reset column widths":"Resetează lățimea coloanei","one of one row":"unul din un rând","one row":"un rând"}}};

qx.Part.$$notifyLoad("0f717aec848f", function() {
(function(){var a="qx.ui.table.ICellRenderer";
qx.Interface.define(a,{members:{createDataCellHtml:function(b,c){return true;
}}});
})();
(function(){var j="",i="px;",h=".qooxdoo-table-cell {",g="qooxdoo-table-cell",f='" ',e="nowrap",d="default",c="qx.client",b="}",a="width:",H=".qooxdoo-table-cell-right { text-align:right } ",G="0px 6px",F='<div class="',E="0px",D="height:",C="1px solid ",B=".qooxdoo-table-cell-bold { font-weight:bold } ",A="table-row-line",z="String",y='>',q="mshtml",r='</div>',o="ellipsis",p="content-box",m='left:',n="qx.ui.table.cellrenderer.Abstract",k='" style="',l="abstract",s="none",t="hidden",v="} ",u='px;',x=".qooxdoo-table-cell-italic { font-style:italic} ",w="absolute";
qx.Class.define(n,{type:l,implement:qx.ui.table.ICellRenderer,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
var I=qx.ui.table.cellrenderer.Abstract;

if(!I.__wp){var K=qx.theme.manager.Color.getInstance();
I.__wp=this.self(arguments);
var J=h+
qx.bom.element.Style.compile({position:w,top:E,overflow:t,whiteSpace:e,borderRight:C+K.resolve(A),padding:G,cursor:d,textOverflow:o,userSelect:s})+v+H+x+B;

if(!qx.core.Variant.isSet(c,q)){J+=h+qx.bom.element.BoxSizing.compile(p)+b;
}I.__wp.stylesheet=qx.bom.Stylesheet.createElement(J);
}},properties:{defaultCellStyle:{init:null,check:z,nullable:true}},members:{_insetX:6+6+1,_insetY:0,_getCellClass:function(L){return g;
},_getCellStyle:function(M){return M.style||j;
},_getCellAttributes:function(N){return j;
},_getContentHtml:function(O){return O.value||j;
},_getCellSizeStyle:function(P,Q,R,S){var T=j;

if(qx.bom.client.Feature.CONTENT_BOX){P-=R;
Q-=S;
}T+=a+Math.max(P,0)+i;
T+=D+Math.max(Q,0)+i;
return T;
},createDataCellHtml:function(U,V){V.push(F,this._getCellClass(U),k,m,U.styleLeft,u,this._getCellSizeStyle(U.styleWidth,U.styleHeight,this._insetX,this._insetY),this._getCellStyle(U),f,this._getCellAttributes(U),y+this._getContentHtml(U),r);
}}});
})();
(function(){var b="qx.ui.table.IColumnMenuItem",a="qx.event.type.Data";
qx.Interface.define(b,{properties:{visible:{}},events:{changeVisible:a}});
})();
(function(){var i="icon",h="label",g="String",f="sort-icon",e="_applySortIcon",d="_applyIcon",c="table-header-cell",b="qx.ui.table.headerrenderer.HeaderCell",a="_applyLabel";
qx.Class.define(b,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this);
var j=new qx.ui.layout.Grid();
j.setRowFlex(0,1);
j.setColumnFlex(1,1);
j.setColumnFlex(2,1);
this.setLayout(j);
},properties:{appearance:{refine:true,init:c},label:{check:g,init:null,nullable:true,apply:a},sortIcon:{check:g,init:null,nullable:true,apply:e,themeable:true},icon:{check:g,init:null,nullable:true,apply:d}},members:{_applyLabel:function(k,l){if(k){this._showChildControl(h).setValue(k);
}else{this._excludeChildControl(h);
}},_applySortIcon:function(m,n){if(m){this._showChildControl(f).setSource(m);
}else{this._excludeChildControl(f);
}},_applyIcon:function(o,p){if(o){this._showChildControl(i).setSource(o);
}else{this._excludeChildControl(i);
}},_createChildControlImpl:function(q,r){var s;

switch(q){case h:s=new qx.ui.basic.Label(this.getLabel()).set({anonymous:true,allowShrinkX:true});
this._add(s,{row:0,column:1});
break;
case f:s=new qx.ui.basic.Image(this.getSortIcon());
s.setAnonymous(true);
this._add(s,{row:0,column:2});
break;
case i:s=new qx.ui.basic.Image(this.getIcon()).set({anonymous:true,allowShrinkX:true});
this._add(s,{row:0,column:0});
break;
}return s||qx.ui.container.Composite.prototype._createChildControlImpl.call(this,q);
}}});
})();
(function(){var c="qx.event.type.Data",b="qx.event.type.Event",a="qx.ui.table.ITableModel";
qx.Interface.define(a,{events:{"dataChanged":c,"metaDataChanged":b,"sorted":c},members:{getRowCount:function(){},getRowData:function(d){},getColumnCount:function(){},getColumnId:function(e){},getColumnIndexById:function(f){},getColumnName:function(g){},isColumnEditable:function(h){},isColumnSortable:function(i){},sortByColumn:function(j,k){},getSortColumnIndex:function(){},isSortAscending:function(){},prefetchRows:function(l,m){},getValue:function(n,o){},getValueById:function(p,q){},setValue:function(r,s,t){},setValueById:function(u,v,w){}}});
})();
(function(){var a="qx.ui.table.IColumnMenuButton";
qx.Interface.define(a,{properties:{menu:{}},members:{factory:function(b,c){return true;
},empty:function(){return true;
}}});
})();
(function(){var h="",g="number",f="Boolean",e="qx.ui.table.cellrenderer.Default",d=" qooxdoo-table-cell-bold",c=" qooxdoo-table-cell-right",b=" qooxdoo-table-cell-italic",a="string";
qx.Class.define(e,{extend:qx.ui.table.cellrenderer.Abstract,statics:{STYLEFLAG_ALIGN_RIGHT:1,STYLEFLAG_BOLD:2,STYLEFLAG_ITALIC:4,_numberFormat:null},properties:{useAutoAlign:{check:f,init:true}},members:{_getStyleFlags:function(i){if(this.getUseAutoAlign()){if(typeof i.value==g){return qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT;
}}return 0;
},_getCellClass:function(j){var k=qx.ui.table.cellrenderer.Abstract.prototype._getCellClass.call(this,j);

if(!k){return h;
}var l=this._getStyleFlags(j);

if(l&qx.ui.table.cellrenderer.Default.STYLEFLAG_ALIGN_RIGHT){k+=c;
}
if(l&qx.ui.table.cellrenderer.Default.STYLEFLAG_BOLD){k+=d;
}
if(l&qx.ui.table.cellrenderer.Default.STYLEFLAG_ITALIC){k+=b;
}return k;
},_getContentHtml:function(m){return qx.bom.String.escape(this._formatValue(m));
},_formatValue:function(n){var p=n.value;
var o;

if(p==null){return h;
}
if(typeof p==a){return p;
}else if(typeof p==g){if(!qx.ui.table.cellrenderer.Default._numberFormat){qx.ui.table.cellrenderer.Default._numberFormat=new qx.util.format.NumberFormat();
qx.ui.table.cellrenderer.Default._numberFormat.setMaximumFractionDigits(2);
}var o=qx.ui.table.cellrenderer.Default._numberFormat.format(p);
}else if(p instanceof Date){o=qx.util.format.DateFormat.getDateInstance().format(p);
}else{o=p;
}return o;
}}});
})();
(function(){var o="==",n="",m=">",l="between",k="<",j="regex",h="!between",g=">=",f="!=",e="<=",b=";",d='g',c=":",a="qx.ui.table.cellrenderer.Conditional";
qx.Class.define(a,{extend:qx.ui.table.cellrenderer.Default,construct:function(p,q,r,s){qx.ui.table.cellrenderer.Default.call(this);
this.numericAllowed=[o,f,m,k,g,e];
this.betweenAllowed=[l,h];
this.conditions=[];
this.__AR=p||"";
this.__AS=q||"";
this.__AT=r||"";
this.__AU=s||"";
},members:{__AR:null,__AS:null,__AT:null,__AU:null,__AV:function(t,u){if(t[1]!=null){u["text-align"]=t[1];
}
if(t[2]!=null){u["color"]=t[2];
}
if(t[3]!=null){u["font-style"]=t[3];
}
if(t[4]!=null){u["font-weight"]=t[4];
}},addNumericCondition:function(v,w,x,y,z,A,B){var C=null;

if(qx.lang.Array.contains(this.numericAllowed,v)){if(w!=null){C=[v,x,y,z,A,w,B];
}}
if(C!=null){this.conditions.push(C);
}else{throw new Error("Condition not recognized or value is null!");
}},addBetweenCondition:function(D,E,F,G,H,I,J,K){if(qx.lang.Array.contains(this.betweenAllowed,D)){if(E!=null&&F!=null){var L=[D,G,H,I,J,E,F,K];
}}
if(L!=null){this.conditions.push(L);
}else{throw new Error("Condition not recognized or value1/value2 is null!");
}},addRegex:function(M,N,O,P,Q,R){if(M!=null){var S=[j,N,O,P,Q,M,R];
}
if(S!=null){this.conditions.push(S);
}else{throw new Error("regex cannot be null!");
}},_getCellStyle:function(T){if(!this.conditions.length){return T.style||n;
}var Y=T.table.getTableModel();
var i;
var bb;
var U;
var W={"text-align":this.__AR,"color":this.__AS,"font-style":this.__AT,"font-weight":this.__AU};

for(i in this.conditions){bb=false;

if(qx.lang.Array.contains(this.numericAllowed,this.conditions[i][0])){if(this.conditions[i][6]==null){U=T.value;
}else{U=Y.getValueById(this.conditions[i][6],T.row);
}
switch(this.conditions[i][0]){case o:if(U==this.conditions[i][5]){bb=true;
}break;
case f:if(U!=this.conditions[i][5]){bb=true;
}break;
case m:if(U>this.conditions[i][5]){bb=true;
}break;
case k:if(U<this.conditions[i][5]){bb=true;
}break;
case g:if(U>=this.conditions[i][5]){bb=true;
}break;
case e:if(U<=this.conditions[i][5]){bb=true;
}break;
}}else if(qx.lang.Array.contains(this.betweenAllowed,this.conditions[i][0])){if(this.conditions[i][7]==null){U=T.value;
}else{U=Y.getValueById(this.conditions[i][7],T.row);
}
switch(this.conditions[i][0]){case l:if(U>=this.conditions[i][5]&&U<=this.conditions[i][6]){bb=true;
}break;
case h:if(U<this.conditions[i][5]&&U>this.conditions[i][6]){bb=true;
}break;
}}else if(this.conditions[i][0]==j){if(this.conditions[i][6]==null){U=T.value;
}else{U=Y.getValueById(this.conditions[i][6],T.row);
}var V=new RegExp(this.conditions[i][5],d);
bb=V.test(U);
}if(bb==true){this.__AV(this.conditions[i],W);
}}var ba=[];

for(var X in W){if(W[X]){ba.push(X,c,W[X],b);
}}return ba.join(n);
}},destruct:function(){this.numericAllowed=this.betweenAllowed=this.conditions=null;
}});
})();
(function(){var a="qx.ui.table.ICellEditorFactory";
qx.Interface.define(a,{members:{createCellEditor:function(b){return true;
},getCellEditorValue:function(c){return true;
}}});
})();
(function(){var f="",e="Function",d="abstract",c="number",b="appear",a="qx.ui.table.celleditor.AbstractField";
qx.Class.define(a,{extend:qx.core.Object,implement:qx.ui.table.ICellEditorFactory,type:d,properties:{validationFunction:{check:e,nullable:true,init:null}},members:{_createEditor:function(){throw new Error("Abstract method call!");
},createCellEditor:function(g){var h=this._createEditor();
h.originalValue=g.value;

if(g.value===null||g.value===undefined){g.value=f;
}h.setValue(f+g.value);
h.addListener(b,function(){h.selectAllText();
});
return h;
},getCellEditorValue:function(i){var k=i.getValue();
var j=this.getValidationFunction();

if(j){k=j(k,i.originalValue);
}
if(typeof i.originalValue==c){k=parseFloat(k);
}return k;
}}});
})();
(function(){var c="number",b="qx.ui.table.celleditor.TextField",a="table-editor-textfield";
qx.Class.define(b,{extend:qx.ui.table.celleditor.AbstractField,members:{getCellEditorValue:function(d){var f=d.getValue();
var e=this.getValidationFunction();

if(e){f=e(f,d.originalValue);
}
if(typeof d.originalValue==c){if(f!=null){f=parseFloat(f);
}}return f;
},_createEditor:function(){var g=new qx.ui.form.TextField();
g.setAppearance(a);
return g;
}}});
})();
(function(){var a="qx.ui.table.IHeaderRenderer";
qx.Interface.define(a,{members:{createHeaderCell:function(b){return true;
},updateHeaderCell:function(c,d){return true;
}}});
})();
(function(){var b="qx.ui.table.headerrenderer.Default",a="String";
qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.table.IHeaderRenderer,statics:{STATE_SORTED:"sorted",STATE_SORTED_ASCENDING:"sortedAscending"},properties:{toolTip:{check:a,init:null,nullable:true}},members:{createHeaderCell:function(c){var d=new qx.ui.table.headerrenderer.HeaderCell();
this.updateHeaderCell(c,d);
return d;
},updateHeaderCell:function(e,f){var g=qx.ui.table.headerrenderer.Default;
if(e.name&&e.name.translate){f.setLabel(e.name.translate());
}else{f.setLabel(e.name);
}var h=f.getToolTip();

if(this.getToolTip()!=null){if(h==null){h=new qx.ui.tooltip.ToolTip(this.getToolTip());
f.setToolTip(h);
qx.util.DisposeUtil.disposeTriggeredBy(h,f);
}else{h.setLabel(this.getToolTip());
}}e.sorted?f.addState(g.STATE_SORTED):f.removeState(g.STATE_SORTED);
e.sortedAscending?f.addState(g.STATE_SORTED_ASCENDING):f.removeState(g.STATE_SORTED_ASCENDING);
}}});
})();
(function(){var c="",b="qx.ui.table.headerrenderer.Icon",a="String";
qx.Class.define(b,{extend:qx.ui.table.headerrenderer.Default,construct:function(d,e){qx.ui.table.headerrenderer.Default.call(this);

if(d==null){d=c;
}this.setIconUrl(d);

if(e){this.setToolTip(e);
}},properties:{iconUrl:{check:a,init:c}},members:{updateHeaderCell:function(f,g){qx.ui.table.headerrenderer.Default.prototype.updateHeaderCell.call(this,f,g);
g.setIcon(this.getIconUrl());
}}});
})();
(function(){var b="Integer",a="qx.ui.table.pane.CellEvent";
qx.Class.define(a,{extend:qx.event.type.Mouse,properties:{row:{check:b,nullable:true},column:{check:b,nullable:true}},members:{init:function(c,d,e,f){d.clone(this);
this.setBubbles(false);

if(e!=null){this.setRow(e);
}else{this.setRow(c._getRowForPagePos(this.getDocumentLeft(),this.getDocumentTop()));
}
if(f!=null){this.setColumn(f);
}else{this.setColumn(c._getColumnForPageX(this.getDocumentLeft()));
}},clone:function(g){var h=qx.event.type.Mouse.prototype.clone.call(this,g);
h.set({row:this.getRow(),column:this.getColumn()});
return h;
}}});
})();
(function(){var l="",k="Year",h="loading ...",g="Title",f="Explicit",e="icon/16/mimetypes/media-audio.png",d="showcase.page.table.Content.saveResult",c="Chart Pos.",b="this",a="0",x="2*",w="1*",v="icon/16/apps/office-calendar.png",u="env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",t="Artist",s="select * from music.track.popular",r="Popular Music Tracks",q=", ",p="http://query.yahooapis.com/v1/public/yql?q=",o="icon/16/status/dialog-warning.png",m="showcase.page.table.Content",n="&format=json&diagnostics=false&";
qx.Class.define(m,{extend:showcase.page.AbstractDesktopContent,construct:function(y){showcase.page.AbstractDesktopContent.call(this,y);
},statics:{saveResult:function(z){this._result=z;
}},members:{_addWindowContent:function(A){var F=[[0,h,h,0,false]];
var D=this._tableModel=new qx.ui.table.model.Simple();
D.setColumns([c,g,t,k,f]);
D.setData(F);
D.setColumnEditable(1,true);
D.setColumnEditable(2,true);
D.setColumnSortable(3,true);
var C={tableColumnModel:function(H){return new qx.ui.table.columnmodel.Resize(H);
}};
var G=new qx.ui.table.Table(D,C);
G.set({width:540,height:400,decorator:null,headerCellHeight:null});
G.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);
var E=G.getTableColumnModel();
E.setDataCellRenderer(0,new qx.ui.table.cellrenderer.Number());
E.setDataCellRenderer(3,new qx.ui.table.cellrenderer.Number());
E.setDataCellRenderer(4,new qx.ui.table.cellrenderer.Boolean());
E.setHeaderCellRenderer(1,new qx.ui.table.headerrenderer.Icon(e,g));
E.setHeaderCellRenderer(3,new qx.ui.table.headerrenderer.Icon(v,k));
E.setHeaderCellRenderer(4,new qx.ui.table.headerrenderer.Icon(o,f));
var B=E.getBehavior();
B.set(1,{width:x,minWidth:60});
B.set(2,{width:w,minWidth:60});
B.setWidth(0,80);
B.setWidth(3,70);
B.setWidth(4,85);
A.setCaption(r);
A.setLayout(new qx.ui.layout.Grow());
A.add(G);
this._loadData(D);
},_loadData:function(I){var K=s;
var J=p+encodeURIComponent(K)+n+u+d;
var L=new qx.io.ScriptLoader();
L.load(J,function(){var O=showcase.page.table.Content._result;
var N=[];
var M=O.query.results.Track;

for(var i=0;i<M.length;i++){var Q=[];
Q.push(parseInt(M[i].ItemInfo.ChartPosition[b]));
Q.push(M[i].title||l);

if(M[i].Artist instanceof Array){var P=l;

for(var j=0;j<M[i].Artist.length;j++){if(j!=0){P+=q;
}P+=M[i].Artist[j].name;
}Q.push(P);
}else{Q.push(M[i].Artist.name||l);
}Q.push(parseInt(M[i].releaseYear));
Q.push(M[i].explicit!==a);
N.push(Q);
}I.setData(N);
});
}}});
})();
(function(){var g="Integer",f="Escape",d="keypress",c="Enter",b="excluded",a="qx.ui.table.pane.FocusIndicator";
qx.Class.define(a,{extend:qx.ui.container.Composite,construct:function(h){qx.ui.container.Composite.call(this);
this.__xJ=h;
this.setKeepActive(true);
this.addListener(d,this._onKeyPress,this);
},properties:{visibility:{refine:true,init:b},row:{check:g,nullable:true},column:{check:g,nullable:true}},members:{__xJ:null,_onKeyPress:function(e){var i=e.getKeyIdentifier();

if(i!==f&&i!==c){e.stopPropagation();
}},moveToCell:function(j,k){if(!this.__xJ.getShowCellFocusIndicator()&&!this.__xJ.getTable().getTableModel().isColumnEditable(j)){this.exclude();
return;
}else{this.show();
}
if(j==null){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var l=this.__xJ.getTablePaneModel().getX(j);

if(l==-1){this.hide();
this.setRow(null);
this.setColumn(null);
}else{var q=this.__xJ.getTable();
var o=q.getTableColumnModel();
var p=this.__xJ.getTablePaneModel();
var n=this.__xJ.getTablePane().getFirstVisibleRow();
var m=q.getRowHeight();
this.setUserBounds(p.getColumnLeft(j)-2,(k-n)*m-2,o.getColumnWidth(j)+3,m+3);
this.show();
this.setRow(k);
this.setColumn(j);
}}}},destruct:function(){this.__xJ=null;
}});
})();
(function(){var k="",j="Number",h='</div>',g='" ',f="paneUpdated",e='<div>',d="</div>",c="overflow: hidden;",b="qx.event.type.Data",a="paneReloadsData",E="div",D='style="',C="_applyMaxCacheLines",B="qx.ui.table.pane.Pane",A="width: 100%;",z="qx.event.type.Event",w="_applyVisibleRowCount",v='>',u="line-height: ",t="appear",r='class="',s="width:100%;",p="px;",q='<div ',n="'>",o="_applyFirstVisibleRow",l="<div style='",m=";position:relative;";
qx.Class.define(B,{extend:qx.ui.core.Widget,construct:function(F){qx.ui.core.Widget.call(this);
this.__wL=F;
this.__wM=0;
this.__wN=0;
this.__wO=[];
},events:{"paneReloadsData":b,"paneUpdated":z},properties:{firstVisibleRow:{check:j,init:0,apply:o},visibleRowCount:{check:j,init:0,apply:w},maxCacheLines:{check:j,init:1000,apply:C},allowShrinkX:{refine:true,init:false}},members:{__wN:null,__wM:null,__wL:null,__wP:null,__wQ:null,__wR:null,__wO:null,__wS:0,_applyFirstVisibleRow:function(G,H){this.updateContent(false,G-H);
},_applyVisibleRowCount:function(I,J){this.updateContent(true);
},_getContentHint:function(){return {width:this.getPaneScroller().getTablePaneModel().getTotalWidth(),height:400};
},getPaneScroller:function(){return this.__wL;
},getTable:function(){return this.__wL.getTable();
},setFocusedCell:function(K,L,M){if(K!=this.__wR||L!=this.__wQ){var N=this.__wQ;
this.__wR=K;
this.__wQ=L;
if(L!=N&&!M){if(N!==null){this.updateContent(false,null,N,true);
}
if(L!==null){this.updateContent(false,null,L,true);
}}}},onSelectionChanged:function(){this.updateContent(false,null,null,true);
},onFocusChanged:function(){this.updateContent(false,null,null,true);
},setColumnWidth:function(O,P){this.updateContent(true);
},onColOrderChanged:function(){this.updateContent(true);
},onPaneModelChanged:function(){this.updateContent(true);
},onTableModelDataChanged:function(Q,R,S,T){this.__wT();
var V=this.getFirstVisibleRow();
var U=this.getVisibleRowCount();

if(R==-1||R>=V&&Q<V+U){this.updateContent();
}},onTableModelMetaDataChanged:function(){this.updateContent(true);
},_applyMaxCacheLines:function(W,X){if(this.__wS>=W&&W!==-1){this.__wT();
}},__wT:function(){this.__wO=[];
this.__wS=0;
},__wU:function(Y,ba,bb){if(!ba&&!bb&&this.__wO[Y]){return this.__wO[Y];
}else{return null;
}},__wV:function(bc,bd,be,bf){var bg=this.getMaxCacheLines();

if(!be&&!bf&&!this.__wO[bc]&&bg>0){this._applyMaxCacheLines(bg);
this.__wO[bc]=bd;
this.__wS+=1;
}},updateContent:function(bh,bi,bj,bk){if(bh){this.__wT();
}if(bi&&Math.abs(bi)<=Math.min(10,this.getVisibleRowCount())){this._scrollContent(bi);
}else if(bk&&!this.getTable().getAlwaysUpdateCells()){this._updateRowStyles(bj);
}else{this._updateAllRows();
}},_updateRowStyles:function(bl){var bp=this.getContentElement().getDomElement();

if(!bp||!bp.firstChild){this._updateAllRows();
return;
}var bt=this.getTable();
var bn=bt.getSelectionModel();
var bq=bt.getTableModel();
var bu=bt.getDataRowRenderer();
var bo=bp.firstChild.childNodes;
var bs={table:bt};
var bv=this.getFirstVisibleRow();
var y=0;
var bm=bo.length;

if(bl!=null){var br=bl-bv;

if(br>=0&&br<bm){bv=bl;
y=br;
bm=br+1;
}else{return;
}}
for(;y<bm;y++,bv++){bs.row=bv;
bs.selected=bn.isSelectedIndex(bv);
bs.focusedRow=(this.__wQ==bv);
bs.rowData=bq.getRowData(bv);
bu.updateDataRowElement(bs,bo[y]);
}},_getRowsHtml:function(bw,bx){var bD=this.getTable();
var bG=bD.getSelectionModel();
var bA=bD.getTableModel();
var bB=bD.getTableColumnModel();
var bV=this.getPaneScroller().getTablePaneModel();
var bL=bD.getDataRowRenderer();
bA.prefetchRows(bw,bw+bx-1);
var bS=bD.getRowHeight();
var bU=bV.getColumnCount();
var bC=0;
var bz=[];
for(var x=0;x<bU;x++){var bY=bV.getColumnAtX(x);
var bF=bB.getColumnWidth(bY);
bz.push({col:bY,xPos:x,editable:bA.isColumnEditable(bY),focusedCol:this.__wR==bY,styleLeft:bC,styleWidth:bF});
bC+=bF;
}var bX=[];
var ca=false;

for(var bE=bw;bE<bw+bx;bE++){var bH=bG.isSelectedIndex(bE);
var bK=(this.__wQ==bE);
var bP=this.__wU(bE,bH,bK);

if(bP){bX.push(bP);
continue;
}var by=[];
var bR={table:bD};
bR.styleHeight=bS;
bR.row=bE;
bR.selected=bH;
bR.focusedRow=bK;
bR.rowData=bA.getRowData(bE);

if(!bR.rowData){ca=true;
}by.push(q);
var bO=bL.getRowAttributes(bR);

if(bO){by.push(bO);
}var bN=bL.getRowClass(bR);

if(bN){by.push(r,bN,g);
}var bM=bL.createRowStyle(bR);
bM+=m+bL.getRowHeightStyle(bS)+s;

if(bM){by.push(D,bM,g);
}by.push(v);
var bW=false;

for(x=0;x<bU&&!bW;x++){var bI=bz[x];

for(var bT in bI){bR[bT]=bI[bT];
}var bY=bR.col;
bR.value=bA.getValue(bY,bE);
var bJ=bB.getDataCellRenderer(bY);
bR.style=bJ.getDefaultCellStyle();
bW=bJ.createDataCellHtml(bR,by)||false;
}by.push(h);
var bQ=by.join(k);
this.__wV(bE,bQ,bH,bK);
bX.push(bQ);
}this.fireDataEvent(a,ca);
return bX.join(k);
},_scrollContent:function(cb){var cc=this.getContentElement().getDomElement();

if(!(cc&&cc.firstChild)){this._updateAllRows();
return;
}var cl=cc.firstChild;
var cd=cl.childNodes;
var cj=this.getVisibleRowCount();
var ci=this.getFirstVisibleRow();
var cg=this.getTable().getTableModel();
var cm=0;
cm=cg.getRowCount();
if(ci+cj>cm){this._updateAllRows();
return;
}var cn=cb<0?cj+cb:0;
var ce=cb<0?0:cj-cb;

for(i=Math.abs(cb)-1;i>=0;i--){var ch=cd[cn];

try{cl.removeChild(ch);
}catch(co){break;
}}if(!this.__wP){this.__wP=document.createElement(E);
}var ck=e;
ck+=this._getRowsHtml(ci+ce,Math.abs(cb));
ck+=h;
this.__wP.innerHTML=ck;
var cf=this.__wP.firstChild.childNodes;
if(cb>0){for(var i=cf.length-1;i>=0;i--){var ch=cf[0];
cl.appendChild(ch);
}}else{for(var i=cf.length-1;i>=0;i--){var ch=cf[cf.length-1];
cl.insertBefore(ch,cl.firstChild);
}}if(this.__wQ!==null){this._updateRowStyles(this.__wQ-cb);
this._updateRowStyles(this.__wQ);
}this.fireEvent(f);
},_updateAllRows:function(){var cs=this.getContentElement().getDomElement();

if(!cs){this.addListenerOnce(t,arguments.callee,this);
return;
}var cy=this.getTable();
var cv=cy.getTableModel();
var cx=this.getPaneScroller().getTablePaneModel();
var cw=cx.getColumnCount();
var cp=cy.getRowHeight();
var ct=this.getFirstVisibleRow();
var cq=this.getVisibleRowCount();
var cz=cv.getRowCount();

if(ct+cq>cz){cq=Math.max(0,cz-ct);
}var cr=cx.getTotalWidth();
var cu;
if(cq>0){cu=[l,A,(cy.getForceLineHeight()?u+cp+p:k),c,n,this._getRowsHtml(ct,cq),d];
}else{cu=[];
}var cA=cu.join(k);
cs.innerHTML=cA;
this.setWidth(cr);
this.__wM=cw;
this.__wN=cq;
this.fireEvent(f);
}},destruct:function(){this.__wP=this.__wL=this.__wO=null;
}});
})();
(function(){var e="auto",d="string",c="number",b="*",a="qx.ui.core.ColumnData";
qx.Class.define(a,{extend:qx.ui.core.LayoutItem,construct:function(){qx.ui.core.LayoutItem.call(this);
this.setColumnWidth(e);
},members:{__ye:null,renderLayout:function(f,top,g,h){this.__ye=g;
},getComputedWidth:function(){return this.__ye;
},getFlex:function(){return this.getLayoutProperties().flex||0;
},setColumnWidth:function(i,j){var j=j||0;
var k=null;

if(typeof i==c){this.setWidth(i);
}else if(typeof i==d){if(i==e){j=1;
}else{var l=i.match(/^[0-9]+(?:\.[0-9]+)?([%\*])$/);

if(l){if(l[1]==b){j=parseFloat(i);
}else{k=i;
}}}}this.setLayoutProperties({flex:j,width:k});
}},settings:{"qx.tableResizeDebug":false}});
})();
(function(){var b="qx.ui.table.columnmodel.resizebehavior.Abstract",a="abstract";
qx.Class.define(b,{type:a,extend:qx.core.Object,members:{_setNumColumns:function(c){throw new Error("_setNumColumns is abstract");
},onAppear:function(event,d){throw new Error("onAppear is abstract");
},onTableWidthChanged:function(event){throw new Error("onTableWidthChanged is abstract");
},onVerticalScrollBarChanged:function(event){throw new Error("onVerticalScrollBarChanged is abstract");
},onColumnWidthChanged:function(event){throw new Error("onColumnWidthChanged is abstract");
},onVisibilityChanged:function(event){throw new Error("onVisibilityChanged is abstract");
},_getAvailableWidth:function(){var f=this.getTableColumnModel();
var i=f.getTable();
var e=i._getPaneScrollerArr();

if(!e[0]||!e[0].getLayoutParent().getBounds()){return null;
}var h=e[0].getLayoutParent().getBounds().width;
var g=e[e.length-1];
h-=g.getPaneInsetRight();
return h;
}}});
})();
(function(){var j="Function",h="Boolean",g="minWidth",f="width",e="__yg",d="qx.ui.table.columnmodel.Resize",c="qx.ui.table.columnmodel.resizebehavior.Default",b="__yh",a="maxWidth";
qx.Class.define(c,{extend:qx.ui.table.columnmodel.resizebehavior.Abstract,construct:function(){qx.ui.table.columnmodel.resizebehavior.Abstract.call(this);
this.__yf=[];
this.__yg=new qx.ui.layout.HBox();
this.__yg.connectToWidget(this);
this.__yh=new qx.util.DeferredCall(this._computeColumnsFlexWidth,this);
},properties:{newResizeBehaviorColumnData:{check:j,init:function(k){return new qx.ui.core.ColumnData();
}},initializeWidthsOnEveryAppear:{check:h,init:false},tableColumnModel:{check:d}},members:{__yg:null,__yi:null,__yf:null,__yh:null,__yj:false,setWidth:function(m,n,o){if(m>=this.__yf.length){throw new Error("Column number out of range");
}this.__yf[m].setColumnWidth(n,o);
this.__yh.schedule();
},setMinWidth:function(p,q){if(p>=this.__yf.length){throw new Error("Column number out of range");
}this.__yf[p].setMinWidth(q);
this.__yh.schedule();
},setMaxWidth:function(r,s){if(r>=this.__yf.length){throw new Error("Column number out of range");
}this.__yf[r].setMaxWidth(s);
this.__yh.schedule();
},set:function(t,u){for(var v in u){switch(v){case f:this.setWidth(t,u[v]);
break;
case g:this.setMinWidth(t,u[v]);
break;
case a:this.setMaxWidth(t,u[v]);
break;
default:throw new Error("Unknown property: "+v);
}}},onAppear:function(event,w){if(w===true||!this.__yj||this.getInitializeWidthsOnEveryAppear()){this._computeColumnsFlexWidth();
this.__yj=true;
}},onTableWidthChanged:function(event){this._computeColumnsFlexWidth();
},onVerticalScrollBarChanged:function(event){this._computeColumnsFlexWidth();
},onColumnWidthChanged:function(event){this._extendNextColumn(event);
},onVisibilityChanged:function(event){var x=event.getData();
if(x.visible){this._computeColumnsFlexWidth();
return;
}this._extendLastColumn(event);
},_setNumColumns:function(y){var z=this.__yf;
if(y<=z.length){z.splice(y,z.length);
return;
}for(var i=z.length;i<y;i++){z[i]=this.getNewResizeBehaviorColumnData()();
z[i].columnNumber=i;
}},getLayoutChildren:function(){return this.__yi;
},_computeColumnsFlexWidth:function(){this.__yh.cancel();
var E=this._getAvailableWidth();

if(E===null){return;
}var A=this.getTableColumnModel();
var C=A.getVisibleColumns();
var D=C.length;
var B=this.__yf;
var i,l;

if(D===0){return;
}var G=[];

for(i=0;i<D;i++){G.push(B[C[i]]);
}this.__yi=G;
this.__yk();
this.__yg.renderLayout(E,100);
for(i=0,l=G.length;i<l;i++){var F=G[i].getComputedWidth();
A.setColumnWidth(C[i],F);
}},__yk:function(){this.__yg.invalidateChildrenCache();
var H=this.__yi;

for(var i=0,l=H.length;i<l;i++){H[i].invalidateLayoutCache();
}},_extendNextColumn:function(event){var M=this.getTableColumnModel();
var P=event.getData();
var K=M.getVisibleColumns();
var J=this._getAvailableWidth();
var I=K.length;
if(P.newWidth>P.oldWidth){return ;
}var i;
var L;
var O=0;

for(i=0;i<I;i++){O+=M.getColumnWidth(K[i]);
}if(O<J){for(i=0;i<K.length;i++){if(K[i]==P.col){L=K[i+1];
break;
}}
if(L){var N=(J-(O-M.getColumnWidth(L)));
M.setColumnWidth(L,N);
}}},_extendLastColumn:function(event){var T=this.getTableColumnModel();
var X=event.getData();
if(X.visible){return;
}var S=T.getVisibleColumns();
if(S.length==0){return;
}var R=this._getAvailableWidth(T);
var Q=S.length;
var i;
var V;
var W=0;

for(i=0;i<Q;i++){W+=T.getColumnWidth(S[i]);
}if(W<R){V=S[S.length-1];
var U=(R-(W-T.getColumnWidth(V)));
T.setColumnWidth(V,U);
}},_getResizeColumnData:function(){return this.__yf;
}},destruct:function(){this.__yf=this.__yi=null;
this._disposeObjects(e,b);
}});
})();
(function(){var k="qx.event.type.Data",j="visibilityChanged",h="orderChanged",g="visibilityChangedPre",f="__wv",e="__ww",d="widthChanged",c="qx.ui.table.columnmodel.Basic",b="__wx",a="headerCellRendererChanged";
qx.Class.define(c,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__wq=[];
this.__wr=[];
},events:{"widthChanged":k,"visibilityChangedPre":k,"visibilityChanged":k,"orderChanged":k,"headerCellRendererChanged":k},statics:{DEFAULT_WIDTH:100,DEFAULT_HEADER_RENDERER:qx.ui.table.headerrenderer.Default,DEFAULT_DATA_RENDERER:qx.ui.table.cellrenderer.Default,DEFAULT_EDITOR_FACTORY:qx.ui.table.celleditor.TextField},members:{__ws:null,__wt:null,__wr:null,__wq:null,__wu:null,__wv:null,__ww:null,__wx:null,init:function(l,m){{};
this.__wu=[];
var q=qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
var r=this.__wv||(this.__wv=new qx.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER());
var o=this.__ww||(this.__ww=new qx.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER());
var n=this.__wx||(this.__wx=new qx.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY());
this.__wq=[];
this.__wr=[];
var t;
if(m){t=m.getInitiallyHiddenColumns();
}t=t||[];

for(var u=0;u<l;u++){this.__wu[u]={width:q,headerRenderer:r,dataRenderer:o,editorFactory:n};
this.__wq[u]=u;
this.__wr[u]=u;
}this.__wt=null;
this.__ws=true;

for(var s=0;s<t.length;s++){this.setColumnVisible(t[s],false);
}this.__ws=false;

for(u=0;u<l;u++){var p={col:u,visible:this.isColumnVisible(u)};
this.fireDataEvent(g,p);
this.fireDataEvent(j,p);
}},getVisibleColumns:function(){return this.__wr!=null?this.__wr:[];
},setColumnWidth:function(v,w,y){{};
var A=this.__wu[v].width;

if(A!=w){this.__wu[v].width=w;
var z={col:v,newWidth:w,oldWidth:A,isMouseAction:y||false};
this.fireDataEvent(d,z);
}},getColumnWidth:function(B){{};
return this.__wu[B].width;
},setHeaderCellRenderer:function(C,D){{};
var E=this.__wu[C].headerRenderer;

if(E!==this.__wv){E.dispose();
}this.__wu[C].headerRenderer=D;
this.fireDataEvent(a,{col:C});
},getHeaderCellRenderer:function(F){{};
return this.__wu[F].headerRenderer;
},setDataCellRenderer:function(G,H){{};
this.__wu[G].dataRenderer=H;
var I=this.__wu[G].dataRenderer;

if(I!==this.__ww){return I;
}return null;
},getDataCellRenderer:function(J){{};
return this.__wu[J].dataRenderer;
},setCellEditorFactory:function(K,L){{};
var M=this.__wu[K].headerRenderer;

if(M!==this.__wx){M.dispose();
}this.__wu[K].editorFactory=L;
},getCellEditorFactory:function(N){{};
return this.__wu[N].editorFactory;
},_getColToXPosMap:function(){if(this.__wt==null){this.__wt={};

for(var Q=0;Q<this.__wq.length;Q++){var P=this.__wq[Q];
this.__wt[P]={overX:Q};
}
for(var O=0;O<this.__wr.length;O++){var P=this.__wr[O];
this.__wt[P].visX=O;
}}return this.__wt;
},getVisibleColumnCount:function(){return this.__wr!=null?this.__wr.length:0;
},getVisibleColumnAtX:function(R){{};
return this.__wr[R];
},getVisibleX:function(S){{};
return this._getColToXPosMap()[S].visX;
},getOverallColumnCount:function(){return this.__wq.length;
},getOverallColumnAtX:function(T){{};
return this.__wq[T];
},getOverallX:function(U){{};
return this._getColToXPosMap()[U].overX;
},isColumnVisible:function(V){{};
return (this._getColToXPosMap()[V].visX!=null);
},setColumnVisible:function(W,X){{};

if(X!=this.isColumnVisible(W)){if(X){var be=this._getColToXPosMap();
var bb=be[W].overX;

if(bb==null){throw new Error("Showing column failed: "+W+". The column is not added to this TablePaneModel.");
}var bc;

for(var x=bb+1;x<this.__wq.length;x++){var bd=this.__wq[x];
var Y=be[bd].visX;

if(Y!=null){bc=Y;
break;
}}if(bc==null){bc=this.__wr.length;
}this.__wr.splice(bc,0,W);
}else{var ba=this.getVisibleX(W);
this.__wr.splice(ba,1);
}this.__wt=null;
if(!this.__ws){var bf={col:W,visible:X};
this.fireDataEvent(g,bf);
this.fireDataEvent(j,bf);
}}},moveColumn:function(bg,bh){{};
this.__ws=true;
var bk=this.__wq[bg];
var bi=this.isColumnVisible(bk);

if(bi){this.setColumnVisible(bk,false);
}this.__wq.splice(bg,1);
this.__wq.splice(bh,0,bk);
this.__wt=null;

if(bi){this.setColumnVisible(bk,true);
}this.__ws=false;
var bj={col:bk,fromOverXPos:bg,toOverXPos:bh};
this.fireDataEvent(h,bj);
},setColumnsOrder:function(bl){{};

if(bl.length==this.__wq.length){this.__ws=true;
var bo=new Array(bl.length);

for(var bm=0;bm<this.__wq.length;bm++){var bn=this.isColumnVisible(bm);
bo[bm]=bn;

if(bn){this.setColumnVisible(bm,false);
}}this.__wq=qx.lang.Array.clone(bl);
this.__wt=null;
for(var bm=0;bm<this.__wq.length;bm++){if(bo[bm]){this.setColumnVisible(bm,true);
}}this.__ws=false;
this.fireDataEvent(h);
}else{throw new Error("setColumnsOrder: Invalid number of column positions given, expected "+this.__wq.length+", got "+bl.length);
}}},destruct:function(){for(var i=0;i<this.__wu.length;i++){this.__wu[i].headerRenderer.dispose();
this.__wu[i].dataRenderer.dispose();
this.__wu[i].editorFactory.dispose();
}this.__wq=this.__wr=this.__wu=this.__wt=null;
this._disposeObjects(f,e,b);
}});
})();
(function(){var b="qx.ui.table.selection.Model",a="qx.ui.table.selection.Manager";
qx.Class.define(a,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
},properties:{selectionModel:{check:b}},members:{__wo:null,handleMouseDown:function(c,d){if(d.isLeftPressed()){var e=this.getSelectionModel();

if(!e.isSelectedIndex(c)){this._handleSelectEvent(c,d);
this.__wo=true;
}else{this.__wo=false;
}}else if(d.isRightPressed()&&d.getModifiers()==0){var e=this.getSelectionModel();

if(!e.isSelectedIndex(c)){e.setSelectionInterval(c,c);
}}},handleMouseUp:function(f,g){if(g.isLeftPressed()&&!this.__wo){this._handleSelectEvent(f,g);
}},handleClick:function(h,i){},handleSelectKeyDown:function(j,k){this._handleSelectEvent(j,k);
},handleMoveKeyDown:function(l,m){var o=this.getSelectionModel();

switch(m.getModifiers()){case 0:o.setSelectionInterval(l,l);
break;
case qx.event.type.Dom.SHIFT_MASK:var n=o.getAnchorSelectionIndex();

if(n==-1){o.setSelectionInterval(l,l);
}else{o.setSelectionInterval(n,l);
}break;
}},_handleSelectEvent:function(p,q){var t=this.getSelectionModel();
var r=t.getLeadSelectionIndex();
var s=t.getAnchorSelectionIndex();

if(q.isShiftPressed()){if(p!=r||t.isSelectionEmpty()){if(s==-1){s=p;
}
if(q.isCtrlOrCommandPressed()){t.addSelectionInterval(s,p);
}else{t.setSelectionInterval(s,p);
}}}else if(q.isCtrlOrCommandPressed()){if(t.isSelectedIndex(p)){t.removeSelectionInterval(p,p);
}else{t.addSelectionInterval(p,p);
}}else{t.setSelectionInterval(p,p);
}}}});
})();
(function(){var a="qx.ui.table.pane.Clipper";
qx.Class.define(a,{extend:qx.ui.container.Composite,construct:function(){qx.ui.container.Composite.call(this,new qx.ui.layout.Grow());
this.setMinWidth(0);
},members:{scrollToX:function(b){this.getContentElement().scrollToX(b,false);
},scrollToY:function(c){this.getContentElement().scrollToY(c,true);
}}});
})();
(function(){var l="]",k="..",h="changeSelection",g="_applySelectionMode",f='ie',d="qx.event.type.Event",c="Ranges:",b="qx.ui.table.selection.Model",a=" [";
qx.Class.define(b,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);
this.__we=[];
this.__wf=-1;
this.__wg=-1;
this.hasBatchModeRefCount=0;
this.__wh=false;
},events:{"changeSelection":d},statics:{NO_SELECTION:1,SINGLE_SELECTION:2,SINGLE_INTERVAL_SELECTION:3,MULTIPLE_INTERVAL_SELECTION:4,MULTIPLE_INTERVAL_SELECTION_TOGGLE:5},properties:{selectionMode:{init:2,check:[1,2,3,4,5],apply:g}},members:{__wh:null,__wf:null,__wg:null,__we:null,_applySelectionMode:function(m){this.resetSelection();
},setBatchMode:function(n){if(n){this.hasBatchModeRefCount+=1;
}else{if(this.hasBatchModeRefCount==0){throw new Error("Try to turn off batch mode althoug it was not turned on.");
}this.hasBatchModeRefCount-=1;

if(this.__wh){this.__wh=false;
this._fireChangeSelection();
}}return this.hasBatchMode();
},hasBatchMode:function(){return this.hasBatchModeRefCount>0;
},getAnchorSelectionIndex:function(){return this.__wf;
},_setAnchorSelectionIndex:function(o){this.__wf=o;
},getLeadSelectionIndex:function(){return this.__wg;
},_setLeadSelectionIndex:function(p){this.__wg=p;
},_getSelectedRangeArr:function(){return this.__we;
},resetSelection:function(){if(!this.isSelectionEmpty()){this._resetSelection();
this._fireChangeSelection();
}},isSelectionEmpty:function(){return this.__we.length==0;
},getSelectedCount:function(){var r=0;

for(var i=0;i<this.__we.length;i++){var q=this.__we[i];
r+=q.maxIndex-q.minIndex+1;
}return r;
},isSelectedIndex:function(s){for(var i=0;i<this.__we.length;i++){var t=this.__we[i];

if(s>=t.minIndex&&s<=t.maxIndex){return true;
}}return false;
},getSelectedRanges:function(){var u=[];

for(var i=0;i<this.__we.length;i++){u.push({minIndex:this.__we[i].minIndex,maxIndex:this.__we[i].maxIndex});
}return u;
},iterateSelection:function(v,w){for(var i=0;i<this.__we.length;i++){for(var j=this.__we[i].minIndex;j<=this.__we[i].maxIndex;j++){v.call(w,j);
}}},setSelectionInterval:function(x,y){var z=this.self(arguments);

switch(this.getSelectionMode()){case z.NO_SELECTION:return;
case z.SINGLE_SELECTION:if(this.isSelectedIndex(y)){return;
}x=y;
break;
case z.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this.setBatchMode(true);

try{for(var i=x;i<=y;i++){if(!this.isSelectedIndex(i)){this._addSelectionInterval(i,i);
}else{this.removeSelectionInterval(i,i);
}}}catch(e){if(qx.bom.client.Browser.NAME==f&&qx.bom.client.Browser.VERSION<=7){this.setBatchMode(false);
}throw e;
}finally{this.setBatchMode(false);
}this._fireChangeSelection();
return;
}this._resetSelection();
this._addSelectionInterval(x,y);
this._fireChangeSelection();
},addSelectionInterval:function(A,B){var C=qx.ui.table.selection.Model;

switch(this.getSelectionMode()){case C.NO_SELECTION:return;
case C.MULTIPLE_INTERVAL_SELECTION:case C.MULTIPLE_INTERVAL_SELECTION_TOGGLE:this._addSelectionInterval(A,B);
this._fireChangeSelection();
break;
default:this.setSelectionInterval(A,B);
break;
}},removeSelectionInterval:function(D,E){this.__wf=D;
this.__wg=E;
var F=Math.min(D,E);
var H=Math.max(D,E);
for(var i=0;i<this.__we.length;i++){var J=this.__we[i];

if(J.minIndex>H){break;
}else if(J.maxIndex>=F){var K=(J.minIndex>=F)&&(J.minIndex<=H);
var I=(J.maxIndex>=F)&&(J.maxIndex<=H);

if(K&&I){this.__we.splice(i,1);
i--;
}else if(K){J.minIndex=H+1;
}else if(I){J.maxIndex=F-1;
}else{var G={minIndex:H+1,maxIndex:J.maxIndex};
this.__we.splice(i+1,0,G);
J.maxIndex=F-1;
break;
}}}this._fireChangeSelection();
},_resetSelection:function(){this.__we=[];
this.__wf=-1;
this.__wg=-1;
},_addSelectionInterval:function(L,M){this.__wf=L;
this.__wg=M;
var N=Math.min(L,M);
var P=Math.max(L,M);
var O=0;

for(;O<this.__we.length;O++){var Q=this.__we[O];

if(Q.minIndex>N){break;
}}this.__we.splice(O,0,{minIndex:N,maxIndex:P});
var R=this.__we[0];

for(var i=1;i<this.__we.length;i++){var Q=this.__we[i];

if(R.maxIndex+1>=Q.minIndex){R.maxIndex=Math.max(R.maxIndex,Q.maxIndex);
this.__we.splice(i,1);
i--;
}else{R=Q;
}}},_dumpRanges:function(){var S=c;

for(var i=0;i<this.__we.length;i++){var T=this.__we[i];
S+=a+T.minIndex+k+T.maxIndex+l;
}this.debug(S);
},_fireChangeSelection:function(){if(this.hasBatchMode()){this.__wh=true;
}else{this.fireEvent(h);
}}},destruct:function(){this.__we=null;
}});
})();
(function(){var n="appear",m="columnVisibilityMenuCreateEnd",l="tableWidthChanged",k="verticalScrollBarChanged",j="qx.ui.table.columnmodel.resizebehavior.Abstract",i="qx.ui.table.columnmodel.Resize",h="_applyBehavior",g="separator",f="visibilityChanged",e="Reset column widths",b="changeBehavior",d="user-button",c="widthChanged",a="execute";
qx.Class.define(i,{extend:qx.ui.table.columnmodel.Basic,include:qx.locale.MTranslation,construct:function(){qx.ui.table.columnmodel.Basic.call(this);
this.__yb=false;
this.__yc=false;
},properties:{behavior:{check:j,init:null,nullable:true,apply:h,event:b}},members:{__yc:null,__yb:null,__yd:null,_applyBehavior:function(p,q){if(q!=null){q.dispose();
q=null;
}p._setNumColumns(this.getOverallColumnCount());
p.setTableColumnModel(this);
},init:function(r,s){qx.ui.table.columnmodel.Basic.prototype.init.call(this,r,s);

if(this.__yd==null){this.__yd=s;
s.addListener(n,this._onappear,this);
s.addListener(l,this._onTableWidthChanged,this);
s.addListener(k,this._onverticalscrollbarchanged,this);
s.addListener(m,this._addResetColumnWidthButton,this);
this.addListener(c,this._oncolumnwidthchanged,this);
this.addListener(f,this._onvisibilitychanged,this);
}if(this.getBehavior()==null){this.setBehavior(new qx.ui.table.columnmodel.resizebehavior.Default());
}this.getBehavior()._setNumColumns(r);
},getTable:function(){return this.__yd;
},_addResetColumnWidthButton:function(event){var v=event.getData();
var u=v.columnButton;
var t=v.menu;
var o;
o=u.factory(g);
t.add(o);
o=u.factory(d,{text:this.tr(e)});
t.add(o);
o.addListener(a,this._onappear,this);
},_onappear:function(event){if(this.__yb){return ;
}this.__yb=true;
{};
this.getBehavior().onAppear(event,event.getType()!==n);
this.__yd._updateScrollerWidths();
this.__yd._updateScrollBarVisibility();
this.__yb=false;
this.__yc=true;
},_onTableWidthChanged:function(event){if(this.__yb||!this.__yc){return ;
}this.__yb=true;
{};
this.getBehavior().onTableWidthChanged(event);
this.__yb=false;
},_onverticalscrollbarchanged:function(event){if(this.__yb||!this.__yc){return ;
}this.__yb=true;
{};
this.getBehavior().onVerticalScrollBarChanged(event);
qx.event.Timer.once(function(){if(this.__yd&&!this.__yd.isDisposed()){this.__yd._updateScrollerWidths();
this.__yd._updateScrollBarVisibility();
}},this,0);
this.__yb=false;
},_oncolumnwidthchanged:function(event){if(this.__yb||!this.__yc){return ;
}this.__yb=true;
{};
this.getBehavior().onColumnWidthChanged(event);
this.__yb=false;
},_onvisibilitychanged:function(event){if(this.__yb||!this.__yc){return ;
}this.__yb=true;
{};
this.getBehavior().onVisibilityChanged(event);
this.__yb=false;
}},destruct:function(){this.__yd=null;
}});
})();
(function(){var e="metaDataChanged",d="qx.event.type.Data",c="qx.event.type.Event",b="abstract",a="qx.ui.table.model.Abstract";
qx.Class.define(a,{type:b,extend:qx.core.Object,implement:qx.ui.table.ITableModel,events:{"dataChanged":d,"metaDataChanged":c,"sorted":d},construct:function(){qx.core.Object.call(this);
this.__vM=[];
this.__vN=[];
this.__vO={};
},members:{__vM:null,__vN:null,__vO:null,__vP:null,init:function(f){},getRowCount:function(){throw new Error("getRowCount is abstract");
},getRowData:function(g){return null;
},isColumnEditable:function(h){return false;
},isColumnSortable:function(j){return false;
},sortByColumn:function(k,l){},getSortColumnIndex:function(){return -1;
},isSortAscending:function(){return true;
},prefetchRows:function(m,n){},getValue:function(o,p){throw new Error("getValue is abstract");
},getValueById:function(q,r){return this.getValue(this.getColumnIndexById(q),r);
},setValue:function(s,t,u){throw new Error("setValue is abstract");
},setValueById:function(v,w,x){this.setValue(this.getColumnIndexById(v),w,x);
},getColumnCount:function(){return this.__vM.length;
},getColumnIndexById:function(y){return this.__vO[y];
},getColumnId:function(z){return this.__vM[z];
},getColumnName:function(A){return this.__vN[A];
},setColumnIds:function(B){this.__vM=B;
this.__vO={};

for(var i=0;i<B.length;i++){this.__vO[B[i]]=i;
}this.__vN=new Array(B.length);
if(!this.__vP){this.fireEvent(e);
}},setColumnNamesByIndex:function(C){if(this.__vM.length!=C.length){throw new Error("this.__columnIdArr and columnNameArr have different length: "+this.__vM.length+" != "+C.length);
}this.__vN=C;
this.fireEvent(e);
},setColumnNamesById:function(D){this.__vN=new Array(this.__vM.length);

for(var i=0;i<this.__vM.length;++i){this.__vN[i]=D[this.__vM[i]];
}},setColumns:function(E,F){var G=this.__vM.length==0||F;

if(F==null){if(this.__vM.length==0){F=E;
}else{F=this.__vM;
}}
if(F.length!=E.length){throw new Error("columnIdArr and columnNameArr have different length: "+F.length+" != "+E.length);
}
if(G){this.__vP=true;
this.setColumnIds(F);
this.__vP=false;
}this.setColumnNamesByIndex(E);
}},destruct:function(){this.__vM=this.__vN=this.__vO=null;
}});
})();
(function(){var e="dataChanged",d="metaDataChanged",c="qx.ui.table.model.Simple",b="Boolean",a="sorted";
qx.Class.define(c,{extend:qx.ui.table.model.Abstract,construct:function(){qx.ui.table.model.Abstract.call(this);
this.__xM=[];
this.__xN=-1;
this.__xO=[];
this.__xP=null;
},properties:{caseSensitiveSorting:{check:b,init:true}},statics:{_defaultSortComparatorAscending:function(f,g){var h=f[arguments.callee.columnIndex];
var k=g[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(h)&&qx.lang.Type.isNumber(k)){var l=isNaN(h)?isNaN(k)?0:1:isNaN(k)?-1:null;

if(l!=null){return l;
}}return (h>k)?1:((h==k)?0:-1);
},_defaultSortComparatorInsensitiveAscending:function(m,n){var o=(m[arguments.callee.columnIndex].toLowerCase?m[arguments.callee.columnIndex].toLowerCase():m[arguments.callee.columnIndex]);
var p=(n[arguments.callee.columnIndex].toLowerCase?n[arguments.callee.columnIndex].toLowerCase():n[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(o)&&qx.lang.Type.isNumber(p)){var q=isNaN(o)?isNaN(p)?0:1:isNaN(p)?-1:null;

if(q!=null){return q;
}}return (o>p)?1:((o==p)?0:-1);
},_defaultSortComparatorDescending:function(r,s){var t=r[arguments.callee.columnIndex];
var u=s[arguments.callee.columnIndex];

if(qx.lang.Type.isNumber(t)&&qx.lang.Type.isNumber(u)){var v=isNaN(t)?isNaN(u)?0:1:isNaN(u)?-1:null;

if(v!=null){return v;
}}return (t<u)?1:((t==u)?0:-1);
},_defaultSortComparatorInsensitiveDescending:function(w,x){var y=(w[arguments.callee.columnIndex].toLowerCase?w[arguments.callee.columnIndex].toLowerCase():w[arguments.callee.columnIndex]);
var z=(x[arguments.callee.columnIndex].toLowerCase?x[arguments.callee.columnIndex].toLowerCase():x[arguments.callee.columnIndex]);

if(qx.lang.Type.isNumber(y)&&qx.lang.Type.isNumber(z)){var A=isNaN(y)?isNaN(z)?0:1:isNaN(z)?-1:null;

if(A!=null){return A;
}}return (y<z)?1:((y==z)?0:-1);
}},members:{__xM:null,__xP:null,__xQ:null,__xO:null,__xN:null,__xR:null,getRowData:function(B){var C=this.__xM[B];

if(C==null||C.originalData==null){return C;
}else{return C.originalData;
}},getRowDataAsMap:function(D){var F=this.__xM[D];

if(F!=null){var E={};
for(var G=0;G<this.getColumnCount();G++){E[this.getColumnId(G)]=F[G];
}
if(F.originalData!=null){for(var H in F.originalData){if(E[H]==undefined){E[H]=F.originalData[H];
}}}return E;
}return (F&&F.originalData)?F.originalData:null;
},getDataAsMapArray:function(){var J=this.getRowCount();
var I=[];

for(var i=0;i<J;i++){I.push(this.getRowDataAsMap(i));
}return I;
},setEditable:function(K){this.__xP=[];

for(var L=0;L<this.getColumnCount();L++){this.__xP[L]=K;
}this.fireEvent(d);
},setColumnEditable:function(M,N){if(N!=this.isColumnEditable(M)){if(this.__xP==null){this.__xP=[];
}this.__xP[M]=N;
this.fireEvent(d);
}},isColumnEditable:function(O){return this.__xP?(this.__xP[O]==true):false;
},setColumnSortable:function(P,Q){if(Q!=this.isColumnSortable(P)){if(this.__xQ==null){this.__xQ=[];
}this.__xQ[P]=Q;
this.fireEvent(d);
}},isColumnSortable:function(R){return (this.__xQ?(this.__xQ[R]!==false):true);
},sortByColumn:function(S,T){var W;
var V=this.__xO[S];

if(V){W=(T?V.ascending:V.descending);
}else{if(this.getCaseSensitiveSorting()){W=(T?qx.ui.table.model.Simple._defaultSortComparatorAscending:qx.ui.table.model.Simple._defaultSortComparatorDescending);
}else{W=(T?qx.ui.table.model.Simple._defaultSortComparatorInsensitiveAscending:qx.ui.table.model.Simple._defaultSortComparatorInsensitiveDescending);
}}W.columnIndex=S;
this.__xM.sort(W);
this.__xN=S;
this.__xR=T;
var U={columnIndex:S,ascending:T};
this.fireDataEvent(a,U);
this.fireEvent(d);
},setSortMethods:function(X,Y){var ba;

if(qx.lang.Type.isFunction(Y)){ba={ascending:Y,descending:function(bb,bc){return Y(bc,bb);
}};
}else{ba=Y;
}this.__xO[X]=ba;
},getSortMethods:function(bd){return this.__xO[bd];
},clearSorting:function(){if(this.__xN!=-1){this.__xN=-1;
this.__xR=true;
this.fireEvent(d);
}},getSortColumnIndex:function(){return this.__xN;
},_setSortColumnIndex:function(be){this.__xN=be;
},isSortAscending:function(){return this.__xR;
},_setSortAscending:function(bf){this.__xR=bf;
},getRowCount:function(){return this.__xM.length;
},getValue:function(bg,bh){if(bh<0||bh>=this.__xM.length){throw new Error("this.__rowArr out of bounds: "+bh+" (0.."+this.__xM.length+")");
}return this.__xM[bh][bg];
},setValue:function(bi,bj,bk){if(this.__xM[bj][bi]!=bk){this.__xM[bj][bi]=bk;
if(this.hasListener(e)){var bl={firstRow:bj,lastRow:bj,firstColumn:bi,lastColumn:bi};
this.fireDataEvent(e,bl);
}
if(bi==this.__xN){this.clearSorting();
}}},setData:function(bm,bn){this.__xM=bm;
if(this.hasListener(e)){var bo={firstRow:0,lastRow:bm.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(e,bo);
}
if(bn!==false){this.clearSorting();
}},getData:function(){return this.__xM;
},setDataAsMapArray:function(bp,bq,br){this.setData(this._mapArray2RowArr(bp,bq),br);
},addRows:function(bs,bt,bu){if(bt==null){bt=this.__xM.length;
}bs.splice(0,0,bt,0);
Array.prototype.splice.apply(this.__xM,bs);
var bv={firstRow:bt,lastRow:this.__xM.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(e,bv);

if(bu!==false){this.clearSorting();
}},addRowsAsMapArray:function(bw,bx,by,bz){this.addRows(this._mapArray2RowArr(bw,by),bx,bz);
},setRows:function(bA,bB,bC){if(bB==null){bB=0;
}bA.splice(0,0,bB,bA.length);
Array.prototype.splice.apply(this.__xM,bA);
var bD={firstRow:bB,lastRow:this.__xM.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1};
this.fireDataEvent(e,bD);

if(bC!==false){this.clearSorting();
}},setRowsAsMapArray:function(bE,bF,bG,bH){this.setRows(this._mapArray2RowArr(bE,bG),bF,bH);
},removeRows:function(bI,bJ,bK){this.__xM.splice(bI,bJ);
var bL={firstRow:bI,lastRow:this.__xM.length-1,firstColumn:0,lastColumn:this.getColumnCount()-1,removeStart:bI,removeCount:bJ};
this.fireDataEvent(e,bL);

if(bK!==false){this.clearSorting();
}},_mapArray2RowArr:function(bM,bN){var bR=bM.length;
var bO=this.getColumnCount();
var bQ=new Array(bR);
var bP;

for(var i=0;i<bR;++i){bP=[];

if(bN){bP.originalData=bM[i];
}
for(var j=0;j<bO;++j){bP[j]=bM[i][this.getColumnId(j)];
}bQ[i]=bP;
}return bQ;
}},destruct:function(){this.__xM=this.__xP=this.__xO=this.__xQ=null;
}});
})();
(function(){var a="qx.ui.table.IRowRenderer";
qx.Interface.define(a,{members:{updateDataRowElement:function(b,c){},getRowHeightStyle:function(d){},createRowStyle:function(e){},getRowClass:function(f){}}});
})();
(function(){var f="menu-button",e="table-column-reset-button",d="separator",c="user-button",b="qx.ui.table.columnmenu.Button",a="menu";
qx.Class.define(b,{extend:qx.ui.form.MenuButton,implement:qx.ui.table.IColumnMenuButton,construct:function(){qx.ui.form.MenuButton.call(this);
this.__wl=new qx.ui.core.Blocker(this);
},members:{__wm:null,__wl:null,factory:function(g,h){switch(g){case a:var j=new qx.ui.menu.Menu();
this.setMenu(j);
return j;
case f:var m=new qx.ui.table.columnmenu.MenuItem(h.text);
m.setVisible(h.bVisible);
this.getMenu().add(m);
return m;
case c:var k=new qx.ui.menu.Button(h.text);
k.set({appearance:e});
return k;
case d:return new qx.ui.menu.Separator();
default:throw new Error("Unrecognized factory request: "+g);
}},getBlocker:function(){return this.__wl;
},empty:function(){var n=this.getMenu();
var o=n.getChildren();

for(var i=0,l=o.length;i<l;i++){o[0].destroy();
}}},destruct:function(){this.__wl.dispose();
}});
})();
(function(){var e="",d="qooxdoo-table-cell qooxdoo-table-cell-right",c="0",b="qx.util.format.NumberFormat",a="qx.ui.table.cellrenderer.Number";
qx.Class.define(a,{extend:qx.ui.table.cellrenderer.Conditional,properties:{numberFormat:{check:b,init:null,nullable:true}},members:{_getContentHtml:function(f){var g=this.getNumberFormat();

if(g){if(f.value||f.value==0){return g.format(f.value);
}else{return e;
}}else{return f.value==0?c:(f.value||e);
}},_getCellClass:function(h){return d;
}}});
})();
(function(){var m="Boolean",l="resize-line",k="mousedown",j="qx.event.type.Data",i="mouseup",h="qx.ui.table.pane.CellEvent",g="scroll",d="focus-indicator",c="excluded",b="scrollbar-y",bm="table-scroller-focus-indicator",bl="visible",bk="mousemove",bj="header",bi="editing",bh="click",bg="modelChanged",bf="scrollbar-x",be="cellClick",bd="pane",t="__xi",u="__xc",r="mouseout",s="__xh",p="changeHorizontalScrollBarVisible",q="bottom",n="_applyScrollTimeout",o="changeScrollX",z="_applyTablePaneModel",A="Integer",I="__xg",G="dblclick",Q="dataEdited",L="mousewheel",Y="interval",V="qx.ui.table.pane.Scroller",C="__xk",bc="_applyShowCellFocusIndicator",bb="__xe",ba="resize",B="vertical",E="changeScrollY",F="appear",H="table-scroller",J="beforeSort",M="__xd",S="cellDblclick",X="horizontal",v="losecapture",w="contextmenu",D="col-resize",P="disappear",O="_applyVerticalScrollBarVisible",N="_applyHorizontalScrollBarVisible",U="cellContextmenu",T="__xj",K="close",R="changeTablePaneModel",a="__xf",W="qx.ui.table.pane.Model",y="changeVerticalScrollBarVisible";
qx.Class.define(V,{extend:qx.ui.core.Widget,include:qx.ui.core.scroll.MScrollBarFactory,construct:function(bn){qx.ui.core.Widget.call(this);
this.__xb=bn;
var bo=new qx.ui.layout.Grid();
bo.setColumnFlex(0,1);
bo.setRowFlex(1,1);
this._setLayout(bo);
this.__xc=this._showChildControl(bf);
this.__xd=this._showChildControl(b);
this.__xe=this._showChildControl(bj);
this.__xf=this._showChildControl(bd);
this.__xg=new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({minWidth:0});
this._add(this.__xg,{row:0,column:0,colSpan:2});
this.__xh=new qx.ui.table.pane.Clipper();
this.__xh.add(this.__xe);
this.__xh.addListener(v,this._onChangeCaptureHeader,this);
this.__xh.addListener(bk,this._onMousemoveHeader,this);
this.__xh.addListener(k,this._onMousedownHeader,this);
this.__xh.addListener(i,this._onMouseupHeader,this);
this.__xh.addListener(bh,this._onClickHeader,this);
this.__xg.add(this.__xh,{flex:1});
this.__xi=new qx.ui.table.pane.Clipper();
this.__xi.add(this.__xf);
this.__xi.addListener(L,this._onMousewheel,this);
this.__xi.addListener(bk,this._onMousemovePane,this);
this.__xi.addListener(k,this._onMousedownPane,this);
this.__xi.addListener(i,this._onMouseupPane,this);
this.__xi.addListener(bh,this._onClickPane,this);
this.__xi.addListener(w,this._onContextMenu,this);
this.__xi.addListener(G,this._onDblclickPane,this);
this.__xi.addListener(ba,this._onResizePane,this);
this._add(this.__xi,{row:1,column:0});
this.__xj=this.getChildControl(d);
this.initShowCellFocusIndicator();
this.getChildControl(l).hide();
this.addListener(r,this._onMouseout,this);
this.addListener(F,this._onAppear,this);
this.addListener(P,this._onDisappear,this);
this.__xk=new qx.event.Timer();
this.__xk.addListener(Y,this._oninterval,this);
this.initScrollTimeout();
},statics:{MIN_COLUMN_WIDTH:10,RESIZE_REGION_RADIUS:5,CLICK_TOLERANCE:5,HORIZONTAL_SCROLLBAR:1,VERTICAL_SCROLLBAR:2},events:{"changeScrollY":j,"changeScrollX":j,"cellClick":h,"cellDblclick":h,"cellContextmenu":h,"beforeSort":j},properties:{horizontalScrollBarVisible:{check:m,init:true,apply:N,event:p},verticalScrollBarVisible:{check:m,init:true,apply:O,event:y},tablePaneModel:{check:W,apply:z,event:R},liveResize:{check:m,init:false},focusCellOnMouseMove:{check:m,init:false},selectBeforeFocus:{check:m,init:false},showCellFocusIndicator:{check:m,init:true,apply:bc},resetSelectionOnHeaderClick:{check:m,init:true},scrollTimeout:{check:A,init:100,apply:n},appearance:{refine:true,init:H}},members:{__xl:null,__xb:null,__xm:null,__xn:null,__xo:null,__xp:null,__xq:null,__xr:null,__xs:null,__xt:null,__xu:null,__xv:null,__xw:null,__xx:null,__xy:false,__xz:null,__xA:null,__xB:null,__xC:null,__xD:null,__xE:null,__xF:null,__xG:null,__xc:null,__xd:null,__xe:null,__xh:null,__xf:null,__xi:null,__xj:null,__xg:null,__xk:null,getPaneInsetRight:function(){var bq=this.getTopRightWidget();
var br=bq&&bq.isVisible()&&bq.getBounds()?bq.getBounds().width:0;
var bp=this.getVerticalScrollBarVisible()?this.getVerticalScrollBarWidth():0;
return Math.max(br,bp);
},setPaneWidth:function(bs){if(this.isVerticalScrollBarVisible()){bs+=this.getPaneInsetRight();
}this.setWidth(bs);
},_createChildControlImpl:function(bt,bu){var bv;

switch(bt){case bj:bv=(this.getTable().getNewTablePaneHeader())(this);
break;
case bd:bv=(this.getTable().getNewTablePane())(this);
break;
case d:bv=new qx.ui.table.pane.FocusIndicator(this);
bv.setUserBounds(0,0,0,0);
bv.setZIndex(1000);
bv.addListener(i,this._onMouseupFocusIndicator,this);
this.__xi.add(bv);
bv.show();
bv.setDecorator(null);
break;
case l:bv=new qx.ui.core.Widget();
bv.setUserBounds(0,0,0,0);
bv.setZIndex(1000);
this.__xi.add(bv);
break;
case bf:bv=this._createScrollBar(X).set({minWidth:0,alignY:q});
bv.addListener(g,this._onScrollX,this);
this._add(bv,{row:2,column:0});
break;
case b:bv=this._createScrollBar(B);
bv.addListener(g,this._onScrollY,this);
this._add(bv,{row:1,column:1});
break;
}return bv||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bt);
},_applyHorizontalScrollBarVisible:function(bw,bx){this.__xc.setVisibility(bw?bl:c);
},_applyVerticalScrollBarVisible:function(by,bz){this.__xd.setVisibility(by?bl:c);
},_applyTablePaneModel:function(bA,bB){if(bB!=null){bB.removeListener(bg,this._onPaneModelChanged,this);
}bA.addListener(bg,this._onPaneModelChanged,this);
},_applyShowCellFocusIndicator:function(bC,bD){if(bC){this.__xj.setDecorator(bm);
this._updateFocusIndicator();
}else{if(this.__xj){this.__xj.setDecorator(null);
}}},getScrollY:function(){return this.__xd.getPosition();
},setScrollY:function(scrollY,bE){this.__xd.scrollTo(scrollY);

if(bE){this._updateContent();
}},getScrollX:function(){return this.__xc.getPosition();
},setScrollX:function(scrollX){this.__xc.scrollTo(scrollX);
},getTable:function(){return this.__xb;
},onColVisibilityChanged:function(){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
},setColumnWidth:function(bF,bG){this.__xe.setColumnWidth(bF,bG);
this.__xf.setColumnWidth(bF,bG);
var bH=this.getTablePaneModel();
var x=bH.getX(bF);

if(x!=-1){this.updateHorScrollBarMaximum();
this._updateFocusIndicator();
}},onColOrderChanged:function(){this.__xe.onColOrderChanged();
this.__xf.onColOrderChanged();
this.updateHorScrollBarMaximum();
},onTableModelDataChanged:function(bI,bJ,bK,bL){this.__xf.onTableModelDataChanged(bI,bJ,bK,bL);
var bM=this.getTable().getTableModel().getRowCount();

if(bM!=this.__xl){this.updateVerScrollBarMaximum();

if(this.getFocusedRow()>=bM){if(bM==0){this.setFocusedCell(null,null);
}else{this.setFocusedCell(this.getFocusedColumn(),bM-1);
}}this.__xl=bM;
}},onSelectionChanged:function(){this.__xf.onSelectionChanged();
},onFocusChanged:function(){this.__xf.onFocusChanged();
},onTableModelMetaDataChanged:function(){this.__xe.onTableModelMetaDataChanged();
this.__xf.onTableModelMetaDataChanged();
},_onPaneModelChanged:function(){this.__xe.onPaneModelChanged();
this.__xf.onPaneModelChanged();
},_onResizePane:function(){this.updateHorScrollBarMaximum();
this.updateVerScrollBarMaximum();
this._updateContent();
this.__xe._updateContent();
this.__xb._updateScrollBarVisibility();
},updateHorScrollBarMaximum:function(){var bQ=this.__xi.getInnerSize();

if(!bQ){return ;
}var bO=this.getTablePaneModel().getTotalWidth();
var bP=this.__xc;

if(bQ.width<bO){var bN=Math.max(0,bO-bQ.width);
bP.setMaximum(bN);
bP.setKnobFactor(bQ.width/bO);
var bR=bP.getPosition();
bP.setPosition(Math.min(bR,bN));
}else{bP.setMaximum(0);
bP.setKnobFactor(1);
bP.setPosition(0);
}},updateVerScrollBarMaximum:function(){var ca=this.__xi.getInnerSize();

if(!ca){return ;
}var bX=this.getTable().getTableModel();
var bT=bX.getRowCount();

if(this.getTable().getKeepFirstVisibleRowComplete()){bT+=1;
}var bS=this.getTable().getRowHeight();
var bV=bT*bS;
var bY=this.__xd;

if(ca.height<bV){var bU=Math.max(0,bV-ca.height);
bY.setMaximum(bU);
bY.setKnobFactor(ca.height/bV);
var bW=bY.getPosition();
bY.setPosition(Math.min(bW,bU));
}else{bY.setMaximum(0);
bY.setKnobFactor(1);
bY.setPosition(0);
}},onKeepFirstVisibleRowCompleteChanged:function(){this.updateVerScrollBarMaximum();
this._updateContent();
},_onAppear:function(){this._startInterval(this.getScrollTimeout());
},_onDisappear:function(){this._stopInterval();
},_onScrollX:function(e){var cb=e.getData();
this.fireDataEvent(o,cb,e.getOldData());
this.__xh.scrollToX(cb);
this.__xi.scrollToX(cb);
},_onScrollY:function(e){this.fireDataEvent(E,e.getData(),e.getOldData());
this._postponedUpdateContent();
},_onMousewheel:function(e){var cc=this.getTable();

if(!cc.getEnabled()){return;
}var ce=qx.bom.client.Engine.GECKO?1:3;
var cd=this.__xd.getPosition()+((e.getWheelDelta()*ce)*cc.getRowHeight());
this.__xd.scrollTo(cd);
if(this.__xA&&this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(this.__xA,this.__xB);
}e.stop();
},__xH:function(cf){var ck=this.getTable();
var cl=this.__xe.getHeaderWidgetAtColumn(this.__xu);
var cg=cl.getSizeHint().minWidth;
var ci=Math.max(cg,this.__xw+cf-this.__xv);

if(this.getLiveResize()){var ch=ck.getTableColumnModel();
ch.setColumnWidth(this.__xu,ci,true);
}else{this.__xe.setColumnWidth(this.__xu,ci,true);
var cj=this.getTablePaneModel();
this._showResizeLine(cj.getColumnLeft(this.__xu)+ci);
}this.__xv+=ci-this.__xw;
this.__xw=ci;
},__xI:function(cm){var cn=qx.ui.table.pane.Scroller.CLICK_TOLERANCE;

if(this.__xe.isShowingColumnMoveFeedback()||cm>this.__xt+cn||cm<this.__xt-cn){this.__xq+=cm-this.__xt;
this.__xe.showColumnMoveFeedback(this.__xp,this.__xq);
var co=this.__xb.getTablePaneScrollerAtPageX(cm);

if(this.__xs&&this.__xs!=co){this.__xs.hideColumnMoveFeedback();
}
if(co!=null){this.__xr=co.showColumnMoveFeedback(cm);
}else{this.__xr=null;
}this.__xs=co;
this.__xt=cm;
}},_onMousemoveHeader:function(e){var cv=this.getTable();

if(!cv.getEnabled()){return;
}var cw=false;
var cp=null;
var ct=e.getDocumentLeft();
var cu=e.getDocumentTop();
this.__xA=ct;
this.__xB=cu;

if(this.__xu!=null){this.__xH(ct);
cw=true;
e.stopPropagation();
}else if(this.__xp!=null){this.__xI(ct);
e.stopPropagation();
}else{var cq=this._getResizeColumnForPageX(ct);

if(cq!=-1){cw=true;
}else{var cs=cv.getTableModel();
var cx=this._getColumnForPageX(ct);

if(cx!=null&&cs.isColumnSortable(cx)){cp=cx;
}}}var cr=cw?D:null;
this.getApplicationRoot().setGlobalCursor(cr);
this.setCursor(cr);
this.__xe.setMouseOverColumn(cp);
},_onMousemovePane:function(e){var cy=this.getTable();

if(!cy.getEnabled()){return;
}var cA=e.getDocumentLeft();
var cB=e.getDocumentTop();
this.__xA=cA;
this.__xB=cB;
var cz=this._getRowForPagePos(cA,cB);

if(cz!=null&&this._getColumnForPageX(cA)!=null){if(this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(cA,cB);
}}this.__xe.setMouseOverColumn(null);
},_onMousedownHeader:function(e){if(!this.getTable().getEnabled()){return;
}var cD=e.getDocumentLeft();
var cE=this._getResizeColumnForPageX(cD);

if(cE!=-1){this._startResizeHeader(cE,cD);
e.stop();
}else{var cC=this._getColumnForPageX(cD);

if(cC!=null){this._startMoveHeader(cC,cD);
e.stop();
}}},_startResizeHeader:function(cF,cG){var cH=this.getTable().getTableColumnModel();
this.__xu=cF;
this.__xv=cG;
this.__xw=cH.getColumnWidth(this.__xu);
this.__xh.capture();
},_startMoveHeader:function(cI,cJ){this.__xp=cI;
this.__xt=cJ;
this.__xq=this.getTablePaneModel().getColumnLeft(cI);
this.__xh.capture();
},_onMousedownPane:function(e){var cN=this.getTable();

if(!cN.getEnabled()){return;
}
if(cN.isEditing()){cN.stopEditing();
}var cK=e.getDocumentLeft();
var cM=e.getDocumentTop();
var cP=this._getRowForPagePos(cK,cM);
var cO=this._getColumnForPageX(cK);

if(cP!==null){this.__xx={row:cP,col:cO};
this.__xy=false;
var cL=this.getSelectBeforeFocus();

if(cL){cN.getSelectionManager().handleMouseDown(cP,e);
}if(!this.getFocusCellOnMouseMove()){this._focusCellAtPagePos(cK,cM);
}
if(!cL){cN.getSelectionManager().handleMouseDown(cP,e);
}}},_onMouseupFocusIndicator:function(e){if(this.__xx&&!this.__xy&&!this.isEditing()&&this.__xj.getRow()==this.__xx.row&&this.__xj.getColumn()==this.__xx.col){this.fireEvent(be,qx.ui.table.pane.CellEvent,[this,e,this.__xx.row,this.__xx.col],true);
this.__xy=true;
}else if(!this.isEditing()){this._onMousedownPane(e);
}},_onChangeCaptureHeader:function(e){if(this.__xu!=null){this._stopResizeHeader();
}
if(this.__xp!=null){this._stopMoveHeader();
}},_stopResizeHeader:function(){var cQ=this.getTable().getTableColumnModel();
if(!this.getLiveResize()){this._hideResizeLine();
cQ.setColumnWidth(this.__xu,this.__xw,true);
}this.__xu=null;
this.__xh.releaseCapture();
this.getApplicationRoot().setGlobalCursor(null);
this.setCursor(null);
if(this.isEditing()){var cR=this.__xE.getBounds().height;
this.__xE.setUserBounds(0,0,this.__xw,cR);
}},_stopMoveHeader:function(){var cW=this.getTable().getTableColumnModel();
var cX=this.getTablePaneModel();
this.__xe.hideColumnMoveFeedback();

if(this.__xs){this.__xs.hideColumnMoveFeedback();
}
if(this.__xr!=null){var da=cX.getFirstColumnX()+cX.getX(this.__xp);
var cV=this.__xr;

if(cV!=da&&cV!=da+1){var cY=cW.getVisibleColumnAtX(da);
var cU=cW.getVisibleColumnAtX(cV);
var cT=cW.getOverallX(cY);
var cS=(cU!=null)?cW.getOverallX(cU):cW.getOverallColumnCount();

if(cS>cT){cS--;
}cW.moveColumn(cT,cS);
this._updateFocusIndicator();
}}this.__xp=null;
this.__xr=null;
this.__xh.releaseCapture();
},_onMouseupPane:function(e){var db=this.getTable();

if(!db.getEnabled()){return;
}var dc=this._getRowForPagePos(e.getDocumentLeft(),e.getDocumentTop());

if(dc!=-1&&dc!=null&&this._getColumnForPageX(e.getDocumentLeft())!=null){db.getSelectionManager().handleMouseUp(dc,e);
}},_onMouseupHeader:function(e){var dd=this.getTable();

if(!dd.getEnabled()){return;
}
if(this.__xu!=null){this._stopResizeHeader();
this.__xz=true;
e.stop();
}else if(this.__xp!=null){this._stopMoveHeader();
e.stop();
}},_onClickHeader:function(e){if(this.__xz){this.__xz=false;
return;
}var di=this.getTable();

if(!di.getEnabled()){return;
}var dg=di.getTableModel();
var dh=e.getDocumentLeft();
var df=this._getResizeColumnForPageX(dh);

if(df==-1){var dl=this._getColumnForPageX(dh);

if(dl!=null&&dg.isColumnSortable(dl)){var de=dg.getSortColumnIndex();
var dj=(dl!=de)?true:!dg.isSortAscending();
var dk={column:dl,ascending:dj,clickEvent:e};

if(this.fireDataEvent(J,dk,null,true)){dg.sortByColumn(dl,dj);

if(this.getResetSelectionOnHeaderClick()){di.getSelectionModel().resetSelection();
}}}}e.stop();
},_onClickPane:function(e){var dm=this.getTable();

if(!dm.getEnabled()){return;
}var dq=e.getDocumentLeft();
var dr=e.getDocumentTop();
var dn=this._getRowForPagePos(dq,dr);
var dp=this._getColumnForPageX(dq);

if(dn!=null&&dp!=null){dm.getSelectionManager().handleClick(dn,e);

if(this.__xj.isHidden()||(this.__xx&&!this.__xy&&!this.isEditing()&&dn==this.__xx.row&&dp==this.__xx.col)){this.fireEvent(be,qx.ui.table.pane.CellEvent,[this,e,dn,dp],true);
this.__xy=true;
}}},_onContextMenu:function(e){var dv=e.getDocumentLeft();
var dw=e.getDocumentTop();
var dt=this._getRowForPagePos(dv,dw);
var du=this._getColumnForPageX(dv);

if(this.__xj.isHidden()||(this.__xx&&dt==this.__xx.row&&du==this.__xx.col)){this.fireEvent(U,qx.ui.table.pane.CellEvent,[this,e,dt,du],true);
var ds=this.getTable().getContextMenu();

if(ds){if(ds.getChildren().length>0){ds.openAtMouse(e);
}else{ds.exclude();
}e.preventDefault();
}}},_onContextMenuOpen:function(e){},_onDblclickPane:function(e){var dy=e.getDocumentLeft();
var dz=e.getDocumentTop();
this._focusCellAtPagePos(dy,dz);
this.startEditing();
var dx=this._getRowForPagePos(dy,dz);

if(dx!=-1&&dx!=null){this.fireEvent(S,qx.ui.table.pane.CellEvent,[this,e,dx],true);
}},_onMouseout:function(e){var dA=this.getTable();

if(!dA.getEnabled()){return;
}if(this.__xu==null){this.setCursor(null);
this.getApplicationRoot().setGlobalCursor(null);
}this.__xe.setMouseOverColumn(null);
},_showResizeLine:function(x){var dC=this._showChildControl(l);
var dB=dC.getWidth();
var dD=this.__xi.getBounds();
dC.setUserBounds(x-Math.round(dB/2),0,dB,dD.height);
},_hideResizeLine:function(){this._excludeChildControl(l);
},showColumnMoveFeedback:function(dE){var dN=this.getTablePaneModel();
var dM=this.getTable().getTableColumnModel();
var dH=this.__xf.getContainerLocation().left;
var dL=dN.getColumnCount();
var dI=0;
var dG=0;
var dQ=dH;

for(var dF=0;dF<dL;dF++){var dJ=dN.getColumnAtX(dF);
var dO=dM.getColumnWidth(dJ);

if(dE<dQ+dO/2){break;
}dQ+=dO;
dI=dF+1;
dG=dQ-dH;
}var dK=this.__xi.getContainerLocation().left;
var dP=this.__xi.getBounds().width;
var scrollX=dK-dH;
dG=qx.lang.Number.limit(dG,scrollX+2,scrollX+dP-1);
this._showResizeLine(dG);
return dN.getFirstColumnX()+dI;
},hideColumnMoveFeedback:function(){this._hideResizeLine();
},_focusCellAtPagePos:function(dR,dS){var dU=this._getRowForPagePos(dR,dS);

if(dU!=-1&&dU!=null){var dT=this._getColumnForPageX(dR);
this.__xb.setFocusedCell(dT,dU);
}},setFocusedCell:function(dV,dW){if(!this.isEditing()){this.__xf.setFocusedCell(dV,dW,this.__xn);
this.__xC=dV;
this.__xD=dW;
this._updateFocusIndicator();
}},getFocusedColumn:function(){return this.__xC;
},getFocusedRow:function(){return this.__xD;
},scrollCellVisible:function(dX,dY){var ej=this.getTablePaneModel();
var ea=ej.getX(dX);

if(ea!=-1){var eg=this.__xi.getInnerSize();

if(!eg){return;
}var eh=this.getTable().getTableColumnModel();
var ed=ej.getColumnLeft(dX);
var ek=eh.getColumnWidth(dX);
var eb=this.getTable().getRowHeight();
var el=dY*eb;
var scrollX=this.getScrollX();
var scrollY=this.getScrollY();
var ei=Math.min(ed,ed+ek-eg.width);
var ef=ed;
this.setScrollX(Math.max(ei,Math.min(ef,scrollX)));
var ec=el+eb-eg.height;

if(this.getTable().getKeepFirstVisibleRowComplete()){ec+=eb;
}var ee=el;
this.setScrollY(Math.max(ec,Math.min(ee,scrollY)),true);
}},isEditing:function(){return this.__xE!=null;
},startEditing:function(){var eq=this.getTable();
var eo=eq.getTableModel();
var es=this.__xC;

if(!this.isEditing()&&(es!=null)&&eo.isColumnEditable(es)){var et=this.__xD;
var em=this.getTablePaneModel().getX(es);
var en=eo.getValue(es,et);
this.__xF=eq.getTableColumnModel().getCellEditorFactory(es);
var ep={col:es,row:et,xPos:em,value:en,table:eq};
this.__xE=this.__xF.createCellEditor(ep);
if(this.__xE===null){return false;
}else if(this.__xE instanceof qx.ui.window.Window){this.__xE.setModal(true);
this.__xE.setShowClose(false);
this.__xE.addListener(K,this._onCellEditorModalWindowClose,this);
var f=eq.getModalCellEditorPreOpenFunction();

if(f!=null){f(this.__xE,ep);
}this.__xE.open();
}else{var er=this.__xj.getInnerSize();
this.__xE.setUserBounds(0,0,er.width,er.height);
this.__xj.addListener(k,function(e){this.__xx={row:this.__xD,col:this.__xC};
e.stopPropagation();
},this);
this.__xj.add(this.__xE);
this.__xj.addState(bi);
this.__xj.setKeepActive(false);
this.__xj.setDecorator(bm);
this.__xE.focus();
this.__xE.activate();
}return true;
}return false;
},stopEditing:function(){if(!this.getShowCellFocusIndicator()){this.__xj.setDecorator(null);
}this.flushEditor();
this.cancelEditing();
},flushEditor:function(){if(this.isEditing()){var ev=this.__xF.getCellEditorValue(this.__xE);
var eu=this.getTable().getTableModel().getValue(this.__xC,this.__xD);
this.getTable().getTableModel().setValue(this.__xC,this.__xD,ev);
this.__xb.focus();
this.__xb.fireDataEvent(Q,{row:this.__xD,col:this.__xC,oldValue:eu,value:ev});
}},cancelEditing:function(){if(this.isEditing()&&!this.__xE.pendingDispose){if(this._cellEditorIsModalWindow){this.__xE.destroy();
this.__xE=null;
this.__xF=null;
this.__xE.pendingDispose=true;
}else{this.__xj.removeState(bi);
this.__xj.setKeepActive(true);
this.__xE.destroy();
this.__xE=null;
this.__xF=null;
}}},_onCellEditorModalWindowClose:function(e){this.stopEditing();
},_getColumnForPageX:function(ew){var ez=this.getTable().getTableColumnModel();
var eA=this.getTablePaneModel();
var ey=eA.getColumnCount();
var eC=this.__xe.getContainerLocation().left;

for(var x=0;x<ey;x++){var ex=eA.getColumnAtX(x);
var eB=ez.getColumnWidth(ex);
eC+=eB;

if(ew<eC){return ex;
}}return null;
},_getResizeColumnForPageX:function(eD){var eH=this.getTable().getTableColumnModel();
var eI=this.getTablePaneModel();
var eG=eI.getColumnCount();
var eK=this.__xe.getContainerLocation().left;
var eE=qx.ui.table.pane.Scroller.RESIZE_REGION_RADIUS;

for(var x=0;x<eG;x++){var eF=eI.getColumnAtX(x);
var eJ=eH.getColumnWidth(eF);
eK+=eJ;

if(eD>=(eK-eE)&&eD<=(eK+eE)){return eF;
}}return -1;
},_getRowForPagePos:function(eL,eM){var eN=this.__xf.getContentLocation();

if(eL<eN.left||eL>eN.right){return null;
}
if(eM>=eN.top&&eM<=eN.bottom){var eO=this.getTable().getRowHeight();
var scrollY=this.__xd.getPosition();

if(this.getTable().getKeepFirstVisibleRowComplete()){scrollY=Math.floor(scrollY/eO)*eO;
}var eR=scrollY+eM-eN.top;
var eT=Math.floor(eR/eO);
var eS=this.getTable().getTableModel();
var eP=eS.getRowCount();
return (eT<eP)?eT:null;
}var eQ=this.__xe.getContainerLocation();

if(eM>=eQ.top&&eM<=eQ.bottom&&eL<=eQ.right){return -1;
}return null;
},setTopRightWidget:function(eU){var eV=this.__xG;

if(eV!=null){this.__xg.remove(eV);
}
if(eU!=null){this.__xg.add(eU);
}this.__xG=eU;
},getTopRightWidget:function(){return this.__xG;
},getHeader:function(){return this.__xe;
},getTablePane:function(){return this.__xf;
},getVerticalScrollBarWidth:function(){var eW=this.__xd;
return eW.isVisible()?(eW.getSizeHint().width||0):0;
},getNeededScrollBars:function(eX,eY){var ff=this.__xd.getSizeHint().width;
var fg=this.__xi.getInnerSize();
var fa=fg?fg.width:0;

if(this.getVerticalScrollBarVisible()){fa+=ff;
}var fj=fg?fg.height:0;

if(this.getHorizontalScrollBarVisible()){fj+=ff;
}var fd=this.getTable().getTableModel();
var fh=fd.getRowCount();
var fk=this.getTablePaneModel().getTotalWidth();
var fi=this.getTable().getRowHeight()*fh;
var fc=false;
var fl=false;

if(fk>fa){fc=true;

if(fi>fj-ff){fl=true;
}}else if(fi>fj){fl=true;

if(!eY&&(fk>fa-ff)){fc=true;
}}var fe=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var fb=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
return ((eX||fc)?fe:0)|((eY||!fl)?0:fb);
},getPaneClipper:function(){return this.__xi;
},_applyScrollTimeout:function(fm,fn){this._startInterval(fm);
},_startInterval:function(fo){this.__xk.setInterval(fo);
this.__xk.start();
},_stopInterval:function(){this.__xk.stop();
},_postponedUpdateContent:function(){this._updateContent();
},_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.__xn&&!this.__xf._layoutPending){this.__xn=false;
this._updateContent();
}}),_updateContent:function(){var ft=this.__xi.getInnerSize();

if(!ft){return;
}var fw=ft.height;
var scrollX=this.__xc.getPosition();
var scrollY=this.__xd.getPosition();
var fq=this.getTable().getRowHeight();
var fr=Math.floor(scrollY/fq);
var fv=this.__xf.getFirstVisibleRow();
this.__xf.setFirstVisibleRow(fr);
var fs=Math.ceil(fw/fq);
var fp=0;
var fu=this.getTable().getKeepFirstVisibleRowComplete();

if(!fu){fs++;
fp=scrollY%fq;
}this.__xf.setVisibleRowCount(fs);

if(fr!=fv){this._updateFocusIndicator();
}this.__xi.scrollToX(scrollX);
if(!fu){this.__xi.scrollToY(fp);
}},_updateFocusIndicator:function(){var fx=this.getTable();

if(!fx.getEnabled()){return;
}this.__xj.moveToCell(this.__xC,this.__xD);
}},destruct:function(){this._stopInterval();
var fy=this.getTablePaneModel();

if(fy){fy.dispose();
}this.__xx=this.__xG=this.__xb=null;
this._disposeObjects(u,M,s,t,T,bb,a,I,C);
}});
})();
(function(){var r="px",q=".qooxdoo-table-cell-icon {",p="abstract",o="",n="qx.ui.table.cellrenderer.AbstractImage",m=" qooxdoo-table-cell-icon",l="<div></div>",k="'",j="no-repeat",i="}",c="  text-align:center;",h="inline-block",f="static",b="top",a="  padding-top:1px;",e="title='",d="string",g="-moz-inline-box";
qx.Class.define(n,{extend:qx.ui.table.cellrenderer.Abstract,type:p,construct:function(){qx.ui.table.cellrenderer.Abstract.call(this);
var s=this.self(arguments);

if(!s.stylesheet){s.stylesheet=qx.bom.Stylesheet.createElement(q+c+a+i);
}},members:{__Hw:16,__Hx:16,__Hy:null,_insetY:2,_identifyImage:function(t){throw new Error("_identifyImage is abstract");
},_getImageInfos:function(u){var v=this._identifyImage(u);
if(v==null||typeof v==d){v={url:v,tooltip:null};
}if(!v.imageWidth||!v.imageHeight){var w=this.__Hz(v.url);
v.imageWidth=w.width;
v.imageHeight=w.height;
}v.width=v.imageWidth;
v.height=v.imageHeight;
return v;
},__Hz:function(x){var A=qx.util.ResourceManager.getInstance();
var z=qx.io.ImageLoader;
var y,B;
if(A.has(x)){y=A.getImageWidth(x);
B=A.getImageHeight(x);
}else if(z.isLoaded(x)){y=z.getWidth(x);
B=z.getHeight(x);
}else{y=this.__Hw;
B=this.__Hx;
}return {width:y,height:B};
},createDataCellHtml:function(C,D){this.__Hy=this._getImageInfos(C);
return qx.ui.table.cellrenderer.Abstract.prototype.createDataCellHtml.call(this,C,D);
},_getCellClass:function(E){return qx.ui.table.cellrenderer.Abstract.prototype._getCellClass.call(this)+m;
},_getContentHtml:function(F){var content=l;
if(this.__Hy.url){content=qx.bom.element.Decoration.create(this.__Hy.url,j,{width:this.__Hy.width+r,height:this.__Hy.height+r,display:qx.bom.client.Engine.GECKO&&qx.bom.client.Engine.VERSION<1.9?g:h,verticalAlign:b,position:f});
}return content;
},_getCellAttributes:function(G){var H=this.__Hy.tooltip;

if(H){return e+H+k;
}else{return o;
}}},destruct:function(){this.__Hy=null;
}});
})();
(function(){var h="headerCellRendererChanged",g="visibilityChangedPre",f="Number",e="qx.event.type.Event",d="_applyFirstColumnX",c="Integer",b="qx.ui.table.pane.Model",a="_applyMaxColumnCount";
qx.Class.define(b,{extend:qx.core.Object,construct:function(i){qx.core.Object.call(this);
this.setTableColumnModel(i);
},events:{"modelChanged":e},statics:{EVENT_TYPE_MODEL_CHANGED:"modelChanged"},properties:{firstColumnX:{check:c,init:0,apply:d},maxColumnCount:{check:f,init:-1,apply:a}},members:{__xK:null,__xL:null,_applyFirstColumnX:function(j,k){this.__xK=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},_applyMaxColumnCount:function(l,m){this.__xK=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},setTableColumnModel:function(n){if(this.__xL){this.__xL.removeListener(g,this._onColVisibilityChanged,this);
this.__xL.removeListener(h,this._onColVisibilityChanged,this);
}this.__xL=n;
this.__xL.addListener(g,this._onColVisibilityChanged,this);
this.__xL.addListener(h,this._onHeaderCellRendererChanged,this);
this.__xK=null;
},_onColVisibilityChanged:function(o){this.__xK=null;
this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},_onHeaderCellRendererChanged:function(p){this.fireEvent(qx.ui.table.pane.Model.EVENT_TYPE_MODEL_CHANGED);
},getColumnCount:function(){if(this.__xK==null){var q=this.getFirstColumnX();
var s=this.getMaxColumnCount();
var r=this.__xL.getVisibleColumnCount();

if(s==-1||(q+s)>r){this.__xK=r-q;
}else{this.__xK=s;
}}return this.__xK;
},getColumnAtX:function(t){var u=this.getFirstColumnX();
return this.__xL.getVisibleColumnAtX(u+t);
},getX:function(v){var w=this.getFirstColumnX();
var y=this.getMaxColumnCount();
var x=this.__xL.getVisibleX(v)-w;

if(x>=0&&(y==-1||x<y)){return x;
}else{return -1;
}},getColumnLeft:function(z){var C=0;
var B=this.getColumnCount();

for(var x=0;x<B;x++){var A=this.getColumnAtX(x);

if(A==z){return C;
}C+=this.__xL.getColumnWidth(A);
}return -1;
},getTotalWidth:function(){var D=0;
var E=this.getColumnCount();

for(var x=0;x<E;x++){var F=this.getColumnAtX(x);
D+=this.__xL.getColumnWidth(F);
}return D;
}},destruct:function(){if(this.__xL){this.__xL.removeListener(g,this._onColVisibilityChanged,this);
this.__xL.removeListener(h,this._onColVisibilityChanged,this);
}this.__xL=null;
}});
})();
(function(){var f="changeVisible",d="qx.ui.table.columnmenu.MenuItem",c="_applyVisible",b="Boolean",a="changeValue";
qx.Class.define(d,{extend:qx.ui.menu.CheckBox,implement:qx.ui.table.IColumnMenuItem,properties:{visible:{check:b,init:true,apply:c,event:f}},construct:function(g){qx.ui.menu.CheckBox.call(this,g);
this.addListener(a,function(e){this.bInListener=true;
this.setVisible(e.getData());
this.bInListener=false;
});
},members:{__wn:false,_applyVisible:function(h,i){if(!this.bInListener){this.setValue(h);
}}}});
})();
(function(){var a="qx.lang.Number";
qx.Class.define(a,{statics:{isInRange:function(b,c,d){return b>=c&&b<=d;
},isBetweenRange:function(e,f,g){return e>f&&e<g;
},limit:function(h,i,j){if(j!=null&&h>j){return j;
}else if(i!=null&&h<i){return i;
}else{return h;
}}}});
})();
(function(){var c="hovered",b="__wX",a="qx.ui.table.pane.Header";
qx.Class.define(a,{extend:qx.ui.core.Widget,construct:function(d){qx.ui.core.Widget.call(this);
this._setLayout(new qx.ui.layout.HBox());
this.__wW=new qx.ui.core.Blocker(this);
this.__wX=d;
},members:{__wX:null,__wY:null,__xa:null,__wW:null,getPaneScroller:function(){return this.__wX;
},getTable:function(){return this.__wX.getTable();
},getBlocker:function(){return this.__wW;
},onColOrderChanged:function(){this._updateContent(true);
},onPaneModelChanged:function(){this._updateContent(true);
},onTableModelMetaDataChanged:function(){this._updateContent();
},setColumnWidth:function(e,f,g){var h=this.getHeaderWidgetAtColumn(e);

if(h!=null){h.setWidth(f);
}},setMouseOverColumn:function(i){if(i!=this.__xa){if(this.__xa!=null){var j=this.getHeaderWidgetAtColumn(this.__xa);

if(j!=null){j.removeState(c);
}}
if(i!=null){this.getHeaderWidgetAtColumn(i).addState(c);
}this.__xa=i;
}},getHeaderWidgetAtColumn:function(k){var l=this.getPaneScroller().getTablePaneModel().getX(k);
return this._getChildren()[l];
},showColumnMoveFeedback:function(m,x){var q=this.getContainerLocation();

if(this.__wY==null){var v=this.getTable();
var n=this.getPaneScroller().getTablePaneModel().getX(m);
var p=this._getChildren()[n];
var r=v.getTableModel();
var t=v.getTableColumnModel();
var u={xPos:n,col:m,name:r.getColumnName(m),table:v};
var s=t.getHeaderCellRenderer(m);
var o=s.createHeaderCell(u);
var w=p.getBounds();
o.setWidth(w.width);
o.setHeight(w.height);
o.setZIndex(1000000);
o.setOpacity(0.8);
o.setLayoutProperties({top:q.top});
this.getApplicationRoot().add(o);
this.__wY=o;
}this.__wY.setLayoutProperties({left:q.left+x});
this.__wY.show();
},hideColumnMoveFeedback:function(){if(this.__wY!=null){this.__wY.destroy();
this.__wY=null;
}},isShowingColumnMoveFeedback:function(){return this.__wY!=null;
},_updateContent:function(y){var I=this.getTable();
var C=I.getTableModel();
var F=I.getTableColumnModel();
var H=this.getPaneScroller().getTablePaneModel();
var K=this._getChildren();
var D=H.getColumnCount();
var G=C.getSortColumnIndex();
if(y){this._cleanUpCells();
}var z={};
z.sortedAscending=C.isSortAscending();

for(var x=0;x<D;x++){var B=H.getColumnAtX(x);

if(B===undefined){continue;
}var J=F.getColumnWidth(B);
var E=F.getHeaderCellRenderer(B);
z.xPos=x;
z.col=B;
z.name=C.getColumnName(B);
z.editable=C.isColumnEditable(B);
z.sorted=(B==G);
z.table=I;
var A=K[x];
if(A==null){A=E.createHeaderCell(z);
A.set({width:J});
this._add(A);
}else{E.updateHeaderCell(z,A);
}}},_cleanUpCells:function(){var M=this._getChildren();

for(var x=M.length-1;x>=0;x--){var L=M[x];
L.destroy();
}}},destruct:function(){this.__wW.dispose();
this._disposeObjects(b);
}});
})();
(function(){var t="",s="table-row-background-even",r="table-row-background-selected",q="table-row",p="background-color:",o="table-row-background-focused",n=';border-bottom: 1px solid ',m=';color:',l="table-row-selected",k="table-row-background-odd",d="default",j="table-row-background-focused-selected",g="qx.ui.table.rowrenderer.Default",c="table-row-line",b="'",f="height:",e=";",h="px;",a="1px solid ",i="Boolean";
qx.Class.define(g,{extend:qx.core.Object,implement:qx.ui.table.IRowRenderer,construct:function(){qx.core.Object.call(this);
this.__wi=t;
this.__wi={};
this.__wj={};
this._renderFont(qx.theme.manager.Font.getInstance().resolve(d));
var u=qx.theme.manager.Color.getInstance();
this.__wj.bgcolFocusedSelected=u.resolve(j);
this.__wj.bgcolFocused=u.resolve(o);
this.__wj.bgcolSelected=u.resolve(r);
this.__wj.bgcolEven=u.resolve(s);
this.__wj.bgcolOdd=u.resolve(k);
this.__wj.colSelected=u.resolve(l);
this.__wj.colNormal=u.resolve(q);
this.__wj.horLine=u.resolve(c);
},properties:{highlightFocusRow:{check:i,init:true}},members:{__wj:null,__wk:null,__wi:null,_insetY:1,_renderFont:function(v){if(v){this.__wk=v.getStyles();
this.__wi=qx.bom.element.Style.compile(this.__wk);
this.__wi=this.__wi.replace(/"/g,b);
}else{this.__wi=t;
this.__wk=qx.bom.Font.getDefaultStyles();
}},updateDataRowElement:function(w,x){var z=this.__wk;
var y=x.style;
qx.bom.element.Style.setStyles(x,z);

if(w.focusedRow&&this.getHighlightFocusRow()){y.backgroundColor=w.selected?this.__wj.bgcolFocusedSelected:this.__wj.bgcolFocused;
}else{if(w.selected){y.backgroundColor=this.__wj.bgcolSelected;
}else{y.backgroundColor=(w.row%2==0)?this.__wj.bgcolEven:this.__wj.bgcolOdd;
}}y.color=w.selected?this.__wj.colSelected:this.__wj.colNormal;
y.borderBottom=a+this.__wj.horLine;
},getRowHeightStyle:function(A){if(qx.bom.client.Feature.CONTENT_BOX){A-=this._insetY;
}return f+A+h;
},createRowStyle:function(B){var C=[];
C.push(e);
C.push(this.__wi);
C.push(p);

if(B.focusedRow&&this.getHighlightFocusRow()){C.push(B.selected?this.__wj.bgcolFocusedSelected:this.__wj.bgcolFocused);
}else{if(B.selected){C.push(this.__wj.bgcolSelected);
}else{C.push((B.row%2==0)?this.__wj.bgcolEven:this.__wj.bgcolOdd);
}}C.push(m);
C.push(B.selected?this.__wj.colSelected:this.__wj.colNormal);
C.push(n,this.__wj.horLine);
return C.join(t);
},getRowClass:function(D){return t;
},getRowAttributes:function(E){return t;
}},destruct:function(){this.__wj=this.__wk=this.__wi=null;
}});
})();
(function(){var g="String",f="_applyIconTrue",e="decoration/table/boolean-true.png",d="qx.ui.table.cellrenderer.Boolean",c=";padding-top:4px;",b="decoration/table/boolean-false.png",a="_applyIconFalse";
qx.Class.define(d,{extend:qx.ui.table.cellrenderer.AbstractImage,construct:function(){qx.ui.table.cellrenderer.AbstractImage.call(this);
this.__Jo=qx.util.AliasManager.getInstance();
this.initIconTrue();
this.initIconFalse();
},properties:{iconTrue:{check:g,init:e,apply:f},iconFalse:{check:g,init:b,apply:a}},members:{__Jp:null,__Jq:false,__Jo:null,_applyIconTrue:function(h){this.__Jp=this.__Jo.resolve(h);
},_applyIconFalse:function(i){this.__Jq=this.__Jo.resolve(i);
},_insetY:5,_getCellStyle:function(j){return qx.ui.table.cellrenderer.AbstractImage.prototype._getCellStyle.call(this,j)+c;
},_identifyImage:function(k){var l={imageWidth:11,imageHeight:11};

switch(k.value){case true:l.url=this.__Jp;
break;
case false:l.url=this.__Jq;
break;
default:l.url=null;
break;
}return l;
}},destruct:function(){this.__Jo=null;
}});
})();
(function(){var p="Boolean",o="column-button",n="Function",m="qx.event.type.Data",k="statusbar",j="qx.ui.table.pane.CellEvent",h="function",g="PageUp",f="dataChanged",e='"',bF="changeLocale",bE="changeSelection",bD="qx.dynlocale",bC="__wd",bB="Enter",bA="metaDataChanged",bz="on",by="_applyStatusBarVisible",bx="columnVisibilityMenuCreateStart",bw="blur",w="qx.ui.table.Table",y="columnVisibilityMenuCreateEnd",u="changeVisible",v="_applyResetSelectionOnHeaderClick",s="_applyMetaColumnCounts",t="focus",q="changeDataRowRenderer",r="changeHeaderCellHeight",F="Escape",G="A",X="changeSelectionModel",T="Left",bg="__vS",bb="Down",bs="Integer",bm="_applyHeaderCellHeight",N="__wb",bv="visibilityChanged",bu="qx.ui.table.ITableModel",bt="orderChanged",L="_applySelectionModel",P="menu-button",R="menu",V="_applyAdditionalStatusBarText",Y="_applyFocusCellOnMouseMove",bc="table",bi="_applyColumnVisibilityButtonVisible",bo="changeTableModel",z="qx.event.type.Event",A="tableWidthChanged",O="_applyHeaderCellsVisible",bf="Object",be="_applyShowCellFocusIndicator",bd="resize",bk="verticalScrollBarChanged",bj="__wc",ba="changeScrollY",bh="_applyTableModel",a="End",bn="_applyKeepFirstVisibleRowComplete",B="widthChanged",C="one of one row",U="Home",b="_applyRowHeight",d="F2",K="appear",D="Up",E="%1 rows",I="qx.ui.table.selection.Model",W="one row",bq="PageDown",bp="%1 of %2 rows",Q="keypress",br="changeRowHeight",M="__vT",bl="Number",H="header",J="qx.ui.table.IRowRenderer",c="Right",S="Space";
qx.Class.define(w,{extend:qx.ui.core.Widget,construct:function(bG,bH){qx.ui.core.Widget.call(this);
if(!bH){bH={};
}
if(bH.initiallyHiddenColumns){this.setInitiallyHiddenColumns(bH.initiallyHiddenColumns);
}
if(bH.selectionManager){this.setNewSelectionManager(bH.selectionManager);
}
if(bH.selectionModel){this.setNewSelectionModel(bH.selectionModel);
}
if(bH.tableColumnModel){this.setNewTableColumnModel(bH.tableColumnModel);
}
if(bH.tablePane){this.setNewTablePane(bH.tablePane);
}
if(bH.tablePaneHeader){this.setNewTablePaneHeader(bH.tablePaneHeader);
}
if(bH.tablePaneScroller){this.setNewTablePaneScroller(bH.tablePaneScroller);
}
if(bH.tablePaneModel){this.setNewTablePaneModel(bH.tablePaneModel);
}
if(bH.columnMenu){this.setNewColumnMenu(bH.columnMenu);
}this._setLayout(new qx.ui.layout.VBox());
this.__vS=new qx.ui.container.Composite(new qx.ui.layout.HBox());
this._add(this.__vS,{flex:1});
this.setDataRowRenderer(new qx.ui.table.rowrenderer.Default(this));
this.__vT=this.getNewSelectionManager()(this);
this.setSelectionModel(this.getNewSelectionModel()(this));
this.setTableModel(bG||this.getEmptyTableModel());
this.setMetaColumnCounts([-1]);
this.setTabIndex(1);
this.addListener(Q,this._onKeyPress);
this.addListener(t,this._onFocusChanged);
this.addListener(bw,this._onFocusChanged);
var bI=new qx.ui.core.Widget().set({height:0});
this._add(bI);
bI.addListener(bd,this._onResize,this);
this.__vU=null;
this.__vV=null;
if(qx.core.Variant.isSet(bD,bz)){qx.locale.Manager.getInstance().addListener(bF,this._onChangeLocale,this);
}this.initStatusBarVisible();
bG=this.getTableModel();

if(bG.init&&typeof (bG.init)==h){bG.init(this);
}},events:{"columnVisibilityMenuCreateStart":m,"columnVisibilityMenuCreateEnd":m,"tableWidthChanged":z,"verticalScrollBarChanged":m,"cellClick":j,"cellDblclick":j,"cellContextmenu":j,"dataEdited":m},statics:{__vW:{cellClick:1,cellDblclick:1,cellContextmenu:1}},properties:{appearance:{refine:true,init:bc},focusable:{refine:true,init:true},minWidth:{refine:true,init:50},initiallyHiddenColumns:{init:null},selectable:{refine:true,init:false},selectionModel:{check:I,apply:L,event:X},tableModel:{check:bu,apply:bh,event:bo},rowHeight:{check:bl,init:20,apply:b,event:br},forceLineHeight:{check:p,init:true},headerCellsVisible:{check:p,init:true,apply:O},headerCellHeight:{check:bs,init:16,apply:bm,event:r,nullable:true},statusBarVisible:{check:p,init:true,apply:by},additionalStatusBarText:{nullable:true,init:null,apply:V},columnVisibilityButtonVisible:{check:p,init:true,apply:bi},metaColumnCounts:{check:bf,apply:s},focusCellOnMouseMove:{check:p,init:false,apply:Y},rowFocusChangeModifiesSelection:{check:p,init:true},showCellFocusIndicator:{check:p,init:true,apply:be},keepFirstVisibleRowComplete:{check:p,init:true,apply:bn},alwaysUpdateCells:{check:p,init:false},resetSelectionOnHeaderClick:{check:p,init:true,apply:v},dataRowRenderer:{check:J,init:null,nullable:true,event:q},modalCellEditorPreOpenFunction:{check:n,init:null,nullable:true},newColumnMenu:{check:n,init:function(){return new qx.ui.table.columnmenu.Button();
}},newSelectionManager:{check:n,init:function(bJ){return new qx.ui.table.selection.Manager(bJ);
}},newSelectionModel:{check:n,init:function(bK){return new qx.ui.table.selection.Model(bK);
}},newTableColumnModel:{check:n,init:function(bL){return new qx.ui.table.columnmodel.Basic(bL);
}},newTablePane:{check:n,init:function(bM){return new qx.ui.table.pane.Pane(bM);
}},newTablePaneHeader:{check:n,init:function(bN){return new qx.ui.table.pane.Header(bN);
}},newTablePaneScroller:{check:n,init:function(bO){return new qx.ui.table.pane.Scroller(bO);
}},newTablePaneModel:{check:n,init:function(bP){return new qx.ui.table.pane.Model(bP);
}}},members:{__vU:null,__vV:null,__vS:null,__vT:null,__vX:null,__vY:null,__wa:null,__wb:null,__wc:null,__wd:null,_createChildControlImpl:function(bQ,bR){var bS;

switch(bQ){case k:bS=new qx.ui.basic.Label();
bS.set({allowGrowX:true});
this._add(bS);
break;
case o:bS=this.getNewColumnMenu()();
bS.set({focusable:false});
var bT=bS.factory(R,{table:this});
bT.addListener(K,this._initColumnMenu,this);
break;
}return bS||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bQ);
},_applySelectionModel:function(bU,bV){this.__vT.setSelectionModel(bU);

if(bV!=null){bV.removeListener(bE,this._onSelectionChanged,this);
}bU.addListener(bE,this._onSelectionChanged,this);
},_applyRowHeight:function(bW,bX){var bY=this._getPaneScrollerArr();

for(var i=0;i<bY.length;i++){bY[i].updateVerScrollBarMaximum();
}},_applyHeaderCellsVisible:function(ca,cb){var cc=this._getPaneScrollerArr();

for(var i=0;i<cc.length;i++){cc[i]._excludeChildControl(H);
}},_applyHeaderCellHeight:function(cd,ce){var cf=this._getPaneScrollerArr();

for(var i=0;i<cf.length;i++){cf[i].getHeader().setHeight(cd);
}},getEmptyTableModel:function(){if(!this.__wd){this.__wd=new qx.ui.table.model.Simple();
this.__wd.setColumns([]);
this.__wd.setData([]);
}return this.__wd;
},_applyTableModel:function(cg,ch){this.getTableColumnModel().init(cg.getColumnCount(),this);

if(ch!=null){ch.removeListener(bA,this._onTableModelMetaDataChanged,this);
ch.removeListener(f,this._onTableModelDataChanged,this);
}cg.addListener(bA,this._onTableModelMetaDataChanged,this);
cg.addListener(f,this._onTableModelDataChanged,this);
this._updateStatusBar();
this._updateTableData(0,cg.getRowCount(),0,cg.getColumnCount());
this._onTableModelMetaDataChanged();
if(ch&&cg.init&&typeof (cg.init)==h){cg.init(this);
}},getTableColumnModel:function(){if(!this.__wc){var ck=this.__wc=this.getNewTableColumnModel()(this);
ck.addListener(bv,this._onColVisibilityChanged,this);
ck.addListener(B,this._onColWidthChanged,this);
ck.addListener(bt,this._onColOrderChanged,this);
var cj=this.getTableModel();
ck.init(cj.getColumnCount(),this);
var ci=this._getPaneScrollerArr();

for(var i=0;i<ci.length;i++){var cl=ci[i];
var cm=cl.getTablePaneModel();
cm.setTableColumnModel(ck);
}}return this.__wc;
},_applyStatusBarVisible:function(cn,co){if(cn){this._showChildControl(k);
}else{this._excludeChildControl(k);
}
if(cn){this._updateStatusBar();
}},_applyAdditionalStatusBarText:function(cp,cq){this.__vX=cp;
this._updateStatusBar();
},_applyColumnVisibilityButtonVisible:function(cr,cs){if(cr){this._showChildControl(o);
}else{this._excludeChildControl(o);
}},_applyMetaColumnCounts:function(ct,cu){var cB=ct;
var cv=this._getPaneScrollerArr();
var cz={};

if(ct>cu){var cD=qx.event.Registration.getManager(cv[0]);

for(var cE in qx.ui.table.Table.__vW){cz[cE]={};
cz[cE].capture=cD.getListeners(cv[0],cE,true);
cz[cE].bubble=cD.getListeners(cv[0],cE,false);
}}this._cleanUpMetaColumns(cB.length);
var cA=0;

for(var i=0;i<cv.length;i++){var cF=cv[i];
var cC=cF.getTablePaneModel();
cC.setFirstColumnX(cA);
cC.setMaxColumnCount(cB[i]);
cA+=cB[i];
}if(cB.length>cv.length){var cy=this.getTableColumnModel();

for(var i=cv.length;i<cB.length;i++){var cC=this.getNewTablePaneModel()(cy);
cC.setFirstColumnX(cA);
cC.setMaxColumnCount(cB[i]);
cA+=cB[i];
var cF=this.getNewTablePaneScroller()(this);
cF.setTablePaneModel(cC);
cF.addListener(ba,this._onScrollY,this);
for(cE in qx.ui.table.Table.__vW){if(!cz[cE]){break;
}
if(cz[cE].capture&&cz[cE].capture.length>0){var cw=cz[cE].capture;

for(var i=0;i<cw.length;i++){var cx=cw[i].context;

if(!cx){cx=this;
}else if(cx==cv[0]){cx=cF;
}cF.addListener(cE,cw[i].handler,cx,true);
}}
if(cz[cE].bubble&&cz[cE].bubble.length>0){var cH=cz[cE].bubble;

for(var i=0;i<cH.length;i++){var cx=cH[i].context;

if(!cx){cx=this;
}else if(cx==cv[0]){cx=cF;
}cF.addListener(cE,cH[i].handler,cx,false);
}}}var cG=(i==cB.length-1)?1:0;
this.__vS.add(cF,{flex:cG});
cv=this._getPaneScrollerArr();
}}for(var i=0;i<cv.length;i++){var cF=cv[i];
var cI=(i==(cv.length-1));
cF.getHeader().setHeight(this.getHeaderCellHeight());
cF.setTopRightWidget(cI?this.getChildControl(o):null);
}
if(!this.isColumnVisibilityButtonVisible()){this._excludeChildControl(o);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_applyFocusCellOnMouseMove:function(cJ,cK){var cL=this._getPaneScrollerArr();

for(var i=0;i<cL.length;i++){cL[i].setFocusCellOnMouseMove(cJ);
}},_applyShowCellFocusIndicator:function(cM,cN){var cO=this._getPaneScrollerArr();

for(var i=0;i<cO.length;i++){cO[i].setShowCellFocusIndicator(cM);
}},_applyKeepFirstVisibleRowComplete:function(cP,cQ){var cR=this._getPaneScrollerArr();

for(var i=0;i<cR.length;i++){cR[i].onKeepFirstVisibleRowCompleteChanged();
}},_applyResetSelectionOnHeaderClick:function(cS,cT){var cU=this._getPaneScrollerArr();

for(var i=0;i<cU.length;i++){cU[i].setResetSelectionOnHeaderClick(cS);
}},getSelectionManager:function(){return this.__vT;
},_getPaneScrollerArr:function(){return this.__vS.getChildren();
},getPaneScroller:function(cV){return this._getPaneScrollerArr()[cV];
},_cleanUpMetaColumns:function(cW){var cX=this._getPaneScrollerArr();

if(cX!=null){for(var i=cX.length-1;i>=cW;i--){cX[i].destroy();
}}},_onChangeLocale:function(cY){this.updateContent();
this._updateStatusBar();
},_onSelectionChanged:function(da){var db=this._getPaneScrollerArr();

for(var i=0;i<db.length;i++){db[i].onSelectionChanged();
}this._updateStatusBar();
},_onTableModelMetaDataChanged:function(dc){var dd=this._getPaneScrollerArr();

for(var i=0;i<dd.length;i++){dd[i].onTableModelMetaDataChanged();
}this._updateStatusBar();
},_onTableModelDataChanged:function(de){var df=de.getData();
this._updateTableData(df.firstRow,df.lastRow,df.firstColumn,df.lastColumn,df.removeStart,df.removeCount);
},_updateTableData:function(dg,dh,di,dj,dk,dl){var dm=this._getPaneScrollerArr();
if(dl){this.getSelectionModel().removeSelectionInterval(dk,dk+dl);
if(this.__vV>=dk&&this.__vV<(dk+dl)){this.setFocusedCell();
}}
for(var i=0;i<dm.length;i++){dm[i].onTableModelDataChanged(dg,dh,di,dj);
}var dn=this.getTableModel().getRowCount();

if(dn!=this.__vY){this.__vY=dn;
this._updateScrollBarVisibility();
this._updateStatusBar();
}},_onScrollY:function(dp){if(!this.__wa){this.__wa=true;
var dq=this._getPaneScrollerArr();

for(var i=0;i<dq.length;i++){dq[i].setScrollY(dp.getData());
}this.__wa=false;
}},_onKeyPress:function(dr){if(!this.getEnabled()){return;
}var dy=this.__vV;
var dv=true;
var dz=dr.getKeyIdentifier();

if(this.isEditing()){if(dr.getModifiers()==0){switch(dz){case bB:this.stopEditing();
var dy=this.__vV;
this.moveFocusedCell(0,1);

if(this.__vV!=dy){dv=this.startEditing();
}break;
case F:this.cancelEditing();
this.focus();
break;
default:dv=false;
break;
}}}else{if(dr.isCtrlPressed()){dv=true;

switch(dz){case G:var dw=this.getTableModel().getRowCount();

if(dw>0){this.getSelectionModel().setSelectionInterval(0,dw-1);
}break;
default:dv=false;
break;
}}else{switch(dz){case S:this.__vT.handleSelectKeyDown(this.__vV,dr);
break;
case d:case bB:this.startEditing();
dv=true;
break;
case U:this.setFocusedCell(this.__vU,0,true);
break;
case a:var dw=this.getTableModel().getRowCount();
this.setFocusedCell(this.__vU,dw-1,true);
break;
case T:this.moveFocusedCell(-1,0);
break;
case c:this.moveFocusedCell(1,0);
break;
case D:this.moveFocusedCell(0,-1);
break;
case bb:this.moveFocusedCell(0,1);
break;
case g:case bq:var du=this.getPaneScroller(0);
var dx=du.getTablePane();
var dt=this.getRowHeight();
var ds=(dz==g)?-1:1;
dw=dx.getVisibleRowCount()-1;
du.setScrollY(du.getScrollY()+ds*dw*dt);
this.moveFocusedCell(0,ds*dw);
break;
default:dv=false;
}}}
if(dy!=this.__vV&&this.getRowFocusChangeModifiesSelection()){this.__vT.handleMoveKeyDown(this.__vV,dr);
}
if(dv){dr.preventDefault();
dr.stopPropagation();
}},_onFocusChanged:function(dA){var dB=this._getPaneScrollerArr();

for(var i=0;i<dB.length;i++){dB[i].onFocusChanged();
}},_onColVisibilityChanged:function(dC){var dD=this._getPaneScrollerArr();

for(var i=0;i<dD.length;i++){dD[i].onColVisibilityChanged();
}var dE=dC.getData();

if(this.__wb!=null&&dE.col!=null&&dE.visible!=null){this.__wb[dE.col].setVisible(dE.visible);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColWidthChanged:function(dF){var dG=this._getPaneScrollerArr();

for(var i=0;i<dG.length;i++){var dH=dF.getData();
dG[i].setColumnWidth(dH.col,dH.newWidth);
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},_onColOrderChanged:function(dI){var dJ=this._getPaneScrollerArr();

for(var i=0;i<dJ.length;i++){dJ[i].onColOrderChanged();
}this._updateScrollerWidths();
this._updateScrollBarVisibility();
},getTablePaneScrollerAtPageX:function(dK){var dL=this._getMetaColumnAtPageX(dK);
return (dL!=-1)?this.getPaneScroller(dL):null;
},setFocusedCell:function(dM,dN,dO){if(!this.isEditing()&&(dM!=this.__vU||dN!=this.__vV)){if(dM===null){dM=0;
}this.__vU=dM;
this.__vV=dN;
var dP=this._getPaneScrollerArr();

for(var i=0;i<dP.length;i++){dP[i].setFocusedCell(dM,dN);
}
if(dM!==null&&dO){this.scrollCellVisible(dM,dN);
}}},resetSelection:function(){this.getSelectionModel().resetSelection();
},resetCellFocus:function(){this.setFocusedCell(null,null,false);
},getFocusedColumn:function(){return this.__vU;
},getFocusedRow:function(){return this.__vV;
},highlightFocusedRow:function(dQ){this.getDataRowRenderer().setHighlightFocusRow(dQ);
},clearFocusedRowHighlight:function(dR){if(dR){var dT=dR.getRelatedTarget();

if(dT instanceof qx.ui.table.pane.Pane||dT instanceof qx.ui.table.pane.FocusIndicator){return;
}}this.resetCellFocus();
var dS=this._getPaneScrollerArr();

for(var i=0;i<dS.length;i++){dS[i].onFocusChanged();
}},moveFocusedCell:function(dU,dV){var ea=this.__vU;
var eb=this.__vV;

if(ea===null||eb===null){return;
}
if(dU!=0){var dY=this.getTableColumnModel();
var x=dY.getVisibleX(ea);
var dX=dY.getVisibleColumnCount();
x=qx.lang.Number.limit(x+dU,0,dX-1);
ea=dY.getVisibleColumnAtX(x);
}
if(dV!=0){var dW=this.getTableModel();
eb=qx.lang.Number.limit(eb+dV,0,dW.getRowCount()-1);
}this.setFocusedCell(ea,eb,true);
},scrollCellVisible:function(ec,ed){var ee=this.getTableColumnModel();
var x=ee.getVisibleX(ec);
var ef=this._getMetaColumnAtColumnX(x);

if(ef!=-1){this.getPaneScroller(ef).scrollCellVisible(ec,ed);
}},isEditing:function(){if(this.__vU!=null){var x=this.getTableColumnModel().getVisibleX(this.__vU);
var eg=this._getMetaColumnAtColumnX(x);
return this.getPaneScroller(eg).isEditing();
}return false;
},startEditing:function(){if(this.__vU!=null){var x=this.getTableColumnModel().getVisibleX(this.__vU);
var ei=this._getMetaColumnAtColumnX(x);
var eh=this.getPaneScroller(ei).startEditing();
return eh;
}return false;
},stopEditing:function(){if(this.__vU!=null){var x=this.getTableColumnModel().getVisibleX(this.__vU);
var ej=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(ej).stopEditing();
}},cancelEditing:function(){if(this.__vU!=null){var x=this.getTableColumnModel().getVisibleX(this.__vU);
var ek=this._getMetaColumnAtColumnX(x);
this.getPaneScroller(ek).cancelEditing();
}},updateContent:function(){var el=this._getPaneScrollerArr();

for(var i=0;i<el.length;i++){el[i].getTablePane().updateContent(true);
}},blockHeaderElements:function(){var em=this._getPaneScrollerArr();

for(var i=0;i<em.length;i++){em[i].getHeader().getBlocker().blockContent(20);
}this.getChildControl(o).getBlocker().blockContent(20);
},unblockHeaderElements:function(){var en=this._getPaneScrollerArr();

for(var i=0;i<en.length;i++){en[i].getHeader().getBlocker().unblockContent();
}this.getChildControl(o).getBlocker().unblockContent();
},_getMetaColumnAtPageX:function(eo){var ep=this._getPaneScrollerArr();

for(var i=0;i<ep.length;i++){var eq=ep[i].getContainerLocation();

if(eo>=eq.left&&eo<=eq.right){return i;
}}return -1;
},_getMetaColumnAtColumnX:function(er){var et=this.getMetaColumnCounts();
var eu=0;

for(var i=0;i<et.length;i++){var es=et[i];
eu+=es;

if(es==-1||er<eu){return i;
}}return -1;
},_updateStatusBar:function(){var ev=this.getTableModel();

if(this.getStatusBarVisible()){var ew=this.getSelectionModel().getSelectedCount();
var ey=ev.getRowCount();
var ex;

if(ey>=0){if(ew==0){ex=this.trn(W,E,ey,ey);
}else{ex=this.trn(C,bp,ey,ew,ey);
}}
if(this.__vX){if(ex){ex+=this.__vX;
}else{ex=this.__vX;
}}
if(ex){this.getChildControl(k).setValue(ex);
}}},_updateScrollerWidths:function(){var ez=this._getPaneScrollerArr();

for(var i=0;i<ez.length;i++){var eB=(i==(ez.length-1));
var eC=ez[i].getTablePaneModel().getTotalWidth();
ez[i].setPaneWidth(eC);
var eA=eB?1:0;
ez[i].setLayoutProperties({flex:eA});
}},_updateScrollBarVisibility:function(){if(!this.getBounds()){return;
}var eG=qx.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
var eJ=qx.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
var eD=this._getPaneScrollerArr();
var eF=false;
var eI=false;

for(var i=0;i<eD.length;i++){var eK=(i==(eD.length-1));
var eE=eD[i].getNeededScrollBars(eF,!eK);

if(eE&eG){eF=true;
}
if(eK&&(eE&eJ)){eI=true;
}}for(var i=0;i<eD.length;i++){var eK=(i==(eD.length-1));
var eH;
eD[i].setHorizontalScrollBarVisible(eF);
if(eK){eH=eD[i].getVerticalScrollBarVisible();
}eD[i].setVerticalScrollBarVisible(eK&&eI);
if(eK&&eI!=eH){this.fireDataEvent(bk,eI);
}}},_initColumnMenu:function(){var eN=this.getTableModel();
var eO=this.getTableColumnModel();
var eP=this.getChildControl(o);
eP.empty();
var eM=eP.getMenu();
var eQ={table:this,menu:eM,columnButton:eP};
this.fireDataEvent(bx,eQ);
this.__wb={};

for(var eR=0,l=eN.getColumnCount();eR<l;eR++){var eL=eP.factory(P,{text:eN.getColumnName(eR),column:eR,bVisible:eO.isColumnVisible(eR)});
qx.core.Assert.assertInterface(eL,qx.ui.table.IColumnMenuItem);
eL.addListener(u,this._createColumnVisibilityCheckBoxHandler(eR),this);
this.__wb[eR]=eL;
}eQ={table:this,menu:eM,columnButton:eP};
this.fireDataEvent(y,eQ);
},_createColumnVisibilityCheckBoxHandler:function(eS){return function(eT){var eU=this.getTableColumnModel();
eU.setColumnVisible(eS,eT.getData());
};
},setColumnWidth:function(eV,eW){this.getTableColumnModel().setColumnWidth(eV,eW);
},_onResize:function(){this.fireEvent(A);
this._updateScrollerWidths();
this._updateScrollBarVisibility();
},addListener:function(eX,eY,self,fa){if(this.self(arguments).__vW[eX]){var fc=[eX];

for(var i=0,fb=this._getPaneScrollerArr();i<fb.length;i++){fc.push(fb[i].addListener.apply(fb[i],arguments));
}return fc.join(e);
}else{return qx.ui.core.Widget.prototype.addListener.call(this,eX,eY,self,fa);
}},removeListener:function(fd,fe,self,ff){if(this.self(arguments).__vW[fd]){for(var i=0,fg=this._getPaneScrollerArr();i<fg.length;i++){fg[i].removeListener.apply(fg[i],arguments);
}}else{qx.ui.core.Widget.prototype.removeListener.call(this,fd,fe,self,ff);
}},removeListenerById:function(fh){var fl=fh.split(e);
var fk=fl.shift();

if(this.self(arguments).__vW[fk]){var fj=true;

for(var i=0,fi=this._getPaneScrollerArr();i<fi.length;i++){fj=fi[i].removeListenerById.call(fi[i],fl[i])&&fj;
}return fj;
}else{return qx.ui.core.Widget.prototype.removeListenerById.call(this,fh);
}},destroy:function(){this.getChildControl(o).getMenu().destroy();
qx.ui.core.Widget.prototype.destroy.call(this);
}},destruct:function(){if(qx.core.Variant.isSet(bD,bz)){qx.locale.Manager.getInstance().removeListener(bF,this._onChangeLocale,this);
}var fn=this.getSelectionModel();

if(fn){fn.dispose();
}var fm=this.getDataRowRenderer();

if(fm){fm.dispose();
}this._cleanUpMetaColumns(0);
this.getTableColumnModel().dispose();
this._disposeObjects(M,bg,bC,bC,bj);
this._disposeMap(N);
}});
})();

});