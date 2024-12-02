import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { sidebar } from "../../util";

export function Sidebar() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Charger l'index actif depuis sessionStorage au montage
  useEffect(() => {
    const savedIndex = sessionStorage.getItem("activeIndex");
    if (savedIndex !== null) {
      setActiveIndex(parseInt(savedIndex, 10)); // S'assurer que la valeur est un nombre
    }
  }, []);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    sessionStorage.setItem("activeIndex", index); // Sauvegarder l'index dans sessionStorage
    setIsOpened(!isOpened);
  };

  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  const toggleDesktopSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  return (
    <div className={`m-2 h-full`}>
      <div className="md:hidden p-4 absolute top-0 left-0 z-50 text-[#00407D]">
        {isOpened ? (
          <XMarkIcon onClick={toggleSidebar} className="h-6 w-6" />
        ) : (
          <Bars3Icon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      <Card
        className={`hidden md:flex flex-col bg-[#E49F13] h-full transition-width duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
          <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleDesktopSidebar}
            className="text-white text-lg font-bold flex items-center gap-1"
          >
            {isSidebarCollapsed ? (
              <>
                <span>&gt;&gt;</span>
              </>
            ) : (
              <>
                <span>&lt;&lt;</span>
              </>
            )}
          </button>
        </div>
        <List className="flex flex-col justify-between h-full">
          <div>
            {sidebar.map((item, index) => (
              <Link to={item.to} key={index}>
                <ListItem
                  onClick={() => handleItemClick(index)}
                  className={`flex justify-start mr-3 gap-6 ${
                    activeIndex === index
                      ? `bg-white rounded-l-3xl font-bold mr-3 ${isSidebarCollapsed ? "w-16" : "w-[235px]"}`
                      : ""
                  }`}                  
                  key={index}
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  {!isSidebarCollapsed && item.title}
                </ListItem>
              </Link>
            ))}
          </div>
          <div>
            <ListItem className="flex justify-start gap-6">
              <ListItemPrefix>
                <Cog8ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/parametre">{!isSidebarCollapsed && "Paramètres"}</Link>
            </ListItem>
            <ListItem className="flex justify-start gap-6 bg-[#00407D] text-[#E49F13] rounded-2xl">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              {!isSidebarCollapsed && "Déconnexion"}
            </ListItem>
          </div>
        </List>
      </Card>
    </div>
  );
}
