"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { menuService } from "@/lib/menuService";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {baseURL} from "@/lib/config";

interface MenuItem {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    createdAt: string;
    category: string;
    visible: boolean;
    inStock: boolean;
}

interface MenuFormProps {
    item: MenuItem | null;
    onCloseAction: () => void;
    onSaveAction: () => void;
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

export default function MenuForm({ item, onCloseAction, onSaveAction }: MenuFormProps) {
    const [form, setForm] = useState({
        name: item?.name || "",
        description: item?.description || "",
        price: item?.price ?? 0,
        category: item?.category || "SALADS_AND_SNACKS",
        visible: item?.visible ?? true,
        inStock: item?.inStock ?? true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(normalizeImageUrl(item?.imageUrl));
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (!imageFile) return;

        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "price") {
            const priceValue = value === "" ? 0 : Number(value);
            setForm(prev => ({ ...prev, price: priceValue }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleToggle = (key: "visible" | "inStock") => {
        setForm((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImageFile(e.target.files[0]);
            setImgError(false);
        }
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price.toString());
        formData.append("category", form.category);
        formData.append("visible", form.visible ? "true" : "false");
        formData.append("inStock", form.inStock ? "true" : "false");

        if (imageFile) {
            formData.append("image", imageFile);
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

            onCloseAction();
            onSaveAction();
        } catch (e) {
            alert("Ошибка при сохранении. Проверьте данные и попробуйте снова.");
            console.error(e);
        }
    };

    const handleDelete = async () => {
        if (item) {
            await menuService.delete(item.id);
            onCloseAction();
            onSaveAction();
        }
    };

    const validImage = previewUrl && !imgError;

    return (
        <div className="max-h-[80vh] overflow-y-auto p-4">
            <h2 className="text-xl font-bold mb-4">{item ? "Редактировать" : "Добавить"} блюдо</h2>

            <div className="space-y-4">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Название"/>

                <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Описание"
                    className="min-h-[100px] resize-y"
                />

                <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Цена"/>

                <div>
                    <Label htmlFor="category">Категория</Label>
                    <select
                        name="category"
                        id="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        {Object.entries(categories).map(([key, label]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label>Изображение</Label>

                    <label
                        htmlFor="image-upload"
                        className="relative group mt-1 block h-40 w-full overflow-hidden rounded border cursor-pointer"
                    >
                        {validImage ? (
                            <>
                                <Image
                                    src={previewUrl!}
                                    alt="Предпросмотр"
                                    fill
                                    className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                                    onError={() => setImgError(true)}
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium">
                                    Заменить фото
                                </div>
                            </>
                        ) : (
                            <div className="relative flex h-full w-full items-center justify-center bg-gray-200">
                                <div
                                    className="z-10 text-gray-400 group-hover:text-white transition-colors duration-300">
                                    Загрузить фото
                                </div>
                                <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded"/>
                            </div>
                        )}
                    </label>

                    <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Switch checked={form.visible} onCheckedChange={() => handleToggle("visible")}/>
                    <Label>Отображать</Label>
                </div>

                <div className="flex items-center gap-2">
                    <Switch checked={form.inStock} onCheckedChange={() => handleToggle("inStock")}/>
                    <Label>В наличии</Label>
                </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <Button onClick={handleSubmit} className="w-full">
                    {item ? "Сохранить изменения" : "Добавить"}
                </Button>

                {item && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                                Удалить
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Удалить это блюдо?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Это действие нельзя будет отменить. Блюдо будет безвозвратно удалено.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </div>
    );
}
