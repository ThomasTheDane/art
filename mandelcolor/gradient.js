class Gradient{
    constructor(gradientColors = [{color:[1.0, 1.0, 1.0], position: 0.0}, {color:[0.0, 0.0, 0.0], position: 1.0}]){
        if(gradientColors[0].position != 0 || gradientColors[gradientColors.length - 1].position != 1.0){
            throw "Error: gradient must have element positioned at 0 and 1"
        }
        this.colors = gradientColors;
    }

    getColor(atPosition){
        if(atPosition < this.colors[0].position || atPosition > this.colors[this.colors.length - 1].position){
            throw 'Error: requested position out of range';
        }
        let color1 = [];
        let color2 = [];
        let ratio;

        for(let i = 1; i < this.colors.length; i++){
            if(atPosition <= this.colors[i].position){
                color1 = this.colors[i-1].color;
                color2 = this.colors[i].color;
                ratio = (atPosition - this.colors[i-1].position) / (this.colors[i].position - this.colors[i-1].position);
                break;
            }
        } 

        return this.mixColors(color2, color1, ratio);
    }

    addColor(newColor){
        for(let i = 0; i < this.colors.length - 1; i++){
            if(newColor.position > this.colors[i].position && newColor.position < this.colors[i+1].position){
                this.colors.splice(i+1, 0, newColor);
                return;
            }
        }
    }

    mixColors(color1, color2, ratio){
        let antiRatio = 1 - ratio;
        let mix = [(color1[0] * ratio) + (color2[0] * antiRatio),
                   (color1[1] * ratio) + (color2[1] * antiRatio),
                   (color1[2] * ratio) + (color2[2] * antiRatio)];
        // console.log(`${color1} and ${color2} mix at ratio ${ratio} to make ${mix}`)
        return mix;
    }

    drawGradientOnCanvas(canvas){
        let context = canvas.getContext("2d");
        let width = canvas.width;
        let height = canvas.height;
        for(let i = 0; i <= width; i++){
            let mixed = aGradient.getColor(i / width);    
            context.fillStyle = aGradient.rgbString(mixed);
            context.fillRect(i, 0, 1, height);
        }
    }

    rgbString(color){
        return `rgb(${Math.round(color[0]*255)}, ${Math.round(color[1]*255)}, ${Math.round(color[2] * 255)})`;
        
    }
}