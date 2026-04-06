---
title: "context-engineering"
slug: "context-engineering"
description: "Reproducible framework for AI-assisted coding with OpenCode. Custom commands, skills, prompt pipelines, and project templates."
category: "AI/Automation"
tags:
  - "Python"
  - "OpenCode"
  - "Git"
coverIcon: "terminal"
tagline: "Structured context layer for AI-assisted development. Reusable commands, controlled prompts, persistent session memory."
featured: true
year: 2025
completed: false
---

## Problem

AI coding tools are powerful but generic. Default prompts and workflows don't adapt to project-specific constraints, architecture decisions, or team conventions. The result is generic code that needs constant correction.

## Solution

Reproducible framework for AI-assisted development with OpenCode as the coding agent. Versioned prompt pipelines, project-specific skills and commands, a template system for different project categories (OSS, Portfolio, Tool), and structured handoff documents that give the agent full project context before writing a single line of code.

## Result

Consistent, high-quality AI-assisted development across all projects. Every project starts with the same structure, every coding session has full context. The system is version-controlled in Git for backup and reproducibility.

## Lessons Learned

- The biggest productivity gain came not from the AI coding tool itself but from structured project context. A well-written PROJECT.md with architecture decisions, constraints, and current state gives the agent everything it needs to produce useful code on the first try.
- Processes that already work with human teams also work with AI agents. Code review, testing, linting as separate steps with clear inputs and outputs. The mistake is treating an AI coding session as one monolithic task instead of decomposing it the way you would delegate to a junior developer.
- After evaluating Cursor, Claude Code, Codex, and Pi, OpenCode won because of full customizability: custom commands, skills, and prompts versioned alongside the project. Pi was a strong contender and taught a lot about how coding agents work under the hood, but the overhead of tool-level customization became a bottleneck. The tool matters less than the system around it.
- Working across every major model provider (OpenAI, Anthropic, Google) and through OpenCode also open-source and open-weight models (DeepSeek, Qwen, Mistral) builds a practical understanding of model selection. Each model has distinct strengths, failure modes, and prompting patterns. Knowing which model fits which task is as important as the prompt system itself.

## Deep Dive

The framework is organized into three layers. Commands handle atomic operations (init a project, create a PR, run tests). Skills are the agent's extended capabilities: multi-step workflows, additional domain knowledge, and custom scripts that go beyond what commands cover. Examples include security checks, Python package-specific guidance, DevOps environment setup, and content import workflows. Project context (PROJECT.md, AGENTS.md, skill definitions) provides the persistent knowledge layer that travels with the repository. Each project gets a category (OSS, Portfolio, Tool) that determines Git workflow, process weight, and release handling. Templates bootstrap new projects with the right structure from the start.
