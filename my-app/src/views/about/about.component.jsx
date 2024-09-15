import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.styles.css';
//import axios from 'axios';


const About = () => {

  const [expandedFAQs, setExpandedFAQs] = useState([]); 
  const navigate = useNavigate();

  

  const toggleFAQ = (index) => {
    setExpandedFAQs((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) 
        : [...prev, index] 
    );
  };

  return (
    <div className="about-container">
      <div className="intro-aboutus">
        <h1>Sobre Nosotros</h1>
        <h2>Las mascotas transforman nuestras vidas. Buscamos cambiar la tuya.</h2>
        <p>
          Misión Salvando Huellitas es una organización sin fines de lucro dedicada a rescatar, albergar y reubicar animales abandonados, enfermos y heridos en toda la ciudad.
          Con tu ayuda, esperamos marcar una diferencia en la vida de estos maravillosos animales.
        </p>
      </div>
      
      <div className="team">
        <h2>Conoce a Nuestro Equipo</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="https://mvsnoticias.com/u/fotografias/m/2024/5/31/f960x540-625345_699420_5050.png" alt="Nombre 1" />
            <div className="team-info">
              <h3>Cecilia</h3>
              <p>Directora de la organización</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://i0.wp.com/ensedeciencia.com/wp-content/uploads/2022/08/Copia-de-C-EdCiencia-P-15-1.jpg?resize=800%2C451&ssl=1" alt="Nombre 2" />
            <div className="team-info">
              <h3>Marta</h3>
              <p>Gerenta de Operaciones</p>
            </div>
          </div>
          <div className="team-member">
            <img src="https://www.lavanguardia.com/files/image_990_484/uploads/2020/02/26/5fa904a395baf.png" alt="Nombre 3" />
            <div className="team-info">
              <h3>Ricardo</h3>
              <p>Veterinario</p>
            </div>
          </div>
        </div>
      </div>

      <div className="faq">
        <h2>Preguntas frecuentes</h2>
        <ul>
          {[
            { question: "¿Qué debo considerar antes de adoptar un perro?", answer: "Considere su estilo de vida, el espacio de su hogar y si tiene tiempo para dedicarlo al cuidado y entrenamiento del perro. Además, evalúa tu situación financiera, ya que tener un perro implica gastos de alimentación, atención médica y otras necesidades." },
            { question: "¿Qué tipo de perro es el más adecuado para mi familia?", answer: "Depende de su entorno y estilo de vida. Las razas más pequeñas y con poca energía pueden ser adecuadas para apartamentos, mientras que los perros más grandes y más activos pueden necesitar un hogar con espacio al aire libre y un dueño que disfrute de las actividades al aire libre." },
            { question: "¿Qué debo esperar durante el proceso de adopción?", answer: "El proceso de adopción puede incluir completar formularios, entrevistas y, en algunos casos, una visita al hogar para garantizar que sea un ambiente adecuado para el perro. Es posible que también tengas que pagar una tarifa de adopción." },
            { question: "¿Qué incluye la tarifa de adopción?", answer: "La tarifa generalmente cubre la esterilización/castración, las vacunas, la colocación de microchips y, a veces, un chequeo veterinario inicial. Esta tarifa ayuda a cubrir los costos operativos del refugio." },
            { question: "¿Cómo puedo preparar mi casa para la llegada de un perro?", answer: "Asegúrate de tener suministros básicos: una cama, tazones de comida y agua, una correa, un collar y juguetes. Designa un espacio seguro y cómodo para que el perro se sienta seguro a su llegada." },
            { question: "¿Qué debo hacer durante los primeros días con mi nuevo perro?", answer: "Permita que su perro se adapte a su nuevo entorno a su propio ritmo. Establezca una rutina de alimentación, paseos y descanso. Ten paciencia mientras empieza a aclimatarse y a conocer su nuevo hogar." },
            { question: "¿Cómo presento un perro adoptado a otras mascotas en el hogar?", answer: "Introdúzcalos gradualmente en un entorno controlado. Mantenga a ambos animales atados inicialmente y observe su comportamiento. Supervise todas las interacciones hasta que esté seguro de que se llevan bien." },
          ].map((faq, index) => (
            <li key={index}>
              <strong onClick={() => toggleFAQ(index)}>
                {faq.question} 
              </strong>
              <span className="caret">{expandedFAQs.includes(index) ? '-' : '+'}</span>
              {expandedFAQs.includes(index) && <span>{faq.answer}</span>}
            </li>
          ))}
        </ul>
      </div>

  
      
      <div className="back-button-container">
        <button className="button" onClick={() => navigate('/home')}>Inicio</button>        
      </div>
    </div>
  );
};

export default About;
