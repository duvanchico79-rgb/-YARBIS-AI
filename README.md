# YARBIS AI — prototipo 0.1

Aplicación web progresiva (PWA) instalable desde Chrome en Android.

## Estado
- Interfaz móvil futurista.
- Chat de demostración (todavía no conectado a un modelo de IA).
- Entrada de voz cuando el navegador la admite.
- Lectura de respuestas mediante síntesis de voz.
- Manifest, iconos y caché offline básica.

## Publicar en GitHub Pages
1. Crea un repositorio llamado `YARBIS-AI`.
2. Sube todos los archivos y carpetas de este proyecto a la raíz.
3. En GitHub abre Settings → Pages.
4. En Build and deployment selecciona `Deploy from a branch`, rama `main`, carpeta `/ (root)`, y guarda.
5. Espera a que GitHub Pages publique el sitio. Abre la URL en Chrome Android y usa el menú ⋮ → Instalar aplicación o Añadir a pantalla principal.

## Próximas tareas
- Conectar un backend seguro a un proveedor de IA (no poner claves secretas en el navegador).
- Añadir autenticación y almacenamiento de conversaciones con consentimiento.
- Evaluar empaquetado APK si se necesita distribución fuera de Chrome.

Este prototipo no accede al teléfono ni ejecuta acciones sin permiso del usuario.
