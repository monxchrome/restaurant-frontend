import MenuForm from "./MenuForm";
import {Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {IMenuItem} from "@/types/menu.type";
import {useEffect, useState} from "react";
import {authService} from "@/lib/authService";

interface MenuDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: IMenuItem | null;
    onSaveAction: () => void;
}

export default function MenuDrawer({open, onOpenChange, item, onSaveAction,}: MenuDrawerProps) {
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser()
                setCurrentUserRole(user.role)
            } catch (e) {
                console.error('Ошибка при получении пользователя', e)
            }
        }

        fetchUser()
    }, [])

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
                    userRole={currentUserRole}
                />
            </DrawerContent>
        </Drawer>
    );
}
