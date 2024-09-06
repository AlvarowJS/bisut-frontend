// ** React Imports
import React, { useEffect, useState } from "react";

import { Fragment, lazy } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import Home from "../../views/home/Home";
import bdAdmin from "../../api/bdAdmin";
import Cliente from "../../views/clientes/Cliente";
import Usuario from "../../views/usuarios/Usuario";
import Familia from "../../views/almacen/familias/Familia";
import Grupo from "../../views/almacen/grupo/Grupo";
import Marca from "../../views/almacen/marca/Marca";
import Tienda from "../../views/almacen/tienda/Tienda";
import Proveedor from "../../views/proveedor/Proveedor";
import Producto from "../../views/almacen/productos/Producto";
import Kardex from "../../views/almacen/kardex/Kardex";


// import OperacionesTrans from "../../views/operaciones/OperacionesTrans";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Error = lazy(() => import("../../views/Error"));

const AuthGuard = ({ children }) => {

  const [myRol, setMyRol] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const objToken = { token: token }

    bdAdmin.post('/token-auth', objToken, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setMyRol(res?.data?.role_id)
        const rol = res?.data?.role?.role_number

        if (!token) {
          navigate("/login");
        } else {
          // Aquí debe validar su token con su servidor para asegurarse de que es válido
          // Si el token no es válido, llame a "navigate" para redirigir al usuario a la página de inicio de sesión
          if (rol == "1") {
          }
          else {
            const restrictedRoutes = ["/"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          }
        }


      })
      .catch(err => console.log(err))

  }, [])

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

// const navigate = useNavigate();
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,

  },
  {
    path: "/home",
    element: <AuthGuard><Home /></AuthGuard>,
  },
  {
    path: "/clientes",
    element: <AuthGuard><Cliente /></AuthGuard>,
  },
  {
    path: "/usuarios",
    element: <AuthGuard><Usuario /></AuthGuard>,
  },
  // Proveedor
  {
    path: "/proveedor",
    element: <AuthGuard><Proveedor /></AuthGuard>,
  },
  // Productos
  {
    path: "/inventario/producto",
    element: <AuthGuard><Producto /></AuthGuard>,
  },
  {
    path: "/inventario/grupo",
    element: <AuthGuard><Usuario /></AuthGuard>,
  },
  {
    path: "/inventario/familias",
    element: <AuthGuard><Familia /></AuthGuard>,
  },
  {
    path: "/inventario/grupos",
    element: <AuthGuard><Grupo /></AuthGuard>,
  },
  {
    path: "/inventario/marcas",
    element: <AuthGuard><Marca /></AuthGuard>,
  },
  {
    path: "/inventario/tiendas",
    element: <AuthGuard><Tienda /></AuthGuard>,
  },
  {
    path: "/inventario/producto",
    element: <AuthGuard><Usuario /></AuthGuard>,
  },
  {
    path: "/inventario/kardex",
    element: <AuthGuard><Kardex /></AuthGuard>,
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },

  },

];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;
        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
