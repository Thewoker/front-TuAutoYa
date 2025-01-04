import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, role }) => {
  const router = useRouter();
  const isCustomer = role === "customer"
  console.log("isCustomer", isCustomer);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("authToken");
    router.push("/");
  };
  return (
    <div className="hidden md:flex w-1/4 h-screen bg-white border-r">
      <div className="mx-auto py-10">
        {/* <h1 className="text-2xl font-bold mb-10 text-emerald-950 cursor-pointer">
          Mi perfil
        </h1> */}
        <ul>
          <Link href='/'
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'home' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('home')}
          >
            <span className="font-semibold">Home</span>
          </Link>
          <li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'reservations' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('reservations-past')}
          >
            <span className="font-semibold">Reservas Pasadas</span>
          </li>
          <li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'reservations' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('reservations-pend')}
          >
            <span className="font-semibold">Reservas Pendientes</span>
          </li>
          {!isCustomer && 
          (<li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'reservations' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('supplier')}
          >
            <span className="font-semibold">Proveedor</span>
          </li>)}
          {isCustomer &&
          (<li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'reservations' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('join_us')}
          >
            <span className="font-semibold">Unete como Proveedor</span>
          </li>)}
          <li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'payments' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('payments')}
          >
            <span className="font-semibold">Mis Pagos</span>
          </li>
          <li 
            className={`flex space-x-2 mt-10 cursor-pointer ${
              activeTab === 'profile' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
            }`}
            onClick={() => onTabChange('profile')}
          >
            <span className="font-semibold">Perfil</span>
          </li>
        </ul>
        <button 
        className="mt-10 w-full bg-amber-400 text-emerald-950 rounded-full py-2 hover:text-sky-500"
        onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

