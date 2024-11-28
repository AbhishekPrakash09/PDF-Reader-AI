from django.db import models

# Create your models here.

class PDFFile(models.Model):
    """
    Model to store metadata about uploaded PDF files.
    """
    file_name = models.CharField(max_length=255, unique=True)
    upload_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name