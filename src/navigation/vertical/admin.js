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
    id: "Productos",
    title: "Productos",
    icon: <Box size={20} />,
    navLink: "/productos",
    children: [
      {
        id: "ListaProductos",
        title: "Lista de Productos",
        icon: <Tag size={20} />,
        navLink: "/productos/lista",
      },
      {
        id: "NuevoProducto",
        title: "Agregar Producto",
        icon: <FileText size={20} />,
        navLink: "/productos/nuevo",
      }
    ]
  }
];

