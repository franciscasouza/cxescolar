// Footer.jsx
import './Footer.css';
import logoFooter from '../../assets/2023Logo_PMVV_horiz_b_v.svg'; 

function Footer() {
  return (
    <footer className="footer">
    <img src={logoFooter} alt="Logo do Rodapé" className="footer-logo" />
    <p>© 2025 Desenvolvido por Secretaria Municipal de Tecnologia e Inovação.</p>
  </footer>
  );
}

export default Footer;
