
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract the slider
slider_pattern = r'  <!-- ==========================================================================\n       1\.5 CARRUSEL AUTOMÁTICO DE DESTAQUES\n       ========================================================================== -->\n  <section id=\"carrusel-home\" class=\"home-slider-section\">.*?</section>'
slider_match = re.search(slider_pattern, html, flags=re.DOTALL)

if not slider_match:
    print('Slider not found!')
else:
    slider_html = slider_match.group(0)
    html_without_slider = html[:slider_match.start()] + html[slider_match.end():]
    
    hero_pattern = r'  <!-- ==========================================================================\n       1\. HERO / PORTADA\n       ========================================================================== -->\n  <section id=\"inicio\" class=\"hero-section\">'
    hero_match = re.search(hero_pattern, html_without_slider, flags=re.DOTALL)
    
    if not hero_match:
        print('Hero not found!')
    else:
        new_html = html_without_slider[:hero_match.start()] + slider_html + '\n\n' + html_without_slider[hero_match.start():]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print('Success!')

