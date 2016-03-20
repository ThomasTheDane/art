class MandelbrotGenerator{
  void MandelbrotGenerator(){
    
  }
  
  double mapDoubles(double value, double istart, double istop, double ostart, double ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  }
  
  
  // draws using a basic counter but  with a -ln(n) modification. This gives good distribution but is highly dependent on maxiterations  
  void drawBasic(){
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
        float hue = -1*log(float(n)/maxiterations);
        //printSample(hue, 10000);
        if (n == maxiterations) {
          pixels[i+j*width] = color(0, 0, 0);
        } else {
          pixels[i+j*width] = myGradient.getColor(hue/6.214);
        }
        
        
        x += dx;
      }
      y += dy;
    }
  
  }
  
  // histogramic coloring keeps the same amount of each color in the picture at all times 
  void drawHistogramic(){  
    int[] histogram;
    int[][] iterationsNeeded;
   
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
      
    for (int j = 0; j < height; j++) {
      for (int i = 0; i < width; i++) {
        float hue = 0.0;      
        if(iterationsNeeded[i][j] == maxiterations){
          pixels[i+j*width] = color(0, 0, 0);
        }else{
          for(int k = 0; k < iterationsNeeded[i][j]; k++){
            hue += histogram[k] / total;
          }
  
          pixels[i+j*width] = myGradient.getColor(hue);
        }
      }
    }
  }
  
  void drawPotential(){
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
          
          float nuIterations = (float)(n + 1) - nu;
          
          float hue = ((nuIterations/100) % 1.0);
          printSample(hue, 1000);
          color color1 = myGradient.getColor(hue); 
          color color2 = myGradient.getColor(hue);
          color actualColor = lerpColor(color1, color2, hue % 1);
          pixels[i+j*width] = actualColor;
        }else{
          pixels[i+j*width] = color(0, 0, 0);
        }
        x += dx;
      }
      y += dy;
    }
  }
  
  void printSample(int value, int oneOutOf){
    if(int(random(1, oneOutOf)) == 1){
      println("sample value: ", value);
    }
  }
  
  void printSample(float value, int oneOutOf){
    if(int(random(1, oneOutOf)) == 1){
      println("sample value: ", value);
    }
  }
}