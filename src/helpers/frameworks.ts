import got from "got";
import packageJson from "../../package.json";
import promisePipe from "promisepipe";
import tar from "tar";

import { isUrlOk } from "./networking";

export const frameworks = ["react", "vue"] as const;
export type FrameworkKey = typeof frameworks[number];

export function downloadAndExtractFrameworkHandlebars(root: string, framework: string): Promise<void> {
  return promisePipe(
    got.stream(`https://codeload.github.com/${packageJson.repository.name}/tar.gz/refactor-templating-system`),
    tar.extract({ cwd: root, strip: 3 }, [
      `create-eth-app-refactor-templating-system/handlebars/${framework}`,
    ]),
  );
}

export function hasFramework(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/templates/${encodeURIComponent(
      name,
    )}?ref=refactor-templating-system`,
  );
}

export function hasFrameworkHandlebars(name: string): Promise<boolean> {
  return isUrlOk(
    `https://api.github.com/repos/${packageJson.repository.name}/contents/handlebars/${encodeURIComponent(
      name,
    )}?ref=refactor-templating-system`,
  );
}
