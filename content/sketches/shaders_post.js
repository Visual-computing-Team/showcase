new p5((p) => {
  let img;
  let shaderProgram;
  let currentEffect = 'vignette';
  let toggleButton;
  let canvas;

  //Carga los shaders
  function preload() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/unfocus.frag');
  }

  //Creación del canvas y del botón
  function setup() {
    canvas = p.createCanvas(400, 400, p.WEBGL);
    toggleButton = p.createButton('Cambiar efecto');
    toggleButton.mousePressed(toggleEffect);
    p.noLoop();
  }

  //Carga la imagen y redibuja la imagen con el nuevo efecto 
  function loadImageAndApplyEffect() {
    p.loadImage('https://upload.wikimedia.org/wikipedia/commons/3/30/Shih-Tzu.JPG', function (loadedImg) {
      img = loadedImg;
      p.redraw();
    });
  }

  // Aplica el efecto de viñeta
  function applyVignetteEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/vignette.frag');
    currentEffect = 'vignette';
    loadImageAndApplyEffect();
  }

  // Aplica el efecto de desenfoque
  function applyUnfocusEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/unfocus.frag');
    currentEffect = 'unfocus';
    loadImageAndApplyEffect();
  }

  // Aplica el efecto de zoom
  function applyZoomEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader.vert', '/showcase/sketches/post_shaders/zoom.frag');
    currentEffect = 'zoom';
    loadImageAndApplyEffect();
  }

  // Dibuja la imagen con el efecto seleccionado
  function draw() {
    if (!img) return;

    p.shader(shaderProgram);
    // Envía la imagen al shader
    shaderProgram.setUniform('u_texture', img);

    // Ajusta los valores de los uniformes según el efecto
    if (currentEffect === 'vignette') {
      p.background(255);
      shaderProgram.setUniform('u_radius', 0.5);
      shaderProgram.setUniform('u_softness', 0.2);
    } else if (currentEffect === 'unfocus') {
      shaderProgram.setUniform('u_blurAmount', 0.02);
    } else if (currentEffect === 'zoom') {
      shaderProgram.setUniform('u_zoomAmount', 1.5); // Ajusta el valor de zoom aquí
    }

    // Dibuja un rectángulo que ocupa toda la pantalla
    p.beginShape();
    p.vertex(-1, -1, 0, 0);
    p.vertex(1, -1, 1, 0);
    p.vertex(1, 1, 1, 1);
    p.vertex(-1, 1, 0, 1);
    p.endShape(p.CLOSE);
  }

  // Cambia el efecto activo
  function toggleEffect() {
    if (currentEffect === 'vignette') {
      applyUnfocusEffect();
    } else if (currentEffect === 'unfocus') {
      applyZoomEffect();
    } else {
      applyVignetteEffect();
    }
  }

  p.preload = preload;
  p.setup = setup;
  p.draw = draw;
  p.loadImageAndApplyEffect = loadImageAndApplyEffect;

  loadImageAndApplyEffect();
}, "shaders_post" );