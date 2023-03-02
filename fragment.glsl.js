export default `#version 300 es
precision highp float;

in vec4 vColor;
flat in int checked;

out vec4 outColor;
uniform vec4 uColor;

void main() {

    if(checked==1){
        //json file colors
        outColor = vec4(vColor.rgb, vColor.a);
    }else if(checked==0){
        //from the sliders
        outColor = uColor;
    }
}
`;