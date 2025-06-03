import { apiService } from "./apiService";
import {urls} from "@/lib/config";

interface UpdateUserData {
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
}

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

const userService = {
    getById: (userId: number) => apiService.get(urls.users.getById(userId)),

    updateUser: (userId: number, data: UpdateUserData) =>
        apiService.patch(urls.users.updateUser(userId), data).then(res => res.data),

    changePassword: (data: ChangePasswordData) =>
        apiService.post(urls.users.changePassword, data).then(res => res.data),
};

export { userService };
