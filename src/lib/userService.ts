import {apiService} from "./apiService";
import {urls} from "@/lib/config";
import {IChangePasswordData, IUpdateUserData} from "@/types/user.type";

const userService = {
    getById: (userId: number) => apiService.get(urls.users.getById(userId)),

    updateUser: (userId: number, data: IUpdateUserData) =>
        apiService.patch(urls.users.updateUser(userId), data).then(res => res.data),

    changePassword: (data: IChangePasswordData) =>
        apiService.post(urls.users.changePassword, data).then(res => res.data),
};

export { userService };
