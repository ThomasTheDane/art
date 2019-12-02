if (SVG) {
    var svgDraw = SVG().addTo('body').size(1000, 1000)

    // var boundingCircle = svgDraw.circle((810)).fill('#f06').move(10, 10);
    const pi = 3.14159265358979;
    let xLengthTraveled = 0;
    let yLengthTraveled = 0;

    const radiusStep = pi / 10;

    for (let i = 1; i <= 40; i++) {
        for (let j = 0; j < 40; j++) {
            console.log(Math.sin(3.14159/20));
            let newRadius = Math.abs(Math.sin(radiusStep * j)) * 30;

            let aCircle = svgDraw.circle(newRadius).fill('#000').move(xLengthTraveled, yLengthTraveled);

            xLengthTraveled += newRadius;
        }
        xLengthTraveled = 0;
        yLengthTraveled += 30;
    }
}
// function that goes from 0 to 100 in sine distribution