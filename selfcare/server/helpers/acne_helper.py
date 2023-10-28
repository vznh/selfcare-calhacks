from bing_image_downloader import downloader as dlr
import os
import matplotlib.pyplot as plt
import numpy as np
from skimage.io import imread
from skimage.transform import resize
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn import svm
from sklearn.metrics import accuracy_score,confusion_matrix
import pickle 

dlr.download("comedone acne", limit = 1000, output_dir='images')
dlr.download("whitehead acne", limit = 1000, output_dir='images')
dlr.download("blackhead acne", limit = 1000, output_dir='images')
dlr.download("pustules acne", limit = 1000, output_dir='images')
dlr.download("cystic acne", limit = 1000, output_dir='images')
dlr.download("acne mechanica", limit = 1000, output_dir='images')
dlr.download("dry skin", limit = 1000, output_dir='images')
dlr.download("oily skin", limit = 1000, output_dir='images')

target: list
images: list
flattened_data: list

DATADIR, CATEGORIES = './images', ['damaged hair', 'dry hair', 'brittle hair', 'dry crunchy hair','crunchy hair', 'oily hair', 'oily scalp', 'dry scalp']

for category in CATEGORIES:
    class_num = CATEGORIES.index(category) 
    path = os.path.join(DATADIR, category)
    for img in os.listdir(path):
        if (img.endswith(('.png', '.jpg', '.jpeg'))):
            try:
                img_array = imread(os.path.join(path, img))
            except Exception as err:
                print("Couldn't read image:")
                continue
            print(img_array.shape)
        
        resized_img = resize(img_array, (150, 150, 3))
        flattened_data.append(resized_img.flatten())
        images.append(resized_img)
        target.append(class_num)
flattened_data = np.array(flattened_data)
target, images = np.array(target), np.array(images)

x_train,x_test,y_train,y_test = train_test_split(flattened_data,target,test_size = 0.3, random_state = 109)

param_grid = [
    { 'C' : [1,10,100,1000], 'kernel' : ['linear']},
    { 'C' : [1,10,100,1000], 'gamma' : [0.001,0.0001], 'kernel': ['rbf']},

]

svc = svm.SVC(probability = True)
clf = GridSearchCV(svc, param_grid)
clf.fit(x_train,y_train)

y_pred = clf.predict(x_test)
# print(y_pred) 

# accuracy_score(y_pred,y_test)

pickle.dump(clf, open('img_model.p','wb'))
model = pickle.load(open('img_model.p', 'rb'))

# export function photo_analyze(image)
def analyze_photo(img):
    flattened_data: list
    resized_img = resize(img, (150, 150, 3))
    
    flattened_data.append(resized_img.flatten())
    flattened_data = np.array(flattened_data)
    y_out = model.predict(flattened_data)
    y_out = CATEGORIES[y.out[0]]
    return y_out
    