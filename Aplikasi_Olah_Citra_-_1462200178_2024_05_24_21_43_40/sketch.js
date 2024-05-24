let originalImg;
let sepiaImg;
let fileInput;
let myInput;
let xSlider, ySlider;
let video;
let captureButton;
let videoVisible = false;

function setup() {
  createCanvas(800, 800);
  
  fileInput = createFileInput(handleFile);
  fileInput.position(10, 400);
  
  video = createCapture(VIDEO);
  video.size(400, 400);
  video.position(0, 0);
  video.hide();

  
  showVideoButton = createButton('Show Video');
  showVideoButton.position(280, 400);
  showVideoButton.size(50,40)
  showVideoButton.mousePressed(toggleVideo);

  
  captureButton = createButton('Save');
  captureButton.position(200, 400);
  captureButton.mousePressed(captureImage);

  let textLabel = createElement('p', 'Masukkan Teks:');
  textLabel.position(80, 435);
  
  myInput = createInput();
  myInput.position(200, 450);
  
  let sepiaButton = createButton('Normal');
  sepiaButton.position(360, 400);
  sepiaButton.mousePressed(normall);
  
  let greyscaleButton = createButton('Sepia');
  greyscaleButton.position(470, 400);
  greyscaleButton.mousePressed(applySepia);
  
  let normalButton = createButton('GrayScale');
  normalButton.position(550, 400);
  normalButton.mousePressed(grayscale);
  
  xSlider = createSlider(400, 750, 410);
  xSlider.position(400, 480);
  let xLabel = createElement('p', 'X :');
  xLabel.position(420, 435);
  xInput = createInput(xSlider.value().toString());
  xInput.position(450, 450);
  xInput.size(40, 20); 
  xInput.attribute('readonly', true);
  
  ySlider = createSlider(20, 400, 30);
  ySlider.position(550, 480);
  let yLabel = createElement('p', 'Y :');
  yLabel.position(570, 435);
  yInput = createInput(ySlider.value().toString());
  yInput.position(600, 450);
  yInput.size(40, 20); 
  yInput.attribute('readonly', true);
  
  xSlider.input(() => xInput.value(xSlider.value().toString()));
  ySlider.input(() => yInput.value(ySlider.value().toString()));
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, function(img) {
      originalImg = img;
      drawImages();
    });
    sepiaImg = null;
  } else {
    alert('Pilih file gambar yang valid!');
  }
}

function captureImage() {
  originalImg = video.get();
  sepiaImg = null;
  drawImages();
}

function toggleVideo() {
  videoVisible = !videoVisible;
  if (videoVisible) {
    video.show();
  } else {
    video.hide();
  }
}

function grayscale() {
  sepiaImg = null;
  if (originalImg) {
    sepiaImg = createImage(originalImg.width, originalImg.height);
    sepiaImg.copy(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, originalImg.width, originalImg.height); 
    sepiaImg.loadPixels();
    for (let i = 0; i < sepiaImg.pixels.length; i += 4) {
      let r = sepiaImg.pixels[i];
      let g = sepiaImg.pixels[i + 1];
      let b = sepiaImg.pixels[i + 2];
      let avg = (r + g + b) / 3;
      sepiaImg.pixels[i] = avg;
      sepiaImg.pixels[i + 1] = avg;
      sepiaImg.pixels[i + 2] = avg;
    }
    sepiaImg.updatePixels();
    drawImages();
  }
}

function applySepia() {
  if (originalImg) {
    sepiaImg = createImage(originalImg.width, originalImg.height);
    sepiaImg.loadPixels();
    originalImg.loadPixels();
    for (let i = 0; i < originalImg.pixels.length; i += 4) {
      let r = originalImg.pixels[i];
      let g = originalImg.pixels[i + 1];
      let b = originalImg.pixels[i + 2];
      sepiaImg.pixels[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
      sepiaImg.pixels[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
      sepiaImg.pixels[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
      sepiaImg.pixels[i + 3] = originalImg.pixels[i + 3];
    }
    sepiaImg.updatePixels();
    drawImages();
  }
}

function normall() {
  sepiaImg=null;
   if (originalImg) {
    sepiaImg = createImage(originalImg.width, originalImg.height);
    sepiaImg.copy(originalImg, 0, 0, originalImg.width, originalImg.height, 0, 0, originalImg.width, originalImg.height);
    sepiaImg.loadPixels();
  }
  sepiaImg.updatePixels();
  drawImages();
}


function drawImages() {
  background(255);
  if (originalImg) {
    // Menampilkan citra asli
    image(originalImg, 0, 0, width / 2, height/2);
    // Menampilkan citra sephia atau grayscale
    if (sepiaImg) {
      image(sepiaImg, width / 2, 0, width / 2, height/2);
    }
  let msg = myInput.value();
  let xPos = xSlider.value();
  let yPos = ySlider.value();
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text(msg, xPos, yPos);
  }
}


