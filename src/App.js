import React, { useState, useEffect, useCallback } from 'react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaMoon, FaSun } from 'react-icons/fa';
import profileImage from './assets/commis.jpg';
import './App.css';

import gallery1 from './assets/gallery1.jpg';
import gallery2 from './assets/gallery2.jpg';
import gallery3 from './assets/gallery3.jpg';
import gallery4 from './assets/gallery4.jpg';
import huerto1 from './assets/huerto1.jpg';

import video1 from './assets/video1.mp4';
import video2 from './assets/video2.mp4';
import video3 from './assets/video3.mp4';

const Section = ({ id, title, children }) => (
  <section id={id} className={`section ${id}`} style={{ background: 'var(--dark-bg)', color: 'var(--lightest)' }}>
    <div className="container">
      <div className="section-header" data-aos="fade-up">
        <h2 className="section-title">
          <span className="title-number">0{['about', 'experience', 'skills', 'contact'].indexOf(id) + 1}.</span>
          {title}
        </h2>
        <div className="section-divider"></div>
      </div>
      {children}
    </div>
  </section>
);

const Gallery = ({ images }) => (
  <div className="gallery-container">
    {images.map((img, index) => (
      <div key={index} className="gallery-item" data-aos="fade-up" data-aos-delay={index * 100}>
        <img src={img.src} alt={img.alt} style={{ height: '500px' }} />
        <p className="gallery-caption">{img.caption}</p>
      </div>
    ))}
  </div>
);

const VideoGallery = ({ videos }) => (
  <div className="video-gallery">
    {videos.map((videoSrc, index) => (
      <div key={index} className="video-item" data-aos="fade-up" data-aos-delay={index * 100}>
        <video controls width="100%">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support HTML5 videos.
        </video>
      </div>
    ))}
  </div>
);

const ExperienceList = ({ experiences }) => (
  <div className="experience-list">
    {experiences.map((exp, index) => (
      <div key={index} className="experience-item" data-aos="fade-up" data-aos-delay={index * 100}>
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
      <div key={index} className="skill-item" data-aos="fade-up" data-aos-delay={index * 50}>
        <div className="skill-icon">{skill.icon}</div>
        <span className="skill-name">{skill.name}</span>
      </div>
    ))}
  </div>
);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const personalInfo = {
    name: "Diego Alday",
    profession: "General vineyard worker",
    email: "aldaydiego12@gmail.com",
    about: "My name is Diego Alday, I am 30 years old and I speak english at a B1, I have work experience in vineyards. I spent 4 months working in Beaune, France, where I was involved in tasks such as vine leaf trimming, grape harvesting, and loading and unloading fruit. Additionally, I have experience in agricultural field work such as harvesting tomatoes, potatoes, and beans, as well as general maintenance of vegetable gardens.",
    gallery: [
      { src: gallery1, alt: "Vineyard image 1", caption: "" },
      { src: gallery2, alt: "Vineyard image 2", caption: "" },
      { src: gallery3, alt: "Vineyard image 3", caption: "" },
      { src: gallery4, alt: "Vineyard image 4", caption: "" },
      { src: huerto1, alt: " trabajo 1", caption: "Harvesting tomatoes and potatoes" },
    ],
    videos: [video1, video2, video3],
    experiences: [
      {
        company: "Pernand Presta",
        position: "Vineyard and field worker",
        period: "March 2024 - March 2025",
        description: "General work in vineyards and gardens: grape harvesting, leaf pruning, loading/unloading, tomato/potato/bean harvesting, and garden maintenance. Experience adquired in Beaune, France."
      }
    ],
    skills: [
      { name: "Pruning and Leaf Trimming", icon: "✂️" },
      { name: "Grape Harvesting", icon: "🍇" },
      { name: "Fruit Sorting", icon: "📦" },
      { name: "Loading and Unloading", icon: "🚜" },
      { name: "Teamwork", icon: "🤝" },
      { name: "Physical Stamina", icon: "💪" },
      { name: "Tomato Harvesting", icon: "🍅" },
      { name: "Potato Harvesting", icon: "🥔" },
      { name: "Bean Harvesting", icon: "🫘" },
      { name: "Garden Maintenance", icon: "🌱" }
    ],
    phoneDisplay: "+33 7 59 63 65 02",
    whatsappLink: "https://wa.me/33759636502"
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out-quad', once: true });
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
              {['about', 'experience', 'skills', 'contact'].map((item) => (
                <li key={item} className={activeSection === item ? 'active' : ''}>
                  <a href={`#${item}`}>
                    {{
                      about: 'About Me',
                      experience: 'Experience',
                      skills: 'Skills',
                      contact: 'Contact'
                    }[item]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-text" data-aos="fade-up">
                <h4>Hello, my name is</h4>
                <h1>{personalInfo.name}</h1>
                <h2>{personalInfo.profession}</h2>
              </div>
              <div className="hero-image-wrapper" data-aos="fade-left">
                <div className="hero-image-container">
                  <div className="hero-image" style={{ width: '500px', height: '450px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={profileImage} alt={personalInfo.name} className="profile-image" onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/320x320?text=Diego+Alday';
                    }} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Section id="about" title="About Me">
          <p>{personalInfo.about}</p>
          <div className="gallery-section">
            <h4>My work in pictures:</h4>
            <Gallery images={personalInfo.gallery} />
          </div>
          <div className="video-section">
            <h4>My work in video:</h4>
            <VideoGallery videos={personalInfo.videos} />
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ExperienceList experiences={personalInfo.experiences} />
        </Section>

        <Section id="skills" title="Skills">
          <SkillList skills={personalInfo.skills} />
        </Section>

        <Section id="contact" title="Contact">
          <div className="contact-content" data-aos="fade-up">
            <h3>Interested in my profile?</h3>
            <a href={`mailto:${personalInfo.email}`} className="email-button">
              {personalInfo.email}
            </a>
            <br />
            <a
              href={personalInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
              style={{
                display: 'inline-block',
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#25D366',
                color: 'white',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              WhatsApp: {personalInfo.phoneDisplay}
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default App;
