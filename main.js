const synth = window.speechSynthesis

console.log(synth)

//grab html elements

const form = document.querySelector("form")
const textInput = document.getElementById("text-input")
const rateValue = document.getElementById("rate-value")
const rate = document.getElementById("rate")
const pitchValue = document.getElementById("pitch-value")
const pitch = document.getElementById("pitch")
const voiceSelect = document.getElementById("voice-select")
const body = document.querySelector("body")

let voices = []

const getVoices = () => {
    setTimeout(() => {
        voices = synth.getVoices()
        //looping voices
        voices.forEach(voice=>{
            const option = document.createElement("option")
            option.textContent = `${voice.name}(${voice.lang})`
            //set option attributes
            option.setAttribute("lang",voice.lang)
            option.setAttribute("name",voice.name)
            voiceSelect.appendChild(option)
        })
    }, 10);
}

getVoices()

//speak
const speak = () => {
    if(synth.speaking){
        console.log("already speaking");
        return
    }
    if(textInput.value !== ""){

        // Add background animation
        body.style.background = '#141414 url(img/wave.gif)'
        body.style.backgroundRepeat = 'repeat-x'
        body.style.backgroundSize = '100% 100%'

        //get speak text
        const text = new SpeechSynthesisUtterance(textInput.value)
        text.onend = e => {
            console.log("done speaking...")
            body.style.background = '#141414'
        }

        text.onerror = e => {
            console.log("something went wrong...")
        }

        //get selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("name")

        //loop to match the selected voice
        voices.forEach(voice=>{
            if(voice.name === selectedVoice){
                text.voice = voice
            }
        })
        text.rate = rate.value
        text.pitch = pitch.value
        synth.speak(text)
    }
    else console.log("please add text to speak");
}

//event listeners
form.addEventListener("submit", e => {
    e.preventDefault()
    speak()
})

rate.addEventListener("change", e => rateValue.textContent = rate.value)
pitch.addEventListener("change", e => pitchValue.textContent = pitch.value)