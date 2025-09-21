# 666666666666777

Este repositorio contiene el proyecto Next.js en `keitel-trabajo-final-main`.

También se agregó una versión estática lista para publicar en `static-site/` (HTML/CSS/JS) para entregar la tarea fácilmente sin depender de Node.js.

Cómo publicar la versión estática en GitHub Pages:

1. Asegúrate de que la carpeta `static-site/` esté en el repo y comiteada.
2. En GitHub, ve a la configuración del repo → Pages.
3. En "Source" selecciona la rama `gh-pages` o `main` según prefieras. Si eliges `gh-pages`, usa los comandos abajo para crear la rama.

Comandos sencillos para crear una rama `gh-pages` con la versión estática y publicarla:

```bash
cd /workspaces/666666666666777
# Crear rama gh-pages y subir solo el contenido de static-site
git checkout --orphan gh-pages
git --work-tree=static-site add --all
git --work-tree=static-site commit -m "Publish static site"
git push origin gh-pages --force
git checkout main
```

Después de unos segundos GitHub Pages servirá la página en `https://<tu-usuario>.github.io/666666666666777/`.

Si prefieres desplegar la app completa en Vercel (recomendado para Next.js):

1. Ve a https://vercel.com y crea un proyecto nuevo.
2. Importa el repo `keimel1111111-tech/666666666666777`.
3. Establece "Root Directory" en `keitel-trabajo-final-main` y deja los comandos por defecto o usa `pnpm install` y `pnpm build`.
# 666666666666777