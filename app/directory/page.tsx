"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "../header";
import Footer from "../footer";
import "./directory.css";

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

interface Resource {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  address: string;
  cost: string;
  tags: string[];
  image: string;
  latitude: number;
  longitude: number;
}

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCost, setSelectedCost] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hoveredResource, setHoveredResource] = useState<number | null>(null);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showCostFilter, setShowCostFilter] = useState(false);
  const [showTagsFilter, setShowTagsFilter] = useState(false);

  const resourcesData: Resource[] = [
    {
      id: 1,
      title: "Sammamish Farmers Market",
      type: "Event",
      date: "Every Wednesday",
      time: "3:00 PM - 8:00 PM",
      location: "Upper Sammamish Commons",
      address: "801 228th Ave SE, Sammamish, WA 98075",
      cost: "Free Entry",
      tags: ["Community", "Food", "Family"],
      image: "https://images.unsplash.com/photo-1514583079045-e928a4732ade?w=600",
      latitude: 47.601448,
      longitude: -122.037971,
    },
    {
      id: 2,
      title: "Volunteer @ Sammamish Landing",
      type: "Volunteering",
      date: "Saturday, Feb 2, 2026",
      time: "9:00 AM - 12:00 PM",
      location: "Sammamish Landing",
      address: "4607 E Lake Sammamish Pkwy NE, Sammamish, WA 98074",
      cost: "Free",
      tags: ["Community", "Environment", "Volunteering"],
      image: "https://images.unsplash.com/photo-1652971876875-05db98fab376?w=600",
      latitude: 47.650410,
      longitude: -122.089241,
    },
    {
      id: 3,
      title: "Coffee with Council",
      type: "Event",
      date: "Thursday, Jan 28, 2026",
      time: "10:00 AM - 11:30 AM",
      location: "Sammamish City Hall",
      address: "801 228th Ave SE, Sammamish, WA 98075",
      cost: "Free Entry",
      tags: ["Community", "Government", "Networking"],
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
      latitude: 47.601448,
      longitude: -122.037971,
    },
    {
      id: 4,
      title: "Youth Soccer Program",
      type: "Program",
      date: "Every Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Marymoor Park Field E",
      address: "6046 W Lake Sammamish Pkwy NE, Redmond, WA 98052",
      cost: "$50/month",
      tags: ["Youth", "Sports", "Recreation"],
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600",
      latitude: 47.661770,
      longitude: -122.125977,
    },
    {
      id: 5,
      title: "iCode Sammamish Intro to Coding",
      type: "Workshop",
      date: "Friday, Feb 5, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "iCode Sammamish",
      address: "22840 NE 8th St, Sammamish, WA 98074",
      cost: "$15",
      tags: ["Arts", "Education", "Community"],
      image: "https://images.unsplash.com/photo-1610986603166-f78428624e76?w=600",
      latitude: 47.616653,
      longitude: -122.034168,
    },
    {
      id: 6,
      title: "Senior Fitness Classes",
      type: "Program",
      date: "Mondays & Wednesdays",
      time: "9:00 AM - 10:00 AM",
      location: "Sammamish YMCA",
      address: "831 228th Ave SE, Sammamish, WA 98075",
      cost: "Free",
      tags: ["Seniors", "Health", "Fitness"],
      image: "https://images.unsplash.com/photo-1764173040171-57f79264b358?w=600",
      latitude: 47.616653,
      longitude: -122.034168,
    },
  ];

  const allTags = Array.from(
    new Set(resourcesData.flatMap((r) => r.tags))
  ).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesCost =
      selectedCost === "all" ||
      (selectedCost === "free" &&
        (resource.cost.toLowerCase().includes("free") ||
          resource.cost === "Free Entry")) ||
      (selectedCost === "paid" &&
        !resource.cost.toLowerCase().includes("free"));
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => resource.tags.includes(tag));

    return matchesSearch && matchesType && matchesCost && matchesTags;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCost("all");
    setSelectedTags([]);
  };

  return (
    <div className="directory-page">
      <Header />

      <main className="directory-main">
        {/* Hero Section */}
        <section className="directory-hero">
          <div className="directory-hero-content">
            <h1 className="directory-title">Find Community Resources</h1>
            <p className="directory-subtitle">
              Discover events, volunteer opportunities, programs, and more in the Sammamish community
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="directory-controls">
          <div className="directory-controls-container">
            <div className="search-bar-wrapper">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                className="search-bar-input"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="directory-overlay">
          <div className="directory-content">
            <div className="directory-content-container">
              {/* Results Count */}
              <div className="results-header">
                <p className="results-count">
                  {filteredResources.length}{" "}
                  {filteredResources.length === 1 ? "resource" : "resources"}{" "}
                  found
                </p>
              </div>

              <div className="filters-wrapper">
                {/* Type Filter */}
                <div className="filter-dropdown-wrapper">
                  <button
                    className="filter-button"
                    onClick={() => setShowTypeFilter(!showTypeFilter)}
                  >
                    <span>
                      Type: {selectedType === "all" ? "All" : selectedType}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {showTypeFilter && (
                    <div className="filter-dropdown">
                      <button
                        className={`filter-option ${
                          selectedType === "all" ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedType("all");
                          setShowTypeFilter(false);
                        }}
                      >
                        All Types
                      </button>
                      {["Event", "Volunteering", "Program", "Workshop"].map(
                        (type) => (
                          <button
                            key={type}
                            className={`filter-option ${
                              selectedType === type ? "active" : ""
                            }`}
                            onClick={() => {
                              setSelectedType(type);
                              setShowTypeFilter(false);
                            }}
                          >
                            {type}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Cost Filter */}
                <div className="filter-dropdown-wrapper">
                  <button
                    className="filter-button"
                    onClick={() => setShowCostFilter(!showCostFilter)}
                  >
                    <span>
                      Cost:{" "}
                      {selectedCost === "all"
                        ? "All"
                        : selectedCost === "free"
                        ? "Free"
                        : "Paid"}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {showCostFilter && (
                    <div className="filter-dropdown">
                      <button
                        className={`filter-option ${
                          selectedCost === "all" ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedCost("all");
                          setShowCostFilter(false);
                        }}
                      >
                        All
                      </button>
                      <button
                        className={`filter-option ${
                          selectedCost === "free" ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedCost("free");
                          setShowCostFilter(false);
                        }}
                      >
                        Free
                      </button>
                      <button
                        className={`filter-option ${
                          selectedCost === "paid" ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedCost("paid");
                          setShowCostFilter(false);
                        }}
                      >
                        Paid
                      </button>
                    </div>
                  )}
                </div>

                {/* Tags Filter */}
                <div className="filter-dropdown-wrapper">
                  <button
                    className="filter-button"
                    onClick={() => setShowTagsFilter(!showTagsFilter)}
                  >
                    <span>
                      Tags{selectedTags.length > 0 ? ` (${selectedTags.length})` : ""}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {showTagsFilter && (
                    <div className="filter-dropdown tags-dropdown">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          className={`filter-option ${
                            selectedTags.includes(tag) ? "active" : ""
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          <span>{tag}</span>
                          {selectedTags.includes(tag) && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.3334 4L6.00002 11.3333L2.66669 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="reset-filters-button" onClick={resetFilters}>
                  Reset
                </button>
              </div>

              <div className="directory-layout">
                {/* Resources List */}
                <div className="resources-list">
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="resource-card-directory"
                        onMouseEnter={() => setHoveredResource(resource.id)}
                        onMouseLeave={() => setHoveredResource(null)}
                      >
                        <div className="resource-card-image-container">
                          <img
                            src={resource.image}
                            alt={resource.title}
                            className="resource-card-image"
                          />
                        </div>

                        <div className="resource-card-content">
                          <div className="resource-card-header">
                            <span className="resource-type-badge">
                              {resource.type}
                            </span>
                          </div>

                          <h3 className="resource-card-title">{resource.title}</h3>

                          <div className="resource-card-details">
                            <div className="resource-detail-item">
                              <svg
                                className="detail-icon calendar-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 13 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.625 0.875V1.75H1.3125C0.587891 1.75 0 2.33789 0 3.0625V4.375H12.25V3.0625C12.25 2.33789 11.6621 1.75 10.9375 1.75H9.625V0.875C9.625 0.391016 9.23398 0 8.75 0C8.26602 0 7.875 0.391016 7.875 0.875V1.75H4.375V0.875C4.375 0.391016 3.98398 0 3.5 0C3.01602 0 2.625 0.391016 2.625 0.875ZM12.25 5.25H0V12.6875C0 13.4121 0.587891 14 1.3125 14H10.9375C11.6621 14 12.25 13.4121 12.25 12.6875V5.25Z"
                                  fill="#0EA5E9"
                                />
                              </svg>
                              <span className="detail-text">
                                {resource.date} • {resource.time}
                              </span>
                            </div>

                            <div className="resource-detail-item">
                              <svg
                                className="detail-icon location-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 11 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5.89805 13.65C7.30078 11.8945 10.5 7.63984 10.5 5.25C10.5 2.35156 8.14844 0 5.25 0C2.35156 0 0 2.35156 0 5.25C0 7.63984 3.19922 11.8945 4.60195 13.65C4.93828 14.0684 5.56172 14.0684 5.89805 13.65ZM5.25 3.5C5.71413 3.5 6.15925 3.68437 6.48744 4.01256C6.81563 4.34075 7 4.78587 7 5.25C7 5.71413 6.81563 6.15925 6.48744 6.48744C6.15925 6.81563 5.71413 7 5.25 7C4.78587 7 4.34075 6.81563 4.01256 6.48744C3.68437 6.15925 3.5 5.71413 3.5 5.25C3.5 4.78587 3.68437 4.34075 4.01256 4.01256C4.34075 3.68437 4.78587 3.5 5.25 3.5Z"
                                  fill="#10B981"
                                />
                              </svg>
                              <span className="detail-text">
                                {resource.location}
                              </span>
                            </div>

                            <div className="resource-detail-item">
                              <svg
                                className="detail-icon cost-icon"
                                width="16"
                                height="16"
                                viewBox="0 0 16 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.75 1.75C0.784766 1.75 0 2.53477 0 3.5V5.25C0 5.49062 0.202344 5.6793 0.429297 5.75859C0.943359 5.93633 1.3125 6.42578 1.3125 7C1.3125 7.57422 0.943359 8.06367 0.429297 8.24141C0.202344 8.3207 0 8.50938 0 8.75V10.5C0 11.4652 0.784766 12.25 1.75 12.25H14C14.9652 12.25 15.75 11.4652 15.75 10.5V8.75C15.75 8.50938 15.5477 8.3207 15.3207 8.24141C14.8066 8.06367 14.4375 7.57422 14.4375 7C14.4375 6.42578 14.8066 5.93633 15.3207 5.75859C15.5477 5.6793 15.75 5.49062 15.75 5.25V3.5C15.75 2.53477 14.9652 1.75 14 1.75H1.75ZM3.5 4.8125V9.1875C3.5 9.42812 3.69688 9.625 3.9375 9.625H11.8125C12.0531 9.625 12.25 9.42812 12.25 9.1875V4.8125C12.25 4.57188 12.0531 4.375 11.8125 4.375H3.9375C3.69688 4.375 3.5 4.57188 3.5 4.8125ZM2.625 4.375C2.625 3.89102 3.01602 3.5 3.5 3.5H12.25C12.734 3.5 13.125 3.89102 13.125 4.375V9.625C13.125 10.109 12.734 10.5 12.25 10.5H3.5C3.01602 10.5 2.625 10.109 2.625 9.625V4.375Z"
                                  fill="#F59E0B"
                                />
                              </svg>
                              <span className="detail-text cost-text">
                                {resource.cost}
                              </span>
                            </div>
                          </div>

                          <div className="resource-tags">
                            {resource.tags.map((tag) => (
                              <span key={tag} className="resource-tag-chip">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results-message">
                      <p>No resources found matching your criteria.</p>
                      <button
                        className="reset-filters-button"
                        onClick={resetFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Map */}
                <div className="map-container">
                  <MapComponent
                    resources={filteredResources}
                    hoveredResourceId={hoveredResource}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
