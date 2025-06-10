export interface IUpdateUserData {
    email?: string;
    name?: string;
    surname?: string;
    phone?: string;
}

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}