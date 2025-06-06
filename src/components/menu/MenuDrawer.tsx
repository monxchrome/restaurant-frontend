import MenuForm from "./MenuForm";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

export interface MenuItem {
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

interface MenuDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: MenuItem | null;
    onSaveAction: () => void;
}

export default function MenuDrawer({open, onOpenChange, item, onSaveAction,}: MenuDrawerProps) {
    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            fadeFromIndex={0}
            snapPoints={[1, 1]}
        >
            <DrawerContent className="p-6 max-w-md ml-auto h-full">
                <DrawerHeader className="p-2 gap-1">
                    <DrawerTitle>
                        <VisuallyHidden>Меню редактирования пункта</VisuallyHidden>
                    </DrawerTitle>
                    <DrawerClose />
                </DrawerHeader>

                <MenuForm
                    item={item}
                    onCloseAction={() => onOpenChange(false)}
                    onSaveAction={onSaveAction}
                />
            </DrawerContent>
        </Drawer>
    );
}
