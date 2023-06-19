let blendShader;
let color_1, color_2, brightness;
let modeSelect, mode, identity;

let modeToFileName, modeToIdentity;

function preload() {
    modeToFileName = {
        'Multiply': readShader('/showcase/sketches/blending/multiply.frag', { matrices: Tree.NONE, varyings: Tree.NONE }), 
        'Bright': readShader('/showcase/sketches/blending/brightness.frag', { matrices: Tree.NONE, varyings: Tree.NONE })
    };

    modeToIdentity = {
        'Multiply': [1.0, 1.0, 1.0, 1.0], 
        'Bright': [1.0, 1.0, 1.0, 1.0]
    };
}

function setup() {
    createCanvas(500, 500, WEBGL);
    noStroke();
    colorMode(RGB, 1);

    color_1 = createColorPicker(color(0.149, 0.8, 0.929));
    color_2 = createColorPicker(color(0.898, 0.424, 0.811));
    color_1.position(500/7, 500/7);
    color_2.position(width - 265, 500/7);

    brightness = createSlider(0, 10, 0.5, 0.05);
    brightness.position(width / 2 - 40, 15);
    brightness.style('width', '100px');

    const defaultMode = 'Multiply';

    modeSelect = createSelect();
    modeSelect.position(500/3, height - 30);
    modeSelect.style('width', `${500/3}px`);
    modeSelect.option('Multiply'); 
    modeSelect.option('Bright');
    modeSelect.changed(mySelectEvent);

    // Default shader
    mode = defaultMode;
    blendShader = modeToFileName[mode];
    identity = modeToIdentity[mode];
    shader(blendShader);
}

function mySelectEvent(){
    mode = modeSelect.value();
    blendShader = modeToFileName[mode];
    identity = modeToIdentity[mode];
    shader(blendShader);
}

function draw() {
    let padding = 0.1;
    let width = 0.55;
    let height = 1;

    let picked_color_1 = color_1.color();
    let picked_color_2 = color_2.color();

    background(0);

    // Primer  color a mezclar 
    blendShader.setUniform('uMaterial1', [red(picked_color_1), green(picked_color_1), blue(picked_color_1), 1.0]);
    blendShader.setUniform('uMaterial2', identity);
    blendShader.setUniform('brightness', 1.0);
    
    beginShape();
    vertex(-(width+(width/2) + padding), height/2, 0);
    vertex(-(width/2 + padding), height/2, 0);
    vertex(-(width/2 + padding), -height/2, 0);
    vertex(-(width+(width/2) + padding), -height/2, 0);
    endShape();

    // Segundo color a mezclar
    blendShader.setUniform('uMaterial1', identity);
    blendShader.setUniform('uMaterial2', [red(picked_color_2), green(picked_color_2), blue(picked_color_2), 1.0]);
    blendShader.setUniform('brightness', 1.0);

    beginShape();
    vertex( -(width/2), height/2, 0 );
    vertex( width/2, height/2, 0 );
    vertex( width/2, -height/2, 0 );
    vertex( -(width/2), -height/2, 0 );
    endShape();

    // Tercer color a mezclar
    blendShader.setUniform('uMaterial1', [red(picked_color_1), green(picked_color_1), blue(picked_color_1), 1.0]);
    blendShader.setUniform('uMaterial2', [red(picked_color_2), green(picked_color_2), blue(picked_color_2), 1.0]);
    blendShader.setUniform('brightness', brightness.value());

    beginShape();
    vertex(width/2 + padding, height/2, 0);
    vertex(width/2 + padding + width, height/2, 0);
    vertex(width/2 + padding + width, -height/2, 0);
    vertex(width/2 + padding, -height/2, 0);
    endShape();
   
}