const fs = require('fs');
const path = require('path');

// Mapping các import paths cần sửa
const importMappings = [
  { from: '@/constants', to: '@/shared/constants' },
  { from: '@/types', to: '@/shared/types' },
  { from: '@/hooks', to: '@/shared/hooks' },
  { from: '@/components/common', to: '@/shared/components' },
  { from: '@/components/ui', to: '@/shared/components' },
  { from: '@/utils', to: '@/shared/utils' },
  { from: '../../utils', to: '@/shared/utils' },
  { from: '../layout/CustomHeader', to: '@/components/layout/CustomHeader' },
  { from: '../navigation/CustomBottomBar', to: '@/components/navigation/CustomBottomBar' },
  { from: '../../components/test/PdfViewer', to: '@/features/performance/components/PdfViewer' },
  {
    from: '../../components/test/PdfDownloader',
    to: '@/features/performance/components/PdfDownloader',
  },
  {
    from: '../../components/test/PdfPhoneDownloader',
    to: '@/features/performance/components/PdfPhoneDownloader',
  },
  {
    from: '../../components/test/PdfIosDownloader',
    to: '@/features/performance/components/PdfIosDownloader',
  },
  { from: '../../utils/sizeMatters', to: '@/shared/utils/sizeMatters' },
];

// Hàm cập nhật import trong file
function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Cập nhật các import paths
    for (const mapping of importMappings) {
      const regex = new RegExp(
        `from\\s+['"]${mapping.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`,
        'g',
      );
      if (regex.test(content)) {
        content = content.replace(regex, `from '${mapping.to}'`);
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
console.log('🔄 Fixing import paths...');
updateAllFiles('./src');
console.log('✅ Import paths fixed successfully!');
