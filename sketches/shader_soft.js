new p5((p) => {
  let img;
  let originalImg;
  let shaderProgram;
  let currentEffect = 'vignette';
  let toggleButton;
  let intervalSlider;
  let intervalId; // Variable para almacenar el ID del intervalo

  let vertices = [];
  let interval = 1000;

  function preload() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/vignette.frag');
  };

  function setup() {
    p.createCanvas(400, 400, p.WEBGL);
    p.noLoop();

    toggleButton = p.createButton('Cambiar imagen y efecto');
    toggleButton.mousePressed(changeImageAndEffect);

    intervalSlider = p.createSlider(1, 1000, interval, 10);
    intervalSlider.input(changeInterval);

    intervalId = setInterval(changeVertexValues, interval);

    // Inicializa los vértices del dibujo con valores aleatorios
    for (let i = 0; i < 4; i++) {
      vertices.push([p.random(-1, 1), p.random(-1, 1)]);
    }
    
    originalImg = p.createImg('');
  };

  function loadImageAndApplyEffect() {
    let randomNum = Math.floor(p.random(0, 40));
    let imagePath = '/showcase/sketches/historical_img/' + String(randomNum) + '.jpg';

    p.loadImage(imagePath, function(loadedImg) {
      img = loadedImg;
      originalImg.elt.src = imagePath; // Establece la ruta de la imagen original
      originalImg.size(200, 200); // Establece el tamaño de la imagen original
      p.background(255);
      p.redraw();
    });
  }

  function applyVignetteEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/vignette.frag');
    currentEffect = 'vignette';
  }

  function applyUnfocusEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/unfocus.frag');
    currentEffect = 'unfocus';
  }

  function applyZoomEffect() {
    shaderProgram = p.loadShader('/showcase/sketches/post_shaders/shader_v_p.vert', '/showcase/sketches/post_shaders/zoom.frag');
    currentEffect = 'zoom';
  }

   function draw()  {
    if (!img) return;

    p.shader(shaderProgram);
    shaderProgram.setUniform('u_texture', img);

    if (currentEffect === 'vignette') {
      shaderProgram.setUniform('u_radius', 0.5);
      shaderProgram.setUniform('u_softness', 0.2);
    } else if (currentEffect === 'unfocus') {
      shaderProgram.setUniform('u_blurAmount', 0.02);
    } else if (currentEffect === 'zoom') {
      shaderProgram.setUniform('u_zoomAmount', 1.5);
    }

    p.beginShape();
    for (let i = 0; i < 4; i++) {
      let vertexData = vertices[i];
      p.vertex(vertexData[0], vertexData[1], i % 2, p.floor(i / 2));
    }
    p.endShape(p.CLOSE);
  };

  function changeImageAndEffect() {
    loadImageAndApplyEffect();

    if (currentEffect === 'vignette') {
      applyUnfocusEffect();
    } else if (currentEffect === 'unfocus') {
      applyZoomEffect();
    } else {
      applyVignetteEffect();
    }
  }

  function changeVertexValues() {
    // Genera nuevos valores aleatorios para los vértices
    for (let i = 0; i < 4; i++) {
      vertices[i] = [p.random(-1, 1), p.random(-1, 1)];
    }

    p.redraw(); // Vuelve a dibujar la escena con los nuevos valores
  }

  function changeInterval() {
    // Cambia el intervalo del setInterval
    interval = intervalSlider.value();
    clearInterval(intervalId); // Cancela el intervalo actual utilizando el ID almacenado
    intervalId = setInterval(changeVertexValues, interval); // Establece el nuevo intervalo
  }

  loadImageAndApplyEffect();

 
  p.setup = setup;
  p.draw = draw;
  p.loadImageAndApplyEffect = loadImageAndApplyEffect;
  p.changeInterval = changeInterval;
  p.changeVertexValues = changeVertexValues;
  p.changeImageAndEffect = changeImageAndEffect;
  p.preload = preload;

}, "shader_soft");
