import { apiService } from "./apiService";
import { urls } from "@/lib/config";

const menuService = {
    getAll: () => apiService.get(urls.menu.getAll).then(res => res.data),
    getById: (menuId: number) => apiService.get(urls.menu.getById(menuId)).then(res => res.data),
    create: (data: FormData | object) => apiService.post(urls.menu.create, data).then(res => res.data),
    update: (menuId: number, data: FormData | object) => apiService.patch(urls.menu.update(menuId), data).then(res => res.data),
    delete: (menuId: number) => apiService.delete(urls.menu.delete(menuId)).then(res => res.data),
};

export { menuService };
