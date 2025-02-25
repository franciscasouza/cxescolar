const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-zinc-50 text-center py-3 text-gray-700 dark:text-gray-300 text-sm">
      © {new Date().getFullYear()} Desenvolvido por Secretaria Municipal de
      Tecnologia e Inovação. Todos os direitos reservados.
    </footer>
  );
};

export default Footer;
