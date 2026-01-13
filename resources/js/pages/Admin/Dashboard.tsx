import { router, usePage } from '@inertiajs/react';
import type { AuthProps } from '../../types/auth';

export default function AdminDashboard() {
    const { auth } = usePage<AuthProps>().props;

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-white">Admin: {auth.user?.name}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                                    <svg
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                        <dd className="text-3xl font-semibold text-gray-900">2</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                    <svg
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                                        <dd className="text-3xl font-semibold text-gray-900">2</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                    <svg
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Admin Users</dt>
                                        <dd className="text-3xl font-semibold text-gray-900">1</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Admin Features</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                                    <p className="text-gray-600 text-sm">
                                        View, create, update, and delete user accounts
                                    </p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Role Management</h3>
                                    <p className="text-gray-600 text-sm">Manage user roles and permissions</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
                                    <p className="text-gray-600 text-sm">Configure application settings</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Logs</h3>
                                    <p className="text-gray-600 text-sm">View system activity and audit logs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
