import { LexicalComposer } from '@lexical/react/LexicalComposer';
import * as React from 'react';

import { SettingsContext, useSettings } from './context/SettingsContext';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import Editor from './Editor';
import PlaygroundNodes from './nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

import "./index.css";

console.warn(
  'If you are profiling the playground app, please ensure you turn off the debug view. You can disable it by pressing on the settings control in the bottom-left of your screen and toggling the debug view setting.',
);

function prepopulatedRichText() {
}

function App({ data }): JSX.Element {
  const {
    settings: { isCollab, emptyEditor },
  } = useSettings();

  const initialConfig = {
    editorState: prepopulatedRichText,
    namespace: 'Playground',
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <div className="editor-shell">
          <Editor data={data} />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}

export default function TextEditor({ topic }): JSX.Element {
  return (
    <SettingsContext>
      <App data={topic} />
    </SettingsContext>
  );
}