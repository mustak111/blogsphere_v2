import { useState } from "react";
import "./BlogCard.css";

const BlogCard = ({ post, featured }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const getCategoryColor = (category) => {
    const colors = {
      React: "#61dafb",
      CSS: "#264de4",
      "Node.js": "#68a063",
      TypeScript: "#3178c6",
      Backend: "#ff6b35",
      JavaScript: "#f7df1e",
      DevOps: "#0db7ed",
    };
    return colors[category] || "#6c63ff";
  };

  if (featured) {
    return (
      <article className="blog-card featured-card">
        <div className="featured-image-wrapper">
          <img src={post.image} alt={post.title} className="featured-image" />
          <div className="featured-overlay">
            <span className="featured-badge">⭐ Featured</span>
          </div>
        </div>
        <div className="featured-content">
          <div className="card-meta-top">
            <span
              className="category-badge"
              style={{ background: getCategoryColor(post.category) }}
            >
              {post.category}
            </span>
            <span className="read-time">📖 {post.readTime}</span>
          </div>
          <h2 className="featured-title">{post.title}</h2>
          <p className="featured-excerpt">{post.excerpt}</p>
          <div className="card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
          <div className="card-footer">
            <div className="author-info">
              <div className="author-avatar">{post.authorAvatar}</div>
              <div className="author-details">
                <span className="author-name">{post.author}</span>
                <span className="post-date">{post.date}</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className={`action-btn ${liked ? "liked" : ""}`}
                onClick={handleLike}
              >
                {liked ? "❤️" : "🤍"} {likeCount}
              </button>
              <button className="action-btn">💬 {post.comments}</button>
              <button
                className={`action-btn ${bookmarked ? "bookmarked" : ""}`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                {bookmarked ? "🔖" : "📑"}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-card">
      <div className="card-image-wrapper">
        <img src={post.image} alt={post.title} className="card-image" />
        <div className="image-overlay">
          <button
            className={`bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
            onClick={() => setBookmarked(!bookmarked)}
          >
            {bookmarked ? "🔖" : "📑"}
          </button>
        </div>
      </div>
      <div className="card-content">
        <div className="card-meta-top">
          <span
            className="category-badge"
            style={{ background: getCategoryColor(post.category) }}
          >
            {post.category}
          </span>
          <span className="read-time">📖 {post.readTime}</span>
        </div>
        <h3 className="card-title">{post.title}</h3>
        <p className="card-excerpt">{post.excerpt}</p>
        <div className="card-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <div className="author-info">
            <div className="author-avatar small">{post.authorAvatar}</div>
            <div className="author-details">
              <span className="author-name">{post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
          <div className="card-actions">
            <button
              className={`action-btn ${liked ? "liked" : ""}`}
              onClick={handleLike}
            >
              {liked ? "❤️" : "🤍"} {likeCount}
            </button>
            <button className="action-btn">💬 {post.comments}</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
