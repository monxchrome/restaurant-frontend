"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import {getCroppedImg} from "@/lib/cropImage";

interface ImageCropDialogProps {
    imageSrc: string;
    onCancel: () => void;
    onSave: (file: File) => void;
}

export function ImageCropDialog({ imageSrc, onCancel, onSave }: ImageCropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback(
        (_: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleSave = async () => {
        try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            const file = new File([croppedBlob], "cropped.jpg", { type: "image/jpeg" });
            onSave(file);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Обрезать фото</AlertDialogTitle>
            </AlertDialogHeader>

            <div style={{ position: "relative", width: "100%", height: 300, background: "#333" }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                />
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel onClick={onCancel}>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleSave}>Сохранить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
}
