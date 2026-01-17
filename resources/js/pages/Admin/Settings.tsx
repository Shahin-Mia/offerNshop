import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Save } from 'lucide-react';
import React from 'react';

export default function Settings() {
    return (
        <AdminLayout title="System Settings">
            <div className="space-y-6 max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>General Settings</CardTitle>
                        <CardDescription>
                            Manage your application's general configuration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Name</label>
                            <Input defaultValue="OfferNShop" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Support Email</label>
                            <Input type="email" defaultValue="support@offernshop.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Timezone</label>
                            <Input defaultValue="UTC" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                            Configure security settings and passwords.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium">Two-Factor Authentication</label>
                                <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                            </div>
                            <Button variant="outline">Enable</Button>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current Password</label>
                            <Input type="password" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">New Password</label>
                            <Input type="password" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input type="password" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Update Password
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AdminLayout>
    );
}
