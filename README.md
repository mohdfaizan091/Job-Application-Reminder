# Job Application Reminder System

A backend system that automatically tracks job applications and sends reminders based on time and state — **without requiring user actions**.

This project focuses on **background jobs, time-based automation, idempotency, and clean backend architecture**, not just CRUD APIs.

---

## Problem Statement

Job seekers apply to many companies and often forget to follow up.
Manually tracking application dates and reminders does not scale.

This system:
- stores job applications
- continuously evaluates them in the background
- triggers reminders after configurable time intervals
- ensures reminders are sent **exactly once**


## Core Concepts Demonstrated

- Background jobs (no HTTP trigger)
- Time-based rule evaluation
- State-driven workflows
- Idempotent execution using action logs
- User-specific reminder preferences
- Separation of concerns (rules, jobs, services)


## High-Level Architecture

- **API Layer**
  - Create and list job applications
- **Database (MongoDB)**
  - Stores applications, actions, and user preferences
- **Background Worker**
  - Runs on a fixed interval
  - Evaluates rules against stored data
- **Notification Service**
  - Handles delivery (console-based for now)

The background worker starts with the server and runs independently of user requests.


## How the System Works (Timeline Example)

**Day 0**
- User creates a job application
- Status = `APPLIED`
- `appliedAt` timestamp is stored

**Day 3**
- Background job runs
- Checks user preferences
- FIRST-REMINDER rule matches
- Reminder is triggered
- Action is logged (`FIRST_REMINDER_SENT`)

**Day 10**
- SECOND_REMINDER is disabled by user preference
- No reminder is sent

The system remains safe on restarts and does not repeat reminders.


## Idempotency Strategy

Instead of boolean flags, the system stores an **action log**:

```json
actions: [
  {
    "type": "FIRST_REMINDER_SENT",
    "executedAt": "2026-01-29T14:39:50.557Z"
  }
]
