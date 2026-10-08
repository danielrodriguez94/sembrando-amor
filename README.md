# Sembrando con Amor a las Naciones — sitio web

## Archivos
- `index.html`: página principal.
- `styles.css`: diseño completo y responsivo.
- `script.js`: menú, idioma ES/EN, modal y flujo de donación.
- `functions/api/create-donation-session.js`: Cloudflare Pages Function que crea Stripe Checkout Sessions.
- `success.html`: página mostrada después de una donación exitosa.

## Antes de publicar
1. Cambia el correo de ejemplo `info@sembrandoconamoralasnaciones.org` por el correo oficial.
2. Revisa el nombre legal exacto de la organización para que coincida con documentos, banco y Stripe.
3. No publiques texto que diga “tax deductible” o “deducible de impuestos” hasta tener la determinación fiscal correspondiente.

## Stripe + Cloudflare Pages
En Cloudflare:
1. Abre tu proyecto.
2. Ve a **Settings → Variables and Secrets**.
3. Agrega `STRIPE_SECRET_KEY` como **Secret / Encrypt**.
4. Pega tu llave secreta de Stripe. No la pongas en `script.js` ni en GitHub.
5. Vuelve a desplegar el proyecto.

La Function usa:
- `mode=payment` para donación única.
- `mode=subscription` + intervalo mensual para donación recurrente.
- montos dinámicos en USD.
- metadata para registrar el programa elegido por el donante.

## Importante para producción
- Activa recibos por correo en Stripe si deseas que el donante reciba comprobantes automáticos.
- Añade una Política de Privacidad y Términos/Política de Donaciones antes del lanzamiento público.
- Si la fundación recibe su reconocimiento 501(c)(3) u otra determinación aplicable, actualiza la leyenda fiscal usando el lenguaje exacto de la carta de determinación y revisado por un profesional.
