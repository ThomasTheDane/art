

// Establish a range of values on the complex plane
// A different range will allow us to "zoom" in or out on the fractal

int width = 500;
int height = 500;

float w = 4;
float h = (w * width) / height;

// Start at negative half the width and height
float xmin = -2;
float xmax = 0;

float ymin = -1;
float ymax = 1;

// Maximum number of iterations for each point on the complex plane
int maxiterations = 200;

// Calculate amount we increment x,y for each pixel
float dx = (xmax - xmin) / (width);
float dy = (ymax - ymin) / (height);

void setup(){
  size(500, 500);
  noLoop();
  background(255);
  
  // Make sure we can write to the pixels[] array.
  // Only need to do this once since we don't do any other drawing.
  loadPixels();
}

void mousePressed(){
  float zoomAmount = 2;
  float clickedX = map(mouseX, 0, width, xmin, xmax);
  float clickedY = map(mouseY, 0, height, ymin, ymax);
  
  float currentZoomX = xmax - xmin;
  float currentZoomY = ymax - ymin;
  
  xmin = clickedX - ((currentZoomX / zoomAmount)/2);
  xmax = clickedX + ((currentZoomX / zoomAmount)/2);
  
  ymin = clickedY - ((currentZoomY / zoomAmount)/2);
  ymax = clickedY + ((currentZoomY / zoomAmount)/2);
  
  dx = (xmax - xmin) / (width);
  dy = (ymax - ymin) / (height);
  
  //maxiterations = maxiterations * (int)zoomAmount;
  
  draw();
}

void draw(){
  colorMode(HSB, 1000, 1000, 1000);

  // Start y
  float y = ymin;
  for (int j = 0; j < height; j++) {
    // Start x
    float x = xmin;
    for (int i = 0; i < width; i++) {
      // Now we test, as we iterate z = z^2 + cm does z tend towards infinity?
      float a = 0 + x;
      float b = 0 + y;
      int n = 0;
      while (n < maxiterations) {
        float aa = a * a;
        float bb = b * b;
        float twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        // Infinty in our finite world is simple, let's just consider it 16
        if (aa + bb > 16.0) {
          break;  // Bail
        }
        n++;
      }
  
      // We color each pixel based on how long it takes to get to infinity
      // If we never got there, let's pick the color black
      if (n == maxiterations) {
        pixels[i+j*width] = color(0);
      } else {
        // Gosh, we could make fancy colors here if we wanted
        pixels[i+j*width] = color(n % 1000,1000,1000);
      }
      x += dx;
    }
    y += dy;
  }
  updatePixels();
}

color getGradient(int amount){
  color pixelColor;
//  if(amount < maxiterations / 10){ 
    float inter = map(amount, 0, maxiterations, 0, 1);       
    pixelColor = lerpColor(color(255, 255, 0), color(255,0,0), inter);
//  }else{
//    float inter = map(amount, maxiterations / 10, maxiterations, 0, 1);       
//     pixelColor = lerpColor(color(0,0,255), color(0,255,0), inter);
//  }
  return pixelColor;
}