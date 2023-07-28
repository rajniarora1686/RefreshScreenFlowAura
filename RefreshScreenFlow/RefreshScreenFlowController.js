({
    init : function (component, event, helper) {
    	helper.startFlow(component);
    },
            
    dorefresh : function (component, event, helper) {
        $A.get('e.force:refreshView').fire();
    }
 })