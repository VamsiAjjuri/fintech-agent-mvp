import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
api_key = os.environ.get("GOOGLE_API_KEY")

if not api_key:
    print("❌ Error: GOOGLE_API_KEY not found in .env")
else:
    print(f"🔑 API Key found: {api_key[:5]}...{api_key[-5:]}")
    
    # Configure the library
    genai.configure(api_key=api_key)

    print("\n📡 Connecting to Google to fetch available models...")
    try:
        # List all models that support content generation
        found_models = []
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"   ✅ Available: {m.name}")
                found_models.append(m.name)
        
        if not found_models:
            print("\n⚠️ No 'generateContent' models found. Check if your API Key has the 'Generative AI API' enabled in Google Cloud Console.")
    except Exception as e:
        print(f"\n❌ Connection Error: {e}")