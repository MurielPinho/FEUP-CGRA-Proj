#ifdef GL_ES
precision highp float;
#endif

varying vec4 position;
varying vec2 vTextureCoord; 

uniform sampler2D colorTex;
uniform sampler2D uSampler;
uniform float scale;

void main() {

	vec4 color = texture2D(uSampler,vTextureCoord+vec2(0.01, 0.01));
	vec4 color1 = texture2D(colorTex,  vec2(0.01, 0.0 - position.z/scale));
	
	gl_FragColor = color*0.9+color1*0.9;
}