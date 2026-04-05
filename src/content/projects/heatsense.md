---
title: heatsense
description: Urban Heat Island analysis combining satellite data, weather stations, and land use classification for Berlin.
slug: heatsense
category: Geospatial
tags:
  - Python
  - Google Earth Engine
  - Flask
  - GeoPandas
  - PySAL
  - Rasterio
  - Leaflet
github: https://github.com/spignotti/heatsense
cover: /covers/heatsense.png
coverIcon: thermometer
tagline: Making urban heat islands visible. Satellites, weather data, and land use.
year: 2023
status: completed
featuredOrder: 4
screenshots:
  - src: /projects/heatsense/screenshot-01.png
    alt: heatsense analysis screenshot
---

## Problem

Urban heat islands are a growing climate risk, but their spatial distribution is hard to grasp. Scattered weather stations don't provide a full picture.

## Solution

Analysis tool combining Landsat satellite data (via Google Earth Engine), CORINE land cover data, and DWD climate measurements. Computes land surface temperatures, identifies hotspots using spatial statistics (Local Moran's I, Getis-Ord Gi*), and quantifies land use effects on temperature distribution.

## Result

City-wide heat analysis for Berlin with statistically validated hotspot maps. Interactive web application for exploring results.
