'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ErrorAlertProps {
    errors: string[];
}

export function ErrorAlert({ errors }: ErrorAlertProps) {
    if (!errors || errors.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, maxHeight: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, maxHeight: 200, paddingTop: 16, paddingBottom: 16, overflow: 'hidden' }}
                exit={{ opacity: 0, maxHeight: 0, paddingTop: 0, paddingBottom: 0, overflow: 'hidden' }}
                transition={{ duration: 2 }}
                className="mb-6 rounded-md bg-red-100 dark:bg-red-900 px-4 text-red-700 dark:text-red-300"
            >
                <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            </motion.div>
        </AnimatePresence>
    );
}
