# Create the content component

## Create a new file in src/app/components/Content/, e.g. NewSectionContent.tsx:

```bash
  'use client';
  import { ContentTemplate } from './ContentTemplate';

  export const NewSectionContent = () => {
    return (
      <ContentTemplate
        title="New Section"
        subtitle="Description of this section"
      >
        {/* Your content here */}
      </ContentTemplate>
    );
  };
```

## Register it in the content router

  ### In src/app/components/Content/index.tsx, add the import and map entry:

```bash
  import { NewSectionContent } from './NewSectionContent';

  const contentMap: Record<string, React.ReactNode> = {
    'home': <HomeContent />,
    'trade': <TradeContent />,
    // ...existing entries
    'new-section': <NewSectionContent />,  // Add this
  };

  // Also export it
  export { HomeContent, TradeContent, /* ... */, NewSectionContent };
  ```