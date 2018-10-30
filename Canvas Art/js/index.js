var canvas = document.getElementById("scene");
var ctx = canvas.getContext("2d");
var particles = [];

function drawScene() {
  canvas.width = png.width * 3;
  canvas.height = png.height * 3;
  ctx.drawImage(png, 0, 0);
  var my_gradient = ctx.createLinearGradient(0, 170, 170, 0);
  my_gradient.addColorStop(0, "red");
  my_gradient.addColorStop(0.3, "orange");
  my_gradient.addColorStop(0.5, "yellow");
  my_gradient.addColorStop(0.7, "green");
  my_gradient.addColorStop(0.9, "blue");
  ctx.fillStyle = my_gradient;
  my_gradient.addColorStop(1, "purple");

  ctx.fillStyle = my_gradient;
  var data = ctx.getImageData(0, 0, png.width, png.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var y = 0, y2 = data.height; y < y2; y++) {
    for (var x = 0, x2 = data.width; x < x2; x++) {
      var p = y * 4 * data.width + x * 4;
      if (data.data[p + 3] > 129) {
        var particle = {
          x0: x,
          y0: y,
          x1: png.width / 2,
          y1: png.height / 2,
          speed: Math.random() * 4 + 2,
          color:
            "rgb(" +
            data.data[p] +
            "," +
            data.data[p + 1] +
            "," +
            data.data[p + 2] +
            ")"
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 30,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }
  requestAnimationFrame(render);
}
var render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    //uncomment if you want to use image colors instead of gradient
    //ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x1 * 3, particle.y1 * 3, 2, 2);
  }
  requestAnimationFrame(render);
};

var clearFrame = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  drawScene();
};

var png = new Image();
png.onload = drawScene;
png.src =
  "data:image/png;base64,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";