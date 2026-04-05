---
title: "litresearch"
slug: "litresearch"
description: "Open-source CLI for automated literature research. From research question to curated paper set with report and BibTeX export. Published on PyPI."
category: "AI/Automation"
tags:
  - "Python"
  - "Typer"
  - "LiteLLM"
  - "Semantic Scholar"
  - "pypdf"
github: "https://github.com/spignotti/litresearch"
demo: "https://pypi.org/project/litresearch/"
cover: "/covers/litresearch.png"
coverIcon: "file-search"
tagline: "Automated literature search from a research question to a curated, deduplicated source set."
featured: true
year: 2026
completed: true
---

## Problem

Literature search is one of the most time-consuming parts of academic work. Finding relevant papers means cycling between keyword searches, scanning abstracts, following citation chains, and filtering for quality. For a new topic, this easily takes days before the actual reading begins.

## Solution

Open-source CLI tool that automates the literature search workflow. Takes a research question, generates search queries via LLM, retrieves papers from Semantic Scholar, filters and ranks results by relevance, and produces a structured report with export to common formats. Supports iterative refinement: results from one round inform the next.

## Result

Reproducible literature sets from a single command. Published on PyPI, MIT license. Reduces initial literature search from days to minutes while maintaining academic rigor through transparent query and filtering logic.

## Lessons Learned

- Semantic Scholar's API is powerful but has quirks: rate limits, inconsistent metadata coverage, and papers that exist in the web UI but not in the API. Building robust error handling and fallback logic was as much work as the core search pipeline.
- LLM-generated search queries consistently outperform hand-written ones for exploratory searches. The model finds synonym variations and related terms that a manual search would miss.
- The biggest usability improvement was adding the report format: a structured Markdown document with categorized papers, key findings, and citation-ready references. Raw paper lists are useless without synthesis.

## Deep Dive

The pipeline runs in four stages. First, query generation: the LLM decomposes the research question into multiple search strategies (keyword-based, concept-based, methodological). Second, retrieval: Semantic Scholar API calls with pagination, deduplication, and metadata enrichment (citation count, publication year, open access status). Third, filtering and ranking: LLM-based relevance scoring against the original research question, with configurable thresholds. Fourth, report generation: structured Markdown output with paper summaries, categorization by subtopic, and BibTeX export. Each stage is independently cacheable, so iterative refinement does not repeat expensive API calls.
