// Main JavaScript file that combines and fixes functionality

document.addEventListener('DOMContentLoaded', function() {
    // Generate visualization thumbnails for dashboard overview
    generateVizThumbnails();
    
    // Set up toggle buttons for switching between interactive and static visualizations
    setupToggleButtons();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add loading indicators for iframes
    setupLoadingIndicators();
    
    // Add back to top button
    setupBackToTopButton();
    
    // Add filter buttons for visualization categories
    setupCategoryFilters();
    
    // Add search functionality
    setupSearch();
    
    // Add fullscreen functionality
    setupFullscreenButtons();
    
    // Add data source badges
    addDataSourceBadges();
    
    // Add D3.js visualizations
    setupD3Visualizations();
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
        card.setAttribute('data-category', section.getAttribute('data-category'));
        
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
        img.style.display = 'none';
        
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
 * Sets up back to top button
 */
function setupBackToTopButton() {
    // Create back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Sets up filter buttons for visualization categories
 */
function setupCategoryFilters() {
    // Create filter container if it doesn't exist
    let filterContainer = document.querySelector('.filter-container');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        // Define categories
        const categories = [
            { id: 'all', name: 'All Visualizations' },
            { id: 'global-health', name: 'Global Health' },
            { id: 'life-expectancy', name: 'Life Expectancy' },
            { id: 'heart-disease', name: 'Heart Disease' },
            { id: 'd3-visualizations', name: 'D3.js Visualizations' }
        ];
        
        // Create filter buttons
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category.name;
            button.setAttribute('data-category', category.id);
            
            if (category.id === 'all') {
                button.classList.add('active');
            }
            
            filterContainer.appendChild(button);
        });
        
        // Add filter container to dashboard overview section
        const dashboardOverview = document.querySelector('.dashboard-overview .container');
        if (dashboardOverview) {
            // Check if search container exists
            const searchContainer = document.querySelector('.search-container');
            if (searchContainer) {
                dashboardOverview.insertBefore(filterContainer, searchContainer.nextSibling);
            } else {
                dashboardOverview.insertBefore(filterContainer, dashboardOverview.querySelector('.viz-grid'));
            }
        }
    }
    
    // Add category data attributes to visualization sections if they don't have them
    const vizSections = document.querySelectorAll('.viz-section');
    vizSections.forEach(section => {
        if (!section.hasAttribute('data-category')) {
            const parentCategory = section.closest('.viz-category');
            if (parentCategory) {
                section.setAttribute('data-category', parentCategory.id);
            }
        }
    });
    
    // Set up filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide visualization sections based on category
            if (category === 'all') {
                // Show all sections
                vizSections.forEach(section => {
                    section.style.display = 'block';
                });
                
                // Show all thumbnails
                const thumbnails = document.querySelectorAll('.viz-thumbnail');
                thumbnails.forEach(thumbnail => {
                    thumbnail.style.display = 'block';
                });
            } else {
                // Show only sections in the selected category
                vizSections.forEach(section => {
                    if (section.getAttribute('data-category') === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
                
                // Show only thumbnails in the selected category
                const thumbnails = document.querySelectorAll('.viz-thumbnail');
                thumbnails.forEach(thumbnail => {
                    if (thumbnail.getAttribute('data-category') === category) {
                        thumbnail.style.display = 'block';
                    } else {
                        thumbnail.style.display = 'none';
                    }
                });
            }
        });
    });
}

/**
 * Sets up search functionality for visualizations
 */
function setupSearch() {
    // Create search container if it doesn't exist
    let searchContainer = document.querySelector('.search-container');
    if (!searchContainer) {
        searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        // Create search box
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        
        // Create search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-viz';
        searchInput.placeholder = 'Search visualizations...';
        
        // Add search input to search box
        searchBox.appendChild(searchInput);
        
        // Add search box to search container
        searchContainer.appendChild(searchBox);
        
        // Add search container to dashboard overview section
        const dashboardOverview = document.querySelector('.dashboard-overview .container');
        if (dashboardOverview) {
            dashboardOverview.insertBefore(searchContainer, dashboardOverview.firstElementChild.nextSibling);
        }
    }
    
    // Set up search functionality
    const searchInput = document.getElementById('search-viz');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // If search term is empty, show all visualizations
            if (searchTerm === '') {
                // Find and click the "All Visualizations" filter button
                const allButton = document.querySelector('.filter-btn[data-category="all"]');
                if (allButton) {
                    allButton.click();
                } else {
                    // Fallback if button doesn't exist
                    const vizSections = document.querySelectorAll('.viz-section');
                    vizSections.forEach(section => {
                        section.style.display = 'block';
                    });
                    
                    const thumbnails = document.querySelectorAll('.viz-thumbnail');
                    thumbnails.forEach(thumbnail => {
                        thumbnail.style.display = 'block';
                    });
                }
                return;
            }
            
            // Show/hide visualization sections based on search term
            const vizSections = document.querySelectorAll('.viz-section');
            vizSections.forEach(section => {
                const title = section.querySelector('h3').textContent.toLowerCase();
                const description = section.querySelector('.viz-description p').textContent.toLowerCase();
                const insight = section.querySelector('.viz-insight p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || insight.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Show/hide thumbnails based on search term
            const thumbnails = document.querySelectorAll('.viz-thumbnail');
            thumbnails.forEach(thumbnail => {
                const title = thumbnail.querySelector('h4').textContent.toLowerCase();
                
                if (title.includes(searchTerm)) {
                    thumbnail.style.display = 'block';
                } else {
                    thumbnail.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Sets up fullscreen buttons for visualizations
 */
function setupFullscreenButtons() {
    // Create modal for fullscreen view if it doesn't exist
    let modal = document.querySelector('.modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-close" aria-label="Close fullscreen view">×</div>
                <iframe class="modal-iframe" frameborder="0"></iframe>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Add fullscreen button to each visualization if it doesn't have one
    const vizSections = document.querySelectorAll('.viz-section');
    vizSections.forEach(section => {
        const vizActions = section.querySelector('.viz-actions');
        if (!vizActions.querySelector('.fullscreen-btn')) {
            const iframeSrc = section.querySelector('.viz-iframe').src;
            
            // Create fullscreen button
            const fullscreenButton = document.createElement('button');
            fullscreenButton.className = 'btn fullscreen-btn';
            fullscreenButton.textContent = 'Fullscreen';
            fullscreenButton.setAttribute('data-iframe', iframeSrc);
            
            // Add fullscreen button to visualization actions
            vizActions.appendChild(fullscreenButton);
        }
    });
    
    // Set up fullscreen functionality
    const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function() {
            const iframeSrc = this.getAttribute('data-iframe');
            
            // Set iframe source
            document.querySelector('.modal-iframe').src = iframeSrc;
            
            // Show modal
            document.querySelector('.modal').style.display = 'flex';
            
            // Disable body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            // Hide modal
            document.querySelector('.modal').style.display = 'none';
            
            // Enable body scrolling
            document.body.style.overflow = 'auto';
            
            // Clear iframe source
            document.querySelector('.modal-iframe').src = '';
        });
    }
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modalClose.click();
        }
    });
    
    // Close modal when pressing escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modalClose.click();
        }
    });
}

/**
 * Adds data source badges to visualizations
 */
function addDataSourceBadges() {
    const vizSections = document.querySelectorAll('.viz-section');
    
    vizSections.forEach(section => {
        const vizInfo = section.querySelector('.viz-info');
        if (!vizInfo.querySelector('.data-source')) {
            const dataSource = getDataSourceForSection(section.id);
            
            if (dataSource) {
                const badge = document.createElement('div');
                badge.className = 'data-source';
                badge.textContent = `Data Source: ${dataSource}`;
                
                vizInfo.appendChild(badge);
            }
        }
    });
}

/**
 * Gets the data source for a visualization section
 * @param {string} sectionId - The ID of the visualization section
 * @returns {string} The data source for the visualization
 */
function getDataSourceForSection(sectionId) {
    // Map section IDs to data sources
    const dataSources = {
        // Global Health
        'mortality_by_category': 'Global Health Dataset',
        'mortality_over_years': 'Global Health Dataset',
        'urbanization_vs_mortality': 'Global Health Dataset',
        'education_vs_prevalence': 'Global Health Dataset',
        'mortality_heatmap': 'Global Health Dataset',
        'disease_population_treemap': 'Global Health Dataset',
        'mortality_choropleth': 'Global Health Dataset',
        
        // Life Expectancy
        'life_expectancy_over_time': 'Life Expectancy Dataset',
        'top_countries_life_expectancy': 'Life Expectancy Dataset',
        'gdp_vs_life_expectancy': 'Life Expectancy Dataset',
        
        // Heart Disease
        'cholesterol_by_gender': 'Heart Disease Dataset',
        'age_by_heart_disease': 'Heart Disease Dataset',
        'heart_disease_parallel': 'Heart Disease Dataset',
        
        // D3.js Visualizations
        'd3_radial_life_expectancy': 'Life Expectancy Dataset',
        'd3_rect_heart_disease': 'Heart Disease Dataset'
    };
    
    return dataSources[sectionId] || '';
}

/**
 * Sets up D3.js visualizations
 */
function setupD3Visualizations() {
    // This function will be implemented in d3_visualizations.js
    console.log('D3.js visualizations will be loaded from separate file');
}
