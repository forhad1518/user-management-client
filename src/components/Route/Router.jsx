import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import AllUsers from "../AllUser/AllUsers";
import FormUser from "../UserForm/FormUser";
import EditUser from "../editUser/EditUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        children: [
            {
                path: '/',
                element: <AllUsers></AllUsers>,
                loader: () => fetch('https://user-management-server-eight-sepia.vercel.app/users')
            },
            {
                path: 'newuser',
                element: <FormUser></FormUser>
            },
            {
                path: 'users/:id',
                element: <EditUser></EditUser>,
                loader: ({params}) => fetch(`https://user-management-server-eight-sepia.vercel.app/users/${params.id}`)
            }
        ]
    }
])

export default router;