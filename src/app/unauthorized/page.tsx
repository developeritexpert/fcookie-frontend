'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, LogIn } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
            <div className="relative w-full max-w-lg text-center">
                {/* Animated Background Blob */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[80px]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                />

                {/* Icon Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
                >
                    <ShieldAlert className="h-12 w-12 text-destructive" />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Access Denied
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground">
                        It looks like you don't have permission to view this page. <br className="hidden sm:inline" />
                        Please contact your administrator if you believe this is a mistake.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col justify-center gap-3 sm:flex-row"
                >
                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>

                    <Link
                        href="/login"
                        className="group inline-flex items-center justify-center rounded-lg border border-input bg-background px-5 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </motion.div>
            </div>

            {/* Footer Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-8 text-xs text-muted-foreground"
            >
                Error 403 | Forbidden
            </motion.p>
        </div>
    );
}
