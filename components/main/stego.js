const loadImage = (uri) => {
    return new Promise(((resolve) => {
        const ctx = document.getElementById('canvas').getContext('2d')
        const image = new Image()
        image.onload = function () {
            ctx.canvas.hidden = true
            ctx.canvas.width = image.width
            ctx.canvas.height = image.height
            ctx.drawImage(image, 0, 0)
            image.style.display = 'none'
            resolve(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height))
        }
        //This is to circumvent Cors rules
        image.crossOrigin = "anonymous"
        image.src = uri
    }))
}
//Load Image takes imageData (uri) will place it onto a canvas defined in the view it is bieng used in.  Using the canvas context the
//Image RGBA can be gained.

const saveImage = (imageData, callback) => {
    const ctx = document.getElementById('canvas').getContext('2d')
    ctx.putImageData(imageData, 0, 0)
    return ctx.canvas.toBlob(callback)
}
//Takes modified imageData to a canvas and converts it to a blob

const textToBytes = (text) => {
    let bytes = []
    for (const char of text) {
        let code = char.charCodeAt(0).toString(2)
        if (code.length > 8) {
            throw Error(`Invalid character for 8-bit binary encoding: ${char}`)
        }
        bytes.push("0".repeat(8 - code.length) + code)
    }
    return bytes
}
//Takes string converts it to an array of bytes 1 byte per char in a string

const bytesToText = (bytes) => {
    let text = ""
    for (const byte of bytes) {
        text += String.fromCharCode(parseInt(byte, 2))
    }
    return text
}

//Takes in array of bytes and sets that to string 

const encodeMessage = (imageData, text) => {
    let bytes = textToBytes(text)
    let data = imageData.data
    let i = 0
    let byte
    for (let j = 0; j < bytes.length; j++) {
        // Encode jth byte.
        byte = bytes[j]
        for (const bit of byte) {
            if (bit === "0" && data[i] % 2 !== 0) {
                data[i] -= 1  // Make data entry even if bit is zero.
            } else if (bit === "1" && data[i] % 2 === 0) {
                data[i] += 1  // Make data entry odd if bit is one.
            }
            i += i % 4 === 2 ? 2 : 1  //  Skip alpha value.
        }

        // Signify whether message is complete.
        if (j < bytes.length - 1 && data[i] % 2 === 0) {
            data[i] += 1  // Still more bytes to encode, make data entry odd.
        } else if (j === bytes.length - 1 && data[i] % 2 !== 0) {
            data[i] -= 1  // No more bytes to encode, make data entry even.
        }
        i += 2  // Skip alpha value.
    }
    return imageData
}

// Takes imageData and text converts text to bytes, iterates over each byte in the string for each bit in the string it will
//set the next R, G. or B value to be even if the bit is 0 or odd if the bit is 1.
//Skips alpha value in RGBA as this relates to opactiy
//At the end of each byte it will set the RGB to odd if there is more bytes to encode and even if there are no more bytes to encode.

const decodeMessage = (imageData) => {
    const bytes = []
    let data = imageData.data
    let bits = ""
    for (let i = 0; i < data.length; i++) {
        if (i % 12 === 10) {  // Check if signal bit
            bytes.push(bits)
            if (data[i] % 2 === 0) {
                return bytesToText(bytes)
            } else {
                bits = ""
                i++
            }
        } else if (i % 4 !== 3) {  // Skip alpha value.
            bits += data[i] % 2 === 0 ? "0" : "1"
        }
    }
}

//Iterate over RGB values of the image data and notes if it is odd it is 0 if it is even it is 1 after 8 bits are read the byte is
//saved and checks if there are more bytes to code.

export function encode(uri, text, callback) {
    return loadImage(uri).then(imageData => {
        const encodedImageData = encodeMessage(imageData, text)
        return saveImage(encodedImageData, callback)
    })
}
//Takes in uri, text, callback.
//loads image encodes message and returns saved image.

export function decode(uri) {
   // const uri = URL.createObjectURL(blob)
    return loadImage(uri).then(imageData => {
        return decodeMessage(imageData)
    })
}
//Takes uri/blob
//loads image returns decodemessage