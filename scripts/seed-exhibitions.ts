/**
 * Seed the Sanity dataset with the hardcoded exhibition content.
 * Run with: npx tsx scripts/seed-exhibitions.ts
 * Requires SANITY_API_TOKEN with write access in .env.local
 */
import { createClient } from '@sanity/client'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const allOurStories = {
  _type: 'exhibition',
  _id: 'exhibition-all-our-stories',
  slug: { _type: 'slug', current: 'all-our-stories' },
  title: 'All Our Stories',
  lede: "Portraits, objects and oral histories from contributors across Britain — a flagship show of the museum's co-production approach.",
  status: 'Current',
  isFree: true,
  openingDate: '2026-03-07',
  closingDate: '2026-07-27',
  location: 'Lewisham Shopping Centre',
  accentColour: 'var(--mm-orange)',
  body: [
    {
      _type: 'block',
      _key: 'body-1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-1',
          text: 'All Our Stories foregrounds the first-person accounts of thirty people whose families have arrived in Britain over the last seven decades — from the Windrush generation to more recent arrivals from Ukraine, Hong Kong, Syria and beyond.',
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'body-2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-2',
          text: 'Each contributor has chosen an object that matters to them. The objects sit alongside portraits and audio interviews, forming a remixed archive that crosses decades, cultures and neighbourhoods.',
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'body-3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'span-3',
          text: 'Schools can book free group visits with curriculum-linked worksheets for KS3–KS5. Access tours run every Saturday at 2pm.',
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  accessInfo: [
    { _type: 'object', _key: 'access-1', label: 'Nearest station', value: 'Lewisham (DLR, National Rail)' },
    { _type: 'object', _key: 'access-2', label: 'Step-free', value: 'Fully accessible, lift to gallery' },
    { _type: 'object', _key: 'access-3', label: 'Toilets', value: 'Accessible, baby-changing' },
    { _type: 'object', _key: 'access-4', label: 'BSL tours', value: '2nd Sat of each month' },
    { _type: 'object', _key: 'access-5', label: 'Quiet hour', value: 'Wednesdays, 10–11am' },
  ],
  contributors: [
    { _type: 'object', _key: 'c-1',  name: 'Karen Arthur',     tone: 'red'    },
    { _type: 'object', _key: 'c-2',  name: 'Alok Mehta',       tone: 'violet' },
    { _type: 'object', _key: 'c-3',  name: 'Fatima Osman',     tone: 'green'  },
    { _type: 'object', _key: 'c-4',  name: 'Viktor Lazarenko', tone: 'cool'   },
    { _type: 'object', _key: 'c-5',  name: 'Mei Tan',          tone: 'yellow' },
    { _type: 'object', _key: 'c-6',  name: 'Joseph Adebayo',   tone: 'warm'   },
    { _type: 'object', _key: 'c-7',  name: 'Amira Haddad',     tone: 'violet' },
    { _type: 'object', _key: 'c-8',  name: 'Rosa López',       tone: 'red'    },
    { _type: 'object', _key: 'c-9',  name: 'Ishaan Patel',     tone: 'cool'   },
    { _type: 'object', _key: 'c-10', name: 'Priya Singh',      tone: 'green'  },
  ],
}

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌  SANITY_API_TOKEN is not set in .env.local')
    process.exit(1)
  }

  console.log('Seeding exhibition: All Our Stories…')
  const result = await client.createOrReplace(allOurStories)
  console.log(`✅  Created exhibition: ${result._id}`)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
