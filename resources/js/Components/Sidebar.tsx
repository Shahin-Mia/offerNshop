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
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';

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
        <aside className="w-64 bg-background border-r hidden md:flex flex-col h-screen fixed left-0 top-0 z-30">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        ON
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        OfferNShop
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
                {navItems.map((group, groupIdx) => (
                    <div key={groupIdx}>
                        <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {group.heading}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const active = isActive(item.href);
                                const Icon = item.icon;
                                return (
                                    <Button
                                        key={item.name}
                                        variant={active ? "secondary" : "ghost"}
                                        className={cn(
                                            "w-full justify-start gap-3",
                                            active && "font-semibold"
                                        )}
                                        asChild
                                    >
                                        <Link href={item.href}>
                                            <Icon className={cn("w-4 h-4", active ? "text-primary" : "text-muted-foreground")} />
                                            {item.name}
                                        </Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Profile Snippet (Bottom) */}
            <div className="p-4 border-t bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">Admin</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

