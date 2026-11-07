document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('article-feed');
    const singleArticleContainer = document.getElementById('single-article-view');
    
    if (!posts || posts.length === 0) {
        if(feedContainer) feedContainer.innerHTML = '<p>No articles available at this time.</p>';
        if(singleArticleContainer) singleArticleContainer.innerHTML = '<p>Article not found.</p>';
        return;
    }

    // --- LOGIC FOR HOMEPAGE (index.html) ---
    if (feedContainer) {
        // 1. Process Featured Article (Index 0)
        const featured = posts[0];
        const isLongArticle = featured.content.length > 2;
        
        let featuredHTML = `
            <article class="featured-post">
                <div class="post-header">
                    <h2>${featured.title}</h2>
                    <span class="date">${featured.date}</span>
                </div>
                <div class="post-content">
        `;

        if (isLongArticle) {
            // Display exactly the first 2 paragraphs initially, wrap button in an anchor tag to the new page
            featuredHTML += featured.content.slice(0, 2).map(p => `<p>${p}</p>`).join('');
            featuredHTML += `</div><a href="article.html?id=0" class="read-more">Read Full Article</a>`;
        } else {
            featuredHTML += featured.content.map(p => `<p>${p}</p>`).join('');
            featuredHTML += `</div>`;
            featuredHTML += generateBioHTML(featured.authorBio);
        }
        featuredHTML += `</article>`;

        // 2. Process Recent Articles (Index 1 and 2)
        let recentHTML = '';
        if (posts.length > 1) {
            recentHTML = `<div class="recent-posts-grid">`;
            for (let i = 1; i <= 2; i++) {
                if (posts[i]) {
                    const recent = posts[i];
                    recentHTML += `
                        <article class="recent-post">
                            <h3>${recent.title}</h3>
                            <span class="date">${recent.date}</span>
                            <div class="post-content">
                                <p>${recent.content[0]}</p>
                            </div>
                            <a href="article.html?id=${i}" class="read-more">Read Full Article</a>
                        </article>
                    `;
                }
            }
            recentHTML += `</div>`;
        }
        feedContainer.innerHTML = featuredHTML + recentHTML;
    }

    // --- LOGIC FOR SINGLE ARTICLE PAGE (article.html) ---
    if (singleArticleContainer) {
        // Get the article ID from the URL (e.g., article.html?id=0)
        const urlParams = new URLSearchParams(window.location.search);
        let postId = urlParams.get('id');
        
        // If no ID is provided or it's invalid, default to the featured article (0)
        if (postId === null || !posts[postId]) {
            postId = 0;
        }

        const article = posts[postId];
        
        let articleHTML = `
            <article class="full-post">
                <div class="post-header">
                    <h2>${article.title}</h2>
                    <span class="date">${article.date}</span>
                </div>
                <div class="post-content">
        `;
        
        // Render every single paragraph/section in the array
        articleHTML += article.content.map(p => `<p>${p}</p>`).join('');
        articleHTML += `</div>`;
        
        // Always append the author bio at the bottom of the full article page
        articleHTML += generateBioHTML(article.authorBio);
        articleHTML += `</article>`;
        
        singleArticleContainer.innerHTML = articleHTML;
    }
});

// Helper Function to generate Author Bio Block
function generateBioHTML(bio) {
    if (!bio) return '';
    return `
        <div class="author-bio">
            <img src="${bio.image}" alt="Photo of ${bio.names}">
            <div class="bio-info">
                <h4>${bio.names}</h4>
                <p class="titles">${bio.titles} | ${bio.location}</p>
                <p class="email"><a href="mailto:${bio.email}" style="color: inherit; text-decoration: none;">${bio.email}</a></p>
                <p class="bio-text">${bio.text}</p>
            </div>
        </div>
    `;
}
