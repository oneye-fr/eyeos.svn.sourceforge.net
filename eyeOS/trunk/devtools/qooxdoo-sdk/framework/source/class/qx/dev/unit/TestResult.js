/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * The test result class runs the test functions and fires events depending on
 * the result of the test run.
 */
qx.Class.define("qx.dev.unit.TestResult",
{
  extend : qx.core.Object,



  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * Fired before the test is started
     *
     * Event data: The test {@link qx.dev.unit.TestFunction}
     */
    startTest : "qx.event.type.Data",

    /** Fired after the test has finished
     *
     * Event data: The test {@link qx.dev.unit.TestFunction}
     */
    endTest   : "qx.event.type.Data",

    /**
     * Fired if the test raised an {@link qx.core.AssertionError}
     *
     * Event data: The test {@link qx.dev.unit.TestFunction}
     */
    error     : "qx.event.type.Data",

    /**
     * Fired if the test failed with a different exception
     *
     * Event data: The test {@link qx.dev.unit.TestFunction}
     */
    failure   : "qx.event.type.Data",

    /**
     * Fired if an asynchronous test sets a timeout
     *
     * Event data: The test {@link qx.dev.unit.TestFunction}
     */
    wait   : "qx.event.type.Data"
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Run a test function using a given test result
     *
     * @param testResult {TestResult} The test result to use to run the test
     * @param test {TestSuite|TestFunction} The test
     * @param testFunction {var} The test function
     */
    run : function(testResult, test, testFunction) {
      testResult.run(test, testFunction);
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    _timeout : null,

    /**
     * Run the test
     *
     * @param test {TestSuite|TestFunction} The test
     * @param testFunction {Function} The test function
     * @param self {Object?} The context in which to run the test function
     * @param resume {Boolean?} Resume a currently waiting test
     */
    run : function(test, testFunction, self, resume)
    {
      if(!this._timeout) {
        this._timeout = {};
      }

      if (resume && !this._timeout[test.getFullName()]) {
        this._timeout[test.getFullName()] = "failed";
        var qxEx = new qx.type.BaseError("Error in asynchronous test", "resume() called before wait()");
        this._createError("failure", qxEx, test);
        return;
      }

      this.fireDataEvent("startTest", test);

      if (this._timeout[test.getFullName()])
      {
        if (this._timeout[test.getFullName()] !== "failed") {
          this._timeout[test.getFullName()].stop();
        }
        delete this._timeout[test.getFullName()];
      }
      else
      {
        try {
          test.setUp();
        }
        catch(ex)
        {
          try {
            this.tearDown(test);
          }
          catch(ex) {
            /* Any exceptions here are likely caused by setUp having failed
               previously, so we'll ignore them. */
          }
          var qxEx = new qx.type.BaseError("Error setting up test: " + ex.name, ex.message);
          this._createError("error", qxEx, test);
          return;
        }
      }

      try {
        testFunction.call(self || window);
      }
      catch(ex)
      {
        var error = true;
        if (ex instanceof qx.dev.unit.AsyncWrapper)
        {

          if (this._timeout[test.getFullName()]) {
            // Do nothing if there's already a timeout for this test
            return;
          }

          if (ex.getDelay()) {
            var that = this;
            var defaultTimeoutFunction = function() {
              throw new qx.core.AssertionError(
                "Asynchronous Test Error",
                "Timeout reached before resume() was called."
              );
            }
            var timeoutFunc = (ex.getDeferredFunction() ? ex.getDeferredFunction() : defaultTimeoutFunction);
            var context = (ex.getContext() ? ex.getContext() : window);
            this._timeout[test.getFullName()] = qx.event.Timer.once(function() {
               this.run(test, timeoutFunc, context);
            }, that, ex.getDelay());
            this.fireDataEvent("wait", test);
          }

        } else if (ex.classname == "qx.core.AssertionError") {
          try {
            this.tearDown(test);
          } catch(ex) {}
          this._createError("failure", ex, test);
        } else {
          try {
            this.tearDown(test);
          } catch(ex) {}
          this._createError("error", ex, test);
        }
      }

      if (!error)
      {
        try {
          this.tearDown(test);
          this.fireDataEvent("endTest", test);
        } catch(ex) {
          var qxEx = new qx.type.BaseError("Error tearing down test: " + ex.name, ex.message);
          this._createError("error", qxEx, test);
        }
      }
    },


    /**
     * Fire an error event
     *
     * @param eventName {String} Name of the event
     * @param exception {Error} The exception, which caused the test to fail
     * @param test {TestSuite|TestFunction} The test
     * @return {void}
     */
    _createError : function(eventName, exception, test)
    {
      // WebKit and Opera
      var error =
      {
        exception : exception,
        test      : test
      };

      this.fireDataEvent(eventName, error);
      this.fireDataEvent("endTest", test);
    },


    /**
     * Calls the generic tearDown method on the test class, then the specific
     * tearDown for the test, if one is defined.
     *
     * @param test {Object} The test object (first argument of {@link #run})
     */
    tearDown : function(test)
    {
      test.tearDown();
      var testClass = test.getTestClass();
      var specificTearDown = "tearDown" + qx.lang.String.firstUp(test.getName());
      if (testClass[specificTearDown]) {
        testClass[specificTearDown]();
      }
    }
  },

  destruct : function() {
    this._timeout = null;
  }
});
