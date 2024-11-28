from langchain_text_splitters import RecursiveCharacterTextSplitter
from weaviate.classes.config import Configure
from .vector_database import client



def process_pdf_text(pdf_file_text, pdf_file_name):

    """
    Function to process the text of a PDF file and embed it into a Weaviate collection.
    """

    #Split the text into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)

    chunks: list[str] = text_splitter.split_text(pdf_file_text)

    #Create collection with the given file name
    client.collections.create(
        pdf_file_name,
        vectorizer_config=Configure.Vectorizer.text2vec_openai()
    )

    collection = client.collections.get(pdf_file_name)

    #Embed the chunks into the collection
    with collection.batch.dynamic() as batch:

        for chunk in chunks:
            batch.add_object({
                'content': chunk
            })