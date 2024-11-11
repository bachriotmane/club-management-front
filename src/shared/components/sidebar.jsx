import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  Bars3Icon,
  XMarkIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { sidebar } from "../../util";
import fsts from "../../assets/fsts.png";
 
export function Sidebar() {
  const [isOpened, setIsOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setIsOpened(!isOpened);
  };

    const toggleSidebar = () => {
        setIsOpened(!isOpened);
    };

 
  return (
    <div className={`h-[100vh] m-2 `}>

        <div className="md:hidden p-4 absolute top-0 left-0 z-50 text-[#00407D] ">
            {
                isOpened ?
                 <XMarkIcon onClick={toggleSidebar} className="h-6 w-6" />
                 : 
                 <Bars3Icon onClick={toggleSidebar} className="h-6 w-6" />

            }
        </div>
        <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
            <img src={fsts} alt="logo" className="w-16 h-16 mx-auto" />
            </Typography>
        </div>
        <Card className={`md:block flex flex-row justify-center items-center ${isOpened ? 'absolute' : 'hidden'}  md:w-64 h-[100vh] w-full md:max-w-[16rem] rounded-t-2xl p-4 bg-[#E49F13]`}>
        <List className="flex flex-col justify-between h-[80%]">
            {/* <Accordion
            open={open === 1}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
            }
            >
            <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <ListItem>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                </ListItem>
                </List>
            </AccordionBody>
            </Accordion>
            <Accordion
            open={open === 2}
            icon={
                <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
            }
            >
            <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                <List className="p-0">
                <ListItem>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                </ListItem>
                </List>
            </AccordionBody>
            </Accordion> */}
            <div>
            {
                sidebar.map((item, index) => (
                    <Link to={item.to}>
                    <ListItem
                     onClick={() => handleItemClick(index)}
                     className={`flex justify-start mr-3 gap-6 ${activeIndex === index ? 'bg-white w-[235px] rounded-l-3xl font-bold  mr-3'  : ''}`}
                     key={index}>
                        <ListItemPrefix>
                            {item.icon}
                        </ListItemPrefix>
                        {item.title}
                    </ListItem>
                    </Link>
                ))
            }
            </div>
            <div>
                <ListItem className="flex justify-start gap-6" >
                    <ListItemPrefix>
                        <Cog8ToothIcon  className="h-5 w-5" />
                    </ListItemPrefix>
                    <Link to='/parametre'>Parametre</Link>
                    </ListItem>
                <ListItem className="flex justify-start gap-6 bg-[#00407D] text-[#E49F13] rounded-2xl" >
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </div>
        </List>
        </Card>
    </div>
  );
}