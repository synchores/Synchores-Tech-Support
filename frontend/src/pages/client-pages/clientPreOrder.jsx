import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_ORDER_MUTATION } from '../../services/client-service/Mutation';
import { SHOP_PRODUCTS_QUERY } from '../../services/client-service/Queries';
import { useAuth } from '../../context/authContext';
import { colors } from '../../colors';

export default function ClientPreOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');

  const { data, loading: loadingProducts } = useQuery(SHOP_PRODUCTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  const [createOrder, { loading: isSubmitting }] = useMutation(CREATE_ORDER_MUTATION);

  const mappedProducts = useMemo(() => {
    const rows = data?.getProducts ?? [];
    return rows.map((row) => ({
      id: Number(row.productId),
      name: row.productName,
      description: row.productDescription,
      price: Number(row.productPrice),
    }));
  }, [data]);

  const routeProduct = location.state?.product;
  const resolvedProduct = useMemo(() => {
    if (routeProduct?.id) {
      return {
        id: Number(routeProduct.id),
        name: routeProduct.name,
        description: routeProduct.description,
        price: Number(routeProduct.price),
      };
    }

    const id = Number(productId);
    if (!Number.isInteger(id)) {
      return null;
    }

    return mappedProducts.find((item) => item.id === id) ?? null;
  }, [routeProduct, mappedProducts, productId]);

  const totalPrice = useMemo(() => {
    if (!resolvedProduct) {
      return 0;
    }

    return Number(resolvedProduct.price) * Number(quantity);
  }, [resolvedProduct, quantity]);

  const getCurrentUserId = () => {
    const candidate = user?.userId ?? user?.id ?? user?.sub;
    const parsed = Number(candidate);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  };

  const submitPreOrder = async () => {
    setFeedback('');

    if (!resolvedProduct) {
      setFeedback('Product details are missing. Please go back to shop and try again.');
      return;
    }

    const userId = getCurrentUserId();
    if (!userId) {
      setFeedback('Unable to place order: user session is missing a valid id.');
      return;
    }

    try {
      await createOrder({
        variables: {
          input: {
            productId: Number(resolvedProduct.id),
            userId,
            quantity: Number(quantity),
            unitPrice: Number(resolvedProduct.price),
            totalPrice: Number(totalPrice),
          },
        },
      });

      setFeedback('Pre-order submitted successfully. Awaiting admin approval.');
      setTimeout(() => navigate('/my-orders'), 900);
    } catch (error) {
      console.error('Failed to submit pre-order:', error);
      setFeedback('Failed to submit pre-order. Please try again.');
    }
  };

  if (loadingProducts && !resolvedProduct) {
    return <div className="min-h-screen pt-24 pb-16 text-center" style={{ color: colors.textMuted }}>Loading product details...</div>;
  }

  if (!resolvedProduct) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'var(--card, #ffffff)',
              border: '1px solid var(--border, rgba(0,0,0,0.1))',
              boxShadow: '0 10px 24px rgba(3, 2, 19, 0.08)',
            }}
          >
            <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--foreground, #111319)' }}>Pre-Order</h1>
            <p style={{ color: colors.textMuted }}>This product is unavailable or invalid.</p>
            <Link to="/shop" className="inline-block mt-6 px-4 py-2 rounded-lg" style={{ background: 'var(--secondary, #f5f6f8)', color: 'var(--foreground, #111319)' }}>
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--card, #ffffff)',
            border: '1px solid var(--border, rgba(0,0,0,0.1))',
            boxShadow: '0 10px 24px rgba(3, 2, 19, 0.08)',
          }}
        >
          <p className="text-xs font-semibold mb-2" style={{ color: colors.textMuted }}>PRE-ORDER CHECKOUT</p>
          <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--foreground, #111319)' }}>Confirm Your Pre-Order</h1>
          <p className="mb-8" style={{ color: colors.textMuted }}>Review item details and submit your order request.</p>

          <div
            className="rounded-xl p-5 mb-6"
            style={{ background: 'var(--secondary, #f5f6f8)', border: '1px solid var(--border, rgba(0,0,0,0.1))' }}
          >
            <p className="text-sm mb-1" style={{ color: colors.textMuted }}>Product</p>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--foreground, #111319)' }}>{resolvedProduct.name}</h2>
            <p className="text-sm mb-4" style={{ color: colors.textMuted }}>{resolvedProduct.description || 'No description available.'}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p style={{ color: colors.textMuted }}>Unit Price</p>
                <p className="font-semibold" style={{ color: 'var(--foreground, #111319)' }}>${resolvedProduct.price.toFixed(2)}</p>
              </div>
              <div>
                <p style={{ color: colors.textMuted }}>Total</p>
                <p className="font-semibold" style={{ color: 'var(--foreground, #111319)' }}>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--foreground, #111319)' }}>Quantity</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-2 rounded-lg"
                style={{ background: 'var(--secondary, #f5f6f8)', border: '1px solid var(--border, rgba(0,0,0,0.1))' }}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-24 text-center px-3 py-2 rounded-lg"
                style={{ background: 'var(--card, #ffffff)', border: '1px solid var(--border, rgba(0,0,0,0.1))' }}
              />
              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-2 rounded-lg"
                style={{ background: 'var(--secondary, #f5f6f8)', border: '1px solid var(--border, rgba(0,0,0,0.1))' }}
              >
                +
              </button>
            </div>
          </div>

          {feedback && (
            <p className="text-sm mb-5" style={{ color: feedback.includes('successfully') ? '#16a34a' : '#ef4444' }}>
              {feedback}
            </p>
          )}

          <div className="flex gap-3">
            <Link
              to="/shop"
              className="px-4 py-2.5 rounded-lg font-medium"
              style={{ background: 'var(--secondary, #f5f6f8)', color: 'var(--foreground, #111319)' }}
            >
              Back
            </Link>
            <button
              onClick={submitPreOrder}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg font-medium"
              style={{
                background: 'rgba(6,182,212,0.15)',
                color: '#0891b2',
                border: '1px solid rgba(6,182,212,0.25)',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Pre-Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
