const Footer = () => (
  <footer className="py-6 md:py-10 bg-slate-50 border-t border-slate-200 text-center px-4">
    <p className="text-slate-500 text-[10px] sm:text-xs font-medium max-w-2xl mx-auto">
      © 2025 Hospital del Día - Universidad Central del Ecuador. Todos los
      derechos reservados.
    </p>
    <div className="mt-3 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-slate-400">
      <a className="hover:text-primary transition-colors" href="#">
        Política de Privacidad
      </a>
      <a className="hover:text-primary transition-colors" href="#">
        Términos de Uso
      </a>
      <a className="hover:text-primary transition-colors" href="#">
        Soporte Técnico
      </a>
    </div>
  </footer>
);

export default Footer;
