var BtnStates = pc.createScript('btnStates');

BtnStates.attributes.add('hoverAsset', {
    type:'asset',
    assetType:'texture'
});

BtnStates.attributes.add('activeAsset', {
    type:'asset',
    assetType:'texture'
});

// initialize code called once per entity
BtnStates.prototype.initialize = function() {
    // Get the original button texture
    this.originalTexture = this.entity.element.textureAsset;
        
    // Whether the element is currently hovered or not
    this.hovered = false;
                
    // mouse events
    this.entity.element.on('mouseenter', this.onEnter, this);
    this.entity.element.on('mousedown', this.onPress, this);
    this.entity.element.on('mouseup', this.onRelease, this);
    this.entity.element.on('mouseleave', this.onLeave, this);    
    
    // touch events
    this.entity.element.on('touchstart', this.onPress, this);
    this.entity.element.on('touchend', this.onRelease, this);
};


// When the cursor enters the element assign the hovered texture
BtnStates.prototype.onEnter = function (event) {  
    this.hovered = true;
    event.element.textureAsset = this.hoverAsset;
    
    // set our cursor to a pointer
    document.body.style.cursor = 'pointer';
};

// When the cursor leaves the element assign the original texture
BtnStates.prototype.onLeave = function (event) {   
    this.hovered = false;
    event.element.textureAsset = this.originalTexture;
    
    // go back to default cursor
    document.body.style.cursor = 'default';
};

// When we press the element assign the active texture
BtnStates.prototype.onPress = function (event) { 
    this.app.root.findByName("2D Screen").enabled = false;
    event.element.textureAsset = this.activeAsset;
    
    if (event.element.entity.name == "btn-fps"){
        console.log("fps clicked");
        this.app.root.findByName("RaycastCameraClip").setLocalPosition(0, 0.375, 0.29);

    }else if (event.element.entity.name == "btn-3rd"){
        console.log("3rd clicked");
        this.app.root.findByName("RaycastCameraClip").setLocalPosition(0, 0.45, 1.5);

    }
};

// When we release the element assign the original texture if 
// we are not hovering or the hover texture if we are still hovering
BtnStates.prototype.onRelease = function (event) {   
    event.element.textureAsset = this.hovered ? this.hoverAsset : this.originalTexture;
};
