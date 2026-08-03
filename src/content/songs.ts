export interface Song {
  title: string;
  artist: string;
  dedication: string;
  url?: string; // Spotify, YouTube, etc.
  emoji: string;
}

export const songs: Song[] = [
  {
    title: "EL PLAN PERFECTO",
    artist: "Pablo Lacadeire",
    dedication: "Porque contigo todo cobra sentido, como las linternas que iluminan la oscuridad.",
    url: "https://open.spotify.com/intl-es/track/3vQgvDLEcXFB3DQ25OWwlQ?si=7837f1b9d2064221",
    emoji: "🏮",
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    dedication: "Porque eres la melodía que hace que mi corazón lata más rápido y mis días sean más brillantes.",
    url: "https://open.spotify.com/intl-es/track/0tgVpDi06FyKpA1z0VMD4v?si=215e19bc3d404c9a",
    emoji: "✨",
  },
  {
    title: "Amor bonito",
    artist: "Kany García",
    dedication: "Porque tu amor es un regalo que ilumina mi vida y me hace sentir completo.",
    url: "https://open.spotify.com/intl-es/track/30ZakrQPwfjyrkiJfxGey9?si=9bc77eac104643a7",
    emoji: "💖",
  },
];
