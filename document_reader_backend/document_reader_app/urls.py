from django.urls import path
from . import views

urlpatterns = [
    path("", views.hello_world, name="hello_world"),
    path("list-pdfs", views.list_pdf_files, name="list_pdfs"),
]