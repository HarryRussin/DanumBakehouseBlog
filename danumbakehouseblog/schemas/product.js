export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
            description: "explain the product in as much depth as possible"
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'mainImage',
            title: 'Image',
            type: 'image'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'category' } }],
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'stock',
            title: 'Maximum purchase ammount',
            type: 'number'
        }
    ],
}
