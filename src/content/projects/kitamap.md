---
title: "kitamap"
slug: "kitamap"
description: "GIS-based analysis of childcare availability in Berlin: ETL pipelines, time series forecasting, and accessibility analysis."
category: "Geospatial"
tags:
  - "Python"
  - "scikit-learn"
  - "Prophet"
  - "GeoPandas"
  - "OpenRouteService"
github: "https://github.com/spignotti/kitamap"
demo: "https://pinea.app.carto.com/map/81885962-c7a8-4639-8124-372e0caa6e60"
cover: "/covers/kitamap.png"
coverIcon: "map-pin"
tagline: "Spatial analysis of daycare supply in Berlin: coverage assessment, demand forecasting, and accessibility mapping."
year: 2024
completed: true
screenshots:
  - src: "/projects/kitamap/screenshot-01.png"
    alt: "kitamap CARTO dashboard"
downloads:
  - label: "Project report (PDF)"
    href: "/projects/kitamap/report.pdf"
---

## Problem

Daycare supply in Berlin is unevenly distributed, but there is a lack of data-driven tools that spatially combine supply, demand, and accessibility.

## Solution

GIS-based analysis pipeline: ETL from public data sources, time series forecasting of child population per planning area, routing-based accessibility analysis, and spatial overlay of supply and demand.

## Result

Identification of underserved areas with a forecast horizon. The methodologically deepest project in the portfolio, combining ML (Prophet, scikit-learn), spatial analytics, and ETL in a cohesive pipeline.

## Lessons Learned

- Prophet worked well for the population forecast, but required careful preprocessing. Child population data from Berlin's statistics office has gaps and reporting inconsistencies between years. Imputation strategy matters more than model tuning here.
- OpenRouteService isochrones were the right approach for accessibility analysis, but the free API tier has strict rate limits. Batch-computing isochrones for all 450+ daycare locations required caching and incremental processing over multiple runs.
- The biggest insight was methodological: supply-demand ratios per district miss the point if parents can realistically reach daycares in adjacent districts. The routing-based accessibility model captures this cross-boundary effect.

## Deep Dive

The pipeline has three stages. First, ETL: public data from Berlin's open data portal (daycare locations, capacities, child population by planning area) is cleaned, geocoded, and standardized. Second, forecasting: Prophet models project child population per planning area forward, using historical trends and accounting for seasonality in birth rates. scikit-learn handles the demand-side clustering to identify areas with similar demographic trajectories. Third, accessibility: OpenRouteService computes walking and cycling isochrones from each daycare location. Spatial overlay of isochrones against planning areas produces an accessibility score that accounts for cross-district reachability, not just per-district ratios.
