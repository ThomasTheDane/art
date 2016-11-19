$(function() {
	width = 500;
	height = 500;
	$("#renderButton").click(function(){
		maxIterations = $("#maxIterations").slider("value");
		gradient = getGradientColorsFromPicker();
		console.log("gradient: ", gradient)
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,width, height);
		
		for (var i = 0; i < height; i++) {
			fillColor = getGradientColor(i/5)
			ctx.fillStyle = rgbFormatter(fillColor[0], fillColor[1], fillColor[2])
			ctx.fillRect(0, i, 500, 1)
		}
		// setupWebGLMandelbrot();
	});

	function rgbFormatter(red, green, blue){
		return "rgb("+red+","+green+","+blue+")";
	}

	function map(num, originalStart, originalEnd, finalStart, finalEnd){
		return (num-originalStart)/(originalEnd-originalStart) * (finalEnd-finalStart) + finalStart;
	}

	function getGradientColor(location){
		var firstColor, secondColor;
		if (location < gradient[0].location) {
			return gradient[0].color;
		}else if (location > gradient[gradient.length-1].location) {
			return gradient[gradient.length-1].color;
		}else{
			$.each(gradient, function( index, value ) {
		        if(location >= value.location) {
		        	firstColor = value;
		        	secondColor = gradient[index+1]
		            return false;
		        }
		    });
		}
		// console.log(firstColor, secondColor);
		
		var firstcolor_x = (firstColor.location/100);
	    var secondcolor_x = (secondColor.location/100)-firstcolor_x;
	    var slider_x = (location/100)-firstcolor_x;
	    var ratio = slider_x/secondcolor_x
	    //Get the color with pickHex(thx, less.js's mix function!)
	    return pickHex( secondColor.color,firstColor.color, ratio ); 
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
});






