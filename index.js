import reddit from "./reddit-api";

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


// Form event listener
searchForm.addEventListener('submit', e => {
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked')
    .value;
    // Get limit
    const searchLimit = document.getElementById('limit').value;

    // Check input 
    if (searchTerm === '') {
        // Show message
        showMessage('Please add a search term', 'alert-danger');
    }

    // Clear search
    searchInput.value = '';

    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            let output = '<div class="card-columns">';
            // Loop through posts
            results.forEach(post => {
                // Check for image
                let image = post.preview ? post.preview.images[0].source.url
                : 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/11/reddit-796x397.png';

                output += `
                <div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext,100 )}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                    <hr>
                        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                        <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
                </div>
                `;
            })
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });

    e.preventDefault(); 
});

// showMessage
function showMessage(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.append(document.createTextNode(message));
    // Get parent container
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');

    // insert message
    searchContainer.insertBefore(div, search);

    // Timeout alert
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}


// Truncate text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened === -1) {
        return text;
    }
    return text.substring(0, shortened);
}