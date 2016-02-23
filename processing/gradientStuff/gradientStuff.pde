
color c1 = color(204, 102, 0);
color c2 = color(0, 102, 153);
int Y_AXIS = 1;
int X_AXIS = 2;

void setup(){
  size(500, 500);
}

void draw(){
  for(int i = 0; i < width; i++){
    
    stroke(gradient1(i * 2));
    line(i, 0, i, height);
  }
  
//  setGradient();
}

void setGradient() {

  noFill();
  for (int i = 0; i <= width; i++) {
    float inter = map(i, 0, height, 0, 1);
    color c = lerpColor(c1, c2, (float)i / width);
    stroke(c);
    line(i, 0, i, height);
  }
}

color gradient1(int location){
  color[] gradientColors = new color[7];

  gradientColors[0] = color(255,255,0);
  gradientColors[1] = color(255,0,0);
  gradientColors[2] = color(255,255,0);
  gradientColors[3] = color(255,0,0);
  gradientColors[4] = color(255,255,0);
  gradientColors[5] = color(255,0,0);
  
  int[] colorPositions = {0, 200, 400, 600, 800, 1000};
  for(int i = 0; i < colorPositions.length; i++){
    if(location > colorPositions[i] && location <= colorPositions[i+1]){
      return lerpColor(gradientColors[i], gradientColors[i+1], ((float)(location - colorPositions[i]))/(colorPositions[i+1] - colorPositions[i]));
    }
  }
  return color(0,0,0);
}

class Gradient {
  color[] colors;
  
  Gradient(){
    colors = new color[100];
    int gradientCounts;
  }
  
  void addColor(color newColor){
    
  }
}