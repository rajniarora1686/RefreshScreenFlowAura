({
    refresh : function(component, event, helper) {
        var action = component.get('c.myController');
        action.setCallback(component,
            function(response) {
                var state = response.getState();
                if (state === 'SUCCESS'){
                    // Refresh the view
                    // after data is updated
                    $A.get('e.force:refreshView').fire();
                } else {
                     // Handle the 'ERROR' or 'INCOMPLETE' state
                }
            }
        );
        $A.enqueueAction(action);
    }
})