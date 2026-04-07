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
coverIcon: "map-pin"
tagline: "Spatial analysis of daycare supply in Berlin. Coverage assessment, demand forecasting, and accessibility mapping."
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

GIS-based analysis pipeline combining ETL from public data sources, time series forecasting of child population per planning area, routing-based accessibility analysis, and spatial overlay of supply and demand.

## Result

Identification of underserved districts with a forecast horizon. Results closely matched the district office's own analysis (conducted with closed data), validating that an open-data-only approach can reproduce official planning assessments.

## Lessons Learned

- Prophet handled the population forecast adequately, but was likely overkill for this data. Child population figures from Berlin's statistics office have gaps and reporting inconsistencies. Imputation and preprocessing mattered more than the choice of forecasting model.
- OpenRouteService isochrones were the right approach for accessibility analysis, but the free API tier has strict rate limits. Batch-computing isochrones for all 450+ daycare locations required caching and incremental processing over multiple runs.
- The biggest insight was methodological: supply-demand ratios per district miss the point if parents can realistically reach daycares in adjacent districts. The routing-based accessibility model captures this cross-boundary effect.

## Deep Dive

The pipeline has three stages. ETL cleans, geocodes, and standardizes public data from Berlin's open data portal (daycare locations, capacities, child population by planning area). Time series models project child population per planning area forward using historical trends. scikit-learn handles demand-side clustering to identify areas with similar demographic trajectories. OpenRouteService computes walking and cycling isochrones from each daycare location. Spatial overlay of isochrones against planning areas produces an accessibility score that accounts for cross-district reachability, not just per-district ratios.
