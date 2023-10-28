from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from skimage.io import imread
from acne_classifier import analyze_photo  # Importing your model function

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def home():
    return {"message": "Hello from backend"}


@app.route("/upload", methods=['POST'])
def upload():
    file = request.files['file']
    file_path = 'uploads/' + file.filename
    file.save(file_path)

    img = imread(file_path)
    os.remove(file_path)  # Remove the file after reading

    prediction = analyze_photo(img)

    return jsonify({"message": prediction})


if __name__ == '__main__':
    app.run(debug=True)
