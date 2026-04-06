---
title: "renamr"
slug: "renamr"
description: "AI-powered CLI for automatic file renaming. Analyzes PDFs, scans, and images via LLM. Open source, published on PyPI."
category: "AI/Automation"
tags:
  - "Python"
  - "Typer"
  - "LiteLLM"
  - "pypdf"
  - "pymupdf"
github: "https://github.com/spignotti/renamr"
demo: "https://pypi.org/project/renamr/"
coverIcon: "wand-2"
tagline: "CLI tool for batch file renaming using LLM-extracted content summaries."
year: 2026
completed: true
---

## Problem

Downloaded PDFs, scans, and documents come with cryptic filenames. Manually renaming them to a consistent schema takes time and discipline.

## Solution

Open-source CLI tool that analyzes file contents via LLM (PDFs, scans, images) and automatically renames them following a `YYMMDD_Sender_Subject.ext` convention. Supports multiple LLM providers, batch operations, and handles iCloud sync edge cases.

## Result

Consistent file organization with zero manual effort. Published on PyPI, MIT license. Demonstrates a production-grade OSS release process with CI/CD, SemVer, and Trusted Publishing.

## Lessons Learned

- Trusted Publishing on PyPI simplified the release process. Setting up the GitHub Actions workflow took longer than the actual code for the first release.
- Supporting scanned PDFs required a separate OCR path (pymupdf) alongside the text extraction path (pypdf). Designing for both from the start would have been cleaner than bolting it on later.
- LiteLLM as the provider abstraction was the right call. Switching between OpenAI, Anthropic, and local models without touching application code made testing and iteration fast.

## Deep Dive

The core challenge was reliable content extraction across file types. PDFs with selectable text go through pypdf, scanned documents and images go through pymupdf's OCR pipeline. The LLM receives extracted text plus filename metadata and returns a structured rename suggestion following the `YYMMDD_Sender_Subject.ext` convention. Batch mode processes entire directories, with dry-run output for verification before committing renames. iCloud sync required special handling: files in evicted state need to be downloaded before content extraction, which added an async wait step to the pipeline.
