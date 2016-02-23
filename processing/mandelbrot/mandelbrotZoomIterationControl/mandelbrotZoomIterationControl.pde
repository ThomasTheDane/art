//notes:
//number maxiterations needed is approximately proportional to the zoom

// Establish a range of values on the complex plane
// A different range will allow us to "zoom" in or out on the fractal
PFont f;

boolean shouldZoom = false;
float zoomTotal = 100;
boolean recording = false;

int width = 500;
int height = 500;

float w = 4;
float h = (w * width) / height;

// Start at negative half the width and height
double xmin = -2;
double xmax = 0;

double ymin = -1;
double ymax = 1;

// Maximum number of iterations for each point on the complex plane
int maxiterations = 100;

// Calculate amount we increment x,y for each pixel
double dx = (xmax - xmin) / (width);
double dy = (ymax - ymin) / (height);

int[] histogram;
int[][] iterationsNeeded;

void setup() {
  size(500, 500);
  //noLoop();
  background(255);

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();
  
  f = createFont("Arial",16,true);
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
   println(zoomTotal/maxiterations);
  draw();
}

void zoom(double zoomAmount, double clickedX, double clickedY){
  zoomTotal *= zoomAmount;
 // double clickedX = mapDoubles(xLocation, 0, width, xmin, xmax);
 // double clickedY = mapDoubles(yLocation, 0, height, ymin, ymax);

  println("clicked: ", clickedX, clickedY);
  double currentZoomX = xmax - xmin;
  double currentZoomY = ymax - ymin;
  xmin = clickedX - ((currentZoomX / zoomAmount)/2);
  xmax = clickedX + ((currentZoomX / zoomAmount)/2);

  ymin = clickedY - ((currentZoomY / zoomAmount)/2);
  ymax = clickedY + ((currentZoomY / zoomAmount)/2);

  dx = (xmax - xmin) / (width);
  dy = (ymax - ymin) / (height);

  //maxiterations = maxiterations * (int)zoomAmount;

  //draw();
}

void draw() {
  iterationsNeeded = new int[width+1][height+1];
  histogram = new int[maxiterations+1];

  // Start y
  double y = ymin;
  for (int j = 0; j < height; j++) {
    // Start x
    double x = xmin;
    for (int i = 0; i < width; i++) {
      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      double a = 0 + x;
      double b = 0 + y;
      int n = 0;
      while (n < maxiterations) {
        double aa = a * a;
        double bb = b * b;
        double twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        // Infinty in our finite world is simple, let's just consider it 16
        if (aa + bb > 16.0) {
          break;  // Bail
        }
        n++;
      }

      // store how often we see each n
      histogram[n] = histogram[n] + 1;
      iterationsNeeded[i][j] = n;
      
      x += dx;
    }
    y += dy;
  }
  float total = 0;
  for (int i = 0; i <= maxiterations; i++) {
    total += histogram[i];
  }
  
  colorMode(HSB, 1000, 1000, 1000);
  
  for (int j = 0; j < height; j++) {
    for (int i = 0; i < width; i++) {
      float hue = 0.0;      
      if(iterationsNeeded[i][j] == maxiterations){
        pixels[i+j*width] = color(0, 1000, 0);
      }else{
        for(int k = 0; k < iterationsNeeded[i][j]; k++){
          hue += histogram[k] / total;
        }
        hue = hue * 1000;
        hue = hue % 1000;
        pixels[i+j*width] = color(hue, 1000, 1000);
      }
    }
  }
  
  //pixels[i+j*width] = getGradient(n);

  updatePixels();
  
  //textFont(f,16);
  text("[" + str((float)xmin) + "," + str((float)xmax) + "]",10,20); 
  if(recording == true){
    saveFrame("mandelbrot-######.png");
  }

  if(shouldZoom){
    zoom(1.03, -0.8559638261803335, -0.2335121184570441);

  }
}

double mapDoubles(double value, double istart, double istop, double ostart, double ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

void delay(int delay){
  int time = millis();
  while(millis() - time <= delay);
}