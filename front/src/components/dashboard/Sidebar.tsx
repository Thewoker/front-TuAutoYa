import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/helpers/AuthContext";

interface SidebarProps {
  activeTab: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, role }) => {
  const router = useRouter();
  const isCustomer = role === "customer"
  console.log("isCustomer", activeTab);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    router.push("/");
  };
  return (
    <div className="hidden md:flex w-1/4 h-screen bg-white border-r">
      <div className="mx-auto py-10">
        {/* <h1 className="text-2xl font-bold mb-10 text-emerald-950 cursor-pointer">
          Mi perfil
        </h1> */}
        <ul>
          <li>
            <Link href='/'
              className={`flex space-x-2 mt-10 cursor-pointer ${activeTab === 'home' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
                }`}
            >
              <span className="font-semibold">Home</span>
            </Link>
          </li>
          <li>
            <Link href='/dashboard/reservas-pasadas'
              className={`flex space-x-2 mt-10 cursor-pointer ${activeTab === '/reservas-pasadas' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
                }`}
            >
              <span className="font-semibold">Reservas Pasadas</span>
            </Link>
          </li>
          <li>
            <Link href='/dashboard/reservas-pendientes'
              className={`flex space-x-2 mt-10 cursor-pointer ${activeTab === '/reservas-pendientes' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
                }`}
            >
              <span className="font-semibold">Reservas Pendientes</span>
            </Link>
          </li>
          {!isCustomer &&
            (<li>
              <Link href='/dashboard/proveedor'
                className={`flex space-x-2 mt-10 cursor-pointer ${activeTab === '/proveedor' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
                  }`}
              >
                <span className="font-semibold">Proveedor</span>
              </Link>
            </li>)}
          {isCustomer &&
            (<li

              className={`flex space-x-2 mt-10 cursor-pointer ${activeTab === '/unete' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
                }`}
            >
              <Link href="/dashboard/unete">
                <span className="font-semibold cursor-pointer text-emerald-950 hover:text-sky-500">
                  Únete como Proveedor
                </span>
              </Link>
            </li>)}

          <li
            className={`flex space-x-2  cursor-pointer ${activeTab === '/perfil' ? 'text-sky-500' : 'text-emerald-950 hover:text-sky-500'
              }`}
          >

            <Link
              href="/dashboard/perfil"
              className="flex space-x-2 mt-10 cursor-pointer text-emerald-950 hover:text-sky-500"
            >
              <span className="font-semibold">Perfil</span>
            </Link>

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
