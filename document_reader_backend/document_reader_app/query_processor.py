from weaviate.classes.query import MetadataQuery
from .vector_database import client
import openai

def query_vector_database(query_text, pdf_name):

    """Function to query the vector database using a text query."""
    collection = client.collections.get(pdf_name)

    response = collection.query.near_text(
        query=query_text,
        auto_limit=1,
        return_metadata=MetadataQuery(distance=True)
    )

    for object in response.objects:
        print(object.properties)
        print(object.metadata.distance)
        break


def query_openai(query_text, context):

    """Function to query the OpenAI API using a text query."""

    prompt = (
        "Answer the question based on the provided context.\n\n"
        "Context:\n" + "\n\n".join(context) + f"\n\nQuestion: {query_text}\nAnswer:"
    )

    response = openai.completions.create(
        
    )


