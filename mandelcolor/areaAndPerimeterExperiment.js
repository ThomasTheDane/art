//we want to estimate the area and perimeter of a fractal
function estimateAreaOfMandel(mandel){
    let areaCount = 0;
    mandel.computeMandelbrot();
    for (let j = 0; j < mandel.height; j++) {
        for (let i = 0; i < mandel.width; i++) {
            if(mandel.depth[i][j] == mandel.maxIterations){
                areaCount += 1;
            }
        }
    }
    return (areaCount / (mandel.width * mandel.height)) * ((mandel.xmax - mandel.xmin) * (mandel.ymax - mandel.ymin));
}

function estimatePerimeterOfMandel(mandel){
    mandel.computeMandelbrot();
    let rightPerimeterCount = 0;
    let downPerimeterCount = 0;
    for (let j = 0; j < mandel.height - 1; j++) {
        for (let i = 0; i < mandel.width - 1; i++) {
            if(mandel.depth[i][j] == mandel.maxIterations){//if black
                if(mandel.depth[i+1][j] != mandel.maxIterations){
                    rightPerimeterCount += 1;
                }
                if(mandel.depth[i][j+1] != mandel.maxIterations){
                    downPerimeterCount += 1;
                }
            }
            if(mandel.depth[i][j] != mandel.maxIterations){
                if(mandel.depth[i+1][j] == mandel.maxIterations){
                    rightPerimeterCount += 1;
                }
                if(mandel.depth[i][j+1] == mandel.maxIterations){
                    downPerimeterCount += 1;
                }                
            }
        }
    }
    return (rightPerimeterCount * ((mandel.ymax - mandel.ymin) / mandel.height)) + (downPerimeterCount * ((mandel.xmax - mandel.xmin) / mandel.width));
}