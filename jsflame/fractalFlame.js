// let triangleFunctions = [
//     function(point){
//         return [(point[0]/2), (point[1]/2)];
//     },
//     function(point){
//         return [((point[0]+1)/2), (point[1]/2)];
//     },
//     function(point){
//         return [(point[0]/2), ((point[1]+1)/2)];
//     }
// ];


// let tallTriangleFunctions = [
//     function(point){
//         return [(point[0]/2), (point[1]/2)];
//     },
//     function(point){
//         return [ (point[0]/2) + (1/2), point[1] / 2];
//     },
//     function(point){
//         return [(point[0]/2) + (1/4), ((point[1]/2) +(1/2))];
//     }
// ];

//todo change to transform
function pickTransform(transforms){
    //sum weights of each transform 
    let totalWeight = transforms[0].weight;
    let cummuWeights = [transforms[0].weight];

    for (let i = 1; i < transforms.length; i++) {
        cummuWeights.push(transforms[i].weight + cummuWeights[i-1])
        totalWeight += transforms[i].weight;
    }

    //generate rand float with max of sum weights 
    let pickedNum = Math.random() * totalWeight;

    //iterate through weights to see where num falls 
    if(pickedNum < transforms[0].weight) return transforms[0];
    for(let i = 1; i < transforms.length; i++){
        if(pickedNum > transforms[i - 1].weight && pickedNum < cummuWeights[i]) return transforms[i]
    }
}

allVariations = {
    linear: function(point){
        return point;
    }
}

transform1 = {  variations: [{name: 'linear', value:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0,
                         d: 0,
                         e: 0.5,
                         f: 0
                        },
                weight: 1.0
             };
transform2 = {  variations: [{name: 'linear', value:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0.5,
                         d: 0,
                         e: 0.5,
                         f: 0
                        },
                weight: 1.0
             };

transform3 = {  variations: [{name: 'linear', value:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0,
                         d: 0,
                         e: 0.5,
                         f: 0.5
                        },
                weight: 1.0
};

function IFS(point, transforms){
    for (let j = 0; j < 100; j++) {       

        //need to randomly pick a transform
        let transform = pickTransform(transforms);

        //we morph the point based on params and put it through the chosen function 
        morphedPoint =  {x: (transform.params.a * point.x) + (transform.params.b * point.y) + (transform.params.c), 
                         y: (transform.params.d * point.x) + (transform.params.e * point.y) + (transform.params.f) };
        
        //apply all the variations and sum them with the appropriate weight 
        point = {x: 0, y: 0};
        for(aVariation of transform.variations){
            //get the variation function 
            let func = allVariations[aVariation.name];

            //get the single point output of the function 
            let funcOutput = func(morphedPoint);

            //multiply by the variations value / weight piece by piece and sum across all variations 
            point.x += aVariation.value * funcOutput.x;
            point.y += aVariation.value * funcOutput.y;
        }
        

        if(j > 20){ 
            paintPointToCanvas(point);
            // console.log([point.x * 500, point.y * 500])
        }
    }
}

function randomItem(items){
    return items[Math.floor(Math.random()*items.length)];
}

function paintPointToCanvas(point){
    let canvas = document.getElementById('mainCanvas');
    let context = canvas.getContext("2d");
    context.fillStyle = `rgb(0, 0, 0)`;

    let convertedPoint = [(point.x * (canvas.width / 2)) + (canvas.width / 2), 
                          (point.y * (canvas.height / 2)) + (canvas.height / 2)
                         ];

    context.fillRect(convertedPoint[0], convertedPoint[1], 1, 1);
    // console.log(convertedPoint);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawAndCalculateFlame(transforms){
    for (let i = 0; i < 200; i++) {

        let point = {x:(Math.random()) * 2 - 1, y: (Math.random()) * 2 - 1}
        IFS(point, transforms);

    }
}

drawAndCalculateFlame([transform1, transform2, transform3]);
// dumbIFS();
  //todos
