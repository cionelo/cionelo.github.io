# Portfolio Background Video Setup Guide

## Video File Locations
Place your portfolio videos at:
- `assets/videos/portfolio-bg.mp4` (primary video)
- `assets/videos/portfolio-bg-2.mp4` (secondary video)

**Note:** The portfolio page randomly selects one of these videos on each page load.

## Video Specifications

### Recommended Settings:
- **Format**: MP4 (H.264 codec)
- **Orientation**: Portrait (9:16 or similar)
- **Resolution**: 1080x1920 (or higher for 4K displays)
- **Duration**: 15-30 seconds (loops seamlessly)
- **File Size**: Keep under 5MB for optimal loading
  - Use lower bitrate for web
  - Compress using tools like HandBrake or Adobe Media Encoder

### Optimization Tips:
1. **Compression**: Use H.264 codec with moderate compression
   - Target bitrate: 2-4 Mbps for web
   - Use two-pass encoding for better quality

2. **Loop Seamlessly**:
   - Ensure the last frame blends with the first frame
   - Consider fade transitions at loop points

3. **Content**:
   - Choose visually engaging but not distracting footage
   - Avoid fast motion or rapid cuts (can be jarring when looped)
   - Consider subtle highlights or game footage

4. **Testing**:
   - Test on mobile devices (automatically plays at 20% opacity)
   - Desktop displays at 30% opacity
   - Ensure text remains readable over all frames

## How It Works

The video implementation includes:
- **Autoplay**: Starts automatically when page loads
- **Muted**: No audio (required for autoplay)
- **Loop**: Continuous playback
- **Playsinline**: Prevents fullscreen on mobile Safari
- **Opacity Control**:
  - Desktop: 30% opacity
  - Mobile: 20% opacity (better performance + readability)
- **Dark Overlay**: Gradient overlay ensures text readability

## Fallback
If video doesn't load or isn't supported:
- Background gradient remains visible
- No visual errors or broken elements
- Page functions normally without video

## Directory Structure
```
cionelo.github.io-master/
├── assets/
│   ├── videos/
│   │   ├── portfolio-bg.mp4    ← Primary video
│   │   └── portfolio-bg-2.mp4  ← Secondary video (random selection)
```

## Alternative Video Formats (Optional)
For maximum browser compatibility, you can add WebM format:

```html
<video class="bg-video-player" autoplay muted loop playsinline>
    <source src="assets/videos/portfolio-bg.webm" type="video/webm">
    <source src="assets/videos/portfolio-bg.mp4" type="video/mp4">
</video>
```

## Performance Notes
- Video loads asynchronously (doesn't block page render)
- Reduced opacity on mobile saves battery
- Modern browsers handle this efficiently
- Consider adding `loading="lazy"` for below-the-fold videos
