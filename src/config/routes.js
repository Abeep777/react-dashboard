import { Route, Routes } from "react-router-dom";
import HomeScreen from "../containers/HomeScreen";
import UserScreen from "../containers/UserScreen";
import QuestionScreen from "../containers/QuestionScreen";

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<HomeScreen/>}></Route>
            <Route path='/questions' element={<QuestionScreen/>}></Route>
            <Route path='/user' element={<UserScreen/>}></Route>
        </Routes>
    )
}

export default AppRoutes