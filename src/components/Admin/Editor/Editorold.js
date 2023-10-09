import React from 'react';
import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

export default function Editor() {
    return (
        <div className='bg-white relative rounded-sm'>
            <LexicalComposer
                initialConfig={{
                    theme: {
                        paragraph: 'mb-1', // tailwind classes work!
                    },
                    onError(error) {
                        throw error;
                    },
                }}
            >
                <RichTextPlugin
                    contentEditable={
                        <LexicalContentEditable className="h-[450px] outline-none py-[15px] px-2.5 resize-none overflow-hidden text-ellipsis" />
                    }
                    placeholder={
                        <div className="absolute top-[15px] left-[10px] pointer-events-none select-none">
                            Now write something brilliant...
                        </div>
                    }
                />
                <HistoryPlugin />
            </LexicalComposer>
        </div>
    )
}