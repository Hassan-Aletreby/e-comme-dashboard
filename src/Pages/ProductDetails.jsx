import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import "../style/ProductsDetails.css";
import Title from "../Components/Tittle.jsx";
import ConfirmationModal from "../Components/ConfirmationModal";
import axiosInstance from "../api/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    reviews: "",
    category: "",
    brand: "",
    rating: "",
    stock: "",
    discountPercentage: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileInputRefs = useRef([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/rest/v1/products", {
          params: {
            id: `eq.${id}`,
          },
        });
        // const response = await axiosInstance.get(
        //   `/rest/v1/products?id=eq.${id}`
        // );
        const data = response.data[0];

        if (data) {
          setProduct(data);
          setFormData({
            title: data.title,
            price: data.price,
            description: data.description,
            reviews: data.reviews,
            category: data.category,
            brand: data.brand,
            rating: data.rating,
            stock: data.stock,
            discountPercentage: data.discountPercentage,
            images: data.images || [],
          });
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      uploadImage(formData)
        .then((url) => {
          setFormData((prev) => {
            const updatedImages = [...prev.images];
            updatedImages[index] = url;
            return {
              ...prev,
              images: updatedImages,
            };
          });
        })
        .catch((error) => {
          setError("Failed to upload image: " + error.message);
        });
    }
  };

  const uploadImage = async (formData) => {
    try {
      const { data } = await axiosInstance.post("/rest/v1/upload", formData);
      return data.publicURL;
    } catch (error) {
      throw new Error("Failed to upload image: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const { error } = await axiosInstance.patch(
        `/rest/v1/products?id=eq.${id}`,
        {
          ...formData,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      setSuccess("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      setError("Failed to update product: " + error.message);
    }
  };

  const handleDelete = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setError("");
      setSuccess("");

      const { error } = await axiosInstance.delete(
        `/rest/v1/products?id=eq.${id}`
      );

      setSuccess("Product deleted successfully!");
      navigate("/products");
    } catch (error) {
      setError("Failed to delete product: " + error.message);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleImageClick = (index) => {
    fileInputRefs.current[index].click();
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product_details_container">
      <div className="header">
        <Title title="Product Details" path="/products/details" />
      </div>
      {product && (
        <div className="product_details">
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter Product Name ..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter Product Price ..."
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="reviews">Reviews:</label>
                    <input
                      type="text"
                      id="reviews"
                      name="reviews"
                      value={formData.reviews}
                      placeholder="Read Only."
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter Product Category ..."
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter Product Brand ..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input
                      type="text"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      placeholder="Enter Product Rating ..."
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input
                      type="text"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Enter Product Stock ..."
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="discountPercentage">
                      Discount Percentage:
                    </label>
                    <input
                      type="text"
                      id="discountPercentage"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleChange}
                      placeholder="Enter Product Discount Percentage ..."
                    />
                  </div>
                </div>
              </div>
              <div className="image-upload-section">
                <div className="image_preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-wrapper">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleImageClick(index)}
                      />
                      <input
                        type="file"
                        onChange={(e) => handleImageChange(index, e)}
                        style={{ display: "none" }}
                        ref={(ref) => (fileInputRefs.current[index] = ref)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Product Description ..."
                />
              </div>
            </div>
            <div className="button_container">
              <button className="button_details" type="submit">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="delete-button button_details"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      )}
      {success && <div className="success-message">{success}</div>}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ProductDetails;
