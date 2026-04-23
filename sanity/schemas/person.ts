import { defineField, defineType } from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / description',
      type: 'string',
      description: 'e.g. "Fashion designer & contributor"',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tone',
      title: 'Colour tone',
      type: 'string',
      description: 'Used for placeholder gradients when no portrait is uploaded.',
      options: {
        list: [
          { title: 'Red',    value: 'red'    },
          { title: 'Cool',   value: 'cool'   },
          { title: 'Violet', value: 'violet' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Green',  value: 'green'  },
          { title: 'Warm',   value: 'warm'   },
        ],
        layout: 'radio',
      },
      initialValue: 'warm',
    }),
    defineField({
      name: 'era',
      title: 'Era',
      type: 'string',
      description: 'e.g. "Windrush era", "1970–2000", "Today"',
    }),
    defineField({
      name: 'origin',
      title: 'Country / region of origin',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Website", "Instagram"' }),
          defineField({ name: 'url',   title: 'URL',   type: 'url' }),
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
})
