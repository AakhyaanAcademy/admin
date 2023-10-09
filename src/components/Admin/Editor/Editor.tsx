import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import * as React from 'react';
import { useRef } from 'react';
import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from './plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin';
import TableCellResizer from './plugins/TableCellResizer';
import TextFormatFloatingToolbarPlugin from './plugins/TextFormatFloatingToolbarPlugin';
import ToolbarPlugin, { InsertEquationDialog } from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import YouTubePlugin from './plugins/YouTubePlugin';
import LoadContentPlugin from './plugins/LoadContentPlugin';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { getTopic, editTopic } from '../../../api/Courses'
import { useParams } from "react-router-dom";
import { serializeToHTML } from './EditorToHtml'
import useModal from './hooks/useModal';

export default function Editor({ data: topicData }): JSX.Element {
  const params = useParams()
  const { errorMessage, setErrorMessage } = React.useState("")
  const { isShowing, setIsShowing } = React.useState(false)
  const { historyState } = useSharedHistoryContext();
  const {
    settings: {
      isCollab,
      isRichText,
      showTreeView,
    },
  } = useSettings();
  const text = 'Enter some rich text...'
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);

  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();

  const execute = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();

      editor.update(async () => {

        const editorState = editor.getEditorState();
        const raw = await serializeToHTML(editorState)
        console.log(raw)
        const documentJSON = {
          editorState: editorState
        };

        const topicEdit = await editTopic(process.env.REACT_APP_BACKEND + "/topic/edit", {
          courseId: params.courseId,
          subjectId: params.subjectId,
          chapterId: params.chapterId,
          topicId: params.topicId,
          topicTitle: topicData?.data?.title,
          topicContent: raw,
          topicEditor: JSON.stringify(documentJSON),
          published: topicData?.data?.published
        });
        alert("Your content is saved successfully.")
        // setErrorMessage(topicEdit?.message)
        // setIsShowing(true)
        // setTimeout(() => {
        //   setIsShowing(false)
        //   setErrorMessage("")
        // }, 4000); 
      })

    }
    if (e.ctrlKey && e.code === 'KeyM') {
      showModal('Insert Equation', (onClose) => (
        <InsertEquationDialog
          activeEditor={editor}
          onClose={onClose}
        />
      ));
    }

  }
  React.useEffect(() => {
    window.addEventListener('keydown', execute)
    return () => {
      window.removeEventListener('keydown', execute)
    }
  }, [])

  return (
    <>
      {isRichText && <ToolbarPlugin />}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${!isRichText ? 'plain-text' : ''
          }`}
        ref={scrollRef}>
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <AutoLinkPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />
        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={placeholder}
          initialEditorState={isCollab ? null : undefined}
        />
        {typeof (topicData?.data?.editor) === "undefined" || !topicData?.data?.editor ? <></> : <LoadContentPlugin data={topicData?.data?.editor} />}
        <MarkdownShortcutPlugin />
        <CodeActionMenuPlugin />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <TablePlugin />
        <TableCellActionMenuPlugin />
        <TableCellResizer />
        <ImagesPlugin />
        <LinkPlugin />
        <YouTubePlugin />
        <ClickableLinkPlugin />
        <HorizontalRulePlugin />
        <TextFormatFloatingToolbarPlugin />
        <EquationsPlugin />
        <TabFocusPlugin />
        {modal}
        <div className={`${isShowing ? "animate-fade" : ""} fixed bottom-10 right-10 text-warningText border-2 bg-slate-300 rounded-md px-2`}>
          {errorMessage}
        </div>
        <ActionsPlugin isRichText={isRichText} />
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}
