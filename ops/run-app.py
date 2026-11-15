#!/usr/bin/python3
import os,fcntl,sys
from pathlib import Path
home=Path.home()
lock=open(home/'.local/state/knspa/app.lock','a')
try: fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
except BlockingIOError: sys.exit(75)
os.set_inheritable(lock.fileno(),True)
os.chdir(home/'knspa-web-source')
os.execv(str(home/'.local/opt/node22/bin/node'),['node','server/index.js'])
