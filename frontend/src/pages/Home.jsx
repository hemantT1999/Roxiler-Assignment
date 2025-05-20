import React from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import StoresList from "../components/StoresList";

const Home = () => {
  const { user } = useAuth();
  const role = user?.role || localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container mx-auto p-4">
        {role === "admin" && <AdminDashboard />}

        {role === "user" && (
          <>
            <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-pink-600">
              Welcome to Store Finder
            </h1>
            <StoresList />
          </>
        )}

        {role === "store_owner" && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-400">
              Your Store Details
            </h2>
            <StoresList />
          </div>
        )}

        {!role && (
          <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Available Stores</h1>
            <StoresList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
