import os
import json
import pdfplumber
import google.generativeai as genai
from dotenv import load_dotenv
from supabase import create_client, Client

# 1. Setup Connections
load_dotenv()

# Supabase Setup
supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Gemini AI Setup
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

def extract_text_from_pdf(filepath):
    """Reads the raw text from the PDF"""
    text = ""
    with pdfplumber.open(filepath) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

def analyze_with_gemini(text):
    """The 'Antigravity' Step: Sends text to AI for intelligent extraction"""
    model = genai.GenerativeModel('gemini-flash-latest')
    
    prompt = f"""
    You are a financial data expert. 
    Analyze the following bank statement text and extract all transactions.
    
    Return ONLY a raw JSON array. Do not use Markdown formatting.
    Each object in the array must have these exact fields:
    - "date_time": (String, format "DD-MMM-YYYY")
    - "vendor": (String, clean merchant name)
    - "amount": (Number, positive float)
    - "type": (String, either "credit" or "debit")
    - "category": (String, e.g., "Food", "Travel", "Bills", "Transfer")
    - "source": (String, guess the bank name or "Unknown")
    
    Here is the statement text:
    {text[:30000]} 
    """
    
    try:
        response = model.generate_content(prompt)
        # Clean the response to ensure it's pure JSON
        clean_json = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_json)
    except Exception as e:
        print(f"❌ AI Error: {e}")
        return []

def process_pdfs():
    upload_folder = "uploads"
    
    if not os.path.exists(upload_folder):
        print(f"❌ Error: Folder '{upload_folder}' missing.")
        return

    files = [f for f in os.listdir(upload_folder) if f.endswith('.pdf')]
    
    if not files:
        print("⚠️ No PDFs found. Please add a bank statement to 'backend/uploads'")
        return

    print(f"🤖 AI Agent Active. Found {len(files)} files.")

    for filename in files:
        print(f"📄 Reading {filename}...")
        raw_text = extract_text_from_pdf(os.path.join(upload_folder, filename))
        
        if not raw_text:
            print("   ⚠️ Empty PDF or unreadable.")
            continue
            
        print("   🧠 Sending to Gemini AI for analysis...")
        transactions = analyze_with_gemini(raw_text)
        
        if transactions:
            print(f"   ✅ AI identified {len(transactions)} transactions.")
            
            # Enrich with extra fields for database
            for t in transactions:
                t['account'] = filename # Track which file it came from
                t['status'] = 'ok'
            
            # Upload to Supabase
            try:
                supabase.table('transactions').insert(transactions).execute()
                print("   🚀 Saved to Database!")
            except Exception as e:
                print(f"   ❌ Database Error: {e}")
        else:
            print("   ⚠️ AI could not find transaction data.")

if __name__ == "__main__":
    process_pdfs()