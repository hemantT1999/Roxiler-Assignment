import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { api } from "../utils/api";

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await api.getUserStores({});
        setStores(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching stores:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) return <div className="text-center p-4">Loading stores...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.length === 0 ? (
        <div className="text-center col-span-full p-4">No stores found</div>
      ) : (
        stores.map((store) => (
          <div
            key={store.id}
            className="bg-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-zinc-700/50"
          >
            <Link
              to={`/store/${store.id}`}
              className="text-xl font-semibold text-zinc-100 hover:text-blue-400 transition-colors block"
            >
              {store.name}
            </Link>
            <p className="text-zinc-400 mt-2">{store.address}</p>
            <div className="flex items-center mt-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`${
                      star <= (store.averageRating || 0)
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-zinc-400">
                {store.averageRating
                  ? store.averageRating.toFixed(1)
                  : "No ratings"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoresList;
