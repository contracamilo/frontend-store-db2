# Aplicación de carrito

## Índice

1. [Introducción](#introducción)
2. [Descripción General](#descripción-general)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
    - [Requisitos Previos](#requisitos-previos)
    - [Clonación del Repositorio](#clonación-del-repositorio)
    - [Instalación de Dependencias](#instalación-de-dependencias)
    - [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
6. [Componentes Principales](#componentes-principales)
    - [Navbar](#navbar)
    - [ProductList](#productlist)
    - [ProductCategory](#productcategory)
    - [Cart](#cart)
7. [Tipos y Modelos](#tipos-y-modelos)
8. [API y Llamadas al Backend](#api-y-llamadas-al-backend)
9. [Rutas y Navegación](#rutas-y-navegación)
10. [Estilos y CSS Modules](#estilos-y-css-modules)
11. [Pruebas y Calidad](#pruebas-y-calidad)
12. [Consideraciones Finales](#consideraciones-finales)
13. [Recursos Adicionales](#recursos-adicionales)

---

## Introducción

Esta documentación describe el frontend de una aplicación de tienda desarrollada con **React** y **TypeScript**. La aplicación permite a los usuarios visualizar productos, buscar por categoría, agregar productos al carrito y simular una compra.

## Descripción General

La aplicación frontend se encarga de la interfaz de usuario y la interacción con el backend a través de llamadas a una API REST. Implementa las siguientes funcionalidades:

- **Ver todos los productos**: Muestra una lista de productos disponibles.
- **Buscar productos por categoría**: Permite filtrar productos por categoría.
- **Agregar productos al carrito**: Los usuarios pueden seleccionar productos para agregarlos al carrito de compras.
- **Ver el contenido del carrito**: Muestra los productos agregados al carrito y permite gestionar cantidades.
- **Realizar una compra**: Simula el proceso de compra al interactuar con el backend.

## Tecnologías Utilizadas

- **React** con **TypeScript** para una mejor tipificación y mantenimiento del código.
- **React Router** para la navegación entre rutas.
- **Axios** para realizar llamadas a la API del backend.
- **CSS Modules** para estilos locales y modularizados.
- **Jest** y **React Testing Library** para pruebas unitarias y de integración.

## Estructura del Proyecto

```
src/
├── api/                   # Lógica para llamadas al backend
│   └── api.ts
├── components/            # Componentes reutilizables y estilizados
│   ├── Cart/
│   │   ├── CartContainer.tsx
│   │   ├── CartView.tsx
│   │   ├── Cart.module.css
│   │   └── Cart.test.tsx
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.module.css
│   │   └── Navbar.test.tsx
│   ├── ProductCategory/
│   │   ├── ProductCategoryContainer.tsx
│   │   ├── ProductCategoryView.tsx
│   │   ├── ProductCategory.module.css
│   │   └── ProductCategory.test.tsx
│   └── ProductList/
│       ├── ProductListContainer.tsx
│       ├── ProductListView.tsx
│       ├── ProductList.module.css
│       └── ProductList.test.tsx
├── types/                 # Tipos globales utilizados en el proyecto
│   └── productTypes.ts
├── App.tsx
├── index.tsx
└── setupTests.ts          # Configuración para Jest y React Testing Library
```

## Instalación y Configuración

### Requisitos Previos

- **Node.js** (versión 12 o superior)
- **npm** o **yarn**

### Clonación del Repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/tienda-app-frontend.git
cd tienda-app-frontend
```

### Instalación de Dependencias

Instala las dependencias del proyecto:

```bash
npm install
# o con yarn
yarn install
```

### Ejecución de la Aplicación

Inicia la aplicación en modo de desarrollo:

```bash
npm start
# o con yarn
yarn start
```

La aplicación estará disponible en `http://localhost:3000`.

## Componentes Principales

### Navbar

- **Archivo**: `components/Navbar/Navbar.tsx`
- **Descripción**: Barra de navegación principal que permite acceder a diferentes secciones de la aplicación.
- **Características**:
    - Enlaces a la página principal, categorías y carrito.
    - Indicador del número de items en el carrito.
- **Estilos**: `Navbar.module.css`

### ProductList

- **Archivos**:
    - Contenedor: `components/ProductList/ProductListContainer.tsx`
    - Vista: `components/ProductList/ProductListView.tsx`
- **Descripción**: Muestra la lista completa de productos disponibles.
- **Características**:
    - Obtiene los productos desde el backend a través de la API.
    - Permite agregar productos al carrito.
- **Estilos**: `ProductList.module.css`

### ProductCategory

- **Archivos**:
    - Contenedor: `components/ProductCategory/ProductCategoryContainer.tsx`
    - Vista: `components/ProductCategory/ProductCategoryView.tsx`
- **Descripción**: Muestra productos filtrados por una categoría específica.
- **Características**:
    - Obtiene productos por categoría desde el backend.
    - Navegación entre diferentes categorías.
- **Estilos**: `ProductCategory.module.css`

### Cart

- **Archivos**:
    - Contenedor: `components/Cart/CartContainer.tsx`
    - Vista: `components/Cart/CartView.tsx`
- **Descripción**: Gestiona y muestra el contenido del carrito de compras.
- **Características**:
    - Muestra los productos agregados al carrito con sus cantidades.
    - Permite modificar cantidades o eliminar productos.
    - Botón para proceder a la compra.
- **Estilos**: `Cart.module.css`

## Tipos y Modelos

- **Archivo**: `types/productTypes.ts`
- **Descripción**: Define interfaces y tipos utilizados en el proyecto para una mejor tipificación.
- **Ejemplo**:

  ```typescript
  export interface Product {
    _id: string;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
  }

  export interface CartItem {
    product: Product;
    cantidad: number;
  }
  ```

## API y Llamadas al Backend

- **Archivo**: `api/api.ts`
- **Descripción**: Contiene funciones para realizar llamadas al backend usando Axios.
- **Configuración de Axios**:

  ```typescript
  import axios from 'axios';

  const api = axios.create({
    baseURL: 'http://localhost:5000', // URL del backend
  });

  export default api;
  ```

- **Funciones Ejemplo**:

  ```typescript
  // Obtener todos los productos
  export const getAllProducts = async () => {
    const response = await api.get('/productos');
    return response.data;
  };

  // Obtener productos por categoría
  export const getProductsByCategory = async (categoria: string) => {
    const response = await api.get(`/productos/categoria/${categoria}`);
    return response.data;
  };
  ```

## Rutas y Navegación

- **Archivo**: `App.tsx`
- **Descripción**: Configura las rutas de la aplicación utilizando React Router.
- **Implementación**:

  ```tsx
  import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  import Navbar from './components/Navbar/Navbar';
  import ProductListContainer from './components/ProductList/ProductListContainer';
  import ProductCategoryContainer from './components/ProductCategory/ProductCategoryContainer';
  import CartContainer from './components/Cart/CartContainer';

  function App() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductListContainer} />
          <Route path="/categoria/:categoria" component={ProductCategoryContainer} />
          <Route path="/carrito" component={CartContainer} />
        </Switch>
      </Router>
    );
  }

  export default App;
  ```

## Estilos y CSS Modules

- **Descripción**: Se utilizan CSS Modules para estilos locales y evitar conflictos de nombres.
- **Uso**:

  ```tsx
  // Importación de estilos en un componente
  import styles from './ProductList.module.css';

  function ProductListView() {
    return (
      <div className={styles.productList}>
        {/* Contenido */}
      </div>
    );
  }
  ```

- **Ventajas**:
    - Encapsulamiento de estilos.
    - Nombres de clases únicos generados automáticamente.
    - Facilidad de mantenimiento y escalabilidad.

## Pruebas y Calidad

- **Herramientas**:
    - **Jest**: Framework de pruebas para JavaScript.
    - **React Testing Library**: Utilidades para probar componentes React.
- **Configuración**:
    - Archivo de configuración: `setupTests.ts`.
- **Archivos de Prueba**:
    - Ubicados junto a los componentes correspondientes con extensión `*.test.tsx`.
- **Ejemplo de Prueba**:

  ```tsx
  // components/Navbar/Navbar.test.tsx
  import { render, screen } from '@testing-library/react';
  import Navbar from './Navbar';

  test('renders navbar with logo', () => {
    render(<Navbar />);
    const logoElement = screen.getByAltText(/logo/i);
    expect(logoElement).toBeInTheDocument();
  });
  ```

- **Ejecución de Pruebas**:

  ```bash
  npm test
  # o con yarn
  yarn test
  ```

## Consideraciones Finales

- **Gestión de Estado**: Para aplicaciones más complejas, considera implementar un gestor de estado global como Redux o Context API.
- **Validaciones y Manejo de Errores**:
    - Asegura que el usuario reciba feedback adecuado en caso de errores en las llamadas a la API.
    - Implementa validaciones en formularios y entradas de usuario.
- **Optimización**:
    - Utiliza React.memo y useCallback para optimizar el rendimiento.
    - Considera la carga perezosa (lazy loading) de componentes pesados.

## Recursos Adicionales

- **Documentación de React**: [https://es.reactjs.org/docs/getting-started.html](https://es.reactjs.org/docs/getting-started.html)
- **TypeScript con React**: [https://www.typescriptlang.org/docs/handbook/react.html](https://www.typescriptlang.org/docs/handbook/react.html)
- **React Router**: [https://reactrouter.com/web/guides/quick-start](https://reactrouter.com/web/guides/quick-start)
- **Axios**: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)
- **React Testing Library**: [https://testing-library.com/docs/react-testing-library/intro/](https://testing-library.com/docs/react-testing-library/intro/)
- **CSS Modules**: [https://github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)

---

**Nota**: Esta documentación se centra exclusivamente en la aplicación frontend desarrollada con React. Para información sobre el backend o la base de datos, consulta la documentación correspondiente.