---
title: "Routing Engine"
slug: "routing-engine"
description: "Production route planning for recurring field-service operations."
category: "AI/Automation"
tags:
  - "Python"
  - "FastAPI"
  - "React"
  - "Next.js"
  - "PyVRP"
  - "Docker"
coverIcon: "workflow"
tagline: "Production route planning for recurring field-service operations."
featured: true
year: 2026
completed: false
---

## Problem

Recurring maintenance tours were planned manually from individual addresses, vehicle availability and expected service times. The office team needed a usable daily plan, not another complex dispatch platform: feasible routes, a clear stop order and enough control to correct plans before they reached the field.

## Solution

Routing Engine is a web application for planning recurring Fettabscheider maintenance tours. It combines service orders, vehicle types, shift times, breaks and compatibility rules into daily route proposals. The office team reviews the routes on a map, adjusts stops when needed and exports a practical stop list.

The project started with a narrow pilot scope. The focus was on a working planning flow and understandable results rather than building a CRM, ERP or generic logistics platform.

## Result

The application is deployed on a private server and used by the DINO office team through Tailscale Funnel. This moved the project beyond a local prototype: it covers product scoping, implementation, deployment and use in an operational setting.

The next phase professionalizes the operational side of the application with automated deployments, health checks and monitoring. The goal is a reproducible, maintainable service while the pilot provides feedback on the planning workflow.

## Technical Details

The application combines a Python optimization backend with PyVRP for route generation and FastAPI for the application API. A React and Next.js frontend provides the planning interface, map review and manual route adjustments. Docker packages the application for server deployment. Tailscale Funnel provides controlled remote access for the pilot team.

The architecture keeps the solver behind a defined planning contract. Routing, geocoding, imports and exports remain separate boundaries, so providers and implementation details can change without rewriting the planning logic.

> This is a private commercial pilot. Source code and operational data are not publicly available.
