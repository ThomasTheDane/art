//notes:
//number maxiterations needed is approximately proportional to the zoom

// Establish a range of values on the complex plane
// A different range will allow us to "zoom" in or out on the fractal
PFont f;

boolean shouldZoom = false;
boolean recording = false;

float max = 0;

int width = 500;
int height = 500;

float zoomTotal = 100;
float w = 4;
float h = (w * width) / height;

// Start at negative half the width and height
double xmin = -2;
double xmax = 0;

double ymin = -1;
double ymax = 1;

// Maximum number of iterations for each point on the complex plane
int maxiterations = 200;

// Calculate amount we increment x,y for each pixel
double dx = (xmax - xmin) / (width);
double dy = (ymax - ymin) / (height);

int[] histogram;
int[][] iterationsNeeded;

void setup() {
  size(500, 500);
  if(!shouldZoom){
    noLoop();
  }
  background(255);

  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();
  
  f = createFont("Arial",16,true);
  
  colorMode(HSB, 1000, 1000, 1000);
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
  if(shouldZoom){
    maxiterations = (int)((float)maxiterations * zoomAmount);
  }

  double currentZoomX = xmax - xmin;
  double currentZoomY = ymax - ymin;
  xmin = clickedX - ((currentZoomX / zoomAmount)/2);
  xmax = clickedX + ((currentZoomX / zoomAmount)/2);

  ymin = clickedY - ((currentZoomY / zoomAmount)/2);
  ymax = clickedY + ((currentZoomY / zoomAmount)/2);

  dx = (xmax - xmin) / (width);
  dy = (ymax - ymin) / (height);

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
      
      if(n < maxiterations){
        double log_zn = log( (float)((a*a) + (b*b)) ) / 2;
        float nu = log( (float)(log_zn / log(2)) ) / log(2);
        if((int)random(10000) == 3){
          println("nu: ", nu);
        }
        float nuIterations = (float)(n + 1) - nu;
        
        int colorSelector = ((int)nuIterations) % 1000;
        color color1 = color(colorSelector, 1000, 1000); 
        color color2 = color((colorSelector) + 1, 1000, 1000);
        color actualColor = lerpColor(color1, color2, colorSelector % 1);
        pixels[i+j*width] = actualColor;
      }else{
        pixels[i+j*width] = color(0, 0, 0);
      }
      x += dx;
    }
    y += dy;
  }

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