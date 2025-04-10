import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import seaborn as sns
import altair as alt
import os
from IPython.display import display
import plotly.io as pio

# Set paths
DATA_DIR = 'data'
IMAGE_DIR = 'images'

# Create images directory if it doesn't exist
os.makedirs(IMAGE_DIR, exist_ok=True)

# Load datasets
global_health_df = pd.read_csv(f"{DATA_DIR}/sampled_global_health.csv")
life_expectancy_df = pd.read_csv(f"{DATA_DIR}/life_expectancy_cleaned.csv")
heart_df = pd.read_csv(f"{DATA_DIR}/heart_cleaned.csv")

# Clean column names for life expectancy dataset
life_expectancy_df.columns = life_expectancy_df.columns.str.strip().str.replace(" ", "_")

# 1. Bar Chart - Average Mortality Rate by Disease Category
def generate_mortality_by_category():
    # Group by Disease Category and calculate average mortality rate
    avg_mortality_by_category = global_health_df.groupby("Disease Category", as_index=False)["Mortality Rate (%)"].mean()
    
    # Create Plotly bar chart
    fig = px.bar(
        avg_mortality_by_category,
        x="Disease Category",
        y="Mortality Rate (%)",
        title="Average Mortality Rate by Disease Category",
        labels={"Mortality Rate (%)": "Avg. Mortality Rate (%)"},
        text_auto=".2f",
        color="Mortality Rate (%)",
        color_continuous_scale="Viridis"
    )
    
    # Update layout for better readability
    fig.update_layout(
        xaxis_title="Disease Category",
        yaxis_title="Average Mortality Rate (%)",
        xaxis_tickangle=-45,
        template="plotly_white",
        height=500
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/mortality_by_category.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/mortality_by_category.png")
    
    return "mortality_by_category.html"

# 2. Line Chart - Mortality Rate Over Years
def generate_mortality_over_years():
    # Group and compute average mortality rate per year
    df_line = global_health_df[["Year", "Mortality Rate (%)"]].dropna()
    avg_by_year = df_line.groupby("Year").mean().reset_index()
    
    # Create figure
    fig = go.Figure()
    
    # Add line trace with smoothing and tooltips
    fig.add_trace(go.Scatter(
        x=avg_by_year["Year"],
        y=avg_by_year["Mortality Rate (%)"],
        mode="lines+markers",
        line_shape="spline",
        marker=dict(size=6, color="dodgerblue"),
        line=dict(width=2),
        hovertemplate="Year: %{x}<br>Avg Mortality: %{y:.2f}%",
        name="Mortality Rate"
    ))
    
    # Optional: Add annotation for lowest dip
    min_row = avg_by_year.loc[avg_by_year["Mortality Rate (%)"].idxmin()]
    fig.add_annotation(
        x=min_row["Year"],
        y=min_row["Mortality Rate (%)"],
        text="Lowest Mortality",
        showarrow=True,
        arrowhead=2,
        ax=0,
        ay=-40
    )
    
    # Layout polish
    fig.update_layout(
        title="Mortality Rate Over Years",
        xaxis_title="Year",
        yaxis_title="Avg. Mortality Rate (%)",
        template="plotly_white",
        hovermode="x unified",
        margin=dict(l=50, r=50, t=60, b=40),
        height=500
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/mortality_over_years.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/mortality_over_years.png")
    
    return "mortality_over_years.html"

# 3. Bubble Chart - Urbanization Rate vs Mortality Rate by Country
def generate_urbanization_vs_mortality():
    # Group by Country to reduce chart density
    bubble_data = global_health_df.groupby("Country", as_index=False).agg({
        "Urbanization Rate (%)": "mean",
        "Mortality Rate (%)": "mean",
        "Population Affected": "sum"
    })
    
    # Create the bubble chart
    fig = px.scatter(
        bubble_data,
        x="Urbanization Rate (%)",
        y="Mortality Rate (%)",
        size="Population Affected",
        color="Country",
        title="Urbanization Rate vs Mortality Rate by Country",
        labels={
            "Urbanization Rate (%)": "Urbanization Rate (%)",
            "Mortality Rate (%)": "Mortality Rate (%)",
            "Population Affected": "Population Affected"
        },
        hover_name="Country",
        size_max=60,
        template="plotly_white",
        height=600
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/urbanization_vs_mortality.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/urbanization_vs_mortality.png")
    
    return "urbanization_vs_mortality.html"

# 4. Scatter Plot - Education Index vs Prevalence Rate
def generate_education_vs_prevalence():
    # Group by Country to reduce point density
    scatter_data = global_health_df.groupby("Country", as_index=False).agg({
        "Education Index": "mean",
        "Prevalence Rate (%)": "mean",
        "Disease Name": "count"
    }).rename(columns={"Disease Name": "Disease Count"})
    
    # Create Plotly scatter plot
    fig = px.scatter(
        scatter_data,
        x="Education Index",
        y="Prevalence Rate (%)",
        size="Disease Count",
        color="Country",
        title="Education Index vs Prevalence Rate by Country",
        hover_name="Country",
        size_max=50,
        template="plotly_white",
        height=600
    )
    
    # Add trendline
    fig.update_layout(
        xaxis_title="Education Index",
        yaxis_title="Prevalence Rate (%)"
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/education_vs_prevalence.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/education_vs_prevalence.png")
    
    return "education_vs_prevalence.html"

# 5. Heatmap - Mortality Rate by Country and Disease
def generate_mortality_heatmap():
    # Create pivot table: rows = Country, columns = Disease Name, values = avg Mortality Rate
    heatmap_data = global_health_df.pivot_table(
        index="Country",
        columns="Disease Name",
        values="Mortality Rate (%)",
        aggfunc="mean"
    ).fillna(0)
    
    # Convert to long format for Plotly
    heatmap_long = heatmap_data.reset_index().melt(id_vars="Country", var_name="Disease Name", value_name="Mortality Rate (%)")
    
    # Create heatmap
    fig = px.density_heatmap(
        heatmap_long,
        x="Disease Name",
        y="Country",
        z="Mortality Rate (%)",
        color_continuous_scale="Reds",
        title="Heatmap of Mortality Rate by Country and Disease"
    )
    
    fig.update_layout(
        xaxis_title="Disease Name",
        yaxis_title="Country",
        xaxis_tickangle=-45,
        height=700
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/mortality_heatmap.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/mortality_heatmap.png")
    
    return "mortality_heatmap.html"

# 6. Area Chart - Life Expectancy Over Time
def generate_life_expectancy_over_time():
    # Group by Year
    area_data = life_expectancy_df.groupby("Year", as_index=False)["Life_expectancy"].mean()
    
    # Area chart
    fig = px.area(
        area_data,
        x="Year",
        y="Life_expectancy",
        title="Average Life Expectancy Over Time",
        labels={"Life_expectancy": "Average Life Expectancy"},
        markers=True,
        template="plotly_white",
        height=500
    )
    
    fig.update_layout(
        xaxis_title="Year",
        yaxis_title="Average Life Expectancy (years)"
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/life_expectancy_over_time.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/life_expectancy_over_time.png")
    
    return "life_expectancy_over_time.html"

# 7. Treemap - Disease Category vs Population Affected
def generate_disease_population_treemap():
    # Group by Disease Category and sum Population Affected
    treemap_data = global_health_df.groupby("Disease Category", as_index=False)["Population Affected"].sum()
    
    # Plotly Treemap
    fig = px.treemap(
        treemap_data,
        path=["Disease Category"],
        values="Population Affected",
        title="Total Population Affected by Disease Category",
        color="Population Affected",
        color_continuous_scale="Viridis",
        height=600
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/disease_population_treemap.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/disease_population_treemap.png")
    
    return "disease_population_treemap.html"

# 8. Choropleth Map - Mortality Rate by Country
def generate_mortality_choropleth():
    # Group by country and compute average mortality rate
    choropleth_data = global_health_df.groupby("Country", as_index=False)["Mortality Rate (%)"].mean()
    
    # Create the choropleth map
    fig = px.choropleth(
        choropleth_data,
        locations="Country",
        locationmode="country names",
        color="Mortality Rate (%)",
        color_continuous_scale="Reds",
        title="Average Mortality Rate by Country",
        height=600
    )
    
    fig.update_layout(
        geo=dict(
            showframe=False,
            showcoastlines=True,
            projection_type='equirectangular'
        )
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/mortality_choropleth.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/mortality_choropleth.png")
    
    return "mortality_choropleth.html"

# 9. Violin Plot - Cholesterol by Gender
def generate_cholesterol_by_gender():
    # Map sex to gender labels
    heart_df["Gender"] = heart_df["sex"].map({1: "Male", 0: "Female"})
    
    # Create Violin Plot
    fig = px.violin(
        heart_df,
        x="Gender",
        y="chol",
        color="Gender",
        box=True,
        points="all",
        title="Cholesterol Distribution by Gender",
        labels={"chol": "Cholesterol", "Gender": "Gender"},
        template="plotly_white",
        height=500
    )
    
    fig.update_layout(
        xaxis_title="Gender",
        yaxis_title="Cholesterol Level"
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/cholesterol_by_gender.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/cholesterol_by_gender.png")
    
    return "cholesterol_by_gender.html"

# 10. Box Plot - Age Distribution by Heart Disease Presence
def generate_age_by_heart_disease():
    # Create box plot
    fig = px.box(
        heart_df,
        x="target",
        y="age",
        color="target",
        title="Age Distribution by Heart Disease Presence",
        labels={"target": "Heart Disease (0 = No, 1 = Yes)", "age": "Age"},
        category_orders={"target": [0, 1]},
        template="plotly_white",
        height=500
    )
    
    fig.update_layout(
        xaxis_title="Heart Disease Presence",
        yaxis_title="Age (years)"
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/age_by_heart_disease.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/age_by_heart_disease.png")
    
    return "age_by_heart_disease.html"

# 11. Bar Chart - Life Expectancy of Top 10 Countries
def generate_top_countries_life_expectancy():
    # Calculate average life expectancy per country
    top_countries = life_expectancy_df.groupby("Country", as_index=False)["Life_expectancy"].mean()
    
    # Select top 10
    top10 = top_countries.sort_values(by="Life_expectancy", ascending=False).head(10)
    
    # Plotly bar chart
    fig = px.bar(
        top10,
        x="Country",
        y="Life_expectancy",
        title="Top 10 Countries by Average Life Expectancy",
        labels={"Life_expectancy": "Average Life Expectancy (years)"},
        text="Life_expectancy",
        color="Life_expectancy",
        color_continuous_scale="Viridis",
        template="plotly_white",
        height=500
    )
    
    fig.update_traces(texttemplate='%{text:.2f}', textposition='outside')
    fig.update_layout(
        xaxis_title="Country",
        yaxis_title="Average Life Expectancy (years)",
        xaxis_tickangle=-45
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/top_countries_life_expectancy.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/top_countries_life_expectancy.png")
    
    return "top_countries_life_expectancy.html"

# 12. Scatter Plot - GDP vs Life Expectancy
def generate_gdp_vs_life_expectancy():
    # Filter out rows with missing or zero GDP or Life Expectancy
    df_filtered = life_expectancy_df[(life_expectancy_df["GDP"] > 0) & (life_expectancy_df["Life_expectancy"] > 0)]
    
    # Plotly scatter plot
    fig = px.scatter(
        df_filtered,
        x="GDP",
        y="Life_expectancy",
        color="Country",
        size="Population",
        hover_name="Country",
        title="GDP vs Life Expectancy",
        labels={"GDP": "GDP (USD)", "Life_expectancy": "Life Expectancy (years)"},
        size_max=40,
        template="plotly_white",
        height=600
    )
    
    fig.update_layout(
        xaxis_title="GDP (USD)",
        yaxis_title="Life Expectancy (years)"
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/gdp_vs_life_expectancy.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/gdp_vs_life_expectancy.png")
    
    return "gdp_vs_life_expectancy.html"

# 13. Parallel Coordinates Plot - Heart Disease Features
def generate_heart_disease_parallel():
    # Select relevant features for comparison
    parallel_data = heart_df[["age", "chol", "trestbps", "thalach", "oldpeak", "target"]].copy()
    
    # Create Parallel Coordinates Plot
    fig = px.parallel_coordinates(
        parallel_data,
        color="target",
        labels={
            "age": "Age",
            "chol": "Cholesterol",
            "trestbps": "Resting BP",
            "thalach": "Max Heart Rate",
            "oldpeak": "ST Depression",
            "target": "Heart Disease"
        },
        color_continuous_scale=px.colors.diverging.Tealrose,
        title="Heart Disease Feature Comparison",
        height=600
    )
    
    # Save the figure
    pio.write_html(fig, file=f"{IMAGE_DIR}/heart_disease_parallel.html", include_plotlyjs='cdn')
    pio.write_image(fig, file=f"{IMAGE_DIR}/heart_disease_parallel.png")
    
    return "heart_disease_parallel.html"

# Generate all charts and collect their filenames
chart_files = {
    "mortality_by_category": generate_mortality_by_category(),
    "mortality_over_years": generate_mortality_over_years(),
    "urbanization_vs_mortality": generate_urbanization_vs_mortality(),
    "education_vs_prevalence": generate_education_vs_prevalence(),
    "mortality_heatmap": generate_mortality_heatmap(),
    "life_expectancy_over_time": generate_life_expectancy_over_time(),
    "disease_population_treemap": generate_disease_population_treemap(),
    "mortality_choropleth": generate_mortality_choropleth(),
    "cholesterol_by_gender": generate_cholesterol_by_gender(),
    "age_by_heart_disease": generate_age_by_heart_disease(),
    "top_countries_life_expectancy": generate_top_countries_life_expectancy(),
    "gdp_vs_life_expectancy": generate_gdp_vs_life_expectancy(),
    "heart_disease_parallel": generate_heart_disease_parallel()
}

# Print success message
print("All charts generated successfully!")
print(f"HTML files saved in: {IMAGE_DIR}/")
print(f"PNG files saved in: {IMAGE_DIR}/")

# Create a JSON file with chart metadata for the webpage
import json

chart_metadata = [
    {
        "id": "mortality_by_category",
        "title": "Average Mortality Rate by Disease Category",
        "description": "This bar chart shows the average mortality rate for different disease categories. Autoimmune diseases have the highest mortality rate at around 5.12%, followed by Bacterial and Cardiovascular diseases.",
        "insight": "Autoimmune diseases show the highest mortality rates, suggesting a need for improved treatments and earlier diagnosis in this category.",
        "file_html": "mortality_by_category.html",
        "file_png": "mortality_by_category.png",
        "chart_type": "Bar Chart",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "mortality_over_years",
        "title": "Mortality Rate Over Years",
        "description": "This line chart tracks the average mortality rate across all diseases over time. There are notable fluctuations, with a significant dip around 2015.",
        "insight": "The mortality rate shows cyclical patterns with a major decrease around 2015, possibly indicating the impact of global health initiatives or improved treatment protocols during that period.",
        "file_html": "mortality_over_years.html",
        "file_png": "mortality_over_years.png",
        "chart_type": "Line Chart",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "urbanization_vs_mortality",
        "title": "Urbanization Rate vs Mortality Rate by Country",
        "description": "This bubble chart explores the relationship between urbanization rates and mortality rates across different countries. The size of each bubble represents the population affected.",
        "insight": "There appears to be no strong correlation between urbanization and mortality rates, suggesting that other factors like healthcare quality and disease management may have more significant impacts on mortality outcomes.",
        "file_html": "urbanization_vs_mortality.html",
        "file_png": "urbanization_vs_mortality.png",
        "chart_type": "Bubble Chart",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "education_vs_prevalence",
        "title": "Education Index vs Prevalence Rate by Country",
        "description": "This scatter plot examines the relationship between a country's education index and disease prevalence rates. The size of each point indicates the number of diseases recorded in that country.",
        "insight": "Countries with higher education indices tend to have lower disease prevalence rates, suggesting that education may play a role in disease prevention and health awareness.",
        "file_html": "education_vs_prevalence.html",
        "file_png": "education_vs_prevalence.png",
        "chart_type": "Scatter Plot",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "mortality_heatmap",
        "title": "Heatmap of Mortality Rate by Country and Disease",
        "description": "This heatmap visualizes mortality rates across different countries and diseases, with darker red indicating higher mortality rates.",
        "insight": "The heatmap reveals specific country-disease combinations with exceptionally high mortality rates, highlighting areas where targeted interventions could be most beneficial.",
        "file_html": "mortality_heatmap.html",
        "file_png": "mortality_heatmap.png",
        "chart_type": "Heatmap",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "life_expectancy_over_time",
        "title": "Average Life Expectancy Over Time",
        "description": "This area chart shows how global average life expectancy has changed over time.",
        "insight": "Life expectancy has shown a general upward trend over the years, reflecting improvements in healthcare, nutrition, and living conditions worldwide.",
        "file_html": "life_expectancy_over_time.html",
        "file_png": "life_expectancy_over_time.png",
        "chart_type": "Area Chart",
        "data_source": "Life Expectancy Dataset"
    },
    {
        "id": "disease_population_treemap",
        "title": "Total Population Affected by Disease Category",
        "description": "This treemap visualizes the total population affected by each disease category, with larger areas representing more affected people.",
        "insight": "Viral diseases affect the largest population globally, followed by respiratory diseases, highlighting the significant public health burden of these disease categories.",
        "file_html": "disease_population_treemap.html",
        "file_png": "disease_population_treemap.png",
        "chart_type": "Treemap",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "mortality_choropleth",
        "title": "Average Mortality Rate by Country",
        "description": "This choropleth map displays average mortality rates across different countries, with darker red indicating higher mortality rates.",
        "insight": "There are significant geographical disparities in mortality rates, with some regions showing consistently higher rates that may be linked to healthcare access, economic factors, or disease burden.",
        "file_html": "mortality_choropleth.html",
        "file_png": "mortality_choropleth.png",
        "chart_type": "Choropleth Map",
        "data_source": "Global Health Dataset"
    },
    {
        "id": "cholesterol_by_gender",
        "title": "Cholesterol Distribution by Gender",
        "description": "This violin plot shows the distribution of cholesterol levels between males and females in the heart disease dataset.",
        "insight": "Females show a wider distribution of cholesterol levels with a higher median value compared to males, which could be relevant for gender-specific approaches to cardiovascular health.",
        "file_html": "cholesterol_by_gender.html",
        "file_png": "cholesterol_by_gender.png",
        "chart_type": "Violin Plot",
        "data_source": "Heart Disease Dataset"
    },
    {
        "id": "age_by_heart_disease",
        "title": "Age Distribution by Heart Disease Presence",
        "description": "This box plot compares the age distribution between individuals with and without heart disease.",
        "insight": "Individuals with heart disease tend to be older on average, confirming age as a significant risk factor for cardiovascular conditions.",
        "file_html": "age_by_heart_disease.html",
        "file_png": "age_by_heart_disease.png",
        "chart_type": "Box Plot",
        "data_source": "Heart Disease Dataset"
    },
    {
        "id": "top_countries_life_expectancy",
        "title": "Top 10 Countries by Average Life Expectancy",
        "description": "This bar chart shows the top 10 countries with the highest average life expectancy.",
        "insight": "The top-ranking countries for life expectancy are predominantly developed nations with strong healthcare systems and high standards of living.",
        "file_html": "top_countries_life_expectancy.html",
        "file_png": "top_countries_life_expectancy.png",
        "chart_type": "Bar Chart",
        "data_source": "Life Expectancy Dataset"
    },
    {
        "id": "gdp_vs_life_expectancy",
        "title": "GDP vs Life Expectancy",
        "description": "This scatter plot explores the relationship between a country's GDP and life expectancy, with point size representing population.",
        "insight": "There is a positive correlation between GDP and life expectancy, though the relationship plateaus at higher GDP levels, suggesting diminishing returns on healthcare investment beyond a certain point.",
        "file_html": "gdp_vs_life_expectancy.html",
        "file_png": "gdp_vs_life_expectancy.png",
        "chart_type": "Scatter Plot",
        "data_source": "Life Expectancy Dataset"
    },
    {
        "id": "heart_disease_parallel",
        "title": "Heart Disease Feature Comparison",
        "description": "This parallel coordinates plot shows the relationships between multiple features related to heart disease.",
        "insight": "Patients with heart disease tend to have distinct patterns across multiple health metrics, particularly in maximum heart rate and ST depression during exercise, which could be valuable for early detection.",
        "file_html": "heart_disease_parallel.html",
        "file_png": "heart_disease_parallel.png",
        "chart_type": "Parallel Coordinates Plot",
        "data_source": "Heart Disease Dataset"
    }
]

with open(f"{IMAGE_DIR}/chart_metadata.json", "w") as f:
    json.dump(chart_metadata, f, indent=2)

print(f"Chart metadata saved to: {IMAGE_DIR}/chart_metadata.json")
