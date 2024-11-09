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
    const style = document.getElementById('style').value;
    const lighting = document.getElementById('lighting').value;

    const ageDescriptors = {
        'young': 'young adult, 20-25 years old, youthful features',
        'mature': 'mature woman, 25-35 years old, elegant features',
        'teen': 'teenage girl, 18-20 years old, fresh face'
    };

    const hairDescriptors = {
        'long': 'long flowing hair, silky hair',
        'medium': 'shoulder-length hair, layered hair',
        'short': 'short stylish hair, modern cut',
        'wavy': 'wavy textured hair, natural waves',
        'updo': 'elegant updo, sophisticated hairstyle'
    };

    const expressionDescriptors = {
        'gentle': 'gentle smile, soft expression, kind eyes',
        'serious': 'serious expression, confident look, professional',
        'happy': 'bright smile, cheerful expression, radiant',
        'thoughtful': 'thoughtful gaze, contemplative expression',
        'candid': 'natural candid expression, caught in the moment'
    };

    const styleDescriptors = {
        'casual': 'casual fashion, street style, modern clothing',
        'formal': 'formal wear, elegant dress, sophisticated',
        'traditional': 'traditional Japanese kimono, cultural dress',
        'business': 'business attire, professional look',
        'artistic': 'artistic fashion, creative styling'
    };

    const lightingDescriptors = {
        'studio': 'studio lighting, bokeh background',
        'natural': 'natural sunlight, golden hour, outdoor setting',
        'dramatic': 'dramatic lighting, cinematic, high contrast',
        'soft': 'soft diffused lighting, ethereal atmosphere',
        'moody': 'moody lighting, atmospheric shadows'
    };

    const specificPrompt = [
        ageDescriptors[age],
        `${hairColor} ${hairDescriptors[hairStyle]}`,
        expressionDescriptors[expression],
        'natural makeup, clear skin',
        styleDescriptors[style],
        lightingDescriptors[lighting],
        'shot on Canon EOS R5, 85mm f/1.2 lens'
    ].join(', ');

    const finalPrompt = `${basePrompts.join(', ')}, ${specificPrompt}`;
    
    const promptOutput = document.getElementById('promptOutput');
    promptOutput.innerHTML = `<strong>Positive Prompt:</strong><br>${finalPrompt}<br><br>` +
                           `<strong>Negative Prompt:</strong><br>${negativePrompt}`;
}

function randomizeOptions() {
    const selects = ['age', 'hairStyle', 'hairColor', 'expression', 'style', 'lighting'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        const options = select.options;
        const randomIndex = Math.floor(Math.random() * options.length);
        select.selectedIndex = randomIndex;
    });

    generatePrompt();
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
