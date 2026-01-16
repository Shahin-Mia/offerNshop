import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Box,
    Layers,
    LayoutDashboard,
    Settings,
    ShoppingBag,
    Store,
    Users,
    FileText,
    Bell
} from 'lucide-react';
import { AuthProps } from '@/types/auth'; // Ensure this type exists or adjust path

export default function Sidebar() {
    const { url } = usePage();

    // Helper to check active state
    const isActive = (path: string) => url.startsWith(path);

    const navItems = [
        {
            heading: 'Management',
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
                { name: 'Shop Management', href: '/admin/shops', icon: Store },
                { name: 'Product Management', href: '/admin/products', icon: Box },
                { name: 'Offers & Flyers', href: '/admin/offers', icon: ShoppingBag },
                { name: 'Categories', href: '/admin/categories', icon: Layers },
            ]
        },
        {
            heading: 'Operations',
            items: [
                { name: 'Users', href: '/admin/users', icon: Users },
                { name: 'Notifications', href: '/admin/notifications', icon: Bell },
                { name: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
            ]
        },
        {
            heading: 'System',
            items: [
                { name: 'Content Management', href: '/admin/content', icon: FileText },
                { name: 'System Settings', href: '/admin/settings', icon: Settings },
            ]
        }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen fixed left-0 top-0 z-30">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        ON
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        OfferNShop
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {navItems.map((group, groupIdx) => (
                    <div key={groupIdx}>
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {group.heading}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const active = isActive(item.href);
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Profile Snippet (Bottom) */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Admin</p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
