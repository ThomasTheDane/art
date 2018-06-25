let triangleFunctions = [
    function(point){
        return [(point[0]/2), (point[1]/2)];
    },
    function(point){
        return [((point[0]+1)/2), (point[1]/2)];
    },
    function(point){
        return [(point[0]/2), ((point[1]+1)/2)];
    }
]
let canvas = document.getElementById("mainCanvas");
for (let i = 0; i < 1000; i++) {
    let point = [(Math.random()) * 2 - 1, (Math.random()) * 2 - 1]

    for (let j = 0; j < 100; j++) {       
        let func = triangleFunctions[getRandomInt(3)];
        point = func(point);

        if(j > 20){ 
            paintPointToCanvas(point, canvas);
        }
    }
}

function paintPointToCanvas(point, canvas){
    let context = canvas.getContext("2d");
    context.fillStyle = `rgb(0, 0, 0)`;

    let convertedPoint = [(point[0] * (canvas.width / 2)) + (canvas.width / 2), 
                          (point[1] * (canvas.height / 2)) + (canvas.height / 2), 
                         ];


    context.fillRect(convertedPoint[0], convertedPoint[1], 1, 1);
    // console.log(convertedPoint);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }


  //todos
  //probability weights to functions 