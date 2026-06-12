import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-4">
      <Link to="/" className="hover:text-[#345246] transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5" />
          {item.link ? (
            <Link to={item.link} className="hover:text-[#345246] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#345246] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
