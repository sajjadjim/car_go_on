"use client";
import React from "react";

export default function ProductAddForm() {
  const getCurrentDateTime = () => {
    const now = new Date();
    // Format to "YYYY-MM-DDTHH:MM" for datetime-local input
    return now.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = React.useState({
    id: "",
    title: "",
    description: "",
    category: "Web Developer", // default category
    status: "Pending", // default status
    createdAt: getCurrentDateTime(), // default to now
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      // Reset form after successful insert
      setFormData({
        id: "",
        title: "",
        description: "",
        category: "Web Developer",
        status: "Pending",
        createdAt: getCurrentDateTime(),
      });
      alert("✅ Product added successfully!");
    } else {
      alert("❌ Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        {/* ID */}
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-600">
            ID
          </label>
          <input
            type="number"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product ID"
            required
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Web Developer">Web Developer</option>
            <option value="App Developer">App Developer</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
          </select>
        </div>

        {/* Status (default Pending) */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            readOnly
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-gray-100 shadow-sm focus:outline-none"
          />
        </div>

        {/* Created At */}
        <div className="mb-6">
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-600">
            Created At
          </label>
          <input
            type="datetime-local"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
