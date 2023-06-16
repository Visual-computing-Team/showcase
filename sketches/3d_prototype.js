new p5((p) => {

  // Variables globales, posición original del objeto 
  let player = {
    pos: {
      x: 0,
      y: 0,
      z: 0
    },
    state: 'move'
  };

  let keysDown = {
    LR: [0, 0],
    UD: [0, 0],
    v: [0, 0]   // [ sum(LR), sum(UD)]
  };

  let camTheta = 0;
  let camDist = 250;

  let buildings = [];

  // En esta función se crean los objetos 3D con los diferentes parámetros como:
  // x, y, z: posición del objeto
  // width, height, depth: dimensiones del objeto
  p.Building = function(x, y, z, width, height, depth, shape) {
    this.pos = p.createVector(x, y, z);
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.shape = shape;

    this.display = function() {
      p.push();
      p.translate(this.pos.x, this.pos.y);

      if (this.shape === 'cube') {
        p.box(this.width, this.height, this.depth);
      } else if (this.shape === 'cylinder') {
        p.cylinder(this.width / 2, this.height);
      } else if (this.shape === 'sphere') {
        p.sphere(this.width / 2);
      } else if (this.shape === 'cone') {
        p.cone(this.width / 2, this.height);
      }

      p.pop();
    };
  }

  // Se crean los sliders para modificar las dimensiones del objeto 
  let sliders = {
    width: null,
    height: null,
    depth: null
  };

  
  p.setup = function() {
    p.createCanvas(600, 400, p.WEBGL);
    p.camera(0, 500, 500, 0, 0, 0, 0, 0, -1);

    // Configurar los botones
    p.setupButtons();

    // Crear los sliders
    p.createSliders();
  }

  p.draw = function() {
    p.background(220);

    if (p.mouseIsPressed && p.mouseX >= 0 && p.mouseX < p.width && p.mouseY >= 0 && p.mouseY < p.height) {
      camTheta += (p.mouseX - p.pmouseX) / 100;
    }

    p.camera(
      camDist * p.cos(camTheta) + player.pos.x,
      camDist * p.sin(camTheta) + player.pos.y,
      camDist / 1.5 + player.pos.z,
      player.pos.x,
      player.pos.y,
      player.pos.z,
      0, 0, -1
    );

    let vmag = p.dist(0, 0, keysDown.v[0], keysDown.v[1]);
    vmag = vmag > 1 ? 1 : vmag;  // Normalizar vmag a 1

    let vth = p.atan2(keysDown.v[0], keysDown.v[1]);

    player.pos.x -= vmag * p.cos(vth + camTheta);
    player.pos.y -= vmag * p.sin(vth + camTheta);

    // Dibujar los objetos
    for (let i = 0; i < buildings.length; i++) {
      if (buildings[i].shape === 'cube') {
        p.fill('red');
      } else if (buildings[i].shape === 'cylinder') {
        p.fill('green');
      } else if (buildings[i].shape === 'sphere') {
        p.fill('yellow');
      } else if (buildings[i].shape === 'cone') {
        p.fill('orange');
      }
      buildings[i].display();
    }

    // Dibujar al jugador junto con las texturas generales del objeto
    p.fill('blue');
    p.translate(0, 0, 25);
    p.translate(player.pos.x, player.pos.y, player.pos.z);
    p.rotateX(p.PI / 2);
    p.fill(0, 0, 255, 200);
    p.noStroke();
    p.cylinder(20, 50);
  }

  // Movimiento del objeto con las teclas
  p.keyPressed = function() {
    if (p.key === 'w' || p.key === 'W') { // W key
      keysDown.UD[0] = 1;
    }
    if (p.key === 's' || p.key === 'S') { // S key
      keysDown.UD[1] = -1;
    }
    if (p.key === 'a' || p.key === 'A') { // A key
      keysDown.LR[0] = -1;
    }
    if (p.key === 'd' || p.key === 'D') { // D key
      keysDown.LR[1] = 1;
    }

    keysDown.v = [keysDown.LR[0] + keysDown.LR[1], keysDown.UD[0] + keysDown.UD[1]];
  }

  p.keyReleased = function() {
    if (p.key === 'w' || p.key === 'W') { // W key
      keysDown.UD[0] = 0;
    }
    if (p.key === 's' || p.key === 'S') { // S key
      keysDown.UD[1] = 0;
    }
    if (p.key === 'a' || p.key === 'A') { // A key
      keysDown.LR[0] = 0;
    }
    if (p.key === 'd' || p.key === 'D') { // D key
      keysDown.LR[1] = 0;
    }

    keysDown.v = [keysDown.LR[0] + keysDown.LR[1], keysDown.UD[0] + keysDown.UD[1]];
  }

  // Agregar los botones
  p.addButton = function(text, x, y, action) {
    let button = p.createButton(text);
    button.position(x, y);
    button.mousePressed(action);
  }

  p.setupButtons = function() {

    // Botón para colocar esferas
    p.addButton("Esfera", 10,725, function() {
      let width = sliders.width.value();
      let height = sliders.height.value();
      let depth = sliders.depth.value();
      buildings.push(new p.Building(player.pos.x - 50, player.pos.y , player.pos.z, width, height, depth, 'sphere'));
    });

    // Botón para colocar cilindros
    p.addButton("Cilindro", 110, 725, function() {
      let width = sliders.width.value();
      let height = sliders.height.value();
      let depth = sliders.depth.value();
      buildings.push(new p.Building(player.pos.x - 50, player.pos.y , player.pos.z, width, height, depth, 'cylinder'));
    });

    // Botón para colocar cubos
    p.addButton("Cubo", 210, 725, function() {
      let width = sliders.width.value();
      let height = sliders.height.value();
      let depth = sliders.depth.value();
      buildings.push(new p.Building(player.pos.x - 50, player.pos.y, player.pos.z, width, height, depth, 'cube'));
    });

    // Botón para colocar conos
    p.addButton("Cono", 310, 725, function() {
      let width = sliders.width.value();
      let height = sliders.height.value();
      let depth = sliders.depth.value();
      buildings.push(new p.Building(player.pos.x - 50, player.pos.y, player.pos.z, width, height, depth, 'cone'));
    });
  }

  // Crear los sliders
  p.createSliders = function() {
    sliders.width = p.createSlider(50, 200, 100);
    sliders.width.position(10, 785);
  
    sliders.height = p.createSlider(50, 200, 100);
    sliders.height.position(10, 810);
  
    sliders.depth = p.createSlider(50, 200, 100);
    sliders.depth.position(10, 835);
  }
  
}, '3d_prototype');
