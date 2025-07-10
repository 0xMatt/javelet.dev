<div style="text-align: center">
  <h1>javelet.work</h1>
  <p>Personal website built using Next.js, TypeScript, Tailwind CSS and Prisma.</p>
</div>

<img width="1359" alt="image" src="https://i.imgur.com/1KYO6wR.png">

## Introduction

This is my personal website for writing articles, showcasing stats and playing with new technologies.

My focus for the initial release will be a SEO friendly, performance-optimized application that I can tack on new features to at my discretion.

This project has a MIT license and can be used by anyone. Information regarding the application and how to set it up yourself can be found in this readme.

## Technology Stack

This is a list of the various technologies used to build this website:

| Category   | Technology Name                     |
|------------|-------------------------------------|
| Framework  | [NextJS](https://nextjs.org/)       |
| Styling    | [Tailwind](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Content    | [MDX](https://mdxjs.com/)           |
| Deployment | [Vercel](https://vercel.com)        |

## Performance metrics

The goal is always a 100 in all lighthouse categories on mobile/desktop.

![performance](https://i.imgur.com/csuxOXW.png)

## Getting Started

### Prerequisites

- Git
- Node
- Prisma-compatible database

Clone the repository from github:

```bash
git clone git@github.com:0xMatt/javelet.dev.git

cd javelet.dev

cp .env.example .env
```

Once you completed the above, start populating the .env file.

`APP_URL=http://localhost:3000/`

Generate your `SESSION_SECRET` value with the output from `openssl rand -base64 32`

Set up your prisma compatible `DATABASE_URL` 

Now that you have the bare minimum setup, install packages, initialize your database and start the web server.

```bash
npm i 

npx prisma generate --no-engine

npx prisma migrate dev

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see application.

## Optional

You can setup stats for:

- WakaTime
- OpenWeather
- Github

By populating the rest of your .env file with the respective keys.

## Deployment

I suppose you can run the application anywhere after building it with `next build`, but
the easiest way to deploy is to do what I do and deploy to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
