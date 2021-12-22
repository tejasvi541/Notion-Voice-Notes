import os
import speech_recognition as sr
import gtts
from playsound import playsound
import Credentials as cr
from notion import NotionClient

# Speech Recogniser
speech = sr.Recognizer()

client = NotionClient(cr.NOTION_KEY, cr.DATABASE_ID)

ACTIVATION_CODE = "hey buddy"

def getAudio():
    with sr.Microphone() as source:
        print("Say Anything")
        audio = speech.listen(source)
    return audio

def audioToText(audio):
    text = ""
    try:
        text = speech.recognize_google(audio)
    except sr.UnknownValueError:
        print("Your Speech audio is not understood")
    except sr.RequestError:
        print("Request Error from API")

    return text

def playSpeech(text):
    try:
        txtToSpch = gtts.gTTS(text)
        tempFile = "./speech.mp3"
        txtToSpch.save(tempFile)
        playsound(tempFile)
        os.remove(tempFile)
    except AssertionError:
        print("Couldn't play the sound")


if __name__ == "__main__":
    while True:
        aud = getAudio()
        commands = audioToText(aud)
        if ACTIVATION_CODE in commands.lower():
            print("Activated")
            # Play Activation sound
            playSpeech("Yes sire?")

            note = getAudio()
            note = audioToText(note)

            if note:
                playSpeech(note)
                print(note)
    
        

            