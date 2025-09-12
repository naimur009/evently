"use client";
import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Captions,
  MapPinned,
  MapPinHouse,
  User,
  Ticket,
  Clock,
} from "lucide-react";
import api from "@/app/libs/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    event_title: "",
    description: "",
    category: "",
    organizer: "",
    city: "",
    event_date: "",
    venue: "",
    image: "",
    price: 1,
    ticket_limit: 1,
    deadline: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState([]);

  const router = useRouter();

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get("/category");
        setCategory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "number" ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.event_title) newErrors.event_title = "Event title is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (formData.description.length < 30)
      newErrors.description = "Description must be at least 30 characters long.";
    // if (!formData.organizer) newErrors.organizer = "Organizer is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.event_date) newErrors.event_date = "Event date is required.";
    if (new Date(formData.event_date) <= new Date())
      newErrors.event_date = "Event date must be in the future.";
    if (!formData.venue) newErrors.venue = "Venue is required.";
    if (formData.price < 0) newErrors.price = "Price cannot be negative.";
    if (formData.ticket_limit < 1)
      newErrors.ticket_limit = "Ticket limit must be at least 1.";
    if (!formData.deadline) newErrors.deadline = "Deadline is required.";
    if (new Date(formData.deadline) <= new Date())
      newErrors.deadline = "Deadline must be in the future.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please correct the errors in the form.");
      return;
    }

    try {
      const data = await api.post("/event/create", formData); // Send formData directly
      alert("Event created successfully!");
      router.push("/dashboard/events");
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-4 sm:p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0">
            <PlusCircle className="w-7 h-7 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Create New Event
            </h1>
          </div>
          <span className="text-xs text-gray-500">
            Fill in the details below.
          </span>
        </div>

        {/* Event Creation Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* Left Column */}
          <div>
            {/* title */}
            <div className="relative mb-5">
              <label
                htmlFor="event_title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Captions />
                </div>
                <input
                  id="event_title"
                  name="event_title"
                  value={formData.event_title ?? ""}
                  onChange={handleInputChange}
                  className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.event_title ? "border-red-500" : "border-gray-300"}
      `}
                />
              </div>
              {errors.event_title && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.event_title}
                </span>
              )}
            </div>



            {/* Description */}
            <div className="relative mb-5">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                onChange={handleInputChange}
                value={formData.description}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.description ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.description}
                </span>
              )}
            </div>


            {/* city */}
            <div className="relative mb-5">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MapPinned />
                </div>
                <input
                  id="city"
                  name="city"
                  value={formData.city ?? ""}
                  onChange={handleInputChange}
                  className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.city ? "border-red-500" : "border-gray-300"}
      `}
                />
              </div>
              {errors.city && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.city}
                </span>
              )}
            </div>




            {/* venue */}
            <div className="relative mb-5">
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Venue
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MapPinHouse />
                </div>
                <input
                  id="venue"
                  name="venue"
                  value={formData.venue ?? ""}
                  onChange={handleInputChange}
                  className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.venue ? "border-red-500" : "border-gray-300"}
      `}
                />
              </div>
              {errors.venue && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.venue}
                </span>
              )}
            </div>



            {/* Organizer */}
            <div className="relative mb-5">
              <label
                htmlFor="organizer"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organizer
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User />
                </div>
                <input
                  id="organizer"
                  name="organizer"
                  value={formData.organizer}
                  onChange={handleInputChange}
                  className={`
                    mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
                    focus:ring-indigo-500 focus:border-indigo-500 text-sm
                    ${errors.organizer ? "border-red-500" : "border-gray-300"}
                  `}
                />
              </div>
              {errors.organizer && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.organizer}
                </span>
              )}
            </div>




            {/* Category */}
            <div className="relative mb-5">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full pl-3 pr-10 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.category ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select a category</option>
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">{errors.category}</span>
              )}
            </div>
          </div>




          {/* Right Column */}
          <div>

            {/* Image */}
            <div className="relative mb-5">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Event Image URL
              </label>
              <div className="mt-1 flex justify-center items-center px-4 pt-4 pb-5 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Event Preview"
                      width={400}
                      height={128}
                      className="mx-auto h-28 sm:h-32 w-full max-w-xs object-cover rounded-lg shadow-md"
                      unoptimized
                    />
                  ) : (
                    <ImageIcon className="mx-auto h-10 w-10 text-gray-400" />
                  )}
                </div>
              </div>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="Paste your image URL here..."
                onChange={handleInputChange}
                value={formData.image}
                className="mt-2 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm border-gray-300"
              />
              {errors.image && (
                <span className="text-red-500 text-xs mt-1">{errors.image}</span>
              )}
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {/* // price */}
              <div className="relative mb-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <DollarSign />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price ?? ""}
                    onChange={handleInputChange}
                    min={1}
                    step={1}
                    className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.price ? "border-red-500" : "border-gray-300"}
      `}
                  />
                </div>
                {errors.price && (
                  <span className="text-red-500 text-xs mt-1 absolute left-0">
                    {errors.price}
                  </span>
                )}
              </div>

              {/* Ticket Limit */}
              <div className="relative mb-5">
                <label
                  htmlFor="ticket_limit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ticket Limit
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Ticket />
                  </div>
                  <input
                    type="number"
                    id="ticket_limit"
                    name="ticket_limit"
                    value={formData.ticket_limit ?? ""}
                    onChange={handleInputChange}
                    min={1}
                    step={1}
                    className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.ticket_limit ? "border-red-500" : "border-gray-300"}
      `}
                  />
                </div>
                {errors.ticket_limit && (
                  <span className="text-red-500 text-xs mt-1 absolute left-0">
                    {errors.ticket_limit}
                  </span>
                )}
              </div>
            </div>


            {/* Event date */}
            <div className="relative mb-5">
              <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Calendar />
                </div>
                <input
                  type="date"
                  id="event_date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className={`mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.event_date ? "border-red-500" : "border-gray-300"
                    }`}
                />
              </div>
              {errors.event_date && (
                <span className="text-red-500 text-xs mt-1 block">{errors.event_date}</span>
              )}
            </div>


            {/* Event Deadline */}
            <div className="relative mb-5">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Deadline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Calendar />
                </div>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.deadline ? "border-red-500" : "border-gray-300"
                    }`}
                />
              </div>
              {errors.deadline && (
                <span className="text-red-500 text-xs mt-1 block">{errors.deadline}</span>
              )}
            </div>
            {/* Time */}
            <div className="relative mb-5">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Clock />
                </div>
                <input
                  id="time"
                  name="time"
                  value={formData.time ?? ""}
                  onChange={handleInputChange}
                  className={`
        mt-1 block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm
        focus:ring-indigo-500 focus:border-indigo-500 text-sm
        ${errors.time ? "border-red-500" : "border-gray-300"}
      `}
                />
              </div>
              {errors.time && (
                <span className="text-red-500 text-xs mt-1 absolute left-0">
                  {errors.time}
                </span>
              )}
            </div>


          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
