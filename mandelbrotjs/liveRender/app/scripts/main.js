
var height = 500;
var width = 500;

var xmin = -2;
var xmax = 1;

var ymin = -1.5;
var ymax = 1.5;

var dx = (xmax - xmin) / width;
var dy = (ymax - ymin)/ height;

var maxIterations = 500;

var zoomAmount = 1.5;

var gradient;

$(function() {
	Slider("#maxIterations", 1000);
	// console.log(getGradientColorsFromPicker())

	// drawMandel();
	$('#myCanvas').click(function q(event) {
	    event = event || window.event;

	    var canvas = document.getElementById('myCanvas'),
	        x = event.pageX - canvas.getBoundingClientRect().left;// - canvas.offsetLeft,
	        y = event.pageY - canvas.getBoundingClientRect().top;// - canvas.offsetTop;

	    console.log(x, y);
	    var clickedX = map(x, 0, width, xmin, xmax);
	    var clickedY = map(y, 0, height, ymin, ymax);

	    zoomTo(clickedX, clickedY);
	});

	$("#renderButton").click(function(){
		maxIterations = $("#maxIterations").slider("value");
		gradient = getGradientColorsFromPicker();
		console.log(gradient)
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,width, height);

		console.log(maxIterations);
		drawMandel();
	});
});

function drawMandel(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var y = ymin;
	for (var j = 0; j < height; j++) {
		console.log("j", j);
		var x = xmin;
		for (var i = 0; i < width; i++) {
			var a = 0 + x
			var b = 0 + y;
			var n = 0;
			while(n < maxIterations){
				var aa = a * a;
				var bb = b * b;
				var twoab = 2 * a * b;
				a = aa - bb + x;
				b = twoab + y;
				if(aa+bb > 16){
					break;
				}
				n += 1;
			}
			if (n == maxIterations){
				setMandelColor(i,j,[0,0,0])
			}else{
				setMandelColor(i,j,getGradientColor((n%100)+1))
			}
			x += dx;
		}
		y += dy;
	}

}

function setMandelColor(x, y, color){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = rgb(color[0], color[1], color[2]);
	ctx.fillRect(x,y,1,1)
}

function getGradientColor(location){
	// console.log(gradient)
	// var gradient = [
	//     {
	//         location:0,
	//         color:[252,0,255]
	//     },
	//     {
	//         location:100,
	//         color:[0,219,222]
	//     }
	// ];
	var colorRange = []
    $.each(gradient, function( index, value ) {
        if(location<=value.location) {
            colorRange = [index-1,index]
            return false;
        }
    });
    //Get the two closest colors
    var firstcolor = gradient[colorRange[0]].color;

    var secondcolor = gradient[colorRange[1]].color;
    
    //Calculate ratio between the two closest colors
    var firstcolor_x = (gradient[colorRange[0]].location/100);
    var secondcolor_x = (gradient[colorRange[1]].location/100)-firstcolor_x;
    var slider_x = (location/100)-firstcolor_x;
    var ratio = slider_x/secondcolor_x
    
    //Get the color with pickHex(thx, less.js's mix function!)
    return pickHex( secondcolor,firstcolor, ratio ); 
}

function pickHex(color1, color2, weight) {
    var p = weight;
    var w = p * 2 - 1;
    var w1 = (w/1+1) / 2;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

function zoomTo(x, y){
	var currentZoomX = xmax - xmin;
	var currentZoomY = ymax - ymin;

	xmin = x - ((currentZoomX / zoomAmount)/2);
	xmax = x + ((currentZoomX / zoomAmount)/2);

	ymin = y - ((currentZoomY / zoomAmount)/2);
	ymax = y + ((currentZoomY / zoomAmount)/2);
	
	dx = (xmax - xmin) / (width);
	dy = (ymax - ymin) / (height);

	drawMandel();
}

function map(num, originalStart, originalEnd, finalStart, finalEnd){
	return (num-originalStart)/(originalEnd-originalStart) * (finalEnd-finalStart) + finalStart;
}

// var maxIterationsSlider = new Slider("#maxIterations");


function Slider(id, maxVal){
	function changeSlider(){
		// alert($(id).slider("value"))
		$(id + "Label").html($(id).slider("value"))
	}
	function slideSlider(){
		$(id + "Label").html($(id).slider("value"))
	}
	$( id ).slider({
      orientation: "horizontal",
      range: "min",
      max: maxVal,
      value: maxVal / 2,
      change: changeSlider,
      slide: slideSlider
    });
}




