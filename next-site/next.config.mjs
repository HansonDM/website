const pages=process.env.DEPLOY_TARGET==='github-pages';
/** @type {import('next').NextConfig} */
export default {output:pages?'export':undefined,trailingSlash:pages,images:{unoptimized:pages},poweredByHeader:false,turbopack:{root:process.cwd()}};
