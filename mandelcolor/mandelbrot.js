class Mandelbrot{
    constructor(width, height, {xmin = -2, xmax = 1, ymin = -1, ymax=1} = {}, maxIterations){
        console.log(`instantiating mandelbrot resolution ${height} by ${width} spanning x ${xmin} to ${xmax} and y ${ymin} to ${ymax}`);

        //set basic parameter to object
        this.width = width;
        this.height = height;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        this.maxIterations = maxIterations || 500;
        
        //initialize the nested array to store recursive depth for each pixel 
        this.depth = new Array(width);
        for(let i = 0; i < width; i++){
            this.depth[i] = new Array(height);
        }
    }

    computeMandelbrot(){
        console.log(`max iterationsmax: ${this.maxIterations}`);
        var dx = (this.xmax - this.xmin) / this.width;
        var dy = (this.ymax - this.ymin)/ this.height;

        let y = this.ymin;
        for (let j = 0; j < this.height; j++) {
            let x = this.xmin;
            for (let i = 0; i < this.width; i++) {
                let a = 0 + x
                let b = 0 + y;

                let n = 0;
                while(n < this.maxIterations){
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

    computeMandelbrotWithHistogram(){
        //initialize the histogram array 
        this.histogram = new Array(this.maxIterations - 1);
        for (let i = 0; i < this.maxIterations; i++) {
            this.histogram[i] = 0;
        }

        console.log(`max iterationsmax: ${this.maxIterations}`);
        var dx = (this.xmax - this.xmin) / this.width;
        var dy = (this.ymax - this.ymin)/ this.height;

        let y = this.ymin;
        for (let j = 0; j < this.height; j++) {
            let x = this.xmin;
            for (let i = 0; i < this.width; i++) {
                let a = 0 + x
                let b = 0 + y;

                let n = 0;
                while(n < this.maxIterations){
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
                this.histogram[n] += 1;
                this.depth[i][j] = n;
                x += dx;
            }
            y += dy;
        }
    }

    computeSmoothMandelbrot(){
        this.histogram = new Array(this.maxIterations - 1);
        for (let i = 0; i < this.maxIterations; i++) {
            this.histogram[i] = 0;
        }

        console.log(`max iterationsmax: ${this.maxIterations}`);
        let dx = (this.xmax - this.xmin) / this.width;
        let dy = (this.ymax - this.ymin)/ this.height;

        let y = this.ymin;
        for (let j = 0; j < this.height; j++) {
            let x = this.xmin;
            for (let i = 0; i < this.width; i++) {
                let a = 0 + x
                let b = 0 + y;

                let n = 0;
                while(n < this.maxIterations){
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


                this.histogram[n] += 1;
                this.depth[i][j] = n;
                if(this.depth[i][j] < this.maxIterations){
                    let log_zn = Math.log10( (a*a) + (b*b) ) / 2;
                    let nu = Math.log10( log_zn / Math.log10(2) ) / Math.log10(2);
                    this.depth[i][j] = this.depth[i][j] + 1 - nu;
                }

                x += dx;
            }
            y += dy;
        }        
    }

    
}