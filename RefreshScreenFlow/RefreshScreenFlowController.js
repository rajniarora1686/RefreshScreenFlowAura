({
    init : function (component) {
        // Find the component whose aura:id is "flowData"
        var flow = component.find("flowData");
        var inputVariables = [
            {
                name: "recordId",
                type: "String",
                value: '006DG00000KWJwPYAX'
            },
        ];
            // In that component, start your flow. Reference the flow's API Name.
            flow.startFlow("Quick_Create_Quote_from_Opportunity", inputVariables);
            }
            })