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


function pickVariation(variations){
    //sum weight. Note these are the weights of each variation, not the weight of the transform 
    let totalWeight = variations[0].weight;
    let cummuWeights = [variations[0].weight];

    for (let i = 1; i < variations.length; i++) {
        cummuWeights.push(variations[i].weight + cummuWeights[i-1])
        totalWeight += variations[i].weight;
    }

    //generate rand float with max of sum weights 
    let pickedNum = Math.random() * totalWeight;

    //iterate through weight to see where num falls 
    if(pickedNum < variations[0].weight) return variations[0];
    for(let i = 1; i < variations.length; i++){
        if(pickedNum > variations[i - 1].weight && pickedNum < cummuWeights[i]) return variations[i]
    }
}

allVariations = {
    linear: function(point){
        return point;
    }
}

transform1 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                        b: 0,
                        c: 0,
                        d: 0.5,
                        e: 0,
                        f: 0
                        }
             };
transform2 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                        b: 0,
                        c: 0.5,
                        d: 0.5,
                        e: 0,
                        f: 0
                        }
             };

transform3 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                        b: 0,
                        c: 0.25,
                        d: 0.5,
                        e: 0,
                        f: 0.5
                        }
};


function IFS(point, transform){
    for (let j = 0; j < 30; j++) {       
        

        // point = {x: aTransform. (transform.params.a * point.params.x) + (transform.params.b * point.params.y) + (transform.params.c), 
        //          y: (transform.params.d * point.params.x) + (transform.params.e * point.params.y) + (transform.params.f) };
        
        //need to randomly pick a transform based on variations weight 
        let func = allVariations[pickVariation(transform.variations).name]; //note: this is very inefficient to iterate over given the structure of calculating the probabilities of picking a variation 
        
        //we morph the point based on params and put it through the chosen function 
        point =  {x: (transform.params.a * point.x) + (transform.params.b * point.y) + (transform.params.c), 
                  y: (transform.params.d * point.x) + (transform.params.e * point.y) + (transform.params.f) };
        point = func(point);

        if(j > 20){ 
            paintPointToCanvas(point);
        }
    }
}

// let canvas = document.getElementById("mainCanvas");

// for (let i = 0; i < 1000; i++) {
//     let point = [(Math.random()) * 2 - 1, (Math.random()) * 2 - 1]
//     IFS(point);
// }

function paintPointToCanvas(point){
    let canvas = document.getElementById('mainCanvas');
    let context = canvas.getContext("2d");
    context.fillStyle = `rgb(0, 0, 0)`;

    let convertedPoint = [(point.x * (canvas.width / 2)) + (canvas.width / 2), 
                          (point.y * (canvas.height / 2)) + (canvas.height / 2), 
                         ];

    console.log(convertedPoint);
    context.fillRect(convertedPoint[0], convertedPoint[1], 1, 1);
    // console.log(convertedPoint);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawAndCalculateFlame(transforms){
    for (const aTransform of transforms) {
        for (const aVariation of aTransform.variations) {
            for (let i = 0; i < 10; i++) {

                let point = {x:(Math.random()) * 2 - 1, y: (Math.random()) * 2 - 1}
                IFS(point, transform1);

            }
        }
    }
}

drawAndCalculateFlame([transform1, transform2, transform3]);
  //todos
  //probability weights to functions 