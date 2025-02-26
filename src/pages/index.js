"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/utils/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ nama_produk: "", harga: "", stok: "", deskripsi: "" });
  const [editProduct, setEditProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.nama_produk || !newProduct.harga || !newProduct.stok) {
      alert("Harap isi semua kolom!");
      return;
    }
    await addProduct(newProduct);
    setNewProduct({ nama_produk: "", harga: "", stok: "", deskripsi: "" });
    loadProducts(); // Memuat ulang daftar produk
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await updateProduct(editProduct.id, editProduct);
    setIsEditing(false);
    setEditProduct(null);
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id)); // Hapus dari state tanpa reload API
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-purple-800 p-6">
      <div className="max-w-3xl w-full">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Manajemen <span className="text-blue-500">Produk</span></h1>

          {/* Form Tambah Produk */}
          <motion.form
            onSubmit={handleAddProduct}
            className="bg-gray-50 p-5 rounded-xl shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h2 className="text-xl font-semibold text-gray-600 mb-3">Tambah Produk</h2>
            <input
              type="text"
              placeholder="Nama Produk"
              value={newProduct.nama_produk}
              onChange={(e) => setNewProduct({ ...newProduct, nama_produk: e.target.value })}
              className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Harga"
              value={newProduct.harga}
              onChange={(e) => setNewProduct({ ...newProduct, harga: e.target.value })}
              className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Stok"
              value={newProduct.stok}
              onChange={(e) => setNewProduct({ ...newProduct, stok: e.target.value })}
              className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Deskripsi"
              value={newProduct.deskripsi}
              onChange={(e) => setNewProduct({ ...newProduct, deskripsi: e.target.value })}
              className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tambah Produk
            </motion.button>
          </motion.form>

          {/* Daftar Produk */}
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Daftar Produk</h2>
          <motion.ul
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {products.map((product) => (
              <motion.li
                key={product.id}
                className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-bold text-gray-800">{product.nama_produk}</h3>
                <p className="text-gray-600">Harga: Rp{product.harga}</p>
                <p className="text-gray-600">Stok: {product.stok}</p>
                <p className="text-gray-500">{product.deskripsi}</p>

                {/* Tombol Edit & Hapus */}
                <div className="mt-3 flex space-x-2">
                  <motion.button
                    onClick={() => handleEditClick(product)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Hapus
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Modal Edit Produk */}
        {isEditing && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg w-96"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Produk</h2>
              <input
                type="text"
                placeholder="Nama Produk"
                value={editProduct?.nama_produk || ""}
                onChange={(e) => setEditProduct({ ...editProduct, nama_produk: e.target.value })}
                className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Harga"
                value={editProduct?.harga || ""}
                onChange={(e) => setEditProduct({ ...editProduct, harga: e.target.value })}
                className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Stok"
                value={editProduct?.stok || ""}
                onChange={(e) => setEditProduct({ ...editProduct, stok: e.target.value })}
                className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                placeholder="Deskripsi"
                value={editProduct?.deskripsi || ""}
                onChange={(e) => setEditProduct({ ...editProduct, deskripsi: e.target.value })}
                className="w-full p-3 mb-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <div className="flex space-x-2">
                <motion.button
                  onClick={handleUpdateProduct}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Simpan
                </motion.button>
                <motion.button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Batal
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
