const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_IMAGE = path.join(__dirname, '../assets/images/logo.png');
const DEST_DIR = path.join(__dirname, '../assets/images');

const ICONS = [
	{ name: 'icon.png', size: 1024 },
	{ name: 'adaptive-icon.png', size: 1024 },
	{ name: 'favicon.png', size: 48 },
];

async function generateIcons() {
	if (!fs.existsSync(SOURCE_IMAGE)) {
		console.error(`Source image not found at ${SOURCE_IMAGE}`);
		process.exit(1);
	}

	console.log('Generating icons...');

	for (const icon of ICONS) {
		const destPath = path.join(DEST_DIR, icon.name);
		try {
			await sharp(SOURCE_IMAGE).resize(icon.size, icon.size).toFile(destPath);
			console.log(`Created ${icon.name} (${icon.size}x${icon.size})`);
		} catch (error) {
			console.error(`Error creating ${icon.name}:`, error);
		}
	}

	console.log('Icon generation complete!');
}

generateIcons();
