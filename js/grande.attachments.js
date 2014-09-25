// depends on grande.js (and grande.class.js)
G.Attachments = G.Class.extend({

	name : 'Attachments',

	initialize : function (source) {
		this.source = source;
		console.log('intilaisie: ', this.source, this);
	},

	_initialize : function () {

		// create layout
		this.initLayout();

		// add hooks
		this.addHooks();

		// mark initialized
		this.initialized = true;

	},

	

	// hack cause i dont get it
	plugin : function (grande) {

		this.grande = grande;
		this._initialize();

	},

	initLayout : function () {

		// create button and append to ui container
		this.button = this.createButton();
		
		// add to toolbar buttons container		
		this.grande.addToolbarButton(this.button);

	},

	// createPopup : function () {
	// 	this._container = document.createElement('div');
	// 	this._inner = document.createElement('div');
	// },

	createButton : function () {
		var button = document.createElement('button');
		button.className = 'attachment';
		button.innerHTML = 'F';
		return button;
	},

	addHooks : function () {
		var that = this;
		this.button.addEventListener('mousedown', function (e) {
			that.toggleButton(e, that);
		}, false);
	},

	removeHooks : function () {
		var that = this;
		this.button.removeEventListener('mousedown', function (e) {
			that.toggleButton(e, that);
		}, false);
	},

	toggleButton : function (e, that) {

		var button = e.target;
		Wu.DomEvent.stop(e);

		if (button.active) {
			that.closePopup();
			button.active = false;
			button.className = 'attachment';
		} else {
			that.openPopup();
			button.active = true;
			button.className = 'attachment active';
		}
	},

	closePopup : function () {
		console.log('clsoePane!!!', this);

		// unlink


		// remove popup
		this.destroyPopup();

	},

	openPopup : function () {

		// select text
		var selectedText = window.getSelection();
		var range = selectedText.getRangeAt(0);
		var clientRectBounds = range.getBoundingClientRect();
		// console.log('free! ', selectedText, range, clientRectBounds);
		
		// create popup
		this.createPopup();

	},

	createPopup : function () {

		// get project
		this.project = app.activeProject;

		// get sources
		var sources = this.source;
		// var collections = this.project.getCollections();

		console.log('sources: ', sources);


		var container = this._popup = Wu.DomUtil.create('div', 'grande-sources-container');
		var topwrapper = Wu.DomUtil.create('div', 'grande-sources-topwrap', container);

		sources.forEach(function (source) {
			this._createSource(source, container);
		}, this);

		this.grande.addToOptions(container);

	},


	_createSource : function (source, container) {

		var title = source.name;
		var wrap = Wu.DomUtil.create('div', 'grande-sources-source', container);
		var icon = Wu.DomUtil.create('div', 'grande-sources-source-icon', wrap);
		var name = Wu.DomUtil.create('div', 'grande-sources-source-title', wrap, title);

		Wu.DomUtil.addClass(icon, source.type);
		
		// if (source.type == 'image') {
		// 	var size = '?width=50&height=50';
		// 	var url = '/pixels/' + source.uuid + size;
		// 	console.log('url: ', url);
		// 	var thumb = Wu.DomUtil.create('img', 'grande-sources-source-thumb', wrap);
		// 	thumb.src = url;
		// 	console.log('thumb: ', thumb);
		// } 

		Wu.DomEvent.on(wrap, 'mousedown', function () {
			this.selectSource(source);
		}, this);
	},

	destroyPopup : function () {
		this._remove(this._popup);
		this._popup = null;		// events should now be gc'd. todo: check
	},

	selectSource : function (source) {
		console.log('selected source!', source);

		// what to do when source is selected
		// add link go text selection
		var url = source.uuid;

		this.grande.createLink(url);

		
	},

	_remove: function (el) {
		var parent = el.parentNode;
		if (parent) {
		    parent.removeChild(el);
		}
	},


	// fired on Grande.unbind()
	destroy : function () {
		console.log('destroy');
		this.removeHooks();
	},

});

// register plugin
// GrandeAttachments.register(GrandeAttachments);
