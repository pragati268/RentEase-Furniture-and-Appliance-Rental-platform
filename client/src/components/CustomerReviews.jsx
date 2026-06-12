import React from "react";

const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    text: "The sofa arrived in perfect condition. The delivery team was professional and the entire rental process was seamless.",
    product: "Modern 3 Seater Sofa",
    avatar: "👩",
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    rating: 5,
    text: "The flexibility and affordability of RentEase helped me furnish my apartment without spending a fortune. Highly recommended!",
    product: "Dining Table Set",
    avatar: "👨",
  },
  {
    name: "Ananya Gupta",
    location: "Bangalore",
    rating: 4,
    text: "Great quality refrigerator at a reasonable monthly rate. The maintenance support is prompt and hassle-free.",
    product: "Double Door Refrigerator",
    avatar: "👩‍🦱",
  },
  {
    name: "Vikram Singh",
    location: "Pune",
    rating: 5,
    text: "I rented a WFH setup and it arrived in two days. The furniture was brand new and the team set everything up perfectly.",
    product: "Ergonomic Office Chair",
    avatar: "🧑",
  },
  {
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Renting appliances was the best decision. No upfront costs, free maintenance, and easy returns. Love RentEase!",
    product: "Front Load Washing Machine",
    avatar: "👩‍🦰",
  },
  {
    name: "Arjun Nair",
    location: "Kochi",
    rating: 4,
    text: "Smooth from browsing to delivery. The pricing is transparent with no hidden charges. Will rent again for sure.",
    product: "Queen Size Bed",
    avatar: "👨‍🦱",
  },
];

const CustomerReviews = () => {
  const renderStars = (count) => {
    return "⭐".repeat(count);
  };

  return (
    <section className="bg-[#F0F2F1] px-5 md:px-10 lg:px-20 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Trust Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#345246]">10,000+</p>
            <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#345246]">500+</p>
            <p className="text-gray-600 text-sm mt-1">Products</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#345246]">15+</p>
            <p className="text-gray-600 text-sm mt-1">Cities Served</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-bold text-[#345246]">4.8★</p>
            <p className="text-gray-600 text-sm mt-1">Average Rating</p>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1f312a] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Thousands of customers trust RentEase for hassle-free furniture and appliance rentals.
          </p>
        </div>

        {/* Review of the Month - Featured */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-10 shadow-md border border-[#345246]/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="text-[#345246] font-semibold text-sm uppercase tracking-wider">Customer Spotlight</span>
          </div>
          <p className="text-lg md:text-xl text-gray-800 italic font-medium leading-relaxed">
            "The flexibility and affordability of RentEase helped me furnish my apartment without spending a fortune."
          </p>
          <p className="mt-4 text-[#345246] font-semibold">— Rahul Verma</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{review.avatar}</span>
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.location}</p>
                </div>
              </div>

              <p className="text-sm tracking-wide mb-3">{renderStars(review.rating)}</p>

              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="inline-block bg-[#345246]/10 text-[#345246] text-xs font-medium px-3 py-1 rounded-full">
                  Rented: {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
