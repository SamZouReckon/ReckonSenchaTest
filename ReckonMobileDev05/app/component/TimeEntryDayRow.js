Ext.define('RM.component.TimeEntryDayRow', {
    extend: 'RM.component.SecureFormPanel',
    xtype: 'timeentrydayrow',    
    config: {
        layout: 'hbox',
        items: [
        {
            xtype: 'extdatepickerfield',
            name: 'Date',            
            dateFormat: 'D jS',
            cls: ['rm-flatfield','rm-inputel-alignl'],
            //cls: ['rm-flatfield-disabled-label-look'],
            disabled: true,
            placeHolder: 'select',
            flex: 5
        },{
            xtype: 'durationfield',
            name: 'Duration',
            cls: 'rm-flatfield',
            placeHolder: '00:00',
            clearIcon: false,
            maxHours: 99,
            flex: 3
        },{
            xtype: 'exttextfield',
            name: 'Notes',
            cls: ['rm-flatfield', 'rm-notesfield', 'rm-notesfield-empty', 'rm-field-border-left'],
            clearIcon: false,
            readOnly: true,
            width: 48 
        }
        ]
    },    

    initialize: function () {
        this.callParent(arguments);
        var notesField = this.down('[name=Notes]');
        notesField.on('tap', function () {            
            this.editDescription();
        }, this);
        notesField.on('change', function () {
            this.updateNotesFieldState();
        }, this);
    },

    editDescription: function () {
        var isEditable = true; //change this when doing time sheet business rules
        RM.Selectors.showNoteText(
            'Notes',
            isEditable,
            'OK',
            this.noteText,
            function (noteText) {
                RM.ViewMgr.back();
                this.noteText = noteText; 
                this.down('[name=Notes]').setValue(noteText.replace(/(\r\n|\n|\r)/g, ' '));
            },
            this
        );
    },

    updateNotesFieldState: function () {
        var notesField = this.down('[name=Notes]');
        this.noteText = notesField.getValue();
        if (notesField.getValue()) {
            notesField.setCls(['rm-flatfield', 'rm-notesfield', 'rm-notesfield-nonempty', 'rm-field-border-left']);
        }
        else {
            notesField.setCls(['rm-flatfield', 'rm-notesfield', 'rm-notesfield-empty', 'rm-field-border-left']);
        }
    }

});