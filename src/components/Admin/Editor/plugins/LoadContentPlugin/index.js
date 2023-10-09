import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const { useEffect } = require("react");

const LoadContentPlugin = ({ data }) => {

  const jsonString = JSON.parse(data);
  const [editor] = useLexicalComposerContext();

  const editorState = editor.parseEditorState(
    JSON.stringify(jsonString.editorState),
  );
  editor.setEditorState(editorState);
  editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);

  return null;
};


export default LoadContentPlugin;