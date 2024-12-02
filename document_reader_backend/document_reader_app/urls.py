from django.urls import path
from . import views

urlpatterns = [
    path("", views.hello_world, name="hello_world"),
    path("list-pdfs", views.list_pdf_files, name="list_pdfs"),
    path("list-collections", views.list_collections, name="list_collections"),
    path("upload-pdf", views.upload_pdf, name="upload_pdf"),
    path("read-pdf", views.read_pdf, name="read_pdf"),
    path("delete-pdf", views.delete_pdf, name="delete_pdf"),
]