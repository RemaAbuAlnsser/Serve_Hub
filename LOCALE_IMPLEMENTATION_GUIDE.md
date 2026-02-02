# دليل تطبيق اللغات في الواجهة الأمامية

## ✅ تم إنشاء الدوال المساعدة

الملف: `/frontend/src/lib/localeHelpers.ts`

يحتوي على دوال مساعدة لاختيار النص الصحيح حسب اللغة مع fallback للعربي:

```typescript
import { getLocalizedName, getLocalizedDescription, getLocalizedCityName } from '@/lib/localeHelpers';
```

---

## 📝 كيفية التطبيق في المكونات

### 1. الحصول على اللغة الحالية

في أي مكون، استخدم:

```typescript
import { useLocale } from 'next-intl';

const locale = useLocale(); // 'ar' or 'en'
```

### 2. تطبيق على الفئات (Categories)

#### قبل:
```typescript
<h3>{category.name}</h3>
<p>{category.description}</p>
```

#### بعد:
```typescript
import { useLocale } from 'next-intl';
import { getLocalizedName, getLocalizedDescription } from '@/lib/localeHelpers';

const locale = useLocale();

<h3>{getLocalizedName(category, locale)}</h3>
<p>{getLocalizedDescription(category, locale)}</p>
```

### 3. تطبيق على المنتجات (Products)

#### قبل:
```typescript
<h3>{product.name}</h3>
<p>{product.description}</p>
```

#### بعد:
```typescript
import { useLocale } from 'next-intl';
import { getLocalizedName, getLocalizedDescription } from '@/lib/localeHelpers';

const locale = useLocale();

<h3>{getLocalizedName(product, locale)}</h3>
<p>{getLocalizedDescription(product, locale)}</p>
```

### 4. تطبيق على الشركات (Companies)

#### قبل:
```typescript
<span>{company.name}</span>
```

#### بعد:
```typescript
import { useLocale } from 'next-intl';
import { getLocalizedName } from '@/lib/localeHelpers';

const locale = useLocale();

<span>{getLocalizedName(company, locale)}</span>
```

### 5. تطبيق على مدن التوصيل (Delivery Cities)

#### قبل:
```typescript
<span>{city.city_name}</span>
```

#### بعد:
```typescript
import { useLocale } from 'next-intl';
import { getLocalizedCityName } from '@/lib/localeHelpers';

const locale = useLocale();

<span>{getLocalizedCityName(city, locale)}</span>
```

---

## 🎯 المكونات التي تحتاج تحديث

### المكونات الرئيسية:
1. ✅ `/components/CategorySection.tsx` - عرض الفئات والمنتجات
2. ✅ `/components/CategoriesMenu.tsx` - قائمة الفئات
3. ✅ `/components/CategoriesGrid.tsx` - شبكة الفئات
4. ✅ `/components/CategoriesList.tsx` - قائمة الفئات والفئات الفرعية
5. ✅ `/components/Header.tsx` - الهيدر
6. ✅ `/components/MegaMenu.tsx` - القائمة الكبيرة
7. ✅ `/components/MobileSidebar.tsx` - القائمة الجانبية للموبايل
8. ✅ `/components/ProductCard.tsx` - بطاقة المنتج

### الصفحات:
1. ✅ `/app/[locale]/page.tsx` - الصفحة الرئيسية
2. ✅ `/app/[locale]/category/[id]/page.tsx` - صفحة الفئة
3. ✅ `/app/[locale]/subcategory/[id]/page.tsx` - صفحة الفئة الفرعية
4. ✅ `/app/[locale]/product/[name]/page.tsx` - صفحة المنتج
5. ✅ `/app/[locale]/deals/page.tsx` - صفحة العروض
6. ✅ `/app/[locale]/new/page.tsx` - صفحة المنتجات الجديدة
7. ✅ `/app/[locale]/search/page.tsx` - صفحة البحث
8. ✅ `/app/[locale]/checkout/page.tsx` - صفحة الدفع (لمدن التوصيل)

---

## 💡 مثال كامل

### CategorySection.tsx

```typescript
'use client';

import { useLocale } from 'next-intl';
import { getLocalizedName, getLocalizedDescription } from '@/lib/localeHelpers';

// ... imports

interface Category {
  id: number;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  image_url?: string;
}

interface Product {
  id: number;
  name: string;
  name_en?: string;
  description?: string;
  description_en?: string;
  // ... other fields
}

const CategorySection = ({ category }: { category: Category }) => {
  const locale = useLocale();
  const [products, setProducts] = useState<Product[]>([]);
  
  return (
    <section>
      <h2>{getLocalizedName(category, locale)}</h2>
      {category.description && (
        <p>{getLocalizedDescription(category, locale)}</p>
      )}
      
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{getLocalizedName(product, locale)}</h3>
            {product.description && (
              <p>{getLocalizedDescription(product, locale)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
```

---

## 🔄 آلية العمل

1. **عند اللغة الإنجليزية (`locale === 'en'`)**:
   - إذا كان الحقل الإنجليزي موجود وغير فارغ → يعرض الإنجليزي
   - إذا كان الحقل الإنجليزي فارغ أو null → يعرض العربي (fallback)

2. **عند اللغة العربية (`locale === 'ar'`)**:
   - يعرض العربي دائماً

---

## ✨ الخطوات التالية

1. تحديث جميع المكونات المذكورة أعلاه
2. إضافة `useLocale()` في كل مكون
3. استبدال `category.name` بـ `getLocalizedName(category, locale)`
4. استبدال `product.name` بـ `getLocalizedName(product, locale)`
5. استبدال `company.name` بـ `getLocalizedName(company, locale)`
6. استبدال `city.city_name` بـ `getLocalizedCityName(city, locale)`
7. نفس الشيء للوصف (description)

---

## 🧪 اختبار

1. افتح الموقع باللغة العربية → يجب أن تظهر النصوص العربية
2. حول للإنجليزية → يجب أن تظهر النصوص الإنجليزية (إذا موجودة)
3. إذا لم يكن هناك نص إنجليزي → يجب أن يظهر النص العربي كـ fallback

---

## ⚠️ ملاحظات مهمة

- الدوال المساعدة تتعامل مع `null` و `undefined` تلقائياً
- لا حاجة للتحقق من وجود الحقل الإنجليزي قبل استخدام الدالة
- الـ fallback للعربي يحدث تلقائياً
- يمكن استخدام نفس الدوال في أي مكون
