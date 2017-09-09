/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

/* ************************************************************************

#asset(demobrowser/demo/flash/fo_tester.swf)

************************************************************************ */

/**
 * Demonstrates qx.ui.embed(...):
 *
 * embed.Canvas
 * embed.Flash
 * embed.Html
 * 
 */

qx.Class.define("demobrowser.demo.ui.overview.pages.Embed",
{
  extend: qx.ui.tabview.Page,

  include : demobrowser.demo.ui.overview.MControls,

  construct: function()
  {
    this.base(arguments);

    this.setLabel("Embed");
    this.setLayout(new qx.ui.layout.Canvas());

    var gridLayout = new qx.ui.layout.Grid(100, 10);
    gridLayout.setColumnFlex(1, 1);
    this.__container = new qx.ui.container.Composite(gridLayout);
    this.add(this.__container, {top: 40, width: "100%", height: "100%"});

    this._initWidgets();
    this._initControls(this.__widgets, {disabled: true});
  },

  members :
  {
    __widgets: null,

    __container: null,

    _initWidgets: function()
    {
      var widgets = this.__widgets = new qx.type.Array();
      var label;

      // Flash
      label = new qx.ui.basic.Label("Flash");
      this.__container.add(label, {row: 0, column: 0});
      var flashVars = {
        flashVarText: "this is passed in via FlashVars"
      };
      var flash = new qx.ui.embed.Flash("demobrowser/demo/flash/fo_tester.swf").set({
        scale: "noscale",
        width: 100,
        height: 200,
        variables : flashVars
      });
      flash.getContentElement().setParam("bgcolor", "#FF6600");
      widgets.push(flash);
      this.__container.add(flash, {row: 1, column: 0, colSpan: 2});

      // Canvas
      label = new qx.ui.basic.Label("Canvas");
      this.__container.add(label, {row: 2, column: 0});
      var canvas = new qx.ui.embed.Canvas().set({
        width: 200,
        height: 200,
        canvasWidth: 200,
        canvasHeight: 200,
        syncDimension: true
      });
      canvas.addListener("redraw", this.__draw, this);
      widgets.push(canvas);
      this.__container.add(canvas, {row: 3, column: 0});

      // HTML
      label = new qx.ui.basic.Label("HTML");
      this.__container.add(label, {row: 2, column: 1});

      var htmlContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      this.__container.add(htmlContainer, {row: 3, column: 1});

      var html1 = "<div style='background-color: white; text-align: center;'>" +
                    "<i style='color: red;'><b>H</b></i>" +
                    "<b>T</b>" +
                    "<u>M</u>" +
                    "<i>L</i>" +
                    " Text" +
                  "</div>";
      var embed1 = new qx.ui.embed.Html(html1);
      widgets.push(embed1);
      embed1.setMaxWidth(200);
      embed1.setHeight(20);
      embed1.setDecorator("main");
      htmlContainer.add(embed1);

      // Example HTML embed with set font
      var html2 = "Text with set font (bold)!";
      var embed2 = new qx.ui.embed.Html(html2);
      widgets.push(embed2);
      embed2.setMaxWidth(200);
      embed2.setFont("bold");
      embed2.setHeight(20);
      embed2.setDecorator("main");
      htmlContainer.add(embed2);


      // Rich content
      var rich = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla f';
      var richWidget = new qx.ui.embed.Html(rich);
      widgets.push(richWidget);
      richWidget.setOverflow("auto", "auto");
      richWidget.setDecorator("main");
      richWidget.setBackgroundColor("white");
      richWidget.setHeight(150);
      richWidget.setMaxWidth(200);
      htmlContainer.add(richWidget);
    },

    __draw: function(e) {
      var data = e.getData();
      var ctx = data.context;

      ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (20, 20, 105, 100);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (70, 70, 105, 100)
    }
  }
});