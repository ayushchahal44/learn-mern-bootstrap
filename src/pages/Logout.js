import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config/config";
import { useDispatch } from "react-redux";
import { CLEAR_USER } from "../redux/user/actions";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${serverEndpoint}/auth/logout`, {}, {
                withCredentials: true
            });
            document.cookie = `jwToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            dispatch({
                type: CLEAR_USER
            });
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);
}

export default Logout;