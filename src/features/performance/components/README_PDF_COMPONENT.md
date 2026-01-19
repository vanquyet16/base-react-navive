# PDF Viewer Component

A React Native component for displaying PDF files using `react-native-pdf` and `react-native-blob-util`.

## Installation

The required dependencies are already installed:

- `react-native-pdf`
- `react-native-blob-util`

## Features

- ✅ Remote PDF loading (HTTP/HTTPS URLs)
- ✅ Base64 PDF support
- ✅ Local file support
- ✅ Page navigation
- ✅ Error handling
- ✅ Loading states
- ✅ Custom styling support
- ✅ Event callbacks

## Usage

### Basic Usage

```tsx
import { PdfViewer } from '@/components';

// Remote PDF
<PdfViewer uri="https://example.com/document.pdf" />

// Base64 PDF
<PdfViewer base64="JVBERi0xLjQK..." fileName="document.pdf" />
```

### Advanced Usage

```tsx
import {PdfViewer} from '@/components';

const MyComponent = () => {
  const handleLoadComplete = (numberOfPages: number, filePath: string) => {
    console.log(`PDF loaded with ${numberOfPages} pages`);
  };

  const handleError = (error: any) => {
    console.error('PDF error:', error);
  };

  const handlePageChanged = (page: number, numberOfPages: number) => {
    console.log(`Page ${page} of ${numberOfPages}`);
  };

  return (
    <PdfViewer
      uri="https://example.com/document.pdf"
      onLoadComplete={handleLoadComplete}
      onError={handleError}
      onPageChanged={handlePageChanged}
      style={{flex: 1}}
    />
  );
};
```

## Props

| Prop             | Type                   | Required | Description                                         |
| ---------------- | ---------------------- | -------- | --------------------------------------------------- |
| `uri`            | `string`               | No\*     | URL or file path to the PDF                         |
| `base64`         | `string`               | No\*     | Base64 encoded PDF data                             |
| `fileName`       | `string`               | No       | File name for base64 PDFs (default: 'document.pdf') |
| `onLoadComplete` | `function`             | No       | Callback when PDF loads successfully                |
| `onError`        | `function`             | No       | Callback when PDF fails to load                     |
| `onPageChanged`  | `function`             | No       | Callback when page changes                          |
| `style`          | `StyleProp<ViewStyle>` | No       | Custom styles for the container                     |

\*Either `uri` or `base64` must be provided.

## Event Callbacks

### onLoadComplete

```tsx
(numberOfPages: number, filePath: string) => void
```

### onError

```tsx
(error: any) => void
```

### onPageChanged

```tsx
(page: number, numberOfPages: number) => void
```

## Examples

### Remote PDF

```tsx
<PdfViewer uri="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" />
```

### Base64 PDF

```tsx
const base64Data = 'JVBERi0xLjQK...'; // Your base64 PDF data
<PdfViewer base64={base64Data} fileName="my-document.pdf" />;
```

### Local File (iOS)

```tsx
<PdfViewer uri="/path/to/local/document.pdf" />
```

### Local File (Android)

```tsx
<PdfViewer uri="file:///path/to/local/document.pdf" />
```

## Demo Screen

A demo screen is available at `src/screens/example/PdfDemoScreen.tsx` that showcases:

- Different PDF sources
- Error handling
- Loading states
- Navigation integration

Access it through the "PDF Demo" button in the Home screen.

## Notes

- The component automatically handles platform differences for file paths
- Base64 PDFs are temporarily saved to the cache directory
- Remote PDFs are cached for better performance
- The component includes built-in loading and error states
- All PDF operations are asynchronous

## Troubleshooting

### Common Issues

1. **PDF not loading**: Check if the URL is accessible and returns a valid PDF
2. **Base64 errors**: Ensure the base64 string is valid and complete
3. **File path issues**: Use proper file:// protocol for Android local files
4. **Network errors**: Check internet connectivity for remote PDFs

### Platform-Specific Notes

- **iOS**: Local files work with direct paths
- **Android**: Local files require `file://` protocol prefix
- **Both**: Remote URLs work the same way on both platforms
