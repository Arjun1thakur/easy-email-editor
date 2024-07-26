import React, {
    useEffect,
    useState,
    useImperativeHandle,
    useMemo,
  } from 'react';

 import { loadScript } from '../app/loadScript';
  
  
  export const EmailEditor = React.forwardRef(
    (props, ref) => {
      const { onLoad, onReady, scriptUrl, minHeight = "100vh", style = {} } = props;
  
      const [editor, setEditor] = useState(null);
  
      const [hasLoadedEmbedScript, setHasLoadedEmbedScript] = useState(false);
  
      const editorId = useMemo(
        () => props.editorId || `editor-01`,
        [props.editorId]
      );
  
      const options = {
        ...(props.options || {}),
        appearance: props.appearance ?? props.options?.appearance,
        displayMode: props?.displayMode || props.options?.displayMode || 'email',
        locale: props.locale ?? props.options?.locale,
        projectId: props.projectId ?? props.options?.projectId,
        tools: props.tools ?? props.options?.tools,
  
        id: editorId,
        source: {
          name: "AJ Editor",
          version: "0.1.0",
        },
      };
  
      useImperativeHandle(
        ref,
        () => ({
          editor,
        }),
        [editor]
      );
  
      useEffect(() => {
        return () => {
          editor?.destroy();
        };
      }, []);
  
      useEffect(() => {
        setHasLoadedEmbedScript(false);
        loadScript(() => setHasLoadedEmbedScript(true), scriptUrl);
      }, [scriptUrl]);
  
      useEffect(() => {
        if (!hasLoadedEmbedScript) return;
        editor?.destroy();
        setEditor(unlayer.createEditor(options));
      }, [JSON.stringify(options), hasLoadedEmbedScript]);
  
      const methodProps = Object.keys(props).filter((propName) =>
        /^on/.test(propName)
      );
      useEffect(() => {
        if (!editor) return;
  
        onLoad?.(editor);
  
        // All properties starting with on[Name] are registered as event listeners.
        methodProps.forEach((methodProp) => {
          if (
            /^on/.test(methodProp) &&
            methodProp !== 'onLoad' &&
            methodProp !== 'onReady' &&
            typeof props[methodProp] === 'function'
          ) {
            editor.addEventListener(methodProp, props[methodProp]);
          }
        });
  
        if (onReady) {
          editor.addEventListener('editor:ready', () => {
            onReady(editor);
          });
        }
      }, [editor, Object.keys(methodProps).join(',')]);
  
      return (
        <div
          style={{
            flex: 1,
            display: 'flex',
            minHeight: minHeight,
          }}
        >
          <div id={editorId} style={{ ...style, flex: 1 }} />
        </div>
      );
    }
  );