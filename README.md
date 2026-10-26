# The Diabetes Garage

A responsive Vite + React rebuild of the public Diabetes Garage website. The site includes the workshop overview, a searchable resource directory, news, educational downloads, and the original public media assets.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://127.0.0.1:5173`). Build the static site with `npm run build`; the output is in `dist/`.

## Content

- `src/data/resources.json` contains the 103 public resource records from the October CMS theme's directory CSV seed.
- `src/data/news.js` contains the two news items present in the supplied June 2023 database backup.
- `public/media/` contains the public images, icons, and educational PDFs from the old site.

This is a static public site. It does not include October CMS's administrative backend. To update directory entries or news, edit the data files and redeploy. Workshop registration and provider referral continue to use their existing external QuestionPro forms.

Resource listings were migrated from a 2023 export and should be reviewed before public launch. The original PHP, database credentials, and backup files are not part of this repository.

The workshop durations and time windows are preserved from the archived site; confirm current schedules before promoting them. The gauge section was checked against linked ADA, CDC, and AHA guidance in October 2026. Individual health targets vary, so review this content with the program's clinical team when it changes.
