const input = document.getElementById("klucz");
const textArea = document.getElementById("tresc");

//information about the key
input.addEventListener("input", () => {
    if (input.value.length > 0 && input.value.length < 4) {
        document.querySelector('div.keyInfo').textContent = "Klucz jest za krótki"
    } else if ((input.value.length > 4 && input.value.length < 25) || (input.value.length == 0)) {
        document.querySelector('div.keyInfo').textContent = ""
    } else if (input.value.length >= 25) {
        document.querySelector('div.keyInfo').textContent = "Klucz jest za długi"
    }
})

//information about the message for encryption
textArea.addEventListener("input", () => {
    if (textArea.value.length > 51) {
        document.querySelector('div.textInfo').textContent = "Tekst jest za długi"
    } else if (textArea.value.length < 50) {
        document.querySelector('div.textInfo').textContent = "";
    }
})

function resetAll() {
    textArea.value = "";
    input.value = "";
    document.querySelector('div.textInfo').textContent = "";
    document.querySelector('div.keyInfo').textContent = ""
}


//message coding
function messageToCode() {
    const input = document.getElementById("klucz");
    const textArea = document.getElementById("tresc");
    let message = textArea.value;
    let key = input.value.length;

    let newMessage = message.toUpperCase().replace(/Ą/g, 'A').replace(/Ć/g, 'C').replace(/Ę/g, 'E').replace(/Ł/g, 'L').replace(/Ń/g, 'N').replace(/Ó/g, 'O').replace(/Ś/g, 'S').replace(/Ż/g, 'Z').replace(/Ź/g, 'Z')

    let codeMessage = () => {
        return newMessage.replace(/[A-Z]/g, imput => String.fromCharCode((imput.charCodeAt(0) - 65 + key) % 26 + 65));

    }
    document.getElementById("tresc").value = codeMessage()
}

//decode the message
function codeToMessage() {
    const input = document.getElementById("klucz");
    const textArea = document.getElementById("tresc");
    let message = textArea.value;
    let key = input.value.length - (input.value.length * 2);

    const noCodeMessage = (message, key) => {
        if (key < 0)
            return noCodeMessage(message, key + 26);
        let output = '';
        for (let i = 0; i < message.length; i++) {
            let c = message[i];
            if (c.match(/[A-Z]/)) {
                let code = message.charCodeAt(i);
                if ((code >= 65) && (code <= 90))
                    c = String.fromCharCode(((code - 65 + key) % 26) + 65);
                else if ((code >= 97) && (code <= 122))
                    c = String.fromCharCode(((code - 97 + key) % 26) + 97);
            }
            output += c
        }
        return output;
    };
    document.getElementById("tresc").value = noCodeMessage(message, key)
}


document.getElementById('zaszyfruj').addEventListener('click', messageToCode)
document.getElementById("odszyfruj").addEventListener('click', codeToMessage)
document.getElementById("reset").addEventListener('click', resetAll)