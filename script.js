document.addEventListener('DOMContentLoaded', function() {
    // Generate visualization thumbnails for dashboard overview
    generateVizThumbnails();
    
    // Set up toggle buttons for switching between interactive and static visualizations
    setupToggleButtons();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add loading indicators for iframes
    setupLoadingIndicators();
});

/**
 * Generates thumbnail cards for the dashboard overview section
 */
function generateVizThumbnails() {
    const vizGrid = document.querySelector('.viz-grid');
    if (!vizGrid) return;
    
    // Get all visualization sections
    const vizSections = document.querySelectorAll('.viz-section');
    
    vizSections.forEach(section => {
        // Extract data from the section
        const id = section.id;
        const title = section.querySelector('h3').textContent;
        const chartType = section.querySelector('.chart-type').textContent;
        const imgSrc = `images/${id}.png`;
        
        // Create thumbnail card
        const card = document.createElement('div');
        card.className = 'viz-thumbnail';
        card.innerHTML = `
            <div class="thumbnail-img">
                <img src="${imgSrc}" alt="${title}" loading="lazy">
            </div>
            <div class="thumbnail-info">
                <h4>${title}</h4>
                <span class="chart-type-small">${chartType}</span>
                <a href="#${id}" class="btn btn-small">View Details</a>
            </div>
        `;
        
        vizGrid.appendChild(card);
    });
    
    // Add CSS for the thumbnails
    const style = document.createElement('style');
    style.textContent = `
        .viz-thumbnail {
            background-color: var(--white);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: transform 0.3s ease;
        }
        
        .viz-thumbnail:hover {
            transform: translateY(-5px);
        }
        
        .thumbnail-img {
            height: 180px;
            overflow: hidden;
        }
        
        .thumbnail-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .viz-thumbnail:hover .thumbnail-img img {
            transform: scale(1.05);
        }
        
        .thumbnail-info {
            padding: 1rem;
        }
        
        .chart-type-small {
            background-color: var(--secondary-color);
            color: var(--white);
            padding: 0.2rem 0.5rem;
            border-radius: 20px;
            font-size: 0.7rem;
            margin-right: 0.5rem;
        }
        
        .btn-small {
            padding: 0.3rem 0.8rem;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Sets up toggle buttons to switch between interactive and static visualizations
 */
function setupToggleButtons() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        const iframeSrc = button.getAttribute('data-iframe');
        const imgSrc = button.getAttribute('data-img');
        const container = button.closest('.viz-section').querySelector('.viz-container');
        
        // Create iframe and image elements
        const iframe = container.querySelector('iframe');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "Static visualization";
        img.className = "viz-img";
        
        // Add image to container
        container.appendChild(img);
        
        // Set up toggle functionality
        let showingInteractive = true;
        
        button.addEventListener('click', function() {
            if (showingInteractive) {
                // Switch to static image
                iframe.style.display = 'none';
                img.style.display = 'block';
                button.textContent = 'Switch to Interactive';
            } else {
                // Switch to interactive iframe
                iframe.style.display = 'block';
                img.style.display = 'none';
                button.textContent = 'Switch to Static';
            }
            showingInteractive = !showingInteractive;
        });
    });
}

/**
 * Sets up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Sets up loading indicators for iframes
 */
function setupLoadingIndicators() {
    const iframes = document.querySelectorAll('.viz-iframe');
    
    iframes.forEach(iframe => {
        const container = iframe.parentElement;
        
        // Create loading indicator
        const loading = document.createElement('div');
        loading.className = 'loading';
        container.appendChild(loading);
        
        // Hide loading indicator when iframe is loaded
        iframe.addEventListener('load', function() {
            loading.style.display = 'none';
        });
    });
}

/**
 * Adds a filter functionality for visualization categories
 */
function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allVizSections = document.querySelectorAll('.viz-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide visualization sections based on category
            allVizSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Adds a search functionality for visualizations
 */
function setupSearch() {
    const searchInput = document.getElementById('search-viz');
    const allVizSections = document.querySelectorAll('.viz-section');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        allVizSections.forEach(section => {
            const title = section.querySelector('h3').textContent.toLowerCase();
            const description = section.querySelector('.viz-description p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}
