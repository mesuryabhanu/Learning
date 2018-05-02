import os
import tensorflow as tf
from os.path import isfile, join, isdir
import skimage
from skimage import data
#import Session
import numpy as np
import matplotlib.pyplot as plt

def load_data(data_directory):
    directories = [d for d in os.listdir(data_directory) if os.path.isdir(os.path.join(data_directory, d))]
    labels = []
    images = []
    for d in directories:
        label_directory = os.path.join(data_directory, d)
        file_names = [os.path.join(label_directory, f)
                      for f in os.listdir(label_directory)
                      if f.endswith('.ppm')]
        for f in file_names:
            images.append(skimage.data.imread(f))
            labels.append(int(d))
    return images, labels


ROOT_PATH = "C:/Users/surkuma/Downloads" 
train_data_directory = os.path.join(ROOT_PATH, "BelgiumTSC_Training/Training")
test_data_directory = os.path.join(ROOT_PATH, "BelgiumTSC_Testing/Testing")

images, labels = load_data(train_data_directory)
images_as_ndarray = np.array(images)
labels_as_ndarray = np.array(labels)

#plt.hist(labels, 62)
#plt.show()

#traffic_signs = [300, 2250, 3650, 4000]

## Fill out the subplots with the random images and add shape, min and max values
#for i in range(len(traffic_signs)):
#    plt.subplot(1, 4, i+1)
#    plt.axis('off')
#    plt.imshow(images[traffic_signs[i]])
#    plt.subplots_adjust(wspace=0.5)
#    plt.show()
#    print("shape: {0}, min: {1}, max: {2}".format(images[traffic_signs[i]].shape, 
#                                                  images[traffic_signs[i]].min(), 
#                                                  images[traffic_signs[i]].max()))
#plt.show()



##################check one image of each label


## Get the unique labels 
#unique_labels = set(labels)

## Initialize the figure
#plt.figure(figsize=(15, 15))

## Set a counter
#i = 1

## For each unique label,
#for label in unique_labels:
#    # You pick the first image for each label
#    image = images[labels.index(label)]
#    # Define 64 subplots 
#    plt.subplot(8, 8, i)
#    # Don't include axes
#    plt.axis('off')
#    # Add a title to each subplot 
#    plt.title("Label {0} ({1})".format(label, labels.count(label)))
#    # Add 1 to the counter
#    i += 1
#    # And you plot this first image 
#    plt.imshow(image)
    
## Show the plot
#plt.show()




###### resize the images

# Import the `transform` module from `skimage`
from skimage import transform 

# Rescale the images in the `images` array
images28 = [transform.resize(image, (28, 28)) for image in images]


######convert images to grayscale

# Import `rgb2gray` from `skimage.color`
from skimage.color import rgb2gray

# Convert `images28` to an array
images28 = np.array(images28)

# Convert `images28` to grayscale
images28 = rgb2gray(images28)




####check the ouput images now
#raffic_signs = [300, 2250, 3650, 4000]

#for i in range(len(traffic_signs)):
#    plt.subplot(1, 4, i+1)
#    plt.axis('off')
#    plt.imshow(images28[traffic_signs[i]], cmap="gray")
#    plt.subplots_adjust(wspace=0.5)
    
## Show the plot
#plt.show()