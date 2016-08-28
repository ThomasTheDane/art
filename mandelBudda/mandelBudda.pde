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

void draw() {
  float[][] pointDensity = new float[width+1][height+1];

  // Start y
  double y = ymin;
  for (int j = 0; j < height; j++) {
    // Start x
    double x = xmin;
    for (int i = 0; i < width; i++) {      
      double a = x;
      double b = y;
      // send out points and track where one goes after the other
      boolean shouldPrint = false;
      if(int(random(1, 1000)) == 1){
        shouldPrint = true;
      }
      for(int k = 0; k < 500; k++){
        //update the values by iterating  
        double aa = a * a;
        double bb = b * b;
        double twoab = 2.0 * a * b;
        a = aa - bb + x;
        b = twoab + y;
        if(shouldPrint){
          //println(a);
        }
        //printSample((int)(1000*a), 1000);
        //add to image if it falls within the square 
        //printSample((int)mapDoubles(a, xmin, xmax, 0, (double)width)+1, 1000);
        if(a < xmin || a > xmax || b < ymin || b > ymax){ 
          break;
        }
        pointDensity[(int)mapDoubles(a, xmin, xmax, 0, (double)width)][(int)mapDoubles(b, ymin, ymax, 0, (double)height)] += 1;
        //printSample(pointDensity[i][j], 1000);

      }
      
      x += dx;
    }
    y += dy;
  }

  float total = 0;
  double max = 0;
  for (int j = 0; j < height; j++) {
    for (int i = 0; i < width; i++) {      
      total += pointDensity[i][j];
      if(pointDensity[i][j] > max){
        max = pointDensity[i][j];
        //println("max", max, i, j);
      }
    }
  }
  //println(pointDensity[1][1]);
  
  colorMode(RGB, (float)max); 
  for (int j = 0; j < height; j++) {
    for (int i = 0; i < width; i++) {      
      pixels[i+j*width] = color(pointDensity[i][j]);
      printSample(pointDensity[i][j], 1000);
      if(pointDensity[i][j] > 0){
         //println("> 0: ", pointDensity[i][j]); 
      }
    }
  }
  updatePixels();
}
  
  
double mapDoubles(double value, double istart, double istop, double ostart, double ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

void printSample(float value, int oneOutOf){
  if(int(random(1, oneOutOf)) == 1){
    println("sample value: ", value);
  }
}