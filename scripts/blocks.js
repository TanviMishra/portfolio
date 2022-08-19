// Get the root element
let rootElement = document.querySelector(":root");
let accent, highlight, text, bg;
let textureArray = [
  "./assets/icons/PNG/blocks.png",
  "./assets/icons/PNG/blocks2.png",
];
// Create a function for getting a variable value
function cssVariables() {
  let rootElementStyle = getComputedStyle(rootElement); // Get the styles (properties and values) for the root
  accent = rootElementStyle.getPropertyValue("--accent");
  highlight = rootElementStyle.getPropertyValue("--highlight");
  text = rootElementStyle.getPropertyValue("--text");
  bg = rootElementStyle.getPropertyValue("--bg");
}
cssVariables();
const shapesSelector = document.querySelector("section.shapes");
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

const sh = window.innerHeight,
  sw = window.innerWidth;

console.log(Engine);

var engine = Engine.create();
engine.world.gravity.y = 1;
engine.timing.timeScale = 0.5;
engine.velocityIterations = 20;

var render = Render.create({
  element: shapesSelector,
  engine: engine,
  options: {
    width: sw,
    height: sh,
    wireframes: false,
  },
});

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

var mouseDown = false;
addEventListener("mousedown", function () {
  mouseDown = true;
  addRect();
});
addEventListener("mouseup", function () {
  mouseDown = false;
});

function addRect() {
  var ballA = Bodies.rectangle(mouse.x, mouse.y, 30, 30, {
    render: {
      sprite: {
        texture: textureArray[Math.floor(Math.random() * 2)],
      },
      // fillStyle: accent,
      // strokeStyle: bg,
      // lineWidth: 0.5,
    },
  });
  World.add(engine.world, ballA, {
    friction: 0,
    restitution: 1,
    frictionAir: 0,
  });

  if (mouseDown) {
    setTimeout(function () {
      addRect();
    }, 100);
  }
}

var ground = Bodies.rectangle(sw / 2, sh + 50, sw + 100, 100, {
  isStatic: true,
});
var ceiling = Bodies.rectangle(sw / 2, -50, sw, 100, { isStatic: true });
var wallA = Bodies.rectangle(-50, 0, 100, sh * 2, { isStatic: true });
var wallB = Bodies.rectangle(sw + 50, 0, 100, sh * 2, { isStatic: true });

var boxes = [];

let stack = Matter.Composites.stack(
  200,
  sh - 600,
  20,
  30,
  0,
  0,
  function (x, y) {
    return Matter.Bodies.rectangle(x, y, 20, 20, {
      friction: 0,
      restitution: 1,
      frictionAir: 0,
    });
  }
);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: true },
  },
});
render.mouse = mouse;

World.add(engine.world, [ground, mouseConstraint, ceiling, wallA, wallB]);

Engine.run(engine);
Render.run(render);
