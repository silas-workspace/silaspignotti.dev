---
title: Urban Tree Transfer
slug: urban-tree-transfer
description: Cross-city transfer of tree species classification using Sentinel-2. End-to-end ML pipeline with spatial block CV across Berlin and Leipzig.
category: Geospatial
tags:
  - Python
  - XGBoost
  - scikit-learn
  - GeoPandas
  - Rasterio
  - Google Earth Engine
  - 1D-CNN
github: https://github.com/spignotti/urban-tree-transfer
cover: /covers/urban-tree-transfer.png
coverIcon: trees
tagline: Cross-city transfer of urban tree genus classification. Can a model trained in Berlin classify trees in Leipzig?
featuredOrder: 1
downloads:
  - label: Thesis Report
    href: /projects/urban-tree-transfer/report.pdf
---

## Problem

Cities need tree cadastres for informed urban tree management, but manual field surveys are expensive and don't scale. Satellite-based classification using Sentinel-2 data offers an alternative, but models trained on one city typically fail when applied to another due to domain shift. No systematic baselines existed to quantify this cross-city transfer gap for urban tree genus classification.

## Solution

Fully reproducible end-to-end pipeline: multitemporal Sentinel-2 composites (12 months, 10 bands + 13 vegetation indices) combined with municipal tree cadastres from Berlin (905k trees) and Leipzig (168k trees), 17 genus-level classes. Two algorithmic paradigms (XGBoost vs. 1D-CNN), strict spatial block CV, three sequential experiments (source optimization, zero-shot transfer, fine-tuning with stratified target data fractions). Built entirely on open data.

## Result

XGBoost weighted F1 = 0.751 in Berlin under spatial block CV, exceeding published benchmarks despite higher class count and stricter evaluation. Zero-shot transfer to Leipzig: XGBoost -49.8%, 1D-CNN -37.4%. Fine-tuning sweet spot at 25-50% local data. Pipeline design (class balancing: +18 pp F1, spatial evaluation, feature engineering) contributes more to performance than algorithm or hyperparameter choice.

## Lessons Learned

- Pipeline design matters more than algorithm choice. Class balancing alone added +18 pp weighted F1. Spatial block CV, feature engineering, and preprocessing decisions had more impact than hyperparameter tuning or switching between XGBoost and 1D-CNN.
- Spatial autocorrelation is the silent accuracy killer in remote sensing ML. Standard random CV inflated accuracy by double digits. Spatial block CV with 1200 m blocks caught this. Straightforward to implement, unclear why it's still not standard practice in the field.
- Zero-shot transfer confirmed what the literature suspected but rarely quantified: domain shift between cities is severe (up to -50% F1). The practical sweet spot for fine-tuning was 25-50% local data, not full retraining.

## Deep Dive

The transfer experiment used three sequential stages. First, source-domain optimization in Berlin: systematic comparison of XGBoost (50 importance-ranked features from 276 candidates) and 1D-CNN (full 144-feature temporal sequences) under spatial block CV. Second, zero-shot transfer to Leipzig: applying Berlin-trained models directly to Leipzig data without adaptation. Third, fine-tuning with stratified Leipzig data fractions (10%, 25%, 50%, 100%) and comparison against from-scratch baselines. The 1D-CNN retained more performance under zero-shot transfer (-37.4% vs. -49.8% for XGBoost), suggesting that learned temporal representations generalize better than handcrafted spectral features. Feature importance analysis confirmed this: XGBoost relied heavily on absolute spectral values (NDVI magnitude), while the CNN encoded relative temporal patterns (phenological shape). The fine-tuning recovery followed a power-law curve, with diminishing returns beyond 50% local data.
