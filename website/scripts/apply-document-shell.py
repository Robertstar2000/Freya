from pathlib import Path
from lxml import html,etree
r=Path('.');home=html.document_fromstring((r/'index.html').read_text());sidebar=home.get_element_by_id('workspaceSidebar')
pages={'current-requirements.html':'Evidence','science-review.html':'Bioscience','validation.html':'Engineering','block-data.html':'Systems','requirement-evidence.html':'Evidence','rev09-source.html':'Evidence','review.html':'Evidence'}
for name,title in pages.items():
 screenkey='science' if title=='Bioscience' else title.lower()
 p=r/name;raw=p.read_text();doc=html.document_fromstring(raw);body=doc.find('body')
 if body is None:
  head=doc.find('head');body=etree.SubElement(doc,'body')
  for child in list(head):
   if child.tag not in ['meta','title','link','style','script']:head.remove(child);body.append(child)
 body.set('class','workspace-app')
 for el in body.xpath('./*[@id="workspaceSidebar" or @class="workspace-topbar"]'):body.remove(el)
 side=html.fromstring(etree.tostring(sidebar,encoding='unicode'))
 for a in side.xpath('.//a[@href]'):
  if a.get('href').startswith('#'):a.set('href','index.html'+a.get('href'))
  if a.get('data-screen-link') is not None and ('#screen-'+screenkey) in a.get('href'):
   a.set('class','active');a.set('aria-current','page')
 if name=='requirement-evidence.html':
  for a in side.xpath('.//*[@data-screen-link]'):a.attrib.pop('class',None);a.attrib.pop('aria-current',None)
  for group in side.xpath('.//*[@id="requirementsNav"]'):group.set('class','sidebar-group requirements-nav section-active')
  for a in side.xpath('.//*[@data-requirements-link]'):a.set('class','active');a.set('aria-current','page')
 body.insert(0,side)
 top=html.fragment_fromstring(f'<div class="workspace-topbar"><button id="sidebarToggle" aria-controls="workspaceSidebar" aria-expanded="false" aria-label="Table of contents">☰ Contents</button><span>FREYA / <b>{title}</b></span><a href="index.html#screen-{screenkey}">Return to workspace ↗</a></div>');body.insert(1,top)
 for m in body.findall('main'):m.set('id','workspaceMain')
 if not doc.xpath('.//link[@href="src/workspace.css"]'):etree.SubElement(doc.find('head'),'link',{'rel':'stylesheet','href':'src/workspace.css'})
 if not doc.xpath('.//script[@src="src/document-navigation.mjs"]'):
  etree.SubElement(body,'script',{'type':'module','src':'src/document-navigation.mjs'})
 p.write_text('\n'.join(line.rstrip() for line in ('<!doctype html>\n'+etree.tostring(doc,encoding='unicode',method='html')).splitlines())+'\n')
print('Applied shared sidebar to six supporting data / source pages')
