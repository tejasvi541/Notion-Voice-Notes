import { useEffect, useState } from "react";

const useRecorder = () => {
	const [audioURL, setAudioURL] = useState("");
	const [isRecording, setIsRecording] = useState(false);
	const [recorder, setRecorder] = useState(null);

	useEffect(() => {
		// Lazily obtain recorder first time we're recording.
		if (recorder === null) {
			if (isRecording) {
				requestRecorder().then(setRecorder, console.error);
			}
			return;
		}

		// Manage recorder state.
		if (isRecording) {
			recorder.start();
		} else {
			recorder.stop();
		}

		// Obtain the audio when ready.
		const handleData = (e) => {
			console.log(e.data);
			// setAudioURL(URL.createObjectURL(e.data));
			const blobDataInWavFormat = new Blob([e.data], {
				type: "audio/wav; codecs=MS_PCM",
			});
			setAudioURL(blobDataInWavFormat);
		};

		recorder.addEventListener("dataavailable", handleData);
		return () => recorder.removeEventListener("dataavailable", handleData);
	}, [recorder, isRecording]);

	const startRecording = () => {
		setIsRecording(true);
	};

	const stopRecording = () => {
		setIsRecording(false);
	};

	return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	const mime = ["audio/wav", "audio/mpeg", "audio/webm", "audio/ogg"].filter(
		MediaRecorder.isTypeSupported
	)[0];
	const recorder = new MediaRecorder(stream, {
		mimeType: mime,
	});
	return recorder;
}
export default useRecorder;
