import { $getRoot } from "lexical";
import katex from "katex";

export function serializeToHTML(editorState) {
    const renderText = node => {
        let format = node.getFormat();
        console.log(node.getStyle());
        let html = node.getStyle() ? `<span style="${node.getStyle()}">${node.getTextContent()}</span>` : node.getTextContent();
        if (format % 2 === 1) html = `<strong>${html}</strong>`;
        format >>= 1;
        if (format % 2 === 1) html = `<em>${html}</em>`;
        format >>= 1;
        if (format % 2 === 1) html = `<s>${html}</s>`;
        format >>= 1;
        if (format % 2 === 1) html = `<u>${html}</u>`;
        format >>= 1;
        if (format % 2 === 1) html = `<code>${html}</code>`;
        format >>= 1;
        if (format % 2 === 1) html = `<sub>${html}</sub>`;
        format >>= 1;
        if (format % 2 === 1) html = `<sup>${html}</sup>`;
        return html;
    };

    const renderStyle = (format) => {
        switch (format) {
            case 1: // left
                return `text-align: left;`;
            case 2: // center
                return `text-align: center;`;
            case 3: // right
                return `text-align: right;`;
            case 4: // justify
                return `text-align: justify;`;
            default: // justify
                return ``;
        }
    };

    const
        renderNode = node => {
            switch (node.getType()) {
                case "root":
                    return node.getChildren().map((k) => renderNode(k)).join("");
                case "heading":
                    const headingNode = node;
                    return `<${headingNode.getTag()}>${headingNode.getChildren()
                        .map((k) => renderNode(k))
                        .join("")}</${headingNode.getTag()}>`;
                case "list":
                    const listNode = node
                    return `<${listNode.getTag()}>${listNode.getChildren()
                        .map((k) => renderNode(k))
                        .join("")}</${listNode.getTag()}>`;
                case "text":
                    return renderText(node);
                case "quote":
                    const quoteNode = node;
                    return `<blockquote class="dark:border-slate-700 bg-gray-100 dark:bg-gray-800 text-[#666] pl-[3em] border-l-[0.5em] border-[#eee]"><em>${quoteNode.getChildren()
                        .map((k) => renderNode(k))
                        .join("")}</em></blockquote>`;
                case "paragraph":
                    const paragraphNode = node;
                    return `<p class="p-1" ${paragraphNode.getFormat() ? ` style="${renderStyle(paragraphNode.getFormat())}"` : ``
                        }>${paragraphNode.getChildren().map((k) => renderNode(k)).join("")}</p>`;
                case "listitem":
                    const listItemNode = node
                    return `<li>${listItemNode.getChildren()
                        .map((k) => renderNode(k))
                        .join("")}</li>`;
                case "link":
                    const linkNode = node
                    return `<a href="${linkNode.getURL()}" class="text-blue-500 hover:underline visited:text-blue-800" target="_blank">${linkNode.getChildren()
                        .map((k) => renderNode(k))
                        .join("")}</a>`;
                case "image":
                    const imageNode = node
                    return `<img src="${imageNode.getSrc()}" class="inline-block w-full" style="max-width: ${imageNode.__maxWidth.toString()}px"></img>`;
                case "table":
                    const tableNode = node
                    let html = ""
                    tableNode.getChildren().map((child, i) => {
                        console.log(child);
                        child.getChildren().map((ch, j) => {
                            console.log(ch.getChildren())
                            html += `<td>${ch.getChildren().map(single => renderNode(single)).join("")}</td>`
                        })
                        html = `<tr>${html}</tr>`
                    })
                    return `<table>${html}</table>`
                case "equation":
                    const equationNode = node
                    const katexElement = katex.renderToString(equationNode.getEquation(), {
                        displayMode: !equationNode.__inline, // true === block display //
                        output: 'html',
                    });

                    return `<span class="katex">${katexElement}</span>`;

                default:
                    // console.log("unknown type", node.getType());
                    return "";
            }
        };

    return new Promise(resolve => {
        editorState.read(() => {
            resolve(renderNode($getRoot()));
        });
    });
}