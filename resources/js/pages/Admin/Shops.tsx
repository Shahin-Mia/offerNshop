import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Search, Store, Plus, Loader2 } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shop, PaginatedResponse } from '@/types/schema';

export default function Shops() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const fetchShops = async () => {
        setLoading(true);
        try {
            const params = query ? { search: query } : {};
            const response = await axios.get<PaginatedResponse<Shop>>('/api/shops', { params });
            setShops(response.data.data);
        } catch (error) {
            console.error("Failed to fetch shops", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchShops();
        }, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <AdminLayout title="Shop Management">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search shops..."
                            className="pl-8"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Shop
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Shops</CardTitle>
                        <CardDescription>
                            Manage the shops registered on the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Shop Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10">
                                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                        </TableCell>
                                    </TableRow>
                                ) : shops.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                            No shops found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    shops.map((shop) => (
                                        <TableRow key={shop.id}>
                                            <TableCell className="font-medium">{shop.name}</TableCell>
                                            <TableCell>{shop.address || 'N/A'}</TableCell>
                                            <TableCell>Owner ID: {shop.owner_id || 'None'}</TableCell>
                                            <TableCell>
                                                {shop.is_active ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inactive</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
