from langchain_text_splitters import RecursiveCharacterTextSplitter
import weaviate.classes.config as wc
from .vector_database import client




def process_pdf_text(pdf_file_text, pdf_file_name):

    """
    Function to process the text of a PDF file and embed it into a Weaviate collection.
    """

    # Split the text into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

    chunks: list[str] = text_splitter.split_text(pdf_file_text)

    collection_name: str = pdf_file_name.split('.')[0]

    #Create collection with the given file name
    client.collections.create(
        collection_name,
        properties=[
            wc.Property(name='content', data_type=wc.DataType.TEXT)
            
        ],
        vectorizer_config=wc.Configure.Vectorizer.text2vec_openai(),
        inverted_index_config=wc.Configure.inverted_index()
    )

    collection = client.collections.get(collection_name)

    #Embed the chunks into the collection
    with collection.batch.dynamic() as batch:

        for chunk in chunks:
            batch.add_object({
                'content': chunk
            })

    if collection.batch.failed_objects:
        print("Some objects failed to insert:")
        for failed_obj in batch.failed_objects:
            print(f"ID: {failed_obj['id']}, Error: {failed_obj['error']}")

    else:
        print("All objects inserted successfully")

