---
id: 24
title: "Burrow Blog"
description: "Astro archive synced from Notion"
pubDate: 2026-04-09T22:53:00.000Z
updatedDate: 2026-04-09T23:38:00.000Z
techStack: ["Typescript", "React", "Astro", "TailwindCSS", "shadcn"]
pinned: true
---


**Burrow Blog** is a high-performance, automated digital archive and project showcase. It serves as a continuous record of growth, capturing the evolution of thoughts and technical processes through a seamless, hands-off workflow where content is managed in **Notion** and automatically synchronized to an **Astro** static site via **GitHub Actions**.


## 🔄 The Automated Workflow


The heart of Burrow is its fully automated pipeline that bridges the gap between structured writing in Notion and a high-performance static web experience.

1. **Write & Archive**: Manage your learning journey and project records in a structured Notion database. Use [Blog DB Template](https://www.notion.so/Blog-DB-Template-33d5927db75a8026b606d36540860565) to get started.
2. **Status-Based Trigger**: Simply set a post's status to `Ready` in Notion to initiate the sync.
3. **Automated Sync**: A **GitHub Action** triggers the sync service to:
    - Convert Notion blocks to localized Markdown files.
    - Download and optimize images to the assets folder for permanence.
    - Update the Notion status to `Updated` automatically upon success.
4. **Instant Deployment**: The blog is rebuilt and deployed to **GitHub Pages** without any manual intervention.

## 🏗️ Project Architecture


Burrow is a decoupled system consisting of two specialized repositories designed to work in harmony.


### 🕳️ [astro-burrow](https://github.com/kimcatchy/astro-burrow)


The frontend static site generator focused on clarity and speed.

- **Framework**: Astro 6.x utilizing the latest Content Layer for optimal performance.
- **Design System**: A dense, distraction-free UI built with **Tailwind CSS v4** and **shadcn/ui**.
- **Key Features**: Advanced fuzzy search (Fuse.js), automated Table of Contents, and optimized content rendering.

### 🔌 [notion-to-blog](https://github.com/kimcatchy/notion-to-blog)


The intelligent bridge that manages the lifecycle of your content.

- **Status State-Machine**: Sophisticated workflow management supporting the entire lifecycle (`Writing` → `Ready` → `Updated` → `ToBeDeleted`).
- **Image Localization**: Prevents link expiration by automatically downloading and archiving images locally.
- **Stable File Management**: Uses Notion's `Unique ID` to track posts consistently, even if titles or slugs change.

## 🚀 Quick Start (Cloud & Automation)


The system is designed to run entirely on **GitHub Actions** and **GitHub Pages**. Follow these steps to set up the automated pipeline:


### 1. Configure Repository Secrets


In your GitHub repository settings, add the following **Secrets** (`Settings > Secrets and variables > Actions > Secrets`):

- `NOTION_API_KEY`: Your Notion Internal Integration Secret.
- `GITTOKEN`: A GitHub Personal Access Token (PAT) with `repo` permissions to allow the sync service to push changes.

### 2. Configure Repository Variables


Add the following **Variables** (`Settings > Secrets and variables > Actions > Variables`):

- `NOTION_BLOG_DB_ID`: The ID of your Notion Blog database.
- `NOTION_PROJECTS_DB_ID`: The ID of your Notion Projects database.
- `BLOG_REPO`: Your repository name (e.g., `kimcatchy/kimcatchy.github.io`).

### 3. Enable GitHub Pages

1. Go to **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.

### 4. Trigger Your First Sync

1. Go to the **Actions** tab in your repository.
2. Select the **Sync Notion to Blog** workflow.
3. Click **Run workflow**. This will fetch content from Notion and trigger the subsequent deployment.

## 📄 License


This project is licensed under the [MIT License](https://github.com/kimcatchy/kimcatchy.github.io/blob/main/LICENSE).

