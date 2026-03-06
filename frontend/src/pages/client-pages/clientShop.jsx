import { useMemo, useState } from "react";
import { Search, ShoppingCart, Star } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { SHOP_PRODUCTS_QUERY } from "../../services/client-service/Queries";
import { colors } from "../../colors";
import { useNavigate } from "react-router-dom";

const cardEmojis = ["💻", "🖱️", "⌨️", "🖥️", "🔌", "🎯", "📷", "🔗", "❄️", "🔒", "💡", "📄"];

export function Shop() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [preOrderingId, setPreOrderingId] = useState(null);

  const { data, loading: productsLoading, error: productsError } = useQuery(SHOP_PRODUCTS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const products = useMemo(() => {
    const rows = data?.getProducts ?? [];
    return rows.map((row, index) => ({
      id: row.productId,
      name: row.productName,
      category: "Products",
      price: Number(row.productPrice),
      rating: 4.5 + ((index % 4) * 0.1),
      reviews: 50 + (index * 13),
      badge: index === 0 ? "Featured" : undefined,
      description: row.productDescription,
      image: cardEmojis[index % cardEmojis.length],
    }));
  }, [data]);

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.category))], [products]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const handlePreOrder = (product) => {
    setPreOrderingId(product.id);
    navigate(`/shop/pre-order/${product.id}`, {
      state: { product },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="mb-1" style={{ fontWeight: 700, fontSize: "2rem", color: "var(--foreground, #111319)" }}>
            Shop
          </h1>
          <p style={{ color: colors.textMuted }}>Browse products and continue to pre-order confirmation</p>
        </div>
      </div>

      {productsError && (
        <p style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "1rem" }}>
          Failed to load products. Please refresh.
        </p>
      )}

      {productsLoading && (
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "1rem" }}>
          Loading products...
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} color="var(--muted-foreground, #717182)" className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl pl-11 pr-4 py-3 outline-none transition-all"
            style={{
              color: "var(--foreground, #111319)",
              background: "var(--card, #ffffff)",
              border: "1px solid var(--border, rgba(0, 0, 0, 0.1))",
              fontSize: "0.875rem",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--ring, #c7c7cc)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border, rgba(0, 0, 0, 0.1))")}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: category === cat ? "var(--accent, #e9ebef)" : "var(--card, #ffffff)",
                color: category === cat ? "var(--foreground, #111319)" : "var(--muted-foreground, #717182)",
                border: `1px solid ${category === cat ? "var(--ring, #c7c7cc)" : "var(--border, rgba(0,0,0,0.1))"}`,
                fontWeight: category === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => {
          return (
            <div
              key={product.id}
              className="rounded-xl border flex flex-col transition-all hover:border-cyan-400/30 hover:-translate-y-0.5"
              style={{ background: "var(--card, #ffffff)", borderColor: "var(--border, rgba(0,0,0,0.1))" }}
            >
              <div
                className="rounded-t-xl flex items-center justify-center h-36 relative"
                style={{ background: "var(--secondary, #f5f6f8)" }}
              >
                <span style={{ fontSize: "3rem" }}>{product.image}</span>
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs"
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      color: colors.cyan,
                      border: "1px solid var(--border, rgba(0,0,0,0.1))",
                      fontWeight: 600,
                    }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="mb-1">
                  <span style={{ color: "#06b6d4", fontSize: "0.7rem", fontWeight: 500 }}>
                    {product.category}
                  </span>
                </div>
                <h3 className="mb-1" style={{ color: "var(--foreground, #111319)", fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p className="mb-3" style={{ color: colors.textMuted, fontSize: "0.78rem", lineHeight: 1.4 }}>
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 600 }}>{product.rating}</span>
                  <span style={{ color: "#475569", fontSize: "0.78rem" }}>({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span style={{ color: "var(--foreground, #111319)", fontWeight: 700, fontSize: "1.05rem" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handlePreOrder(product)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                    style={{
                      background: "rgba(6,182,212,0.12)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.2)",
                      fontWeight: 500,
                    }}
                    disabled={preOrderingId === product.id}
                  >
                    <>
                      <ShoppingCart size={13} />
                      {preOrderingId === product.id ? "Opening..." : "Pre-Order"}
                    </>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: "#475569" }}>No products found for "{search}"</p>
        </div>
      )}
    </div>
  );
}


