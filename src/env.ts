export const dev = process.env.NODE_ENV !== 'production';
export const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;