import { FC } from "react";
import { useAuth } from "../../../../../../api/services/auth/utils/context/hook.ts";
import { useNavigate } from "react-router-dom";
import { pathSearch } from "../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../routing.ts";

const ProfileView: FC = () => {
    const navigate = useNavigate()
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        navigate(pathSearch(mainLayoutRouting, "main=>index", {}))
    }

    return (
        <>
            <button className="btn btn-custom-primary" onClick={ handleLogout }>Logout</button>
        </>
    )
}

export default ProfileView;
