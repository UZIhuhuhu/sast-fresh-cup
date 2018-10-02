import React from "react";
import NoticeMessage from "../plugin/notice-message";
export default function Notice() {
  return (
    <div className="container notice-container">
      <h2>公告</h2>
      <NoticeMessage />
    </div>
  );
}
