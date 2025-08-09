const fs = require('fs');
const path = require('path');

// Mapping các import paths cũ sang mới
const importMappings = {
  '@/components/common/': '@/shared/components/',
  '@/components/ui/': '@/shared/components/',
  '@/utils/': '@/shared/utils/',
  '@/hooks/': '@/shared/hooks/',
  '@/constants/': '@/shared/constants/',
  '@/types/': '@/shared/types/',
  '@/components/test/': '@/features/performance/components/',
  '../screens/example/PerformanceDemoScreen':
    '../features/performance/screens/PerformanceDemoScreen',
};

// Hàm cập nhật import trong file
function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Cập nhật các import paths
    for (const [oldPath, newPath] of Object.entries(importMappings)) {
      const regex = new RegExp(
        `from\\s+['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
        'g',
      );
      if (regex.test(content)) {
        content = content.replace(regex, `from '${newPath}`);
        updated = true;
      }
    }

    // Cập nhật import từ @/components (không có subfolder)
    const componentsRegex = /from\s+['"]@\/components['"]/g;
    if (componentsRegex.test(content)) {
      content = content.replace(componentsRegex, `from '@/shared/components'`);
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Hàm tìm và cập nhật tất cả files
function updateAllFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      updateAllFiles(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      updateImportsInFile(filePath);
    }
  });
}

// Chạy script
console.log('🔄 Updating import paths...');
updateAllFiles('./src');
console.log('✅ Import paths updated successfully!');
