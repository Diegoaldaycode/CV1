import React, { useState, useEffect, useCallback } from 'react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import profileImage from './assets/commis.jpeg';
import './App.css';

// Agregamos importaciones para imágenes de la galería (debes crear estas imágenes en tu carpeta assets)
import gallery1 from './assets/gallery1.jpeg';
import gallery2 from './assets/gallery2.jpeg';
import gallery3 from './assets/gallery3.jpeg';
import gallery4 from './assets/gallery4.jpeg';

const Section = ({ id, title, children }) => (
  <section id={id} className={`section ${id}`}>
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <h2 className="section-title">
          <span className="title-number">0{['about', 'experience', 'skills', 'projects', 'contact'].indexOf(id) + 1}.</span>
          {title}
        </h2>
        <div className="section-divider"></div>
      </div>
      {children}
    </div>
  </section>
);

// Nuevo componente para la galería
const Gallery = ({ images }) => (
  <div className="gallery-container">
    {images.map((img, index) => (
      <div 
        key={index} 
        className="gallery-item"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <img src={img.src} alt={img.alt} />
        <p className="gallery-caption">{img.caption}</p>
      </div>
    ))}
  </div>
);

const ExperienceList = ({ experiences }) => (
  <div className="experience-list">
    {experiences.map((exp, index) => (
      <div 
        key={index} 
        className="experience-item"
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <div className="exp-header">
          <h3>{exp.position} <span className="company">@ {exp.company}</span></h3>
          <span className="period">{exp.period}</span>
        </div>
        <p className="description">{exp.description}</p>
      </div>
    ))}
  </div>
);

const SkillList = ({ skills }) => (
  <div className="skills-grid">
    {skills.map((skill, index) => (
      <div 
        key={index} 
        className="skill-item"
        data-aos="fade-up"
        data-aos-delay={index * 50}
      >
        <div className="skill-icon">{skill.icon}</div>
        <span className="skill-name">{skill.name}</span>
      </div>
    ))}
  </div>
);

const ProjectList = ({ projects }) => (
  <div className="projects-grid">
    {projects.map((project, index) => (
      <div 
        key={index} 
        className="project-card"
        data-aos="fade-up"
        data-aos-delay={index * 150}
      >
        <div className="project-image">
          <div className="image-overlay"></div>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-links">
          <a href="#" className="project-link">Ver Demo</a>
          <a href="#" className="project-link">Código</a>
        </div>
      </div>
    ))}
  </div>
);

const Footer = ({ name }) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <p>Desarrollado con ❤️ por {name}</p>
        <div className="social-links">
          <a href="#"><FaGithub /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const personalInfo = {
    name: "Diego Alday",
    profession: "commis de cuisine",
    email: "hola@diegoperez.dev",
    about: "Currently in France with a Work and Holiday visa valid until June 2025. I have 4 months of experience working in vineyards in the Beaune region, mainly performing vine pruning, branch cutting and burning, working 9-hour days under various weather conditions.",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    },
    gallery: [
      {
        src: gallery1,
        alt: "Trabajo en cocina 1",
        caption: "Preparación de platos gourmet"
      },
      {
        src: gallery2,
        alt: "Trabajo en cocina 2",
        caption: "Presentación de platillos"
      },
      {
        src: gallery3,
        alt: "Trabajo en equipo",
        caption: "Colaboración con equipo de cocina"
      },
      {
        src: gallery4,
        alt: "Evento especial",
        caption: "Participación en evento culinario"
      }
    ],
    experiences: [
      {
        company: "Restaurante Gourmet",
        position: "Commis de Cuisine",
        period: "2023 - Presente",
        description: "Preparación de ingredientes, mise en place y asistencia en la elaboración de platos bajo la supervisión del chef de partie."
      },
      {
        company: "Bistro Francés",
        position: "Aprendiz de Cocina",
        period: "2021 - 2023",
        description: "Introducción a las técnicas básicas de cocina francesa y preparación de ingredientes."
      }
    ],
    skills: [
      { name: "Cocina Francesa", icon: "🍳" },
      { name: "Mise en Place", icon: "🔪" },
      { name: "Preparación", icon: "🥕" },
      { name: "Presentación", icon: "🍽️" },
      { name: "Trabajo en Equipo", icon: "👨‍🍳" },
      { name: "Higiene", icon: "🧼" }
    ],
    projects: [
      {
        name: "Menú Estacional",
        description: "Desarrollo de un menú de temporada con ingredientes locales."
      },
      {
        name: "Evento Gastronómico",
        description: "Participación en la planificación y ejecución de un evento culinario."
      }
    ]
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-quad',
      once: true
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="particles-container">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "transparent" },
            particles: {
              color: { value: darkMode ? "#64ffda" : "#3a7bd5" },
              links: {
                color: darkMode ? "#64ffda" : "#3a7bd5",
                distance: 150,
                enable: true,
                opacity: 0.4
              },
              move: { enable: true },
              number: { value: 30 },
              opacity: { value: 0.5 },
              size: { value: 3 }
            }
          }}
        />
      </div>

      <aside className="sidebar">
        <div className="sidebar-content">
          <div className="logo">DA</div>
          <nav className="sidebar-nav">
            <ul>
              {['about', 'experience', 'skills', 'projects', 'contact'].map((item) => (
                <li 
                  key={item} 
                  className={activeSection === item ? 'active' : ''}
                >
                  <a href={`#${item}`}>
                    {item === 'about' && 'Sobre mí'}
                    {item === 'experience' && 'Experiencia'}
                    {item === 'skills' && 'Habilidades'}
                    {item === 'projects' && 'Proyectos'}
                    {item === 'contact' && 'Contacto'}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-text" data-aos="fade-up">
                <h4>Hola, mi nombre es</h4>
                <h1>{personalInfo.name}</h1>
                <h2>{personalInfo.profession}</h2>
                <p>{personalInfo.about}</p>
                <a 
                  href="#contact" 
                  className="cta-button"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Contáctame
                </a>
              </div>
              <div className="hero-image-wrapper" data-aos="fade-left">
                <div className="hero-image-container">
                  <div className="hero-image">
                    <img 
                      src={profileImage} 
                      alt={personalInfo.name}
                      className="profile-image"
                      style={{
                        transform: "scale(1.4)",
                        objectPosition: "50% 35%"
                      }}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/300x300?text=Diego+Alday';
                      }}
                    />
                  </div>
                  <div className="image-border"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Section id="about" title="Sobre Mí">
          <div className="about-content" data-aos="fade-up">
            <p>{personalInfo.about}</p>
            
            {/* Nueva sección de galería */}
            <div className="gallery-section">
              <h4>Mi trabajo en imágenes:</h4>
              <Gallery images={personalInfo.gallery} />
            </div>
          </div>
        </Section>
        
        <Section id="experience" title="Experiencia">
          <ExperienceList experiences={personalInfo.experiences} />
        </Section>
        
        <Section id="skills" title="Habilidades">
          <SkillList skills={personalInfo.skills} />
        </Section>
        
        <Section id="projects" title="Proyectos">
          <ProjectList projects={personalInfo.projects} />
        </Section>
        
        <Section id="contact" title="Contacto">
          <div className="contact-content" data-aos="fade-up">
            <h3>¿Interesado en mi perfil?</h3>
            <a href={`mailto:${personalInfo.email}`} className="email-button">
              {personalInfo.email}
            </a>
          </div>
        </Section>
        
        <Footer name={personalInfo.name} />
      </main>
    </div>
  );
};

export default App;