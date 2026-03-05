import { useMemo, useState } from "react";
import { Search, ShoppingCart, Star, Check } from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_ORDER_MUTATION } from "../../services/client-service/Mutation";
import { useAuth } from "../../context/authContext";
import { SHOP_PRODUCTS_QUERY } from "../../services/client-service/Queries";

const cardEmojis = ["💻", "🖱️", "⌨️", "🖥️", "🔌", "🎯", "📷", "🔗", "❄️", "🔒", "💡", "📄"];

export function Shop() {
  const { addToCart, cart, clearCart } = useOrders();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [added, setAdded] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const { data, loading: productsLoading, error: productsError } = useQuery(SHOP_PRODUCTS_QUERY, {
    fetchPolicy: "cache-and-network",
  });

  const [createOrder, { loading: isSubmittingOrder }] = useMutation(CREATE_ORDER_MUTATION);

  const getCurrentUserId = () => {
    const candidate = user?.userId ?? user?.id ?? user?.sub;
    const parsed = Number(candidate);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  };

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

  const handleAdd = (product) => {
    setSubmitMessage("");
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const handleSubmitCartOrders = async () => {
    setSubmitMessage("");

    if (cart.length === 0) {
      setSubmitMessage("Your cart is empty.");
      return;
    }

    const userId = getCurrentUserId();
    if (!userId) {
      setSubmitMessage("Unable to place order: user session is missing a valid id.");
      return;
    }

    try {
      await Promise.all(
        cart.map((item) => {
          return createOrder({
            variables: {
              input: {
                productId: Number(item.id),
                userId,
                quantity: Number(item.qty),
                unitPrice: Number(item.price),
                totalPrice: Number(item.price) * Number(item.qty),
              },
            },
          });
        }),
      );

      clearCart();
      setSubmitMessage("Order submitted successfully. Awaiting admin approval.");
    } catch (error) {
      console.error("Failed to submit order:", error);
      setSubmitMessage("Failed to submit order. Please try again.");
    }
  };

  const getCartQty = (id) => cart.find((c) => c.id === id)?.qty || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "2rem" }}>
            Shop
          </h1>
          <p style={{ color: "#64748b" }}>Browse and order products</p>
        </div>
        <button
          onClick={handleSubmitCartOrders}
          disabled={isSubmittingOrder || productsLoading || products.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
          style={{
            background: "rgba(6,182,212,0.12)",
            color: "#06b6d4",
            border: "1px solid rgba(6,182,212,0.2)",
            opacity: isSubmittingOrder || productsLoading || products.length === 0 ? 0.7 : 1,
            cursor: isSubmittingOrder || productsLoading || products.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <ShoppingCart size={16} />
          <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>
            {isSubmittingOrder ? "Submitting..." : `Submit Cart (${cart.reduce((s, i) => s + i.qty, 0)})`}
          </span>
        </button>
      </div>

      {submitMessage && (
        <p style={{ color: submitMessage.includes("success") ? "#22c55e" : "#f87171", fontSize: "0.85rem", marginBottom: "1rem" }}>
          {submitMessage}
        </p>
      )}

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
          <Search size={16} color="#64748b" className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
            style={{
              background: "#0d1424",
              border: "1px solid #1a2744",
              fontSize: "0.875rem",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#06b6d4")}
            onBlur={(e) => (e.target.style.borderColor = "#1a2744")}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: category === cat ? "#06b6d4" : "#0d1424",
                color: category === cat ? "#fff" : "#64748b",
                border: `1px solid ${category === cat ? "#06b6d4" : "#1a2744"}`,
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
          const inCart = getCartQty(product.id) > 0;
          const justAdded = added === product.id;
          return (
            <div
              key={product.id}
              className="rounded-xl border flex flex-col transition-all hover:border-cyan-400/30 hover:-translate-y-0.5"
              style={{ background: "#0d1424", borderColor: "#1a2744" }}
            >
              <div
                className="rounded-t-xl flex items-center justify-center h-36 relative"
                style={{ background: "#111827" }}
              >
                <span style={{ fontSize: "3rem" }}>{product.image}</span>
                {product.badge && (
                  <span
                    className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs"
                    style={{
                      background: "rgba(6,182,212,0.15)",
                      color: "#06b6d4",
                      border: "1px solid rgba(6,182,212,0.25)",
                      fontWeight: 600,
                    }}
                  >
                    {product.badge}
                  </span>
                )}
                {inCart && (
                  <span
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: "#22c55e", fontSize: "10px", fontWeight: 700 }}
                  >
                    {getCartQty(product.id)}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="mb-1">
                  <span style={{ color: "#06b6d4", fontSize: "0.7rem", fontWeight: 500 }}>
                    {product.category}
                  </span>
                </div>
                <h3 className="text-white mb-1" style={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p className="mb-3" style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.4 }}>
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 600 }}>{product.rating}</span>
                  <span style={{ color: "#475569", fontSize: "0.78rem" }}>({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-white" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                    style={{
                      background: justAdded ? "rgba(34,197,94,0.15)" : "rgba(6,182,212,0.12)",
                      color: justAdded ? "#22c55e" : "#06b6d4",
                      border: `1px solid ${justAdded ? "rgba(34,197,94,0.25)" : "rgba(6,182,212,0.2)"}`,
                      fontWeight: 500,
                    }}
                  >
                    {justAdded ? (
                      <>
                        <Check size={13} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} />
                        Add
                      </>
                    )}
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
