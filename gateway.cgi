#!/usr/bin/python3
import os,sys,http.client
uri=os.environ.get('REQUEST_URI','/')
length=int(os.environ.get('CONTENT_LENGTH') or 0)
if length>32*1024*1024:
    sys.stdout.write('Status: 413 Payload Too Large\r\nContent-Type: text/plain\r\n\r\nUpload too large')
    sys.exit()
body=sys.stdin.buffer.read(length) if length else None
skip={'host','connection','transfer-encoding','content-length','x-forwarded-for','x-forwarded-proto','x-forwarded-host'}
headers={}
for k,v in os.environ.items():
    if k.startswith('HTTP_'):
        name=k[5:].replace('_','-')
        if name.lower() not in skip: headers[name]=v
if os.environ.get('CONTENT_TYPE'): headers['Content-Type']=os.environ['CONTENT_TYPE']
headers['Host']='knspa.mimuw.edu.pl'
headers['X-Forwarded-For']=os.environ.get('REMOTE_ADDR','')
headers['X-Forwarded-Proto']='https' if os.environ.get('HTTPS')=='on' else 'http'
headers['X-Forwarded-Host']='knspa.mimuw.edu.pl'
try:
    conn=http.client.HTTPConnection('127.0.0.1',31847,timeout=90)
    conn.request(os.environ.get('REQUEST_METHOD','GET'),uri,body,headers)
    r=conn.getresponse()
    out=sys.stdout.buffer
    out.write(('Status: '+str(r.status)+' '+r.reason+'\r\n').encode())
    for k,v in r.getheaders():
        if k.lower() not in {'connection','transfer-encoding','keep-alive'}:
            out.write((k+': '+v+'\r\n').encode('latin-1'))
    out.write(b'\r\n')
    while True:
        chunk=r.read(65536)
        if not chunk: break
        out.write(chunk)
except Exception:
    sys.stdout.buffer.write(b'Status: 502 Bad Gateway\r\nContent-Type: text/plain\r\n\r\nApplication temporarily unavailable')
