// Create PlayerAnimation Script.
var PlayerAnimation = pc.createScript('PlayerAnimation');

// Define script-scoped variables.
var direction = 'Idle';

// Add attributes to the script.
PlayerAnimation.attributes.add('blendDuration', {
    type: 'number',
    default: 0.25
});

// Initialisation code, runs only once.
PlayerAnimation.prototype.initialize = function() {
    var app = this.app;
    
    // Listeners for key up/down events. Fires a callback function to handle player animations.
    app.keyboard.on(pc.EVENT_KEYDOWN, this._keyChange, this);
    app.keyboard.on(pc.EVENT_KEYUP, this._keyChange, this);
    
    this.setState(direction);
};

// Update code, runs every frame.
PlayerAnimation.prototype.update = function(dt) {
    // Any code that needs to run such as timers for idle time or what not goes in here.
};

// Setter function for player state. Function also serves to change animation on state change. Animation blend duration is set from an attribute.
PlayerAnimation.prototype.setState = function(state) {
    this.state = state;
    this.entity.animation.play(state, this.blendDuration);
};

// Direction logic, different combination of key inputs define different directions.
PlayerAnimation.prototype._checkKey = function() {
    var app = this.app;
    var selectedElem = document.activeElement.tagName;
    if(selectedElem == "CANVAS"){
        if (app.keyboard.isPressed(pc.KEY_W) && app.keyboard.isPressed(pc.KEY_S) === false) {
            if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false) {
                direction = ('Jog Forward Left');
            } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false) {
                direction = ('Jog Forward Right');
            } else {
                direction = ('Jog Forward');
            }
        } else if (app.keyboard.isPressed(pc.KEY_S) && app.keyboard.isPressed(pc.KEY_W) === false) {
            if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false) {
                direction = ('Jog Backward Left');
            } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false) {
                direction = ('Jog Backward Right');
            } else {
                direction = ('Jog Backward');
            }
        } else if (app.keyboard.isPressed(pc.KEY_A) && app.keyboard.isPressed(pc.KEY_D) === false) {
            direction = ('Jog Left');
        } else if (app.keyboard.isPressed(pc.KEY_D) && app.keyboard.isPressed(pc.KEY_A) === false) {
            direction = ('Jog Right');
        } else {
            direction = ('Idle');
        }
    }
};

// Callback function to check if the direction has changed since a key down/up event.
PlayerAnimation.prototype._keyChange = function(e) {
    var previousDirection = direction;
    
    this._checkKey();
    
    if (previousDirection !== direction) {
        this.setState(direction);
    }
};