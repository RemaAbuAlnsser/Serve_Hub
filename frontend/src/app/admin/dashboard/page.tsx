'use client';
import { API_URL } from '@/lib/api';

import { useState, useEffect } from 'react';
import {
  Package,
  ShoppingCart,
  FolderTree,
  Banknote,
  TrendingUp,
  Layers,
} from 'lucide-react';

interface Stats {
  productsCount: number;
  ordersCount: number;
  categoriesCount: number;
  subcategoriesCount: number;
  totalRevenue: number;
}

interface Category {
  id: number;
  name: string;
  subcategories?: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    productsCount: 0,
    ordersCount: 0,
    categoriesCount: 0,
    subcategoriesCount: 0,
    totalRevenue: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const productsRes = await fetch(`${API_URL}/products`);
      const products = await productsRes.json();
      const productsCount = Array.isArray(products) ? products.length : 0;

      const ordersRes = await fetch(`${API_URL}/orders`);
      const orders = await ordersRes.json();
      const ordersArray = Array.isArray(orders) ? orders : [];
      const ordersCount = ordersArray.length;
      const totalRevenue = ordersArray
        .filter((order: any) => order.status === 'completed')
        .reduce((sum: number, order: any) => sum + Number(order.total_amount), 0);

      const categoriesRes = await fetch(`${API_URL}/categories`);
      const categoriesData = await categoriesRes.json();
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : [];
      
      let totalSubcategories = 0;
      const categoriesWithSubs = await Promise.all(
        categoriesArray.map(async (category: Category) => {
          try {
            const subsRes = await fetch(`${API_URL}/subcategories/category/${category.id}`);
            const subs = await subsRes.json();
            const subsArray = Array.isArray(subs) ? subs : [];
            totalSubcategories += subsArray.length;
            return { ...category, subcategories: subsArray };
          } catch (error) {
            return { ...category, subcategories: [] };
          }
        })
      );

      setCategories(categoriesWithSubs);
      setStats({
        productsCount,
        ordersCount,
        categoriesCount: categoriesArray.length,
        subcategoriesCount: totalSubcategories,
        totalRevenue,
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">لوحة التحكم</h1>
        <p className="text-black mt-2">نظرة عامة على إحصائيات المتجر</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Package size={28} className="text-blue-600" />
            </div>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-black text-sm mb-1 font-medium">المنتجات</p>
            <p className="text-4xl font-bold text-black mb-1">
              {isLoading ? '...' : stats.productsCount}
            </p>
            <p className="text-xs text-black">إجمالي المنتجات المتاحة</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShoppingCart size={28} className="text-blue-600" />
            </div>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-black text-sm mb-1 font-medium">الطلبات</p>
            <p className="text-4xl font-bold text-black mb-1">
              {isLoading ? '...' : stats.ordersCount}
            </p>
            <p className="text-xs text-black">إجمالي الطلبات الحالية</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FolderTree size={28} className="text-blue-600" />
            </div>
            <Layers size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-black text-sm mb-1 font-medium">الفئات</p>
            <p className="text-4xl font-bold text-black mb-1">
              {isLoading ? '...' : stats.categoriesCount}
            </p>
            <p className="text-xs text-black">
              {stats.subcategoriesCount} فئة فرعية
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Banknote size={28} className="text-blue-600" />
            </div>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-black text-sm mb-1 font-medium">الإيرادات</p>
            <p className="text-4xl font-bold text-black mb-1">
              {isLoading ? '...' : `${stats.totalRevenue.toFixed(2)} ₪`}
            </p>
            <p className="text-xs text-black">إجمالي المبيعات المكتملة</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-blue-200">
          <h2 className="text-2xl font-bold text-black">تفاصيل الفئات</h2>
          <p className="text-black text-sm mt-1">
            عدد الفئات الفرعية لكل فئة رئيسية
          </p>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12 text-black">
              <p>جاري التحميل...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-black">
              <FolderTree size={48} className="mx-auto mb-4 opacity-30" />
              <p>لا توجد فئات</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-black mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-black">
                        {category.subcategories?.length || 0} فئة فرعية
                      </p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg shadow-sm">
                      <span className="text-2xl font-bold text-black">
                        {category.subcategories?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
