import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Search, Plus, Layers } from 'lucide-react';
import React from 'react';

export default function Categories() {
    return (
        <AdminLayout title="Category Management">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search categories..."
                            className="pl-8"
                        />
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shop Categories</CardTitle>
                            <CardDescription>Categories used for classifying shops.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Electronics</TableCell>
                                        <TableCell className="text-right text-muted-foreground">12 Shops</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Fashion</TableCell>
                                        <TableCell className="text-right text-muted-foreground">8 Shops</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Groceries</TableCell>
                                        <TableCell className="text-right text-muted-foreground">24 Shops</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Categories</CardTitle>
                            <CardDescription>Categories used for classifying products.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Mens Wear</TableCell>
                                        <TableCell className="text-right text-muted-foreground">145 Products</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Smartphones</TableCell>
                                        <TableCell className="text-right text-muted-foreground">89 Products</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-muted-foreground" /> Fresh Fruits</TableCell>
                                        <TableCell className="text-right text-muted-foreground">200 Products</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
