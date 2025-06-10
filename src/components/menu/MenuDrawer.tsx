import MenuForm from "./MenuForm";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {IMenuItem} from "@/types/menu.type";

interface MenuDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: IMenuItem | null;
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
