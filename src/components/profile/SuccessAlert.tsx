'use client';

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface SuccessAlertProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

export function SuccessAlert({ message, visible, onClose }: SuccessAlertProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 50 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -50, y: 50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: 20,
                        zIndex: 1500,
                        maxWidth: '320px',
                    }}
                >
                    <Alert variant="default" className="shadow-lg cursor-pointer" onClick={onClose}>
                        <AlertTitle>Успешно</AlertTitle>
                        <AlertDescription>
                            {message || "Пароль успешно изменён!"}
                        </AlertDescription>
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
