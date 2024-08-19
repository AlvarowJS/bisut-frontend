import { File, Tag, FileText, BarChart, Table, Edit, UserMinus, UserCheck, Home } from "react-feather";

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
  }
];
