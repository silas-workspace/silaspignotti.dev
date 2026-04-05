---
title: kitamap
description: "GIS-based analysis of childcare availability in Berlin: ETL pipelines, time series forecasting, and accessibility analysis."
slug: kitamap
category: Geospatial
tags:
  - Python
  - scikit-learn
  - Prophet
  - GeoPandas
  - OpenRouteService
github: https://github.com/spignotti/kitamap
cover: /covers/kitamap.png
coverIcon: map-pinned
tagline: Where are daycare spots missing in Berlin? A data-driven answer instead of guesswork.
featuredOrder: 3
downloads:
  - label: Project report (PDF)
    href: /projects/kitamap/report.pdf
screenshots:
  - src: /projects/kitamap/screenshot-01.png
    alt: kitamap analysis screenshot
---

## Problem

Daycare supply in Berlin is unevenly distributed, but there is a lack of data-driven tools that spatially combine supply, demand, and accessibility.

## Solution

GIS-based analysis pipeline: ETL from public data sources, time series forecasting of child population per planning area, routing-based accessibility analysis, and spatial overlay of supply and demand.

## Result

Identification of underserved areas with a forecast horizon. The methodologically deepest project in the portfolio, combining ML (Prophet, scikit-learn), spatial analytics, and ETL in a cohesive pipeline.
