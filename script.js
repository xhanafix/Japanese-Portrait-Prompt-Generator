const basePrompts = [
    "ultra realistic portrait photograph, Japanese woman, 8k uhd, detailed facial features, professional photography",
    "masterpiece, best quality, highly detailed, volumetric lighting, professional photograph"
];

const negativePrompt = "deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, (((mutation))), (((deformed))), ((bad anatomy)), text, error, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name";

function generatePrompt() {
    const age = document.getElementById('age').value;
    const hairStyle = document.getElementById('hairStyle').value;
    const hairColor = document.getElementById('hairColor').value;
    const expression = document.getElementById('expression').value;

    const ageDescriptors = {
        'young': 'young adult, 20-25 years old, youthful features',
        'mature': 'mature woman, 25-35 years old, elegant features'
    };

    const hairDescriptors = {
        'long': 'long flowing hair, silky hair',
        'medium': 'shoulder-length hair, layered hair',
        'short': 'short stylish hair, modern cut'
    };

    const expressionDescriptors = {
        'gentle': 'gentle smile, soft expression, kind eyes',
        'serious': 'serious expression, confident look, professional',
        'happy': 'bright smile, cheerful expression, radiant'
    };

    const specificPrompt = [
        ageDescriptors[age],
        `${hairColor} ${hairDescriptors[hairStyle]}`,
        expressionDescriptors[expression],
        'natural makeup, clear skin, high-end fashion',
        'studio lighting, bokeh background',
        'shot on Canon EOS R5, 85mm f/1.2 lens'
    ].join(', ');

    const finalPrompt = `${basePrompts.join(', ')}, ${specificPrompt}`;
    
    const promptOutput = document.getElementById('promptOutput');
    promptOutput.innerHTML = `<strong>Positive Prompt:</strong><br>${finalPrompt}<br><br>` +
                           `<strong>Negative Prompt:</strong><br>${negativePrompt}`;
}

function copyPrompt() {
    const promptOutput = document.getElementById('promptOutput').innerText;
    navigator.clipboard.writeText(promptOutput).then(() => {
        alert('Prompt copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy prompt:', err);
    });
}

// Generate initial prompt when page loads
window.onload = generatePrompt; 
