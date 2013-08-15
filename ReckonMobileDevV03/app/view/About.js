Ext.define('RM.view.About', {
	extend: 'Ext.Panel',
	xtype: 'about',
	config: {
		items: [
			{
				xtype: 'toolbar',                
				docked: 'top',                
				items: [
					{
						xtype: 'component',
						itemId: 'title',
						html: 'About',
						cls: 'rm-topbartitle'
					} 
				]
			},{
				xtype: 'container',
                cls: 'rm-whitebg',
				items:[
					{
						xtype: 'component',
						html: 'Reckon One',
						cls: 'rm-about-product-name',
						padding: '35 20 5 20'
					},{
						xtype: 'component',
						html: 'Version 1.0',
						cls: 'rm-about-product-version',
						padding: '5 20 5 20'
					},{
						xtype: 'component',
						html: 'Copyright Reckon Limited 2013',
						cls: 'rm-about-product-copyright',
						padding: '5 20 5 20'
					},{
						xtype: 'component',
						html: 'Privacy Policy >',  
						cls: 'rm-about-link',
						padding: '35 20 10 20',
						listeners: {
							tap: {
								element: 'element',                    
								fn: function () { 
									window.open('http://www.reckonone.com', '_blank', 'location=no');
								}
							}
						}
					},{
						xtype: 'component',
						html: 'Terms of Use >',
						cls: 'rm-about-link',
						padding: '10 20 10 20',
						listeners: {
							tap: {
								element: 'element',                    
								fn: function () { 
									window.open('http://www.reckonone.com', '_blank', 'location=no');
								}
							}
						}
					},{
						xtype: 'component',
						html: 'Reckon One website >',
						cls: 'rm-about-link',
						padding: '10 20 10 20',
						listeners: {
							tap: {
								element: 'element',                    
								fn: function () { 
									window.open('http://www.reckonone.com', '_blank', 'location=no');
								}
							}
						}
					}
                
                
				]
                
                
                
			}
        

		]
	}
    
    
});