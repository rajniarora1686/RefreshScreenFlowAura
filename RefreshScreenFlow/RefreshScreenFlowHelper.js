({
    startFlow : function( component) {

        // name of the flow to load
        var flowName = component.get( 'v.flowAPIName' );

        // if we don't have a flow name yet then do nothing
        if ( $A.util.isEmpty( flowName ) ) {
            return;
        }

        // dynamically creating components is done asynchronously
        // so we use a promise to chain our actions sequentially
        var p = new Promise( function( resolve, reject ) {

            // Ideally, I would like to use the lightning:flow method 'startFlow'
            // to cause a flow component to start or restart on demand, but at the time
            // of this project the method only started the flow once. This meant that
            // the flow was not picking up record data changes because it was not reloading itself.
            //
            // I brought up my use case to product management here:
            // https://org62.lightning.force.com/one/one.app#/sObject/0D50M00003InPo2SAF/view
            //
            // As workaround, we dynamically create and destroy the component to refresh itself.
            // https://developer.salesforce.com/docs/atlas.en-us.210.0.lightning.meta/lightning/js_cb_dynamic_cmp_async.htm

            $A.createComponent(
                'lightning:flow',
                {
                    'aura:id' : 'flow'//,
                    //'onstatuschange' : component.getReference( 'c.handleFlowStatusChange' )
                },
                function( newCmp, status, errorMessage ) {
                    if ( status === 'SUCCESS' ) {
                        resolve( newCmp );
                    } else {
                        reject( errorMessage || status );
                    }
                }
            );

        }).then( $A.getCallback( function( newFlowCmp ) {

            var flowContainer = component.find( 'flowContainer' );

            // not certain that I have to manually destroy the components
            // but the documentation hinted that not doing so might lead to memory leaks
            flowContainer.get( 'v.body' ).forEach( function( cmp, idx ) {
                cmp.destroy();
            });

            flowContainer.set( 'v.body', newFlowCmp );

            // specify your flow input variables
            // https://developer.salesforce.com/docs/atlas.en-us.210.0.lightning.meta/lightning/components_using_flow_inputs_set.htm
            var inputVariables = [
                {
                    name : 'recordId',
                    type : 'String',
                    value : component.get( 'v.recordId' )
                }
            ];

            newFlowCmp.startFlow( flowName, inputVariables );

        })).catch( $A.getCallback( function( err ) {

            console.error( 'Error creating flow component' );
            console.error( err );

        }));

    }
})