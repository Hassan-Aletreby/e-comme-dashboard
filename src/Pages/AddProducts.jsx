import React, { useState } from "react";
import supabase from "../supabaseClient";
import Input from "../Components/input";
import "../style/Add_Product.css";
import Title from "../Components/Tittle";
import ConfirmationModal from "../Components/ConfirmationModal";

const AddProducts = () => {
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    images: [],
    reviews: "",
    category: "",
    brand: "",
    title: "",
    rating: "",
    stock: "",
    discountPercentage: "",
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field being changed
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required.";
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
      valid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
      valid = false;
    }

    if (!formData.brand) {
      newErrors.brand = "Brand is required.";
      valid = false;
    }

    if (
      formData.rating &&
      (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5)
    ) {
      newErrors.rating = "Rating must be a number between 1 and 5.";
      valid = false;
    }

    if (
      formData.stock &&
      (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) <= 0)
    ) {
      newErrors.stock = "Stock quantity must be a positive integer.";
      valid = false;
    }

    if (
      formData.discountPercentage &&
      (formData.discountPercentage < 0 || formData.discountPercentage > 100)
    ) {
      newErrors.discountPercentage =
        "Discount Percentage must be between 0 and 100.";
      valid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setIsModalVisible(true);
      return;
    }

    setIsModalVisible(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setErrors({});
      setSuccess("");

      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const { data, error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(`public/${file.name}`, file);

          if (uploadError) throw uploadError;

          return data.Key;
        })
      );

      const { error } = await supabase
        .from("products")
        .insert([{ ...formData, images: imageUrls }]);

      if (error) throw error;

      setFormData({
        description: "",
        price: "",
        images: [],
        reviews: "",
        category: "",
        brand: "",
        title: "",
        rating: "",
        stock: "",
        discountPercentage: "",
      });
      setImagePreviews([]);

      setSuccess("Product added successfully!");
    } catch (error) {
      setErrors({ global: "Error submitting form: " + error.message });
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleCancelSubmit = () => {
    setIsModalVisible(false);
  };

  const getGlobalErrorMessage = () => {
    if (errors.global) {
      return errors.global;
    } else if (Object.keys(errors).length > 0) {
      return "There are errors in the form. Please check the fields.";
    }
    return "";
  };

  return (
    <div className="form-container">
      <Title title="Add New Product" path="/products/create" />
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter Product Name ..."
                />
                {errors.title && (
                  <div className="error-message">{errors.title}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Product Price ..."
                />
                {errors.price && (
                  <div className="error-message">{errors.price}</div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reviews">Reviews:</label>
                <Input
                  id="reviews"
                  name="reviews"
                  value={formData.reviews}
                  placeholder="Read Only."
                  readonly={formData.readonly}
                />
                {errors.reviews && (
                  <div className="error-message">{errors.reviews}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter Product Category ..."
                />
                {errors.category && (
                  <div className="error-message">{errors.category}</div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand:</label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter Product Brand ..."
                />
                {errors.brand && (
                  <div className="error-message">{errors.brand}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <Input
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Enter Product Rating ..."
                />
                {errors.rating && (
                  <div className="error-message">{errors.rating}</div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stock">Stock:</label>
                <Input
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter Product Stock ..."
                />
                {errors.stock && (
                  <div className="error-message">{errors.stock}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="discountPercentage">Discount Percentage:</label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  placeholder="Enter Product Discount Percentage ..."
                />
                {errors.discountPercentage && (
                  <div className="error-message">
                    {errors.discountPercentage}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="image-upload-section">
            <div className="image-preview">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index + 1}`} />
              ))}
            </div>
            <div className="image-upload-container">
              <label htmlFor="image-upload" className="upload-box">
                <p>Click to upload image(s)</p>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full-width">
            <label htmlFor="description">Description:</label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Product Description ..."
              textarea={true}
            />
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
      {isModalVisible && (
        <ConfirmationModal
          message={getGlobalErrorMessage()}
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}
    </div>
  );
};

export default AddProducts;
