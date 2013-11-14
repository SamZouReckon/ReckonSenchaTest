Ext.define('RM.view.CashBooks', {
   extend: 'Ext.Panel',
	xtype: 'cashbooks',
	requires: ['RM.component.RMPullRefresh', 'Ext.plugin.ListPaging'],
    config: {
		layout: 'fit',
		items:[{
                xtype: 'toolbar',                
                docked: 'top',
                items: [{
						xtype: 'component',
						html: 'Choose book to open',
						cls: 'rm-topbartitle',
					}
                ]
            },{
				xtype: 'sortsearchbar',				
				docked: 'top',
				sortfields: [
					{text: 'Company name',  value: 'orgname'},
					{text: 'Book name', value: 'bookname'}
                    //,{text: 'Colour',  value: 'colorcode'}
				]
			},{
				xtype: 'list',
				store: 'CashBooks',
                loadingText: null,
				grouped: true,				
                itemTpl: new Ext.XTemplate(        
        
                            '<table width="100%">'+
                                '<tr>'+
                                    '<td valign="top" width="20"><div class="{[this.getClass(values.Access)]}"></div></td>'+
                                    '<td>'+
                                        '<div class="rm-nextgrayarrow rm-orgnametext rm-mr5">{OrgName}</div>'+
                                        '<div class="rm-booknametext rm-pt5">{BookName}</div>'+
                                        '<div class="rm-accesstext rm-pt5">{[this.accessLevel(values.Access)]}</div>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>',
                        {
                            getClass: function(access) {
                              if(access.toUpperCase() == 'R') return 'rm-list-readonly-cashbook'; else return 'rm-list-active-cashbook ';
                            },
                            accessLevel: function(access) {
                              if(access.toUpperCase() == 'R') return 'READ ONLY';
                            }
                        }),

				plugins: [
                    {
                        xclass: 'RM.component.RMPullRefresh',                        
                    },					
					{
						type: 'listpaging',
						autoPaging: true,
                        noMoreRecordsText: ''
					}
				]
				
			}
        ] 
    }
});