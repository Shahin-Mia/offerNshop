import { LucideIcon } from 'lucide-react';
import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string; // Tailwind bg color class (e.g., "bg-blue-500")
    iconColor?: string; // Optional icon color override
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
    return (
        <div className={`rounded-xl p-6 shadow-sm text-white ${color} relative overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 transform translate-x-4"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium opacity-90">{title}</h3>
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{value}</span>
                </div>
            </div>
        </div>
    );
}
