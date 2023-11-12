# CANT-cer

Pioneering Skin Cancer Data Generation to Combat AI Bias

# Inspiration

As AI researchers, we recognize the critical role of balanced datasets in developing impartial models. Yet, in the realm of medical datasets, especially those concerning skin cancer, there exists a significant imbalance favoring light-skinned individuals. This skew in data not only undermines the accuracy of AI-driven diagnoses but also disproportionately impacts the health outcomes of people of color. Our work is dedicated to rectifying this disparity, ensuring equitable and accurate medical diagnosis across all skin tones.

![image](https://media.discordapp.net/attachments/1172946769223618682/1173320320166412339/image.png?ex=656386b3&is=655111b3&hm=7202619060c166734ac00d4601227657dc373f6fd9ff4ddce17fcb0d24344a86&=&width=2160&height=422)

# What it does

Our website presents a groundbreaking solution for skin lesion analysis. It accepts any image of a skin lesion and, utilizing advanced style transfer models, transforms it into various skin tones as per user preference. Additionally, we've integrated a feature that allows users to effortlessly export these results into a comprehensive dataset. This dataset not only includes the transformed image but also provides a detailed segmentation mask of the lesion and a classification of its type. Our one-click dataset compilation feature streamlines data usage and access, making it exceptionally user-friendly and efficient for diverse applications.

![image](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/668/292/datas/gallery.jpg)

# How we built it

Our website can be split into several categories:

## 1.Front/Back End

Our website is a testament to the innovative use of technology blended with our aspirations. At its core, it's powered by React for its dynamic and responsive user interface, allowing for real-time interactions and updates. The backend is handled by Express, a robust framework for Node.js, ensuring efficient handling of server-side requests and smooth integration with various APIs. We’ve dedicated ourselves to implementing dynamic state allocations, a key feature that allows our website to render seamlessly and manage user interactions effectively. Moreover, the site is designed to facilitate RESTful routes, ensuring that data transfer and API interactions are both streamlined and secure.

## 2. Model

### 2.1 Classification Model

For the classification aspect of our website, we've utilized the HAM10000 dataset, a comprehensive collection of dermatoscopic images pivotal in training AI for skin lesion analysis. Our approach involves a custom Convolutional Neural Network (CNN) encoder, designed to capture the intricate features of skin images effectively. This is paired with a SoftMax decoder, which plays a crucial role in categorizing the images into one of seven distinct categories, based on lesion type. The training process was conducted on Google Colab, leveraging the power of Nvidia's T4 GPUs, known for their efficiency and speed in handling complex computations.

### 2.2 Segmentation Model

Our segmentation model is a crucial component of our website, and it's been finely honed using the dataset from ISIC 2018 Task 1: Lesion Segmentation. We've chosen a sophisticated approach by fine-tuning a pre-trained U-Net model, renowned for its efficacy in medical image segmentation. To optimize its performance, we've employed Dice Loss as our training criterion, focusing on achieving high accuracy in lesion boundary detection. This training was carried out on Kaggle's robust platform, utilizing the powerful Nvidia P100 GPUs, which are well-suited for handling detailed image processing tasks. Our model's key feature is its ability to accurately delineate the contour of the segmentation mask, which is then superimposed onto the original image for a clear and precise representation.

![image](https://media.discordapp.net/attachments/1172946769223618682/1173321328711979059/image.png?ex=656387a4&is=655112a4&hm=c33d1e561b90bcc85e2a5f1c6fa0d258d6e5079df82e496f770dd3a9b6b4490b&=&width=2160&height=662)

### 2.3 Style Transfer Model

Our style transfer model stands as a centerpiece in our technological suite, offering a unique and powerful capability to adjust skin tones in images. This model builds upon a style/content encoder that has been pre-trained on a vast dataset, ensuring a robust foundation for capturing and replicating various skin tones. What's particularly noteworthy about our approach is that it's entirely unsupervised, showcasing our commitment to innovation in AI methodologies. To tailor this model specifically for our objective, we've fine-tuned it using a selection of dark skin samples. This fine-tuning enhances the model's ability to handle a diverse range of skin tones with greater accuracy. A standout feature of our model is the flexibility to mix styles – it can interpolate between two distinct styles, offering a seamless blend of skin tones. This is crucial for our work, as it provides the control needed to accurately represent different skin tones. We've incorporated two templates into the model – one representing dark skin and the other light skin. These templates serve as reference points, enabling the model to effectively vary the skin tone in the images it processes. The result is a tool that not only enhances the diversity of our dataset but does so with a high degree of accuracy and realism.

![image](https://media.discordapp.net/attachments/1172946769223618682/1173321119386837092/image.png?ex=65638772&is=65511272&hm=308f3a8b7ccffb93f31aaef8de9cc7217b55b657e4f95858c7575a8cb24396fb&=&width=2081&height=1106)


# Challenges we ran into

Making this project is no easy task. We had a lot of problems finding a suitable style template for our style transfer model, as there are barely any dark-skinned examples in certain diseases, Furthermore, we had a very rough time trying to deploy our website onto Google Cloud, which took us almost 4 hours to do it properly. Lastly, we are quite inexperienced with the react framework, which caused us a lot of trouble initially.

# Accomplishments that we're proud of

We are very proud that we did not give up, even though we were extremely exhausted and there were so many bugs in our code. Also, we think that we had some very smart solutions for problems that seemed impossible at first.

# What we learned

We learned many technical skills like react and style transfer on the spot necessary to accomplish our project. Most importantly, we learned that you should never give up and that if you persist, then victory is just ahead.

# What's next for CanT-cer

There are still several parts that need to be improved on our website. For example, the support to remove images in the queue, the support to generate multiple photos at once, and make the style templates more diverse so we can generate a wider tone of skin colors.
