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

#asset(qx/icon/${qx.icontheme}/16/actions/*)
#asset(qx/icon/${qx.icontheme}/16/apps/utilities-help.png)
#asset(qx/icon/${qx.icontheme}/22/apps/preferences-users.png)

************************************************************************ */

/**
 * Demonstrates qx.ui.(...):
 *
 * menu.Button
 * menu.CheckBox
 * menu.Menu
 * menu.MenuSlideBar
 * menu.RadioButton
 * menu.Separator
 * menubar.Button
 * menubar.MenuBar
 * toolbar.Button
 * toolbar.CheckBox
 * toolbar.MenuButton
 * toolbar.Part
 * toolbar.PartContainer
 * toolbar.RadioButton
 * toolbar.Separator
 * toolbar.SplitButton
 * toolbar.ToolBar
 *
 */

qx.Class.define("demobrowser.demo.ui.overview.pages.ToolBar",
{
  extend: qx.ui.tabview.Page,

  include : demobrowser.demo.ui.overview.MControls,

  construct: function()
  {
    this.base(arguments);

    this.setLabel("Toolbar/Menu");
    this.setLayout(new qx.ui.layout.Canvas());

    this.__container = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
    this.add(this.__container, {top: 40});

    this._initWidgets();
    this._initControls(this.__widgets, {disabled: true, hovered: true, selected: true});
  },

  members :
  {
    __widgets: null,
    __container: null,

    _initWidgets: function()
    {
      this.__widgets = new qx.type.Array();
      var label;

      // Toolbar
      label = new qx.ui.basic.Label("ToolBar & Menu");
      this.__container.add(label, {left: 0, top: 0});
      this.__container.add(this.getToolBar(), {left: 0, top: 20});

      // Menu (with slidebar)
      this.__container.add(this.getMenuWithSlideBar(), {left: 0, top: 70});

      // MenuBar
      label = new qx.ui.basic.Label("MenuBar & Menu");
      this.__container.add(label, {left: 0, top: 210});
      this.__container.add(this.getMenuBar(), {left: 0, top: 230});
    },

    getToolBar : function()
    {
      var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow);
      frame.setDecorator("main");

      //
      // ToolBar
      //

      var toolbar = new qx.ui.toolbar.ToolBar;
      toolbar.setWidth(200);
      frame.add(toolbar);

      // Part
      var firstPart = new qx.ui.toolbar.Part;
      var secondPart = new qx.ui.toolbar.Part;

      toolbar.add(firstPart);
      toolbar.addSpacer();
      toolbar.add(secondPart);

      // SplitButton
      var splitButton = new qx.ui.toolbar.SplitButton("Toolbar SplitButton", "icon/16/actions/go-previous.png", this.getSplitButtonMenu());
      splitButton.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar SplitButton"));
      this.__widgets.push(splitButton);

      // Button
      var button = new qx.ui.toolbar.Button("Toolbar Button", "icon/16/actions/document-new.png");
      button.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar Button"));
      this.__widgets.push(button);

      // CheckBox
      var checkBox = new qx.ui.toolbar.CheckBox("Toggle", "icon/16/actions/format-text-underline.png");
      checkBox.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar CheckBox"));
      this.__widgets.push(checkBox);

      // RadioButton
      var radioButton1 = new qx.ui.toolbar.RadioButton("Left", "icon/16/actions/format-justify-left.png");
      radioButton1.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar RadioButton"));
      this.__widgets.push(radioButton1);

      var radioButton2 = new qx.ui.toolbar.RadioButton("Center", "icon/16/actions/format-justify-center.png");
      radioButton2.setToolTip(new qx.ui.tooltip.ToolTip("Toolbar RadioButton"));
      this.__widgets.push(radioButton2);

      var radioGroup = new qx.ui.form.RadioGroup(radioButton1, radioButton2);
      radioGroup.setAllowEmptySelection(true);

      firstPart.add(splitButton);
      firstPart.addSeparator();
      firstPart.add(button);
      firstPart.add(checkBox);
      firstPart.add(radioButton1);
      firstPart.add(radioButton2);
      firstPart.setShow("icon");

      // MenuButton
      var menuButton = new qx.ui.toolbar.MenuButton("Toolbar MenuButton");
      this.__widgets.push(menuButton);
      menuButton.setMenu(this.getButtonMenu());
      secondPart.add(menuButton);

      return frame;
    },

    getSplitButtonMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      //
      // Menu
      //

      // MenuButton
      var button1 = new qx.ui.menu.Button("Menu MenuButton");
      this.__widgets.push(button1);

      menu.add(button1);

      return menu;
    },

    getButtonMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      //
      // Menu
      //

      // MenuButton
      var button = new qx.ui.menu.Button("Menu MenuButton", "icon/16/actions/document-new.png");
      this.__widgets.push(button);

      // CheckBox
      var checkBox = new qx.ui.menu.CheckBox("Menu MenuCheckBox");
      this.__widgets.push(checkBox);

      // CheckBox (checked)
      var checkBoxChecked = new qx.ui.menu.CheckBox("Menu MenuCheckBox").set({value: true});
      this.__widgets.push(checkBoxChecked);

      // RadioButton
      var radioButton = new qx.ui.menu.RadioButton("Menu RadioButton");
      this.__widgets.push(radioButton);

      // RadioButton (active)
      var radioButtonActive = new qx.ui.menu.RadioButton("Menu RadioButton").set({value: true});
      this.__widgets.push(radioButtonActive);

      menu.add(button);
      menu.add(checkBox);
      menu.add(checkBoxChecked);
      menu.add(radioButton);
      menu.add(radioButtonActive);

      return menu;
    },

    getMenuBar : function()
    {
      var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow);

      var menubar = new qx.ui.menubar.MenuBar;
      frame.add(menubar);

      var button = new qx.ui.menubar.Button("Menubar Button", null, this.getButtonMenu());
      this.__widgets.push(button);

      menubar.add(button);

      return frame;
    },

    // Menu (with slidebar)
    //
    // (Evil hacks below)
    getMenuWithSlideBar : function() {
      var label = new qx.ui.basic.Label("Menu (with slidebar)");

      var subContainer = new qx.ui.container.Composite(new qx.ui.layout.Canvas());
      subContainer.setHeight(120);
      var buttonMenu = this.getButtonMenu();
      subContainer.add(label, {left: 0, top: 0});
      subContainer.add(buttonMenu, {left: 0, top: 0});

      label.addListener("appear", function() {
          buttonMenu.openAtPoint({left: 0, top: 20});
      });

      // Brute force. Do not hide menu on click.
      buttonMenu.hide = buttonMenu.exclude = function() {};

      return subContainer;
    }
  }
});