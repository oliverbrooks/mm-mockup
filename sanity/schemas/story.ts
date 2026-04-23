import { defineField, defineType } from 'sanity'

export const storyType = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'contributor', title: 'Contributor name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / description', type: 'string' }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: ['Oral history', 'Feature', 'Food story', 'Youth voices', 'Exhibition'],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'theme', title: 'Theme', type: 'string' }),
    defineField({ name: 'era', title: 'Era', type: 'string' }),
    defineField({ name: 'readingTime', title: 'Reading time', type: 'string' }),
    defineField({
      name: 'tone',
      title: 'Colour tone (placeholder)',
      type: 'string',
      options: { list: ['red', 'cool', 'violet', 'yellow', 'green', 'warm'] },
    }),
    defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 3 }),
    defineField({ name: 'pullQuote', title: 'Pull quote', type: 'text', rows: 2 }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'objectLabel',
      title: 'Object label',
      type: 'string',
    }),
    defineField({
      name: 'objectCaption',
      title: 'Object caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'objectImage',
      title: 'Object image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contributorImage',
      title: 'Contributor portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'bio', title: 'Contributor bio', type: 'text', rows: 3 }),
    defineField({ name: 'featured', title: 'Featured story', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'contributor', media: 'contributorImage' },
  },
})
