
from rest_framework.decorators import api_view
from rest_framework.response import Response
from PyPDF2 import PdfReader
from rest_framework import status
from .pdf_processor import process_pdf_text
from .models import PDFFile
from .query_processor import process_query
from .vector_database import client
import traceback


# Create your views here.
@api_view(['GET'])
def hello_world(request):
    
    return Response('Hello World', status=status.HTTP_200_OK)


@api_view(['POST'])
def upload_pdf(request):

    """
    API endpoint to upload a PDF, extract text, generate embeddings, and store in Weaviate.
    """

    if "file" not in request.FILES:
        return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve the uploaded file
    pdf_file = request.FILES["file"]
    pdf_name = pdf_file.name

    try:

        # Check if a PDF with the same name already exists
        if PDFFile.objects.filter(file_name=pdf_name).exists():
            return Response({"error": "File with this name already exists"}, status=400)

        # Extract text from the PDF
        pdf_reader = PdfReader(pdf_file)
        text = ""

        for page in pdf_reader.pages:
            text += page.extract_text()

        if not text.strip():
            return Response({"error": "Failed to extract text from the PDF"}, status=status.HTTP_400_BAD_REQUEST)
        

        process_pdf_text(pdf_file_text=text, pdf_file_name=pdf_name)

        # Save pdf file metadata to the database
        PDFFile.objects.create(file_name=pdf_name)

        print("PDF uploaded and embeddings stored successfully")

        return Response(
            {"message": "PDF uploaded and embeddings stored successfully"},
            status=status.HTTP_201_CREATED,
        )

    except Exception as exception:
        traceback.print_exception(type(exception), exception, exception.__traceback__)
        return Response({"error": str(exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def list_collections(request):

    response = client.collections.list_all()

    print(response)

    return Response("client.collections.list_all()", status=200)

@api_view(['GET'])
def list_pdf_files(request):
    """
    API to retrieve all PDF file names from the database.
    """
    files = PDFFile.objects.all().values("file_name", "upload_time")

    file_names: list[str] = []

    # Convert the queryset to a list of strings
    for file in files:
        file_names.append(file["file_name"])

    return Response(file_names, status=200)


@api_view(['POST'])
def read_pdf(request):

    """
    API endpoint to read a PDF file and extract text.
    """
    try: 

        request_data = request.data
        pdf_file_name = request_data.get('pdf_file_name')

        pdf_file = PDFFile.objects.filter(file_name=pdf_file_name).first()

        if not pdf_file:
            return Response({"error": "PDF file not found"}, status=status.HTTP_404_NOT_FOUND)

        questions = request_data.get('questions').rstrip().split('\n')

        response_data = []
        for question in questions:
            query_response = process_query(question, pdf_file_name)
            response_data.append({
                'question': question,
                'answer': query_response
            })


        return Response(response_data, status=status.HTTP_200_OK)

    except Exception as exception:
        traceback.print_exception(type(exception), exception, exception.__traceback__)
        return Response({"error": str(exception)}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def delete_pdf(request):

    """
    API endpoint to delete a PDF file.
    """
    try: 

        request_data = request.data
        pdf_file_name = request_data.get('pdf_file_name')

        pdf_file = PDFFile.objects.filter(file_name=pdf_file_name).first()

        if not pdf_file:
            return Response({"error": "PDF file not found"}, status=status.HTTP_404_NOT_FOUND)

        pdf_file.delete()

        client.collections.delete(pdf_file_name.rstrip('.pdf'))

        return Response({"message": "PDF file deleted successfully"}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


