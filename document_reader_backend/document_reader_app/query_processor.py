from weaviate.classes.query import MetadataQuery
from .vector_database import client
import openai



def process_query(query_text, pdf_name):

    """Function to process a query and return the response."""

    collection_name = pdf_name.strip('.pdf')

    # Query the vector database to get the context with the highest similarity
    context = query_vector_database(query_text, collection_name)

    # # Query the OpenAI API to get the response
    open_ai_response = query_openai(query_text, context)

    return open_ai_response


def query_vector_database(query_text, collection_name):

    """Function to query the vector database using a text query."""
    collection = client.collections.get(collection_name)

    response = collection.query.near_text(
        query=query_text,
        auto_limit=5,
        return_metadata=MetadataQuery(distance=True)
    )


    if len(response.objects) == 0:
        return ""
    
    else:
        relevant_text = ""

        

        chunk_number = 1
        for obj in response.objects:
            relevant_text += obj.properties.get('content')
            chunk_number += 1
            if chunk_number > 10:
                break
    
        return relevant_text




def query_openai(query_text, context):

    """Function to query the OpenAI API using a text query."""

    prompt = (
        "Answer the question based only on the provided context. If the question cannot be answered based on the context, say 'Data Not Available'.\n\n"
        "Context:\n" + "\n\n".join(context) + f"\n\nQuestion: {query_text}\nAnswer:"
    )

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100,
        temperature=0.7
    )

    response_content = response.choices[0].message.content

    return response_content