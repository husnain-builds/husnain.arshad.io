# Next.js frontend (portfolio)

Pages:

- `/` (homepage with featured projects + skills + latest posts)
- `/projects` and `/projects/[slug]`
- `/blog` and `/blog/[slug]`
- `/contact` (form posts to `/api/contact`)

## Environment variables

Create `my-app/.env.local`:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token
```

`STRAPI_API_TOKEN` is only used server-side (in the Next API route).

If `STRAPI_URL` is missing, the homepage shows a “Connect Strapi” card instead of failing.

## Run

```bash
npm run dev
```

