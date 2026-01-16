import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/StatCard';
import {
    DollarSign,
    Store,
    Tag,
    Users
} from 'lucide-react';

export default function AdminDashboard() {
    return (
        <AdminLayout title="Business Overview">
            {/* Stats Rpw */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Revenue"
                    value="$0.00"
                    icon={DollarSign}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Active Shops"
                    value="0"
                    icon={Store}
                    color="bg-teal-400"
                />
                <StatCard
                    title="Live Offers"
                    value="0"
                    icon={Tag}
                    color="bg-orange-400"
                />
                <StatCard
                    title="Total Users"
                    value="0"
                    icon={Users}
                    color="bg-red-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Shop</th>
                                    <th className="px-4 py-3">Action</th>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-4 py-4 text-center text-gray-400" colSpan={4}>
                                        No recent activity found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Geo Usage Heatmap (Placeholder) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Geo Usage Heatmap</h3>
                    <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                        <span className="text-gray-400 font-medium">Map Placeholder</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

