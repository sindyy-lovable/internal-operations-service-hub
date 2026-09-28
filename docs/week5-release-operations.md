# Week 5 Release and Operations

## Deployment

The Internal Operations Service Hub is deployed on Render as a Node web service.

Live URL:

https://internal-operations-service-hub-oqzr.onrender.com

The production database is a Render PostgreSQL instance in the Frankfurt (EU Central) region.

## Build and Start

Build command:

```bash
npm ci && npm run build