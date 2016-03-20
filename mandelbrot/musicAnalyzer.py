import subprocess
import sys

inname = 'data/test.mp3'
outname = 'out.wav'
try:
    subprocess.check_call(['mpg123', '-w', outname, inname])
except CalledProcessError as e:
    print e
    sys.exit(1)