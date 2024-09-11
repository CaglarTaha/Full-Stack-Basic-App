// src/update-ts-paths.ts
import * as fs from 'fs';
import * as path from 'path';

// Fonksiyon: Dosya içeriğini oku ve güncelle
function updateFilePath(filePath: string, relativePath: string): void {
    try {
        // Dosya içeriğini oku
        const content: string = fs.readFileSync(filePath, 'utf-8');

        // İlk satırı kontrol et ve güncelle
        const lines: string[] = content.split('\n');
        if (lines.length > 0 && lines[0].trim().startsWith('//')) {
            // Zaten bir başlık satırı varsa, güncelle
            lines[0] = `// src/${relativePath}`;
        } else {
            // Başlık satırı yoksa, ekle
            lines.unshift(`// src/${relativePath}`);
        }

        // Güncellenmiş içeriği dosyaya yaz
        fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');

        console.log(`Dosya güncellendi: ${filePath}`);
    } catch (err) {
        console.error(`Hata oluştu: ${err.message}`);
    }
}

// Fonksiyon: Proje dizininde gezin ve .ts dosyalarını bul
function processFilesInDirectory(directory: string): void {
    const files: string[] = fs.readdirSync(directory);
    for (const file of files) {
        const filePath: string = path.join(directory, file);
        const isDirectory: boolean = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            // Eğer bir dizinse, içindeki dosyaları işle
            processFilesInDirectory(filePath);
        } else if (file.endsWith('.ts')) {
            // Eğer bir .ts dosyasıysa, güncelle
            const relativePath: string = path.relative(__dirname, filePath);
            updateFilePath(filePath, relativePath);
        }
    }
}

// Proje dizinindeki .ts dosyalarını işle
const projectDirectory: string = __dirname;
processFilesInDirectory(projectDirectory);
