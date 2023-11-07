// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/kx-w8WIxe/';

let ball = {
  x: 320,
  y: 240,
  size: 50
};

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  // Other models can be loaded here if needed
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0, 640, 480);

  // Draw the label
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(label, width / 2, height - 16);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
  flippedVideo.remove(); // Dispose the flippedVideo to avoid memory leaks
}

// When we get a result
function gotResults(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  // Classify again!
  classifyVideo();
}

// Add other functions from your previous scripts as needed
