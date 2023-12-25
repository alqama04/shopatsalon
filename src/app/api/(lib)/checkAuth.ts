import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
 

export const checkAdminPermission = async () => {
    const session = await getServerSession(options);
    if (session) {
        if (session.user.role.toString() === 'admin') {
            return session.user
        }
    }
    return false
};

export const isAuthenticated = async () => {
    const session = await getServerSession(options);
    if (session) {
        return session.user;
    } else return false
};