import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Search, Store, Plus } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import React from 'react';

export default function Shops() {
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
                                    <TableHead>Category</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Fashion Hub</TableCell>
                                    <TableCell>Clothing</TableCell>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell><Badge variant="default">Active</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Tech World</TableCell>
                                    <TableCell>Electronics</TableCell>
                                    <TableCell>Jane Smith</TableCell>
                                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Fresh Mart</TableCell>
                                    <TableCell>Groceries</TableCell>
                                    <TableCell>Mike Johnson</TableCell>
                                    <TableCell><Badge variant="destructive">Suspended</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
