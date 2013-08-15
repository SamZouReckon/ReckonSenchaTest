Ext.define('RM.controller.AddNoteC', {
    extend: 'Ext.app.Controller',

    requires: ['RM.view.AddNote'],
    config: {
        refs: {
            addNote: 'addnote',
            title: 'addnote #title',
            noteText: 'addnote #notetext',
            saveBtn: 'addnote #add'
        },
        control: {
            'addnote' :{
              show: 'onShow'
            },
            'addnote #back': {
                tap: 'back'
            },
            'addnote #add': {
                tap: 'onAdd'
            }
        }

    },

    showView: function (title, isEditable, saveText, text, cb, cbs) {
        this.noteTitle = title;
        this.isEditable = isEditable;
        this.saveText = saveText;
        this.noteText = text;
        this.noteCb = cb;
        this.noteCbs = cbs;
        var view = this.getAddNote();
        if (!view){            
            view = { xtype: 'addnote' };
        }
        RM.ViewMgr.showPanel(view);
    },
    
    onShow: function(){
        var saveBtn = this.getSaveBtn(), noteText = this.getNoteText();
        
        this.getTitle().setHtml(this.noteTitle);
        saveBtn.setHidden(!this.isEditable);
        saveBtn.setText(this.saveText);
        noteText.setValue(this.noteText);
        noteText.setReadOnly(!this.isEditable);
        noteText.setPlaceHolder(this.isEditable ? 'enter' : '');
        
    },

    onAdd: function () {
        this.noteCb.call(this.noteCbs, this.getNoteText().getValue());
    },

    back: function () {
        RM.ViewMgr.back();
    }

});