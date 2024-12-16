import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Finance = () => {
  const [dateRange, setDateRange] = useState('monthly');
  
  const financialStats = [
    {
      title: "Total Revenue",
      amount: "$124,563.00",
      trend: "+12.5%",
      isPositive: true,
      icon: <DollarSign className="text-green-500" />,
      description: "Compared to last month"
    },
    {
      title: "Outstanding Payments",
      amount: "$23,456.00",
      trend: "+3.2%",
      isPositive: false,
      icon: <CreditCard className="text-red-500" />,
      description: "Pending collections"
    },
    {
      title: "Total Expenses",
      amount: "$45,678.00",
      trend: "-2.4%",
      isPositive: true,
      icon: <TrendingDown className="text-blue-500" />,
      description: "Operating costs"
    },
    {
      title: "Net Profit",
      amount: "$55,429.00",
      trend: "+15.3%",
      isPositive: true,
      icon: <TrendingUp className="text-purple-500" />,
      description: "After all deductions"
    }
  ];

  const recentTransactions = [
    {
      id: "TRX001",
      description: "Course Subscription Payment",
      date: "Dec 15, 2024",
      amount: "+$299.00",
      status: "Completed",
      isIncome: true
    },
    {
      id: "TRX002",
      description: "Teacher Salary Payment",
      date: "Dec 14, 2024",
      amount: "-$1,500.00",
      status: "Processed",
      isIncome: false
    },
    {
      id: "TRX003",
      description: "Annual Membership Fee",
      date: "Dec 13, 2024",
      amount: "+$599.00",
      status: "Completed",
      isIncome: true
    },
    {
      id: "TRX004",
      description: "System Maintenance Cost",
      date: "Dec 12, 2024",
      amount: "-$450.00",
      status: "Processed",
      isIncome: false
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Financial Management</h1>
          <p className="text-gray-500 mt-1">Track revenue, expenses, and financial metrics</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="daily">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
            <option value="yearly">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {financialStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
                {stat.isPositive ? 
                  <ArrowUpRight size={16} /> : 
                  <ArrowDownRight size={16} />
                }
              </div>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.amount}</p>
            <span className="text-sm text-gray-500 mt-1">{stat.description}</span>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
              <p className="text-gray-500 mt-1">Latest financial activities</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              Filter
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-700">{transaction.description}</td>
                    <td className="py-3 px-4 text-gray-500">{transaction.date}</td>
                    <td className={`py-3 px-4 font-medium ${
                      transaction.isIncome ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;