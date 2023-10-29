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


@app.route("/receiveImages", methods=['POST'])
def receiveImages():
    messages = []

    for i in range(10):
        try:
            file = request.files.get(f'image{i}')
            if file:
                file_path = f'images/{file.filename}'
                file.save(file_path)

                img = imread(file_path)

                prediction = analyze_photo(img) 
                messages.append({"filename": file.filename, "message": prediction})
        except Exception:
            break

    return jsonify({"messages": messages})

@app.route("/uploadUserAnswers", methods=['POST'])
def uploadUserAnswers():
    answers = request.get_json()
    return jsonify(answers)


if __name__ == '__main__':
    app.run(debug=True)
