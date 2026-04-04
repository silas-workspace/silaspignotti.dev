---
title: urbanIQ
description: Smart geodata aggregation for automated district-level analytics in Berlin.
slug: urbaniq
category: Geo Data Science
stack:
  - Python
  - FastAPI
  - LangChain
  - GeoPandas
  - SQLite
  - HTMX
github: https://github.com/spignotti/urbanIQ
cover: /covers/urbaniq.png
coverIcon: map
tagline: Analyzing Berlin's districts. One question instead of ten datasets.
featuredOrder: 2
screenshots:
  - src: /projects/urbaniq/screenshot-01.png
    alt: urbanIQ application screenshot
---

## Problem

Geodata on Berlin's districts is scattered across multiple sources (statistics offices, OpenStreetMap, public administration). Anyone needing a quick overview has to manually aggregate and join datasets.

## Solution

NLP-driven geodata aggregation: users ask a natural-language question, the system identifies relevant datasets, retrieves them, performs spatial joins, and delivers a structured district analysis.

## Result

Automated district profiles at the push of a button. Demonstrates the intersection of LLM-based query logic and spatial data processing.
