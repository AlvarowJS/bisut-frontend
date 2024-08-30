import { File, Tag, FileText, BarChart, UserCheck, Table, Edit, UserMinus, Home, User, Box } from "react-feather";

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
  },
  {
    id: "Proveedor",
    title: "Proveedor",
    icon: <User size={20} />,
    navLink: "/proveedor",
  },
  {
    id: "Inventario",
    title: "Inventario",
    icon: <Box size={20} />,    
    children: [
      {
        id: "Productos",
        title: "Productos",
        icon: <Tag size={20} />,
        navLink: "/inventario/producto",
      },
      
      {
        id: "Tiendas",
        title: "Tiendas",
        icon: <FileText size={20} />,
        navLink: "/inventario/tiendas",
      },
      {
        id: "Familias",
        title: "Familias",
        icon: <FileText size={20} />,
        navLink: "/inventario/familias",
      },
      {
        id: "Grupos",
        title: "Grupos",
        icon: <FileText size={20} />,
        navLink: "/inventario/grupos",
      },
      {
        id: "Marcas",
        title: "Marcas",
        icon: <FileText size={20} />,
        navLink: "/inventario/marcas",
      },
      {
        id: "Kardex",
        title: "Kardex",
        icon: <FileText size={20} />,
        navLink: "/inventario/kardex",
      }
    ]
  }
];

