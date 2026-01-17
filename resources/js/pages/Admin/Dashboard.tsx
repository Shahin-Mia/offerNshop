import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/StatCard';
import {
    DollarSign,
    Store,
    Tag,
    Users
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Badge } from '@/Components/ui/badge';

export default function AdminDashboard() {
    return (
        <AdminLayout title="Business Overview">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Revenue"
                    value="$45,231.89"
                    icon={DollarSign}
                    description="+20.1% from last month"
                />
                <StatCard
                    title="Active Shops"
                    value="254"
                    icon={Store}
                    description="+180 new shops"
                />
                <StatCard
                    title="Live Offers"
                    value="1,203"
                    icon={Tag}
                    description="+19% since last week"
                />
                <StatCard
                    title="Total Users"
                    value="12,345"
                    icon={Users}
                    description="+201 since last hour"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Recent actions from shops and users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Shop</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Acme Corp</TableCell>
                                    <TableCell>New Offer Created</TableCell>
                                    <TableCell>2 mins ago</TableCell>
                                    <TableCell>
                                        <Badge>Success</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Global Markets</TableCell>
                                    <TableCell>Shop Verified</TableCell>
                                    <TableCell>15 mins ago</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Pending</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tech Solutions</TableCell>
                                    <TableCell>Profile Updated</TableCell>
                                    <TableCell>1 hour ago</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">Review</Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Geo Usage Heatmap (Placeholder) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Geo Usage</CardTitle>
                        <CardDescription>User activity by location.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                            <span className="text-muted-foreground font-medium">Map Placeholder</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}


