# Vientre Divino

Landing page oficial del retiro Vientre Divino, diseñado para una experiencia
emocional, elegante y orientada a conversión.

## Resumen

Este proyecto presenta una experiencia web bilingue (ES/EN) para promocionar un
retiro femenino en Mount Shasta. Incluye narrativa de marca, secciones de valor,
itinerario, inversion, FAQ y llamadas a la accion conectadas a WhatsApp.

## Objetivos del Sitio

- Comunicar con claridad la propuesta del retiro.
- Guiar a la usuaria desde interes hasta contacto directo.
- Mantener una experiencia visual premium en movil y escritorio.
- Sostener coherencia de marca en espanol e ingles.

## Stack Tecnico

- HTML5 semantico
- CSS3 (variables, grid, flex, responsive)
- JavaScript vanilla
- AOS (Animate On Scroll) via CDN

## Caracteristicas Clave

- Version completa en espanol: [index.html](index.html)
- Version completa en ingles: [index-en.html](index-en.html)
- Navegacion adaptativa (menu movil y desktop)
- Secciones interactivas: tabs de itinerario y acordeon FAQ
- Animaciones suaves y optimizadas con AOS
- Botones de conversion con mensaje prellenado a WhatsApp
- Mejoras anti-desbordamiento horizontal en todo el layout

## Estructura del Proyecto

```text
vientre_divino/
|- index.html
|- index-en.html
|- README.md
|- img/
```

## Ejecutar en Local

Opcion directa:

```bash
start index.html
```

Opcion con servidor local:

```bash
python -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

## Guia de Edicion Rapida

- Contenido principal: editar secciones HTML en [index.html](index.html) y
	[index-en.html](index-en.html).
- Estilos: variables y componentes al inicio del bloque style de cada archivo.
- Contacto WhatsApp: buscar `wa.me/14086502198` y actualizar enlaces.
- Imagenes: reemplazar archivos dentro de `img/` manteniendo nombres o
	actualizando rutas.

## Calidad y Responsividad

El proyecto fue ajustado para evitar scroll lateral no deseado y mantener
compatibilidad en resoluciones pequenas. Se aplican reglas de contencion para
media, contenedores, grids y textos largos.

## Despliegue

Repositorio remoto:

- https://github.com/MaickR/vientre_divino.git

Flujo basico:

```bash
git add .
git commit -m "tu mensaje"
git push origin main
```

## Licencia

Uso privado/proyecto propietario salvo indicacion contraria del autor.
