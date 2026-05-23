import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Page404 = lazy(() => import('../pages/Page404.jsx'))
const Users = lazy(() => import('../pages/Dashboard/users/UsersPage.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const Roles = lazy(() => import('../pages/Dashboard/roles/RolesPage.jsx'))
const Permissions = lazy(() => import('../pages/Dashboard/permissions/PermissionsPage.jsx'))
const Categories = lazy(() => import('../pages/Dashboard/categories/CategoriesPage.jsx'))
const Products = lazy(() => import('../pages/Dashboard/products/ProductsPage.jsx'))
const Discounts = lazy(() => import('../pages/Dashboard/discounts/DiscountsPage.jsx'))

// Importamos tu módulo de órdenes (apuntando a la carpeta nueva que creaste)
const ModuloOrdenes = lazy(() => import('../components/orders/ModuloOrdenes.jsx'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 */
const routes = [
    {
        path: 'users',
        component: Users,
    },
    {
        path: 'roles',
        component: Roles
    },
    {
        path: 'permissions',
        component: Permissions
    },
    {
        path: 'products',
        component: Products
    },
    {
        path: 'categories',
        component: Categories
    },
    {
        path: 'discounts',
        component: Discounts
    },
    {
        path: 'ordenes', 
        component: ModuloOrdenes
    },
    {
        path: '404',
        component: Page404,
    },
    {
        path: 'login',
        component: Login
    }
]

export default routes