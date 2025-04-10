// D3.js Visualizations for Global Health Data Dashboard

document.addEventListener('DOMContentLoaded', function() {
    console.log('D3 visualizations script loaded');
    
    // Create D3 visualizations directly without loading external data
    createRadialLifeExpectancyViz();
    createRectHeartDiseaseViz();
    
    // Setup download buttons
    setupDownloadButtons();
});

/**
 * Creates a radial visualization of life expectancy data
 */
function createRadialLifeExpectancyViz() {
    console.log('Creating radial visualization');
    
    // Sample data for life expectancy visualization
    const sampleData = [
        { Country: "Japan", Life_expectancy: 84.2, Status: "Developed", GDP: 40247, Year: 2015 },
        { Country: "Switzerland", Life_expectancy: 83.1, Status: "Developed", GDP: 80675, Year: 2015 },
        { Country: "Singapore", Life_expectancy: 82.9, Status: "Developed", GDP: 53880, Year: 2015 },
        { Country: "Australia", Life_expectancy: 82.8, Status: "Developed", GDP: 56554, Year: 2015 },
        { Country: "Spain", Life_expectancy: 82.8, Status: "Developed", GDP: 25864, Year: 2015 },
        { Country: "Iceland", Life_expectancy: 82.7, Status: "Developed", GDP: 50734, Year: 2015 },
        { Country: "Italy", Life_expectancy: 82.7, Status: "Developed", GDP: 30180, Year: 2015 },
        { Country: "Israel", Life_expectancy: 82.5, Status: "Developed", GDP: 35902, Year: 2015 },
        { Country: "Sweden", Life_expectancy: 82.4, Status: "Developed", GDP: 50812, Year: 2015 },
        { Country: "France", Life_expectancy: 82.4, Status: "Developed", GDP: 36352, Year: 2015 },
        { Country: "South Korea", Life_expectancy: 82.3, Status: "Developed", GDP: 27105, Year: 2015 },
        { Country: "Canada", Life_expectancy: 82.2, Status: "Developed", GDP: 43525, Year: 2015 },
        { Country: "Norway", Life_expectancy: 82.1, Status: "Developed", GDP: 74505, Year: 2015 },
        { Country: "Netherlands", Life_expectancy: 81.9, Status: "Developed", GDP: 44746, Year: 2015 },
        { Country: "New Zealand", Life_expectancy: 81.6, Status: "Developed", GDP: 38346, Year: 2015 },
        { Country: "United Kingdom", Life_expectancy: 81.2, Status: "Developed", GDP: 43929, Year: 2015 },
        { Country: "Germany", Life_expectancy: 81.0, Status: "Developed", GDP: 41177, Year: 2015 },
        { Country: "Greece", Life_expectancy: 81.0, Status: "Developed", GDP: 18002, Year: 2015 },
        { Country: "Portugal", Life_expectancy: 81.0, Status: "Developed", GDP: 19121, Year: 2015 },
        { Country: "Belgium", Life_expectancy: 80.9, Status: "Developed", GDP: 40278, Year: 2015 },
        { Country: "Finland", Life_expectancy: 80.8, Status: "Developed", GDP: 42311, Year: 2015 },
        { Country: "Ireland", Life_expectancy: 80.6, Status: "Developed", GDP: 60664, Year: 2015 },
        { Country: "Costa Rica", Life_expectancy: 79.6, Status: "Developing", GDP: 11406, Year: 2015 },
        { Country: "Chile", Life_expectancy: 79.3, Status: "Developing", GDP: 13653, Year: 2015 },
        { Country: "Cuba", Life_expectancy: 79.1, Status: "Developing", GDP: 7602, Year: 2015 },
        { Country: "United States", Life_expectancy: 78.9, Status: "Developed", GDP: 56116, Year: 2015 },
        { Country: "China", Life_expectancy: 76.1, Status: "Developing", GDP: 8069, Year: 2015 },
        { Country: "Mexico", Life_expectancy: 76.7, Status: "Developing", GDP: 9143, Year: 2015 },
        { Country: "Brazil", Life_expectancy: 75.0, Status: "Developing", GDP: 8757, Year: 2015 },
        { Country: "India", Life_expectancy: 68.3, Status: "Developing", GDP: 1613, Year: 2015 }
    ];
    
    // Sort by life expectancy
    sampleData.sort((a, b) => d3.ascending(+a.Life_expectancy, +b.Life_expectancy));
    
    // Set up dimensions
    const container = document.getElementById('d3-radial-container');
    if (!container) {
        console.error('Radial container not found');
        return;
    }
    
    const width = container.clientWidth || 800;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    console.log('Container dimensions:', width, height);
    
    // Clear any existing SVG
    d3.select('#d3-radial-container').selectAll('svg').remove();
    
    // Create SVG
    const svg = d3.select('#d3-radial-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'radial-svg')
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    // Add title
    d3.select('#radial-svg')
        .append('text')
        .attr('x', width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Life Expectancy by Country (Radial Visualization)');
    
    // Create scales
    const angleScale = d3.scaleBand()
        .domain(sampleData.map(d => d.Country))
        .range([0, 2 * Math.PI])
        .padding(0.1);
    
    const radiusScale = d3.scaleLinear()
        .domain([40, d3.max(sampleData, d => +d.Life_expectancy) + 5])
        .range([0, radius]);
    
    // Add radial axis
    const radiusAxis = svg.append('g')
        .attr('class', 'radius-axis');
    
    const radiusTicks = [40, 50, 60, 70, 80, 90];
    
    radiusAxis.selectAll('circle')
        .data(radiusTicks)
        .enter()
        .append('circle')
        .attr('r', d => radiusScale(d))
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-dasharray', '2,2');
    
    radiusAxis.selectAll('text')
        .data(radiusTicks)
        .enter()
        .append('text')
        .attr('y', d => -radiusScale(d))
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .text(d => d);
    
    // Add country labels
    const countryLabels = svg.append('g')
        .attr('class', 'country-labels');
    
    countryLabels.selectAll('text')
        .data(sampleData)
        .enter()
        .append('text')
        .attr('x', d => (radiusScale(+d.Life_expectancy) + 10) * Math.cos(angleScale(d.Country) + angleScale.bandwidth() / 2))
        .attr('y', d => (radiusScale(+d.Life_expectancy) + 10) * Math.sin(angleScale(d.Country) + angleScale.bandwidth() / 2))
        .attr('text-anchor', d => {
            const angle = angleScale(d.Country) + angleScale.bandwidth() / 2;
            return (angle > Math.PI / 2 && angle < 3 * Math.PI / 2) ? 'end' : 'start';
        })
        .attr('transform', d => {
            const angle = angleScale(d.Country) + angleScale.bandwidth() / 2;
            const x = (radiusScale(+d.Life_expectancy) + 10) * Math.cos(angle);
            const y = (radiusScale(+d.Life_expectancy) + 10) * Math.sin(angle);
            const rotation = (angle * 180 / Math.PI) + ((angle > Math.PI / 2 && angle < 3 * Math.PI / 2) ? 180 : 0);
            return `translate(${x}, ${y}) rotate(${rotation})`;
        })
        .style('font-size', '8px')
        .text(d => d.Country);
    
    // Create color scale based on status (Developed/Developing)
    const colorScale = d3.scaleOrdinal()
        .domain(['Developed', 'Developing'])
        .range(['#3498db', '#e74c3c']);
    
    // Add bars
    svg.selectAll('.bar')
        .data(sampleData)
        .enter()
        .append('path')
        .attr('class', 'bar')
        .attr('d', d => {
            const innerRadius = 0;
            const outerRadius = radiusScale(+d.Life_expectancy);
            const startAngle = angleScale(d.Country);
            const endAngle = startAngle + angleScale.bandwidth();
            
            const arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle)
                .endAngle(endAngle);
            
            return arc();
        })
        .style('fill', d => colorScale(d.Status))
        .style('stroke', '#fff')
        .style('stroke-width', '1px')
        .on('mouseover', function(event, d) {
            // Show tooltip
            const tooltip = d3.select('#d3-radial-container')
                .append('div')
                .attr('class', 'tooltip')
                .style('position', 'absolute')
                .style('background-color', 'rgba(0, 0, 0, 0.8)')
                .style('color', 'white')
                .style('padding', '8px')
                .style('border-radius', '4px')
                .style('pointer-events', 'none')
                .style('z-index', '1000')
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 10}px`);
            
            tooltip.html(`
                <strong>${d.Country}</strong><br>
                Life Expectancy: ${d.Life_expectancy} years<br>
                Status: ${d.Status}<br>
                GDP: ${d.GDP}<br>
                Year: ${d.Year}
            `);
            
            // Highlight bar
            d3.select(this)
                .style('stroke', '#333')
                .style('stroke-width', '2px')
                .style('opacity', 1);
        })
        .on('mouseout', function() {
            // Remove tooltip
            d3.select('#d3-radial-container').selectAll('.tooltip').remove();
            
            // Reset bar style
            d3.select(this)
                .style('stroke', '#fff')
                .style('stroke-width', '1px')
                .style('opacity', 0.8);
        });
    
    // Add legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${-radius}, ${-radius + 20})`);
    
    const legendItems = ['Developed', 'Developing'];
    
    legend.selectAll('rect')
        .data(legendItems)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', d => colorScale(d));
    
    legend.selectAll('text')
        .data(legendItems)
        .enter()
        .append('text')
        .attr('x', 20)
        .attr('y', (d, i) => i * 20 + 12)
        .style('font-size', '12px')
        .text(d => d);
        
    console.log('Radial visualization created');
}

/**
 * Creates a rectilinear visualization of heart disease data
 */
function createRectHeartDiseaseViz() {
    console.log('Creating rectilinear visualization');
    
    // Sample data for heart disease visualization
    const sampleData = [
        { age: 52, sex: 1, trestbps: 125, chol: 212, thalach: 168, oldpeak: 1.0, target: 0 },
        { age: 53, sex: 1, trestbps: 140, chol: 203, thalach: 155, oldpeak: 3.1, target: 0 },
        { age: 70, sex: 1, trestbps: 145, chol: 174, thalach: 125, oldpeak: 2.6, target: 0 },
        { age: 61, sex: 1, trestbps: 148, chol: 203, thalach: 161, oldpeak: 0.0, target: 0 },
        { age: 62, sex: 0, trestbps: 138, chol: 294, thalach: 106, oldpeak: 1.9, target: 0 },
        { age: 58, sex: 0, trestbps: 100, chol: 248, thalach: 122, oldpeak: 1.0, target: 1 },
        { age: 58, sex: 1, trestbps: 114, chol: 318, thalach: 140, oldpeak: 4.4, target: 0 },
        { age: 55, sex: 1, trestbps: 160, chol: 289, thalach: 145, oldpeak: 0.8, target: 0 },
        { age: 46, sex: 1, trestbps: 120, chol: 249, thalach: 144, oldpeak: 0.8, target: 0 },
        { age: 54, sex: 1, trestbps: 122, chol: 286, thalach: 116, oldpeak: 3.2, target: 1 },
        { age: 71, sex: 0, trestbps: 112, chol: 149, thalach: 125, oldpeak: 1.6, target: 0 },
        { age: 43, sex: 0, trestbps: 132, chol: 341, thalach: 136, oldpeak: 3.0, target: 1 },
        { age: 34, sex: 1, trestbps: 118, chol: 182, thalach: 174, oldpeak: 0.0, target: 0 },
        { age: 51, sex: 0, trestbps: 140, chol: 308, thalach: 142, oldpeak: 1.5, target: 1 },
        { age: 52, sex: 1, trestbps: 128, chol: 204, thalach: 156, oldpeak: 1.0, target: 1 },
        { age: 34, sex: 0, trestbps: 118, chol: 210, thalach: 192, oldpeak: 0.7, target: 0 },
        { age: 51, sex: 0, trestbps: 130, chol: 256, thalach: 149, oldpeak: 0.5, target: 0 },
        { age: 54, sex: 1, trestbps: 192, chol: 283, thalach: 195, oldpeak: 0.0, target: 1 },
        { age: 53, sex: 1, trestbps: 123, chol: 282, thalach: 95, oldpeak: 2.0, target: 1 },
        { age: 52, sex: 1, trestbps: 112, chol: 230, thalach: 160, oldpeak: 0.0, target: 1 },
        { age: 40, sex: 1, trestbps: 110, chol: 167, thalach: 114, oldpeak: 2.0, target: 1 },
        { age: 58, sex: 1, trestbps: 132, chol: 224, thalach: 173, oldpeak: 3.2, target: 1 },
        { age: 41, sex: 0, trestbps: 112, chol: 268, thalach: 172, oldpeak: 0.0, target: 0 },
        { age: 41, sex: 1, trestbps: 135, chol: 203, thalach: 132, oldpeak: 0.0, target: 0 },
        { age: 50, sex: 0, trestbps: 120, chol: 219, thalach: 158, oldpeak: 1.6, target: 0 },
        { age: 54, sex: 0, trestbps: 108, chol: 267, thalach: 167, oldpeak: 0.0, target: 0 },
        { age: 64, sex: 0, trestbps: 130, chol: 303, thalach: 122, oldpeak: 2.0, target: 0 },
        { age: 51, sex: 0, trestbps: 130, chol: 305, thalach: 142, oldpeak: 1.2, target: 1 },
        { age: 46, sex: 0, trestbps: 138, chol: 243, thalach: 152, oldpeak: 0.0, target: 0 },
        { age: 67, sex: 0, trestbps: 115, chol: 564, thalach: 160, oldpeak: 1.6, target: 0 }
    ];
    
    // Set up dimensions
    const container = document.getElementById('d3-rect-container');
    if (!container) {
        console.error('Rectilinear container not found');
        return;
    }
    
    const width = container.clientWidth || 800;
    const height = 600;
    const margin = { top: 60, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    console.log('Container dimensions:', width, height);
    
    // Clear any existing SVG
    d3.select('#d3-rect-container').selectAll('svg').remove();
    
    // Create SVG
    const svg = d3.select('#d3-rect-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('id', 'rect-svg')
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Add title
    d3.select('#rect-svg')
        .append('text')
        .attr('x', width / 2)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Heart Disease Risk Factors (Rectilinear Visualization)');
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([20, d3.max(sampleData, d => d.age) + 5])
        .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
        .domain([50, d3.max(sampleData, d => d.thalach) + 10])
        .range([innerHeight, 0]);
    
    const radiusScale = d3.scaleLinear()
        .domain([d3.min(sampleData, d => d.chol), d3.max(sampleData, d => d.chol)])
        .range([3, 15]);
    
    const colorScale = d3.scaleOrdinal()
        .domain([0, 1])
        .range(['#e74c3c', '#2ecc71']);
    
    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis);
    
    svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);
    
    // Add axis labels
    svg.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 40)
        .attr('text-anchor', 'middle')
        .text('Age');
    
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .text('Maximum Heart Rate (thalach)');
    
    // Add grid lines
    svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(xAxis.tickSize(-innerHeight).tickFormat(''));
    
    svg.append('g')
        .attr('class', 'grid')
        .call(yAxis.tickSize(-innerWidth).tickFormat(''));
    
    // Style grid lines
    svg.selectAll('.grid line')
        .style('stroke', '#ddd')
        .style('stroke-opacity', 0.7)
        .style('shape-rendering', 'crispEdges');
    
    svg.selectAll('.grid path')
        .style('stroke-width', 0);
    
    // Add scatter plot points
    svg.selectAll('circle')
        .data(sampleData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.age))
        .attr('cy', d => yScale(d.thalach))
        .attr('r', d => radiusScale(d.chol))
        .style('fill', d => colorScale(d.target))
        .style('opacity', 0.7)
        .style('stroke', '#fff')
        .style('stroke-width', '1px')
        .on('mouseover', function(event, d) {
            // Show tooltip
            const tooltip = d3.select('#d3-rect-container')
                .append('div')
                .attr('class', 'tooltip')
                .style('position', 'absolute')
                .style('background-color', 'rgba(0, 0, 0, 0.8)')
                .style('color', 'white')
                .style('padding', '8px')
                .style('border-radius', '4px')
                .style('pointer-events', 'none')
                .style('z-index', '1000')
                .style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY - 10}px`);
            
            tooltip.html(`
                <strong>Patient Details</strong><br>
                Age: ${d.age}<br>
                Sex: ${d.sex === 1 ? 'Male' : 'Female'}<br>
                Cholesterol: ${d.chol} mg/dl<br>
                Max Heart Rate: ${d.thalach} bpm<br>
                Resting Blood Pressure: ${d.trestbps} mm Hg<br>
                Heart Disease: ${d.target === 1 ? 'Yes' : 'No'}
            `);
            
            // Highlight point
            d3.select(this)
                .style('stroke', '#333')
                .style('stroke-width', '2px')
                .style('opacity', 1);
        })
        .on('mouseout', function() {
            // Remove tooltip
            d3.select('#d3-rect-container').selectAll('.tooltip').remove();
            
            // Reset point style
            d3.select(this)
                .style('stroke', '#fff')
                .style('stroke-width', '1px')
                .style('opacity', 0.7);
        });
    
    // Add legend
    const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${innerWidth - 150}, 0)`);
    
    const legendItems = [
        { label: 'Heart Disease', value: 1 },
        { label: 'No Heart Disease', value: 0 }
    ];
    
    legend.selectAll('rect')
        .data(legendItems)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', d => colorScale(d.value));
    
    legend.selectAll('text')
        .data(legendItems)
        .enter()
        .append('text')
        .attr('x', 20)
        .attr('y', (d, i) => i * 20 + 12)
        .style('font-size', '12px')
        .text(d => d.label);
    
    // Add circle size legend
    const sizeLegend = svg.append('g')
        .attr('class', 'size-legend')
        .attr('transform', `translate(${innerWidth - 150}, 60)`);
    
    sizeLegend.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text('Cholesterol Level');
    
    const cholLevels = [200, 250, 300];
    
    sizeLegend.selectAll('circle')
        .data(cholLevels)
        .enter()
        .append('circle')
        .attr('cx', 8)
        .attr('cy', (d, i) => i * 25 + 20)
        .attr('r', d => radiusScale(d))
        .style('fill', 'none')
        .style('stroke', '#333')
        .style('stroke-width', '1px');
    
    sizeLegend.selectAll('.size-text')
        .data(cholLevels)
        .enter()
        .append('text')
        .attr('class', 'size-text')
        .attr('x', 25)
        .attr('y', (d, i) => i * 25 + 24)
        .style('font-size', '12px')
        .text(d => `${d} mg/dl`);
        
    console.log('Rectilinear visualization created');
}

/**
 * Sets up download buttons for D3 visualizations
 */
function setupDownloadButtons() {
    console.log('Setting up download buttons');
    
    // Radial visualization download
    const downloadRadialBtn = document.getElementById('download-radial');
    if (downloadRadialBtn) {
        downloadRadialBtn.addEventListener('click', function() {
            const svgElement = document.getElementById('radial-svg');
            if (!svgElement) {
                console.error('Radial SVG not found for download');
                return;
            }
            
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'life_expectancy_radial.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    } else {
        console.error('Download radial button not found');
    }
    
    // Rectilinear visualization download
    const downloadRectBtn = document.getElementById('download-rect');
    if (downloadRectBtn) {
        downloadRectBtn.addEventListener('click', function() {
            const svgElement = document.getElementById('rect-svg');
            if (!svgElement) {
                console.error('Rect SVG not found for download');
                return;
            }
            
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = 'heart_disease_rect.svg';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    } else {
        console.error('Download rect button not found');
    }
}

/**
 * Adds CSS styles for D3 visualizations
 */
function addD3Styles() {
    console.log('Adding D3 styles');
    
    const style = document.createElement('style');
    style.textContent = `
        .d3-container {
            width: 100%;
            height: 600px;
            background-color: #f9f9f9;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }
        
        .tooltip {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px;
            border-radius: 4px;
            pointer-events: none;
            z-index: 1000;
        }
        
        .grid line {
            stroke: #ddd;
            stroke-opacity: 0.7;
            shape-rendering: crispEdges;
        }
        
        .grid path {
            stroke-width: 0;
        }
    `;
    document.head.appendChild(style);
}

// Add D3 styles when the script loads
addD3Styles();
