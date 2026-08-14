import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function gdriveFolderPlugin(): Plugin {
  return {
    name: 'gdrive-folder-parser',
    configureServer(server) {
      server.middlewares.use('/api/gdrive-folder', async (req, res) => {
        try {
          const host = req.headers.host || 'localhost:5173';
          const reqUrl = new URL(req.url || '', `http://${host}`);
          const folderIdParam = reqUrl.searchParams.get('id') || '';

          const folderIdMatch = folderIdParam.match(/(?:folders\/|id=|^)([a-zA-Z0-9_-]{25,})/);
          if (!folderIdMatch) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid Google Drive folder ID or link' }));
            return;
          }

          const folderId = folderIdMatch[1];
          const gdriveRes = await fetch(`https://drive.google.com/embeddedfolderview?id=${folderId}#grid`);
          const html = await gdriveRes.text();

          const fileIdMatches = [...html.matchAll(/\/file\/d\/([a-zA-Z0-9_-]{25,})/g)].map(m => m[1]);
          const stringIdMatches = [...html.matchAll(/["']([a-zA-Z0-9_-]{33})["']/g)].map(m => m[1]);

          const allIds = new Set([...fileIdMatches, ...stringIdMatches]);
          const imageIds = Array.from(allIds).filter(id => id !== folderId && !id.includes('google') && !id.includes('drive'));

          const imageUrls = imageIds.map(id => `https://lh3.googleusercontent.com/d/${id}`);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: imageUrls.length, urls: imageUrls }));
        } catch (err: any) {
          console.error('GDrive proxy plugin error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Failed to fetch folder' }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), gdriveFolderPlugin()],
});
