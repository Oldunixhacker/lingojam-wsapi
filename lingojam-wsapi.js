// Create a div element
var div = document.createElement("div");

// Set the class attribute
div.setAttribute("class", "white-section-area-thing");

// Create a label element
var label = document.createElement("label");

// Set the text content of the label
label.textContent = "Voice: ";

// Create a select element
var select = document.createElement("select");

select.id = "voiceSelect";

// Set the id attribute
select.setAttribute("id", "voiceSelect");

// Populate the select element with voices using the getVoices() method
const languageNames = new Intl.DisplayNames(["en"], { type: "language" });

function getLanguageName(languageCode) {
  return languageNames.of(languageCode);
}

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }
  const voices = speechSynthesis.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    const languageName = getLanguageName(voices[i].lang);
    let voiceName = voices[i].name;
    option.textContent = `${voiceName} for ${languageName}`;
    if (voiceName.includes("eSpeak")) {
      option.textContent = `eSpeak for ${languageName}`;
    }
    if (voices[i].default) {
      option.textContent += " (default)";
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    select.appendChild(option);
  }
}

populateVoiceList();

if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Create a text element
var text = document.createElement("p");

// Set the text content
text.textContent = "TTS Settings";

// Set the style attributes
text.style.fontWeight = "bold";
text.style.fontSize = "large";

// Append the text element as a child of the div element
div.appendChild(text);

// Append the label and the select elements to the div element
div.appendChild(label);
div.appendChild(select);

// Get the first element with class "white-section-area-thing"
var firstWhiteSection = document.querySelector(".white-section-area-thing");

// Insert the div element before it
firstWhiteSection.parentNode.insertBefore(div, firstWhiteSection);

function forward() {
  const englishText = document.getElementById('english-text').value;
  const voiceSelect = document.getElementById('voiceSelect');
  const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  console.log(englishText);
}

$(document).ready(function(){
  $("select").change(function(){
    forward();
  });
});
