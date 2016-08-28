import processing.sound.*;

PFont f;
int brainDamageAccessNumber = 0;

boolean shouldZoom = false;
boolean recording = false;
float automaticZoomAmount = 1.15;

boolean visualizeSong = false;
boolean analyzingMusic = visualizeSong;
String songName = "test.mp3";
float[] musicAmplitudes;
int amplitudesCount = 0;
SoundFile songFile;
Amplitude amp;
MandelbrotGenerator generator;

Gradient myGradient = new Gradient("blueYellow");

int width = 500;
int height = 500;

// Start at negative half the width and height
double xmin = -2;
double xmax = 0;

double ymin = -1;
double ymax = 1;

float zoomTotal = 100;

// Maximum number of iterations for each point on the complex plane
int maxiterations = 500;

// Calculate amount we increment x,y for each pixel
double dx = (xmax - xmin) / (width);
double dy = (ymax - ymin) / (height);


void setup() {
  size(500, 500);  
  background(255);

  // Make sure we can write to the pixels[] array.
  loadPixels();
  
  generator = new MandelbrotGenerator();
  
  f = createFont("Arial",16,true);
  
  // want to start a music analyzer that plays through song and records amps 
  if(visualizeSong){
    songFile = new SoundFile(this, songName);
    songFile.play();

    musicAmplitudes = new float[(int)(songFile.duration() * 30)+100];

    amp = new Amplitude(this);
    amp.input(songFile);
    println("song length: ", songFile.duration());
    frameRate(30); // always set frame rate to 30, then zoom amount can vary 
    loop();
  }
  noLoop();
}

void mousePressed() {
  shouldZoom = false;
  double zoomAmount = 1.5;
  if (mouseButton == RIGHT){
    zoom(zoomAmount, mapDoubles(mouseX, 0, width, xmin, xmax), mapDoubles(mouseY, 0, height, ymin, ymax)); 
  }
  if(mouseButton == LEFT){
    maxiterations = (int)((float)maxiterations * zoomAmount);
    println("iterations: ", maxiterations);
  }
  draw();
}

void keyPressed() {
  if (key == CODED) {
    if (keyCode == UP) {
      myGradient.rotateGradient(10);
    }
    if(keyCode == DOWN){
      myGradient.rotateGradient(-10);      
    }
  }
}

void zoom(double zoomAmount, double clickedX, double clickedY){
  zoomTotal *= zoomAmount;

  println("clicked: ", clickedX, clickedY);
  double currentZoomX = xmax - xmin;
  double currentZoomY = ymax - ymin;
  xmin = clickedX - ((currentZoomX / zoomAmount)/2);
  xmax = clickedX + ((currentZoomX / zoomAmount)/2);

  ymin = clickedY - ((currentZoomY / zoomAmount)/2);
  ymax = clickedY + ((currentZoomY / zoomAmount)/2);

  dx = (xmax - xmin) / (width);
  dy = (ymax - ymin) / (height);
}


void draw() {

  generator.drawPotential();
  updatePixels();

  if(recording == true){
    saveFrame("mandelbrotPinkFloydTest1015WithBrainDamage-######.png");
  }

  if(shouldZoom){
    zoom(automaticZoomAmount, -0.7438443661401587, -0.13518123510766825);
//    int rotationAmount = (int)((brainDamageData[brainDamageAccessNumber] / maxBrainDamageData)*20);
//    println("rotation Amount: ", (brainDamageData[brainDamageAccessNumber] / maxBrainDamageData)*20);//// seems to be 1.3 to 9.0ish
//    floydGradient.rotateGradient(rotationAmount);
//    maxiterations = (int)((float)maxiterations * 1.10);
    //maxiterations = (xmax-xmin);
    println("max iterations: ", maxiterations);
    brainDamageAccessNumber += 1;
  }
}

void showBounds(){
    //textFont(f,16);
  text("[" + str((float)xmin) + "," + str((float)xmax) + "]",10,20); 
}

double mapDoubles(double value, double istart, double istop, double ostart, double ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

void delay(int delay){
  int time = millis();
  while(millis() - time <= delay);
}