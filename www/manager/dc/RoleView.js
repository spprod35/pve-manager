Ext.define('PVE.dc.RoleView', {
    extend: 'Ext.grid.GridPanel',

    alias: ['widget.pveRoleView'],

    initComponent : function() {
	var me = this;

	var store = new Ext.data.Store({
	    model: 'pve-roles',
	    proxy: {
                type: 'pve',
		url: "/api2/json/access/roles"
	    },
	    sorters: { 
		property: 'roleid', 
		order: 'DESC' 
	    }
	});

	var render_privs = function(value, metaData) {

	    if (!value) {
		return '-';
	    }

	    // allow word wrap
	    metaData.style = 'white-space:normal;';

	    return value.replace(/\,/g, ' ');
	};

	Ext.apply(me, {
	    store: store,
	    stateful: false,

	    viewConfig: {
		trackOver: false
	    },
	    columns: [
		{
		    header: gettext('Role'),
		    width: 150,
		    sortable: true,
		    dataIndex: 'roleid'
		},
		{
		    id: 'privs',
		    header: gettext('Privileges'),
		    sortable: false,
		    renderer: render_privs,
		    dataIndex: 'privs',
		    flex: 1
		}
	    ],
	    listeners: {
		show: function() {
		    store.load();
		}
	    }
	});

	me.callParent();
    }
}, function() {

    Ext.define('pve-roles', {
	extend: 'Ext.data.Model',
	fields: [ 'roleid', 'privs' ],
	idProperty: 'roleid'
    });

});