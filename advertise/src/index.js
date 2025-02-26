const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3006;

// Function to convert image to Base64
const encodeImageToBase64 = (imagePath) => {
    try {
        const image = fs.readFileSync(imagePath);
        return `${image.toString("base64")}`;
    } catch (err) {
        console.error(`Error reading image ${imagePath}:`, err.message);
        return null;
    }
};

// API endpoint returning ad data with Base64 images
app.get("/advertise", (req, res) => {
    const ads = [
        { name: "Shopee", url: "https://shopee.co.th", imagePath: path.join(__dirname, "../ads", "shopee.png") },
        { name: "Lazada", url: "https://lazada.co.th", imagePath: path.join(__dirname, "../ads", "lazada.png") },
        { name: "Kaidee", url: "https://kaidee.com", imagePath: path.join(__dirname, "../ads", "kaidee.png") },
    ];

    const adsWithBase64 = ads.map(ad => ({
        name: ad.name,
        url: ad.url,
        image: encodeImageToBase64(ad.imagePath) // Convert image to Base64
    }));

    res.json(adsWithBase64);
});

app.listen(PORT, () => console.log(`Advertise service running on port ${PORT}`));

