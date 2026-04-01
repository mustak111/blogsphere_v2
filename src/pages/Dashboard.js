import { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import BlogCard from "../components/BlogCard";
import blogPosts from "../data/blogPosts";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case "discussed":
        filtered.sort((a, b) => b.comments - a.comments);
        break;
      case "latest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);
  const showFeatured =
    selectedCategory === "All" && !searchQuery.trim() && sortBy === "latest";

  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = blogPosts.reduce((sum, post) => sum + post.comments, 0);

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-greeting">
            <h1>
              Welcome back, <span className="highlight">{user?.name}</span> 👋
            </h1>
            <p>
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-details">
                <span className="stat-value">{blogPosts.length}</span>
                <span className="stat-text">Total Posts</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-icon">❤️</div>
              <div className="stat-details">
                <span className="stat-value">
                  {totalLikes.toLocaleString()}
                </span>
                <span className="stat-text">Total Likes</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-details">
                <span className="stat-value">{totalComments}</span>
                <span className="stat-text">Comments</span>
              </div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-details">
                <span className="stat-value">
                  {new Set(blogPosts.map((p) => p.author)).size}
                </span>
                <span className="stat-text">Writers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="dashboard-controls">
        <div className="controls-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search posts, authors, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="controls-right">
            <div className="sort-dropdown">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="discussed">Most Discussed</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                ▦
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {category !== "All" && (
                <span className="category-count">
                  {blogPosts.filter((p) => p.category === category).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      {showFeatured && featuredPosts.length > 0 && (
        <section className="dashboard-section">
          <div className="section-container">
            <div className="section-header">
              <h2>⭐ Featured Posts</h2>
              <p>Hand-picked stories you shouldn't miss</p>
            </div>
            <div className="featured-grid">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="dashboard-section">
        <div className="section-container">
          <div className="section-header">
            <h2>
              {searchQuery
                ? `Search Results`
                : selectedCategory !== "All"
                  ? `${selectedCategory} Posts`
                  : "📚 All Posts"}
            </h2>
            <p>
              {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}{" "}
              found
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No posts found</h3>
              <p>
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <button
                className="reset-btn"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSortBy("latest");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`posts-grid ${viewMode === "list" ? "list-view" : ""}`}
            >
              {(showFeatured ? regularPosts : filteredPosts).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>📬 Stay Updated</h2>
            <p>
              Get the latest posts delivered right to your inbox. No spam, ever.
            </p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
