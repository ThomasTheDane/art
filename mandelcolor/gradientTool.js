const colorPickerWidth = 15;

class GradientTool {
    constructor(startingGradient, canvas, mandelbrot) {
        this.gradient = startingGradient;
        this.canvas = canvas;
        this.mandelbrot = mandelbrot;

        this.context = canvas.getContext("2d");

        this.drawGradientAndColors();

        //logic for draging colors 
        let self = this;
        this.isMouseDown = false;
        this.selectedColor;

        this.canvas.onmousedown = function(e){
            console.log(e);
            for (const aColor of self.gradient.colors) {
                if(self.isInsideBox({x: e.offsetX, y:e.offsetY}, {x:(aColor.position * self.canvas.width) - (colorPickerWidth / 2),
                                                                y:0,
                                                                width: colorPickerWidth,
                                                                height: self.canvas.height})){
                    self.selectedColor = aColor;
                }
            }
            self.isMouseDown = true;
            self.mouseMoved = false;
        }

        this.canvas.onmousemove = function(e){
            self.mouseMoved = true;

            //move the color position and box to mouse 
            if(self.selectedColor){
                self.selectedColor.position = e.offsetX / self.canvas.width;
                self.drawGradientAndColors();
            }
        }

        this.canvas.onmouseup = function(e){
            self.isMouseDown = false;

            if(!self.mouseMoved){
                console.log("pick that color! ")
            }

            self.selectedColor = null;
            self.mandelbrot.updateMandelbrotGradient(self.gradient);

        }
    }

    isInsideBox(point, rect){
        if(point.x > rect.x && point.x < rect.x + rect.width){
            if(point.y > rect.y && point.y < rect.y + rect.height){
                return true;
            }
        }
        return false;
    }

    drawGradientAndColors(){
        this.gradient.drawGradientOnCanvas(this.canvas);

        for (const aColor of this.gradient.colors) {
            this.drawAColor(aColor)
        }
    }

    drawAColor(aColor){
        this.context.beginPath();
        this.context.lineWidth="2";
        this.context.strokeStyle="black";
        this.context.rect((aColor.position * this.canvas.width) - (colorPickerWidth / 2),1,colorPickerWidth-2,this.canvas.height-2); 
        this.context.stroke();
    }


}