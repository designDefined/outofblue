const defaultURL = "https://d26ncn7nshn3ph.cloudfront.net";

export function getVideoURL(name: string, quality: 480 | 1920 = 480) {
  return `${defaultURL}/${name}_${quality}.mp4`;
}

export function getAudioURL(name: string) {
  return `${defaultURL}/${name}.wav`;
}
