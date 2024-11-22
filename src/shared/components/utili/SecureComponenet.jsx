import { getUser } from "../../../auth/auth.js";
import { useEffect, useState } from "react";
import axiosInstance from "../../../auth/axios.js";

const SecureComponent = ({ role, clubId, requiredClubRole, children }) => {
    const currentUser = getUser();
    const [userRolesInClubs, setUserRolesInClubs] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);

    if(!currentUser.authorities.includes(role)) {
        return null;
    }

    useEffect(() => {

        const fetchCurrentUserRoles = async () => {

            try {

                if (currentUser && currentUser.id) {
                    const { data: clubRolesResponse } = await axiosInstance.get(
                        `/clubs/${currentUser.id}/roles`
                    );
                    console.log(clubRolesResponse)

                    setUserRolesInClubs(clubRolesResponse); // Expecting an array of clubs with roles
                }
            } catch (error) {
                console.error("Error fetching user roles:", error);
            }
        };

        fetchCurrentUserRoles().then();
    }, []);

    useEffect(() => {
        const checkAuthorization = () => {
            let authorized = false;

            // Global role check
            if (role && currentUser.authorities?.includes(role)) {
                authorized = true;
            }

            // Club-specific role check
            if (clubId && requiredClubRole) {
                const club = userRolesInClubs.find((club) => club.clubId === clubId);
                if (club && club.userRole === requiredClubRole) {
                    authorized = true;
                }
            } else if(!requiredClubRole){
                // Check for 'ADMIN' role in any club if no clubId is provided
                const hasAdminRole = userRolesInClubs.some((club) => club.userRole === "ADMIN");
                if (hasAdminRole) {
                    authorized = true;
                }
            }else if(requiredClubRole) {
                authorized = userRolesInClubs.some((club) => club.userRole === requiredClubRole);
                console.log("Salam ",authorized)
            }

            setIsAuthorized(authorized);
        };
        if (currentUser) {
            checkAuthorization();
        }
    }, [currentUser, role, clubId, requiredClubRole, userRolesInClubs]);

    if (!isAuthorized) {
        return null;
    }
    return <>{children}</>;
};

export default SecureComponent;
