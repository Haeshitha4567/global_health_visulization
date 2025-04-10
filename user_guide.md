# How to Use the Global Health Data Visualization Dashboard

This guide provides instructions on how to use the Global Health Data Visualization Dashboard, including how to view the visualizations, use the interactive features, and host the webpage.

## Getting Started

1. **Extract the ZIP file**: Extract the `data_viz_webpage_final.zip` file to a location on your computer.

2. **View the Dashboard**: Open the `index.html` file in a modern web browser (Chrome, Firefox, Safari, or Edge) to view the dashboard.

## Dashboard Features

### Navigation

- Use the top navigation menu to jump to different sections:
  - **Overview**: Introduction and key insights
  - **Global Health**: Visualizations related to global health metrics
  - **Life Expectancy**: Visualizations related to life expectancy data
  - **Heart Disease**: Visualizations related to heart disease data
  - **D3.js Visualizations**: Custom D3.js visualizations (radial and rectilinear)

### Search and Filter

- **Search**: Use the search box in the Dashboard Overview section to find visualizations by keyword. The search will filter visualizations based on titles, descriptions, and insights.
- **Filter by Category**: Use the category filter buttons to show visualizations from specific categories:
  - All Visualizations
  - Global Health
  - Life Expectancy
  - Heart Disease
  - D3.js Visualizations

### Interactive Features

- **Toggle Between Interactive and Static**: Each Plotly visualization has a toggle button to switch between interactive and static versions.
- **Fullscreen View**: Click the fullscreen button to view visualizations in a larger modal window.
- **Download Visualizations**: 
  - For Plotly visualizations: Use the "Download PNG" button to download a static image.
  - For D3.js visualizations: Use the "Download SVG" button to download a vector image.
- **Tooltips**: Hover over data points in visualizations to see detailed information.
- **Back to Top**: Use the back-to-top button (arrow at bottom right) to quickly return to the top of the page.

### D3.js Visualizations

The dashboard includes two custom D3.js visualizations:

1. **Life Expectancy Radial Visualization**: Shows life expectancy data across different countries in a radial format.
   - Distance from center represents life expectancy values
   - Color indicates development status (Developed/Developing)
   - Hover over segments to see detailed country information

2. **Heart Disease Risk Factors**: Shows the relationship between age, maximum heart rate, and cholesterol levels.
   - X-axis represents age
   - Y-axis represents maximum heart rate
   - Point size represents cholesterol level
   - Color indicates heart disease presence (yes/no)
   - Hover over points to see detailed patient information

## Hosting the Dashboard

### Local Hosting

The dashboard can be viewed locally by simply opening the `index.html` file in a web browser. All resources are included in the package.

### Web Server Hosting

To host the dashboard on a web server:

1. Upload the entire extracted folder to your web server using FTP or your server's file manager.
2. Make sure the folder structure is maintained.
3. Access the dashboard by navigating to the URL where you uploaded the files.

### GitHub Pages Hosting

To host the dashboard on GitHub Pages:

1. Create a new GitHub repository.
2. Upload all the files from the extracted folder to the repository.
3. Enable GitHub Pages in the repository settings.
4. The dashboard will be available at `https://[your-username].github.io/[repository-name]`.

## Customization

### Adding New Visualizations

To add new visualizations:

1. Generate the visualization using Python and save it as HTML and PNG files in the `images` folder.
2. Add a new section to the `index.html` file following the existing pattern.
3. Update the metadata in the `images/chart_metadata.json` file.

### Modifying Styles

To modify the appearance of the dashboard:

1. Edit the CSS files in the `css` folder:
   - `styles.css`: Main styles for layout and typography
   - `interactive.css`: Styles for interactive elements
   - `d3_styles.css`: Styles specific to D3.js visualizations

### Updating Data

To update the data used in the visualizations:

1. Replace the CSV files in the `data` folder with updated versions.
2. Run the `generate_charts.py` script to regenerate the visualizations.

## Troubleshooting

### Visualizations Not Loading

- Make sure all files are extracted and the folder structure is maintained.
- Check if your browser supports JavaScript and has it enabled.
- Try clearing your browser cache and reloading the page.

### D3.js Visualizations Not Displaying

- Make sure your browser has JavaScript enabled.
- Check if the D3.js library is loading correctly (check browser console for errors).
- Verify that the data files are accessible.

### Search or Filter Not Working

- Make sure JavaScript is enabled in your browser.
- Check if the visualization sections have the correct data-category attributes.
- Try reloading the page.

## Additional Resources

For more detailed information about the project:

- Read the `documentation.md` file for comprehensive technical documentation.
- Explore the `generate_charts.py` script to understand how the visualizations are created.
- Check the comments in the JavaScript files to understand the interactive functionality.

## Contact

If you have any questions or need assistance, please contact the developer who provided this dashboard to you.
