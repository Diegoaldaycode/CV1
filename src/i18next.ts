// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Aquí es donde defines los idiomas y sus traducciones
const resources = {
  en: {
    translation: {
      headerName: "Your Name",
      headerJob: "Web Developer | Graphic Designer | Marketing Professional",
      headerContact: "Email: your.email@domain.com | Phone: +123 456 789",
      aboutTitle: "About Me",
      aboutText: "I am a professional passionate about web design and development. I have experience working on high-impact projects and am always looking for new ways to improve and learn.",
      experienceTitle: "Experience",
      experienceItem1Title: "Web Developer - Company X",
      experienceItem1Text: "2019 - Present. Description of your responsibilities and achievements.",
      educationTitle: "Education",
      educationItem1: "Bachelor in Graphic Design",
      skillsTitle: "Skills",
      skillsList: "HTML, CSS, JavaScript, Adobe Photoshop, Illustrator, Project Management",
    }
  },
  es: {
    translation: {
      headerName: "Tu Nombre",
      headerJob: "Desarrollador Web | Diseñador Gráfico | Profesional de Marketing",
      headerContact: "Correo: tu.email@dominio.com | Teléfono: +123 456 789",
      aboutTitle: "Acerca de mí",
      aboutText: "Soy un profesional apasionado por el diseño web y el desarrollo. Tengo experiencia trabajando en proyectos de alto impacto y siempre busco nuevas formas de mejorar y aprender.",
      experienceTitle: "Experiencia",
      experienceItem1Title: "Desarrollador Web - Empresa X",
      experienceItem1Text: "2019 - Actualidad. Descripción de tus responsabilidades y logros.",
      educationTitle: "Educación",
      educationItem1: "Licenciatura en Diseño Gráfico",
      skillsTitle: "Habilidades",
      skillsList: "HTML, CSS, JavaScript, Adobe Photoshop, Illustrator, Gestión de proyectos",
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // idioma por defecto
  interpolation: {
    escapeValue: false, // react ya hace el escape de los valores
  },
});

export default i18n;
