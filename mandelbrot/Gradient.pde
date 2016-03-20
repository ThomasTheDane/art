//defines a gradient class that can be constructed with color and positions 
// has a max of 100 colors 
class Gradient {
  color[] colors;
  int[] positions;
  int colorCount = 0;
  int maxPosition = -1;
  int rotation = 0;
  
  Gradient(String selector){
    colors = new color[100];
    positions = new int[100];
    
    if(selector == "fire"){
      addColor(color(252,0,255), 0);
      addColor(color(0,219,222), 100);
      addColor(color(252,0,255), 200);
    }
    if(selector == "floyd"){
      addColor(color(194,21,0), 0);
      addColor(color(255,197,0), 100);
      addColor(color(252,0,255), 200);
      addColor(color(194,21,0), 300);      
    }
  }
  
  void addColor(color aColor, int position){
    //println("adding color: ", aColor);
    if(position > maxPosition){
      maxPosition = position;
    }else{
      println("ERROR: Must add higher position than previous");
      return;
    }
    colors[colorCount] = aColor;
    positions[colorCount] = position;
    colorCount += 1;
  }
  
  color getColor(float position){
    int location = int(position*maxPosition);
    location = location + rotation;
    if(location > maxPosition){
      location = location - maxPosition;
    }
    for(int i = 0; i < colorCount; i++){
      if(location >= positions[i] && location <= positions[i+1]){
        return lerpColor(colors[i], colors[i+1], ((float)(location - positions[i]))/(positions[i+1] - positions[i]));
      }
    }
    return color(0,0,0);
  }
  
  void rotateGradient(int amount){
    rotation += amount;
    if(rotation > maxPosition){
      rotation -= maxPosition;
    }
    if(rotation < 0){
      rotation = maxPosition + rotation;
    }
  }
  
  void doubleGradient(){
    //less ambicious dreams 
  }
  
  void foldGradient(){
    //dream
  }
}