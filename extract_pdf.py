import PyPDF2
import json
import re
import os

def extract_pdf_content(pdf_path):
    """Extract text content from PDF file"""
    content = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                content += page.extract_text() + "\n"
                
        return content
    except Exception as e:
        return f"Error extracting PDF: {str(e)}"

def parse_questions(content):
    """Parse the content to extract questions and answers"""
    questions = []
    
    # Pattern to match question numbers and content
    # This pattern might need adjustment based on the actual PDF format
    question_pattern = r'(?:Question\s*:?\s*|Q(?:uestion)?\s*\.?\s*)(\d+)[\.\s:]*(.*?)(?=(?:Question\s*:?\s*|Q(?:uestion)?\s*\.?\s*)\d+|$)'
    
    # Find all questions
    matches = re.findall(question_pattern, content, re.DOTALL | re.IGNORECASE)
    
    for match in matches:
        question_num = match[0]
        question_content = match[1].strip()
        
        # Extract options and correct answer
        options = {}
        correct_answer = None
        
        # Pattern to match options (A, B, C, D, etc.)
        option_pattern = r'([A-Z])[\.\s:]+(.*?)(?=[A-Z][\.\s:]|Correct Answer|$)'
        option_matches = re.findall(option_pattern, question_content, re.DOTALL)
        
        for opt_match in option_matches:
            opt_letter = opt_match[0]
            opt_content = opt_match[1].strip()
            options[opt_letter] = opt_content
        
        # Extract the question text (everything before the first option)
        question_text = question_content
        if option_matches:
            first_option = option_matches[0][0]
            question_text = question_content.split(f"{first_option}.", 1)[0].strip()
        
        # Extract correct answer
        correct_pattern = r'Correct Answer\s*:?\s*([A-Z])'
        correct_match = re.search(correct_pattern, question_content, re.IGNORECASE)
        if correct_match:
            correct_answer = correct_match.group(1)
        
        # Extract explanation if available
        explanation = ""
        explanation_pattern = r'Explanation\s*:?\s*(.*?)(?=(?:Question\s*:?\s*|Q(?:uestion)?\s*\.?\s*)\d+|$)'
        explanation_match = re.search(explanation_pattern, question_content, re.IGNORECASE | re.DOTALL)
        if explanation_match:
            explanation = explanation_match.group(1).strip()
        
        # Create question object
        question_obj = {
            "id": int(question_num),
            "question": question_text,
            "options": options,
            "correct_answer": correct_answer,
            "explanation": explanation
        }
        
        questions.append(question_obj)
    
    return questions

def main():
    pdf_path = "/home/ubuntu/upload/DP 600 dumps.pdf"
    output_path = "/home/ubuntu/dp600_app/extracted_questions.json"
    
    print(f"Extracting content from {pdf_path}...")
    content = extract_pdf_content(pdf_path)
    
    if content.startswith("Error"):
        print(content)
        return
    
    print("Parsing questions...")
    questions = parse_questions(content)
    
    print(f"Found {len(questions)} questions.")
    
    # Save to JSON file
    with open(output_path, 'w') as f:
        json.dump(questions, f, indent=2)
    
    print(f"Questions saved to {output_path}")
    
    # Also save raw content for debugging
    with open("/home/ubuntu/dp600_app/raw_content.txt", 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Raw content saved for debugging")

if __name__ == "__main__":
    main()
