---
title: renamr
description: AI-powered CLI for automatic file renaming. Analyzes PDFs, scans, and images via LLM. Open source, published on PyPI.
slug: renamr
category: AI/Automation
stack:
  - Python
  - Typer
  - LiteLLM
  - pypdf
  - pymupdf
github: https://github.com/spignotti/renamr
pypi: https://pypi.org/project/renamr/
cover: /covers/renamr.png
coverIcon: file-code-2
tagline: Let AI name your files. So you don't have to.
featuredOrder: 5
---

## Problem

Downloaded PDFs, scans, and documents come with cryptic filenames. Manually renaming them to a consistent schema takes time and discipline.

## Solution

Open-source CLI tool that analyzes file contents via LLM (PDFs, scans, images) and automatically renames them following a YYMMDD_Sender_Subject.ext convention. Supports multiple LLM providers, batch operations, and handles iCloud sync edge cases.

## Result

Consistent file organization with zero manual effort. Published on PyPI, MIT license. Demonstrates a production-grade OSS release process with CI/CD, SemVer, and Trusted Publishing.
