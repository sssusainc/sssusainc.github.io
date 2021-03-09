alertify.defaults = {
        // dialogs defaults
        autoReset:true,
        basic:false,
        closable:true,
        closableByDimmer:true,
        invokeOnCloseOff:false,
        frameless:false,
        defaultFocusOff:false,
        maintainFocus:true, // <== global default not per instance, applies to all dialogs
        maximizable:true,
        modal:true,
        movable:true,
        moveBounded:false,
        overflow:true,
        padding: true,
        pinnable:true,
        pinned:true,
        preventBodyShift:false, // <== global default not per instance, applies to all dialogs
        resizable:true,
        startMaximized:false,
        transition:'pulse',
        transitionOff:false,
        tabbable:'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs

        // notifier defaults
        notifier:{
        // auto-dismiss wait time (in seconds)  
            delay:5,
        // default position
            position:'bottom-right',
        // adds a close button to notifier messages
            closeButton: true,
        // provides the ability to rename notifier classes
            classes : {
                base: 'alertify-notifier',
                prefix:'ajs-',
                message: 'ajs-message',
                top: 'ajs-top',
                right: 'ajs-right',
                bottom: 'ajs-bottom',
                left: 'ajs-left',
                center: 'ajs-center',
                visible: 'ajs-visible',
                hidden: 'ajs-hidden',
                close: 'ajs-close'
            }
        },

        // language resources 
        glossary:{
            // dialogs default title
            title:'DISCLAIMER',
            // ok button text
            ok: 'OK',
            // cancel button text
            cancel: 'Cancel'            
        },

        // theme settings
        theme:{
            // class name attached to prompt dialog input textbox.
            input:'ajs-input',
            // class name attached to ok button
            ok:'ajs-ok',
            // class name attached to cancel button 
            cancel:'ajs-cancel'
        },
        // global hooks
        hooks:{
            // invoked before initializing any dialog
            preinit:function(instance){},
            // invoked after initializing any dialog
            postinit:function(instance){},
        },
    };

// if(!alertify.myAlert){
//   //define a new dialog
//   alertify.dialog('myAlert',function factory(){
//     return{
//       main:function(message){
//         this.message = message;
//       },
//       setup:function(){
//           return { 
//             buttons:[{text: "cool!", key:27/*Esc*/}],
//             focus: { element:0 }
//           };
//       },
//       prepare:function(){
//         this.setContent(this.message);
//       }
//   }});
// }
//launch it.
// alertify.myAlert('This is to notify all concerned that Seven Seas Shipping USA Inc, is not a manpower or Recruitment company and any emails received stating the same is fraudulent.\n\nSeven Seas Shipping USA Inc. has not and will not solicit companies or persons for\n\nRecruitment / manpower located outside of the United States of America.\n\n \n\nAnyone choosing to respond to recruitment / manpower requirement emails\n\nwill be doing so at their own risk and responsibility.');


var pre = document.createElement('pre');
//custom style.
pre.style.maxHeight = "400px";
pre.style.margin = "0";
pre.style.padding = "24px";
pre.style.whiteSpace = "pre-wrap";
pre.style.textAlign = "justify";
pre.appendChild(document.createTextNode($('#la').text()));
//show as confirm
alertify.confirm(pre, function(){
        // alertify.success('Accepted');
    },function(){
        // alertify.error('Declined');
    }).set({labels:{ok:'Okay', cancel:'Dismiss'}, padding: false});