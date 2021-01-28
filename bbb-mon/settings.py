import os
import api_lib
from dotenv import load_dotenv   #for python-dotenv method
load_dotenv() 

MAJOR = 0
MINOR = 4
BUGFIX = 0

VERSION = "{}.{}.{}".format(MAJOR, MINOR, BUGFIX)

API_BASE_URL = os.environ["API_BASE_URL"]
# SSH into server and run: `$ bbb-conf --secret` to get secret
API_SECRET = os.environ["API_SECRET"]

API_CLIENT = api_lib.Client(API_BASE_URL, API_SECRET)

debug_env = os.getenv("DEBUG", "false")
DEBUG = True if debug_env.lower() == "true" else False
