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
     * Daniel Wagner (d_wagner)

************************************************************************ */

/* ************************************************************************

#asset(testrunner2/view/html/*)

************************************************************************ */

/**
 * Plain HTML TestRunner view.
 */
qx.Class.define("testrunner2.view.Html", {

  extend : testrunner2.view.Abstract,
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * @param rootElement {DOMElement?} DOM Element in which the result view 
   * should be created. Default: document.body
   */
  construct : function(rootElement)
  {
    this.__domElements = {
      rootElement : rootElement || document.body
    }
    var styleSrc = qx.util.ResourceManager.getInstance().toUri("testrunner2/view/html/css/testrunner2.css");
    qx.bom.Stylesheet.includeFile(styleSrc);
    
    this._attachHeader();
    this._attachMainControls();
    this._attachTestControls();
    this._attachTestList();
    this._attachResultsList();
    this._attachFooter();
  },
  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties :
  {
    /** Controls the display of stack trace information for exceptions */
    showStack :
    {
      check : "Boolean",
      init : true,
      apply : "_applyShowStack"
    },
    
    /** Controls whether successfully passed tests should appear in the results 
     * list */
    showPassed :
    {
      check : "Boolean",
      init : null,
      nullable : true,
      apply : "_applyShowPassed"
    },
    
    /** Running count of failed tests */
    failedTestCount :
    {
      check : "Integer",
      init : 0
    },
    
    /** Running count of passed tests */
    successfulTestCount :
    {
      check : "Integer",
      init : 0
    },
    
    /** Running count of skipped tests */
    skippedTestCount :
    {
      check : "Integer",
      init : 0
    }
  },
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members :
  {    
    __domElements : null,
    __testNameToId : null,
    __filterTimer : null,
    
    /**
     * Creates the header and attaches it to the root node.
     */
    _attachHeader : function()
    {
      this.__domElements.rootElement.innerHTML += "<h1>qooxdoo Test Runner</h1>";
    },
    
    
    /**
     * Creates the main controls and attaches them to the root node.
     */
    _attachMainControls : function()
    {
      var elemControls = document.createElement("div");
      elemControls.id = "qxtestrunner_controls";
      elemControls.innerHTML = '<input type="submit" id="qxtestrunner_run" value="Run Tests"></input>';
      elemControls.innerHTML += '<input type="submit" id="qxtestrunner_stop" value="Stop Tests"></input>';
      
      var stackToggle = qx.bom.Input.create("checkbox", {id: "qxtestrunner_togglestack", checked: "checked"});
      elemControls.appendChild(stackToggle);
      elemControls.innerHTML += '<label for="qxtestrunner_togglestack">Show stack trace</label>';
      
      var passedToggle = qx.bom.Input.create("checkbox", {id: "qxtestrunner_togglepassed", checked: "checked"});
      elemControls.appendChild(passedToggle);
      elemControls.innerHTML += '<label for="qxtestrunner_togglepassed">Show successful tests</label>';
      
      this.__domElements.rootElement.appendChild(elemControls);
      
      this.__domElements.runButton = document.getElementById("qxtestrunner_run");
      qx.event.Registration.addListener(this.__domElements.runButton, "click", function(ev) {
        if (this.getTestSuiteState() == "finished" ) {
          this.reset();
        }
        this.fireEvent("runTests");
      }, this);
      
      this.__domElements.stopButton = document.getElementById("qxtestrunner_stop");
      qx.event.Registration.addListener(this.__domElements.stopButton, "click", function(ev) {
        this.fireEvent("stopTests");
      }, this);      
      
      var stackToggle = document.getElementById("qxtestrunner_togglestack");
      qx.event.Registration.addListener(stackToggle, "change", function(ev) {
        this.setShowStack(ev.getData());
      }, this);
      
      var passedToggle = document.getElementById("qxtestrunner_togglepassed");
      qx.event.Registration.addListener(passedToggle, "change", function(ev) {
        this.setShowPassed(ev.getData());
      }, this);
    },
    
    
    /**
     * Creates the test selection controls and attaches them to the root node.
     */
    _attachTestControls : function()
    {
      var elemTestControls = document.createElement("div");
      elemTestControls.id = "qxtestrunner_testcontrols";
      var allTestsToggle = qx.bom.Input.create("checkbox", {id: "qxtestrunner_togglealltests", checked: "checked"});
      elemTestControls.innerHTML += '<label for="qxtestrunner_testfilter">Filter tests</label>';
      elemTestControls.innerHTML += '<input type="text" id="qxtestrunner_testfilter" />';
      elemTestControls.appendChild(allTestsToggle);
      elemTestControls.innerHTML += '<label for="qxtestrunner_togglealltests">Select/deselect all listed tests</label>';
      
      this.__domElements.rootElement.appendChild(elemTestControls);
      
      this.__domElements.allTestsToggle = document.getElementById("qxtestrunner_togglealltests");
      qx.event.Registration.addListener(this.__domElements.allTestsToggle, "change", function(ev) {
        var checked = ev.getTarget().checked;
        this.toggleAllTests(checked, true);      
      }, this);
      
      this.__filterTimer = new qx.event.Timer(500);
      this.__filterTimer.addListener("interval", function(ev) {
        var filter = this.__domElements.filterInput.value;
        this.__filterTimer.stop();
        this.filterTests(filter);
      }, this);
      
      this.__domElements.filterInput = document.getElementById("qxtestrunner_testfilter");
      qx.event.Registration.addListener(this.__domElements.filterInput, "input", function(ev) {
        this.__filterTimer.restart();
      }, this);
      
    },
    
    
    /**
     * Creates the list of available tests and attaches it to the root node.
     */
    _attachTestList : function()
    {
      var listContainer = document.createElement("div");
      listContainer.id = "qxtestrunner_tests";
      listContainer.innerHTML += '<ul id="qxtestrunner_testlist"></ul>';
      this.__domElements.rootElement.appendChild(listContainer);
      this.__domElements.elemTestList = document.getElementById("qxtestrunner_testlist");
    },
    
    
    /**
     * Creates the test results list and attaches it to the root node.
     */
    _attachResultsList : function()
    {
      var elemResults = document.createElement("div");
      elemResults.id = "qxtestrunner_results";
      elemResults.innerHTML = '<ul id="qxtestrunner_resultslist"></ul>';
      this.__domElements.rootElement.appendChild(elemResults);
      this.__domElements.elemResultsList = document.getElementById("qxtestrunner_resultslist");
    },
    
    
    /**
     * Creates the footer/status bar and attaches it to the root node.
     */
    _attachFooter : function()
    {
      var elemFooter = document.createElement("div");
      elemFooter.id = "qxtestrunner_footer";
      elemFooter.innerHTML = '<p id="qxtestrunner_status"></p>';
      
      this.__domElements.rootElement.appendChild(elemFooter);
      
      this.__domElements.elemStatus = document.getElementById("qxtestrunner_status");
    },
    
    
    /**
     * Empties the results display.
     */
    clearResults : function()
    {
      this.__domElements.elemResultsList.innerHTML = "";
    },
    
    /**
     * Empties the test list.
     */
    clearTestList : function()
    {
      this.__domElements.elemTestList.innerHTML = "";
    },
    
    
    /**
     * Returns the iframe element the AUT should be loaded in.
     * 
     * @return {DOMElement} The iframe
     */
    getIframe : function()
    {
      if (this.__domElements.elemIframe) {
        return this.__domElements.elemIframe;
      }
      
      var controls = document.getElementById("qxtestrunner_controls");
      var frameContainer = document.createElement("div");
      qx.dom.Element.insertAfter(frameContainer, controls);
      frameContainer.innerHTML += '<input type="text" id="qxtestrunner_iframesrc"></input>';
      frameContainer.innerHTML += '<input type="submit" id="qxtestrunner_setiframesrc" value="Reload"></input>';
      
      var elemAut = document.createElement("div");
      elemAut.id = "qxtestrunner_aut";
      this.__domElements.elemIframe = qx.bom.Iframe.create({id : "qxtestrunner_autframe"});
      frameContainer.appendChild(this.__domElements.elemIframe);
      
      this.__domElements.iframeSourceInput = document.getElementById("qxtestrunner_iframesrc");
      var reloadBtn = document.getElementById("qxtestrunner_setiframesrc");
      qx.event.Registration.addListener(reloadBtn, "click", function(ev) {
        this.__domElements.filterInput.value = "";
        this.filterTests("");
        var src = this.__domElements.iframeSourceInput.value;
        this.resetAutUri();
        this.setAutUri(src);
      }, this);
      
      return this.__domElements.elemIframe;
    },
    
    
    /**
     * Selects or deselects all tests in the current test suite.
     * 
     * @param selected {Boolean} true: select all tests; false: deselect all 
     * tests
     * @param onlyVisible {Boolean} true: only modify tests if the corresponding
     * entry in the test list is visible. Default: false
     */
    toggleAllTests : function(selected, onlyVisible)
    {
      var testsToModify = [];
      var boxes = document.getElementsByTagName("input");
      for (var i=0,l=boxes.length; i<l; i++) {
        if (boxes[i].type == "checkbox" && boxes[i].id.indexOf("cb_") == 0) {
          if (onlyVisible && boxes[i].parentNode.style.display == "none") {
            continue;
          }
          boxes[i].checked = selected;
          var testName = this.__testNameToId[boxes[i].id.substr(3)];
          testsToModify.push(testName);
        }
      }
      this.__toggleTestsSelected(testsToModify, selected);
    },
    
    
    /**
     * Shows and selects any tests matching the search term while hiding and
     * deselecting the rest.
     * 
     * @param term {String} Search term
     */
    filterTests : function(term)
    {
      var searchRegExp = new RegExp("^.*" + term + ".*", "ig");
      var testList = this.getInitialTestList();
      var matches = [];
      for (var i=0,l=testList.length; i<l; i++) {
        if (testList[i].match(searchRegExp)) {
          matches.push(testList[i]);
        }
      }
      this.toggleAllTests(false, false);
      this.hideAllTestListEntries();
      if (matches.length > 0) {
        var testsToModify = [];
        for (var i=0,l=matches.length; i<l; i++) {
          var key = this.__simplifyName(matches[i]);
          var checkboxId = "cb_" + key;
          var box = document.getElementById(checkboxId);
          box.parentNode.style.display = "block";
          if (this.__domElements.allTestsToggle.checked) {
            box.checked = true;
            testsToModify.push(matches[i]);
          }
        }
        this.__toggleTestsSelected(testsToModify, true);
      }
      qx.bom.Cookie.set("testFilter", term);
    },
    
    
    /**
     * Hides all entries in the test list.
     */
    hideAllTestListEntries : function()
    {
      var items = qx.bom.Selector.query("li", this.__domElements.elemTestList);
      for (var i=0,l=items.length; i<l; i++) {
        items[i].style.display = "none";
      }
    },
    
    
    /**
     * Simplifies a test function's fully qualified name so it can be used as a
     * map key.
     * 
     * @param testName {String} The test's full name
     * @return {String} The simplified string
     */
    __simplifyName : function(testName)
    {
      var id = testName.replace(/[\W]/ig, "");
      return id;
    },
    
    
    /**
     * Resets the result counters, clears the results display and reapplies the
     * test selection so that the suite can be run again.
     */
    reset : function()
    {
      this.resetFailedTestCount();
      this.resetSuccessfulTestCount();
      this.resetSkippedTestCount();
      this.clearResults();
      var selectedTests = qx.lang.Array.clone(this.getSelectedTests());
      this.resetSelectedTests();
      this.setSelectedTests(selectedTests);
    },
    
    
    /**
     * Sets the CSS "display" attribute of all nodes with the given CSS class.
     * 
     * @param cssClass {String} CSS class name
     * @param display {Boolean} Display value: true for "block", false for "none"
     */
    __setDisplayForClass : function(cssClass, display)
    {
      var displayVal = display ? "block" : "none";
      var elems = qx.bom.Selector.query(cssClass, this.__domElements.rootElement);
      for (var i=0,l=elems.length; i<l; i++) {
        qx.bom.element.Style.set(elems[i], "display", displayVal);
      }
    },
    
    
    /**
     * Visualizes the status of a single test result as it changes during test
     * execution.
     * 
     * @param testResultData {testrunner2.runner.TestResultData} test result 
     * data object
     */
    _onTestChangeState : function(testResultData) {
      var testName = testResultData.getName();
      var state = testResultData.getState();
      
      switch (state) {
        case "skip":
          this.setSkippedTestCount(this.getSkippedTestCount() + 1);
          break;
        case "error":
        case "failure":
          this.setFailedTestCount(this.getFailedTestCount() + 1);
          break;
        case "success":
          this.setSuccessfulTestCount(this.getSuccessfulTestCount() + 1);
      }
      
      var exceptions =  testResultData.getExceptions();
      var key = this.__simplifyName(testName);
      var listItem = document.getElementById(key);
      if (listItem) {
        qx.bom.element.Attribute.set(listItem, "class", state);
      } else {
        var item = qx.bom.Element.create("li", {id : key, "class" : state});
        if (this.__domElements.elemResultsList.firstChild) {
          qx.dom.Element.insertBefore(item, this.__domElements.elemResultsList.firstChild);
        } else {
          this.__domElements.elemResultsList.appendChild(item);
        }
        item.innerHTML = testName;
        listItem = document.getElementById(key);
      }
      
      if (state == "success" && this.getShowPassed() === false) {
        qx.bom.element.Style.set(listItem, "display", "none");
      }
      
      if (exceptions && exceptions.length > 0) {
        var errorList = document.createElement("ul");
        for (var i=0,l=exceptions.length; i<l; i++) {
          var error = exceptions[i].exception;
          var errorItem = document.createElement("li");
          errorItem.innerHTML += error;
          
          var trace = testResultData.getStackTrace(error);
          if (trace.length > 0) {
            var stackDiv = document.createElement("div");
            qx.bom.element.Class.add(stackDiv, "stacktrace");
            stackDiv.innerHTML = 'Stack Trace:<br/>' + trace;
            
            var displayVal = this.getShowStack() ? "block" : "none";
            qx.bom.element.Style.set(stackDiv, "display", displayVal);
            errorItem.appendChild(stackDiv);
          }
          errorList.appendChild(errorItem);
        }
        listItem.appendChild(errorList);
      }
    },
    
    
    /**
     * Listener for the checkbox associated with each test in the suite. 
     * 
     * @param ev {qx.event.type.Event} change event
     */
    __onToggleTest : function(ev)
    {
      var testName = this.__testNameToId[ev.getTarget().id.substr(3)];
      var selected = ev.getTarget().checked;
      this.__toggleTestsSelected([testName], selected);
    },
    
    
    /**
     * Adds or removes tests from the list of selected tests.
     * 
     * @param tests {String[]} List of tests to be added or removed
     * @param selected {Boolean} Whether the given tests should be added to or
     * removed from the selection
     */
    __toggleTestsSelected : function(tests, selected)
    {
      var selectedTests = qx.lang.Array.clone(this.getSelectedTests());
      
      for (var i=0,l=tests.length; i<l; i++) {
        var testName = tests[i];
        if (selected && !qx.lang.Array.contains(selectedTests, testName)) {
          selectedTests.push(testName);
        }
        else if (!selected && qx.lang.Array.contains(selectedTests, testName)) {
          qx.lang.Array.remove(selectedTests, testName);
        }
      }
      
      selectedTests.sort();
      this.setSelectedTests(selectedTests);
    },
    
    
    /*
    ****************************************************************************
       APPLY METHODS
    ****************************************************************************
    */
    
    /**
     * Displays a status message.
     * @param value {String} The message to be displayed
     * @param old {String} The previous status
     */
    _applyStatus : function(value, old)
    {
      if (!value[0] || (value === old)) {
        return;
      }
            
      this.__domElements.elemStatus.innerHTML = value;
    },
    
    
    /**
     * Visualizes the current state of the test suite by displaying a status 
     * message and showing/hiding the "run" button.
     * 
     * @param value {String} The test suite's status
     * @param value {String} The previous status
     */
    _applyTestSuiteState : function(value, old)
    {
      switch(value) 
      {
        case "loading" :
          this.setStatus("Loading tests...");
          this.__domElements.filterInput.disabled = true;
          this.__domElements.allTestsToggle.disabled = true;
          this.__domElements.runButton.disabled = true;
          this.__domElements.stopButton.disabled = true;
          break;
        case "ready" :
          this.setStatus("Test suite ready");
          var filterFromCookie = qx.bom.Cookie.get("testFilter");
          if (filterFromCookie) {
            this.__domElements.filterInput.value = filterFromCookie;
            this.filterTests(filterFromCookie);
          }
          else {
            this._applyTestCount(this.getTestCount());
          }
          this.__domElements.filterInput.disabled = false;
          this.__domElements.allTestsToggle.disabled = false;
          this.__domElements.runButton.disabled = false;
          this.__domElements.stopButton.disabled = true;
          this.setFailedTestCount(0);
          this.setSuccessfulTestCount(0);
          break;
        case "running" :
          this.setStatus("Running tests...");
          this.__domElements.filterInput.disabled = true;
          this.__domElements.allTestsToggle.disabled = true;
          this.__domElements.runButton.disabled = true;
          this.__domElements.stopButton.disabled = false;
          break;
        case "finished" :
          var statusText = "Test suite finished. ";
          statusText += " Passed: " + this.getSuccessfulTestCount();
          statusText += " Failed: " + this.getFailedTestCount();
          statusText += " Skipped: " + this.getSkippedTestCount();
          this.setStatus(statusText);
          this.__domElements.filterInput.disabled = false;
          this.__domElements.allTestsToggle.disabled = false;
          this.__domElements.runButton.disabled = false;
          this.__domElements.stopButton.disabled = true;
          break;
        case "aborted" :
          this.setStatus("Test run stopped");
          this.__domElements.filterInput.disabled = false;
          this.__domElements.allTestsToggle.disabled = false;
          this.__domElements.runButton.disabled = false;
          this.__domElements.stopButton.disabled = true;
          break;
      };
    },
    
    
    /**
     * Creates a list item with a checkbox and label for each test in the 
     * current suite. Only tests with ticked checkboxes will be run.
     * 
     * @param value {Array} Full list of tests
     * @param old {Array} Previous value
     */
    _applyInitialTestList : function(value, old)
    {
      if (value == null) {
        return;
      }

      this.setSelectedTests(value);
      this.__testNameToId = {};
      this.clearTestList();
      this.clearResults();
      
      for (var i=0,l=value.length; i<l; i++) {
        var listItem = document.createElement("li");
        var testName = value[i];
        var key = this.__simplifyName(testName);
        this.__testNameToId[key] = testName;
        var checkboxId = "cb_" + key;
        var cb = qx.bom.Input.create("checkbox", {id: checkboxId, checked: "checked"});
        listItem.appendChild(cb);
        listItem.innerHTML += '<label for="' + checkboxId + '">' + testName + '</label>';
        this.__domElements.elemTestList.appendChild(listItem);
        
        /*
        var html = "<li>";
        var testName = value[i];
        var key = this.__simplifyName(testName);
        this.__testNameToId[key] = testName;
        var checkboxId = "cb_" + key;
        html += '<input checked="checked" type="checkbox" id="' + checkboxId + '" >'
        html += '<label for="' + checkboxId + '">' + testName + '</label></li>';
        this.__domElements.elemTestList.innerHTML += html;
        */
                
        cb = document.getElementById(checkboxId);
        qx.event.Registration.addListener(cb, "change", this.__onToggleTest, this);
      }
    },    
    
    
    /**
     * Displays the amount of pending tests.
     * 
     * @param value {Integer} Amount of pending tests
     * @param old {Integer} Old value
     */
    _applyTestCount : function(value, old)
    {
      if (value == null) {
        return;
      }
      var suiteState = this.getTestSuiteState();
      switch(suiteState)
      {
        case "ready" :
          this.setStatus(value + " tests ready to run");
          break;
        case "running" :
          this.setStatus(value + " tests pending");
          break;
      };
    },
    
    
    /**
     * (Re)Loads the AUT in the iframe.
     * 
     * @param value {String} AUT URI
     * @param old {String} Previous value
     */
    _applyAutUri : function(value, old)
    {
      if (!value || value == old) {
        return;
      }
      this.__domElements.iframeSourceInput.value = value;
      qx.bom.Iframe.setSource(this.__domElements.elemIframe, value);
    },
    
    
    /**
     * Shows/hides all stack trace nodes in the results list.
     * 
     * @param value {Boolean} Incoming property value
     * @param value {Boolean} Previous property value
     */
    _applyShowStack : function(value, old)
    {
      if (value == old) {
        return;
      }
      
      this.__setDisplayForClass(".stacktrace", value);
    },
    
    
    /**
     * Shows/hides all successful tests in the results list.
     * 
     * @param value {Boolean} Incoming property value
     * @param value {Boolean} Previous property value
     */
    _applyShowPassed : function(value, old)
    {
      if (value === null || value === old) {
        return;
      }
      this.__setDisplayForClass(".success", value);
    }
    
  }
  
});