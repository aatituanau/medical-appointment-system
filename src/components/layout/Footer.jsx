const Footer = () => (
  <footer className="py-10 bg-slate-50 border-t border-slate-200 text-center">
    <p className="text-slate-500 text-xs font-medium">
      © 2025 Hospital del Día - Universidad Central del Ecuador. Todos los
      derechos reservados.
    </p>
    <div className="mt-3 flex justify-center gap-6 text-xs text-slate-400">
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
