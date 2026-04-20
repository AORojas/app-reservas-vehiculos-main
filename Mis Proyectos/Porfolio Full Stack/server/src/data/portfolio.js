export const portfolioData = {
  hero: {
    badge: "Disponible para nuevos proyectos",
    title: "Desarrollador full stack construyendo experiencias web dinámicas y escalables",
    description:
      "Este portfolio está pensado para crecer junto a mis proyectos. Combina un frontend moderno, backend robusto y una base flexible para mostrar tecnologías, formación y trabajo real."
  },
  highlights: [
    { label: "Frontend moderno", value: "React + Tailwind" },
    { label: "Backend flexible", value: "Node o Spring Boot" },
    { label: "Bases de datos", value: "MongoDB + PostgreSQL" },
    { label: "Arquitectura", value: "Escalable" }
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        {
          name: "HTML",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          accent: "orange"
        },
        {
          name: "Tailwind CSS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
          accent: "sky"
        },
        {
          name: "JavaScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          accent: "yellow"
        },
        {
          name: "React JS",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          accent: "cyan"
        }
      ]
    },
    {
      category: "Backend",
      items: [
        {
          name: "Node.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          accent: "green"
        },
        {
          name: "Express",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
          accent: "slate",
          invertOnDark: true
        }
      ]
    },
    {
      category: "Java Ecosystem",
      items: [
        {
          name: "Java",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
          accent: "amber"
        },
        {
          name: "Spring Boot",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
          accent: "emerald"
        }
      ]
    },
    {
      category: "Databases",
      items: [
        {
          name: "MongoDB",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
          accent: "green"
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          accent: "blue"
        }
      ]
    }
  ],
  projects: [
    {
      title: "Juegos Rápidos",
      type: "Frontend",
      year: "2026",
      description:
        "Arcade web desarrollado con HTML, CSS y JavaScript vanilla que centraliza minijuegos propios y clásicos retro en una sola experiencia, con contenido dinámico desde JSON y una interfaz visual con identidad marcada.",
      stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      image: "/projects/juegos-rapidos.png",
      liveUrl: "https://juegosrapidos.netlify.app/",
      repoUrl: "https://github.com/AORojas/JuegosRapidos",
      highlights: [
        "Carga juegos y catálogo retro desde archivos JSON para mantener el contenido escalable y fácil de actualizar.",
        "Integra modales, selección aleatoria de juegos y embebidos externos para mejorar exploración e interacción.",
        "Demuestra enfoque en UI visual, lógica de interfaz y despliegue de un sitio estático listo para publicar."
      ],
      featured: true
    }
  ],
  education: [
    {
      category: "Educación",
      title: "Analista en Informática",
      institution: "Universidad Nacional del Oeste (UNO) - Merlo, Buenos Aires, GBA",
      period: "marzo 2021 - junio 2026",
      description:
        "Actualmente cursando la etapa final de la carrera, con dos materias finalizadas para recibirme en junio de 2026."
    },
    {
      category: "Educación",
      title: "Licenciatura en Informática",
      institution: "Universidad Nacional del Oeste (UNO) - Merlo, Buenos Aires, GBA",
      period: "marzo 2021 - diciembre 2027",
      description:
        "Formación académica orientada a fortalecer bases teóricas y prácticas en informática, desarrollo de software y resolución de problemas."
    },
    {
      category: "Cursos",
      title: "Java Backend",
      institution: "Talento Tech",
      period: "agosto 2025 - diciembre 2025",
      description:
        "Capacitación enfocada en desarrollo backend con Java, aplicando fundamentos de programación, lógica de negocio y construcción de APIs."
    },
    {
      category: "Cursos",
      title: "Backend Node.js",
      institution: "Talento Tech",
      period: "marzo 2026 - junio 2026",
      description:
        "Formación actual en backend con Node.js, centrada en APIs, manejo de rutas, lógica del servidor e integración con bases de datos."
    }
  ],
  contact: {
    email: "tu-email@ejemplo.com",
    location: "Buenos Aires, Argentina"
  }
};
