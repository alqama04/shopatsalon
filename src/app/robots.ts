import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
          
            disallow: ['/admin-dashboard',
                '/admin-dashboard/levels',
                '/admin-dashboard/reward',
                '/admin-dashboard/purchases',
                '/admin-dashboard/purchases/add-purchase-record',
                '/admin-dashboard/orders',
                '/admin-dashboard/customers'
            ],
        },
        sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
    }
}