---
title: "building-detector"
slug: "building-detector"
description: "Building footprint detection in satellite imagery using a fine-tuned segmentation model."
category: "Geospatial"
tags:
  - "Python"
  - "PyTorch"
  - "Flask"
  - "Leaflet"
  - "Shapely"
  - "GeoPandas"
  - "Rasterio"
github: "https://github.com/spignotti/building-detector"
coverIcon: "layers"
tagline: "Point-guided building detection from satellite imagery using SAM2."
year: 2024
completed: true
screenshots:
  - src: "/projects/building-detector/screenshot-01.png"
    alt: "building-detector web interface with detected footprints"
---

## Problem

Building footprints in OpenStreetMap are incomplete or outdated in many regions. Manual digitization from satellite imagery is extremely time-consuming.

## Solution

Web application using the GeoAI package (built on SAM2, pre-optimized for building detection) to extract building footprints from satellite imagery. Users select points on a map, the model segments the corresponding buildings and returns regularized footprints, exported as OSM-compatible GeoJSON.

## Result

Accurate building extraction with minimal manual effort. Output directly importable into OpenStreetMap.

## Lessons Learned

- First project combining a vision model with a web application. Setting up GeoAI (SAM2-based, pre-trained for building detection), connecting it to a Flask backend with a Leaflet map frontend, and building the GeoJSON export pipeline was the main learning curve.
- The model worked well out of the box with good point prompts. GeoAI delivers regularized rectangular footprints, so no manual geometry post-processing was needed.
- Flask was pragmatic for a prototype, but the synchronous request model became a bottleneck. Each segmentation call blocks the server for seconds. An async framework with a task queue would be necessary for production use.
- GPU memory is the main deployment constraint for SAM2-based models. CPU inference works but is too slow for interactive use.

## Deep Dive

The application connects a Leaflet map frontend with a Flask backend serving the GeoAI segmentation model. Users click points on the map to indicate buildings. The backend passes point prompts and the corresponding image tile to GeoAI, which handles segmentation and geometry regularization internally, returning clean rectangular footprints. Results are rendered as polygon overlays on the map and exported as GeoJSON with OSM-compatible tagging.
