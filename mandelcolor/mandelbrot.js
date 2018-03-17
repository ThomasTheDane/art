class Mandelbrot{
    // constructor(width, height, {xmin, xmax, ymin, ymax} = {xmin: -2, xmax: 1, ymmin: -1, ymax: 1}){
    constructor(width, height, {xmin = -2, xmax = 1, ymin = -1, ymax=1} = {}){
        console.log(`instantiating mandelbrot resolution ${height} by ${width} spanning x ${xmin} to ${xmax} and y ${ymin} to ${ymax}`);

        //set basic parameter to object
        this.width = width;
        this.height = height;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        
        //initialize the nested array to store recursive depth for each pixel 
        this.depth = new Array(width);
        for(let i = 0; i < width; i++){
            this.depth[i] = new Array(height);
        }
    }

    computeMandelbrot({maxIterations = 500}){
        console.log(`max iterationsmax: ${maxIterations}`);
        var dx = (this.xmax - this.xmin) / this.width;
        var dy = (this.ymax - this.ymin)/ this.height;

        let y = this.ymin;
        for (let j = 0; j < this.height; j++) {
            let x = this.xmin;
            for (let i = 0; i < this.width; i++) {
                let a = 0 + x
                let b = 0 + y;

                let n = 0;
                while(n < maxIterations){
                    let aa = a * a;
                    let bb = b * b;
                    let twoab = 2 * a * b;
                    a = aa - bb + x;
                    b = twoab + y;
                    if(aa+bb > 16){
                        break;
                    }
                    n += 1;
                }
                this.depth[i][j] = n;
                x += dx;
            }
            y += dy;
        }
    }

    updateMandelbrotGradient(newGradient){
        this.drawMandebrotlOnCanvas(this.canvas, this.maxIterations, newGradient);
    }

    drawMandebrotlOnCanvas(canvas, maxIterations, gradient = new Gradient()){
        this.computeMandelbrot({maxIterations: maxIterations});
        this.canvas = canvas;
        this.maxIterations = maxIterations;

        let context = canvas.getContext("2d");
        for (let j = 0; j < this.height; j++) {
            for (let i = 0; i < this.width; i++) {
                if(this.depth[i][j] == maxIterations){
                    context.fillStyle = `rgb(0, 0, 0)`;
                }else{
                    context.fillStyle = gradient.rgbString(gradient.getColor(this.depth[i][j] / 500)) //`rgb(${this.depth[i][j]}, ${this.depth[i][j]}, ${this.depth[i][j]})`;
                }
                context.fillRect(i, j, 1, 1);
            }
        }
    }
}