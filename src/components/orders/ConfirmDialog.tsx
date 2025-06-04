import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
}

export function ConfirmDialog({
                                  isOpen,
                                  onClose,
                                  onConfirm,
                                  title = 'Подтвердите действие',
                                  description = 'Вы уверены, что хотите продолжить?',
                                  confirmText = 'Да',
                                  cancelText = 'Отмена',
                              }: ConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button variant="destructive" onClick={() => { onConfirm(); onClose() }}>
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
