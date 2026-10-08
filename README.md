# Sembrando con Amor a las Naciones — sitio multipágina

## Estructura
Este proyecto ya NO es una sola página. Cada apartado principal tiene su propio archivo HTML:

- `index.html` — Inicio
- `nosotros.html` — Nosotros
- `mision-vision.html` — Misión y Visión
- `programas.html` — Programas
- `academias.html` — Academias y Talleres
- `impacto.html` — Impacto y modelo de intervención
- `transparencia.html` — Transparencia
- `donar.html` — Donaciones
- `contacto.html` — Contacto
- `privacidad.html` — Política base de privacidad
- `politica-donaciones.html` — Política base de donaciones
- `success.html` — Confirmación posterior al pago
- `styles.css` — Diseño compartido por todo el sitio
- `script.js` — Menú, animaciones y formulario de donación

## Stripe + Cloudflare Pages
`functions/api/create-donation-session.js` crea la sesión de Stripe Checkout.
`functions/api/verify-donation-session.js` verifica la sesión antes de mostrarla como confirmada.

En Cloudflare Pages agrega `STRIPE_SECRET_KEY` como **Secret** en Settings → Variables and Secrets. Nunca pongas la llave secreta en HTML, JavaScript público o GitHub.

## Antes de publicar
1. Agrega los canales oficiales de contacto de la fundación en `contacto.html`.
2. Revisa nombre legal y datos institucionales.
3. Revisa con asesoría profesional las políticas de privacidad/donaciones antes de usarlas como texto legal definitivo.
4. No prometas deducibilidad fiscal mientras el estatus legal/fiscal vigente no permita expresarlo.
5. Configura los recibos, branding y datos comerciales dentro de Stripe.
