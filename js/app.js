document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('article-feed');
    
    if (!posts || posts.length === 0) {
        feedContainer.innerHTML = '<p>No articles available at this time.</p>';
        return;
    }

    // 1. Process Featured Article (Index 0)
    const featured = posts[0];
    const isLongArticle = featured.content.length > 2;
    
    let featuredHTML = `
        <article class="featured-post" id="featured-article-card">
            <div class="post-header">
                <h2>${featured.title}</h2>
                <span class="date">${featured.date}</span>
            </div>
            <div class="post-content" id="featured-content-body">
    `;

    if (isLongArticle) {
        // Display exactly the first 2 paragraphs initially
        featuredHTML += featured.content.slice(0, 2).map(p => `<p>${p}</p>`).join('');
        featuredHTML += `</div><button class="read-more" id="read-more-btn">Read Full Article</button>`;
    } else {
        // Display full article and Bio immediately if short
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
                        <button class="read-more" onclick="alert('Full article view for recent posts coming soon!')">Read Full Article</button>
                    </article>
                `;
            }
        }
        recentHTML += `</div>`;
    }

    // Render to DOM
    feedContainer.innerHTML = featuredHTML + recentHTML;

    // Attach click handler for Featured Article expansion
    if (isLongArticle) {
        const readMoreBtn = document.getElementById('read-more-btn');
        const contentBody = document.getElementById('featured-content-body');
        const card = document.getElementById('featured-article-card');

        readMoreBtn.addEventListener('click', () => {
            // Render remaining paragraphs (from index 2 onwards)
            const remainingParagraphs = featured.content.slice(2).map(p => `<p>${p}</p>`).join('');
            contentBody.insertAdjacentHTML('beforeend', remainingParagraphs);
            
            // Append Author Bio
            card.insertAdjacentHTML('beforeend', generateBioHTML(featured.authorBio));
            
            // Remove the button after expanding
            readMoreBtn.remove();
        });
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
