"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { menuService } from "@/lib/menuService";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { baseURL } from "@/lib/config";
import { ImageCropDialog } from "./ImageCropDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IMenuItem } from "@/types/menu.type";

interface MenuFormProps {
    item: IMenuItem | null;
    onCloseAction: () => void;
    onSaveAction: () => void;
    userRole: string | null;
}

const normalizeImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (!url.startsWith("/")) url = "/" + url;
    return baseURL + url;
};

const categories = {
    SALADS_AND_SNACKS: "Салаты и закуски",
    SOUPS: "Супы",
    GRILL_DISHES: "Блюда на гриле",
    MAIN_HOT_DISHES: "Основные горячие блюда",
    PIZZA_AND_PIES: "Пицца и пироги",
    DESSERTS: "Десерты",
    DRINKS: "Напитки",
    EXTRAS: "Дополнительно",
} as const;

export default function MenuForm({
                                     item,
                                     onCloseAction,
                                     onSaveAction,
                                     userRole,
                                 }: MenuFormProps) {
    const [form, setForm] = useState({
        name: item?.name || "",
        description: item?.description || "",
        price: item?.price ?? "",
        category: item?.category || "SALADS_AND_SNACKS",
        visible: item?.visible ?? true,
        inStock: item?.inStock ?? true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        normalizeImageUrl(item?.imageUrl)
    );
    const [imgError, setImgError] = useState(false);

    const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const isAdmin = userRole === "ADMIN";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImgError(false);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setImageFile(file);
            setIsCropDialogOpen(true);
        }
    };

    const handleCropSave = (croppedFile: File) => {
        setImageFile(croppedFile);
        const objectUrl = URL.createObjectURL(croppedFile);
        setPreviewUrl(objectUrl);
        setIsCropDialogOpen(false);
    };

    const handleCropCancel = () => {
        if (imageFile && previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }
        setIsCropDialogOpen(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name === "price") {
            const priceValue = value === "" ? 0 : Number(value);
            setForm((prev) => ({ ...prev, price: priceValue }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleToggle = (key: "visible" | "inStock") => {
        setForm((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append("inStock", form.inStock ? "true" : "false");

        if (isAdmin) {
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("price", form.price.toString());
            formData.append("category", form.category);
            formData.append("visible", form.visible ? "true" : "false");

            if (imageFile) {
                formData.append("image", imageFile);
            }
        }

        return formData;
    };

    const handleSubmit = async () => {
        try {
            const formData = buildFormData();
            if (item) {
                await menuService.update(item.id, formData);
            } else {
                await menuService.create(formData);
            }
            toast.success(`Блюдо ${item ? "обновлено" : "добавлено"} успешно!`);
            onCloseAction();
            onSaveAction();
        } catch (e) {
            toast.error("Ошибка при сохранении. Проверьте данные и попробуйте снова.");
            console.error(e);
        }
    };

    const handleDelete = async () => {
        if (item) {
            try {
                await menuService.delete(item.id);
                toast.success("Блюдо успешно удалено");
                setIsDeleteDialogOpen(false);
                onCloseAction();
                onSaveAction();
            } catch {
                toast.error("Ошибка при удалении блюда");
            }
        }
    };

    const validImage = previewUrl && !imgError;

    return (
        <div className="max-h-[80vh] overflow-y-auto p-4">
            <h2 className="text-xl font-bold mb-4">
                {item ? "Редактировать" : "Добавить"} блюдо
            </h2>

            <div className="space-y-4">
                {isAdmin && (
                    <>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Название"
                        />
                        <Textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Описание"
                            className="min-h-[100px] resize-y"
                        />
                        <Input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Цена"
                        />
                        <div>
                            <Label htmlFor="category" className="mb-1">
                                Категория
                            </Label>
                            <Select
                                value={form.category}
                                onValueChange={(value) =>
                                    setForm((prev) => ({ ...prev, category: value }))
                                }
                            >
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(categories).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </>
                )}

                <div>
                    <Label>Изображение</Label>
                    <label
                        htmlFor="image-upload"
                        className={`relative group mt-1 block h-40 w-full overflow-hidden rounded border ${
                            isAdmin ? "cursor-pointer" : "cursor-default"
                        }`}
                    >
                        {validImage ? (
                            <>
                                <Image
                                    src={previewUrl!}
                                    alt="Фото блюда"
                                    fill
                                    className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                                    onError={() => setImgError(true)}
                                />
                                {isAdmin && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium">
                                        Заменить фото
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="relative flex h-full w-full items-center justify-center bg-gray-200">
                                <div className="z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
                                    {isAdmin ? "Загрузить фото" : "Нет изображения"}
                                </div>
                                {isAdmin && (
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
                                )}
                            </div>
                        )}
                    </label>
                    {isAdmin && (
                        <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Switch
                        checked={form.inStock}
                        onCheckedChange={() => handleToggle("inStock")}
                    />
                    <Label>В наличии</Label>
                </div>

                {isAdmin && (
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={form.visible}
                            onCheckedChange={() => handleToggle("visible")}
                        />
                        <Label>Отображать</Label>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <Button onClick={handleSubmit} className="w-full">
                    {item ? "Сохранить изменения" : "Добавить"}
                </Button>

                {isAdmin && item && (
                    <>
                        <Button
                            variant="destructive"
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="w-full"
                        >
                            Удалить
                        </Button>
                        <AlertDialog
                            open={isDeleteDialogOpen}
                            onOpenChange={setIsDeleteDialogOpen}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Вы действительно хотите удалить блюдо? Это действие нельзя
                                        отменить.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="space-x-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setIsDeleteDialogOpen(false)}
                                    >
                                        Отмена
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        Удалить
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )}

                <Button onClick={onCloseAction} variant="secondary" className="w-full">
                    Отмена
                </Button>
            </div>

            {isCropDialogOpen && imageFile && (
                <AlertDialog
                    open={isCropDialogOpen}
                    onOpenChange={(open) => !open && setIsCropDialogOpen(false)}
                >
                    <ImageCropDialog
                        imageSrc={URL.createObjectURL(imageFile)}
                        onCancel={handleCropCancel}
                        onSave={handleCropSave}
                    />
                </AlertDialog>
            )}
        </div>
    );
}
