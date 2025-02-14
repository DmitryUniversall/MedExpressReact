import LazyImage from "../../../../../../../utils/ui/LazyImage.tsx";
import { useAuth } from "../../../../../../../api/services/auth/utils/context/hook.ts";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import { pathSearch } from "../../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../../routing.tsx";

function formatDateString(dateStr: string): string {
    const isoStr = dateStr.includes(" ") ? dateStr.replace(" ", "T") : dateStr;
    const dateObj = new Date(isoStr);

    if (isNaN(dateObj.getTime())) throw new Error(`Invalid date string: ${ dateStr }`);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-indexed.
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${ year }-${ month }-${ day }`;
}


const ProfileOrdersSection = () => {
    const { t } = useTranslation([ "common", "profile" ])
    const navigate = useNavigate()
    const { user, logoutUser } = useAuth()

    if (!user) return <Navigate to={ pathSearch(mainLayoutRouting, "auth=>main", {}) }/>;

    const formattedCreatedAt = formatDateString(user.created_at)

    const handleLogout = () => {
        logoutUser();
        navigate(pathSearch(mainLayoutRouting, "main=>index", {}))
    }

    return (
        <>
            <div className="d-flex flex-column gap-3">
                <div className="card card-shadow-2 rounded-1 text-center">
                    <LazyImage
                        src="https://i1.sndcdn.com/avatars-000630284772-3v02yb-t500x500.jpg" // TODO: Store profile img
                        className="rounded-circle mx-auto d-block profile-photo"
                        alt="Profile Picture"
                    />

                    <h4 className="mt-3">{ user.first_name }</h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </p>
                    <button className="btn btn-outline-dark" onClick={ handleLogout }>{ t("common:logout_full") }</button>
                </div>
                <div className="card card-shadow-2 d-flex flex-column gap-4 rounded-1">
                <div>
                    <h4 className="fw-bold">{ t("profile:account_info") }</h4>
                    <div className="d-flex flex-column gap-1">
                        <span><strong>{ t("profile:email") }:</strong> { user.email }</span>
                        <span><strong>{ t("profile:created_at") }:</strong> { formattedCreatedAt }</span>
                        <span><strong>{ t("profile:delivery_address") }:</strong> Blue Bell Hill, 53 Fox Lane</span>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}


export default ProfileOrdersSection;
