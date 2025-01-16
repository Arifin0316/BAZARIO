import CategoryList from "@/components/CatagoriList";

const CategoryPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
