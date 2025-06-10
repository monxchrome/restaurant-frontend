"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {menuService} from "@/lib/menuService";
import MenuDrawer from "@/components/menu/MenuDrawer";
import {MenuItemCard} from "@/components/menu/MenuItemCard";
import {AnimatePresence, motion} from "framer-motion";
import {MenuFilters} from "@/components/menu/MenuFilters";
import {useRequireAuth} from "@/hooks/useRequireAuth";
import {IMenuItem} from "@/types/menu.type";

export default function MenuAdminPage() {
    useRequireAuth(['ADMIN']);

    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<IMenuItem | null>(null);
    const [filters, setFilters] = useState({});

    const fetchItems = async () => {
        const data = await menuService.getAll(filters);
        setMenuItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, [filters]);

    const handleEdit = (item: IMenuItem) => {
        setEditItem(item);
        setOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Меню</h1>
                <Button
                    onClick={() => {
                        setEditItem(null);
                        setOpen(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить
                </Button>
            </div>

            <MenuFilters onChange={setFilters} />

            <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            layout
                        >
                            <MenuItemCard item={item} onClick={() => handleEdit(item)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <MenuDrawer
                open={open}
                onOpenChange={setOpen}
                item={editItem}
                onSaveAction={fetchItems}
            />
        </div>
    );
}
