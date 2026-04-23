import { defineField, defineType } from 'sanity'

export const exhibitionType = defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'lede', title: 'Lede', type: 'text', rows: 3 }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['Current', 'Upcoming', 'Past'], layout: 'radio' } }),
    defineField({ name: 'openingDate', title: 'Opening date', type: 'date' }),
    defineField({ name: 'closingDate', title: 'Closing date', type: 'date' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'ticketUrl', title: 'Ticket / booking URL', type: 'url' }),
    defineField({ name: 'isFree', title: 'Free admission', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
})
