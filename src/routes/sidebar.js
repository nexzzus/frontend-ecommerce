/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
        path: '/app/users', // the url
        icon: 'UsersIcon', // the component being exported from icons/index.js
        name: 'Usuarios', // name that appear in Sidebar
    },
    {
        path: '/app/roles',
        icon: 'RolesIcon',
        name: 'Roles',
    },
    {
        path: '/app/permissions',
        icon: 'PermissionsIcon',
        name: 'Permisos',
    }
]

export default routes
