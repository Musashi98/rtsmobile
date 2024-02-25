import { DbUser } from "../../system/types/DbUser";
import { AppUser } from "../types/AppUser";

const UserConverter = {
    appUserToDbUser: (user: AppUser): DbUser => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            selfies: user.selfies
        }
    }
}

export default UserConverter