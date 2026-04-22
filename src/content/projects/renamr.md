---
title: "renamr"
slug: "renamr"
description: "Content-aware CLI for batch file renaming. Reads PDFs, scans, and images via LLM and writes structured filenames. Works with any LiteLLM provider, including local Ollama for offline processing."
category: "AI/Automation"
tags:
  - "Python"
  - "Typer"
  - "LiteLLM"
  - "Ollama"
github: "https://github.com/spignotti/renamr"
pypi: "https://pypi.org/project/renamr/"
coverIcon: "wand-2"
tagline: "Content-aware CLI for batch file renaming via LLMs."
year: 2026
completed: true
featured: false
---

## Problem

Scanned documents, downloads, and exported files arrive with names like `scan_001.pdf` or `IMG_5847.jpg`. Renaming them manually to a consistent schema is repetitive, and the discipline collapses across multiple inboxes with different conventions.

## Solution

Open-source CLI that reads each file, sends a content preview to an LLM, and renames it to a structured format based on what the file actually contains. PDFs with selectable text go through a text-first extraction path. Scans and images fall back to vision models, with pages rendered or encoded depending on file type. Only the filename changes; file contents are never touched.

Configuration is per inbox. Each folder can define its own filename template, output language, and extraction prompt, while a global block covers shared defaults. Provider selection runs through LiteLLM, so OpenAI, OpenRouter, Anthropic, and local Ollama all work via the same config with no code changes.

## Result

A single `renamr run` processes entire folders into structured names like `240115_ACME_Invoice.pdf`. Dry-run previews every decision before committing, and `renamr undo` reverts the last run in one step. Published on PyPI under MIT, released via a CI pipeline using Trusted Publishing.

## Lessons Learned

- Per-inbox configuration turned out to be the core abstraction. One global config with folder-specific overrides for template, language, and prompt covers invoices, scans, and receipts without duplicating settings or forcing a tool-per-folder setup.
- Hybrid extraction should have been the baseline from day one. Bolting the vision path on after the text path meant refactoring the interface twice. Designing both paths behind a shared extraction contract would have been cleaner.
- LiteLLM as the provider layer paid off immediately. Switching between cloud providers and a local Ollama instance happens in config, which made the privacy story (offline processing for sensitive folders) a one-line change.
- Trusted Publishing on PyPI took longer to set up than the first release itself, but it removed long-lived API tokens from the release process entirely.

## Deep Dive

The extraction pipeline routes by file type. Regular PDFs go through text extraction first. Scanned PDFs are rendered page by page for vision-capable models. Images are encoded and sent directly without rendering. The LLM receives extracted content plus filename metadata and returns a structured rename suggestion following the configured template, where `{date}`, `{sender}`, and `{subject}` are common placeholders.

Per-inbox configuration uses TOML array-of-tables. Each `[[inbox]]` block defines a path and optional overrides for template, language, and prompt. Missing fields fall back to globals, which keeps the config compact for simple setups and expressive for mixed ones. File extensions and recursion stay global to avoid mode-switching mid-run.

iCloud handling is macOS-specific. Files in evicted state need to be downloaded via `brctl` before content extraction, which added an async wait step to the pipeline. Running entirely offline is a first-class path: setting `model = "ollama/..."` and pointing `api_base` at a local Ollama instance keeps all file content on the machine. That is the recommended setup for anything sensitive.
