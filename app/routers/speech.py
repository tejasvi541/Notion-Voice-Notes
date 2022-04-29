import os
import speech_recognition as sr
import gtts
from playsound import playsound
import sounddevice
from fastapi import APIRouter, Depends, File, UploadFile
import io
import aiofiles
import soundfile as sf


speechr = sr.Recognizer()
router = APIRouter(tags=["SpeechRecognition"])


def getAudio():
    with sr.Microphone() as source:
        speech.adjust_for_ambient_noise(source, duration=0.5)
        print("Say Anything")
        
        audio = speech.listen(source)
        print("done")
    return audio

def playSpeech(text):
    try:
        txtToSpch = gtts.gTTS(text)
        tempFile = "./speech.mp3"
        txtToSpch.save(tempFile)
        playsound(tempFile)
        os.remove(tempFile)
    except AssertionError:
        print("Couldn't play the sound")


def audioToText(audio):
    text = ""
    try:
        text = speechr.recognize_google(audio, language="en-US")
        return text
    except sr.UnknownValueError:
        print("Your Speech audio is not understood")
        return ""
    except sr.RequestError:
        print("Request Error from API")
        return ""
    except LookupError:
        return ""
        


@router.post("/speech")
async def speech(file: UploadFile = File(...)):
    # Read and save .wav file
    async with aiofiles.open("output1.wav", 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)

    # Load and speech recognise
    user_audio_file = sr.AudioFile("output1.wav")
    with user_audio_file as source:
        user_audio = speechr.record(source)
    print(audioToText(user_audio))

    return {"filename": file.content_type}

