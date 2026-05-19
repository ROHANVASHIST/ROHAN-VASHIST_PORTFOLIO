# Portfolio Management Guide

This document explains how to update the content of the portfolio website. All content is stored as JSON files in the `src/data/` directory.

## Updating Content

### Profile Information
Edit `src/data/profile.json` to update:
- Name, Headline
- Bio
- Contact details
- Education

### Projects
Edit `src/data/projects.json` to update or add projects:
- Add a new object to the `projects` array.
- Required fields: `id`, `title`, `description`, `technologies` (array), `image` (path), `github`, `demo`, `featured`, `keyFeatures` (array), `learnings`, `status`.

### Skills
Edit `src/data/skills.json` to update skills:
- Add or modify categories and skills within categories.

## Adding Images

1. Place your images in the `public/images/` directory.
2. If it's a project image, place it in `public/images/projects/`.
3. Reference the image in the JSON files using the path starting from `/images/...`.

## Admin Access / Deployment

This is a static site. To push changes:
1. Make your changes in the JSON files.
2. Commit and push the changes to your main Git branch.
3. Your hosting provider (e.g., Vercel) will automatically redeploy the site.
