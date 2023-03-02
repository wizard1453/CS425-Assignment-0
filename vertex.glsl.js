export default `#version 300 es

in vec2 position;
in vec4 color;

uniform int is_checked;

flat out int checked;
out vec4 vColor;

void main() {
  
  vColor = color;

  checked = is_checked;

  gl_Position = vec4(position.xy, 0, 1);
}
`;