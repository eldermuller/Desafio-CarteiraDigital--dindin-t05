import Main from './Pages/Main/Main'
import SignIn from './Pages/Sign_In/Sign_in'
import SignUp from './Pages/Sign_Up/Sign_up';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = true;

    isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo={'/'} />}>
                <Route path='/main' element={<Main />} />
            </Route>
        </Routes>
    )
}