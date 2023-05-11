import {createBrowserRouter} from "react-router-dom";
import Layout from "../layout/layout";
import TipoList from "../components/tipo/tipo-list";
import ProvinciaList from "../components/provincia/provincia-list";

export const route = createBrowserRouter([
    {
        path: "",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <div>
                        Bienvenido
                        <p>
                            Sitios de Interés Turístico le brinda un listado de lugares interesantes que usted debe visitar.
                        </p>
                        <p>
                            Esta interfaz se ha generado usando REACT.<br/>
                            Es una biblioteca Javascript de código abierto diseñada para construir interfaces de usuario (web, móvil o escritorio).<br/>
                            Consta de 3 entidades relacionadas (Tipos de Sitio, Provincias y Sitios).
                        </p>
                    </div>,
            },
            {
                path: "tipos/",
                element: <TipoList/>,
            },
            {
                path: "provincias/",
                element: <ProvinciaList/>,
            },
            {
                path: "sitios/",
                element: <div>Listado de Sitios</div>,
            }]
    },
])