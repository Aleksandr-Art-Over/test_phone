import localFont from 'next/font/local'

export const ptSerif = localFont({
    src: [
        {
            path: './PTSerif-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './PTSerif-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './PTSerif-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: './PTSerif-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
    ],
    variable: '--font-pt-serif',
    display: 'swap',
})
