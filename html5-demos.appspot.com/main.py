import os
import md5
import re
import urllib
import datetime
import math

from google.appengine.api import urlfetch
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db
import wsgiref.handlers

class MainPage(webapp.RequestHandler):
  def get(self):
    pass

apps_binding = []

apps_binding.append(('/', MainPage))

application = webapp.WSGIApplication(apps_binding, debug=True)
wsgiref.handlers.CGIHandler().run(application)
