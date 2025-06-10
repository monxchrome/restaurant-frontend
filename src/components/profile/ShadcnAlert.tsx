'use client';

import {useEffect} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '@/components/ui/button';

interface ShadcnAlertProps {
    message: string;
    onClose: () => void;
}

export function ShadcnAlert({ message, onClose }: ShadcnAlertProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            {message && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black backdrop-blur-sm z-[1000]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: '-100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-[1001] w-full max-w-md rounded-lg bg-green-600 text-white shadow-lg p-4 flex justify-between items-center"
                        role="alert"
                    >
                        <span className="text-sm font-semibold">{message}</span>
                        <Button size="sm" variant="ghost" className="text-white" onClick={onClose}>
                            ✕
                        </Button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
