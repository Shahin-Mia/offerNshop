import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Search, Plus, Calendar } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import React from 'react';

export default function Offers() {
    return (
        <AdminLayout title="Offers & Flyers">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search offers..."
                            className="pl-8"
                        />
                    </div>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Offer
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Active Offers</CardTitle>
                        <CardDescription>
                            Manage promotional offers and seasonal flyers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Offer Title</TableHead>
                                    <TableHead>Shop</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Summer Sale</TableCell>
                                    <TableCell>Fashion Hub</TableCell>
                                    <TableCell className="text-muted-foreground text-xs flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Jun 1 - Jun 30
                                    </TableCell>
                                    <TableCell><Badge>Active</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Black Friday</TableCell>
                                    <TableCell>Tech World</TableCell>
                                    <TableCell className="text-muted-foreground text-xs flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Nov 24 - Nov 30
                                    </TableCell>
                                    <TableCell><Badge variant="secondary">Scheduled</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Details</Button>
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
