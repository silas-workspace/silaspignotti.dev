---
title: "urbanIQ"
slug: "urbaniq"
description: "NLP-driven geodata aggregation for Berlin's districts. Natural-language queries to automated spatial analysis and district profiles."
category: "Geospatial"
tags:
  - "Python"
  - "FastAPI"
  - "LangChain"
  - "GeoPandas"
  - "SQLite"
  - "HTMX"
github: "https://github.com/spignotti/urbanIQ"
coverIcon: "building-2"
tagline: "Analyzing Berlin's districts. One question instead of ten datasets."
year: 2025
completed: true
screenshots:
  - src: "/projects/urbaniq/screenshot-01.png"
    alt: "urbanIQ district analysis interface"
---

## Problem

Geodata on Berlin's districts is scattered across multiple sources (statistics offices, OpenStreetMap, public administration). Anyone needing a quick overview has to manually aggregate and join datasets.

## Solution

NLP-driven geodata aggregation. Users ask a natural-language question, the system identifies relevant datasets, retrieves them, performs spatial joins, and delivers a structured district analysis.

## Result

Automated district profiles from a single question. Connects LLM-based query logic with spatial data processing in one tool.

## Lessons Learned

- LangChain's abstraction helped prototype the NLP-to-query pipeline quickly, but the chain logic became hard to debug once multiple datasets were involved. For a production system, a simpler prompt-based approach with explicit query construction would be more maintainable.
- Spatial joins are the bottleneck. Aggregating multiple geodatasets per district is fast individually, but chaining five or six joins in sequence scales poorly. Pre-computing district profiles and updating incrementally would be the better architecture.
- HTMX was a good fit for this kind of tool: server-rendered HTML fragments, no frontend build step, minimal JavaScript. Fast to build and easy to maintain.

## Deep Dive

The query pipeline works in three stages. First, the user's natural-language question is parsed by an LLM to identify which datasets are relevant (demographics, infrastructure, green space, etc.). Second, the system retrieves the corresponding geodata from local sources or APIs, performs spatial joins against Berlin's district boundaries (LOR planning areas), and aggregates metrics per district. Third, results are formatted as a structured district profile and rendered via HTMX. The LangChain integration handles the first stage: a chain that maps questions to dataset identifiers and aggregation functions. The spatial processing in stage two is pure GeoPandas with SQLite caching for previously computed joins.
