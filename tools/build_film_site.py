#!/usr/bin/env python3
"""Build six static film pages and public, consistent farm information. No dependencies."""
from pathlib import Path
from html.parser import HTMLParser
import json, html, re
ROOT=Path(__file__).resolve().parents[1]
SRC=ROOT/'src/film';OUT=ROOT/'site'
FACTS=json.loads((SRC/'facts.json').read_text())
TRANS=json.loads((SRC/'film-translations.json').read_text())
BASE=(SRC/'base.html').read_text()
EXTRA=(SRC/'extra.css').read_text()
ORIGIN='https://byeolfarm.com'
LANGS=[('ko','ko','한국어','/'),('en','en','English','/en'),('zh','zh-Hans','中文','/zh'),('vi','vi','Tiếng Việt','/vi'),('th','th','ไทย','/th'),('ru','ru','Русский','/ru')]
TITLES={
'ko':'하늘의별딸기 | 화성 딸기체험 · 가족의 하루',
'en':'하늘의별딸기 | Family Strawberry Picking in Hwaseong',
'zh':'하늘의별딸기 | 华城亲子草莓采摘体验',
'vi':'하늘의별딸기 | Hái dâu cùng gia đình ở Hwaseong',
'th':'하늘의별딸기 | เก็บสตรอว์เบอร์รีกับครอบครัวที่ฮวาซอง',
'ru':'하늘의별딸기 | Семейный сбор клубники в Хвасоне'}
DESCRIPTIONS={
'ko':'경기도 화성시 만세구 팔탄면의 하늘의별딸기. 가족과 함께하는 설향 딸기 수확 체험, 1인 19,000원·500g 팩 포함. 운영시간, 주차, 주소와 네이버 예약을 확인하세요.',
'en':'Visit 하늘의별딸기 in Paltan-myeon, Hwaseong for family Seolhyang strawberry picking. KRW 19,000 per person including a 500 g pack. Find hours, directions, visitor guidance and Naver booking.',
'zh':'하늘의별딸기 位于京畿道华城市八滩面，提供亲子雪香草莓采摘体验。每人19,000韩元，含500克专用盒。查看营业时间、地址、停车须知和Naver预约。',
'vi':'Trải nghiệm hái dâu Seolhyang cùng gia đình tại 하늘의별딸기, Paltan-myeon, Hwaseong. 19.000 won/người, gồm hộp 500 g. Xem giờ mở cửa, địa chỉ và đặt chỗ qua Naver.',
'th':'เก็บสตรอว์เบอร์รีซอลฮยังกับครอบครัวที่ 하늘의별딸기 พัลทันมยอน ฮวาซอง ราคา 19,000 วอนต่อคน รวมกล่อง 500 กรัม ดูเวลาเปิด ที่อยู่ ที่จอดรถ และจองผ่าน Naver',
'ru':'Семейный сбор клубники Сольхян на ферме 하늘의별딸기 в Пальтхан-мёне, Хвасон. 19 000 вон с человека, включая контейнер на 500 г. Часы работы, адрес, парковка и бронирование в Naver.'}
LOCALES={'ko':'ko_KR','en':'en_US','zh':'zh_CN','vi':'vi_VN','th':'th_TH','ru':'ru_RU'}

def esc(x):return html.escape(str(x),quote=True)
def dump(x):return json.dumps(x,ensure_ascii=False,separators=(',',':')).replace('</',r'<\/')
def trans(text,lang):return TRANS.get(text,{}).get(lang,text)

class Localize(HTMLParser):
 def __init__(self,lang):super().__init__(convert_charrefs=False);self.lang=lang;self.out=[];self.raw=None;self.missing=set()
 def handle_starttag(self,tag,attrs):
  if tag in ['script','style']:self.raw=tag
  parts=[]
  for k,v in attrs:
   if v is not None and k in ['alt','aria-label','title']:v=trans(v,self.lang)
   parts.append(k if v is None else k+'="'+esc(v)+'"')
  self.out.append('<'+tag+(' '+' '.join(parts) if parts else '')+'>')
 def handle_startendtag(self,tag,attrs):self.handle_starttag(tag,attrs);self.out[-1]=self.out[-1][:-1]+'/>'
 def handle_endtag(self,tag):self.out.append('</'+tag+'>');self.raw=None if self.raw==tag else self.raw
 def handle_data(self,data):
  if self.raw:self.out.append(data);return
  key=data.strip();value=trans(key,self.lang)
  if self.lang!='ko' and re.search('[가-힣]',key) and key not in TRANS and key:self.missing.add(key)
  self.out.append(data if value==key else data[:len(data)-len(data.lstrip())]+esc(value)+data[len(data.rstrip()):])
 def handle_entityref(self,name):self.out.append('&'+name+';')
 def handle_charref(self,name):self.out.append('&#'+name+';')
 def handle_comment(self,data):self.out.append('<!--'+data+'-->')
 def handle_decl(self,decl):self.out.append('<!'+decl+'>')

def picture(name,alt):
 return f'<img src="assets/photos/{name}-1200.webp" srcset="assets/photos/{name}-640.webp 640w, assets/photos/{name}-1200.webp 1200w, assets/photos/{name}-1920.webp 1920w" sizes="(max-width:600px) 90vw, 36vw" width="1200" height="800" loading="lazy" decoding="async" alt="{esc(alt)}">'

def language_links(code):
 return ''.join(f'<a href="{path}" lang="{lang}" hreflang="{lang}"'+(' aria-current="page"' if c==code else '')+f'>{label}</a>' for c,lang,label,path in LANGS)

def extra_sections(d):
 options=''
 for s in d['scenes'][1:]:
  options+=f'<article><h3>{esc(" ".join(s["title"]))}</h3><p>{esc(s["description"])}</p><ul class="option-facts">'+''.join(f'<li><strong>{esc(a)}</strong><span>{esc(b)}</span></li>' for a,b in s['facts'])+f'</ul><p class="option-note">{esc(s["note"])}</p></article>'
 notes=''.join(f'<li><h3>{esc(v["title"])}</h3><p>{esc(v["body"])}</p></li>' for v in d['visitItems'])
 faq=''.join(f'<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>' for q,a in d['faqs'])
 return f'''<div class="visit-extensions" id="experience">
 <h2 class="supplement-heading">{esc(d['extraTitle'])}</h2>
 <div class="experiences-extra"><figure class="option-photo">{picture('photo-05',d['scenes'][1]['alt'])}</figure><div class="option-copy">{options}</div></div>
 <section class="location-block" id="directions" aria-labelledby="directions-title"><div><h2 id="directions-title">{esc(d['addressLabel'])}</h2><address>{esc(FACTS['address'])}</address><p class="landlot">{esc(FACTS['landLotAddress'])} · {FACTS['postalCode']}</p><div class="location-actions"><a href="{FACTS['mapUrl']}" target="_blank" rel="noopener noreferrer">{esc(d['map'])}<span aria-hidden="true">↗</span></a><a href="tel:{FACTS['telephone']}">{esc(d['phone'])}<span aria-hidden="true">↗</span></a></div><p class="visit-contact"><a href="tel:{FACTS['telephone']}">{FACTS['telephoneDisplay']}</a><a href="mailto:{FACTS['email']}">{FACTS['email']}</a></p></div><ul class="visit-notes">{notes}</ul></section>
 <section class="faq-section" id="faq" aria-labelledby="faq-title"><div><h2 id="faq-title">{esc(d['faqTitle'])}</h2><a class="reserve" href="{FACTS['bookingUrl']}" target="_blank" rel="noopener noreferrer" data-booking>{esc(d['book'])}</a></div><div>{faq}</div></section></div>'''

def graph(code,lang,url,d):
 farm={'@type':'LocalBusiness','@id':ORIGIN+'/#localbusiness','name':FACTS['name'],'url':ORIGIN+'/','image':ORIGIN+'/assets/photos/photo-02-1200.webp','description':DESCRIPTIONS[code],'telephone':FACTS['telephone'],'email':FACTS['email'],'priceRange':'₩19,000','address':{'@type':'PostalAddress','addressCountry':'KR','addressRegion':'경기도','addressLocality':'화성시 만세구','streetAddress':'팔탄면 노하길116번길 177-26','postalCode':FACTS['postalCode']},'areaServed':['경기도 화성시','화성시 팔탄면'],'openingHoursSpecification':[{'@type':'OpeningHoursSpecification','dayOfWeek':['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],'opens':'10:00','closes':'16:00'}],'sameAs':[FACTS['instagram'],FACTS['mapUrl']],'makesOffer':{'@type':'Offer','name':'설향 딸기 수확 체험','price':'19000','priceCurrency':'KRW','description':'1인 500g 전용 팩 포함. 월요일 기본 휴무, 공휴일 월요일 정상 영업. 실제 운영일과 예약 가능 시간은 네이버에서 확인해 주세요.','url':FACTS['bookingUrl']}}
 return {'@context':'https://schema.org','@graph':[farm,{'@type':'WebSite','@id':ORIGIN+'/#website','url':ORIGIN+'/','name':FACTS['name'],'inLanguage':[l for _,l,_,_ in LANGS]}, {'@type':'WebPage','@id':url+'#webpage','url':url,'name':TITLES[code],'description':DESCRIPTIONS[code],'inLanguage':lang,'isPartOf':{'@id':ORIGIN+'/#website'},'about':{'@id':ORIGIN+'/#localbusiness'},'dateModified':FACTS['updated']},{'@type':'FAQPage','@id':url+'#faq','inLanguage':lang,'mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in d['faqs']]},{'@type':'BreadcrumbList','@id':url+'#breadcrumb','itemListElement':[{'@type':'ListItem','position':1,'name':FACTS['name'],'item':url}]}]}

style=re.search(r'<style>(.*?)</style>',BASE,re.S).group(1)
body=re.search(r'<body>(.*?)</body>',BASE,re.S).group(1)
missing={}
for code,lang,label,path in LANGS:
 d=json.loads((SRC/f'content/{code}.json').read_text());url=ORIGIN+path
 p=Localize(code);p.feed(body);localized=''.join(p.out);missing[code]=sorted(p.missing)
 # Existing language-specific content remains static and never gets overwritten by browser language.
 links=language_links(code)
 switch=f'<details class="language-switch"><summary aria-label="{esc(d["language"])}">{code.upper()}</summary><nav aria-label="{esc(d["language"])}">{links}</nav></details>'
 localized=localized.replace('<nav class="nav"', '<nav class="nav"',1)
 firstreserve=re.search(r'<a class="reserve"[^>]*data-booking[^>]*>.*?</a>',localized,re.S).group(0)
 compact=f'<a class="reserve" href="{FACTS["bookingUrl"]}" target="_blank" rel="noopener noreferrer" data-booking aria-label="{esc(d["bookLong"])}"><span class="booking-wide">{esc(d["book"])}</span><span class="booking-compact" aria-hidden="true"><b>N</b>{esc(d["bookShort"])}</span></a>'
 localized=localized.replace(firstreserve,switch+compact,1)
 localized=localized.replace('<section class="ending"',extra_sections(d)+'\n<section class="ending"',1)
 # Move the extra information inside the light visit section, before its closing tag.
 marker='<div class="visit-extensions"'
 before,extra=localized.split(marker,1)
 end_extra,after=extra.split('<section class="ending"',1)
 before=before.rstrip()
 assert before.endswith('</section>')
 before=before[:-len('</section>')]
 localized=before+marker+end_extra+'</section>\n<section class="ending"'+after
 footer=f'''<footer class="footer" id="contact"><div class="footer-info"><strong>{FACTS['name']}</strong><address>{FACTS['address']}</address><div class="contact-line"><a href="tel:{FACTS['telephone']}">{FACTS['telephoneDisplay']}</a><a href="mailto:{FACTS['email']}">{FACTS['email']}</a></div><p class="award-line">{esc(d['award'])}</p></div><nav class="footer-links"><a href="{FACTS['instagram']}" target="_blank" rel="noopener noreferrer">{esc(d['instagram'])} ↗</a><a href="#directions">{esc(d['nav'][2])}</a><a href="#faq">{esc(d['faqTitle'])}</a><a href="#film">{esc(d['backTop'])} ↑</a></nav></footer><div class="footer-bottom"><span>© 2026 하늘의별딸기</span><nav class="footer-languages" aria-label="{esc(d['language'])}">{links}</nav></div>'''
 localized=re.sub(r'<footer class="footer">.*?</footer>',lambda m:footer,localized,flags=re.S)
 alternates=''.join(f'<link rel="alternate" hreflang="{l}" href="{ORIGIN}{p}">' for _,l,_,p in LANGS)+f'<link rel="alternate" hreflang="x-default" href="{ORIGIN}/">'
 head=f'''<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>{esc(TITLES[code])}</title><meta name="description" content="{esc(DESCRIPTIONS[code])}"><meta name="theme-color" content="#282623"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="icon" href="/assets/brand/star-logo.png" type="image/png"><link rel="canonical" href="{url}">{alternates}<link rel="alternate" type="application/json" href="{ORIGIN}/site-info.json" title="하늘의별딸기 기본 정보"><meta property="og:type" content="website"><meta property="og:site_name" content="하늘의별딸기"><meta property="og:url" content="{url}"><meta property="og:locale" content="{LOCALES[code]}"><meta property="og:title" content="{esc(TITLES[code])}"><meta property="og:description" content="{esc(DESCRIPTIONS[code])}"><meta property="og:image" content="{ORIGIN}/assets/photos/optimized/photo-02-1600.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(TITLES[code])}"><meta name="twitter:description" content="{esc(DESCRIPTIONS[code])}"><meta name="twitter:image" content="{ORIGIN}/assets/photos/optimized/photo-02-1600.jpg"><link rel="preconnect" href="https://cdn.jsdelivr.net"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"><script>document.documentElement.classList.add('has-js');</script><style>{style}\n{EXTRA}</style><script type="application/ld+json">{dump(graph(code,lang,url,d))}</script>'''
 helper='''<script>(()=>{const menu=document.querySelector('.language-switch');document.addEventListener('click',e=>{if(menu&&!menu.contains(e.target))menu.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu&&menu.open){menu.open=false;menu.querySelector('summary').focus()}});const requested=new URLSearchParams(location.search).get('lang');const routes={ko:'/',en:'/en',zh:'/zh',vi:'/vi',th:'/th',ru:'/ru'};if(requested&&Object.prototype.hasOwnProperty.call(routes,requested)&&requested!==document.documentElement.dataset.locale){location.replace(routes[requested]+location.hash)}})();</script>'''
 doc=f'<!doctype html>\n<html lang="{lang}" data-locale="{code}"><head>{head}</head><body>{localized}{helper}</body></html>'
 target=OUT/('index.html' if code=='ko' else code+'.html');target.write_text(doc,encoding='utf-8');print('Built',target.name,len(doc.encode()))
# Keep existing crawling and security policies unchanged. Canonical language routes follow current hosting.
urls=[ORIGIN+p for _,_,_,p in LANGS]
sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
for u in urls:
 sitemap+=f'<url><loc>{u}</loc><lastmod>{FACTS["updated"]}</lastmod>'+''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{ORIGIN}{p}"/>' for _,l,_,p in LANGS)+f'<xhtml:link rel="alternate" hreflang="x-default" href="{ORIGIN}/"/></url>\n'
(OUT/'sitemap.xml').write_text(sitemap+'</urlset>\n')
redirects=''.join(f'/{old}{ext} /#{anchor} 301\n' for old,anchor in [('booking','visit'),('directions','directions'),('guide','visit'),('faq','faq')] for ext in ['', '.html'])
(OUT/'_redirects').write_text(redirects)
info=dict(FACTS);info['languages']={l:ORIGIN+p for _,l,_,p in LANGS};info['faq']=json.loads((SRC/'content/ko.json').read_text())['faqs'];info['source']='User-confirmed price and opening schedule on 2026-10-28; other details retained from the official website.'
(OUT/'site-info.json').write_text(json.dumps(info,ensure_ascii=False,indent=2)+'\n')
llms=f'''# 하늘의별딸기

> 경기도 화성시 만세구 팔탄면의 가족 체험형 딸기농장입니다. 공식 홈페이지의 공개 정보 요약이며 예약 가능 좌석이나 날짜를 보장하지 않습니다.

## 기본 정보
- 공식 상호: 하늘의별딸기
- 도로명 주소: {FACTS['address']}
- 지번 주소: {FACTS['landLotAddress']}
- 전화: {FACTS['telephoneDisplay']}
- 이메일: {FACTS['email']}
- 설향 딸기 수확 체험: 1인 19,000원, 500g 전용 팩 1개 포함. 보호자도 동일 요금.
- 24개월 미만: 증빙서류 지참 시 무료 입장.
- 운영시간: 10:00–16:00. 월요일 기본 휴무, 공휴일 월요일 정상 영업.
- 체험시간: 평일 150분, 주말·공휴일 100분. 예약시간 10분 전 도착.
- 컵케이크 선택 옵션: 1인 세트 3,000원 / 2인 세트 5,000원.
- 감성 스냅: 현장 상황에 따라 진행되는 무료 특별 이벤트이며 상시 보장되지 않습니다.
- 추가 수확: 100g 단위 현장 결제, 방문일 시세 적용.
- 주차: 농장 옆 도로 가로주차. 진입로 주차 불가.
- 우천: 온실에서 진행하되 안전상 운영이 어려운 날 별도 안내. 반려동물 동반 불가.
- 확인 기준: {FACTS['updated']}. 예약 가능 날짜·시간은 네이버에서 확인하세요.

## 공식 페이지
'''+''.join(f'- [{label}]({ORIGIN}{path})\n' for _,_,label,path in LANGS)+f'''- [네이버 예약·운영 확인]({FACTS['bookingUrl']}): 네이버 플레이스 홈으로 연결됩니다.
- [네이버 지도]({FACTS['mapUrl']})
- [공개 기본 정보 JSON]({ORIGIN}/site-info.json)
- [사이트맵]({ORIGIN}/sitemap.xml)
'''
(OUT/'llms.txt').write_text(llms,encoding='utf-8')
missing={k:v for k,v in missing.items() if v}
if missing:raise SystemExit('Untranslated source text: '+json.dumps(missing,ensure_ascii=False))
