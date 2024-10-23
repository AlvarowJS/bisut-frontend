import { File, Tag, FileText, BarChart, UserCheck, Table, Edit, UserMinus, Home, User, Box, ShoppingBag, ShoppingCart } from "react-feather";

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
    id: "Ventas",
    title: "Ventas",
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: "Generar Factura",
        title: "Generar Factura",
        icon: <Tag size={20} />,
        navLink: "/ventas/generar-factura",
      },
    ]
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
        id: "Ubicaciones",
        title: "Ubicaciones",
        icon: <FileText size={20} />,
        navLink: "/inventario/ubicacion",
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
  },
  {
    id: "Compras",
    title: "Compras",
    icon: <ShoppingBag size={20} />,
    navLink: "/compras",
  },
];

