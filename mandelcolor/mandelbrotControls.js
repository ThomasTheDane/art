class MandelbrotControls{
    constructor(mandelbrot, canvas){
        if(!mandelbrot){
            mandelbrot = new Mandelbrot(750, 500, {xmin: -2, xmax: 1, ymin: -1, ymax:1});
        }
        this.mandelbrot = mandelbrot;
        this.canvas = canvas;

        this.coloringMethod = "basic";
    }

    updateMandelbrot(gradient ){
        this.drawMandelbrotOnCanvas()
    }

    updateMandelbrotGradient(newGradient){
        this.drawMandebrot(newGradient);
    }

    drawMandebrot(gradient = new Gradient()){
        if(this.coloringMethod == "basic"){
            this.mandelbrot.computeMandelbrot();
            let context = this.canvas.getContext("2d");
            for (let j = 0; j < this.mandelbrot.height; j++) {
                for (let i = 0; i < this.mandelbrot.width; i++) {
                    if(this.mandelbrot.depth[i][j] == this.mandelbrot.maxIterations){
                        context.fillStyle = `rgb(0, 0, 0)`;
                    }else{
                        context.fillStyle = gradient.rgbString(gradient.getColor(this.mandelbrot.depth[i][j] / this.mandelbrot.maxIterations)) //`rgb(${this.depth[i][j]}, ${this.depth[i][j]}, ${this.depth[i][j]})`;
                    }
                    context.fillRect(i, j, 1, 1);
                }
            }
        }
        if(this.coloringMethod == "histogram"){
            this.mandelbrot.computeMandelbrotWithHistogram();
            let context = this.canvas.getContext("2d");
            let total = this.mandelbrot.histogram.reduce(function(acc, val) { return acc + val; });

            for (let j = 0; j < this.mandelbrot.height; j++) {
                for (let i = 0; i < this.mandelbrot.width; i++) {
                    let hue = 0;

                    if(this.mandelbrot.depth[i][j] == this.mandelbrot.maxIterations){
                        context.fillStyle = `rgb(0, 0, 0)`;
                    }else{
                        for(let k = 0; k < this.mandelbrot.depth[i][j]; k++){
                            hue += this.mandelbrot.histogram[k] / total;
                            context.fillStyle = gradient.rgbString(gradient.getColor(hue)) 
                        }
                    }
                    context.fillRect(i, j, 1, 1);
                }
            }
        }
    }
}