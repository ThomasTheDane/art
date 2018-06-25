const colorPickerWidth = 15;

class GradientTool {
    constructor(startingGradient, canvas, mandelbrotControls) {
        this.gradient = startingGradient;
        this.canvas = canvas;
        this.mandelbrotControls = mandelbrotControls;

        this.context = canvas.getContext("2d");

        
        this.instantiateColorPickers();

        this.drawGradientAndColors();


        //logic for draging colors 
        let self = this;
        this.isMouseDown = false;
        this.selectedColor;

        this.canvas.onmousedown = function(e){
            console.log(e);
            let i = 0;
            for(let aColor of self.gradient.colors){

                if(self.isInsideBox({x: e.offsetX, y:e.offsetY}, {x:(aColor.position * self.canvas.width) - (colorPickerWidth / 2),
                                                                y:0,
                                                                width: colorPickerWidth,
                                                                height: self.canvas.height})){
                    self.selectedColor = aColor;
                    self.selectedIndex = i;
                    console.log("downed a color")
                }
                i += 1;
            }
            self.isMouseDown = true;
            self.mouseMoved = false;
        }

        this.canvas.onmousemove = function(e){
            self.mouseMoved = true;

            //move the color position and box to mouse 
            if(self.selectedColor && self.selectedIndex > 0 && self.selectedIndex < self.gradient.colors.length){
                if((e.offsetX > self.gradient.colors[self.selectedIndex - 1].position * self.canvas.width) && (e.offsetX < self.gradient.colors[self.selectedIndex + 1].position * self.canvas.width)){
                    self.selectedColor.position = e.offsetX / self.canvas.width;
                    self.drawGradientAndColors();
                }
            }
        }

        this.canvas.onmouseup = function(e){
            self.isMouseDown = false;

            if(!self.mouseMoved){
                console.log("pick that color! ");
                self.selectedColor.picker.show();
            }else{
                self.mandelbrotControls.updateMandelbrotGradient(self.gradient);
            }
            self.selectedColor = null;
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
            this.drawAColor(aColor);
            let rect = this.canvas.getBoundingClientRect();
            aColor.input.style.left = rect.left + (aColor.position * this.canvas.width) - 24; // aColor.point
            aColor.input.style.top = rect.top - 20;
        }
    }

    drawAColor(aColor){
        this.context.beginPath();
        this.context.lineWidth="2";
        this.context.strokeStyle="black";
        this.context.rect((aColor.position * this.canvas.width) - (colorPickerWidth / 2),1,colorPickerWidth-2,this.canvas.height-2); 
        this.context.stroke();
        
    }

    instantiateColorPickers(){
        this.colorPickers = new Array();
        for (const aColor of this.gradient.colors) {

            let colorInput = document.createElement('INPUT');
            let picker = new jscolor(colorInput);

            picker.fromRGB(aColor.color[0] * 255, aColor.color[1] * 255, aColor.color[2] * 255);
            colorInput.style.width = 48;
            colorInput.style.position = "absolute";

            document.body.appendChild(colorInput);
            aColor.picker = picker;
            aColor.input = colorInput;
            
            let self = this;
            aColor.picker.onFineChange = function(){
                aColor.color[0] = aColor.picker.rgb[0] / 255;
                aColor.color[1] = aColor.picker.rgb[1] / 255;
                aColor.color[2] = aColor.picker.rgb[2] / 255
                console.log(aColor);
                self.drawGradientAndColors();
            }
            aColor.input.onchange = function(){
                console.log("UPDATE");
                self.mandelbrotControls.updateMandelbrotGradient(self.gradient);
            }
        }
    }
}