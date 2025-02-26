import axios from "axios";

const API_URL = "https://api.baserow.io/api/database/rows/table/457310/";
const API_KEY = "Token wYK4C5YVdil2yIjGnR8BwYi2fmvzPTGP";

// Konfigurasi Header Default untuk Axios
const axiosConfig = {
  headers: {
    Authorization: API_KEY,
    "Content-Type": "application/json",
  },
};

// 🔹 Ambil data produk dari Baserow
export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL, axiosConfig);
    const products = res.data.results.map((item) => ({
      id: item.id,
      nama_produk: item.field_3558598,
      harga: item.field_3558675,
      stok: item.field_3558676,
      deskripsi: item.field_3558677,
    }));
    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response?.data || error);
    return [];
  }
};

// 🔹 Tambah produk ke Baserow
export const addProduct = async (product) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        field_3558598: product.nama_produk,
        field_3558675: parseInt(product.harga), // Konversi ke angka
        field_3558676: parseInt(product.stok),
        field_3558677: product.deskripsi,
      },
      axiosConfig
    );
    console.log("✅ Produk berhasil ditambahkan:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal menambah produk:", error.response?.data || error);
    return null;
  }
};

// 🔹 Update produk di Baserow
export const updateProduct = async (id, updatedData) => {
  try {
    const response = await axios.patch(
      `${API_URL}${id}/`,
      {
        field_3558598: updatedData.nama_produk,
        field_3558675: parseInt(updatedData.harga),
        field_3558676: parseInt(updatedData.stok),
        field_3558677: updatedData.deskripsi,
      },
      axiosConfig
    );
    console.log("✅ Produk berhasil diperbarui:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Gagal memperbarui produk:", error.response?.data || error);
    return null;
  }
};

// 🔹 Hapus produk dari Baserow
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`, axiosConfig);
    console.log("✅ Produk berhasil dihapus");
    return true;
  } catch (error) {
    console.error("❌ Gagal menghapus produk:", error.response?.data || error);
    return false;
  }
};
