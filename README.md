# Dev-Sentinel

**Code Health Command Center**

Dev-Sentinel is a comprehensive code health monitoring and automation platform that helps engineering teams maintain code quality, track dependencies, and automate health improvements through AI-powered workflows.

## Overview

Dev-Sentinel follows an **Observe → Summarize → Judge → Fix → Prove** workflow to continuously monitor and improve code health across your repositories.

## Architecture

This is a monorepo built with [Turborepo](https://turborepo.com) and [pnpm](https://pnpm.io) workspaces, containing:

### Apps

- **`apps/web`** - Next.js dashboard (App Router) providing a web interface for viewing code health metrics, dependencies, and triggering automated actions
- **`apps/cli`** - TypeScript CLI tool (`dev-sentinel`) for running health scans, dependency checks, and documentation generation
- **`apps/kestra`** - Kestra workflow definitions for orchestrating code health analysis and automation tasks

### Packages

- **`packages/shared`** - Shared TypeScript types and Zod schemas for data contracts (Signals, Summary, Judge)
- **`packages/ui`** - Shared UI components
- **`packages/eslint-config`** - ESLint configurations
- **`packages/typescript-config`** - TypeScript configurations

### Data

- **`mock/`** - JSON mock data files (signals.json, summary.json, judge.json) for demo and development

## Features

### Next.js Dashboard

The web dashboard provides:

- **Overview** (`/`) - Health score, risk score, priority fixes, and weekly summary
- **Health Score** (`/health`) - Detailed health metrics
- **Dependencies** (`/dependencies`) - Table of outdated dependencies with risk levels
- **Actions Center** (`/actions`) - One-click automations to trigger Kestra workflows
- **Before / After** (`/before-after`) - Track improvements and ROI

### CLI Commands

The Dev-Sentinel CLI provides the following commands:

```bash
# Create a baseline health snapshot
dev-sentinel health:baseline

# Run a full health scan
dev-sentinel health:scan

# Scan for outdated dependencies
dev-sentinel deps:scan

# Prepare safe dependency updates
dev-sentinel deps:update --safe

# Generate documentation
dev-sentinel docs:generate --scope <scope>
```

### Kestra Workflows

Kestra flows orchestrate code health analysis and automation:

- **`code-health-on-demand`** - On-demand code health summary generation

### Integration

- **CodeRabbit** - Automated code review and PR analysis (configured via `.github/coderabbit.yaml`)
- **Vercel** - Deployment platform for the Next.js dashboard

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development servers
pnpm dev
```

### Development

```bash
# Run web dashboard
pnpm dev --filter=web

# Run CLI in dev mode
cd apps/cli && pnpm dev health:scan

# Build CLI
cd apps/cli && pnpm build
```

## Data Contracts

All data structures are defined in `packages/shared` using Zod schemas:

- **Signals** - Raw code health signals (complexity hotspots, outdated deps, PR stats)
- **Summary** - Narrative summary with highlights and warnings
- **Judge** - Health score, risk score, and priority fixes

## Environment Variables

### Web App

- `NEXT_PUBLIC_BASE_URL` - Base URL for the deployed application (set in Vercel)

### Kestra Integration

- `KESTRA_TRIGGER_URL` - Full URL to trigger Kestra execution
- `KESTRA_BASE_URL` - Base URL for Kestra API (alternative to full trigger URL)
- `KESTRA_API_KEY` - API key for Kestra authentication (optional)

## Deployment

The Next.js dashboard is designed to be deployed on **Vercel**. Set the `NEXT_PUBLIC_BASE_URL` environment variable to your production URL.

## License

Private project
