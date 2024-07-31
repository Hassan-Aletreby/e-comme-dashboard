import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import "../style/Our_products.css";
import Loader from "../Components/Loader";
import Title from "../Components/Tittle";
import ConfirmationModal from "../Components/ConfirmationModal";
import axiosInstance from "../api/axiosInstance";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const ITEMS_PER_PAGE = 16;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/rest/v1/products");
        const { data } = response;
        const count = data.length;
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        const currentProducts = data.slice(startIndex, endIndex);

        setProducts(currentProducts);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    window.scrollTo(0, 0);
  };

  const showConfirmationModal = (id) => {
    setProductToDelete(id);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        setError("");

        // const { error } = await axiosInstance.delete(
        //   "/rest/v1/products?${productToDelete}"
        // );
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", productToDelete);

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete)
        );
        setProductToDelete(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setIsModalVisible(false);
  };

  const isPrevDisabled = loading || currentPage === 1;
  const isNextDisabled = loading || currentPage === totalPages;

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="products_container">
      <div className="header">
        <Title title="Our Products" path="/products/allproducts" />
      </div>
      <div className="products_list">
        {products.map((product) => (
          <div key={product.id} className="product_item">
            <Link
              to={`/products/details/${product.id}`}
              className="product_item_link"
            >
              <div className="card_image">
                <img src={product.images[0]} />
              </div>
              <div className="product_info">
                <h4 className="product_title">{product.title}</h4>
                <p className="product_brand">{product.brand}</p>
                <p className="product_price">
                  Price:{" "}
                  {product.price !== null
                    ? `${product.price} $`
                    : "Not available"}
                </p>
              </div>
            </Link>
            <div className="delete_button">
              <button
                type="button"
                onClick={() => showConfirmationModal(product.id)}
                className="delete_button"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination_button"
          disabled={isPrevDisabled}
          onClick={() => handlePageChange("prev")}
        >
          &lt; Back
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination_button"
          disabled={isNextDisabled}
          onClick={() => handlePageChange("next")}
        >
          Next &gt;
        </button>
      </div>
      {isModalVisible && (
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default OurProducts;
