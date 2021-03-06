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
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

qx.Class.define("qx.test.util.Delegate",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    __delegate : null,


    setUp : function()
    {
      this.__delegate = {
        STATIC : true,

        myMethod : function() {}
      };
    },


    tearDown : function() {
      this.__delegate = null;
    },


    testGetMethod : function()
    {
      this.assertNotNull(qx.util.Delegate.getMethod(this.__delegate, "myMethod"));
      this.assertFunction(qx.util.Delegate.getMethod(this.__delegate, "myMethod"));
      this.assertEquals(this.__delegate["myMethod"], qx.util.Delegate.getMethod(this.__delegate, "myMethod"));

      this.assertNull(qx.util.Delegate.getMethod(this.__delegate, "STATIC"));
      this.assertNull(qx.util.Delegate.getMethod(this.__delegate, "banana"));
    },


    testContainsMethod : function()
    {
      this.assertTrue(qx.util.Delegate.containsMethod(this.__delegate, "myMethod"));
      this.assertFalse(qx.util.Delegate.containsMethod(this.__delegate, "STATIC"));
      this.assertFalse(qx.util.Delegate.containsMethod(this.__delegate, "banana"));
    }
  }
});
