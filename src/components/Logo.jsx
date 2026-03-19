import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-2 shrink-0 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E8627A] to-[#C04060] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
          <span className="text-lg">
            <img src={logo} />
          </span>
        </div>
        <div className="leading-tight">
          <span
            className="block font-bold text-[#3D1C2C] tracking-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
            }}
          >
            Sanzida's Cake
          </span>
          <span className="block text-[9px] text-[#8B7070] tracking-widest uppercase -mt-0.5">
            Artisan Bakery
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
