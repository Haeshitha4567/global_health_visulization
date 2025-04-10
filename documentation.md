# Global Health Data Visualization Dashboard Documentation

## Project Overview

This documentation provides a comprehensive explanation of the Global Health Data Visualization Dashboard project, including its structure, functionality, and implementation details. The dashboard presents interactive visualizations of global health data from three main datasets:

1. **Global Health Dataset**: Contains information about various diseases, their prevalence, mortality rates, and demographic factors across different countries.
2. **Life Expectancy Dataset**: Provides data on life expectancy trends, GDP, and population statistics for countries worldwide.
3. **Heart Disease Dataset**: Includes clinical data related to heart disease, such as cholesterol levels, age, and other health metrics.

The dashboard features both Plotly-based visualizations and custom D3.js visualizations (both rectilinear and radial), with interactive elements that allow users to explore the data in detail.

## Project Structure

The project follows a modular structure with separate files for HTML, CSS, JavaScript, and data:

```
data_viz_webpage/
├── css/
│   ├── styles.css            # Main CSS styles
│   ├── interactive.css       # CSS for interactive elements
│   └── d3_styles.css         # CSS specific to D3.js visualizations
├── data/
│   ├── final_data.csv        # Combined dataset
│   ├── heart_cleaned.csv     # Heart disease dataset
│   ├── life_expectancy_cleaned.csv # Life expectancy dataset
│   └── sampled_global_health.csv # Global health dataset
├── images/
│   ├── [visualization_name].html # Interactive HTML visualizations
│   ├── [visualization_name].png  # Static PNG visualizations
│   └── chart_metadata.json   # Metadata for visualizations
├── js/
│   ├── main.js               # Main JavaScript functionality
│   └── d3_visualizations.js  # D3.js visualization code
├── generate_charts.py        # Python script to generate visualizations
├── index.html                # Main HTML file
└── documentation.md          # This documentation file
```

## Visualization Types

The dashboard includes the following types of visualizations:

### Plotly-based Visualizations

1. **Bar Charts**:
   - Average Mortality Rate by Disease Category
   - Top 10 Countries by Average Life Expectancy

2. **Line/Area Charts**:
   - Mortality Rate Over Years
   - Average Life Expectancy Over Time

3. **Scatter/Bubble Charts**:
   - Urbanization Rate vs Mortality Rate by Country
   - Education Index vs Prevalence Rate by Country
   - GDP vs Life Expectancy

4. **Specialized Charts**:
   - Heatmap of Mortality Rate by Country and Disease
   - Total Population Affected by Disease Category (Treemap)
   - Average Mortality Rate by Country (Choropleth Map)
   - Cholesterol Distribution by Gender (Violin Plot)
   - Age Distribution by Heart Disease Presence (Box Plot)
   - Heart Disease Feature Comparison (Parallel Coordinates Plot)

### D3.js Visualizations

1. **Radial Visualization**:
   - Life Expectancy Radial Visualization (showing life expectancy data across different countries)

2. **Rectilinear Visualization**:
   - Heart Disease Risk Factors (showing the relationship between key risk factors and heart disease presence)

## Code Explanation

### HTML Structure (index.html)

The HTML file provides the structure for the dashboard, organized into sections:

1. **Header**: Contains the title, subtitle, and navigation menu.
2. **Introduction**: Provides an overview of the dashboard and key insights.
3. **Dashboard Overview**: Shows thumbnails of all visualizations.
4. **Visualization Categories**: Separate sections for Global Health, Life Expectancy, Heart Disease, and D3.js visualizations.
5. **Footer**: Contains information about data sources, technologies used, and copyright.

Each visualization section follows a consistent structure:
```html
<div class="viz-section" id="[visualization_id]" data-category="[category]">
    <div class="viz-header">
        <h3>[Visualization Title]</h3>
        <span class="chart-type">[Chart Type]</span>
    </div>
    <div class="viz-content">
        <div class="viz-container">
            <!-- Visualization content (iframe or D3 container) -->
        </div>
        <div class="viz-info">
            <div class="viz-description">
                <h4>Description</h4>
                <p>[Description text]</p>
            </div>
            <div class="viz-insight">
                <h4>Key Insight</h4>
                <p>[Insight text]</p>
            </div>
            <div class="viz-actions">
                <!-- Download and toggle buttons -->
            </div>
        </div>
    </div>
</div>
```

### CSS Styling

The project uses three CSS files for styling:

1. **styles.css**: Contains the main styles for the dashboard layout, typography, colors, and responsive design.
2. **interactive.css**: Contains styles for interactive elements like filter buttons, search box, tooltips, and modal windows.
3. **d3_styles.css**: Contains specific styles for D3.js visualizations, including SVG elements, axes, legends, and animations.

Key CSS features:
- Responsive design with media queries for different screen sizes
- CSS variables for consistent color scheme and styling
- Flexbox and Grid layouts for responsive content organization
- Animations and transitions for interactive elements
- Custom styling for visualization containers and controls

### JavaScript Functionality

The project uses two main JavaScript files:

1. **main.js**: Handles the core functionality of the dashboard, including:
   - Generating visualization thumbnails
   - Setting up toggle buttons for switching between interactive and static visualizations
   - Implementing smooth scrolling navigation
   - Adding loading indicators for iframes
   - Setting up back-to-top button
   - Implementing category filters and search functionality
   - Adding fullscreen viewing capability
   - Adding data source badges

2. **d3_visualizations.js**: Implements the custom D3.js visualizations:
   - Loading and processing data from CSV files
   - Creating the radial visualization for life expectancy data
   - Creating the rectilinear visualization for heart disease data
   - Implementing interactive features like tooltips and hover effects
   - Setting up download functionality for SVG exports

### D3.js Visualizations Implementation

#### Radial Visualization (Life Expectancy)

The radial visualization represents life expectancy data across different countries, with:
- Distance from center representing life expectancy values
- Angles representing different countries
- Color indicating development status (Developed/Developing)

Implementation steps:
1. Filter data to get the most recent year for each country
2. Set up SVG dimensions and scales
3. Create radial axes and labels
4. Add bars representing life expectancy values
5. Add interactive features (tooltips, hover effects)
6. Add legend for color coding

Key D3.js concepts used:
- Scales (scaleBand, scaleLinear, scaleOrdinal)
- Arc generator for radial bars
- Data binding and enter/update/exit pattern
- Event handling for interactivity

#### Rectilinear Visualization (Heart Disease)

The rectilinear visualization shows the relationship between age, maximum heart rate, and cholesterol levels, with:
- X-axis representing age
- Y-axis representing maximum heart rate
- Point size representing cholesterol level
- Color indicating heart disease presence (yes/no)

Implementation steps:
1. Process numerical data from the heart disease dataset
2. Set up SVG dimensions and scales
3. Create axes and grid lines
4. Add scatter plot points
5. Add interactive features (tooltips, hover effects)
6. Add legends for color and size coding

Key D3.js concepts used:
- Linear scales for continuous data
- Axes and grid lines
- Data binding for scatter plot points
- Event handling for interactivity
- Legends for data interpretation

### Python Code (generate_charts.py)

The Python script generates the Plotly-based visualizations using the following libraries:
- Pandas for data manipulation
- Plotly for interactive visualizations
- Matplotlib and Seaborn for static visualizations

The script follows these steps:
1. Load and preprocess the datasets
2. Create various visualizations based on the data
3. Save interactive versions as HTML files
4. Save static versions as PNG files
5. Generate metadata for each visualization

## Interactive Features

The dashboard includes several interactive features:

1. **Search Functionality**: Allows users to search for visualizations by title, description, or insight text.
2. **Category Filters**: Allows users to filter visualizations by category (Global Health, Life Expectancy, Heart Disease, D3.js).
3. **Toggle Buttons**: Allow users to switch between interactive and static versions of visualizations.
4. **Fullscreen Viewing**: Allows users to view visualizations in fullscreen mode.
5. **Download Buttons**: Allow users to download static PNG versions of Plotly visualizations or SVG versions of D3.js visualizations.
6. **Tooltips**: Provide detailed information when hovering over data points in visualizations.
7. **Smooth Scrolling**: Provides smooth navigation between sections.
8. **Back-to-Top Button**: Allows users to quickly return to the top of the page.

## Responsive Design

The dashboard is designed to be responsive across different devices:

1. **Desktop**: Full layout with sidebar navigation and grid of visualizations.
2. **Tablet**: Adjusted layout with optimized visualization sizes.
3. **Mobile**: Stacked layout with collapsible sections and simplified controls.

Responsive features include:
- Fluid container widths
- Flexible visualization containers
- Responsive typography
- Adjusted spacing and margins
- Optimized interactive elements for touch devices

## How to Use the Dashboard

1. **Navigation**: Use the top navigation menu to jump to different sections of the dashboard.
2. **Overview**: The Dashboard Overview section provides thumbnails of all visualizations for quick access.
3. **Filtering**: Use the category filter buttons to focus on specific types of visualizations.
4. **Searching**: Use the search box to find visualizations by keyword.
5. **Exploring Visualizations**:
   - Hover over elements to see detailed information
   - Use toggle buttons to switch between interactive and static versions
   - Click the fullscreen button to view visualizations in detail
   - Download visualizations using the download buttons
6. **D3.js Visualizations**:
   - Interact with the radial and rectilinear visualizations by hovering over elements
   - Download SVG versions using the download buttons

## Technical Implementation Details

### Search and Filter Functionality

The search and filter functionality is implemented in JavaScript:

1. **Search**: The `setupSearch` function creates a search input field and adds an event listener that filters visualizations based on the search term.
2. **Filtering**: The `setupCategoryFilters` function creates filter buttons and adds event listeners that show/hide visualizations based on their category.

Both functions work by manipulating the display property of visualization sections and thumbnails based on the search term or selected category.

### D3.js Visualization Implementation

The D3.js visualizations are implemented using the following approach:

1. **Data Loading**: The `Promise.all` function is used to load multiple CSV files asynchronously.
2. **Data Processing**: The data is processed to extract relevant information and convert string values to numbers.
3. **SVG Setup**: SVG elements are created with appropriate dimensions and margins.
4. **Scales and Axes**: D3.js scales and axes are set up to map data values to visual properties.
5. **Data Binding**: Data is bound to SVG elements using D3.js data binding.
6. **Interactivity**: Event listeners are added for hover effects and tooltips.
7. **Legends**: Legends are added to explain color and size coding.
8. **Download Functionality**: SVG export functionality is implemented for downloading visualizations.

### Responsive Design Implementation

The responsive design is implemented using:

1. **CSS Media Queries**: Different styles are applied based on screen width.
2. **Flexible Containers**: Containers use percentage-based widths and max-width constraints.
3. **Responsive Typography**: Font sizes adjust based on screen size.
4. **Flexible Visualizations**: Visualization containers adapt to available space.
5. **Touch-Friendly Controls**: Interactive elements are sized appropriately for touch devices.

## Troubleshooting

Common issues and solutions:

1. **Visualizations Not Loading**:
   - Check if all required JavaScript libraries are loaded
   - Verify that data files are in the correct location
   - Check browser console for error messages

2. **Search or Filter Not Working**:
   - Ensure that visualization sections have the correct data-category attributes
   - Check if the search input and filter buttons are properly initialized

3. **D3.js Visualizations Not Displaying**:
   - Verify that D3.js library is loaded
   - Check if data files are accessible
   - Inspect browser console for error messages

4. **Responsive Issues**:
   - Test on different devices and browsers
   - Use browser developer tools to simulate different screen sizes
   - Check CSS media queries for conflicts

## Conclusion

The Global Health Data Visualization Dashboard provides a comprehensive and interactive way to explore global health data. By combining Plotly-based visualizations with custom D3.js visualizations, the dashboard offers both breadth and depth in data presentation. The responsive design and interactive features make it accessible and engaging for users across different devices.

The modular code structure and detailed documentation make it easy to understand, maintain, and extend the dashboard with additional visualizations or features in the future.
