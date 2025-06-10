import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion} from "framer-motion";
import {IOrder} from "@/types/order.type";

interface EditOrderDialogProps {
    order: IOrder | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        clientName: string;
        clientSurname: string;
        clientPhone: string;
        deliveryAddress?: string;
    }) => Promise<void>;
    serverErrors?: string[];
}

export function EditOrderDialog({ order, isOpen, onClose, onSubmit, serverErrors = [] }: EditOrderDialogProps) {
    const [clientName, setClientName] = React.useState('')
    const [clientSurname, setClientSurname] = React.useState('')
    const [clientPhone, setClientPhone] = React.useState('')
    const [deliveryAddress, setDeliveryAddress] = React.useState('')
    const [success, setSuccess] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (order) {
            setClientName(order.clientName)
            setClientSurname(order.clientSurname)
            setClientPhone(order.clientPhone)
            setDeliveryAddress(order.deliveryAddress || '')
            setSuccess(false)
        }
    }, [order])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit({ clientName, clientSurname, clientPhone, deliveryAddress })
            setSuccess(true)
        } catch {
            setSuccess(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Редактировать заказ #{order?.id}</DialogTitle>
                        <DialogDescription>Измените данные заказа</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <label className="block mb-1">Имя клиента</label>
                            <Input value={clientName} onChange={e => setClientName(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block mb-1">Фамилия клиента</label>
                            <Input value={clientSurname} onChange={e => setClientSurname(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block mb-1">Телефон клиента</label>
                            <Input value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block mb-1">Адрес доставки</label>
                            <Input value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />
                        </div>

                        <AnimatePresence>
                            {serverErrors.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                                    exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
                                    className="mb-4 rounded bg-red-100 p-3 text-red-800"
                                >
                                    <ul className="list-disc list-inside space-y-1">
                                        {serverErrors.map((err, i) => (
                                            <li key={i}>{err}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <DialogFooter>
                            <Button type="submit" disabled={loading}>{loading ? 'Сохраняем...' : 'Сохранить'}</Button>
                            <Button variant="ghost" onClick={onClose} disabled={loading}>Отмена</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.3 } }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { duration: 0.3 } }}
                            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
                            className="relative bg-green-600 text-white rounded-lg p-6 max-w-md w-full shadow-lg cursor-pointer select-none"
                            onClick={() => setSuccess(false)}
                        >
                            <h2 className="text-lg font-bold mb-2">Успех!</h2>
                            <p>Данные заказа успешно обновлены. Нажмите, чтобы закрыть.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
