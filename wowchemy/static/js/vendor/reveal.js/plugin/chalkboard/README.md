# Chalkboard

With this plugin you can add a chalkboard to reveal.js. The plugin provides two possibilities to include handwritten notes to your presentation:

- you can make notes directly on the slides, e.g. to comment on certain aspects,
- you can open a chalkboard or whiteboard on which you can make notes.

The main use case in mind when implementing the plugin is classroom usage in which you may want to explain some course content and quickly need to make some notes.

The plugin records all drawings made so that they can be play backed using the ```autoSlide``` feature or the ```audio-slideshow``` plugin.

[Check out the live demo](https://rajgoel.github.io/reveal.js-demos/chalkboard-demo.html)

The chalkboard effect is based on [Chalkboard](https://github.com/mmoustafa/Chalkboard) by Mohamed Moustafa.

Multi color support added by Kurt Rinnert [GitHub](https://github.com/rinnert).

## Installation

Copy the file ```plugin.js``` and the  ```img``` directory into the plugin folder of your reveal.js presentation, i.e. ```plugin/chalkboard``` and load the plugin as shown below.

```html
<script src="plugin/chalkboard/plugin.js"></script>

<script>
    Reveal.initialize({
        // ...
        plugins: [ RevealChalkboard ],
        // ...
    });
</script>
```

In order to include buttons for opening and closing the notes canvas or the chalkboard you should make sure that ```font-awesome``` is available. The easiest way is to include
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```
to the ```head``` section of you HTML-file.

## Usage

### Enable & disable

With above configuration the notes canvas is opened and closed when pressing 'c' and the chalkboard is opened and closed when pressing 'b'.

### Mouse
- Click the left mouse button and drag to write on notes canvas or chalkboard
- Click the right mouse button and drag to wipe away previous drawings

### Touch
- Touch and move to write on notes canvas or chalkboard
- Touch and hold for half a second, then move to wipe away previous drawings

### Keyboard
- Press the 'DEL' key to clear the chalkboard
- Press the 'd' key to download chalkboard drawings
- Press the 'BACKSPACE' key to delete all chalkboard drawings on the current slide
- Press the 'x' key to cycle colors forward
- Press the 'y' key to cycle colors backward

## Playback

If the ```autoSlide``` feature is set or if the ```audio-slideshow``` plugin is used, pre-recorded chalkboard drawings can be played. The slideshow plays back the user interaction with the chalkboard in the same way as it was conducted when recording the data.

## PDF-Export

If the slideshow is opened in [print mode](https://github.com/hakimel/reveal.js/#pdf-export) the pre-recorded chalkboard drawings (which must be provided in a file, see ```src``` option) are included in the PDF-file. Each drawing on the chalkboard is added after the slide that was shown when opening the chalkboard. Drawings are also included if they had been cleared (using the 'DEL' key). Drawings on the notes canvas are not included in the PDF-file.


## Configuration

The plugin has several configuration options:

- ```boardmarkerWidth```: an integer, the drawing width of the boardmarker; larger values draw thicker lines.
- ```chalkWidth```: an integer, the drawing width of the chalk; larger values draw thicker lines.
- ```chalkEffect```: a float in the range ```[0.0, 1.0]```, the intesity of the chalk effect on the chalk board. Full effect (default) ```1.0```, no effect ```0.0```.
- ```src```: Optional filename for pre-recorded drawings.
- ```readOnly```: Configuation option allowing to prevent changes to existing drawings. If set to ```true``` no changes can be made, if set to false ```false``` changes can be made, if unset or set to ```undefined``` no changes to the drawings can be made after returning to a slide or fragment for which drawings had been recorded before. In any case the recorded drawings for a slide or fragment can be cleared by pressing the 'DEL' key (i.e. by using the ```RevealChalkboard.clear()``` function).
- ```toggleNotesButton```: If set to ```true``` a button for opening and closing the notes canvas is shown. Alternatively, the css position attributes can be provided if the default position is not appropriate.
- ```toggleChalkboardButton```: If set to ```true``` a button for opening and closing the chalkboard is shown. Alternatively, the css position attributes can be provided if the default position is not appropriate.
- ```transition```: Gives the duration (in milliseconds) of the transition for a slide change, so that the notes canvas is drawn after the transition is completed.
- ```theme```: Can be set to either ```"chalkboard"``` or ```"whiteboard"```.

The following configuration options allow to change the appearance of the notes canvas and the chalkboard. All of these options require two values, the first gives the value for the notes canvas, the second for the chalkboard.

- ```background```: The first value expects a (semi-)transparent color which is used to provide visual feedback that the notes canvas is enabled, the second value expects a filename to a background image for the chalkboard.
- ```grid```: By default whiteboard and chalkboard themes include a grid pattern on the background. This pattern can be modified by setting the color, the distance between lines, and the line width, e.g. ```{ color: 'rgb(127,127,255,0.1)', distance: 40, width: 2}```. Alternatively, the grid can be removed by setting the value to ```false```.
- ```eraser```: An image path and radius for the eraser.
- ```boardmarkers```: A list of boardmarkers with given color and cursor.
- ```chalks```: A list of chalks with given color and cursor.
- ```rememberColor```: Whether to remember the last selected color for the slide canvas or the board.

All of the configurations are optional and the default values shown below are used if the options are not provided.

```javascript
Reveal.initialize({
	// ...
    chalkboard: {
        boardmarkerWidth: 3,
        chalkWidth: 7,
        chalkEffect: 1.0,
        src: null,
        readOnly: undefined,
        toggleChalkboardButton: { left: "30px", bottom: "30px", top: "auto", right: "auto" },
        toggleNotesButton: { left: "30px", bottom: "30px", top: "auto", right: "auto" },
        transition: 800,
        theme: "chalkboard",
        background: [ 'rgba(127,127,127,.1)' , path + 'img/blackboard.png' ],
        grid: { color: 'rgb(50,50,10,0.5)', distance: 80, width: 2},
        eraser: { src: path + 'img/sponge.png', radius: 20},
        boardmarkers : [
                { color: 'rgba(100,100,100,1)', cursor: 'url(' + path + 'img/boardmarker-black.png), auto'},
                { color: 'rgba(30,144,255, 1)', cursor: 'url(' + path + 'img/boardmarker-blue.png), auto'},
                { color: 'rgba(220,20,60,1)', cursor: 'url(' + path + 'img/boardmarker-red.png), auto'},
                { color: 'rgba(50,205,50,1)', cursor: 'url(' + path + 'img/boardmarker-green.png), auto'},
                { color: 'rgba(255,140,0,1)', cursor: 'url(' + path + 'img/boardmarker-orange.png), auto'},
                { color: 'rgba(150,0,20150,1)', cursor: 'url(' + path + 'img/boardmarker-purple.png), auto'},
                { color: 'rgba(255,220,0,1)', cursor: 'url(' + path + 'img/boardmarker-yellow.png), auto'}
        ],
        chalks: [
                { color: 'rgba(255,255,255,0.5)', cursor: 'url(' + path + 'img/chalk-white.png), auto'},
                { color: 'rgba(96, 154, 244, 0.5)', cursor: 'url(' + path + 'img/chalk-blue.png), auto'},
                { color: 'rgba(237, 20, 28, 0.5)', cursor: 'url(' + path + 'img/chalk-red.png), auto'},
                { color: 'rgba(20, 237, 28, 0.5)', cursor: 'url(' + path + 'img/chalk-green.png), auto'},
                { color: 'rgba(220, 133, 41, 0.5)', cursor: 'url(' + path + 'img/chalk-orange.png), auto'},
                { color: 'rgba(220,0,220,0.5)', cursor: 'url(' + path + 'img/chalk-purple.png), auto'},
                { color: 'rgba(255,220,0,0.5)', cursor: 'url(' + path + 'img/chalk-yellow.png), auto'}
        ]
    },
    // ...

});
```


## License

MIT licensed

Copyright (C) 2020 Asvin Goel
