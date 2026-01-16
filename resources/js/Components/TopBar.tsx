import { usePage } from '@inertiajs/react';
import { Bell, LogOut, Search } from 'lucide-react';
import { AuthProps } from '@/types/auth';
import { router } from '@inertiajs/react';

export default function TopBar({ title }: { title: string }) {
    const { auth } = usePage<AuthProps>().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="h-16 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md fixed top-0 right-0 left-0 md:left-64 z-20">
            <h1 className="text-lg font-bold">{title}</h1>

            <div className="flex items-center gap-4">
                {/* Search (Optional) */}
                <div className="hidden md:flex items-center bg-blue-700/50 rounded-lg px-3 py-1.5 border border-blue-500/30">
                    <Search className="w-4 h-4 text-blue-200 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-white placeholder-blue-200 w-64"
                    />
                </div>

                <button className="p-2 hover:bg-white/10 rounded-full transition">
                    <Bell className="w-5 h-5" />
                </button>

                <div className="h-6 w-px bg-blue-500 mx-2"></div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium hover:bg-white/10 px-3 py-1.5 rounded-lg transition"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
}
