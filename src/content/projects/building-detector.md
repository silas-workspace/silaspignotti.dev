---
title: "building-detector"
slug: "building-detector"
description: "Point-guided building detection from satellite imagery using SAM2. Interactive web app for selecting points on a map and extracting building footprints."
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
tagline: "Building footprint detection in satellite imagery using a fine-tuned segmentation model."
year: 2024
completed: true
screenshots:
  - src: "/projects/building-detector/screenshot-01.png"
    alt: "building-detector web interface with detected footprints"
---

## Problem

Building footprints in OpenStreetMap are incomplete or outdated in many regions. Manual digitization from satellite imagery is extremely time-consuming.

## Solution

Web application using the Segment Anything Model 2 (SAM2) to automatically extract building footprints from high-resolution satellite imagery. Users select an area on the map, the system segments buildings, regularizes geometries, and exports OSM-compatible GeoJSON data.

## Result

Pixel-accurate building extraction with minimal manual effort. Directly importable into OpenStreetMap. Demonstrates end-to-end integration of a foundation model (SAM2) into a geodata workflow.

## Lessons Learned

- SAM2 out of the box works well for building segmentation with good point prompts. The real challenge was geometry post-processing: regularizing jagged pixel boundaries into clean building footprints with right angles.
- Flask was pragmatic for a prototype, but the synchronous request model became a bottleneck. Each segmentation call blocks the server for seconds. An async framework with a task queue would be necessary for production use.
- Serving SAM2 locally requires substantial GPU memory. Inference on CPU works but is too slow for an interactive workflow. GPU availability is the main deployment constraint.

## Deep Dive

The geometry pipeline after SAM2 segmentation was the most engineering-intensive part. Raw segmentation masks are pixel-level rasters with jagged edges. Converting these to OSM-compatible building footprints requires raster-to-polygon conversion (rasterio), simplification to reduce vertex count without losing shape (Shapely), and regularization to enforce right angles typical of building footprints. The regularization step uses a minimum rotated bounding rectangle approach, adjusted by the dominant edge orientation of the original polygon. Results are exported as GeoJSON with OSM-compatible tagging.
