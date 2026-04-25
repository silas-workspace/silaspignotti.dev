---
title: "Academic Agent"
slug: "academic-agent"
description: "Full-scope academic agent built around Zotero as the data layer via a custom MCP server, with PaperQA2 for local tag-scoped RAG and a Pandoc-based writing pipeline."
category: "AI/Automation"
tags:
  - "Python"
  - "OpenCode"
  - "Zotero"
  - "Semantic Scholar"
  - "PaperQA2"
  - "Pandoc"
github: "https://github.com/spignotti/academic-agent"
coverIcon: "book-open-check"
tagline: "Zotero-first academic workflow from DOI ingest to citation-ready drafts."
featured: true
year: 2026
completed: false
---

Full-scope academic agent built around Zotero as the data layer via a custom MCP server, with PaperQA2 for local tag-scoped RAG and a Pandoc-based writing pipeline.

## Problem

AI is moving into academic workflows because it has to. The volume of literature keeps growing and manual processing does not scale. Used naively, LLMs break academic work in three ways.

1. Hallucination. Without grounding in real sources, models invent citations, results, and entire papers.
2. Citation handling. Even when answers are grounded, most AI tools never connect to a real reference manager. Citation keys, BibTeX, formatted bibliographies stay manual or broken.
3. Writing. The hard part of academic writing is connecting arguments from the literature with your own line of reasoning. Most tools stop at chat-with-PDF.

This project is explicitly not about generating papers end to end. The point is the opposite: keep the researcher in the loop and remove the friction around literature management, retrieval, and citation work.

## Solution

An OpenCode-based agent built around three modules, all routed through a custom MCP server (`zotero-companion`) that exposes Zotero as the data layer.

The first module makes Zotero the database. Items, PDFs, tags, and notes live there with no parallel state on the agent side. Semantic Scholar fills metadata gaps and provides open-access PDF downloads when Zotero cannot resolve a DOI directly, so the agent has two paths to a PDF for any given DOI. Tags follow a flat namespace convention (`area/*`, `topic/*`, `project/*`, `status/*`) so the library can be sliced by project or by topic without rebuilding collection trees.

The second module handles retrieval. Instead of a custom embedding pipeline, the agent points PaperQA2 at a symlink farm built from the Zotero PDF storage. Retrieval is scoped by tag, so a query against `project/masterthesis` only sees that project's papers. Indexes are cached per scope and rebuilt incrementally.

The third module covers writing. Project workspaces under `~/academic-workspace/projects/<slug>/` give each piece of work its own scoped `library.bib` (auto-exported via Better BibTeX), a `drafts/` folder, and a Pandoc build pipeline. Citation lookup, draft assistance, and Markdown-to-PDF/DOCX rendering connect the retrieved literature to the actual writing.

Beyond writing, the same skill surface extends to scientific layout, infographic generation, and plotting, each as a separate OpenCode skill on top of the same scoped library.

## Result

A single agent that carries a paper from DOI to citation. A DOI returns a fully tagged Zotero item with verified metadata and PDF. A project query returns a PaperQA2 answer sourced from the local library, with citation keys ready to drop into a draft. A Markdown draft renders to a formatted PDF or DOCX with bibliography pulled from the scoped `library.bib`. No own SQLite, no custom metadata tables, no hand-rolled embeddings. Zotero stays the single source of truth and every layer above it routes through MCP.

## Lessons Learned

- Cutting the duplicate database was the decision that made the project shippable. An earlier version mirrored Zotero into Qdrant and a custom SQLite. Treating Zotero as the database via MCP removed weeks of sync logic and a whole class of failure modes.
- Tags beat collections for scoping. Collections stay useful as a visual layer, but tags compose. A query for `project/masterthesis` combined with `topic/rag` is one operation, not a collection-tree rewrite. Agent-side projects map onto Zotero collections, but the retrieval scope always comes from tags.
- A custom MCP server beats a generic Zotero wrapper. Scoping the tool surface to the operations the agent actually calls keeps prompts lean and failure modes small. Writing the integration layer once paid back on every skill built on top of it.
- PaperQA2 over local PDFs covers most of what a custom RAG stack would. The symlink farm is the only extra piece of infrastructure and it sits on top of Zotero's existing storage layout.

## Deep Dive

The MCP server (`zotero-companion`) is the center of the system. It exposes Zotero Local API operations as a tight toolset: item create and update with metadata verification, PDF attach and Semantic Scholar download, tag management with namespace and cardinality rules (`area/*` and `status/*` are single-valued, `topic/*` and `project/*` are not), child-note handling for AI-generated summaries, and scoped BibTeX export. Every skill routes through this layer rather than the Zotero API directly, which keeps tool usage consistent across the agent.

Retrieval sits on top. PaperQA2 builds its index over a symlink farm pointing at the actual PDFs in Zotero's storage, so the agent reads the same files Zotero manages. A query is parameterized by a tag scope: a project tag, a topic tag, or a combination with union or intersection semantics. Indexes are cached per scope, so repeat queries inside the same project stay fast.

Project workspaces close the loop. Each piece of academic work gets a folder under `~/academic-workspace/projects/<slug>/` with its own `project.yaml` (title, slug, CSL style, created_at), a scoped `library.bib`, a `drafts/` folder for Markdown documents, and a `build/` folder for Pandoc outputs. The slug is identical to the Zotero `project/<slug>` tag, which is the only coupling between the database and the local working environment. From there the writing skill sees only the scoped library, PaperQA2 answers only from the scoped PDFs, and citation keys come from stable Better BibTeX identifiers.

The non-goals shape the system as much as the goals: no own SQLite, no parallel metadata model, no hand-rolled embeddings, no web UI, no end-to-end paper generation. Whenever a feature threatened to grow past that boundary, the answer was usually to push it back into Zotero.
