let input;
let img;

function newWH(w, h, m) {
  let S = Math.max(w, h);
  console.log(S);
  return {
    width: (m * w) / S,
    height: (m * h) / S,
  };
}

// Initialize the Image Classifier method with MobileNet
const mobilenet = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function setup() {
  createCanvas(400, 400);
  input = createFileInput(handleFile);
  input.position(0, 0);
}

function draw() {
  background(255);
  if (img) {
    dimensions = newWH(img.width, img.height, width);
    image(img, 10, 10, dimensions.width, dimensions.height);
    // image(img);
  }
  mobilenet.predict(img, (err, results) => {
    createP(results[0].label);
  });
}

function handleFile(file) {
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}
