"""
WSGI config for ubaly project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ubaly.settings')

application = get_wsgi_application()
