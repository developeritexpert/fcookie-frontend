'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
    fullScreen?: boolean;
}

export default function Loading({ fullScreen = true }: LoadingProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-4 bg-background ${fullScreen ? 'h-screen w-full fixed inset-0 z-50' : 'h-full w-full'
                }`}
        >
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    className="h-16 w-16 rounded-full border-4 border-primary/20"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Spinning Ring */}
                <motion.div
                    className="absolute h-16 w-16 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Inner Dot */}
                <motion.div
                    className="absolute h-3 w-3 rounded-full bg-primary"
                    animate={{
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <motion.p
                className="text-sm font-medium text-muted-foreground animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Verifying authentication...
            </motion.p>
        </div>
    );
}
