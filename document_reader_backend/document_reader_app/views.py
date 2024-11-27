import os

import openai
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from PyPDF2 import PdfReader
from rest_framework import status

from .vector_database import client


# Create your views here.
@api_view(['GET'])
def hello_world(request):
    
    return Response('Hello World', status=status.HTTP_200_OK)


