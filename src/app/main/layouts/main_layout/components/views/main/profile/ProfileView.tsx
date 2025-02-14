import { FC } from "react";
import "./profile.css"
import ProfileOrdersSection from "./components/ProfileOrdersSection.tsx";
import ProfileUserSection from "./components/ProfileUserSection.tsx";


const ProfileView: FC = () => {
    return (
        <div id="profile_view" className="h-100">
            <div className="m-4">
                <div className="row g-3">
                    <div className="col-12 col-lg-4">
                        <ProfileUserSection/>
                    </div>

                    <div className="col-12 col-lg-8">
                        <section>
                            <ProfileOrdersSection/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileView;
