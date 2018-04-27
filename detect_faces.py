import http.client, urllib.request, urllib.parse, urllib.error, base64, requests, json
import sys

###############################################
#### Update or verify the following values. ###
###############################################

# Replace the subscription_key string value with your valid subscription key.
subscription_key = '99ff296491ee4f4dbea02910ab179eb6'

uri_base = 'https://api.cognitive.azure.cn'

# Request headers.
headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscription_key,
}

# Request parameters.
params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise',
}

imageurl = sys.argv[1]
# Body. The URL of a JPEG image to analyze.
body = {'url': imageurl}

try:
    # Execute the REST API call and get the response.
    response = requests.request('POST', uri_base + '/face/v1.0/detect', json=body, data=None, headers=headers, params=params)

    parsed = json.loads(response.text)
    
    # print(parsed)
    person = parsed[0]
    
    attributes = person["faceAttributes"]
    age = attributes['age']
    emotion = attributes["emotion"]
    gender = attributes["gender"]
    glasses = attributes["glasses"]
    print(age,gender,glasses,emotion["anger"],emotion["contempt"],emotion["disgust"],emotion["fear"],emotion["happiness"],emotion["neutral"],emotion["sadness"],emotion["surprise"])
    # print(json.dumps({"age":age,"emotion":emotion,"gender":gender,"glasses":glasses}))
    # print (json.dumps(parsed, sort_keys=True, indent=2))

except Exception as e:
    print('Error:')
    print(e)

####################################    