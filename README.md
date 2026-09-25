# Lúmina Lab — calculadora LED y batería

Aplicación estática bilingüe (español e inglés). Calcula una resistencia E24 para limitar la corriente al voltaje máximo del pack y estima la duración a tensión nominal con el porcentaje de capacidad aprovechable indicado por el usuario.

Incluye selector **ES / EN**. Cambia todos los textos y mensajes sin perder los valores introducidos y recuerda el idioma en el navegador.

## Abrir localmente

Abre `index.html` en un navegador moderno. No requiere instalación ni compilación. Las fuentes web son opcionales; hay una fuente alternativa local si no hay conexión.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub y sube **los tres archivos** `index.html`, `styles.css` y `app.js` a la raíz del repositorio.
2. En el repositorio abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
4. Espera a que GitHub muestre la URL: `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.

Los enlaces usan rutas relativas (`./`), por lo que funcionan bajo un subdirectorio de Pages. También puedes subir toda esta carpeta a la raíz de un repositorio nuevo.

## Modelo y límites

- En paralelo cada LED tiene una resistencia independiente: `R = (Vpack,máx − Vf) / Iobjetivo`. En serie hay una resistencia para la cadena: `R = (Vpack,máx − N·Vf) / Iobjetivo`. Se elige el E24 superior.
- A tensión nominal: `I = (Vpack,nom − Vf,cadena) / R`. En paralelo se multiplica por el número de ramas.
- Capacidad del pack: las celdas en serie suman tensión; en paralelo suman capacidad. `h ≈ capacidad_pack × porcentaje_aprovechable / corriente_total_nominal`. `días ≈ h / horas_de_uso_diarias`.
- El modelo supone conexión directa con resistencias y una tensión nominal constante. La corriente cambia durante la descarga, por lo que el resultado de autonomía es **orientativo**, no una garantía. No calcula pérdidas de conversión, corte por voltaje, fuga, regulación, temperatura ni la respuesta de capacidad ante descargas altas.
- Los voltajes y capacidades predefinidos son ejemplos genéricos editables. Verifica valores del fabricante, particularmente Vf, curva de descarga y capacidad a la carga elegida. Una pila botón con varios mA puede rendir mucho menos de lo estimado.
- Para baterías de litio, usa protección y carga apropiadas según la celda. No conectes celdas en paralelo de diferentes modelos, capacidades o niveles de carga.

Prueba rápida: dos LEDs rojos de Vf 1,8 V, 11 mA objetivo, en paralelo, y una LiPo de 3,7 V nominal / 4,2 V máxima: se recomiendan **220 Ω por LED**, con aproximadamente **17,27 mA** en total a tensión nominal.
