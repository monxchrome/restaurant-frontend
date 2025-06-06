import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/components/menu/MenuDrawer";
import { useState } from "react";
import Image from "next/image";
import { baseURL } from "@/lib/config";

const normalizeImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (!url.startsWith("/")) url = "/" + url;
    return baseURL + url;
};

export function MenuItemCard({
                                 item,
                                 onClick,
                             }: {
    item: MenuItem;
    onClick: () => void;
}) {
    const [imgError, setImgError] = useState(false);

    const imageUrl = normalizeImageUrl(item.imageUrl);
    const validImage = imageUrl && item.imageUrl !== "./image" && !imgError;

    return (
        <Card
            onClick={onClick}
            className="relative cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 ease-in-out"
        >
            <div className="absolute top-2 left-2 flex space-x-1 z-10">
                {!item.visible && (
                    <Badge variant="destructive" className="text-xs">
                        Скрытый
                    </Badge>
                )}
                {!item.inStock && (
                    <Badge variant="secondary" className="text-xs">
                        Нет в наличии
                    </Badge>
                )}
            </div>

            <CardContent className="p-4">
                {validImage ? (
                    <div className="relative mb-2 h-40 w-full rounded overflow-hidden">
                        <Image
                            src={imageUrl!}
                            alt={item.name}
                            fill
                            className="object-cover"
                            onError={() => setImgError(true)}
                        />
                    </div>
                ) : (
                    <div
                        className="mb-2 h-40 w-full bg-gray-200 flex items-center justify-center rounded text-gray-400">
                        Нет фото
                    </div>
                )}

                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-sm font-medium mt-2">₽ {item.price.toFixed(2)}</p>
            </CardContent>
        </Card>
    );
}
