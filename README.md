<div style="text-align: center">
  <h1>javelet.work</h1>
  <p>Personal website built using Next.js, TypeScript, Tailwind CSS and Prisma.</p>
</div>

<img width="1359" alt="image" src="https://i.imgur.com/1KYO6wR.png">

## Technology Stack

This is a list of the various technologies used to build this website:

| Category   | Technology Name                     |
|------------|-------------------------------------|
| Framework  | [NextJS](https://nextjs.org/)       |
| Styling    | [Tailwind](https://tailwindcss.com) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Content    | [MDX](https://mdxjs.com/)           |
| Deployment | [Vercel](https://vercel.com)        |

## Getting Started

### Prerequisites

- Git
- Node
- Postgres
- OpenSSL

Clone the repository from github:

```bash
git clone git@github.com:0xMatt/javelet.dev.git

cd javelet.dev

cp .env.example .env
```

Once you have cloned the repository and copied the env file, you can start populating the .env file.

`APP_URL=http://localhost:3000/`

Generate your `SESSION_SECRET` value with the output from `openssl rand -base64 32`

Set up your `DATABASE_URL` with your postgres url.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Optional

You can setup stats for:

- WakaTime
- OpenWeather
- Github

By populating the rest of your .env file with the respective keys.

## Deploy on Vercel

The easiest way to deploy is to do what I do and deploy to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
