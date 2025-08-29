import React from "react";
import ReactDOMServer from "react-dom/server";
import { templates } from "../templates";

// Universal export function
export function generatePublishedHTML(templateId, userData) {
  const SelectedTemplate = templates[templateId];
  if (!SelectedTemplate) {
    throw new Error(`Template ${templateId} not found`);
  }

  const content = ReactDOMServer.renderToStaticMarkup(
    <SelectedTemplate userData={userData} isPreview={false} />
  );

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${userData?.name || "My Portfolio"}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body style="margin:0;">
    <div id="root">${content}</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>`;
}
