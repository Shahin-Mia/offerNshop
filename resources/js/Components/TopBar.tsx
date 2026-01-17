import { usePage, router } from '@inertiajs/react';
import { Bell, Search, Settings, LogOut } from 'lucide-react';
import { AuthProps } from '@/types/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function TopBar({ title }: { title: string }) {
    const { auth } = usePage<AuthProps>().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-20">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>

            <div className="flex items-center gap-4">
                {/* Search (Optional) */}
                <div className="hidden md:flex items-center relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-8 bg-muted/50 border-0 focus-visible:ring-1"
                    />
                </div>

                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border-2 border-background"></span>
                </Button>

                <div className="h-6 w-px bg-border mx-2"></div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={auth?.user?.avatar || undefined} alt={auth?.user?.name || "Admin"} />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{auth?.user?.name || "Admin User"}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {auth?.user?.email || "admin@example.com"}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}

