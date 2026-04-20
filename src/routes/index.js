import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Page404 = lazy(() => import('../pages/Page404.jsx'))
const Users = lazy(() => import('../pages/Dashboard/users/UsersPage.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
    {
        path: 'users',
        component: Users,
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
