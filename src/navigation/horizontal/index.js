import { File, Tag, FileText, BarChart, Table, Edit, UserMinus, UserCheck, Home, User } from "react-feather";

export default [
  {
    id: "Home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "Clientes",
    title: "Clientes",
    icon: <UserMinus size={20} />,
    navLink: "/clientes",
  },
  {
    id: "Usuarios",
    title: "Usuarios",
    icon: <User size={20} />,
    navLink: "/usuarios",
  }
];
