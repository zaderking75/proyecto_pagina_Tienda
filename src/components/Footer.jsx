import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>Sobre Nosotros</h3>
                    <p>Somos una tienda online comprometida con ofrecer los mejores productos de plantas carnivoras </p>
                </div>
                <div className="footer-section links">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">Preguntas Frecuentes</a></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="#" className="social-icon facebook" title="Facebook" aria-label="Facebook"></a>
                        <a href="#" className="social-icon twitter" title="Twitter" aria-label="Twitter"></a>
                        <a href="#" className="social-icon instagram" title="Instagram" aria-label="Instagram"></a>
                        <a href="#" className="social-icon linkedin" title="LinkedIn" aria-label="LinkedIn"></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &#169; 2025 Tienda. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;