# Frontend E-Commerce — Aplicación de Gestión de Usuarios
Cliente web en **React** con **Tailwind CSS** que consume la API REST del backend. Incluye **login de demostración**, **layout con menú lateral colapsable**, **tema oscuro/claro**, y **CRUD** de usuarios.
---
## Tabla de contenidos
1. [Stack tecnológico](#stack-tecnológico)
2. [Requisitos previos](#requisitos-previos)
3. [Estructura de carpetas del repositorio](#estructura-de-carpetas-del-repositorio)
4. [Cómo obtener el proyecto (clonar o copiar)](#cómo-obtener-el-proyecto-clonar-o-copiar)
5. [Instalación paso a paso](#instalación-paso-a-paso)
6. [Configuración de la URL del API](#configuración-de-la-url-del-api)
7. [Cómo ejecutar en desarrollo](#cómo-ejecutar-en-desarrollo)
8. [Cómo compilar para producción](#cómo-compilar-para-producción)
9. [Arquitectura de la aplicación React](#arquitectura-de-la-aplicación-react)
10. [Rutas y navegación](#rutas-y-navegación)
11. [Componentes y convenciones](#componentes-y-convenciones)
12. [Problemas frecuentes](#problemas-frecuentes)
---
## Stack tecnológico
| Tecnología | Uso |
|------------|-----|
| **React 19** | Framework SPA, componentes funcionales, hooks |
| **Vite** | Herramienta de construcción rápida, servidor de desarrollo |
| **Tailwind CSS** | Utilidades CSS para diseño responsivo y temas |
| **React Router v7** | Rutas, navegación, componentes de página |
| **Axios** | Cliente HTTP para llamadas REST |
| **React Hook Form** | Gestión eficiente de formularios reactivos |
| **React Hot Toast** | Notificaciones emergentes (toasts) |
| **React Icons** | Iconografía con Heroicons y otros |
| **Zustand** | Gestión de estado ligera (almacén) |
| **React Context API** | Estado global (autenticación, tema, sidebar) |
| **JWT Decode** | Decodificación de tokens JWT |
---
## Requisitos previos
- **Node.js** LTS (recomendado v18 o superior): https://nodejs.org
- **npm** (viene con Node)
- Navegador moderno (Chrome, Firefox, Safari, Edge)
---
## Estructura de carpetas
```
frontend-ecommerce/
├── src/
│   ├── main.jsx                     ← Punto de entrada
│   ├── App.jsx                      ← Componente raíz
│   ├── components/                  ← Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── login/LoginForm.jsx
│   │   ├── Sidebar/                 ← Sidebar colapsable
│   │   └── users/                   ← Tabla y formulario CRUD
│   ├── config/api.js                ← URL base del API
│   ├── context/                     ← Contextos (Auth, Theme, Sidebar)
│   ├── layout/Layout.jsx            ← Layout principal
│   ├── pages/                       ← Páginas de la aplicación
│   ├── routes/                      ← Definición de rutas
│   ├── services/                    ← Servicios HTTP (Auth, Users)
│   ├── store/                       ← Estado con Zustand
│   └── utils/icons.js              ← Mapeo de iconos
```
---
## Instalación
```bash
git clone <repo> frontend-ecommerce
cd frontend-ecommerce
npm install
```
---
## Configuración del API
- Edita **\src/config/api.js\**:
- const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
- export default API_URL;
- O crea **\.env.local\**:
- VITE_API_URL=http://tu-servidor:8000

---
## Ejecución
### Desarrollo
1. npm run dev
2. Abre http://localhost:5173 en el navegador.
### Producción
npm run build
npm run preview
---
## Stack Arquitectura
### Arranque
- **main.jsx**: punto de entrada
- **App.jsx**: componente raíz con proveedores de contextos y router
- Contextos: **AuthContext**, **ThemeContext**, **SidebarContext**
### Rutas
| Ruta | Protegida |
|------|-----------|
| /login | No |
| /app/* | Sí |
### Componentes principales
- **Header**: barra superior con tema y logout
- **Sidebar**: menú colapsable (Desktop/Mobile)
- **UserTable**: listado CRUD de usuarios
- **UserForm**: formulario para crear/editar
### Servicios
- **authService**: login/logout
- **userService**: GET, POST, PUT, DELETE usuarios
### Validación de formularios
Se usa **react-hook-form**:
const { register, handleSubmit, formState: { errors } } = useForm();
register('nombre', { required: 'Campo obligatorio' })
---
## Tema oscuro/claro
**ThemeContext** maneja:
- Estado isDark
- Clase dark en el elemento raíz
- Persistencia en localStorage
- Tailwind reconoce dark: para estilos
---
## Sidebar colapsable
**SidebarContext** gestiona:
- Estado isCollapsed
- Animación suave con Tailwind
- Ancho dinámico (expandido/colapsado)
- Persistencia en localStorage
---
## Autenticación
1. Login guarda token en localStorage
2. **AuthContext** mantiene user e isAuthenticated
3. Rutas protegidas validan autenticación
4. Token se incluye en header Authorization
---
## Problemas frecuentes
| Problema | Solución |
|----------|----------|
| CORS error | Configura CORS en el backend |
| Token inválido | Vuelve a loguearte |
| Tema no cambia | Verifica ThemeContextCreate.js |
| Sidebar desbordado | Ajusta breakpoints Tailwind |
| Toast no muestra | Verifica que hay \<Toaster />\ |
---

## Comandos
```bash
npm install      # Instalar dependencias
npm run dev      # Servidor desarrollo
npm run build    # Compilar producción
npm run preview  # Vista previa
npm run lint     # Linting
```
---
## Agregar nueva entidad
1. Crear servicio: \src/services/entityService.js\
2. Crear componentes: tabla y formulario
3. Crear página: \src/pages/Dashboard/entity/EntityPage.jsx\
4. Registrar ruta en \src/routes/index.js\
5. Agregar al sidebar en \src/routes/sidebar.js\
6. Agregar ícono en \src/utils/icons.js\
---

# Video CRUD Final
https://youtu.be/1pKFBwP4SsA

---
