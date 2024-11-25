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
        className={`md:block flex flex-row justify-center items-center ${
          isOpened ? "" : "hidden"
        } md:w-64 h-full w-full md:max-w-[16rem] rounded-t-2xl rounded-b-none  p-4 bg-[#E49F13]`}
      >
        <List className="flex flex-col justify-between h-full">
          <div>
            {sidebar.map((item, index) => (
              <Link to={item.to} key={index}>
                <ListItem
                  onClick={() => handleItemClick(index)}
                  className={`flex justify-start mr-3 gap-6 ${
                    activeIndex === index
                      ? "bg-white w-[235px] rounded-l-3xl font-bold mr-3"
                      : ""
                  }`}
                  key={index}
                >
                  <ListItemPrefix>{item.icon}</ListItemPrefix>
                  {item.title}
                </ListItem>
              </Link>
            ))}
          </div>
          <div>
            <ListItem className="flex justify-start gap-6">
              <ListItemPrefix>
                <Cog8ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Link to="/parametre">Paramètres</Link>
            </ListItem>
            <ListItem className="flex justify-start gap-6 bg-[#00407D] text-[#E49F13] rounded-2xl">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Déconnexion
            </ListItem>
          </div>
        </List>
      </Card>
    </div>
  );
}
