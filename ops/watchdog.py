#!/usr/bin/python3
import os,sys,json,urllib.request,subprocess,fcntl,shlex,datetime
from pathlib import Path
home=Path.home();state=home/'.local/state/knspa'
lock=open(state/'watchdog.lock','a')
try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
except BlockingIOError:sys.exit()
def log(message):
 with open(state/'recovery.log','a') as f:f.write(datetime.datetime.now().isoformat(timespec='seconds')+' '+message+'\n')
def healthy():
 try:
  with urllib.request.urlopen('http://127.0.0.1:31847/health',timeout=5) as r:return r.status==200 and json.load(r).get('ok') is True
 except Exception:return False
if healthy():sys.exit()
env=os.environ.copy();env['XDG_RUNTIME_DIR']='/run/user/'+str(os.getuid());env['DBUS_SESSION_BUS_ADDRESS']='unix:path='+env['XDG_RUNTIME_DIR']+'/bus'
try:
 r=subprocess.run(['/usr/bin/systemctl','--user','start','knspa-web.service'],env=env,capture_output=True,timeout=15)
 if r.returncode==0:
  import time
  for _ in range(8):
   if healthy():log('Recovered through systemd');sys.exit()
   time.sleep(1)
except (OSError,subprocess.TimeoutExpired):pass
if healthy():sys.exit()
# EnvironmentFile is parsed as assignments, without executing shell code.
for line in (home/'.config/knspa/app.env').read_text().splitlines():
 line=line.strip()
 if not line or line.startswith('#') or '=' not in line:continue
 key,value=line.split('=',1)
 parsed=shlex.split(value,comments=False,posix=True)
 env[key]=' '.join(parsed) if parsed else ''
with open(state/'fallback.log','ab') as output:
 process=subprocess.Popen(['/usr/bin/python3',str(home/'.local/lib/knspa/run-app.py')],env=env,stdin=subprocess.DEVNULL,stdout=output,stderr=output,start_new_session=True)
log('Attempted independent recovery; launcher PID '+str(process.pid))
