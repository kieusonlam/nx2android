#version 450
// Android port: the game's frame scaled to the window with contrast-adaptive sharpening (DM_VK_SHARPEN, gfx_vk_present.c), in place of the linear blit. The centre and its
// four neighbours one source texel away, each a bilinear tap at the same fraction, so the kernel is the blit's picture sharpened over one source texel; each channel's
// negative lobe shrinks where the neighbourhood is near black or white (no halo past the range). p: one source texel in uv (x, y), the sharpness 0..1
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;
layout(set = 0, binding = 0) uniform sampler2D tex;
layout(push_constant) uniform Q { vec4 pos; vec4 uv; vec4 p; } q;
void main() {
    vec2 d = q.p.xy;
    vec3 c = texture(tex, uv).rgb;
    vec3 n = texture(tex, uv - vec2(0.0, d.y)).rgb, s = texture(tex, uv + vec2(0.0, d.y)).rgb;
    vec3 w = texture(tex, uv - vec2(d.x, 0.0)).rgb, e = texture(tex, uv + vec2(d.x, 0.0)).rgb;
    vec3 mn = min(c, min(min(n, s), min(w, e))), mx = max(c, max(max(n, s), max(w, e)));
    vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, vec3(1.0 / 1024.0)), 0.0, 1.0));
    vec3 k = amp * (-1.0 / mix(8.0, 5.0, q.p.z));
    color = vec4(clamp((c + k * (n + s + w + e)) / (1.0 + 4.0 * k), 0.0, 1.0), 1.0);
}
