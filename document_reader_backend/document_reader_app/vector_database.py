import weaviate
import os  


open_api_key = os.environ.get('OPENAI_API_KEY')

# Initialize Weaviate client
# Currently this connects to my local weaviate instance. 
# This can be changed to connect to a remote weaviate instance

client = weaviate.connect_to_local( headers={
        "X-OpenAI-Api-Key": open_api_key
    })


print(f'Weaviate is ready: {client.is_ready()}')