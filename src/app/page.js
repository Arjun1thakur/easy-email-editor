"use client";
import { EmailEditor } from "../components/mailer";
import { BlockManager } from "easy-email-core";

import "easy-email-editor/lib/style.css";
import { useRef } from "react";
// import { useRef } from "react";
// const initialValues = {
//   subject: "Welcome to Easy-email",
//   subTitle: "Nice to meet you!",
//   content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
// };
export default function Home() {
  const emailEditorRef = useRef(null);
  return (
    // <></>
    <EmailEditor ref={emailEditorRef} />
  );
}
