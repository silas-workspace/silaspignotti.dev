---
title: building-detector
description: Point-guided building detection from satellite imagery using SAM2. Interactive web app for selecting points on a map and extracting building footprints.
slug: building-detector
category: Geospatial
tags:
  - Python
  - SAM2/PyTorch
  - Flask
  - Leaflet
  - Shapely
  - GeoPandas
  - Rasterio
github: https://github.com/spignotti/building-detector
cover: /covers/building-detector.png
coverIcon: house
tagline: Detecting buildings in satellite imagery. With a click, not by hand.
featuredOrder: 1
screenshots:
  - src: /projects/building-detector/screenshot-01.png
    alt: building-detector application screenshot
---

## Problem

Building footprints in OpenStreetMap are incomplete or outdated in many regions. Manual digitization from satellite imagery is extremely time-consuming.

## Solution

Web application using the Segment Anything Model 2 (SAM2) to automatically extract building footprints from high-resolution satellite imagery. Users select an area on the map, the system segments buildings, regularizes geometries, and exports OSM-compatible GeoJSON data.

## Result

Pixel-accurate building extraction with minimal manual effort. Directly importable into OpenStreetMap. Demonstrates end-to-end integration of state-of-the-art deep learning into a geodata workflow.
