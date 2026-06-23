export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  emoji: string;
}

export const events: TimelineEvent[] = [
  {
    date: "Enero 2023",
    title: "El primer hola",
    description: "El día que todo empezó. Un mensaje, una sonrisa, y el mundo cambió para siempre.",
    emoji: "✨",
  },
  {
    date: "Febrero 2023",
    title: "Primera cita",
    description: "Nervios, risas y una conversación que duró horas. Supe que eras especial.",
    emoji: "🌹",
  },
  {
    date: "Abril 2023",
    title: "Te dije que te quería",
    description: "Las palabras más importantes que he dicho. Y tú ya lo sabías.",
    emoji: "💛",
  },
  {
    date: "Julio 2023",
    title: "Nuestro primer viaje",
    description: "Perdidos en el mapa pero completamente encontrados el uno en el otro.",
    emoji: "🗺️",
  },
  {
    date: "Diciembre 2023",
    title: "Navidad juntos",
    description: "La primera de muchas. Las luces brillaban pero tú brillabas más.",
    emoji: "🕯️",
  },
  {
    date: "2024",
    title: "Construyendo nuestro mundo",
    description: "Cada día sumando recuerdos, cada momento un regalo.",
    emoji: "🏡",
  },
];
