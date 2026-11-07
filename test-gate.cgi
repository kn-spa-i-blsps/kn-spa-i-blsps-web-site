#!/usr/bin/python3
import os,sys,json,http.client,mimetypes
from pathlib import Path
from urllib.parse import urlsplit,unquote
out=sys.stdout.buffer
def respond(status,body=b'',kind='text/html; charset=utf-8'):
    out.write(('Status: '+status+'\r\nContent-Type: '+kind+'\r\nCache-Control: private, no-store\r\nVary: Cookie, Authorization\r\nX-Robots-Tag: noindex, nofollow\r\nX-Content-Type-Options: nosniff\r\n\r\n').encode())
    if os.environ.get('REQUEST_METHOD')!='HEAD': out.write(body)
    sys.exit()
try:
    headers={}
    if os.environ.get('HTTP_COOKIE'): headers['Cookie']=os.environ['HTTP_COOKIE']
    if os.environ.get('HTTP_AUTHORIZATION'): headers['Authorization']=os.environ['HTTP_AUTHORIZATION']
    conn=http.client.HTTPConnection('127.0.0.1',31847,timeout=10)
    conn.request('GET','/api/auth/me',headers=headers)
    response=conn.getresponse()
    authorized=response.status==200 and json.loads(response.read()).get('role')=='admin'
    conn.close()
    if not authorized:
        out.write(b'Status: 302 Found\r\nLocation: /admin/?next=/test/index.html\r\nCache-Control: private, no-store\r\nVary: Cookie, Authorization\r\n\r\n')
        sys.exit()
    if os.environ.get('REQUEST_METHOD') not in ('GET','HEAD'): respond('405 Method Not Allowed')
    path=unquote(urlsplit(os.environ.get('REQUEST_URI','')).path)
    if path=='/test':
        out.write(b'Status: 302 Found\r\nLocation: /test/\r\nCache-Control: no-store\r\n\r\n');sys.exit()
    if not path.startswith('/test/'): respond('404 Not Found')
    relative=path[len('/test/'):]
    if not relative: relative='index.html'
    if any(part.startswith('.') for part in relative.split('/')): respond('404 Not Found')
    base=Path(__file__).resolve().parent/'test'
    target=(base/relative).resolve()
    if not target.is_relative_to(base) or not target.is_file(): respond('404 Not Found')
    respond('200 OK',target.read_bytes(),mimetypes.guess_type(target.name)[0] or 'application/octet-stream')
except Exception:
    respond('503 Service Unavailable',b'Authentication temporarily unavailable','text/plain; charset=utf-8')
