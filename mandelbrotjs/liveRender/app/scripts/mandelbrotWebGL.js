var renderFrame;

function setupWebGLMandelbrot() {
  /* locate the canvas element */
  console.log("setting up webgl mandel");
  var canvas_element = document.getElementById("myCanvas");
  
  /* obtain a webgl rendering context */
  var gl = canvas_element.getContext("webgl");

  /* get shader code from the <script> tags */
  var vertex_shader_src = document.getElementById("shader-vs").text;
  var fragment_shader_src = document.getElementById("shader-fs").text;

  /* compile and link shaders */
  var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
  var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertex_shader, vertex_shader_src);
  gl.shaderSource(fragment_shader, fragment_shader_src);
  gl.compileShader(vertex_shader);
  console.log(gl.getShaderInfoLog(vertex_shader));  
  gl.compileShader(fragment_shader);
  console.log(gl.getShaderInfoLog(fragment_shader));  
  var mandelbrot_program = gl.createProgram();
  gl.attachShader(mandelbrot_program, vertex_shader);
  gl.attachShader(mandelbrot_program, fragment_shader);
  gl.linkProgram(mandelbrot_program);
  gl.useProgram(mandelbrot_program);

  /* create a vertex buffer for a full-screen triangle */
  var vertex_buf = gl.createBuffer(gl.ARRAY_BUFFER);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  
  /* set up the position attribute */
  var position_attrib_location = gl.getAttribLocation(mandelbrot_program, "a_Position");
  gl.enableVertexAttribArray(position_attrib_location);
  gl.vertexAttribPointer(position_attrib_location, 2, gl.FLOAT, false, 0, 0);

  /* find uniform locations */
  var zoom_center_uniform = gl.getUniformLocation(mandelbrot_program, "u_zoomCenter");
  var zoom_size_uniform = gl.getUniformLocation(mandelbrot_program, "u_zoomSize");
  var max_iterations_uniform = gl.getUniformLocation(mandelbrot_program, "u_maxIterations");
  var color_array_uniform = gl.getUniformLocation(mandelbrot_program, "u_colors");
  var color_locations_uniform = gl.getUniformLocation(mandelbrot_program, "u_color_locations"); 

  // gradientColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, gradientColorBuffer);
  // var colors = [
  //       1.0, 0.0, 0.0, 1.0,
  //       0.0, 1.0, 0.0, 1.0,
  //       0.0, 0.0, 1.0, 1.0,
  //       1.0, 0.0, 0.0, 1.0,
  // ];
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  // gradientColorBuffer.itemSize = 4;
  // gradientColorBuffer.numItems = 4;


  /* these hold the state of zoom operation */
  var zoom_center = [0.0, 0.0];
  var target_zoom_center = [0.0, 0.0];
  var zoom_size = 4.0;
  var stop_zooming = true;
  var zoom_factor = 1.0;
  var max_iterations = 500;
    
  renderFrame = function () {
    max_iterations = $("#maxIterations").slider("value");

    /* bind inputs & render frame */
    gl.uniform2f(zoom_center_uniform, zoom_center[0], zoom_center[1]);
    gl.uniform1f(zoom_size_uniform, zoom_size);
    gl.uniform1i(max_iterations_uniform, max_iterations);

    // flatten color array 
    gradient = getGradientColorsFromPicker();
    var flattenedGradient = [];
    for (var i = 0; i < gradient.length; i++) {
      flattenedGradient = flattenedGradient.concat(gradient[i].color); 
    }
    // console.log(flattenedGradient);
    gl.uniform3fv(color_array_uniform, flattenedGradient)

    var locations = [];
    for (var i = 0; i < gradient.length; i++) {
      locations.push(gradient[i].location)
    }
    for (var i = gradient.length; i < 50; i++){
      locations.push([-1.0]);
    }
    // console.log(locations);
    gl.uniform1fv(color_locations_uniform, locations)

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    /* handle zoom */
    if (!stop_zooming) { /* zooming in progress */
      /* gradually decrease number of iterations, reducing detail, to speed up rendering */
      // max_iterations -= 10;
      // if (max_iterations < 50) max_iterations = 50;
      
      /* zoom in */
      zoom_size *= zoom_factor;
      
      /* move zoom center towards target */
      zoom_center[0] += 0.1 * (target_zoom_center[0] - zoom_center[0]);
      zoom_center[1] += 0.1 * ( target_zoom_center[1] - zoom_center[1]);

      window.requestAnimationFrame(renderFrame);
    } //else if (max_iterations < 500) {
        /* once zoom operation is complete, bounce back to normal detail level */
        // max_iterations += 10;
        // window.requestAnimationFrame(renderFrame);
    //}
  }
   
  /* input handling */
  canvas_element.onmousedown = function(e) {
    var x_part = e.offsetX / canvas_element.width;
    var y_part = e.offsetY / canvas_element.height;
    target_zoom_center[0] = zoom_center[0] - zoom_size / 2.0 + x_part * zoom_size;
    target_zoom_center[1] = zoom_center[1] + zoom_size / 2.0 - y_part * zoom_size;
    stop_zooming = false;
    zoom_factor = e.buttons & 1 ? 0.99 : 1.01;
    renderFrame();
    return true;
  }
  canvas_element.oncontextmenu = function(e){return false;}
  canvas_element.onmouseup = function(e) { stop_zooming = true; }
  
  /* display initial frame */
  renderFrame(); 
}


function Slider(id, maxVal){
  console.log("setting up slider: ", id);
  function changeSlider(){
    // alert($(id).slider("value"))
    $(id + "Label").html($(id).slider("value"))

  }
  function slideSlider(){
    renderFrame();
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