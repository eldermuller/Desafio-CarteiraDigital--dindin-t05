import SignIn from './Pages/Sign_In/Sign_in'
import SignUp from './Pages/Sign_Up/Sign_up';
import Main from './Pages/Main/Main';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/main' element={<Main />} />
            <Route element={<ProtectedRoutes redirectTo={'/'} />}>
            </Route>
        </Routes>
    )
}