/**
 * Enhanced fullscreen functionality for both iframe and D3.js visualizations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create modal for fullscreen view if it doesn't exist
    let modal = document.querySelector('.modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-close" aria-label="Close fullscreen view">×</div>
                <div class="modal-container">
                    <iframe class="modal-iframe" frameborder="0" style="display: none;"></iframe>
                    <div class="modal-d3-container" style="display: none;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Set up fullscreen functionality for iframe-based visualizations
    setupIframeFullscreen();
    
    // Set up fullscreen functionality for D3.js visualizations
    setupD3Fullscreen();
    
    // Set up modal close functionality
    setupModalClose(modal);
});

/**
 * Sets up fullscreen functionality for iframe-based visualizations
 */
function setupIframeFullscreen() {
    // Add fullscreen button to each iframe visualization if it doesn't have one
    const iframeVizSections = document.querySelectorAll('.viz-section:not([id^="d3_"])');
    
    iframeVizSections.forEach(section => {
        const vizActions = section.querySelector('.viz-actions');
        const iframe = section.querySelector('.viz-iframe');
        
        if (iframe && vizActions && !vizActions.querySelector('.fullscreen-btn')) {
            const iframeSrc = iframe.src;
            
            // Create fullscreen button
            const fullscreenButton = document.createElement('button');
            fullscreenButton.className = 'btn fullscreen-btn';
            fullscreenButton.textContent = 'Fullscreen';
            fullscreenButton.setAttribute('data-type', 'iframe');
            fullscreenButton.setAttribute('data-src', iframeSrc);
            
            // Add fullscreen button to visualization actions
            vizActions.appendChild(fullscreenButton);
        }
    });
}

/**
 * Sets up fullscreen functionality for D3.js visualizations
 */
function setupD3Fullscreen() {
    // Add fullscreen button to each D3.js visualization if it doesn't have one
    const d3VizSections = document.querySelectorAll('.viz-section[id^="d3_"]');
    
    d3VizSections.forEach(section => {
        const vizActions = section.querySelector('.viz-actions');
        const d3Container = section.querySelector('.d3-container');
        
        if (d3Container && vizActions && !vizActions.querySelector('.fullscreen-btn')) {
            const containerId = d3Container.id;
            
            // Create fullscreen button
            const fullscreenButton = document.createElement('button');
            fullscreenButton.className = 'btn fullscreen-btn';
            fullscreenButton.textContent = 'Fullscreen';
            fullscreenButton.setAttribute('data-type', 'd3');
            fullscreenButton.setAttribute('data-container-id', containerId);
            
            // Add fullscreen button to visualization actions
            vizActions.appendChild(fullscreenButton);
        }
    });
}

/**
 * Sets up modal close functionality
 * @param {HTMLElement} modal - The modal element
 */
function setupModalClose(modal) {
    // Set up fullscreen button click handlers
    const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            if (type === 'iframe') {
                // Handle iframe visualization
                const src = this.getAttribute('data-src');
                const modalIframe = document.querySelector('.modal-iframe');
                const modalD3Container = document.querySelector('.modal-d3-container');
                
                // Set iframe source
                modalIframe.src = src;
                modalIframe.style.display = 'block';
                modalD3Container.style.display = 'none';
                
            } else if (type === 'd3') {
                // Handle D3.js visualization
                const containerId = this.getAttribute('data-container-id');
                const sourceContainer = document.getElementById(containerId);
                const modalIframe = document.querySelector('.modal-iframe');
                const modalD3Container = document.querySelector('.modal-d3-container');
                
                // Clear previous content
                modalD3Container.innerHTML = '';
                modalIframe.style.display = 'none';
                modalD3Container.style.display = 'block';
                
                // Clone the D3 visualization and add to modal
                if (sourceContainer) {
                    // Create a new container for the fullscreen visualization
                    const fullscreenContainer = document.createElement('div');
                    fullscreenContainer.id = containerId + '-fullscreen';
                    fullscreenContainer.className = 'd3-container fullscreen';
                    modalD3Container.appendChild(fullscreenContainer);
                    
                    // Trigger re-rendering of the D3 visualization in fullscreen
                    if (containerId === 'd3-radial-container') {
                        // Call the radial visualization function with fullscreen flag
                        createRadialLifeExpectancyViz(null, fullscreenContainer.id, true);
                    } else if (containerId === 'd3-rect-container') {
                        // Call the rectilinear visualization function with fullscreen flag
                        createRectHeartDiseaseViz(null, fullscreenContainer.id, true);
                    }
                }
            }
            
            // Show modal
            modal.style.display = 'flex';
            
            // Disable body scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when close button is clicked
    const modalClose = modal.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            // Hide modal
            modal.style.display = 'none';
            
            // Enable body scrolling
            document.body.style.overflow = 'auto';
            
            // Clear iframe source and D3 container
            document.querySelector('.modal-iframe').src = '';
            document.querySelector('.modal-d3-container').innerHTML = '';
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

// Add CSS for the fullscreen D3 visualizations
function addFullscreenStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-container {
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .modal-iframe,
        .modal-d3-container {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .d3-container.fullscreen {
            width: 100%;
            height: 100%;
            min-height: 80vh;
            background-color: #f9f9f9;
        }
    `;
    document.head.appendChild(style);
}

// Add the fullscreen styles
addFullscreenStyles();
