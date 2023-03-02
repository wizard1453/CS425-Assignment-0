import vertexShaderSrc from './vertex.glsl.js';
import fragmentShaderSrc from './fragment.glsl.js'

// Transfered datas
var gl;
var positions;
var colors;

var posAttribLoc;
var colorAttribLoc;
var uniformLoc;
var uniformLoc2;

// buffer
var posBuffer;
var colorBuffer;

var program; //shader program
var vao; //vertex array object
var currTri; //number of triangles
var currColor = []; //current color defined by config pannel
var is_checked; //if toggle is checked

// change background color and current color
window.updateColor = function () {
    var R = document.querySelector("#sliderR").value;
    var r = parseInt(R)/255.0;
    var G = document.querySelector("#sliderG").value;
    var g = parseInt(G)/255.0;
    var B = document.querySelector("#sliderB").value;
    var b = parseInt(B)/255.0;

    var newColor = 'rgb('+R+','+G+','+B+')';
    document.body.style.backgroundColor = newColor;
    // console.log(div.style.backgroundColor);
    currColor = [r, g, b, 1];
    // console.log(currColor);
}

// when uploaded a json file 
window.openFile = function () {
    var file = document.querySelector('input[type="file"]');
    var reader = new FileReader();

    reader.onload = function () {
        // get data from the dom object
        const obj = JSON.parse(reader.result);
        positions = obj.positions;
        console.log(obj.positions);

        colors = obj.colors;
        console.log(obj.colors);

        // get location from shaders
        posAttribLoc = gl.getAttribLocation(program, "position");
        colorAttribLoc = gl.getAttribLocation(program, "color");
        uniformLoc = gl.getUniformLocation(program, 'uColor');
        uniformLoc2 = gl.getUniformLocation(program, 'is_checked');

        // calculate the number of triangles
        var num_tri_max = positions.length / 9;
        // update the slider for triangle's max value
        document.querySelector("#sliderTri").max = num_tri_max;
        console.log("Max slider Tri: " + document.querySelector('#sliderTri').max);
        console.log("Triangle Numbers: " + positions.length / 9);

        // create buffer and vao
        posBuffer = createBuffer(positions);
        colorBuffer = createBuffer(colors);
        vao = createVAO(posAttribLoc, colorAttribLoc, posBuffer, colorBuffer);
        console.log(vao);
    };
    
    reader.readAsText(file.files[0]);
}

function createShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);

    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var info = gl.getShaderInfoLog(shader);
        console.log('Could not compile WebGL program:' + info);
    }

    return shader;
}

function createProgram(vertexShader, fragmentShader) {
    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var info = gl.getProgramInfoLog(program);
        console.log('Could not link WebGL program:' + info);
    }

    return program;
}

function createBuffer(vertices) {
    var buffer= gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    return buffer;
}

function createVAO(posAttribLoc, colorAttribLoc, posBuffer, colorBuffer) {
    var vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posAttribLoc);
    var size = 3; // number of components per attribute
    var type = gl.FLOAT;
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posAttribLoc, size, type, false, 0, 0);

    gl.enableVertexAttribArray(colorAttribLoc);
    size = 4;
    type = gl.FLOAT;
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttribLoc, size, type, false, 0, 0);

    return vao;
}

function initialize() {
    var canvas = document.querySelector("#glcanvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl = canvas.getContext("webgl2");

    currTri = 1;
    // currColor = [0, 0, 0, 1];

    // create shaders
    var vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
    var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
    program = createProgram(vertexShader, fragmentShader);

    // draw
    window.requestAnimationFrame(draw);
}

function draw(timestamp) {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);
    // console.log(currColor);

    // this is to set the variable of vertex/fragment vertex
    if(is_checked){ //if checked use color from csv file
        //set is_checked==1
        gl.uniform1i(uniformLoc2, is_checked);
    }else if(!is_checked){ //if unchecked use color from config pannel
        //set is_checked==0
        gl.uniform1i(uniformLoc2, is_checked);
        gl.uniform4fv(uniformLoc, new Float32Array(currColor)); 
    }

    gl.bindVertexArray(vao);
    var primitiveType = gl.TRIANGLES;
    var count = 3 * currTri; // number of elements (vertices)
    gl.drawArrays(primitiveType, 0, count);

    requestAnimationFrame(draw);
}

window.onload = initialize;

// decide the triangles' number basing on current triangle slider's value
window.FindTriNumber = function() {
    currTri = parseInt(document.querySelector("#sliderTri").value);
    // console.log(currTri);
}

// toggle
window.checkToggle = function() {
    if(document.getElementById("toggle_color").checked){
        is_checked=1;
        console.log("toggle-checked " + is_checked);

    }else{
        is_checked=0;
        console.log("toggle-unchecked " + is_checked);
    }
}