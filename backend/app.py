from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")

@app.route('/extract', methods=['POST'])
def extract_entities():
    text = request.json.get("text", "")
    doc = nlp(text)
    nodes = list(set([ent.text for ent in doc.ents]))
    edges = [{"source": ent.text, "target": ent.label_} for ent in doc.ents]
    return jsonify({"nodes": nodes, "edges": edges})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
