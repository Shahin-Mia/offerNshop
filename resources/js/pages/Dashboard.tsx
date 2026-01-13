import { router, usePage } from '@inertiajs/react';
import type { AuthProps } from '../types/auth';

export default function Dashboard() {
    const { auth } = usePage<AuthProps>().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {auth.user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Information</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Name:</span> {auth.user?.name}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Email:</span> {auth.user?.email}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Role:</span>{' '}
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {auth.user?.role.name}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {auth.user?.role.name === 'admin' && (
                                <div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Access</h3>
                                    <p className="text-gray-600 mb-4">You have administrator privileges</p>
                                    <a
                                        href="/admin/dashboard"
                                        className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Go to Admin Dashboard
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
