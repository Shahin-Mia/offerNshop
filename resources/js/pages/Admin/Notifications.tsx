import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Search, Bell, Send } from 'lucide-react';
import React from 'react';

export default function Notifications() {
    return (
        <AdminLayout title="Notifications">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sent Notifications</CardTitle>
                        <CardDescription>History of system notifications sent to users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 border rounded-lg">
                                <Bell className="w-5 h-5 text-blue-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">System Maintenance Update</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Scheduled maintenance will occur on Sunday at 2:00 AM.
                                    </p>
                                    <span className="text-xs text-muted-foreground mt-2 block">2 hours ago • All Users</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 border rounded-lg">
                                <Bell className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-sm">New Feature: Dark Mode</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        You can now switch to dark mode in your settings.
                                    </p>
                                    <span className="text-xs text-muted-foreground mt-2 block">2 days ago • All Users</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Send Notification</CardTitle>
                        <CardDescription>Create a new notification.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input placeholder="Notification title" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]" placeholder="Type your message here..."></textarea>
                            </div>
                            <Button className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                Send Notification
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
