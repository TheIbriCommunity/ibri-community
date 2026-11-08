document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('article-feed');
    
    if (!posts || posts.length === 0) {
        if(feedContainer) feedContainer.innerHTML = '<p>No articles available at this time.</p>';
        return;
    }

    // --- LOGIC FOR HOMEPAGE (index.html) ---
    if (feedContainer) {
        const featured = posts[0];
        
        let featuredHTML = `
            <article class="featured-post" style="border-bottom: 1px solid rgba(77, 91, 63, 0.2); padding-bottom: 50px; margin-bottom: 50px;">
                <span class="pub-eyebrow">FEATURED PUBLICATION</span>
                <h2 class="pub-title" style="font-size: 3rem; margin-bottom: 15px;">${featured.title}</h2>
                <p class="pub-subtitle" style="font-size: 1.3rem; margin-bottom: 25px;">${featured.content[0]}</p>
                
                <div class="pub-meta" style="margin-bottom: 30px;">
                    <span>Elder ObedYahu & Elder DevorahYahu</span>
                    <span>${featured.date}</span>
                </div>
                
                <div class="post-content">
                    <blockquote class="gold-callout">
                        ${featured.content[1]}
                    </blockquote>
                    <p>${featured.content[2]}</p>
                </div>
                <a href="article.html" class="read-more">Read Full Article</a>
            </article>
        `;

        // Process Recent Articles (Index 1 and 2) if they exist
        let recentHTML = '';
        if (posts.length > 1) {
            recentHTML = `<div class="recent-posts-grid">`;
            for (let i = 1; i <= 2; i++) {
                if (posts[i]) {
                    const recent = posts[i];
                    recentHTML += `
                        <article class="recent-post">
                            <h3 style="color: var(--brand-green); font-size: 1.8rem; margin-bottom: 10px;">${recent.title}</h3>
                            <span class="date" style="margin-bottom: 15px;">${recent.date}</span>
                            <div class="post-content">
                                <p>${recent.content[0]}</p>
                            </div>
                            <!-- Note: Future articles will need their own dedicated HTML pages or URL parameters -->
                            <a href="#" class="read-more">Read Full Article</a>
                        </article>
                    `;
                }
            }
            recentHTML += `</div>`;
        }
        feedContainer.innerHTML = featuredHTML + recentHTML;
    }
});
