Ext.define('RM.component.ChooseInvoiceDiscount', {

    requires: ['Ext.form.FieldSet', 'Ext.field.Radio'],

    initialize: function () {
        this.popup = null;

    },

    show: function (val, cb, cbs) {
        var me = this;
        RM.ViewMgr.regBackHandler(this.hide, this);
        
        this.popup = Ext.create('RM.component.Popup', {
            items: [{
                xtype: 'component',
                html: 'Choose invoice discount',
                cls: 'rm-title'
            }, {
                xtype: 'fieldset',
                baseCls: 'rm-picker',
                defaults: {
                    xtype: 'radiofield',
                    cls: 'rm-picker',
                    labelCls: 'rm-picker',
                    listeners: {
                        check: function (checkBox) {
                            var disc = checkBox.getItemId();
                            if (disc == 5 || disc == 10 || disc == 20)
                                disc = disc + '%';
                            cb.call(cbs, disc);
                            setTimeout(function () { me.popup.hide(); }, 200);
                        },
                        tap: { //allow tapping anywhere including label to fire check event, including when already checked
                            element: 'element', //"label",
                            fn: function () {
                                if (!this.isChecked())
                                    this.setChecked(true);
                                else
                                    this.fireEvent('check', this);
                            }
                        },
                        scope: this
                    },
                    labelWidth: 180,
                    labelAlign: 'right'
                },
                items: [{
                    name: 'disc',
                    itemId: '0', //could have put in value, but cb.getValue() above always returns true
                    label: 'None',
                    checked: (val == 0)

                }, {
                    name: 'disc',
                    itemId: '5',
                    label: '5%',
                    checked: (val == '5%')

                }, {
                    name: 'disc',
                    itemId: '10',
                    label: '10%',
                    checked: (val == '10%')

                }, {
                    name: 'disc',
                    itemId: '20',
                    label: '20%',
                    checked: (val == '20%')

                }, {
                    name: 'disc',
                    itemId: 'custom',
                    label: 'Custom or absolute',
                    checked: (val != 0 && val != '5%' && val != '10%' && val != '20%')
                }
					]
            }

			]

        });
        this.popup.show();
    },

    hide: function () {
        RM.ViewMgr.deRegBackHandler();
        this.popup.hide();
    }
});