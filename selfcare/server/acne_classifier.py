import numpy as np
from skimage.transform import resize
import pickle

CATEGORIES = ['damaged hair', 'dry hair', 'brittle hair',
              'dry crunchy hair', 'crunchy hair', 'oily hair', 'oily scalp', 'dry scalp']


def analyze_photo(img):
    flattened_data = []  # Make this a local variable
    resized_img = resize(img, (150, 150, 3))

    flattened_data.append(resized_img.flatten())
    flattened_data = np.array(flattened_data)

    model = pickle.load(open('img_model.p', 'rb'))  # Load the model here

    y_out = model.predict(flattened_data)
    y_out = CATEGORIES[y_out[0]]
    return y_out
