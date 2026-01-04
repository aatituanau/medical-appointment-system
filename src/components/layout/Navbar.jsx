import logoH from "../../assets/logoH.png";

const Navbar = () => (
  <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center h-16">
        <div className="flex items-center gap-3">
          <img src={logoH} alt="Logo Hospital" className="h-10 w-auto" />
          <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
          <h2 className="text-sm font-bold leading-tight text-slate-700 text-center">
            HOSPITAL DEL DÍA
            <br />
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
              Universidad Central del Ecuador
            </span>
          </h2>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
