import json,sys,math,textwrap,html
from pathlib import Path
from reportlab.pdfgen.canvas import Canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
D=json.loads(Path(sys.argv[1]).read_text());out=Path(sys.argv[2]);out.mkdir(parents=True,exist_ok=True)
W,H=1440,1080
fonts=Path('/usr/share/fonts/truetype/dejavu')
if fonts.exists():
 pdfmetrics.registerFont(TTFont('F',str(fonts/'DejaVuSans.ttf')))
 pdfmetrics.registerFont(TTFont('FB',str(fonts/'DejaVuSans-Bold.ttf')))
else: raise RuntimeError('Expected DejaVu fonts for vector diagrams')
colors={'signal':'#247e9c','command':'#996125','power':'#a4435a','sample':'#55785a'}
combined=Canvas(str(out/'freya-architecture-eight-pages.pdf'),pagesize=(W,H))
for page,d in enumerate(D,1):
 svg=[];pdf=Canvas(str(out/(d['id']+'.pdf')),pagesize=(W,H));canvases=[pdf,combined]
 def col(c,h):c.setFillColor(h)
 def rect(x,y,w,h,fill,stroke=None,r=0):
  svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke or "none"}"/>')
  for c in canvases:
   c.setFillColor(fill);c.setStrokeColor(stroke or fill);c.roundRect(x,H-y-h,w,h,r,stroke=int(bool(stroke)),fill=1)
 def text(x,y,s,size=16,color='#183447',bold=False):
  svg.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{700 if bold else 400}" fill="{color}">{html.escape(str(s))}</text>')
  for c in canvases:c.setFillColor(color);c.setFont('FB' if bold else 'F',size);c.drawString(x,H-y,str(s))
 def line(points,color,width=2,dashed=False,arrow=False):
  svg.append('<polyline points="'+' '.join(f'{x},{y}' for x,y in points)+f'" fill="none" stroke="{color}" stroke-width="{width}"'+(' stroke-dasharray="6 4"' if dashed else '')+'/>')
  for c in canvases:
   c.setStrokeColor(color);c.setLineWidth(width);c.setDash([6,4] if dashed else []);p=c.beginPath();p.moveTo(points[0][0],H-points[0][1]);
   for x,y in points[1:]:p.lineTo(x,H-y)
   c.drawPath(p);c.setDash([])
  if arrow:
   (px,py),(x,y)=points[-2:];a=math.atan2(y-py,x-px);side=8
   pts=[(x,y),(x-side*math.cos(a-.45),y-side*math.sin(a-.45)),(x-side*math.cos(a+.45),y-side*math.sin(a+.45))]
   svg.append('<polygon points="'+' '.join(f'{xx},{yy}' for xx,yy in pts)+f'" fill="{color}"/>')
   for c in canvases:
    c.setFillColor(color);p=c.beginPath();p.moveTo(pts[0][0],H-pts[0][1]);
    for xx,yy in pts[1:]:p.lineTo(xx,H-yy)
    p.close();c.drawPath(p,fill=1,stroke=0)
 rect(0,0,W,H,'#f4f3ed');rect(0,0,W,190,'#102a3c');rect(48,35,7,112,'#6bd4ba')
 text(76,52,'FREYA   /   SYSTEMS ARCHITECTURE',15,'#9dc0cb',True)
 text(76,104,d['vehicle'].upper()+' / '+d['kind'].upper(),38,'#ffffff',True)
 text(76,142,d['subtitle'],17,'#d0e0e4')
 text(1180,52,f'{page:02d} / 08',20,'#84dfc7',True)
 text(76,174,d['tag']+'   •   PROPOSED FUNCTIONAL ARCHITECTURE',12,'#a7c9cf')
 text(48,221,'CONNECTION KEY',11,'#57717a',True)
 for i,(k,label) in enumerate([('signal','DATA / OBSERVATIONS'),('command','COMMAND / INHIBIT'),('power','POWER / GAS SUPPLY'),('sample','MATERIAL / MECHANICAL')]):
  x=220+i*288;line([(x,217),(x+26,217)],colors[k],3,k=='command',True);text(x+36,221,label,10,colors[k],True)
 xs=[48,516,984];ys=[285,469,653];bw,bh=408,153
 for i,title in enumerate(d['lanes']):text(xs[i],262,title,13,'#547077',True)
 # Node connections are schematic associations; arrowheads indicate primary flow.
 for a,b,k in d['edges']:
  ax,ay=xs[a%3],ys[a//3];bx,by=xs[b%3],ys[b//3]
  if ay==by:
   if bx>ax:pts=[(ax+bw,ay+76),(bx,by+76)]
   else:pts=[(ax,ay+76),(bx+bw,by+76)]
  elif ax==bx and abs(by-ay)>200:
   pts=[(ax,ay+76),(ax-18,ay+76),(bx-18,by+76),(bx,by+76)]
  elif ax==bx:
   pts=[(ax+bw/2,ay+(bh if by>ay else 0)),(bx+bw/2,by+(0 if by>ay else bh))]
  else:
   # Route through the whitespace between rows, avoiding node interiors.
   if by>ay:pts=[(ax+bw/2,ay+bh),(ax+bw/2,ay+bh+16),(bx+bw/2,ay+bh+16),(bx+bw/2,by)]
   else:pts=[(ax+bw/2,ay),(ax+bw/2,ay-16),(bx+bw/2,ay-16),(bx+bw/2,by+bh)]
  line(pts,colors[k],2,k=='command',True)
 for i,node in enumerate(d['nodes']):
  blockid=d['id']+'-'+str(i+1).zfill(2)
  url='https://freya-revision-4.mifecoinc.chatgpt.site/#block-'+blockid
  svg.append('<a id="block-'+blockid+'" href="'+url+'" target="_top" data-block="'+blockid+'" aria-label="Open data for '+html.escape(node['title'])+'">')
  x,y=xs[i%3],ys[i//3];rect(x,y,bw,bh,'#ffffff','#cad7d6',9);rect(x,y,5,bh,['#398f91','#547c9f','#8c7654'][i%3],r=0)
  text(x+20,y+26,f'{i+1:02d}',11,'#618184',True);text(x+56,y+28,node['title'],17,'#163448',True)
  lines=[]
  for s in node['lines']:lines.extend(textwrap.wrap(s,width=44,break_long_words=False))
  if len(lines)>5:raise ValueError((d['id'],node['title'],lines))
  for j,s in enumerate(lines):text(x+22,y+58+j*19,s,14,'#4b626e')
  svg.append('</a>')
  for c in canvases:c.linkURL(url,(x,H-y-bh,x+bw,H-y),relative=0,thickness=0)
 for i,(title,key) in enumerate([('INTERFACE CONTRACT','contract'),('LIFECYCLE / RESPONSIBILITY','sequence'),('BASIS / OPEN VERIFICATION','limits')]):
  x=xs[i];rect(x,847,bw,140,['#e0eeea','#e3eaf1','#f0e7d7'][i],r=8);text(x+18,873,title,12,'#365664',True)
  for j,s in enumerate(d[key]):
   parts=textwrap.wrap(s,width=47,break_long_words=False)
   if len(parts)>1 and j<2:raise ValueError(('footer too long',s))
   text(x+18,900+j*24,s,12,'#344f5c')
 text(48,1025,'Concept block diagram • not a wiring diagram, flight schematic, qualified BOM or approved firmware design.',12,'#5e7177')
 text(48,1051,'Sources: FDS-001 Rev09 • current model + integration register • Benner/BIO requirements where applicable.',11,'#6b7c80')
 text(1248,1051,'18 NOV 2026',11,'#6b7c80')
 (out/(d['id']+'.svg')).write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1080" viewBox="0 0 1440 1080" role="img" aria-label="'+html.escape(d['vehicle']+' '+d['kind']+' block diagram')+'"><title>'+html.escape(d['vehicle']+' / '+d['kind'])+'</title><g font-family="DejaVu Sans,Arial,sans-serif">'+''.join(svg)+'</g></svg>')
 pagehtml=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FREYA — {d['vehicle']} {d['kind']}</title><style>body{{margin:0;background:#dce4e5;font:15px system-ui}}nav{{padding:16px;background:#102a3c;color:white;display:flex;gap:24px;flex-wrap:wrap}}a{{color:#8ae2cb}}img,object{{width:100%;height:auto;display:block;max-width:1440px;aspect-ratio:4/3;margin:auto}}@page{{size:A3 landscape;margin:0}}@media print{{nav{{display:none}}body{{background:white}}img,object{{width:100%;height:100vh;object-fit:contain}}}}</style></head><body><nav><a href="../../index.html#systems">← Systems library</a><a href="{d['id']}.svg" download>Download SVG</a><a href="{d['id']}.pdf">One-page PDF</a></nav><object data="{d['id']}.svg" type="image/svg+xml" aria-label="{d['vehicle']} {d['kind']} interactive block diagram"><a href="{d['id']}.svg">Open interactive SVG</a></object></body></html>'''
 (out/(d['id']+'.html')).write_text(pagehtml)
 pdf.showPage();pdf.save();combined.showPage()
combined.save()
print('Rendered 8 SVG infographics, 8 one-page PDFs and combined 8-page PDF')
