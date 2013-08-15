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
                                    '<td valign="top" width="20"><div class="rm-listdynamiccolor" style="background:{ColorCode};"></div></td>'+
                                    '<td>'+
                                        '<div class="rm-nextgrayarrow rm-orgnametext rm-mr5">{OrgName}</div>'+
                                        '<div class="rm-booknametext rm-pt5">{BookName}</div>'+
                                        //'<div class="rm-accesstext rm-pt5">{[this.accessLevel(values.Access)]}</div>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>',
                        {
                            accessLevel: function(access) {
                              if(access == 'f')
                                  return 'FULL ACCESS';
                              else
                                  return 'READ ONLY';
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