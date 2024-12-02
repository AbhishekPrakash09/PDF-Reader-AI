# PDF Reader Chat Application

## Overview

This application enables users to upload, manage, and interact with PDF documents through a chat interface. It uses AI to process and understand the content of PDFs, allowing users to query documents effectively. The architecture leverages a React/TypeScript front end, a Python/Django backend, and integrates Weaviate for vector storage and OpenAI for language model capabilities.

## Features

- **Upload and Manage PDFs:** Upload PDFs to the system and create a corresponding collection in Weaviate for vector storage.
- **Query PDFs:** Use GPT-4o-mini for intelligent querying based on vectorized text chunks from the PDFs.
- **Chat Interface:** A seamless chat interface for user interactions.
- **Efficient Vectorization:** Text chunks are processed using a chunk size of 1000 with an overlap of 200 for better query relevance.

## Technology Stack

- **Frontend:** React with TypeScript
- **Backend:** Python with Django
- **Database:** Weaviate (Vector Database) hosted locally on Docker Desktop
- **AI Integration:** OpenAI GPT-4o-mini for chat completions
- **Hosting:** Docker with docker-compose

## Backend URL Configuration

### Project `urls.py`
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('document_reader_app.urls')),  # Include the app's URLs
]
```

### App `urls.py`
```python
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
```

## Installation and Setup

### Prerequisites

- Docker and Docker Compose
- Node.js and npm/yarn
- Python 3.8+ and pip
- Access to OpenAI API

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Frontend Setup**
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Backend Setup**
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the server:
     ```bash
     python manage.py runserver
     ```

4. **Weaviate Setup**
   - Ensure Docker Desktop is running.
   - Start Weaviate using Docker Compose:
     ```bash
     docker-compose up -d
     ```

5. **Environment Variables**
   - Add your OpenAI API key and any other required configuration to `.env` files in the appropriate directories.

### Usage

1. Upload PDFs using the `/upload-pdf` endpoint.
2. Manage uploaded files and collections via the `/list-pdfs` and `/list-collections` endpoints.
3. Query PDFs using the `/read-pdf` endpoint.


---

Let me know if you'd like to add more sections!
