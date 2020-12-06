/*****************************************************************
** Author: Asvin Goel, goel@telematique.eu
**
** A plugin for reveal.js adding a chalkboard.
**
** Version: 1.0.5
**
** License: MIT license (see LICENSE.md)
**
** Credits:
** Chalkboard effect by Mohamed Moustafa https://github.com/mmoustafa/Chalkboard
** Multi color support by Kurt Rinnert https://github.com/rinnert
** Compatibility with reveal.js v4 by Hakim El Hattab https://github.com/hakimel
******************************************************************/

window.RevealChalkboard = window.RevealChalkboard || {
    id: 'RevealChalkboard',
    init: function(deck) {
        initChalkboard(deck);
    },
    configure: function(config) { configure(config); },
    toggleNotesCanvas: function() { toggleNotesCanvas(); },
    toggleChalkboard: function() { toggleChalkboard(); },
    colorNext: function() { colorNext(); },
    colorPrev: function() {colorPrev(); },
    clear: function() { clear(); },
    reset: function() { reset(); },
    resetAll: function() { resetAll(); },
    download: function() { download(); },
};

function scriptPath() {
	// obtain plugin path from the script element
	var src;
	if (document.currentScript) {
		src = document.currentScript.src;
	} else {
		var sel = document.querySelector('script[src$="/chalkboard/plugin.js"]')
		if (sel) {
			src = sel.src;
		}
	}
	var path = (src === undefined) ? "" : src.slice(0, src.lastIndexOf("/") + 1);
//console.log("Path: " + path);
	return path;
}
var path = scriptPath();

const initChalkboard = function(Reveal){
//console.warn(path);
	/* Feature detection for passive event handling*/
	var passiveSupported = false;

	try {
	  window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { passiveSupported = true; } }));
	} catch(err) {}


/*****************************************************************
** Configuration
******************************************************************/
	var background, pen, draw, color;
	var grid = false;
	var boardmarkerWidth = 3;
	var chalkWidth = 7;
	var chalkEffect = 1.0;
	var rememberColor = [true, false];
	var eraser = { src: path + 'img/sponge.png', radius: 20};
	var boardmarkers = [
		{ color: 'rgba(100,100,100,1)', cursor: 'url(' + path + 'img/boardmarker-black.png), auto'},
		{ color: 'rgba(30,144,255, 1)', cursor: 'url(' + path + 'img/boardmarker-blue.png), auto'},
		{ color: 'rgba(220,20,60,1)', cursor: 'url(' + path + 'img/boardmarker-red.png), auto'},
		{ color: 'rgba(50,205,50,1)', cursor: 'url(' + path + 'img/boardmarker-green.png), auto'},
		{ color: 'rgba(255,140,0,1)', cursor: 'url(' + path + 'img/boardmarker-orange.png), auto'},
		{ color: 'rgba(150,0,20150,1)', cursor: 'url(' + path + 'img/boardmarker-purple.png), auto'},
		{ color: 'rgba(255,220,0,1)', cursor: 'url(' + path + 'img/boardmarker-yellow.png), auto'}
	];
	var chalks = [
		{ color: 'rgba(255,255,255,0.5)', cursor: 'url(' + path + 'img/chalk-white.png), auto'},
		{ color: 'rgba(96, 154, 244, 0.5)', cursor: 'url(' + path + 'img/chalk-blue.png), auto'},
		{ color: 'rgba(237, 20, 28, 0.5)', cursor: 'url(' + path + 'img/chalk-red.png), auto'},
		{ color: 'rgba(20, 237, 28, 0.5)', cursor: 'url(' + path + 'img/chalk-green.png), auto'},
		{ color: 'rgba(220, 133, 41, 0.5)', cursor: 'url(' + path + 'img/chalk-orange.png), auto'},
		{ color: 'rgba(220,0,220,0.5)', cursor: 'url(' + path + 'img/chalk-purple.png), auto'},
		{ color: 'rgba(255,220,0,0.5)', cursor: 'url(' + path + 'img/chalk-yellow.png), auto'}
	];
	var keyBindings = { 
		toggleNotesCanvas: { keyCode: 67, key: 'C', description: 'Toggle notes canvas' },
		toggleChalkboard: { keyCode: 66, key: 'B', description: 'Toggle chalkboard' },
		clear: { keyCode: 171, key: '+', description: 'Clear drawings on slide' },
		reset: { keyCode: 46, key: 'DEL', description: 'Reset drawings on slide' },
		resetAll: { keyCode: 8, key: 'BACKSPACE', description: 'Reset all drawings' },
		colorNext: { keyCode: 88, key: 'X', description: 'Next color' },
		colorPrev: { keyCode: 89, key: 'Y', description: 'Previous color' },
		download: { keyCode: 68, key: 'D', description: 'Download drawings' }
	};


	var theme = "chalkboard";
	var color = [0, 0];
	var toggleChalkboardButton = true;
	var toggleNotesButton = true;
	var transition = 800;

	var readOnly = undefined;

	var config = configure( Reveal.getConfig().chalkboard || {} );
	if ( config.keyBindings ) {
		for (var key in config.keyBindings) {
			keyBindings[key] = config.keyBindings[key];
		};
	}

	function configure( config ) {

		if ( config.boardmarkerWidth || config.penWidth ) boardmarkerWidth = config.boardmarkerWidth || config.penWidth;
		if ( config.chalkWidth ) chalkWidth = config.chalkWidth;
		if ( "chalkEffect" in config ) chalkEffect = ("chalkEffect" in config);
		if ( config.rememberColor ) rememberColor = config.rememberColor;
		if ( config.eraser ) eraser = config.eraser;
		if ("boardmarkers" in config) boardmarkers = config.boardmarkers;
		if ("chalks" in config) chalks = config.chalks;

		if ( config.theme ) theme = config.theme;
		switch ( theme ) {
			case "whiteboard":
				background = [ 'rgba(127,127,127,.1)' , path + 'img/whiteboard.png' ];
				draw = [ drawWithBoardmarker , drawWithBoardmarker ];
				pens = [ boardmarkers, boardmarkers ];
				grid = { color: 'rgb(127,127,255,0.1)', distance: 40, width: 2};
				break;
			case "chalkboard":
			default:
				background = [ 'rgba(127,127,127,.1)' , path + 'img/blackboard.png' ];
				draw = [ drawWithBoardmarker , drawWithChalk ];
				pens = [ boardmarkers, chalks ];
				grid = { color: 'rgb(50,50,10,0.5)', distance: 80, width: 2};
		}

		if ( config.background ) background = config.background;
		if ( config.grid != undefined ) grid = config.grid;

		if (config.toggleChalkboardButton != undefined) toggleChalkboardButton = config.toggleChalkboardButton;
		if (config.toggleNotesButton != undefined)  toggleNotesButton = config.toggleNotesButton;
		if (config.transition) transition = config.transition;

		if (config.readOnly) readOnly = config.readOnly;

		if ( drawingCanvas && ( config.theme || config.background || config.grid ) ) {
			var canvas = document.getElementById( drawingCanvas[1].id );
			canvas.style.background = 'url("' + background[1] + '") repeat';
			clearCanvas( 1 );
			drawGrid();
		}
		return config;
	}
/*****************************************************************
** Setup
******************************************************************/

	function whenReady( callback ) {
		// wait for drawings to be loaded and markdown to be parsed
		if ( document.querySelectorAll(".pdf-page").length && loaded !== null ) {
			callback();
		}
		else {
console.log("Wait for pdf pages to be created and drawings to be loaded"); 
			setTimeout( whenReady, 500, callback )
		}
	}


	if ( toggleChalkboardButton ) {
//console.log("toggleChalkboardButton")
		var button = document.createElement( 'div' );
		button.className = "chalkboard-button";
		button.id = "toggle-chalkboard";
		button.style.visibility = "visible";
		button.style.position = "absolute";
		button.style.zIndex = 30;
		button.style.fontSize = "24px";

		button.style.left = toggleChalkboardButton.left || "30px";
		button.style.bottom = toggleChalkboardButton.bottom ||  "30px";
		button.style.top = toggleChalkboardButton.top ||  "auto";
		button.style.right = toggleChalkboardButton.right ||  "auto";

		button.innerHTML = '<a href="#" onclick="RevealChalkboard.toggleChalkboard(); return false;"><i class="fa fa-pen-square"></i></a>'
		document.querySelector(".reveal").appendChild( button );
	}
	if ( toggleNotesButton ) {
//console.log("toggleNotesButton")
		var button = document.createElement( 'div' );
		button.className = "chalkboard-button";
		button.id = "toggle-notes";
		button.style.position = "absolute";
		button.style.zIndex = 30;
		button.style.fontSize = "24px";

		button.style.left = toggleNotesButton.left || "70px";
		button.style.bottom = toggleNotesButton.bottom ||  "30px";
		button.style.top = toggleNotesButton.top ||  "auto";
		button.style.right = toggleNotesButton.right ||  "auto";

		button.innerHTML = '<a href="#" onclick="RevealChalkboard.toggleNotesCanvas(); return false;"><i class="fa fa-pen"></i></a>'
		document.querySelector(".reveal").appendChild( button );
	}
//alert("Buttons");

	var drawingCanvas = [ {id: "notescanvas" }, {id: "chalkboard" } ];
	setupDrawingCanvas(0);
	setupDrawingCanvas(1);

	var mode = 0; // 0: notes canvas, 1: chalkboard

	var mouseX = 0;
	var mouseY = 0;
	var xLast = null;
	var yLast = null;

	var slideStart = Date.now();
	var slideIndices =  { h:0, v:0 };
        var event = null;
        var timeouts = [ [], [] ];
	var touchTimeout = null;
	var slidechangeTimeout = null;
	var playback = false;

	function setupDrawingCanvas( id ) {
		var container = document.createElement( 'div' );
		container.id = drawingCanvas[id].id;
		container.classList.add( 'overlay' );
		container.setAttribute( 'data-prevent-swipe', '' );
		container.oncontextmenu = function() { return false; }
		container.style.cursor = pens[ id ][ color[id] ].cursor;

		drawingCanvas[id].width = window.innerWidth;
		drawingCanvas[id].height = window.innerHeight;
		drawingCanvas[id].scale = 1;
		drawingCanvas[id].xOffset = 0;
		drawingCanvas[id].yOffset = 0;


		if ( id == "0" ) {
			container.style.background = 'rgba(0,0,0,0)';
			container.style.zIndex = 24;
			container.style.opacity = 1;
			container.style.visibility = 'visible';
			container.style.pointerEvents = "none";

			var slides = document.querySelector(".slides");
			var aspectRatio = Reveal.getConfig().width / Reveal.getConfig().height;
			if ( drawingCanvas[id].width > drawingCanvas[id].height*aspectRatio ) {
				drawingCanvas[id].xOffset = (drawingCanvas[id].width - drawingCanvas[id].height*aspectRatio) / 2;
			}
			else if ( drawingCanvas[id].height > drawingCanvas[id].width/aspectRatio ) {
				drawingCanvas[id].yOffset = ( drawingCanvas[id].height - drawingCanvas[id].width/aspectRatio ) / 2;
			}
		}
		else {
			container.style.background = 'url("' + background[id] + '") repeat';
			container.style.zIndex = 26;
			container.style.opacity = 0;
			container.style.visibility = 'hidden';
		}

		var sponge = document.createElement( 'img' );
		sponge.src = eraser.src;
		sponge.id = "sponge";
		sponge.style.visibility = "hidden";
		sponge.style.position = "absolute";
		container.appendChild( sponge );
		drawingCanvas[id].sponge = sponge;

		var canvas = document.createElement( 'canvas' );
		canvas.width = drawingCanvas[id].width;
		canvas.height = drawingCanvas[id].height;
		canvas.setAttribute( 'data-chalkboard', id );
		canvas.style.cursor = pens[ id ][ color[id] ].cursor;
		container.appendChild( canvas );
		drawingCanvas[id].canvas = canvas;

		drawingCanvas[id].context = canvas.getContext("2d");


		document.querySelector( '.reveal' ).appendChild( container );
		drawingCanvas[id].container = container;
	}


/*****************************************************************
** Storage
******************************************************************/

	var storage = [
		{ width: Reveal.getConfig().width, height: Reveal.getConfig().height, data: []},
		{ width: Reveal.getConfig().width, height: Reveal.getConfig().height, data: []}
	];
//console.log( JSON.stringify(storage));

	var loaded = null;
	if ( config.src != null ) {
		loadData( config.src );
	}


	/**
	 * Load data.
	 */
	function loadData( filename ) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (xhr.readyState === 4 && xhr.status != 404 ) {
				storage = JSON.parse(xhr.responseText);
				for (var id = 0; id < storage.length; id++) {
					if ( drawingCanvas[id].width != storage[id].width || drawingCanvas[id].height != storage[id].height ) {
						drawingCanvas[id].scale = Math.min( drawingCanvas[id].width/storage[id].width, drawingCanvas[id].height/storage[id].height);
						drawingCanvas[id].xOffset = (drawingCanvas[id].width - storage[id].width * drawingCanvas[id].scale)/2;
						drawingCanvas[id].yOffset = (drawingCanvas[id].height - storage[id].height * drawingCanvas[id].scale)/2;
					}
					if ( config.readOnly ) {
						drawingCanvas[id].container.style.cursor = 'default';
						drawingCanvas[id].canvas.style.cursor = 'default';
					}
				}
				loaded = true;
//console.log("Drawings loaded");
			}
			else {
				config.readOnly = undefined;
				readOnly = undefined;
				console.warn( 'Failed to get file ' + filename +". ReadyState: " + xhr.readyState + ", Status: " + xhr.status);
				loaded = false;
			}
		};

		xhr.open( 'GET', filename, true );
		try {
			xhr.send();
		}
		catch ( error ) {
			config.readOnly = undefined;
			readOnly = undefined;
			console.warn( 'Failed to get file ' + filename + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + error );
			loaded = false;
		}
	}

	/**
	 * Download data.
	 */
	function downloadData() {
		var a = document.createElement('a');
		document.body.appendChild(a);
		try {
			// cleanup slide data without events
			for (var id = 0; id < 2; id++) {
				for (var i = storage[id].data.length-1; i >= 0; i--) {
					if (storage[id].data[i].events.length == 0) {
						storage[id].data.splice(i, 1);
					}
				}
			}
			a.download = "chalkboard.json";
			var blob = new Blob( [ JSON.stringify( storage ) ], { type: "application/json"} );
			a.href = window.URL.createObjectURL( blob );
		} catch( error ) {
			a.innerHTML += " (" + error + ")";
		}
		a.click();
		document.body.removeChild(a);
	}

	/**
	 * Returns data object for the slide with the given indices.
	 */
	function getSlideData( indices, id ) {
		if ( id == undefined ) id = mode;
		if (!indices) indices = slideIndices;
		var data;
		for (var i = 0; i < storage[id].data.length; i++) {
			if (storage[id].data[i].slide.h === indices.h && storage[id].data[i].slide.v === indices.v && storage[id].data[i].slide.f === indices.f ) {
				data = storage[id].data[i];
				return data;
			}
		}
		storage[id].data.push( { slide: indices, events: [], duration: 0 } );
		data = storage[id].data[storage[id].data.length-1];
		return data;
	}

	/**
	 * Returns maximum duration of slide playback for both modes
	 */
	function getSlideDuration( indices ) {
		if (!indices) indices = slideIndices;
		var duration = 0;
		for (var id = 0; id < 2; id++) {
			for (var i = 0; i < storage[id].data.length; i++) {
				if (storage[id].data[i].slide.h === indices.h && storage[id].data[i].slide.v === indices.v && storage[id].data[i].slide.f === indices.f ) {
					duration = Math.max( duration, storage[id].data[i].duration );
					break;
				}
			}
		}
//console.log( duration );
		return duration;
	}

/*****************************************************************
** Print
******************************************************************/
	var printMode = ( /print-pdf/gi ).test( window.location.search );
//console.log("createPrintout" + printMode)

	function createPrintout( ) {
console.warn(Reveal.getTotalSlides(),Reveal.getSlidesElement());
		if ( storage[1].data.length == 0 ) return; 
console.log( 'Create printout for ' + storage[1].data.length + " slides");
		drawingCanvas[0].container.style.opacity = 0; // do not print notes canvas
		drawingCanvas[0].container.style.visibility = 'hidden';

		var patImg = new Image();
		patImg.onload = function () {
			var slides = getSlidesArray();
			for (var i = storage[1].data.length-1; i>=0; i--) {
console.log( 'Create printout for slide ' + storage[1].data[i].slide.h + "." + storage[1].data[i].slide.v );
				var slideData = getSlideData( storage[1].data[i].slide, 1 );
				var drawings = createDrawings( slideData, patImg );
				var slide = slides[ storage[1].data[i].slide.h][ storage[1].data[i].slide.v ];
//console.log("Slide:", slide);
				addDrawings( slide, drawings );
				
			}
//			Reveal.sync();
		};
		patImg.src = background[1];
	}

	function getSlidesArray() {
		var horizontal = document.querySelectorAll('.slides > div.pdf-page > section, .slides > section');
		var slides = [];
		var slidenumber = undefined;
		for ( var i=0; i < horizontal.length; i++) {
			if ( horizontal[i].parentElement.classList.contains("pdf-page") ) {
				// Horizontal slide
				if ( horizontal[i].getAttribute("data-slide-number") != slidenumber ) {
					// new slide
					slides.push([]);
					slides[slides.length-1].push(horizontal[i]);
					slidenumber = horizontal[i].getAttribute("data-slide-number");
				}
				else {
					// fragment of same slide
					slides[slides.length-1][slides[slides.length-1].length-1] = horizontal[i];
				}
			}
			else {		
				// Vertical slides
				var vertical = horizontal[i].querySelectorAll('section'); 
				slides.push([]);
				var slidenumber = undefined;
				for ( var j=0; j < vertical.length; j++) {
					if ( vertical[j].getAttribute("data-slide-number") != slidenumber ) {
						// new slide
						slides[slides.length-1].push(vertical[j]);
						slidenumber = vertical[j].getAttribute("data-slide-number");
					}
					else {
						// fragment of same slide
						slides[slides.length-1][slides[slides.length-1].length-1] = vertical[j];
					}
				}
			}
		}
//console.log("Slides:", slides);
		return slides;
	}

	function cloneCanvas(oldCanvas) {
		//create a new canvas
		var newCanvas = document.createElement('canvas');
		var context = newCanvas.getContext('2d');
		//set dimensions
		newCanvas.width = oldCanvas.width;
		newCanvas.height = oldCanvas.height;
		//apply the old canvas to the new one
		context.drawImage(oldCanvas, 0, 0);
		//return the new canvas
		return newCanvas;
	}

	function createDrawings( slideData, patImg ) {
		var width = Reveal.getConfig().width;
		var height = Reveal.getConfig().height;
		var scale = 1;
		var xOffset = 0;
		var yOffset = 0;
		if ( width != storage[1].width || height != storage[1].height ) {
			scale = Math.min( width/storage[1].width, height/storage[1].height);
			xOffset = (width - storage[1].width * scale)/2;
			yOffset = (height - storage[1].height * scale)/2;
		}
		mode = 1;
console.log( 'Create printout for slide ', slideData/*+ data.slide.h + "." + data.slide.v */);
//		var parent = Reveal.getSlide( data.slide.h, data.slide.v ).parentElement;
//		var slideData = getSlideData( data.slide, 1 );

		var drawings = [];
		var imgCanvas = document.createElement('canvas');
		imgCanvas.width = width;
		imgCanvas.height = height;

		var imgCtx = imgCanvas.getContext("2d");
		imgCtx.fillStyle = imgCtx.createPattern( patImg ,'repeat');
		imgCtx.rect(0,0,imgCanvas.width,imgCanvas.height);
		imgCtx.fill();

		for (var j = 0; j < slideData.events.length; j++) {
			switch ( slideData.events[j].type ) {
				case "draw":
					for (var k = 1; k < slideData.events[j].curve.length; k++) {
						draw[1]( imgCtx,
							xOffset + slideData.events[j].curve[k-1].x*scale,
							yOffset + slideData.events[j].curve[k-1].y*scale,
							xOffset + slideData.events[j].curve[k].x*scale,
							yOffset + slideData.events[j].curve[k].y*scale
						);
					}
					break;
				case "erase":
					for (var k = 0; k < slideData.events[j].curve.length; k++) {
						eraseWithSponge( imgCtx,
								xOffset + slideData.events[j].curve[k].x*scale,
								yOffset + slideData.events[j].curve[k].y*scale
						);
					}
					break;
				case "setcolor":
					setColor(slideData.events[j].index);
					break;
				case "clear":
					drawings.push( cloneCanvas(imgCanvas) );
//					addPrintout( parent, nextSlide[i], imgCanvas, patImg );
					imgCtx.clearRect(0,0,imgCanvas.width,imgCanvas.height);
					imgCtx.fill();
					break;
				default:
					break;
			}
		}
		drawings.push( cloneCanvas(imgCanvas) );

		mode = 0;

		return drawings;
	}

	function addDrawings( slide, drawings ) {
		var parent = slide.parentElement.parentElement;
		var nextSlide = slide.parentElement.nextElementSibling;

		for (var i = 0; i < drawings.length; i++) {
			var newPDFPage = document.createElement( 'div' );
			newPDFPage.classList.add('pdf-page');
			newPDFPage.style.height = Reveal.getConfig().height;
//			newPDFPage.innerHTML = '<h1>Drawing should be here!</h1>';
			newPDFPage.append(drawings[i]);
//console.log("Add drawing", newPDFPage);
			if ( nextSlide != null ) {
				parent.insertBefore( newPDFPage, nextSlide );
			}
			else {
				parent.append( newPDFPage );
			}
		}
	}

/*****************************************************************
** Drawings
******************************************************************/

	function drawWithBoardmarker(context,fromX,fromY,toX,toY){
		context.lineWidth = boardmarkerWidth;
		context.lineCap = 'round';
		context.strokeStyle = boardmarkers[color[mode]].color;
		context.beginPath();
  		context.moveTo(fromX, fromY);
  		context.lineTo(toX, toY);
  		context.stroke();
	}

	function drawWithChalk(context,fromX,fromY,toX,toY) {
		var brushDiameter = chalkWidth;
		context.lineWidth = brushDiameter;
		context.lineCap = 'round';
		context.fillStyle = chalks[color[mode]].color; // 'rgba(255,255,255,0.5)';
		context.strokeStyle = chalks[color[mode]].color;
		/*var opacity = Math.min(0.8, Math.max(0,color[1].replace(/^.*,(.+)\)/,'$1') - 0.1)) + Math.random()*0.2;*/
		var opacity = 1.0;
		context.strokeStyle = context.strokeStyle.replace(/[\d\.]+\)$/g, opacity + ')');
		context.beginPath();
  		context.moveTo(fromX, fromY);
  		context.lineTo(toX, toY);
  		context.stroke();
  		// Chalk Effect
		var length = Math.round(Math.sqrt(Math.pow(toX-fromX,2)+Math.pow(toY-fromY,2))/(5/brushDiameter));
		var xUnit = (toX-fromX)/length;
		var yUnit = (toY-fromY)/length;
		for(var i=0; i<length; i++ ){
			if (chalkEffect > (Math.random() * 0.9)) {
				var xCurrent = fromX+(i*xUnit);
				var yCurrent = fromY+(i*yUnit);
				var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;
				var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
				context.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
			}
		}
	}

	function eraseWithSponge(context,x,y) {
		context.save();
		context.beginPath();
		context.arc(x, y, eraser.radius, 0, 2 * Math.PI, false);
		context.clip();
		context.clearRect(x - eraser.radius - 1, y - eraser.radius - 1, eraser.radius * 2 + 2, eraser.radius * 2 + 2);
		context.restore();
		if ( mode == 1 && grid) {
			redrawGrid(x,y,eraser.radius);
		}
	}



	/**
	 * Oboardmarkers an overlay for the chalkboard.
	 */
	function showChalkboard() {
//console.log("showChalkboard");
		clearTimeout(touchTimeout);
		touchTimeout = null;
		drawingCanvas[0].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
		drawingCanvas[1].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
		drawingCanvas[1].container.style.opacity = 1;
		drawingCanvas[1].container.style.visibility = 'visible';
		mode = 1;
		// broadcast
		var message = new CustomEvent('send');
		message.content = { sender: 'chalkboard-plugin', type: 'showChalkboard' };
		document.dispatchEvent( message );
	}


	/**
	 * Closes open chalkboard.
	 */
	function closeChalkboard() {
		clearTimeout(touchTimeout);
		touchTimeout = null;
		drawingCanvas[0].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
		drawingCanvas[1].sponge.style.visibility = "hidden"; // make sure that the sponge from touch events is hidden
		drawingCanvas[1].container.style.opacity = 0;
		drawingCanvas[1].container.style.visibility = 'hidden';
		xLast = null;
		yLast = null;
		event = null;
		mode = 0;
		// broadcast
		var message = new CustomEvent('send');
		message.content = { sender: 'chalkboard-plugin', type: 'closeChalkboard' };
		document.dispatchEvent( message );
	}

	/**
	 * Clear current canvas.
	 */
	function clearCanvas( id ) {
		if ( id == 0 ) clearTimeout( slidechangeTimeout );
		drawingCanvas[id].context.clearRect(0,0,drawingCanvas[id].width,drawingCanvas[id].height);
		if ( id == 1 && grid ) drawGrid();
	}

	/**
	 * Draw grid on background
	 */
	function drawGrid() {
		var context = drawingCanvas[1].context;

		drawingCanvas[1].scale = Math.min( drawingCanvas[1].width/storage[1].width, drawingCanvas[1].height/storage[1].height );
		drawingCanvas[1].xOffset = (drawingCanvas[1].width - storage[1].width * drawingCanvas[1].scale)/2;
		drawingCanvas[1].yOffset = (drawingCanvas[1].height - storage[1].height * drawingCanvas[1].scale)/2;

		var scale = drawingCanvas[1].scale;
		var xOffset = drawingCanvas[1].xOffset;
		var yOffset = drawingCanvas[1].yOffset;

		var distance = grid.distance*scale;

		var fromX = drawingCanvas[1].width/2 - distance/2 - Math.floor( (drawingCanvas[1].width - distance)/2 / distance ) * distance;
		for( var x=fromX; x < drawingCanvas[1].width; x+=distance ) {
			context.beginPath();
			context.lineWidth = grid.width*scale;
			context.lineCap = 'round';
			context.fillStyle = grid.color;
			context.strokeStyle = grid.color;
			context.moveTo(x, 0);
  		context.lineTo(x, drawingCanvas[1].height);
  		context.stroke();
		}
		var fromY = drawingCanvas[1].height/2 - distance/2 - Math.floor( (drawingCanvas[1].height - distance)/2 / distance ) * distance ;

		for( var y=fromY; y < drawingCanvas[1].height; y+=distance ) {
			context.beginPath();
			context.lineWidth = grid.width*scale;
			context.lineCap = 'round';
			context.fillStyle = grid.color;
			context.strokeStyle = grid.color;
			context.moveTo(0, y);
  		context.lineTo(drawingCanvas[1].width, y);
  		context.stroke();
		}
	}

	function redrawGrid(centerX,centerY,diameter) {
		var context = drawingCanvas[1].context;

		drawingCanvas[1].scale = Math.min( drawingCanvas[1].width/storage[1].width, drawingCanvas[1].height/storage[1].height );
		drawingCanvas[1].xOffset = (drawingCanvas[1].width - storage[1].width * drawingCanvas[1].scale)/2;
		drawingCanvas[1].yOffset = (drawingCanvas[1].height - storage[1].height * drawingCanvas[1].scale)/2;

		var scale = drawingCanvas[1].scale;
		var xOffset = drawingCanvas[1].xOffset;
		var yOffset = drawingCanvas[1].yOffset;

		var distance = grid.distance*scale;

		var fromX = drawingCanvas[1].width/2 - distance/2 - Math.floor( (drawingCanvas[1].width - distance)/2 / distance ) * distance;

		for( var x=fromX + distance* Math.ceil( (centerX-diameter-fromX) / distance); x <= fromX + distance* Math.floor( (centerX+diameter-fromX) / distance); x+=distance ) {
			context.beginPath();
			context.lineWidth = grid.width*scale;
			context.lineCap = 'round';
			context.fillStyle = grid.color;
			context.strokeStyle = grid.color;
			context.moveTo(x, centerY - Math.sqrt( diameter*diameter - (centerX-x)*(centerX-x) ));
  		context.lineTo(x, centerY + Math.sqrt( diameter*diameter - (centerX-x)*(centerX-x) ) );
  		context.stroke();
		}
		var fromY = drawingCanvas[1].height/2 - distance/2 - Math.floor( (drawingCanvas[1].height - distance)/2 / distance ) * distance ;
		for( var y=fromY + distance* Math.ceil( (centerY-diameter-fromY) / distance); y <= fromY + distance* Math.floor( (centerY+diameter-fromY) / distance); y+=distance ) {
			context.beginPath();
			context.lineWidth = grid.width*scale;
			context.lineCap = 'round';
			context.fillStyle = grid.color;
			context.strokeStyle = grid.color;
			context.moveTo(centerX - Math.sqrt( diameter*diameter - (centerY-y)*(centerY-y) ), y );
			context.lineTo(centerX + Math.sqrt( diameter*diameter - (centerY-y)*(centerY-y) ), y );
			context.stroke();
		}
	}

	/**
	 * Set the  color
	 */
	function setColor( index ) {
		// protect against out of bounds (this could happen when
		// replaying events recorded with different color settings).
		if ( index >= boardmarkers[mode].length ) index = 0;
		color[mode] = index;
		drawingCanvas[mode].canvas.style.cursor = pens[mode][color[mode]].cursor;
	}

	/**
	 * Forward cycle color
	 */
	function cycleColorNext() {
		color[mode] = (color[mode] + 1) % pens[mode].length;
		return color[mode];
	}

	/**
	 * Backward cycle color
	 */
	function cycleColorPrev() {
		color[mode] = (color[mode] + (pens[mode].length - 1)) % pens[mode].length;
		return color[mode];
	}

/*****************************************************************
** Broadcast
******************************************************************/
	document.addEventListener( 'received', function ( message ) {
//console.log(JSON.stringify(message));
		if ( message.content && message.content.sender == 'chalkboard-plugin' ) {
			switch ( message.content.type ) {
				case 'showChalkboard':
					showChalkboard();
					break;
				case 'closeChalkboard':
					closeChalkboard();
					break;
				case 'startDrawing':
					startDrawing(message.content.x, message.content.y, message.content.erase);
					break;
				case 'startErasing':
					if ( message.content ) {
						message.content.type = "erase";
						message.content.begin = Date.now() - slideStart;
						eraseWithSponge(drawingCanvas[mode].context, message.content.x, message.content.y);
					}
					break;
				case 'drawSegment':
					drawSegment(message.content.x, message.content.y, message.content.erase);
					break;
				case 'stopDrawing':
					stopDrawing();
					break;
				case 'clear':
					clear();
					break;
				case 'setcolor':
					setColor(message.content.index);
					break;
				case 'resetSlide':
					resetSlide(true);
					break;
				case 'init':
					storage = message.content.storage;
					for (var id = 0; id < 2; id++ ) {
						drawingCanvas[id].scale = Math.min( drawingCanvas[id].width/storage[id].width, drawingCanvas[id].height/storage[id].height );
						drawingCanvas[id].xOffset = (drawingCanvas[id].width - storage[id].width * drawingCanvas[id].scale)/2;
						drawingCanvas[id].yOffset = (drawingCanvas[id].height - storage[id].height * drawingCanvas[id].scale)/2;
					}
					clearCanvas( 0 );
					clearCanvas( 1 );
					if ( !playback ) {
						slidechangeTimeout = setTimeout( startPlayback, transition, getSlideDuration(), 0 );
					}
					if ( mode == 1 && message.content.mode == 0) {
						setTimeout( closeChalkboard, transition + 50 );
					}
					if ( mode == 0 && message.content.mode == 1) {
						setTimeout( showChalkboard, transition + 50 );
					}
					mode = message.content.mode;
					break;
				default:
					break;
			}
		}
	});

	document.addEventListener( 'newclient', function() {
		// broadcast storage
		var message = new CustomEvent('send');
		message.content = { sender: 'chalkboard-plugin', type: 'init', storage: storage, mode: mode };
		document.dispatchEvent( message );
	});

/*****************************************************************
** Playback
******************************************************************/

	document.addEventListener('seekplayback', function( event ) {
//console.log('event seekplayback ' + event.timestamp);
		stopPlayback();
		if ( !playback || event.timestamp == 0) {
			// in other cases startplayback fires after seeked
			startPlayback( event.timestamp );
		}
//console.log('seeked');
	});


	document.addEventListener('startplayback', function( event ) {
//console.log('event startplayback ' + event.timestamp);
		stopPlayback();
		playback = true;
		startPlayback( event.timestamp );
	});

	document.addEventListener('stopplayback', function( event ) {
//console.log('event stopplayback ' + (Date.now() - slideStart) );
		playback = false;
		stopPlayback();
	});

	document.addEventListener('startrecording', function( event ) {
//console.log('event startrecording ' + event.timestamp);
		startRecording();
	});

	function recordEvent( event ) {
		var slideData = getSlideData();
		var i = slideData.events.length;
		while ( i > 0 && event.begin < slideData.events[i-1].begin ) {
			i--;
		}
		slideData.events.splice( i, 0, event);
		slideData.duration = Math.max( slideData.duration, Date.now() - slideStart ) + 1;
	}

	function startRecording() {
		resetSlide( true );
		updateReadOnlyMode();
		slideStart = Date.now();
	}

	function startPlayback( timestamp, finalMode, resized ) {
//console.log("playback " + timestamp );
		if ( resized == undefined ) {
			updateReadOnlyMode();
		}
		slideStart = Date.now() - timestamp;
		closeChalkboard();
		mode = 0;
		for ( var id = 0; id < 2; id++ ) {
			clearCanvas( id );
			var slideData = getSlideData( slideIndices, id );
//console.log( timestamp +" / " + JSON.stringify(slideData));
			var index = 0;
			while ( index < slideData.events.length && slideData.events[index].begin < (Date.now() - slideStart) ) {
				playEvent( id, slideData.events[index], timestamp );
				index++;
			}

			while ( playback && index < slideData.events.length ) {
				timeouts[id].push( setTimeout( playEvent, slideData.events[index].begin - (Date.now() - slideStart), id, slideData.events[index], timestamp ) );
				index++;
			}
		}
//console.log("Mode: " + finalMode + "/" + mode );
		if ( finalMode != undefined ) {
			mode = finalMode;
		}
		if( mode == 1 ) showChalkboard();
//console.log("playback (ok)");

	};

	function stopPlayback() {
//console.log("stopPlayback");
//console.log("Timeouts: " + timeouts[0].length + "/"+ timeouts[1].length);
		for ( var id = 0; id < 2; id++ ) {
			for (var i = 0; i < timeouts[id].length; i++) {
 				clearTimeout(timeouts[id][i]);
			}
			timeouts[id] = [];
		}
	};

	function playEvent( id, event, timestamp ) {
//console.log( timestamp +" / " + JSON.stringify(event));
//console.log( id + ": " + timestamp +" / " +  event.begin +" / " + event.type +" / " + mode );
		switch ( event.type ) {
			case "open":
				if ( timestamp <= event.begin ) {
					showChalkboard();
				}
				else {
					mode = 1;
				}

				break;
			case "close":
				if ( timestamp < event.begin ) {
					closeChalkboard();
				}
				else {
					mode = 0;
				}
				break;
			case "clear":
				clearCanvas( id );
				break;
			case "setcolor":
				setColor(event.index);
				break;
			case "draw":
				drawCurve( id, event, timestamp );
				break;
			case "erase":
				eraseCurve( id, event, timestamp );
				break;

		}
	};

	function drawCurve( id, event, timestamp ) {
		if  ( event.curve.length > 1 ) {
			var ctx = drawingCanvas[id].context;
			var scale = drawingCanvas[id].scale;
			var xOffset = drawingCanvas[id].xOffset;
			var yOffset = drawingCanvas[id].yOffset;

			var stepDuration = ( event.end - event.begin )/ ( event.curve.length - 1 );
//console.log("---");
			for (var i = 1; i < event.curve.length; i++) {
				if (event.begin + i * stepDuration <= (Date.now() - slideStart)) {
//console.log( "Draw " + timestamp +" / " + event.begin + " + " + i + " * " + stepDuration );
					draw[id](ctx, xOffset + event.curve[i-1].x*scale, yOffset + event.curve[i-1].y*scale, xOffset + event.curve[i].x*scale, yOffset + event.curve[i].y*scale);
				}
				else if ( playback ) {
//console.log( "Cue " + timestamp +" / " + (Date.now() - slideStart) +" / " + event.begin + " + " + i + " * " + stepDuration + " = " + Math.max(0,event.begin + i * stepDuration - timestamp) );
					timeouts.push( setTimeout(
						draw[id], Math.max(0,event.begin + i * stepDuration - (Date.now() - slideStart)), ctx,
							xOffset + event.curve[i-1].x*scale,
							yOffset + event.curve[i-1].y*scale,
							xOffset + event.curve[i].x*scale,
							yOffset + event.curve[i].y*scale
						)
					);
				}
			}
		}

	};

	function eraseCurve( id, event, timestamp ) {
		if  ( event.curve.length > 1 ) {
			var ctx = drawingCanvas[id].context;
			var scale = drawingCanvas[id].scale;
			var xOffset = drawingCanvas[id].xOffset;
			var yOffset = drawingCanvas[id].yOffset;

			var stepDuration = ( event.end - event.begin )/ event.curve.length;
			for (var i = 0; i < event.curve.length; i++) {
				if (event.begin + i * stepDuration <= (Date.now() - slideStart)) {
					eraseWithSponge(ctx, xOffset + event.curve[i].x*scale, yOffset + event.curve[i].y*scale);
				}
				else if ( playback ) {
					timeouts.push( setTimeout(
						eraseWithSponge, Math.max(0,event.begin + i * stepDuration - (Date.now() - slideStart)), ctx,
							xOffset + event.curve[i].x * scale,
							yOffset + event.curve[i].y * scale
						)
					);
				}
			}
		}

	};


	function startDrawing( x, y, erase ) {
			var ctx = drawingCanvas[mode].context;
			var scale = drawingCanvas[mode].scale;
			var xOffset = drawingCanvas[mode].xOffset;
			var yOffset = drawingCanvas[mode].yOffset;
			xLast = x * scale + xOffset;
			yLast = y * scale + yOffset;
			if ( erase == true) {
				event = { type: "erase", begin: Date.now() - slideStart, end: null, curve: [{x: x, y: y}]};
				drawingCanvas[mode].canvas.style.cursor = 'url("' + eraser.src +  '") ' + eraser.radius + ' ' + eraser.radius + ', auto';
				eraseWithSponge(ctx, x * scale + xOffset, y * scale + yOffset);
			}
			else {
				event = { type: "draw", begin: Date.now() - slideStart, end: null, curve: [{x: x, y: y}] };
			}
	}


	function showSponge(x,y) {
		if ( event ) {
			event.type = "erase";
			event.begin = Date.now() - slideStart;
			// show sponge image
			drawingCanvas[mode].sponge.style.left = (x - eraser.radius) +"px" ;
			drawingCanvas[mode].sponge.style.top = (y - eraser.radius) +"px" ;
			drawingCanvas[mode].sponge.style.visibility = "visible";
			eraseWithSponge(drawingCanvas[mode].context,x,y);
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'startErasing', x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale };
			document.dispatchEvent( message );
		}
	}

	function drawSegment( x, y, erase ) {
		var ctx = drawingCanvas[mode].context;
		var scale = drawingCanvas[mode].scale;
		var xOffset = drawingCanvas[mode].xOffset;
		var yOffset = drawingCanvas[mode].yOffset;
		if ( !event ) {
			// safeguard if broadcast hickup
			startDrawing( x, y, erase );
		}
		event.curve.push({x: x, y: y});
		if(y * scale + yOffset < drawingCanvas[mode].height && x * scale + xOffset < drawingCanvas[mode].width) {
			if ( erase ) {
				eraseWithSponge(ctx, x * scale + xOffset, y * scale + yOffset);
			}
			else {
				draw[mode](ctx, xLast, yLast, x * scale + xOffset, y * scale + yOffset);
			}
			xLast = x * scale + xOffset;
			yLast = y * scale + yOffset;
		}
	}

	function stopDrawing() {
		if ( event ) {
			event.end = Date.now() - slideStart;
			if ( event.type == "erase" || event.curve.length > 1 ) {
				// do not save a line with a single point only
				recordEvent( event );
			}
			event = null;
		}
	}


/*****************************************************************
** User interface
******************************************************************/


// TODO: check all touchevents
	document.addEventListener('touchstart', function(evt) {
//console.log("Touch start");
		if ( !readOnly && evt.target.getAttribute('data-chalkboard') == mode ) {
//			var ctx = drawingCanvas[mode].context;
			var scale = drawingCanvas[mode].scale;
			var xOffset = drawingCanvas[mode].xOffset;
			var yOffset = drawingCanvas[mode].yOffset;

			evt.preventDefault();
		        var touch = evt.touches[0];
		        mouseX = touch.pageX;
		        mouseY = touch.pageY;
			startDrawing( (mouseX - xOffset)/scale, (mouseY-yOffset)/scale, false );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'startDrawing', x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale, erase: false };
			document.dispatchEvent( message );
/*
			xLast = mouseX;
			yLast = mouseY;
			event = { type: "draw", begin: Date.now() - slideStart, end: null, curve: [{x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale}] };
*/
			touchTimeout = setTimeout( showSponge, 500, mouseX, mouseY );
		}
	}, passiveSupported ? {passive: false} : false);

	document.addEventListener('touchmove', function(evt) {
//console.log("Touch move");
		clearTimeout( touchTimeout );
		touchTimeout = null;
		if ( event ) {
//			var ctx = drawingCanvas[mode].context;
			var scale = drawingCanvas[mode].scale;
			var xOffset = drawingCanvas[mode].xOffset;
			var yOffset = drawingCanvas[mode].yOffset;

		        var touch = evt.touches[0];
        		mouseX = touch.pageX;
        		mouseY = touch.pageY;
        		if (mouseY < drawingCanvas[mode].height && mouseX < drawingCanvas[mode].width) {
        		    	evt.preventDefault();
				// move sponge
				if ( event.type == "erase" ) {
					drawingCanvas[mode].sponge.style.left = (mouseX - eraser.radius) +"px" ;
					drawingCanvas[mode].sponge.style.top = (mouseY - eraser.radius) +"px" ;
				}
			}

			drawSegment( (mouseX - xOffset)/scale, (mouseY-yOffset)/scale, ( event.type == "erase" ) );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'drawSegment', x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale, erase: ( event.type == "erase" ) };
			document.dispatchEvent( message );
/*
        		if (mouseY < drawingCanvas[mode].height && mouseX < drawingCanvas[mode].width) {
        		    	evt.preventDefault();
				event.curve.push({x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale});
				if ( event.type == "erase" ) {
					drawingCanvas[mode].sponge.style.left = (mouseX - eraser.radius) +"px" ;
					drawingCanvas[mode].sponge.style.top = (mouseY - eraser.radius) +"px" ;
			                eraseWithSponge(ctx, mouseX, mouseY);
				}
				else {
			                draw[mode](ctx, xLast, yLast, mouseX, mouseY);
				}
				xLast = mouseX;
				yLast = mouseY;
			}
*/
		}
	}, false);


	document.addEventListener('touchend', function(evt) {
		clearTimeout( touchTimeout );
		touchTimeout = null;
		// hide sponge image
		drawingCanvas[mode].sponge.style.visibility = "hidden";
		stopDrawing();
		// broadcast
		var message = new CustomEvent('send');
		message.content = { sender: 'chalkboard-plugin', type: 'stopDrawing' };
		document.dispatchEvent( message );
/*
		if ( event ) {
			event.end = Date.now() - slideStart;
			if ( event.type == "erase" || event.curve.length > 1 ) {
				// do not save a line with a single point only
				recordEvent( event );
			}
			event = null;
		}
*/
	}, false);

	document.addEventListener( 'mousedown', function( evt ) {
//console.log("Mouse down");
//console.log( "Read only: " + readOnly );
		if ( !readOnly && evt.target.getAttribute('data-chalkboard') == mode ) {
//console.log( "mousedown: " + evt.button );
//			var ctx = drawingCanvas[mode].context;
			var scale = drawingCanvas[mode].scale;
			var xOffset = drawingCanvas[mode].xOffset;
			var yOffset = drawingCanvas[mode].yOffset;

			mouseX = evt.pageX;
			mouseY = evt.pageY;
			startDrawing( (mouseX - xOffset)/scale, (mouseY-yOffset)/scale, ( evt.button == 2 || evt.button == 1) );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'startDrawing', x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale, erase: ( evt.button == 2 || evt.button == 1) };
			document.dispatchEvent( message );
/*
			xLast = mouseX;
			yLast = mouseY;
			if ( evt.button == 2) {
				event = { type: "erase", begin: Date.now() - slideStart, end: null, curve: [{x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale}]};
				drawingCanvas[mode].canvas.style.cursor = 'url("' + path + 'img/sponge.png") ' + eraser.radius + ' ' + eraser.radius + ', auto';
				eraseWithSponge(ctx,mouseX,mouseY);
			}
			else {
				event = { type: "draw", begin: Date.now() - slideStart, end: null, curve: [{x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale}] };
			}
*/
		}
	} );

	document.addEventListener( 'mousemove', function( evt ) {
//console.log("Mouse move");
		if ( event ) {
//			var ctx = drawingCanvas[mode].context;
			var scale = drawingCanvas[mode].scale;
			var xOffset = drawingCanvas[mode].xOffset;
			var yOffset = drawingCanvas[mode].yOffset;

			mouseX = evt.pageX;
			mouseY = evt.pageY;
			drawSegment( (mouseX - xOffset)/scale, (mouseY-yOffset)/scale, ( event.type == "erase" ) );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'drawSegment', x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale, erase: ( event.type == "erase" ) };
			document.dispatchEvent( message );
/*
			event.curve.push({x: (mouseX - xOffset)/scale, y: (mouseY-yOffset)/scale});
			if(mouseY < drawingCanvas[mode].height && mouseX < drawingCanvas[mode].width) {
				if ( event.type == "erase" ) {
					eraseWithSponge(ctx,mouseX,mouseY);
				}
				else {
					draw[mode](ctx, xLast, yLast, mouseX,mouseY);
				}
				xLast = mouseX;
				yLast = mouseY;
			}
*/
		}
	} );


	document.addEventListener( 'mouseup', function( evt ) {
		drawingCanvas[mode].canvas.style.cursor = pens[mode][color[mode]].cursor;
		if ( event ) {
			stopDrawing();
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'stopDrawing' };
			document.dispatchEvent( message );
/*			if(evt.button == 2){
			}
			event.end = Date.now() - slideStart;
			if ( event.type == "erase" || event.curve.length > 1 ) {
				// do not save a line with a single point only
				recordEvent( event );
			}
			event = null;
*/
		}
	} );


	window.addEventListener( "resize", function() {
//console.log("resize");
		// Resize the canvas and draw everything again
		var timestamp = Date.now() - slideStart;
	        if ( !playback ) {
			timestamp = getSlideDuration();
		}

//console.log( drawingCanvas[0].scale + "/" + drawingCanvas[0].xOffset + "/" +drawingCanvas[0].yOffset );
		for (var id = 0; id < 2; id++ ) {
			drawingCanvas[id].width  = window.innerWidth;
			drawingCanvas[id].height = window.innerHeight;
			drawingCanvas[id].canvas.width  = drawingCanvas[id].width;
			drawingCanvas[id].canvas.height = drawingCanvas[id].height;
			drawingCanvas[id].context.canvas.width  = drawingCanvas[id].width;
			drawingCanvas[id].context.canvas.height = drawingCanvas[id].height;

			drawingCanvas[id].scale = Math.min( drawingCanvas[id].width/storage[id].width, drawingCanvas[id].height/storage[id].height );
			drawingCanvas[id].xOffset = (drawingCanvas[id].width - storage[id].width * drawingCanvas[id].scale)/2;
			drawingCanvas[id].yOffset = (drawingCanvas[id].height - storage[id].height * drawingCanvas[id].scale)/2;
//console.log( drawingCanvas[id].scale + "/" + drawingCanvas[id].xOffset + "/" +drawingCanvas[id].yOffset );
		}
//console.log( window.innerWidth + "/" + window.innerHeight);
		startPlayback( timestamp, mode, true );

	} );

	function updateReadOnlyMode() {
//console.log("updateReadOnlyMode");
		if ( config.readOnly == undefined ) {
			readOnly = ( getSlideDuration() > 0 );
			if ( readOnly ) {
				drawingCanvas[0].container.style.cursor = 'default';
				drawingCanvas[1].container.style.cursor = 'default';
				drawingCanvas[0].canvas.style.cursor = 'default';
				drawingCanvas[1].canvas.style.cursor = 'default';
				if ( notescanvas.style.pointerEvents != "none" ) {
					event = null;
					notescanvas.style.background = 'rgba(0,0,0,0)';
					notescanvas.style.pointerEvents = "none";
				}

			}
			else {
				drawingCanvas[0].container.style.cursor = pens[0][color[0]].cursor;
				drawingCanvas[1].container.style.cursor = pens[1][color[1]].cursor;
				drawingCanvas[0].canvas.style.cursor = pens[0][color[0]].cursor;
				drawingCanvas[1].canvas.style.cursor = pens[1][color[1]].cursor;
			}
		}
	}

	Reveal.addEventListener( 'ready', function( evt ) {
//console.log('ready');
		if ( !printMode ) {
			slideStart = Date.now();
			slideIndices = Reveal.getIndices();
			if ( !playback ) {
				startPlayback( getSlideDuration(), 0 );
			}
			if ( Reveal.isAutoSliding() ) {
				var event = new CustomEvent('startplayback');
				event.timestamp = 0;
				document.dispatchEvent( event );
			}
			updateReadOnlyMode();
		}
		else {
console.log("Create printout when ready");
			whenReady( createPrintout );
		}
	});
	Reveal.addEventListener( 'slidechanged', function( evt ) {
//		clearTimeout( slidechangeTimeout );
//console.log('slidechanged');
		if ( !printMode ) {
			slideStart = Date.now();
			slideIndices = Reveal.getIndices();
			closeChalkboard();
			clearCanvas( 0 );
			clearCanvas( 1 );
			if ( !playback ) {
				slidechangeTimeout = setTimeout( startPlayback, transition, getSlideDuration(), 0 );
			}
			if ( Reveal.isAutoSliding() ) {
				var event = new CustomEvent('startplayback');
				event.timestamp = 0;
				document.dispatchEvent( event );
			}

			updateReadOnlyMode();
		}
	});
	Reveal.addEventListener( 'fragmentshown', function( evt ) {
//		clearTimeout( slidechangeTimeout );
//console.log('fragmentshown');
		if ( !printMode ) {
			slideStart = Date.now();
			slideIndices = Reveal.getIndices();
			closeChalkboard();
			clearCanvas( 0 );
			clearCanvas( 1 );
			if ( Reveal.isAutoSliding() ) {
				var event = new CustomEvent('startplayback');
				event.timestamp = 0;
				document.dispatchEvent( event );
			}
			else if ( !playback ) {
				//
				startPlayback( getSlideDuration(), 0 );
//				closeChalkboard();
			}
			updateReadOnlyMode();
		}
	});
	Reveal.addEventListener( 'fragmenthidden', function( evt ) {
//		clearTimeout( slidechangeTimeout );
//console.log('fragmenthidden');
		if ( !printMode ) {
			slideStart = Date.now();
			slideIndices = Reveal.getIndices();
			closeChalkboard();
			clearCanvas( 0 );
			clearCanvas( 1 );
			if ( Reveal.isAutoSliding() ) {
				document.dispatchEvent( new CustomEvent('stopplayback') );
			}
			else if ( !playback ) {
				startPlayback( getSlideDuration() );
				closeChalkboard();
			}
			updateReadOnlyMode();
		}
	});

	Reveal.addEventListener( 'autoslideresumed', function( evt ) {
//console.log('autoslideresumed');
		var event = new CustomEvent('startplayback');
		event.timestamp = 0;
		document.dispatchEvent( event );
	});
	Reveal.addEventListener( 'autoslidepaused', function( evt ) {
//console.log('autoslidepaused');
		document.dispatchEvent( new CustomEvent('stopplayback') );

		// advance to end of slide
//		closeChalkboard();
		startPlayback( getSlideDuration(), 0 );
	});

	function toggleNotesCanvas() {
		if ( !readOnly ) {
			if ( mode == 1 ) {
				toggleChalkboard();
				notescanvas.style.background = background[0]; //'rgba(255,0,0,0.5)';
				notescanvas.style.pointerEvents = "auto";
			}
			else {
				if ( notescanvas.style.pointerEvents != "none" ) {
					event = null;
					notescanvas.style.background = 'rgba(0,0,0,0)';
					notescanvas.style.pointerEvents = "none";
				}
				else {
					setColor(0);
					recordEvent( { type:"setcolor", index: 0, begin: Date.now() - slideStart } );
					if (color[mode]) {
						let idx = color[mode];
						setColor(idx);
						recordEvent( { type:"setcolor", index: idx, begin: Date.now() - slideStart } );
					} else {
						color[mode] = 0;
					}
					notescanvas.style.background = background[0]; //'rgba(255,0,0,0.5)';
					notescanvas.style.pointerEvents = "auto";
				}
			}
		}
	};

	function toggleChalkboard() {
//console.log("toggleChalkboard " + mode);
		if ( mode == 1 ) {
			event = null;
			if ( !readOnly ) {
				recordEvent( { type:"close", begin: Date.now() - slideStart } );
			}
			closeChalkboard();
		}
		else {
			showChalkboard();
			if ( !readOnly ) {
				recordEvent( { type:"open", begin: Date.now() - slideStart } );
				setColor(0);
				recordEvent( { type:"setcolor", index: 0, begin: Date.now() - slideStart } );
				if (rememberColor[mode]) {
					let idx = color[mode];
					setColor(idx);
					recordEvent( { type:"setcolor", index: idx, begin: Date.now() - slideStart } );
				} else {
					color[mode] = 0;
				}
			}
		}
	};

	function clear() {
		if ( !readOnly ) {
			recordEvent( { type:"clear", begin: Date.now() - slideStart } );
			clearCanvas( mode );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'clear' };
			document.dispatchEvent( message );
		}
	};

	function colorNext() {
		if ( !readOnly ) {
			let idx = cycleColorNext();
			setColor(idx);
			recordEvent( { type: "setcolor", index: idx, begin: Date.now() - slideStart } );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'setcolor', index: idx };
			document.dispatchEvent( message );
		}
	}

	function colorPrev() {
		if ( !readOnly ) {
			let idx = cycleColorPrev();
			setColor(idx);
			recordEvent( { type: "setcolor", index: idx, begin: Date.now() - slideStart } );
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'setcolor', index: idx };
			document.dispatchEvent( message );
		}
	}

	function resetSlide( force ) {
		var ok = force || confirm("Please confirm to delete chalkboard drawings on this slide!");
		if ( ok ) {
//console.log("resetSlide ");
			stopPlayback();
			slideStart = Date.now();
			event = null;
			closeChalkboard();

			clearCanvas( 0 );
			clearCanvas( 1 );

			mode = 1;
			var slideData = getSlideData();
			slideData.duration = 0;
			slideData.events = [];
			mode = 0;
			var slideData = getSlideData();
			slideData.duration = 0;
			slideData.events = [];

			updateReadOnlyMode();
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'resetSlide' };
			document.dispatchEvent( message );
		}
	};

	function resetStorage( force ) {
		var ok = force || confirm("Please confirm to delete all chalkboard drawings!");
		if ( ok ) {
			stopPlayback();
			slideStart = Date.now();
			clearCanvas( 0 );
			clearCanvas( 1 );
			if ( mode == 1 ) {
				event = null;
				closeChalkboard();
			}
			storage = [
					{ width: drawingCanvas[0].width - 2 * drawingCanvas[0].xOffset, height: drawingCanvas[0].height - 2 * drawingCanvas[0].yOffset, data: []},
					{ width: drawingCanvas[1].width, height: drawingCanvas[1].height, data: []}
				];

			updateReadOnlyMode();
			// broadcast
			var message = new CustomEvent('send');
			message.content = { sender: 'chalkboard-plugin', type: 'init', storage: storage, mode: mode };
			document.dispatchEvent( message );
		}
	};


/*
	this.drawWithBoardmarker = drawWithBoardmarker;
	this.drawWithChalk = drawWithChalk;
	this.startRecording = startRecording;
*/
	this.toggleNotesCanvas = toggleNotesCanvas;
	this.toggleChalkboard = toggleChalkboard;
	this.colorNext = colorNext;
	this.colorPrev = colorPrev;
	this.clear = clear;
	this.reset = resetSlide;
	this.resetAll = resetStorage;
	this.download = downloadData;
	this.configure = configure;


	for (var key in keyBindings) {
		if ( keyBindings[key] ) {
			Reveal.addKeyBinding( keyBindings[key], RevealChalkboard[key] );
		}
	};

	return this;
};
