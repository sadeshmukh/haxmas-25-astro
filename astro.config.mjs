// @ts-check
import { defineConfig } from "astro/config";
import { visit } from "unist-util-visit";

import tailwindcss from "@tailwindcss/vite";

// @ts-ignore
const theABlogSpreads = () => (tree) => {
  visit(tree, "text", (node, index, parent) => {
    if (!parent || typeof node.value !== "string") return;
    const parts = node.value.split(/(A Blog)/g);
    if (parts.length === 1) return;
    const newparts = parts
      .filter(Boolean)
      // typing? what's that?
      //@ts-ignore
      .map((part) =>
        part === "A Blog"
          ? { type: "html", value: '<span class="a-blog-text">A Blog</span>' }
          : { type: "text", value: part }
      );
    parent.children.splice(index, 1, ...newparts);
    return index + newparts.length;
  });
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [theABlogSpreads],
  },
});
