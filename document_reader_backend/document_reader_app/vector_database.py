import weaviate
from weaviate.classes.init import Auth   

# Initialize Weaviate client
# Currently this connects to my local weaviate instance. 
# Change this to connect to Weaviate Cloud to connect to cloud instance

client = weaviate.connect_to_local()


"""
Initialize the weaviate client for weaviete hosted in cloud
"""
# weaviate_url = os.environ["WEAVIATE_URL"]
# weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# # Connect to Weaviate Cloud
# client = weaviate.connect_to_weaviate_cloud(
#     cluster_url=weaviate_url,
#     auth_credentials=Auth.api_key(weaviate_api_key),
# )

print(f'Weaviate is ready: {client.is_ready()}')